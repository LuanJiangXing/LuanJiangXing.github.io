---
title: Attack Lab
tags:
  - ICS
author: gemini assisted
---
https://csapp.cs.cmu.edu/ 

# Attack Lab

## 1. 明确游戏规则

在官方的CSAPP有PDF 

https://csapp.cs.cmu.edu/3e/attacklab.pdf

首先要读 我们助教根本没说清楚这一点

PDF里写的很清楚getbuf、test、touch函数的源码

不需要再浪费那么多时间读反汇编码了

工作流应当大致为

先看PDF 搞清每一个phase主要是要干嘛

总体都是要避免getbuf跳到test，而通过各种方式改写代码 跳到touch1/2/3去

phase1-phase3 ctarget

运行内存地址固定 可以直接跳具体运行内存地址

phase1 跳touch1 只需要写一个地址就行

phase2 跳touch2 同时传一个固定的参数（cookie的int形式）

phase3 跳touch3 同时传一个不能直接传的（cookie的string形式）

phase4-phase5 rtarget

运行内存地址不固定 不能直接跳具体运行内存地址 且不能操纵getbuf栈空间

phase4 跳touch2 同时传cookie 但必须自己找到一些合适的gadgets的拼接

phase5 跳touch3 同时传cookie 并且难以直接传 必须找到很多合适的gadgets的拼接

接着 objdump -d ctarget > ctarget.s

前三个phase不会用到farm.c

然后vim phase1.txt 不断填入内容 改写

最后先本地提交 ./ctarget -q -i phase1.txt

attacklab写好了一系列逻辑 

加-q表示不会提交到server 但可以看到是否valid

加-i表示input 只需要input txt文件就可以

提交成功结果示例

![提交成功结果](/csapp-lab-pics/f95ccc4ee5f02dd7795b36e04ae63719.png)


---
## 2. Phase 1

### `Gets` 函数的缺陷

*   在getbuf中使用了Gets函数，也就是从getbuf函数外部读取一些东西 但不检查长度

*   结合反汇编码写到mov %rsp, %rdi 也就是把gets传入的第一个参数放在rsp栈顶的位置

*   我们要做的就是利用它容易缓冲区溢出的漏洞覆盖掉本不该覆盖的东西

### `call` 与 `ret` 机制

*   `call`：本质为 `push` 和 `jump` 的结合体，在调用函数的过程中为了让函数能找到回来的路，提前放了一个8字节的下一个指令的地址，将栈指针rsp往下push了8个字节，函数具体用的栈空间都在这之后

*   `ret` : 本质为 `pop` 和 `jump` 的结合体，读取了返回的地址后，将栈指针rsp往上pop8个字节，并jump到相应的地址去，具体的做法是 1、RIP = RSP；2、RSP += 8.

### 如何利用？

因此，我们就可以write一个比本身getbuf空出栈空间更大的字符串，又正好在call和ret使用的8个字节的空间中填入我们想要的返回地址，就可以把getbuf从test改为touch1了

在传统attack lab 和 manual fill attack lab中比较类似

传统attack lab希望可以把偏移量全部填成0

manual fill更追求精准的在需要填的地方填

![manual fill 示例](/csapp-lab-pics/Pasted%20image%2020260512215424.png)

如图为manual fill的示例 格式按照INSTRUCTION.txt（下同） 

我的getbuf一共填sub了0x58个字节 所以从0x58开始 按小端序填写touch1的首地址401f5e

小端序 是最科学的填地址的方式

把最低位放在地址最低的地方

---

## 3. Phase2 

这里PDF有一句话很明确：

In this case, however, you must make it appear to touch2 as if you have passed your cookie as its argument.

意思就是自己的cookie要作为一个参数传给touch2，touch2也做好了接收的准备，它要接收一个整数

所以除了要跳到touch2的地址 我们还要把cookie mov到rdi

这是默认call一个函数时候传进去的第一个参数存放的寄存器

也可以从touch2的反汇编码中得很明确（edi是rdi的32位形式）

401f52:       39 3d ec 55 00 00       cmp    %edi,0x55ec(%rip)        # 407544 cookie

在这个地方 比较难想到的是要自己注入类似 mov rdi cookie ret的机器码

尤其是这个ret 前面讲过ret本质是pop和jmp

具体来讲，前面也讲过两步走是 1、RIP = ""RSP""，且这个RSP一定是一个地址；2、RSP += 8. 

getbuf在执行自己的ret的时候做了这两步，在ret之前他会先把RSP放到偏移量为0x58的位置（即add 0x58 rsp），然后ret会做一个RSP+=8，也就是RSP在0x60了，并且RIP被设为了0x58，所以接着cpu就跳到了0x58执行。

这个时候我们希望cpu能够运行我们自己的注入代码，但在ret之后的代码我们不能直接执行（因为ret的定义要求rip必须是一个地址），所以我们只能在ret回去的地方填一个地址，跳到另一个地方再运行。于是我们想到在这个phase条件下还可以利用的栈的缓冲区，也就是相对偏移量为0x00的一些地方，我们在哪里放我们的大杀招 mov rdi cookie ret，这些伪装成了真正的代码来执行。

在执行完 48 c7 c7 cookie （注意cookie在这里要以小端序来写）之后，cookie就被成功送到了touch2要求的，也是约定俗成的第一个参数的寄存器rdi里。

这个时候再执行一步没有对应call的ret，这步是灵魂所在。首先此时RSP是0x60，也就是说0x60就赋给了RIP，RIP完美拿到下一个指令的地址，于是最终成功传到touch2去。


![phase2 注入代码](/csapp-lab-pics/Pasted%20image%2020260515173814.png)


最后的问题：如何得到运行时getbuf0x00实际对应的内存地址？

显然运行时我们必须要使用gdb

1、gdb ./ctarget

2、b getbuf

3、r

4、disas getbuf

5、不停ni直到东西来到了rdi里面，这个时候rdi应该在栈顶，直接 x $rdi 看左边就是地址

在phase3中可以以完全相同的方式得到地址

---

## 4. Phase3

同样我们要传一个参数，但这回不是cookie的值了

You must make it appear to touch3 as if you have passed a string representation of your cookie as its argument.

PDF讲到这里我们要传的是cookie字符串的地址

Your injected code should set register %rdi to the address of this string.

1、为什么是地址？因为这里这个lab使用了诸如hexmatch和strncmp的东西 在比对字符串的时候会挤占getbuf释放出的栈空间 所以字符串必须存在不会被覆盖掉的地方，最好的选择是栈的高地址

2、cookie怎么改成字符串？ cpu读字符串严格遵循读ASCII的做法 所以我们需要把cookie里面8个或0-9/A-F的数字转换对应的ASCII码，并且是十六进制形式，实际上我们可以直接使用强大工具man ASCII 来实现，注意不要看错行。我的cookie是648c8ed0，转成ASCII是36 34 38 65 38 67 66 30 00（注意表示字符串的最后这个00，非常关键）

3、如何输入cookie字符串？ 字符串不是按照小端序的，因为其本身是字符数组，是一个个读进去的，所以就按正常顺序敲进去就行了。注意这一点与整数的小端序完全不同。

When functions hexmatch and strncmp are called, they push data onto the stack, overwriting portions of memory that held the buffer used by getbuf. As a result, you will need to be careful where you place the string representation of your cookie.

同时我们注意到这里还有第二关，因为这个phase引入了一些奇怪的hexmatch和strncmp的东西，他们会在调用phase3的时候就把栈上空间占用，而phase3对比字符串还要往后，且占用的空间恰好是getbuf的空间，所以我们不能再使用getbuf本身的空间存我们的关键数据，我们需要存到getbuf的高地址上。

同时我们需要注意这个时间是在调用touch3的时候，也就是按道理来讲我们自己注入的代码在最后一步之前栈空间还是完好无损的可以利用的，所以我们可以在0x00写东西。

理论上你可以紧挨着存，也可以隔一段存，只要你写在0x00的东西的地址是对应的就行。也就是下面来自gemini的解释：

时间差利用和高地址保护

1. **栈帧摧毁机制**：当控制流跳入目标函数（如 `touch3`），且该函数内部继续调用子函数（如 `hexmatch`）时，新分配的局部变量会**向低地址方向（泰山压顶般）疯狂生长**，彻底摧毁 `0x00` 到 `0x58` 区域的数据。
    
2. **巧妙重排（时间与空间的博弈）**：
    
    - **指令放低位 (`0x00`)**：由于0x00，也就是mov rax rdi ret指令的执行发生在 `touch3` 被调用**之前**，属于"提前消费"，执行完毕后即使被摧毁也无妨。
        
    - **字符串放高位 (`>0x60`)**：字符串属于"延时读取"数据，必须越过返回地址槽位，存放在栈的高地址"安全区"，避开 `hexmatch` 的栈帧生长路径。
        

![phase3 栈布局](/csapp-lab-pics/Pasted%20image%2020260515174132.png)


在计算机底层，CPU 是极其"愚蠢"的，它完全没有"整数"、"字符串"或"指针"的概念。在它眼里，`%rdi` 寄存器里装的永远只是一串 64 位的 0 和 1。决定这串 0 和 1 命运的，是 `touch2` 和 `touch3` 函数内部**固化的汇编指令**的不同。

`void touch2(unsigned val);`

`void touch3(char *sval);`

注意touch2和touch3函数对传入的参数的定义，touch2决定将其读为一个无符号整数，而touch3决定将其读为字符串指针，这是为什么在touch3要传字符串指针，要在0x00写一个地址。

同时，我们可以意识到在touch3中栈空间会重新从上图0x60往下长，不会影响高地址处的存放。

---

##  5. Phase4

从这里我们进入rtarget，也是更贴近现实的情景。还是先看PDF，提取信息：

**防线状态**：开启 ASLR (栈地址随机化) + NX Bit (栈不可执行)。

**攻击范式**：Return-Oriented Programming  (ROP)。

所以我们不能再像phase2一样跳绝对地址，因为每次的绝对地址都不一样

PDF也提示我们，要充分利用farm中给到的gadgets，复用已有的代码但达成不同的效果

仔细看objdump -d rtarget > rtarget.s 的内容

会发现在touch函数下面是有完整的farm的

一开始我没看到，我在farm.s里找，非常的傻逼

实际上如果rtarget.s里真没有，也没法做啊，要执行的代码必须要在rtarget里有才行

看到farm了，再结合PDF的那些表格，大概可以看到farm通过写一些很大的数让汇编出来的机器码中出现了诸如48 89 c7这种可以被识别为mov rax rdi ret 的片段，也有58 c3 这种 pop rax 的体现


![phase4 gadget 搜索](/csapp-lab-pics/Pasted%20image%2020260517195642.png)

解释：

依旧getbuf ret之后我们要填一个地址 

rip=rsp=0x58， **rsp=0x60**

这里我是在40 20 b9找到了pop rax

![phase4 pop rax](/csapp-lab-pics/Pasted%20image%2020260517200628.png)

如图，即执行58 90 c3，58（pop）把rsp的值写到rax中，**并使rsp+8等于0x68**

90为nop，c3为ret，此时rip=rsp=0x68，rsp=0x70

顺理成章跳到40 20 ab 也就是mov rax rdi ret

![phase4 mov rax rdi](/csapp-lab-pics/Pasted%20image%2020260517201955.png)

如图，即执行48 89 c7 c3，cookie被放在rdi中了

ret时rip=rsp=0x70，rsp=0x78，顺理成章跳touch4


---

## 6. Phase5 

这个能不用AI做可以封神了，需要"注意到"的东西实在太多了

本次重中之重是发现farm里有加法器 add_xy 以及注意到最后的地址可以用rsp+offset实现，同时注意到需要合理分配传递链。

首先还是看PDF，他说了三点：

1、我们需要借助movl实现，我一开始以为只需要movl，我没看到那个in addition to，原来是都要用，还是太草率了。**movl会自动截断高32位**，一开始我也没意识到这会有什么后果。

2、These include instructions, shown in Figure 3D, such as andb %al,%al, that operate on the low-order bytes of some of the registers but do not change their values. 

就是说3D里面那些玩意（学名：functional nops）要是在需要利用的代码里看到了就当没看到，因为不会影响效果。这些不是重点。

3、官方解法要 8 gadgets 恐怖捏

以及我觉得最重要的还是注意到加法器的反汇编码。

![phase5 加法器](/csapp-lab-pics/Pasted%20image%2020260517202218.png)
   
大家的一开始想法肯定还是类似phase4一样把cookie存在一个地方，但是字符串是一个地址，而由于每次运行地址不确定，不能直接跳。又因为参考phase3发现其实需要传两个地址，所以联想到需要传两个参数，但是不太能想到是以"地址+偏移量"的打法。

我的做法只能是在rtarget.s里搜索/48 89，你会发现基本仅有 `48 89 e0` (`movq %rsp, %rax`) 和 `48 89 c7` (`movq %rax, %rdi`) 。也就是说如果想操作一个64位的玩意，必须最后把它放在rdi里。

再在rtarget.s里搜索89，会看到类似mov eax edx mov edx ecx mov ecx esi的机器码，经过一系列的移动（一般是三个）可以把一个32位数移动到rsi里，完美契合加法器的rdi和rsi（也合理，因为这是约定的传参的前两个寄存器）

**资源分配**


1. **大数 (全 64 位栈基址) -> 分配给 `%rdi`**
    
    - **路径**：`%rsp` →(movq)→ `%rax` →(movq)→ `%rdi`
        
    - **原理**：这是全场唯一的 64 位保真通道。必须用它来承载包含高位的动态栈基址。
        
2. **小数 (32 位固定偏移量) -> 分配给 `%rsi`**
    
    - **路径**：栈内存 →(pop)→ `%rax` →(movl 多次中转)→ `%esi`
        
    - **原理**：字符串相对于捕获点的偏移量（如 `0x48`）是个极小的值。使用 32 位的 `movl` 序列传输它时，虽然会清空 `%rsi` 的高 32 位，但由于偏移量本身高位就是 0，因此数值被完美保留。
        
3. **最终收网**：
    
    - 加法器，结果给到rax
        
    - mov rax rdi ret，传touch3
        

![phase5 完整布局](/csapp-lab-pics/Pasted%20image%2020260517195903.png)

解释：

1、0x58 402176是farm里对应的 48 89 e0 c3 mov rsp rax ret 的地址

在getbuf ret后rip=rsp=0x58，**rsp=0x60**

2、0x60 4020ab是farm里对应的 mov rax rdi ret 的地址

3、0x68 4020b9是farm里对应的 pop rax ret 的地址

4、0x70 偏移量为0x48 这里就将0x48给到rax

如何计算偏移量？

我们希望touch3在执行`void touch3(char *sval);`的时候查到cookie字符串的地址，在上图中就是0xa8，而我们传给他的是用rsp+offset构成的

首先确定rsp：第一步中，rsp=0x60；所以，offset=0xa8-0x60=0x48

偏移量的值决定你如何排列自己的注入代码，一般认为，上图的写法是比较自然的

5、0x78-0x88 三步移动将rax给到rsi

6、0x90 加法器

7、0x98 同0x60 mov rax rdi ret

8、0xa0 touch3

9、字符串

---

phase4和phase5的总结

绕过了栈地址不确定的阻碍，不跳栈附近的绝对地址（phase2和phase3涉及的getbuf缓冲区），跳.text段ASLR不太会影响的区域（即类似0x40开头的地方）

绕过了栈不可执行的阻碍，所有执行的代码全部都存在rtarget的farm中，这些都是写在.text 代码段的


评价：非人题目

# gcc


格式形如gcc -x x.c -x x.x

-o output

-c compile（只编译不链接）

具体举例

1、直接生成可执行文件a.out

gcc hello.c

2、生成可重定向目标文件

gcc -c hello.c

3、将hello.c和add.c共同编译为可执行文件mama

一步到位 gcc hello.c add.c -o mama

或者分开写

gcc -c hello.c -o hello.o

gcc -c add.c -o add.o

gcc hello.o add.o -o mama

直接gcc -c hello.c 

4、对main.c加入调试信息和O2优化等级

gcc -g -O2 main.c -o main

这样才能用gdb调试

5、全部加起来

gcc -g -O2 -c main.c -o main.o


# strings


strings 文件名（hello.o或a.out或bomb） 可以看到所有可打印的字符串

strings -n 数字 bomb

大于某个字符的字符串

strings -t d main

十进制方式显示字符串偏移量

strings main | grep -i ”Error"

定位包含Error的字符串，grep类似ctrl F，-i忽略大小写


# objdump


objdump -d bomb &gt; bomb.s

-d为disassemble 反汇编text节 生成人可能能看懂的东西

objdump -S bomb &gt; bomb.s

前提文件是由gcc -g（加了调试信息）编译的，因此不适用于bomb lab本身

生成C代码和反汇编码对应的人更能看懂的东西

objdump -s -j .rodata bomb &gt; bomb.s


# gdb


最强大的调试器

1、准备阶段

breakpoint 简称b 设断点

delete 简称d 删除断点

注意删除的是断点的序号

断点的序号可以用info来查

即 info b


x 最强大的查看内存的指令

x / n f u addr

n 显示单位数

f 单位大小 b 1字节 h 2字节 w 4字节 g 8字节 即byte halfword word giantword

u x十六进制 d十进制 s字符串 i指令


举例

x/10gx $rsp

查看10个单位每个单位8字节的十六进制的栈上地址

x/s 查看字符串


layout src

可以和源代码对比，前提是有，上方显示源代码下方显示调试行

打了断点的地方会有标识

常常出现画面重叠，用ctrl l刷新即可


print 简称p

这个在bomb lab基本没啥用 在bomb lab前面的小作业里因为有源码常常可以用


2、运行阶段

run 简称r

next 简称n 跳过函数执行下一步

在汇编阶段 使用ni next instruction

step 简称s 不跳过，也就是进入函数执行下一步 同理使用si

continue 简称c 直奔下一个breakpoint

disas 函数名 直接展示某函数反汇编码


3、结束阶段

q quit

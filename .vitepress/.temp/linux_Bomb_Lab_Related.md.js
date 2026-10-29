import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"gcc","description":"","frontmatter":{},"headers":[],"relativePath":"linux/Bomb_Lab_Related.md","filePath":"linux/Bomb_Lab_Related.md"}');
const _sfc_main = { name: "linux/Bomb_Lab_Related.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="gcc" tabindex="-1">gcc <a class="header-anchor" href="#gcc" aria-label="Permalink to &quot;gcc&quot;">​</a></h1><p>格式形如gcc -x x.c -x x.x</p><p>-o output</p><p>-c compile（只编译不链接）</p><p>具体举例</p><p>1、直接生成可执行文件a.out</p><p>gcc hello.c</p><p>2、生成可重定向目标文件</p><p>gcc -c hello.c</p><p>3、将hello.c和add.c共同编译为可执行文件mama</p><p>一步到位 gcc hello.c add.c -o mama</p><p>或者分开写</p><p>gcc -c hello.c -o hello.o</p><p>gcc -c add.c -o add.o</p><p>gcc hello.o add.o -o mama</p><p>直接gcc -c hello.c</p><p>4、对main.c加入调试信息和O2优化等级</p><p>gcc -g -O2 main.c -o main</p><p>这样才能用gdb调试</p><p>5、全部加起来</p><p>gcc -g -O2 -c main.c -o main.o</p><h1 id="strings" tabindex="-1">strings <a class="header-anchor" href="#strings" aria-label="Permalink to &quot;strings&quot;">​</a></h1><p>strings 文件名（hello.o或a.out或bomb） 可以看到所有可打印的字符串</p><p>strings -n 数字 bomb</p><p>大于某个字符的字符串</p><p>strings -t d main</p><p>十进制方式显示字符串偏移量</p><p>strings main | grep -i ”Error&quot;</p><p>定位包含Error的字符串，grep类似ctrl F，-i忽略大小写</p><h1 id="objdump" tabindex="-1">objdump <a class="header-anchor" href="#objdump" aria-label="Permalink to &quot;objdump&quot;">​</a></h1><p>objdump -d bomb &gt; bomb.s</p><p>-d为disassemble 反汇编text节 生成人可能能看懂的东西</p><p>objdump -S bomb &gt; bomb.s</p><p>前提文件是由gcc -g（加了调试信息）编译的，因此不适用于bomb lab本身</p><p>生成C代码和反汇编码对应的人更能看懂的东西</p><p>objdump -s -j .rodata bomb &gt; bomb.s</p><h1 id="gdb" tabindex="-1">gdb <a class="header-anchor" href="#gdb" aria-label="Permalink to &quot;gdb&quot;">​</a></h1><p>最强大的调试器</p><p>1、准备阶段</p><p>breakpoint 简称b 设断点</p><p>delete 简称d 删除断点</p><p>注意删除的是断点的序号</p><p>断点的序号可以用info来查</p><p>即 info b</p><p>x 最强大的查看内存的指令</p><p>x / n f u addr</p><p>n 显示单位数</p><p>f 单位大小 b 1字节 h 2字节 w 4字节 g 8字节 即byte halfword word giantword</p><p>u x十六进制 d十进制 s字符串 i指令</p><p>举例</p><p>x/10gx $rsp</p><p>查看10个单位每个单位8字节的十六进制的栈上地址</p><p>x/s 查看字符串</p><p>layout src</p><p>可以和源代码对比，前提是有，上方显示源代码下方显示调试行</p><p>打了断点的地方会有标识</p><p>常常出现画面重叠，用ctrl l刷新即可</p><p>print 简称p</p><p>这个在bomb lab基本没啥用 在bomb lab前面的小作业里因为有源码常常可以用</p><p>2、运行阶段</p><p>run 简称r</p><p>next 简称n 跳过函数执行下一步</p><p>在汇编阶段 使用ni next instruction</p><p>step 简称s 不跳过，也就是进入函数执行下一步 同理使用si</p><p>continue 简称c 直奔下一个breakpoint</p><p>disas 函数名 直接展示某函数反汇编码</p><p>3、结束阶段</p><p>q quit</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("linux/Bomb_Lab_Related.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Bomb_Lab_Related = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Bomb_Lab_Related as default
};

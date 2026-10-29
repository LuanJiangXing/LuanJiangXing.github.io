import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"cs study","description":"","frontmatter":{},"headers":[],"relativePath":"csnotes.md","filePath":"csnotes.md"}');
const _sfc_main = { name: "csnotes.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><hr><h1 id="cs-study" tabindex="-1">cs study <a class="header-anchor" href="#cs-study" aria-label="Permalink to &quot;cs study&quot;">​</a></h1><div class="info custom-block"><p class="custom-block-title">Introduction</p><p>这个部分总结了cs noob的学习历程。</p></div><h2 id="fuck-study" tabindex="-1">fuck study <a class="header-anchor" href="#fuck-study" aria-label="Permalink to &quot;fuck study&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">News</p><p>我正试图把我的笔记搬到这上面来。</p></div><h3 id="lab-notes" tabindex="-1">Lab Notes <a class="header-anchor" href="#lab-notes" aria-label="Permalink to &quot;Lab Notes&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">Lab Notes</p><p>👉<a href="./lab-notes/0413lab.html">0413 实验报告</a> 👉<a href="./lab-notes/0420lab.html">0420 实验报告</a> 👉<a href="./lab-notes/0525lab.html">0525 实验报告</a> 👉<a href="./lab-notes/0601lab.html">0601 实验报告</a></p></div><h3 id="linux" tabindex="-1">Linux <a class="header-anchor" href="#linux" aria-label="Permalink to &quot;Linux&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">Linux Notes</p><p>👉<a href="./linux/HelloLinux.html">Hello Linux</a> 👉<a href="./linux/Linux_commands.html">Linux commands</a> 👉<a href="./linux/gdb_x_command.html">gdb x command</a> 👉<a href="./linux/Bomb_Lab_Related.html">Bomb Lab related</a> 👉<a href="./linux/Bomb_Lab.html">Bomb Lab</a> 👉<a href="./linux/Attack_Lab.html">Attack Lab</a></p></div><h2 id="love-study" tabindex="-1">love study <a class="header-anchor" href="#love-study" aria-label="Permalink to &quot;love study&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">Courses</p><p>我正在上高等数学、计算机系统基础、面向对象程序设计。</p></div><h2 id="my-little-janky-project" tabindex="-1">my little janky project <a class="header-anchor" href="#my-little-janky-project" aria-label="Permalink to &quot;my little janky project&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">Userscripts</p><p><a href="https://github.com/LuanJiangXing/my-userscripts/blob/main/icourse%E8%A7%86%E9%A2%91%E5%8A%A9%E6%89%8B-1.2.user.js" target="_blank" rel="noreferrer"> Icourse helper </a></p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("csnotes.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const csnotes = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  csnotes as default
};

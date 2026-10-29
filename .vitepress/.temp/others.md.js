import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"其他杂项","description":"","frontmatter":{},"headers":[],"relativePath":"others.md","filePath":"others.md"}');
const _sfc_main = { name: "others.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><hr><h1 id="其他杂项" tabindex="-1">其他杂项 <a class="header-anchor" href="#其他杂项" aria-label="Permalink to &quot;其他杂项&quot;">​</a></h1><h2 id="other-courses" tabindex="-1">Other Courses <a class="header-anchor" href="#other-courses" aria-label="Permalink to &quot;Other Courses&quot;">​</a></h2><div class="info custom-block"><p class="custom-block-title">English Pre</p><ul><li><a href="https://www.bilibili.com/video/BV1QCScB1E4o" target="_blank" rel="noreferrer">English Argumentative Writing</a></li><li>Public Speaking</li></ul></div><h2 id="music-related" tabindex="-1">Music-Related <a class="header-anchor" href="#music-related" aria-label="Permalink to &quot;Music-Related&quot;">​</a></h2><div class="info custom-block"><p class="custom-block-title">Original</p><ul><li><a href="https://www.bilibili.com/video/BV1xeTE67EoB" target="_blank" rel="noreferrer">校车时代</a></li><li><a href="https://www.bilibili.com/video/BV12gTb6CELN" target="_blank" rel="noreferrer">云雨</a></li></ul></div><div class="info custom-block"><p class="custom-block-title">Cover</p><p><a href="https://space.bilibili.com/1641506378/upload/audio" target="_blank" rel="noreferrer">我的翻唱</a></p></div><h2 id="activities" tabindex="-1">Activities <a class="header-anchor" href="#activities" aria-label="Permalink to &quot;Activities&quot;">​</a></h2><div class="info custom-block"><p class="custom-block-title">Jogging</p><ul><li><a href="/interests/health/202603_run.jpg">2026年3月跑步记录</a></li><li><a href="/interests/health/202604_run.jpg">2026年4月跑步记录</a></li><li><a href="/interests/health/202605_run.jpg">2026年5月跑步记录</a></li><li><a href="/interests/health/202606_run.jpg">2026年6月跑步记录</a></li></ul></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("others.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const others = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  others as default
};

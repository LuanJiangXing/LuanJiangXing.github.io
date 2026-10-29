import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"linux/HelloLinux.md","filePath":"linux/HelloLinux.md"}');
const _sfc_main = { name: "linux/HelloLinux.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="linux入门" tabindex="-1">linux入门 <a class="header-anchor" href="#linux入门" aria-label="Permalink to &quot;linux入门&quot;">​</a></h2><p>开源操作系统内核（严格意义不包含操作系统全部）</p><p>ubuntu、debian等是基于linux的完整操作系统</p><p>ubuntu适合个人桌面用</p><p>fedora是新的不稳定但对ai训练比较有用</p><p>GNU 开源操作系统的鼻祖</p><p>相比windows： 文件系统 权限管理</p><p>文件系统 一切皆文件</p><p>权限管理 r读w写x执行</p><p>三组权限：用户 user 用户组 group 其他用户 others</p><p>Chmod change mode 修改（某文件/目录）权限</p><p>Eg chmod 755 文件名 chmod 644 文件名 chmod +x 文件名</p><p>7=4+2+1 rwx</p><p>5 = 4+1 r-x</p><p>6 = 4+2 rw-</p><p>Chown change owner 修改文件（夹）的所有者/所属组</p><p>相比windows 树状结构，无C盘D盘这种 包管理器</p><p>2、安装虚拟机和ubuntu</p><p>终端：Shell</p><p>virtualbox最适配windows，当然安装包比较大</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("linux/HelloLinux.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HelloLinux = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  HelloLinux as default
};

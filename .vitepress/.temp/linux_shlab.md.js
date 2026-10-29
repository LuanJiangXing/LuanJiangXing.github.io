import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Shell Lab","description":"","frontmatter":{},"headers":[],"relativePath":"linux/shlab.md","filePath":"linux/shlab.md"}');
const _sfc_main = { name: "linux/shlab.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="shell-lab" tabindex="-1">Shell Lab <a class="header-anchor" href="#shell-lab" aria-label="Permalink to &quot;Shell Lab&quot;">​</a></h1><h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h2><p><a href="https://csapp.cs.cmu.edu/3e/shlab.pdf" target="_blank" rel="noreferrer">https://csapp.cs.cmu.edu/3e/shlab.pdf</a></p><h2 id="看代码" tabindex="-1">看代码 <a class="header-anchor" href="#看代码" aria-label="Permalink to &quot;看代码&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>char prompt[] = &quot;tsh&gt; &quot;;</span></span></code></pre></div><p>shell会输出tsh&gt;提示输入</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>char cmdline[MAXLINE];</span></span></code></pre></div><p>MAXLINE为1024，cmdline为装输入的东西的字符串数组</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>while (1) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        /* Read command line */</span></span>
<span class="line"><span>        if (emit_prompt) {</span></span>
<span class="line"><span>            printf(&quot;%s&quot;, prompt);</span></span>
<span class="line"><span>            fflush(stdout);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if ((fgets(cmdline, MAXLINE, stdin) == NULL) &amp;&amp; ferror(stdin))</span></span>
<span class="line"><span>            app_error(&quot;fgets error&quot;);</span></span>
<span class="line"><span>        if (feof(stdin)) { /* End of file (ctrl-d) */</span></span>
<span class="line"><span>            fflush(stdout);</span></span>
<span class="line"><span>            exit(0);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        /* Evaluate the command line */</span></span>
<span class="line"><span>        eval(cmdline);</span></span>
<span class="line"><span>        fflush(stdout);</span></span>
<span class="line"><span>        fflush(stdout);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>这一段是shell执行逻辑，本质是一个死循环不断等用户输入，执行用户输入</p><p>eval(cmdline)即执行用户输入的根本逻辑，是第一个要实现的函数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>int parseline(const char *cmdline, char **argv)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    static char array[MAXLINE]; /* holds local copy of command line */</span></span>
<span class="line"><span>    char *buf = array;          /* ptr that traverses command line */</span></span>
<span class="line"><span>    char *delim;                /* points to first space delimiter */</span></span>
<span class="line"><span>    int argc;                   /* number of args */</span></span>
<span class="line"><span>    int bg;                     /* background job? */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    strcpy(buf, cmdline);</span></span>
<span class="line"><span>    buf[strlen(buf)-1] = &#39; &#39;;  /* replace trailing &#39;\\n&#39; with space */</span></span>
<span class="line"><span>    while (*buf &amp;&amp; (*buf == &#39; &#39;)) /* ignore leading spaces */</span></span>
<span class="line"><span>        buf++;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /* Build the argv list */</span></span>
<span class="line"><span>    argc = 0;</span></span>
<span class="line"><span>    if (*buf == &#39;\\&#39;&#39;) {</span></span>
<span class="line"><span>        buf++;</span></span>
<span class="line"><span>        delim = strchr(buf, &#39;\\&#39;&#39;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    else {</span></span>
<span class="line"><span>        delim = strchr(buf, &#39; &#39;);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span></code></pre></div><p>const char * cmdline 强调只读字符串 char ** argv强调对char* argv取值</p><p>buf是一个游标指针 负责从左往右读输入的字符串</p><p>先把最后的\\n替换为空格，再把开头可能存在的空格都省掉</p><p>这个&#39;代表什么？</p><h2 id="写代码" tabindex="-1">写代码 <a class="header-anchor" href="#写代码" aria-label="Permalink to &quot;写代码&quot;">​</a></h2><h2 id="关键知识点" tabindex="-1">关键知识点 <a class="header-anchor" href="#关键知识点" aria-label="Permalink to &quot;关键知识点&quot;">​</a></h2><h2 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-label="Permalink to &quot;常见问题&quot;">​</a></h2></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("linux/shlab.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const shlab = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  shlab as default
};

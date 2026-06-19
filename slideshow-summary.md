# 封面背景图幻灯片功能 — 开发记录

## 今天做了什么

### 1. 封面背景图淡入淡出切换
- **之前**：首页封面固定使用 `bg-akaroa.png` 一张背景图
- **现在**：3 张图（Akaroa / Iceland / Yukon）每 8 秒循环切换，2.5 秒淡入淡出过渡

### 2. 图注（Caption）
- 每张图显示对应的**地点名称 + Google Maps 链接**
- 位置：右上角 GitHub icon 下方（`top: 72px; right: 32px`）
- 点击文字直接跳转链接，悬停变色
- 切换图片时 caption 同步淡出/淡入

### 3. 修复的问题
| 问题 | 原因 | 解决 |
|------|------|------|
| 图片与文字错位 | 多次调度导致定时器不同步 | 防重复初始化 `slideshowInitialized` 标志位 |
| 首次加载 20 多秒才切换 | 图片未预加载，切换时才开始下载 | `new Image()` 预加载所有图片后再启动定时器 |
| DOM 插入顺序导致索引错位 | `insertBefore` 每次插在最前面，querySelectorAll 顺序反转 | 改用 `slideElements` 数组维护引用 |
| 第一张图黑屏 | 只有第 2、3 张预加载，第一张直接设置 background-image 等下载 | 统一预加载所有图片 |
| F5 刷新布局混乱 | 背景层插入 VPHome 内部，干扰 SSR 水合 | 改为插入 `document.body` |
| 背景出现在非首页 | 未监听路由变化 | 添加 `cleanUpBg()` + `router.onAfterRouteChange` 监听 |

---

## 1. 关于「只在首页显示」的实现

### 当前做法（繁琐版）
- `enhanceApp` 中每次路由变化调用 `router.onAfterRouteChange`
- 判断当前页面是否有 `.VPHome` 元素，决定创建或清除

### 更好的替代方案
**方案 A：使用 CSS `display:none` 控制**
- 不在 JS 中频繁增删 DOM，而是一次创建后常驻 body
- 通过 CSS 在非首页隐藏：
  ```css
  /* 非首页隐藏背景 */
  .bg-slide, .bg-caption {
    display: none;
  }
  /* 首页显示 */
  .VPHome ~ .bg-slide,
  .VPHome ~ .bg-caption {
    display: block;
  }
  ```
  但 `.VPHome` 与 `body` 下的元素不是兄弟关系，CSS 选择器不好写。

**方案 B：不使用 onAfterRouteChange，直接检查页面内容**
- 每次路由变化时，简单检查 `.VPHome` 是否存在
- 存在且背景未创建 → 创建
- 不存在且背景已创建 → 清除
- 跟当前做法本质上一样，这是不可避免的逻辑

**方案 C：只在首页渲染逻辑（最优雅）**
- 不把背景层放在全局 `enhanceApp` 中
- 在 `index.md` 对应的 Vue 组件级别注入背景逻辑
- 需要创建一个自定义 Vue 组件，侵入性稍大

**结论**：当前做法虽然略显繁琐，但逻辑清晰、自包含。如果要简化，可以去掉 `tryInit` 轮询，直接用 `router.onBeforeRouteChange` + `onAfterRouteChange` 配合一次判断即可。目前没有严重问题，**保持现状即可**。

---

## 2. 关于图片加载卡顿

3 张背景图在页面加载时同时下载，如果图片较大（尤其是 PNG）会导致白屏/卡顿。

### 未来可做的优化

| 优化方案 | 说明 |
|---------|------|
| **压缩图片** | PNG → WebP 或 AVIF，体积可缩小 60-80% |
| **渐进加载** | 第一张图加载完就显示，不等全部加载完 |
| **懒加载第 2、3 张** | 第 1 张显示后，再逐个加载后续图片 |
| **设置合理尺寸** | 输出为 1920px 宽即可，不必原图 |

**今天不动，仅记录。**

---

## 3. 如何添加一张新图片及其文字注释和链接

只需改 `index.mjs` 顶部的**配置区**，两个数组同步添加即可：

```javascript
// ==================== 配置区 ====================
const BG_IMAGES = [
  '/bg-akaroa.png',      // 第1张
  '/bg-iceland.png',      // 第2张
  '/bg-yukon.png',        // 第3张
  '/bg-new.png'           // ← 新增：把图片放到 public/ 目录下，写上路径
]

const BG_CAPTIONS = [
  { text: 'Akaroa, New Zealand',  link: 'https://maps.app.goo.gl/...' },
  { text: 'Múlaþing, Iceland',   link: 'https://maps.app.goo.gl/...' },
  { text: 'Yukon, Canada',        link: 'https://maps.app.goo.gl/...' },
  { text: 'New Place, Country',   link: 'https://maps.app.goo.gl/...' }  // ← 新增
]
// ================================================
```

**逻辑：** `BG_IMAGES` 和 `BG_CAPTIONS` 是按**索引一一对应**的：
- `BG_IMAGES[0]` ↔ `BG_CAPTIONS[0]`（第1张图 → 第1条文字）
- `BG_IMAGES[1]` ↔ `BG_CAPTIONS[1]`（第2张图 → 第2条文字）
- 以此类推

**三步走：**
1. 把图片文件放到 `public/` 目录下
2. `BG_IMAGES` 数组末位加上图片路径
3. `BG_CAPTIONS` 数组末位加上对应的文字和链接

顺序必须一致，JS 自动按索引配对，不需要改 CSS 或其他代码。
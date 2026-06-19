import DefaultTheme from 'vitepress/theme'
import './custom.css'

// ==================== 配置区 ====================
// 修改以下参数即可调整封面背景图切换效果
const BG_IMAGES = [
  '/bg-akaroa.png',
  '/bg-iceland.png',
  '/bg-yukon.png'
]
const SWITCH_INTERVAL_MS = 8000   // 每张图显示间隔（毫秒）
const FADE_DURATION_MS   = 2500   // 淡入淡出过渡时长（毫秒）

// 每张背景图对应的图注文字和链接（顺序需与 BG_IMAGES 一一对应）
const BG_CAPTIONS = [
  { text: 'Akaroa, New Zealand',  link: 'https://maps.app.goo.gl/q4pjkWPjrzLATxPz6' },
  { text: 'Múlaþing, Iceland',   link: 'https://maps.app.goo.gl/6oET4Cs4nek6TjRS8' },
  { text: 'Yukon, Canada',        link: 'https://maps.app.goo.gl/wVkgnkj3e1vpfvUX8' }
]
// ================================================

let slideshowInterval = null
let currentIndex = 0
let slideshowInitialized = false

let slideElements = []  // 用数组维护 slide 顺序，不受 DOM 插入顺序影响

function initBgSlideshow() {
  // 防止重复初始化（图片+caption+定时器只创建一次）
  if (slideshowInitialized) return
  slideshowInitialized = true

  const home = document.querySelector('.VPHome')
  if (!home) return

  // 先显示第一张图（立即展示，不用等预加载）
  const firstDiv = document.createElement('div')
  firstDiv.className = 'bg-slide active'
  firstDiv.style.backgroundImage = `url(${BG_IMAGES[0]})`
  firstDiv.style.transition = `opacity ${FADE_DURATION_MS}ms ease`
  home.insertBefore(firstDiv, home.firstChild)
  slideElements = [firstDiv]  // slideElements[0] = 第一张图

  // 预加载第 2、3 张图片（在后台下载），全部加载完后再创建剩余图层 + 启动定时器
  const preloadPromises = BG_IMAGES.slice(1).map(src => {
    return new Promise(resolve => {
      const img = new Image()
      img.onload = resolve
      img.onerror = resolve
      img.src = src
    })
  })

  Promise.all(preloadPromises).then(() => {
    // 图片已下载到浏览器缓存，创建剩余背景层
    BG_IMAGES.slice(1).forEach((img) => {
      const div = document.createElement('div')
      div.className = 'bg-slide'
      div.style.backgroundImage = `url(${img})`
      div.style.transition = `opacity ${FADE_DURATION_MS}ms ease`
      home.insertBefore(div, home.firstChild)
      slideElements.push(div)  // 按索引顺序保存引用
    })

    // 创建图注元素
    const caption = document.createElement('div')
    caption.className = 'bg-caption'
    caption.style.transition = `opacity ${FADE_DURATION_MS}ms ease`
    caption.style.opacity = '1'
    caption.innerHTML = `<a href="${BG_CAPTIONS[0].link}" target="_blank" rel="noopener">${BG_CAPTIONS[0].text}</a>`
    home.appendChild(caption)

    currentIndex = 0

    // 启动定时器，此时所有图片已在缓存中，第一次切换立刻生效
    slideshowInterval = setInterval(() => {
      if (slideElements.length === 0) return

      slideElements[currentIndex].classList.remove('active')
      currentIndex = (currentIndex + 1) % slideElements.length
      slideElements[currentIndex].classList.add('active')

      caption.style.opacity = '0'
      setTimeout(() => {
        caption.innerHTML = `<a href="${BG_CAPTIONS[currentIndex].link}" target="_blank" rel="noopener">${BG_CAPTIONS[currentIndex].text}</a>`
        caption.style.opacity = '1'
      }, FADE_DURATION_MS / 2)
    }, SWITCH_INTERVAL_MS)
  })
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    if (typeof window !== 'undefined') {
      const tryInit = () => {
        if (document.querySelector('.VPHome')) {
          initBgSlideshow()
        } else {
          setTimeout(tryInit, 300)
        }
      }
      tryInit()
    }
  }
}

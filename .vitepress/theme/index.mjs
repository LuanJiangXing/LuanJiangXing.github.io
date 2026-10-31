import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted } from 'vue'
import './custom.css'
import { setupImageZoom, closeImageZoom } from './image-zoom.mjs'
import {
  setupImmersive,
  setImmersiveVisible,
  resetImmersive
} from './immersive.mjs'

// ==================== 配置区 ====================
// 修改以下参数即可调整封面背景图切换效果
const SWITCH_INTERVAL_MS = 8000   // 每张图显示间隔（毫秒）
const FADE_DURATION_MS   = 2500   // 淡入淡出过渡时长（毫秒）

// 幻灯片配置：每张图包含图片路径、图注文字和链接
// 按显示顺序排列，无需维护两个数组的索引对应关系
const BG_SLIDES = [
  {
    image: '/webp_bg/bg-akaroa.webp',
    caption: 'Canterbury, New Zealand',
    link: 'https://maps.app.goo.gl/q4pjkWPjrzLATxPz6'
  },
  {
    image: '/webp_bg/bg-iceland.webp',
    caption: 'Múlaþing, Iceland',
    link: 'https://maps.app.goo.gl/zkyneHXENGg2GEGH8'
  },
  {
    image: '/webp_bg/bg-yukon.webp',
    caption: 'Yukon, Canada',
    link: 'https://maps.app.goo.gl/wVkgnkj3e1vpfvUX8'
  },
  {
    image: '/webp_bg/bg-kz.webp',
    caption: 'Almaty, Kazakhstan',
    link: 'https://maps.app.goo.gl/hwH3iLJzvvc9Rfcr7'
  },
  {
    image: '/webp_bg/bg-peru.webp',
    caption: 'Ancash, Peru',
    link: 'https://maps.app.goo.gl/fJBsxjHPH5c15EBW7'
  },
  {
    image: '/webp_bg/bg-mongolia.webp',
    caption: 'Khovd, Mongolia',
    link: 'https://maps.app.goo.gl/zZKMr5KRUevQVAbP9'
  }
]
// ================================================

let slideshowInterval = null
let currentIndex = 0
let captionElement = null

let slideElements = []  // 用数组维护 slide 顺序，索引对应 BG_SLIDES 索引
let loadedImages = new Set() // 记录已加载的图片

// 防止并行初始化的锁
let initPromise = null

// 当前轮播的洗牌顺序（保存 BG_SLIDES 索引，按播放顺序排列）
let shuffleOrder = []

/**
 * 预加载单张图片
 * @param {string} src - 图片路径
 * @returns {Promise<boolean>} - 是否加载成功
 */
function preloadImage(src) {
  return new Promise(resolve => {
    if (loadedImages.has(src)) {
      resolve(true)
      return
    }
    
    const img = new Image()
    img.onload = () => {
      loadedImages.add(src)
      resolve(true)
    }
    img.onerror = () => {
      console.warn('Failed to load image:', src)
      resolve(false)
    }
    img.src = src
  })
}

/**
 * 创建背景图层
 * @param {number} index - 幻灯片索引（对应 BG_SLIDES）
 * @param {boolean} isActive - 是否为当前激活的幻灯片
 */
function createSlideElement(index, isActive) {
  const slide = BG_SLIDES[index]
  const div = document.createElement('div')
  div.className = 'bg-slide' + (isActive ? ' active' : '')
  div.style.backgroundImage = `url(${slide.image})`
  div.style.transition = `opacity ${FADE_DURATION_MS}ms ease`
  document.body.appendChild(div)
  // 确保 slideElements[index] 对应 BG_SLIDES[index]
  slideElements[index] = div
  return div
}

/**
 * 创建或复用图注元素
 */
function createCaptionElement() {
  if (captionElement) {
    return captionElement
  }
  const caption = document.createElement('div')
  caption.className = 'bg-caption'
  caption.style.transition = `opacity ${FADE_DURATION_MS}ms ease`
  caption.style.opacity = '0'
  document.body.appendChild(caption)
  captionElement = caption
  return captionElement
}

/**
 * 更新图注内容
 * @param {number} index - 幻灯片索引
 */
function updateCaption(index) {
  if (!captionElement) return
  
  const slide = BG_SLIDES[index]
  captionElement.style.opacity = '0'
  
  setTimeout(() => {
    captionElement.innerHTML = `<a href="${slide.link}" target="_blank" rel="noopener">${slide.caption}</a>`
    captionElement.style.opacity = '1'
  }, FADE_DURATION_MS / 2)
}

/**
 * 切换到指定幻灯片
 * @param {number} nextIndex - 目标索引（对应 BG_SLIDES）
 */
function switchToSlide(nextIndex) {
  if (slideElements.length === 0) return
  
  // 移除当前激活状态
  if (slideElements[currentIndex]) {
    slideElements[currentIndex].classList.remove('active')
  }
  
  // 激活下一张
  currentIndex = nextIndex
  if (slideElements[currentIndex]) {
    slideElements[currentIndex].classList.add('active')
  }
  
  // 更新图注
  updateCaption(currentIndex)
}

/**
 * Fisher-Yates 洗牌算法
 * @param {number} length - 数组长度
 * @returns {number[]} - 包含 0 到 length-1 的随机排列
 */
function generateShuffleOrder(length) {
  const arr = Array.from({ length }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * 启动幻灯片定时器
 */
function startSlideshow() {
  slideshowInterval = setInterval(() => {
    // 在 shuffleOrder 中找到当前索引的位置，取下一个
    const pos = shuffleOrder.indexOf(currentIndex)
    const nextPos = (pos + 1) % shuffleOrder.length
    const nextIndex = shuffleOrder[nextPos]
    switchToSlide(nextIndex)
  }, SWITCH_INTERVAL_MS)
}

/**
 * 初始化背景幻灯片
 * 通过 initPromise 锁防止并行调用，如果已有初始化在进行中则等待其完成
 */
async function initBgSlideshow() {
  // 如果已有初始化在进行中，等待它完成（此时可能已被清除，需要重新开始）
  if (initPromise) {
    await initPromise
    // 等待完成后检查是否已被清除（例如路由又变了），若是则重新初始化
    if (slideElements.length === 0) {
      return initBgSlideshow()
    }
    return
  }
  
  initPromise = (async () => {
    // 生成随机洗牌顺序
    shuffleOrder = generateShuffleOrder(BG_SLIDES.length)

    // 按洗牌顺序依次加载所有图片
    for (let i = 0; i < shuffleOrder.length; i++) {
      const idx = shuffleOrder[i]
      const slide = BG_SLIDES[idx]
      
      // 加载图片
      await preloadImage(slide.image)
      
      // 创建图层
      createSlideElement(idx, i === 0)
      
      if (i === 0) {
        // 第一张图：创建并显示图注
        captionElement = createCaptionElement()
        captionElement.innerHTML = `<a href="${slide.link}" target="_blank" rel="noopener">${slide.caption}</a>`
        captionElement.style.opacity = '1'
        currentIndex = idx
      }
    }

    // 启动定时器
    startSlideshow()
  })()
  
  await initPromise
  initPromise = null
}

function cleanUpBg() {
  // 标记初始化已过时（如果有正在进行的初始化，其创建的元素后续会被清除）
  initPromise = null
  
  // 清除定时器
  if (slideshowInterval) {
    clearInterval(slideshowInterval)
    slideshowInterval = null
  }
  
  // 清除背景图层
  slideElements.forEach(el => {
    if (el) el.remove()
  })
  slideElements = []
  
  // 清除图注
  if (captionElement) {
    captionElement.remove()
    captionElement = null
  }
  
  // 重置状态
  loadedImages = new Set()
}

// 首页是否已经启动轮播；用来避免重复初始化
let bgActive = false

/**
 * 根据当前 DOM 同步背景轮播
 * 不能只靠路由钩子：VitePress 在 app.mount() 之前就触发了首次
 * onAfterRouteChange，dev 下 #app 还是空的，查不到 .VPHome；
 * 生产环境因为 HTML 是预渲染的才碰巧能工作。
 */
function syncBackground() {
  if (typeof document === 'undefined') return

  const isHome = !!document.querySelector('.VPHome')
  setImmersiveVisible(isHome)

  if (isHome && !bgActive) {
    bgActive = true
    initBgSlideshow()
  } else if (!isHome && bgActive) {
    bgActive = false
    cleanUpBg()
  }
}

export default {
  extends: DefaultTheme,

  // VitePressApp 的 setup 里会调用它；此时注册的 onMounted
  // 会在整棵页面挂载完成后触发，dev/prod 都能拿到真实的 DOM
  setup() {
    if (typeof window !== 'undefined') {
      onMounted(syncBackground)
    }
  },

  enhanceApp({ app, router }) {
    if (typeof window !== 'undefined') {
      setupImageZoom()
      setupImmersive()

      router.onAfterRouteChange = async () => {
        closeImageZoom()
        resetImmersive()

        // 等新路由的组件真正渲染到 DOM，再判断是不是首页
        await nextTick()
        syncBackground()
      }
    }
  }
}
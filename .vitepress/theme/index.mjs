import DefaultTheme from 'vitepress/theme'
import './custom.css'

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
let slideshowInitialized = false
let captionElement = null

let slideElements = []  // 用数组维护 slide 顺序，索引对应 BG_SLIDES 索引
let loadedImages = new Set() // 记录已加载的图片

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
 * 创建图注元素
 */
function createCaptionElement() {
  // 如果已经存在 caption，直接复用
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
 * 启动幻灯片定时器
 */
function startSlideshow() {
  slideshowInterval = setInterval(() => {
    const nextIndex = (currentIndex + 1) % BG_SLIDES.length
    switchToSlide(nextIndex)
  }, SWITCH_INTERVAL_MS)
}

/**
 * 初始化背景幻灯片
 */
async function initBgSlideshow() {
  // 防止重复初始化
  if (slideshowInitialized) return
  slideshowInitialized = true

  // 随机选择起始索引
  const startIndex = Math.floor(Math.random() * BG_SLIDES.length)

  // 依次加载所有图片（先加载起始图，再加载其余）
  for (let i = 0; i < BG_SLIDES.length; i++) {
    const idx = (startIndex + i) % BG_SLIDES.length
    const slide = BG_SLIDES[idx]
    
    // 加载图片（不中断流程）
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
}

function cleanUpBg() {
  // 清除背景图层和 caption
  slideElements.forEach(el => {
    if (el) el.remove()
  })
  slideElements = []
  if (captionElement) {
    captionElement.remove()
    captionElement = null
  }
  if (slideshowInterval) {
    clearInterval(slideshowInterval)
    slideshowInterval = null
  }
  slideshowInitialized = false
  loadedImages = new Set()
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    if (typeof window !== 'undefined') {
      // 初始化时检查首页
      const checkAndInit = () => {
        if (document.querySelector('.VPHome')) {
          cleanUpBg()
          initBgSlideshow()
        }
      }

      // 首次加载延迟检查（等待 DOM 渲染）
      setTimeout(checkAndInit, 300)

      // 路由切换时统一处理
      router.onAfterRouteChange = () => {
        if (document.querySelector('.VPHome')) {
          cleanUpBg()
          initBgSlideshow()
        } else {
          cleanUpBg()
        }
      }
    }
  }
}
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
  const caption = document.createElement('div')
  caption.className = 'bg-caption'
  caption.style.transition = `opacity ${FADE_DURATION_MS}ms ease`
  caption.style.opacity = '0'
  document.body.appendChild(caption)
  return caption
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
  
  // 预加载下下张图片（提前准备）
  const preloadIndex = (currentIndex + 1) % BG_SLIDES.length
  if (!loadedImages.has(BG_SLIDES[preloadIndex].image)) {
    preloadImage(BG_SLIDES[preloadIndex].image)
  }
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
 * 获取按随机起始点排序的幻灯片数组
 * @param {number} startIndex - 起始索引
 * @returns {Array} - 重新排序后的幻灯片数组，包含原始索引信息
 */
function getSlidesFromStart(startIndex) {
  const slides = []
  for (let i = 0; i < BG_SLIDES.length; i++) {
    const originalIndex = (startIndex + i) % BG_SLIDES.length
    slides.push({
      ...BG_SLIDES[originalIndex],
      originalIndex
    })
  }
  return slides
}

/**
 * 初始化背景幻灯片（渐进加载版本，支持随机起始）
 */
async function initBgSlideshow() {
  // 防止重复初始化
  if (slideshowInitialized) return
  slideshowInitialized = true

  // 随机选择起始索引
  const startIndex = Math.floor(Math.random() * BG_SLIDES.length)
  
  // 获取按随机起始点排序的幻灯片数组
  const orderedSlides = getSlidesFromStart(startIndex)

  // 先加载第一张（随机选中的）图片
  const firstSlide = orderedSlides[0]
  const firstLoaded = await preloadImage(firstSlide.image)
  
  if (!firstLoaded) {
    console.error('首图加载失败，幻灯片功能不可用')
    slideshowInitialized = false
    return
  }

  // 创建第一张幻灯片并立即显示（使用原始索引）
  createSlideElement(firstSlide.originalIndex, true)
  
  // 创建图注并显示
  captionElement = createCaptionElement()
  captionElement.innerHTML = `<a href="${firstSlide.link}" target="_blank" rel="noopener">${firstSlide.caption}</a>`
  captionElement.style.opacity = '1'

  currentIndex = firstSlide.originalIndex

  // 后台异步加载剩余图片（按从起始点开始的顺序）
  const remainingSlides = orderedSlides.slice(1)
  for (const slide of remainingSlides) {
    // 加载图片（失败不影响创建元素）
    await preloadImage(slide.image)
    
    // 无论加载成功与否，都必须创建图层，确保轮播完整性
    // 使用原始索引，使 slideElements 数组完整
    createSlideElement(slide.originalIndex, false)
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
  const caption = document.querySelector('.bg-caption')
  if (caption) caption.remove()
  if (slideshowInterval) {
    clearInterval(slideshowInterval)
    slideshowInterval = null
  }
  slideshowInitialized = false
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    if (typeof window !== 'undefined') {
      const tryInit = () => {
        if (document.querySelector('.VPHome')) {
          cleanUpBg()
          initBgSlideshow()
        } else {
          setTimeout(tryInit, 300)
        }
      }
      tryInit()

      // 路由切换时：离开首页清除背景，回到首页重建
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
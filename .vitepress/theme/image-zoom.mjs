/**
 * 正文图片点击放大
 * 只监听 .vp-doc 内的图片；图片本身是链接时保持原行为。
 * 不依赖任何第三方库，遮罩样式在 custom.css 末尾。
 */

let overlay = null
let lastFocused = null

function ensureOverlay() {
  if (overlay) return overlay

  overlay = document.createElement('div')
  overlay.className = 'image-zoom-overlay'
  overlay.setAttribute('role', 'dialog')
  overlay.setAttribute('aria-modal', 'true')
  overlay.setAttribute('aria-label', '放大查看图片')
  overlay.tabIndex = -1
  overlay.innerHTML = '<img alt="" />'

  overlay.addEventListener('click', (event) => {
    const target = event.target
    if (target === overlay || target.tagName === 'IMG') {
      closeImageZoom()
    }
  })

  document.body.appendChild(overlay)
  return overlay
}

function openImageZoom(source) {
  const el = ensureOverlay()
  const image = el.querySelector('img')

  image.src = source.currentSrc || source.src
  image.alt = source.alt || ''

  lastFocused = document.activeElement
  document.documentElement.classList.add('image-zoom-open')
  el.classList.add('open')
  el.focus()
}

export function closeImageZoom() {
  if (!overlay) return
  overlay.classList.remove('open')
  document.documentElement.classList.remove('image-zoom-open')

  if (lastFocused && typeof lastFocused.focus === 'function') {
    lastFocused.focus()
  }
  lastFocused = null
}

export function setupImageZoom() {
  if (typeof document === 'undefined' || setupImageZoom.done) return
  setupImageZoom.done = true

  document.addEventListener('click', (event) => {
    // 组合键点击、已阻止的点击、图片外面套了链接，都不接管
    if (event.defaultPrevented) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const target = event.target
    const image = target.closest ? target.closest('.vp-doc img') : null
    if (!image || image.closest('a')) return

    event.preventDefault()
    openImageZoom(image)
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeImageZoom()
  })
}

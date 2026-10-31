/**
 * 首页「只看街景」开关
 * 打开后把导航、首屏文字、功能卡片、地点图注都淡出，只留背景轮播。
 * 退出方式：再点一次按钮 / 按 Esc / 点页面任意处。
 */

let button = null
let active = false
let visible = false

const EYE_ON = `
<svg class="icon-on" viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true">
  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
  <circle cx="12" cy="12" r="3" />
</svg>`

const EYE_OFF = `
<svg class="icon-off" viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true">
  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a17.9 17.9 0 0 1-2.16 3.19" />
  <path d="M6.61 6.61A17.9 17.9 0 0 0 2 12s3 8 10 8a9.12 9.12 0 0 0 5.39-1.61" />
  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
  <path d="m2 2 20 20" />
</svg>`

function ensureButton() {
  if (button) return button

  button = document.createElement('button')
  button.type = 'button'
  button.className = 'ui-toggle'
  button.innerHTML = EYE_ON + EYE_OFF
  button.addEventListener('click', (event) => {
    event.stopPropagation()
    setImmersive(!active)
  })

  document.body.appendChild(button)
  syncButton()
  return button
}

function syncButton() {
  if (!button) return
  button.setAttribute('aria-pressed', String(active))
  button.setAttribute('aria-label', active ? '显示界面' : '隐藏界面，只看街景')
  button.title = active ? '显示界面（Esc）' : '只看街景（Esc 退出）'
  button.classList.toggle('is-active', active)
  document.documentElement.classList.toggle('ui-hidden', active)
}

export function setImmersive(next) {
  active = next
  syncButton()
}

/** 只在首页显示这个按钮；离开首页时顺手退出沉浸模式 */
export function setImmersiveVisible(show) {
  visible = show
  document.documentElement.classList.toggle('show-ui-toggle', show)
  if (show) ensureButton()
  if (!show && active) setImmersive(false)
}

export function resetImmersive() {
  if (active) setImmersive(false)
  visible = false
  document.documentElement.classList.remove('show-ui-toggle')
}

export function setupImmersive() {
  if (typeof document === 'undefined' || setupImmersive.done) return
  setupImmersive.done = true

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && active) setImmersive(false)
  })

  // 沉浸模式下点页面任意位置都退出；按钮和地点图注除外，
  // 图注是链接，点它应该去地图而不是退出
  document.addEventListener('click', (event) => {
    if (!active) return
    const target = event.target
    if (!target.closest) {
      setImmersive(false)
      return
    }
    if (target.closest('.ui-toggle') || target.closest('.bg-caption')) return
    setImmersive(false)
  })

  // 在首页时确保按钮已创建（路由钩子之外，刷新后也能补上）
  window.addEventListener('load', () => {
    if (visible) ensureButton()
  })
}

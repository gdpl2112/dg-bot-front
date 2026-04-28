import {ref, watch} from 'vue'

/** localStorage 存储键 */
const STORAGE_KEY = 'user-wallpaper'

/** 全局共享的壁纸URL响应式状态（单例模式） */
const wallpaperUrl = ref(localStorage.getItem(STORAGE_KEY) || '')

/**
 * 壁纸管理 composable
 * 提供壁纸的读取、设置、重置功能，并自动同步到 localStorage 和 body 样式
 */
export function useWallpaper() {
  /**
   * 将壁纸URL应用到 body 背景样式
   * @param url 壁纸图片URL，为空则清除自定义壁纸恢复默认
   */
  function applyWallpaper(url: string) {
    if (url) {
      document.body.style.backgroundImage = `url("${url}")`
      document.body.style.backgroundRepeat = 'no-repeat'
      document.body.style.backgroundPosition = 'center'
      document.body.style.backgroundSize = 'cover'
      document.body.style.backgroundAttachment = 'fixed'
    } else {
      // 清除内联样式，让 CSS 默认壁纸生效
      document.body.style.removeProperty('background-image')
      document.body.style.removeProperty('background-repeat')
      document.body.style.removeProperty('background-position')
      document.body.style.removeProperty('background-size')
      document.body.style.removeProperty('background-attachment')
    }
  }

  /**
   * 设置用户自定义壁纸
   * @param url 壁纸图片URL，非空
   */
  function setWallpaper(url: string) {
    if (!url.trim()) return
    wallpaperUrl.value = url.trim()
    localStorage.setItem(STORAGE_KEY, url.trim())
    applyWallpaper(url.trim())
  }

  /**
   * 重置壁纸为默认
   * 清除 localStorage 和内联样式
   */
  function resetWallpaper() {
    wallpaperUrl.value = ''
    localStorage.removeItem(STORAGE_KEY)
    applyWallpaper('')
  }

  // 初始化时应用已保存的壁纸
  if (wallpaperUrl.value) {
    applyWallpaper(wallpaperUrl.value)
  }

  return {
    wallpaperUrl,
    setWallpaper,
    resetWallpaper,
  }
}

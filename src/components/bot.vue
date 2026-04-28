<style scoped>
.bot-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(37, 99, 235, 0.15);
  margin-bottom: 0.75rem;
}

.profile-header {
  text-align: center;
  margin-bottom: 1.25rem;
}

.status-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  border-radius: 12px;
  font-size: 0.88rem;
  font-weight: 500;
}

.status-card-success {
  background: rgba(22, 163, 74, 0.1);
  border: 1px solid rgba(22, 163, 74, 0.2);
  color: #15803d;
}

.status-card-danger {
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.2);
  color: #b91c1c;
}

.auth-section {
  padding: 1rem;
  border-radius: 14px;
  background: rgba(37, 99, 235, 0.06);
  border: 1px solid rgba(37, 99, 235, 0.12);
  margin-bottom: 1rem;
}

.auth-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.auth-row input {
  flex: 1;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 10px;
  padding: 0.5rem 0.85rem;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  transition: border-color 0.2s;
}

.auth-row input:focus {
  border-color: rgba(37, 99, 235, 0.35);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.65rem;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 0.5rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.06);
  transition: all 0.2s;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}

.feature-count {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
}

.feature-label {
  font-size: 0.82rem;
  color: #64748b;
  font-weight: 500;
}

.feature-link {
  margin-top: 0.25rem;
}

.wallpaper-section {
  margin-top: 1.25rem;
  padding: 1rem;
  border-radius: 14px;
  background: rgba(139, 92, 246, 0.06);
  border: 1px solid rgba(139, 92, 246, 0.12);
}

.wallpaper-section-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.wallpaper-input-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.75rem;
}

.wallpaper-input-row input {
  flex: 1;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 10px;
  padding: 0.5rem 0.85rem;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  transition: border-color 0.2s;
}

.wallpaper-input-row input:focus {
  border-color: rgba(139, 92, 246, 0.35);
}

.wallpaper-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.wallpaper-file-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.75rem;
}

.wallpaper-file-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
  background: rgba(139, 92, 246, 0.08);
  color: #7c3aed;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.wallpaper-file-label:hover {
  background: rgba(139, 92, 246, 0.15);
  transform: translateY(-1px);
}

.wallpaper-file-name {
  font-size: 0.85rem;
  color: #64748b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.wallpaper-preview {
  width: 100%;
  height: 120px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid rgba(15, 23, 42, 0.08);
}
</style>

<template>
  <div class="page-card">
    <h1 class="page-title" style="color: rgba(255,79,152,0.97);">Bot代挂信息 · 个人中心</h1>

    <!-- 用户头像与基本信息 -->
    <div class="profile-header">
      <img class="bot-avatar" :src="user.icon" alt="头像">
      <div class="input-card" style="max-width: 320px; margin: 0.5rem auto;">
        <span class="input-card-label">QQ</span>
        <input type="text" :value="user.qid" readonly>
      </div>
      <div class="input-card" style="max-width: 320px; margin: 0.5rem auto;">
        <span class="input-card-label">昵称</span>
        <input type="text" :value="user.nickname" readonly>
      </div>
    </div>

    <!-- 状态信息 -->
    <div class="status-row">
      <div :class="['status-card', user.expire > 0 && new Date(user.expire) > new Date() ? 'status-card-success' : 'status-card-danger']">
        代挂剩余时间: <strong>{{ je(user.expire) }}</strong>
      </div>
      <div :class="['status-card', user.t0 > 0 ? 'status-card-success' : 'status-card-danger']">
        在线时长: <strong>{{ formatMsgTime1(user.t0, "未在线") }}</strong>
      </div>
    </div>

    <hr>

    <!-- 配置中心入口 -->
    <div style="text-align: center; margin-bottom: 1rem;">
      <RouterLink to="/conf" class="action-btn action-btn-primary" style="padding: 0.55rem 1.5rem;">
        配置中心
      </RouterLink>
    </div>

    <!-- 授权码 -->
    <div class="auth-section">
      <div class="auth-row">
        <span class="input-card-label">授权码</span>
        <input type="text" v-model="abit" placeholder="点击获取后修改">
        <button class="action-btn action-btn-outline" @click="authBut0()">
          {{ (abit == null || abit == '') ? '获取' : '修改' }}
        </button>
      </div>
    </div>

    <hr>

    <!-- 功能统计卡片网格 -->
    <div class="feature-grid">
      <div class="feature-card">
        <span class="feature-count">{{ count.mc }}</span>
        <span class="feature-label">管理员</span>
        <RouterLink to="/manager" class="action-btn action-btn-outline feature-link">管理</RouterLink>
      </div>
      <div class="feature-card">
        <span class="feature-count">{{ count.cc }}</span>
        <span class="feature-label">定时任务</span>
        <RouterLink to="/cron-list" class="action-btn action-btn-outline feature-link">管理</RouterLink>
      </div>
      <div class="feature-card">
        <span class="feature-count">{{ count.pc }}</span>
        <span class="feature-label">回复词</span>
        <RouterLink to="/passive" class="action-btn action-btn-outline feature-link">管理</RouterLink>
      </div>
      <div class="feature-card">
        <span class="feature-count">{{ count.cac }}</span>
        <span class="feature-label">调用API</span>
        <RouterLink to="/callapi" class="action-btn action-btn-outline feature-link">管理</RouterLink>
      </div>
      <div class="feature-card">
        <span class="feature-count">—</span>
        <span class="feature-label">内置扩展</span>
        <RouterLink to="/optsv" class="action-btn action-btn-outline feature-link">可选功能</RouterLink>
      </div>
      <div class="feature-card">
        <span class="feature-count">—</span>
        <span class="feature-label">V11功能</span>
        <RouterLink to="/v11c" class="action-btn action-btn-outline feature-link">管理</RouterLink>
      </div>
    </div>

    <!-- 壁纸设置 -->
    <div class="wallpaper-section">
      <div class="wallpaper-section-title">🎨 自定义壁纸</div>
      <div class="wallpaper-file-row">
        <label class="wallpaper-file-label">
          选择本地图片
          <input type="file" accept="image/*" style="display:none" @change="onLocalFileSelected">
        </label>
        <span class="wallpaper-file-name">{{ wpFileName }}</span>
      </div>
      <div class="wallpaper-input-row">
        <input type="text" v-model="wpInput" placeholder="或输入壁纸图片URL，如 https://example.com/bg.jpg">
        <button class="action-btn action-btn-outline" @click="previewWallpaper">预览</button>
      </div>
      <div class="wallpaper-actions">
        <button class="action-btn action-btn-success" @click="applyWallpaper">应用壁纸</button>
        <button class="action-btn action-btn-danger" @click="handleResetWallpaper">恢复默认</button>
      </div>
      <div v-if="wpPreviewUrl" class="wallpaper-preview" :style="{ backgroundImage: `url(${wpPreviewUrl})` }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "@/axios_in";
import {formatMsgTime1} from "@/assets/utils";
import {useWallpaper} from "@/composables/useWallpaper";

/** 用户基本信息 */
let user = ref({t0: -1, expire: -1, nickname: "", qid: "", icon: ""})

/** 各功能统计计数 */
let count = ref({mc: 0, cc: 0, pc: 0, cac: 0})

/** 授权码输入绑定 */
let abit = ref("")

/** 壁纸管理 composable */
const {wallpaperUrl, setWallpaper, resetWallpaper} = useWallpaper()

/** 壁纸URL输入框绑定 */
const wpInput = ref(wallpaperUrl.value)

/** 壁纸预览URL */
const wpPreviewUrl = ref(wallpaperUrl.value)

/** 本地选择的文件名 */
const wpFileName = ref('')

/** 壁纸最大存储尺寸（宽/高），超过则等比缩放 */
const WP_MAX_SIZE = 1920

/** localStorage 容量安全阈值（2MB） */
const WP_STORAGE_LIMIT = 2 * 1024 * 1024

/**
 * 本地文件选择回调
 * 读取图片文件并通过 canvas 压缩后转为 base64 data URL
 * @param event 文件选择事件
 */
function onLocalFileSelected(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  wpFileName.value = file.name

  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      // 等比缩放：仅当图片尺寸超过阈值时压缩
      let w = img.width
      let h = img.height
      if (w > WP_MAX_SIZE || h > WP_MAX_SIZE) {
        const ratio = Math.min(WP_MAX_SIZE / w, WP_MAX_SIZE / h)
        w = Math.round(w * ratio)
        h = Math.round(h * ratio)
      }

      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, w, h)

      // 以 0.8 质量导出 JPEG，若仍超限则逐步降低质量
      let quality = 0.8
      let dataUrl = canvas.toDataURL('image/jpeg', quality)
      while (dataUrl.length > WP_STORAGE_LIMIT && quality > 0.1) {
        quality -= 0.1
        dataUrl = canvas.toDataURL('image/jpeg', quality)
      }

      if (dataUrl.length > WP_STORAGE_LIMIT) {
        alert('图片过大，无法存储为壁纸，请选择更小的图片')
        return
      }

      // 填入输入框并预览
      wpInput.value = dataUrl
      wpPreviewUrl.value = dataUrl
    }
    img.src = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

/**
 * 预览壁纸
 * 将输入框URL设置到预览区域
 */
function previewWallpaper() {
  if (!wpInput.value.trim()) return
  wpPreviewUrl.value = wpInput.value.trim()
}

/**
 * 应用壁纸
 * 保存到 localStorage 并应用到 body 背景
 */
function applyWallpaper() {
  if (!wpInput.value.trim()) {
    alert('请输入壁纸URL')
    return
  }
  setWallpaper(wpInput.value.trim())
  wpPreviewUrl.value = wpInput.value.trim()
  alert('壁纸已应用')
}

/**
 * 恢复默认壁纸
 * 清除自定义壁纸，恢复 CSS 默认背景
 */
function handleResetWallpaper() {
  resetWallpaper()
  wpInput.value = ''
  wpPreviewUrl.value = ''
  alert('已恢复默认壁纸')
}

onMounted(() => {
  axios.get('/api/user').then(response => {
    user.value = response.data
    // 在线时每秒递增计时
    if (user.value.t0 > 0) {
      setInterval(function () {
        user.value.t0++;
      }, 1000)
    }
  })
  axios.get('/api/statistics').then(response => {
    count.value = response.data
  })
})

/**
 * 格式化过期时间
 * @param t 过期时间戳
 * @return 格式化后的日期字符串或"已过期"
 */
function je(t: number) {
  let dateTime = new Date(t)
  let nowTime = new Date()
  if (nowTime.getTime() > dateTime.getTime()) {
    return "已过期"
  } else {
    let year = dateTime.getFullYear()
    let month = dateTime.getMonth() + 1
    let day = dateTime.getDate()
    return "至" + year + "-" + month + "-" + day
  }
}

/**
 * 授权码获取或修改
 * 空值时获取，有值时提交修改
 */
function authBut0() {
  if (abit.value == "") {
    axios.get('/api/cpwd').then(response => {
      abit.value = response.data
    })
  } else {
    axios.post('/api/mpwd/', {"pwd": abit.value}).then(response => {
      if (response.data == "ok") {
        alert("修改成功")
      } else {
        alert(response.data)
      }
    })
  }
}
</script>
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
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "@/axios_in";
import {formatMsgTime1} from "@/assets/utils";

/** 用户基本信息 */
let user = ref({t0: -1, expire: -1, nickname: "", qid: "", icon: ""})

/** 各功能统计计数 */
let count = ref({mc: 0, cc: 0, pc: 0, cac: 0})

/** 授权码输入绑定 */
let abit = ref("")

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
<style scoped>
.stats-bar {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding: 0.75rem 0;
  margin-bottom: 1rem;
  font-size: 0.88rem;
  color: #475569;
}
.stats-bar strong {
  font-weight: 700;
}
.bot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.5rem;
}
.bot-card {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.06);
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}
.bot-card:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
}
.bot-card img {
  width: 91px;
  height: 91px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.bot-card-body {
  flex: 1;
  min-width: 0;
}
.bot-card-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.bot-card-id {
  font-size: 0.78rem;
  color: #94a3b8;
  margin-top: 0.2rem;
}
.loading-spinner {
  text-align: center;
  padding: 3rem 0;
  color: #94a3b8;
}
.page-card-full {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.page-card-full .bot-grid {
  flex: 1;
}
.page-card-full .page-bottom {
  margin-top: auto;
}
</style>

<template>
  <div class="page-card page-card-full">
    <h1 class="page-title">已登录的 Bot 列表</h1>

    <div class="stats-bar">
      <span>消息总数: <strong style="color:#e11d48">{{ statistics.all }}</strong> 条</span>
      <span>群消息: <strong style="color:#0891b2">{{ statistics.group }}</strong> 条</span>
      <span>私聊: <strong style="color:#b45309">{{ statistics.private }}</strong> 条</span>
    </div>

    <div v-if="loading" class="loading-spinner">加载中...</div>

    <div v-else class="bot-grid">
      <div v-for="bot in botData" :key="bot.id" class="bot-card"
           @click="handleBotClick(bot.id, bot.nick, bot.online)">
        <img :src="bot.avatar" alt="Bot头像">
        <div class="bot-card-body">
          <div class="bot-card-name">
            {{ bot.nick }}
            <span :class="['status-badge', bot.online ? 'status-badge-success' : 'status-badge-secondary']">
              {{ bot.online ? '在线' : '离线' }}
            </span>
          </div>
          <div class="bot-card-id">ID: {{ bot.id }}</div>
        </div>
      </div>
    </div>

    <div v-if="!loading && botData.length === 0" style="text-align:center;color:#94a3b8;padding:2rem 0">暂无Bot数据</div>

    <div class="page-bottom">
      <div class="info-bar">点击在线的Bot即可登录</div>
      <div style="display:flex;justify-content:center;gap:0.75rem">
        <RouterLink to="/join" class="action-btn action-btn-primary">现在开始</RouterLink>
        <RouterLink to="/" class="action-btn action-btn-outline">返回主页</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "@/axios_in";
import {onMounted, ref} from 'vue'
import router from "@/router/index.js";

/** 加载状态 */
let loading = ref(true)

/** Bot列表数据 */
let botData = ref<{online: boolean, nick: string, avatar: string, id: number}[]>([])

/** 消息统计数据 */
let statistics = ref({group: 0, private: 0, all: 0})

onMounted(() => {
  fetch('/api/bot/list')
      .then(response => response.json())
      .then(bots => {
        botData.value = bots;
        loading.value = false;
      });
  fetch('/api/pre/statistics')
      .then(response => response.json())
      .then(data => {
        statistics.value = data
      });
})

/**
 * 点击Bot卡片处理登录
 * @param botId Bot的QQ号
 * @param botName Bot昵称
 * @param isOnline 是否在线
 */
function handleBotClick(botId: number, botName: string, isOnline: boolean) {
  if (!isOnline) {
    alert('该Bot暂时离线\n请通过[首页]->[现在开始]联系管理者询问');
    return;
  }

  const authCode = prompt(`请输入【${botName}】的授权码/密码：`, '');
  if (authCode === null) return;

  axios.post('/bot/login', {
    qid: botId,
    p: authCode
  }).then(response => {
    if (response.status === 200) {
      alert('登录成功');
      router.push("/bot")
    }
  }).catch(error => {
    console.error('登录失败:', error);
    alert(`登录失败: ${error.response?.data || '未知错误'}`);
  });
}
</script>

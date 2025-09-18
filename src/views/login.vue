<style scoped>
.card-img-top {
  border-radius: 5px 5px 0 0;
}

.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}
</style>

<template>

  <div class="tm-1 jumbotron jumbotron-fluid">

    <div class="container">
      <span>截止目前(自2025/09/18计数): 已经处理消息总数为
        <span style="color: #ff0099;font-weight: bold">{{ statistics.all }}</span>条&nbsp;&nbsp;其中
        <span style="color: #1ae2ff;font-weight: bold">{{ statistics.group }}</span>条群消息&nbsp;&nbsp;
        <span style="color: #c17600;font-weight: bold">{{ statistics.private }}</span>条私聊消息
      </span>
      <h3 class="display-6">已登录的 Bot 列表</h3>
      <div id="bot-list" class="row">
        <!-- 动态加载的 Bot 列表 -->
        <div v-show="loading" class="col-12 text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">加载中...</span>
          </div>
        </div>
        <div v-show="!loading" v-for="bot in botData" class="col-md-4 mb-3 card">
          <hr>
          <div :class="bot.online ? 'border-success' : 'border-secondary'"
               @click="handleBotClick(bot.id, bot.nick, bot.online)">
            <img :src="bot.avatar"
                 class="card-img-top"
                 style="height: 200px; object-fit: cover"
                 alt="Bot头像">
            <div class="card-body">
              <h5 class="card-title">
                {{ bot.nick }}
                <span :class="'badge '+ (bot.online ? 'bg-success' : 'bg-secondary')">
                                   {{ (bot.online ? '在线' : '离线') }}
                                </span>
              </h5>
              <p class="card-text text-muted">ID: {{ bot.id }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container tm-0">
    <div class="row">
      <p class="col" style="color: rgb(253,226,226);background-color: rgba(171,171,163,0.56);border-radius: 5px"
         role="alert">
        点击下方 '现在开始'
      </p>
    </div>
  </div>
  <div class="container tm-0">
    <div class="row">
      <div class="col align-self-center">
        <RouterLink to="/join" type="button" class="btn btn-lg btn-block btn-outline-success">现在开始
        </RouterLink>
      </div>
    </div>
  </div>
  <br>
  <center>
    <RouterLink style="width: 50%" to="/" type="button" class="btn btn-lg btn-block btn-outline-success">返回主页
    </RouterLink>
  </center>

</template>

<script setup lang="ts">
import {RouterLink} from "vue-router";
import axios from "@/axios_in";
import {onMounted, ref} from 'vue'
import router from "@/router/index.js";

let loading = ref(true)
let botData = ref([{online: false, nick: '', avatar: '', id: 0}])
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

function handleBotClick(botId, botName, isOnline) {
  if (!isOnline) {
    alert('该Bot暂时离线\n请通过[首页]->[现在开始]联系管理者询问');
    return;
  }

  const authCode = prompt(`请输入【${botName}】的授权码/密码：`, '');
  if (authCode === null) return; // 用户点击取消

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

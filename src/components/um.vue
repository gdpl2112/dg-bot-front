<style scoped>
.user-card {
  padding: 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.06);
  margin-bottom: 0.65rem;
  transition: background 0.2s;
}
.user-card:hover { background: rgba(255, 255, 255, 0.88); }
.user-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
}
.user-row .input-card { flex: 1; min-width: 120px; }
.date-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
  margin-bottom: 0.5rem;
}
.date-input {
  width: 60px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 8px;
  padding: 0.35rem 0.5rem;
  font-size: 0.85rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
}
.date-input:focus { border-color: rgba(37, 99, 235, 0.35); }
.date-label { font-size: 0.82rem; color: #64748b; font-weight: 600; }
</style>

<template>
  <div class="page-card">
    <h1 class="page-title">用户管理</h1>

    <div style="text-align:center; margin-bottom:1rem;">
      <button class="action-btn action-btn-danger" @click="likeNow()">补充点赞</button>
    </div>

    <div v-for="e in list" :key="e.qid" class="user-card">
      <div class="user-row">
        <div class="input-card">
          <span class="input-card-label">{{ e.qid }}</span>
          <input type="text" v-model="e.auth">
        </div>
        <div class="input-card" style="max-width:180px">
          <span class="input-card-label">exp</span>
          <input type="text" v-model="e.exp" @change="onExpChange(e)">
        </div>
      </div>

      <div :class="['status-badge', e.t0 > 0 ? 'status-badge-success' : 'status-badge-danger']" style="margin-bottom:0.5rem">
        在线时长: {{ formatMsgTime1(e.t0, "未在线") }}
      </div>

      <div class="date-row">
        <span class="date-label">年</span>
        <input class="date-input" type="text" v-model="e.y" @change="onDateChange(e)">
        <span class="date-label">月</span>
        <input class="date-input" type="text" v-model="e.m" @change="onDateChange(e)">
        <span class="date-label">日</span>
        <input class="date-input" type="text" v-model="e.d" @change="onDateChange(e)">
      </div>

      <button class="action-btn action-btn-primary" @click="modify(e.qid)">修改</button>
    </div>

    <div v-if="list.length === 0" style="text-align:center;color:#94a3b8;padding:2rem 0;">暂无用户数据</div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "@/axios_in";
import {formatMsgTime1} from "@/assets/utils.js";

/** 用户列表 */
let list = ref<any[]>([])

onMounted(() => {
  axios.get("/api/m/list").then(function (response) {
    list.value = response.data
  }).catch(function (err) {
    alert(err);
  })
})

/**
 * 修改用户授权码和过期时间
 * @param id 用户QQ号
 */
function modify(id: string) {
  let e = list.value.find(item => item.qid === id)
  if (!e) return
  axios.get("/api/m/modify?qid=" + id + "&auth=" + e.auth + "&exp=" + e.exp).then(function (response) {
    list.value = response.data
    alert("ok")
  }).catch(function (err) {
    alert(err);
  })
}

/** 立刻执行补充点赞 */
function likeNow() {
  axios.get("/api/m/autoLike").then(function (response) {
    alert(response.data)
  })
}

/**
 * 日期变更时自动计算exp
 * @param e 用户数据对象
 */
function onDateChange(e: any) {
  axios.get("/api/m/get-exp?y=" + e.y + "&m=" + e.m + "&d=" + e.d).then(function (response) {
    e.exp = response.data
  }).catch(function (err) {
    alert(err);
  })
}

/**
 * exp变更时自动反算年月日
 * @param e 用户数据对象
 */
function onExpChange(e: any) {
  axios.get("/api/m/exp-ymd?exp=" + e.exp).then(function (response) {
    let ds = response.data
    e.y = ds[0]
    e.m = ds[1]
    e.d = ds[2]
  }).catch(function (err) {
    alert(err);
  })
}
</script>
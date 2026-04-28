<style scoped>
.cron-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.06);
  margin-bottom: 0.5rem;
  transition: background 0.2s;
}
.cron-item:hover { background: rgba(255, 255, 255, 0.88); }
.cron-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.cron-desc { flex: 1; font-size: 0.9rem; color: #0f172a; }
.cron-target {
  font-size: 0.82rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.08);
  color: #2563eb;
  font-weight: 600;
}
</style>

<template>

  <div class="page-card">
    <h1 class="page-title">Cron定时任务</h1>

    <div style="text-align:center; margin-bottom:1rem;">
      <RouterLink to="/cron" class="action-btn action-btn-primary">添加任务</RouterLink>
    </div>

    <div v-for="e in arr1" :key="e.id" class="cron-item">
      <img :src="e.icon" class="cron-icon" alt="头像">
      <span class="cron-desc">{{ e.desc }} 发送 <strong>{{ e.msg }}</strong></span>
      <span class="cron-target">到 {{ e.targetId }}</span>
      <button class="action-btn action-btn-danger" @click="del(e.id)">删除</button>
    </div>

    <div v-if="arr1.length === 0" style="text-align:center;color:#94a3b8;padding:2rem 0;">暂无定时任务</div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "@/axios_in";

/** 定时任务列表 */
let arr1 = ref<any[]>([])

onMounted(() => {
  axios.get("/api/cron-list").then(function (response) {
    arr1.value = response.data
  }).catch(function (err) {
    alert(err);
  })
})

/**
 * 删除指定定时任务
 * @param id 任务ID
 */
function del(id: number) {
  axios.get("/api/cron-del?id=" + id).then(function (response) {
    arr1.value = response.data;
  }).catch(function (err) {
    alert(err);
  })
}
</script>
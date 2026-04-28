<style scoped>
.opt-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.06);
  margin-bottom: 0.5rem;
  transition: background 0.2s;
}
.opt-card:hover { background: rgba(255, 255, 255, 0.88); }
.opt-info { flex: 1; min-width: 0; }
.opt-id { font-size: 0.78rem; color: #94a3b8; font-weight: 600; }
.opt-name { font-size: 0.95rem; font-weight: 700; color: #0f172a; }
.opt-desc { font-size: 0.82rem; color: #64748b; margin-top: 0.15rem; word-break: break-all; }
</style>

<template>

  <div class="page-card">
    <h1 class="page-title">内置功能开关</h1>

    <div class="info-bar">与[被动回复]共用开关</div>

    <div v-for="e in data" :key="e.opt" class="opt-card">
      <div class="opt-info">
        <div class="opt-id">{{ e.opt }}</div>
        <div class="opt-name">{{ e.name }}</div>
        <div class="opt-desc">{{ e.desc }}</div>
      </div>
      <button :class="['toggle-btn', e.open ? 'toggle-btn-on' : 'toggle-btn-off']" @click="toggle(e.opt)">
        {{ e.open ? '开启' : '关闭' }}
      </button>
    </div>

    <div v-if="data.length === 0" style="text-align:center;color:#94a3b8;padding:2rem 0;">暂无功能数据</div>
  </div>
</template>

<script setup lang="ts">
import axios from "@/axios_in";
import {onMounted, ref} from "vue";

/** 功能选项列表 */
let data = ref<any[]>([])

onMounted(() => {
  axios.get("/api/opts").then(function (response) {
    data.value = response.data;
  }).catch(function (err) {
    alert(err);
  })
})

/**
 * 切换功能开关状态
 * @param opt 功能ID
 */
function toggle(opt: string) {
  axios.get("/api/opts/toggle?opt=" + opt).then(function (response) {
    data.value = response.data
  }).catch(function (err) {
    alert(err);
  })
}
</script>
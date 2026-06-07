<style scoped>
.opt-card {
  display: flex;
  flex-direction: column;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.06);
  margin-bottom: 0.5rem;
  transition: background 0.2s;
}
.opt-card:hover { background: rgba(255, 255, 255, 0.88); }
.opt-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.opt-info { flex: 1; min-width: 0; }
.opt-id { font-size: 0.78rem; color: #94a3b8; font-weight: 600; }
.opt-name { font-size: 0.95rem; font-weight: 700; color: #0f172a; }
.opt-desc { font-size: 0.82rem; color: #64748b; margin-top: 0.15rem; word-break: break-all; }
.opt-expand-btn {
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  border: 1px solid rgba(37, 99, 235, 0.2);
  background: rgba(37, 99, 235, 0.06);
  color: #2563eb;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.opt-expand-btn:hover {
  background: rgba(37, 99, 235, 0.12);
}
.group-section {
  margin-top: 0.6rem;
  padding-top: 0.6rem;
  border-top: 1px dashed rgba(15, 23, 42, 0.1);
}
.group-section-title {
  font-size: 0.82rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.group-quick-btns {
  display: flex;
  gap: 0.3rem;
}
.group-quick-btn {
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
}
.quick-on {
  background: rgba(22, 163, 74, 0.08);
  border-color: rgba(22, 163, 74, 0.25);
  color: #15803d;
}
.quick-on:hover {
  background: rgba(22, 163, 74, 0.18);
}
.quick-off {
  background: rgba(220, 38, 38, 0.06);
  border-color: rgba(220, 38, 38, 0.2);
  color: #dc2626;
}
.quick-off:hover {
  background: rgba(220, 38, 38, 0.14);
}
.group-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.group-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
}
.group-tag-on {
  background: rgba(22, 163, 74, 0.08);
  border-color: rgba(22, 163, 74, 0.25);
  color: #15803d;
}
.group-tag-on:hover {
  background: rgba(22, 163, 74, 0.15);
}
.group-tag-off {
  background: rgba(148, 163, 184, 0.08);
  border-color: rgba(148, 163, 184, 0.2);
  color: #94a3b8;
  text-decoration: line-through;
}
.group-tag-off:hover {
  background: rgba(148, 163, 184, 0.15);
}
.group-name {
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info-bar {
  font-size: 0.82rem;
  color: #64748b;
  margin-bottom: 0.75rem;
  padding: 0.4rem 0.7rem;
  background: rgba(37, 99, 235, 0.04);
  border-radius: 8px;
  border-left: 3px solid #2563eb;
}
</style>

<template>

  <div class="page-card">
    <h1 class="page-title">内置功能 · 群组配置</h1>

    <div class="info-bar">点击群标签切换启用/禁用状态，每个功能可单独设置在哪些群中启用</div>

    <div v-for="e in data" :key="e.opt" class="opt-card">
      <div class="opt-header">
        <div class="opt-info">
          <div class="opt-id">{{ e.opt }}</div>
          <div class="opt-name">{{ e.name }}</div>
          <div class="opt-desc">{{ e.desc }}</div>
        </div>
        <button class="opt-expand-btn" @click="toggleExpand(e.opt)">
          {{ expanded[e.opt] ? '收起' : '设置群组' }}
        </button>
      </div>

      <div v-if="expanded[e.opt]" class="group-section">
        <div class="group-section-title">
          <span>点击切换启用状态（绿色=已启用，灰色=未启用）</span>
          <div class="group-quick-btns">
            <button class="group-quick-btn quick-on" @click="setAll(e.opt, true)">全开</button>
            <button class="group-quick-btn quick-off" @click="setAll(e.opt, false)">全关</button>
          </div>
        </div>
        <div class="group-list">
          <div v-for="g in groups" :key="g.tid"
               :class="['group-tag', isGroupEnabled(e, g.tid) ? 'group-tag-on' : 'group-tag-off']"
               @click="toggleGroup(e.opt, g.tid)">
            <span class="group-name">{{ g.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="data.length === 0" style="text-align:center;color:#94a3b8;padding:2rem 0;">暂无功能数据</div>
  </div>
</template>

<script setup lang="ts">
import axios from "@/axios_in";
import {onMounted, reactive, ref} from "vue";

/** 功能选项列表 */
let data = ref<any[]>([])

/** 群列表（含好友） */
let groups = ref<any[]>([])

/** 展开状态 */
const expanded = reactive<Record<string, boolean>>({})

onMounted(() => {
  loadData()
  loadGroups()
})

function loadData() {
  axios.get("/api/opts").then(function (response) {
    data.value = response.data;
  }).catch(function (err) {
    alert(err);
  })
}

function loadGroups() {
  axios.get("/api/glist").then(function (response) {
    groups.value = response.data;
  }).catch(function (err) {
    // ignore
  })
  // 也加载好友列表
  axios.get("/api/flist").then(function (response) {
    groups.value = groups.value.concat(response.data);
  }).catch(function (err) {
    // ignore
  })
}

/**
 * 判断某功能是否在某群启用
 */
function isGroupEnabled(opt: any, tid: string): boolean {
  return opt.groups && opt.groups.includes(tid)
}

/**
 * 切换展开/收起
 */
function toggleExpand(opt: string) {
  expanded[opt] = !expanded[opt]
}

/**
 * 切换某功能在某群的启用状态
 */
function toggleGroup(opt: string, tid: string) {
  const enabled = !data.value.find(e => e.opt === opt)?.groups?.includes(tid)
  axios.get(`/api/opts/set-group?opt=${opt}&tid=${tid}&enabled=${enabled}`).then(function (response) {
    data.value = response.data
  }).catch(function (err) {
    alert(err);
  })
}

/**
 * 全开/全关某功能的所有群
 */
function setAll(opt: string, enabled: boolean) {
  const tids = groups.value.map(g => g.tid).join(',')
  axios.get(`/api/opts/set-all?opt=${opt}&enabled=${enabled}&tids=${encodeURIComponent(tids)}`).then(function (response) {
    data.value = response.data
  }).catch(function (err) {
    alert(err);
  })
}
</script>

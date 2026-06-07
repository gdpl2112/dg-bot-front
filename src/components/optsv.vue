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
.opt-set-btn {
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
.opt-set-btn:hover {
  background: rgba(37, 99, 235, 0.12);
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

/* ---- 弹窗 ---- */
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.15s;
}
@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
.modal-box {
  background: #f8fafc;
  border-radius: 18px;
  width: min(580px, 94vw);
  max-height: 82vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 64px rgba(15, 23, 42, 0.22);
  animation: slideUp 0.18s;
  overflow: hidden;
}
@keyframes slideUp { from { transform: translateY(24px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem 0.6rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}
.modal-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
}
.modal-close {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 0;
  background: rgba(15, 23, 42, 0.06);
  color: #475569;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}
.modal-close:hover { background: rgba(15, 23, 42, 0.12); color: #0f172a; }

/* 标签栏 + 全开全关 */
.modal-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1.2rem 0;
}
.modal-tabs {
  display: flex;
  gap: 0.2rem;
}
.modal-tab {
  padding: 0.35rem 0.85rem;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  border: 0;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  transition: all 0.15s;
}
.modal-tab:hover { color: #0f172a; background: rgba(15,23,42,0.04); }
.modal-tab-active {
  color: #2563eb;
  background: rgba(37, 99, 235, 0.08);
}
.quick-btns {
  display: flex;
  gap: 0.3rem;
}
.quick-btn {
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid;
}
.qk-on {
  background: rgba(22, 163, 74, 0.08);
  border-color: rgba(22, 163, 74, 0.25);
  color: #15803d;
}
.qk-on:hover { background: rgba(22, 163, 74, 0.18); }
.qk-off {
  background: rgba(220, 38, 38, 0.06);
  border-color: rgba(220, 38, 38, 0.2);
  color: #dc2626;
}
.qk-off:hover { background: rgba(220, 38, 38, 0.14); }

/* 搜索 */
.modal-search {
  padding: 0.5rem 1.2rem;
}
.modal-search input {
  width: 100%;
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 10px;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
}
.modal-search input:focus { border-color: rgba(37, 99, 235, 0.35); }

/* 列表 */
.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 0.3rem 1rem 1rem;
}
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 0.6rem;
}
.contact-card {
  text-align: center;
  padding: 0.7rem 0.4rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.06);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}
.contact-card:hover {
  background: rgba(255, 255, 255, 0.92);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}
.contact-card-enabled {
  border-color: rgba(22, 163, 74, 0.3);
  background: rgba(22, 163, 74, 0.04);
}
.contact-card-disabled {
  opacity: 0.55;
}
.contact-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.3rem;
}
.contact-name {
  font-size: 0.78rem;
  font-weight: 600;
  color: #0f172a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.2rem;
}
.contact-status {
  font-size: 0.68rem;
  font-weight: 600;
}
.status-on { color: #15803d; }
.status-off { color: #94a3b8; }

.empty-hint {
  text-align: center;
  color: #94a3b8;
  padding: 2rem 0;
  font-size: 0.85rem;
}
</style>

<template>

  <div class="page-card">
    <h1 class="page-title">内置功能 · 群组配置</h1>

    <div class="info-bar">点击「设置群组」为每个功能单独设置在哪些群/好友中启用</div>

    <div v-for="e in data" :key="e.opt" class="opt-card">
      <div class="opt-header">
        <div class="opt-info">
          <div class="opt-id">{{ e.opt }}</div>
          <div class="opt-name">{{ e.name }}</div>
          <div class="opt-desc">{{ e.desc }}</div>
        </div>
        <button class="opt-set-btn" @click="openModal(e)">
          设置群组
        </button>
      </div>
    </div>

    <div v-if="data.length === 0" class="empty-hint">暂无功能数据</div>

    <!-- 弹窗 -->
    <div v-if="modalOpt" class="modal-mask" @click.self="closeModal">
      <div class="modal-box">
        <div class="modal-header">
          <div class="modal-title">{{ modalOpt.name }} - 群组配置</div>
          <button class="modal-close" @click="closeModal">&times;</button>
        </div>

        <div class="modal-toolbar">
          <div class="modal-tabs">
            <button :class="['modal-tab', modalTab === 'group' ? 'modal-tab-active' : '']"
                    @click="modalTab = 'group'">
              群 ({{ filteredContacts.length }})
            </button>
            <button :class="['modal-tab', modalTab === 'friend' ? 'modal-tab-active' : '']"
                    @click="modalTab = 'friend'">
              好友 ({{ filteredContacts.length }})
            </button>
          </div>
          <div class="quick-btns">
            <button class="quick-btn qk-on" @click="setAllFiltered(true)">全开</button>
            <button class="quick-btn qk-off" @click="setAllFiltered(false)">全关</button>
          </div>
        </div>

        <div class="modal-search">
          <input type="text" v-model="modalSearch" placeholder="搜索名称或ID...">
        </div>

        <div class="modal-body">
          <div v-if="filteredContacts.length === 0" class="empty-hint">暂无数据</div>
          <div v-else class="contact-grid">
            <div v-for="c in filteredContacts" :key="c.tid"
                 :class="['contact-card', isEnabled(c.tid) ? 'contact-card-enabled' : 'contact-card-disabled']"
                 @click="toggleGroup(c.tid)">
              <img class="contact-avatar" :src="c.icon" alt="头像"
                   @error="onAvatarError($event)">
              <div class="contact-name">{{ c.name }}</div>
              <div :class="['contact-status', isEnabled(c.tid) ? 'status-on' : 'status-off']">
                {{ isEnabled(c.tid) ? '已启用' : '未启用' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "@/axios_in";
import {computed, onMounted, ref} from "vue";

/** 功能选项列表 */
let data = ref<any[]>([])

/** 群列表 */
let gList = ref<any[]>([])

/** 好友列表 */
let fList = ref<any[]>([])

/** 弹窗状态 */
const modalOpt = ref<any>(null)
const modalTab = ref<'group' | 'friend'>('group')
const modalSearch = ref('')

onMounted(() => {
  loadData()
  loadContacts()
})

function loadData() {
  axios.get("/api/opts").then(function (response) {
    data.value = response.data;
  }).catch(function (err) {
    alert(err);
  })
}

function loadContacts() {
  axios.get("/api/glist").then(function (response) {
    gList.value = response.data;
  }).catch(function () {})
  axios.get("/api/flist").then(function (response) {
    fList.value = response.data;
  }).catch(function () {})
}

/** 当前弹窗对应功能 */
function currentOpt() {
  if (!modalOpt.value) return null
  return data.value.find(e => e.opt === modalOpt.value.opt)
}

/** 判断某功能是否在某 tid 启用 */
function isEnabled(tid: string): boolean {
  const opt = currentOpt()
  return opt?.groups?.includes(tid) ?? false
}

/** 根据当前 tab 过滤的联系人列表 */
const filteredContacts = computed(() => {
  const list = modalTab.value === 'group' ? gList.value : fList.value
  const s = modalSearch.value.trim().toLowerCase()
  if (!s) return list
  return list.filter((c: any) =>
    (c.name || '').toLowerCase().includes(s) ||
    (c.tid || '').toString().toLowerCase().includes(s)
  )
})

/** 打开弹窗 */
function openModal(opt: any) {
  modalOpt.value = opt
  modalTab.value = 'group'
  modalSearch.value = ''
}

/** 关闭弹窗 */
function closeModal() {
  modalOpt.value = null
}

/** 切换某功能在某群的启用状态 */
function toggleGroup(tid: string) {
  const opt = modalOpt.value?.opt
  if (!opt) return
  const enabled = !isEnabled(tid)
  axios.get(`/api/opts/set-group?opt=${opt}&tid=${tid}&enabled=${enabled}`).then(function (response) {
    data.value = response.data
  }).catch(function (err) {
    alert(err);
  })
}

/** 全开/全关当前过滤后的列表 */
function setAllFiltered(enabled: boolean) {
  const opt = modalOpt.value?.opt
  if (!opt) return
  const tids = filteredContacts.value.map((c: any) => c.tid).join(',')
  axios.get(`/api/opts/set-all?opt=${opt}&enabled=${enabled}&tids=${encodeURIComponent(tids)}`).then(function (response) {
    data.value = response.data
  }).catch(function (err) {
    alert(err);
  })
}

/** 头像加载失败时使用默认 QQ 头像 */
function onAvatarError(e: Event) {
  const img = e.target as HTMLImageElement
  const tid = img.closest('.contact-card')?.querySelector('.contact-name')?.textContent || ''
  // tid 格式: g123456 或 f123456, 提取数字部分作为 QQ 号
  const num = tid.replace(/^[gf]/, '')
  img.src = `https://q1.qlogo.cn/g?b=qq&nk=${num}&s=640`
}
</script>

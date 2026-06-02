<style scoped>
/* ───── 全局布局 ───── */
.manage-outer {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4ff 0%, #e8f5e9 100%);
  padding: 2rem 1rem;
  box-sizing: border-box;
}

/* ───── Key 输入界面 ───── */
.key-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f4ff 0%, #e8f5e9 100%);
}
.key-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.10);
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 380px;
  text-align: center;
}
.key-card h2 {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.4rem;
}
.key-card p {
  font-size: 0.88rem;
  color: #64748b;
  margin-bottom: 1.5rem;
}
.key-input {
  width: 100%;
  padding: 0.65rem 1rem;
  border: 1.5px solid rgba(15,23,42,0.15);
  border-radius: 10px;
  font-size: 0.95rem;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 1rem;
  transition: border-color 0.2s;
}
.key-input:focus { border-color: #2563eb; }
.key-btn {
  width: 100%;
  padding: 0.65rem;
  background: #2563eb;
  color: #fff;
  border: 0;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}
.key-btn:hover { background: #1d4ed8; }

/* ───── 页面主体 ───── */
.manage-card {
  background: rgba(255,255,255,0.82);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(15,23,42,0.08);
  padding: 1.5rem 1.5rem 1.25rem;
  max-width: 860px;
  margin: 0 auto;
}
.manage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
}
.manage-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
}
.manage-exit-btn {
  padding: 0.35rem 0.85rem;
  border: 1.5px solid rgba(220,38,38,0.35);
  background: rgba(220,38,38,0.06);
  color: #dc2626;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s;
}
.manage-exit-btn:hover { background: rgba(220,38,38,0.12); }

/* ───── Tab 栏 ───── */
.tab-bar {
  display: flex;
  gap: 0.35rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid rgba(15, 23, 42, 0.08);
  padding-bottom: 0;
}
.tab-btn {
  padding: 0.55rem 1rem;
  border: 0;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  background: transparent;
  font-weight: 600;
  font-size: 0.9rem;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 0;
}
.tab-btn:hover { color: #0f172a; }
.tab-btn-active { color: #2563eb; border-bottom-color: #2563eb; }

/* ───── 筛选行 ───── */
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-items: center;
  margin-bottom: 1rem;
}
.filter-row .input-card { flex: 1; min-width: 150px; }
.input-card {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.85);
  border: 1.5px solid rgba(15,23,42,0.10);
  border-radius: 10px;
  padding: 0.35rem 0.75rem;
  gap: 0.45rem;
}
.input-card-label {
  font-size: 0.8rem;
  color: #64748b;
  white-space: nowrap;
}
.input-card input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.9rem;
  flex: 1;
  min-width: 0;
}
.action-btn {
  padding: 0.5rem 1.1rem;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s;
  border: 1.5px solid transparent;
}
.action-btn-primary { background: #2563eb; color: #fff; border-color: #2563eb; }
.action-btn-primary:hover { background: #1d4ed8; }
.action-btn-outline { background: transparent; color: #475569; border-color: rgba(15,23,42,0.18); }
.action-btn-outline:hover { border-color: #2563eb; color: #2563eb; }
.action-btn:disabled { opacity: 0.45; cursor: not-allowed; }

/* ───── 群快捷筛选 ───── */
.group-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}
.group-chip {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  border-radius: 20px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: rgba(255, 255, 255, 0.7);
  font-size: 0.82rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.18s;
  white-space: nowrap;
}
.group-chip:hover { background: rgba(255,255,255,0.95); border-color: rgba(37,99,235,0.3); color: #2563eb; }
.group-chip-active { background: rgba(37,99,235,0.1); border-color: rgba(37,99,235,0.35); color: #2563eb; }
.group-chip-avatar { width: 20px; height: 20px; border-radius: 50%; object-fit: cover; }

/* ───── 排行榜 ───── */
.rank-section {
  margin-bottom: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  background: rgba(124, 58, 237, 0.05);
  border: 1px solid rgba(124, 58, 237, 0.12);
}
.rank-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
}
.rank-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #7c3aed;
}
.rank-more-btn {
  border: 1px solid rgba(124, 58, 237, 0.3);
  background: rgba(124, 58, 237, 0.08);
  color: #7c3aed;
  border-radius: 8px;
  padding: 0.2rem 0.7rem;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s;
}
.rank-more-btn:hover { background: rgba(124, 58, 237, 0.16); }
.rank-dialog-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  max-height: 60vh;
  overflow-y: auto;
}
.rank-dialog-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  border-radius: 10px;
  background: rgba(124, 58, 237, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.06);
  font-size: 0.86rem;
}
.rank-dialog-item .rank-id { flex: 1; }
.rank-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}
.rank-item {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.7rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(15, 23, 42, 0.06);
  font-size: 0.84rem;
}
.rank-idx { font-weight: 800; color: #94a3b8; width: 1.2rem; text-align: center; }
.rank-idx.rank-top3 { color: #f59e0b; }
.rank-avatar { width: 26px; height: 26px; border-radius: 50%; object-fit: cover; }
.rank-id { font-weight: 600; color: #0f172a; }
.rank-cnt {
  font-size: 0.8rem;
  color: #64748b;
  background: rgba(15, 23, 42, 0.06);
  padding: 0.1rem 0.45rem;
  border-radius: 6px;
}

/* ───── 记录条目 ───── */
.record-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.06);
  margin-bottom: 0.45rem;
  transition: background 0.2s;
  flex-wrap: wrap;
}
.record-item:hover { background: rgba(255, 255, 255, 0.88); }
.record-avatar { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
.record-info { flex: 1; min-width: 0; }
.record-ids { font-size: 0.88rem; font-weight: 600; color: #0f172a; }
.record-op {
  font-weight: 500;
  color: #64748b;
  font-size: 0.82rem;
  margin-left: 0.4rem;
}
.record-meta { font-size: 0.8rem; color: #64748b; margin-top: 0.1rem; }
.mute-duration {
  font-size: 0.8rem;
  font-weight: 600;
  color: #dc2626;
  margin-left: 0.25rem;
}
.record-time { font-size: 0.8rem; color: #94a3b8; white-space: nowrap; }

/* ───── 空态 / 分页 ───── */
.empty-tip {
  text-align: center;
  padding: 2rem;
  color: #94a3b8;
  font-size: 0.9rem;
}
.pagination-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(15, 23, 42, 0.06);
}
.pagination-info { font-size: 0.88rem; color: #64748b; }

/* ───── 移动端适配 ───── */
@media (max-width: 768px) {
  .manage-outer { padding: 1rem 0.5rem; }
  .manage-card { padding: 1rem 0.9rem; border-radius: 16px; }
  .manage-title { font-size: 1.15rem; }
  .manage-header { margin-bottom: 0.9rem; }

  .tab-btn { padding: 0.5rem 0.7rem; font-size: 0.85rem; }

  /* 筛选控件整行堆叠并占满宽度（!important 覆盖组件内联样式） */
  .filter-row { gap: 0.5rem; }
  .filter-row .input-card { flex: 1 1 100%; min-width: 0; }
  .filter-row :deep(.el-select),
  .filter-row :deep(.el-date-editor) {
    flex: 1 1 100% !important;
    min-width: 0 !important;
    width: 100% !important;
  }
  .filter-row .action-btn { flex: 1 1 auto; }

  /* 记录条目：时间换行到底部右对齐 */
  .record-item { gap: 0.5rem; padding: 0.55rem 0.7rem; }
  .record-time { width: 100%; text-align: right; }

  .group-chip { font-size: 0.78rem; padding: 0.28rem 0.55rem; }
  .rank-list { gap: 0.35rem; }
  .rank-item { font-size: 0.8rem; padding: 0.3rem 0.55rem; }
}
</style>

<template>
  <!-- ── Key 输入界面（未设置密钥时展示） ── -->
  <div v-if="!keyOk" class="key-screen">
    <div class="key-card">
      <h2>群管理记录</h2>
      <p>请输入访问密钥以继续</p>
      <input
        class="key-input"
        v-model="keyInput"
        type="password"
        placeholder="X-Manage-Key"
        @keyup.enter="submitKey"
      >
      <button class="key-btn" @click="submitKey">访问</button>
    </div>
  </div>

  <!-- ── 记录主界面 ── -->
  <div v-else class="manage-outer">
    <div class="manage-card">
      <div class="manage-header">
        <span class="manage-title">群管理记录</span>
        <button class="manage-exit-btn" @click="clearKey">退出</button>
      </div>

      <!-- 标签切换 -->
      <div class="tab-bar">
        <button :class="['tab-btn', activeTab === 'kick' ? 'tab-btn-active' : '']" @click="switchTab('kick')">踢人记录</button>
        <button :class="['tab-btn', activeTab === 'mute' ? 'tab-btn-active' : '']" @click="switchTab('mute')">禁言记录</button>
        <button :class="['tab-btn', activeTab === 'approve' ? 'tab-btn-active' : '']" @click="switchTab('approve')">批准入群</button>
      </div>

      <!-- 群快捷选择：合并 groupList(k4) 与记录中出现的群号 -->
      <div class="group-chips" v-if="activeGroupChips.length > 0">
        <button
          :class="['group-chip', filterGid === '' ? 'group-chip-active' : '']"
          @click="selectGroup('')"
        >全部</button>
        <button
          v-for="g in activeGroupChips" :key="g.gid"
          :class="['group-chip', filterGid === g.gid ? 'group-chip-active' : '']"
          @click="selectGroup(g.gid)"
        >
          <img v-if="g.icon" class="group-chip-avatar" :src="g.icon" alt="">
          {{ g.name }}
        </button>
      </div>

      <!-- 筛选条件 -->
      <div class="filter-row">
        <div class="input-card">
          <span class="input-card-label">群号</span>
          <input type="text" v-model="filterGid" placeholder="不填=全部">
        </div>
        <el-select
          v-model="filterOperator"
          filterable
          clearable
          placeholder="操作者（全部）"
          style="flex:1; min-width:200px;"
          @change="doSearch"
          @clear="doSearch"
        >
          <el-option
            v-for="op in operatorOptions"
            :key="op.id"
            :value="op.id"
            :label="op.id + (op.role === 'owner' ? '（群主）' : op.role === 'admin' ? '（管理）' : '')"
          />
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :shortcuts="dateShortcuts"
          value-format="x"
          style="flex:1; min-width:300px;"
        />
        <button class="action-btn action-btn-primary" @click="doSearch">查询</button>
        <button class="action-btn action-btn-outline" @click="resetFilter">重置</button>
      </div>

      <!-- 操作者排行：行内仅展示前 3，完整 TOP20 通过弹窗查看 -->
      <div class="rank-section" v-if="topOps.length > 0">
        <div class="rank-head">
          <span class="rank-title">操作者排行</span>
          <button class="rank-more-btn" @click="rankDialog = true">查看 TOP20</button>
        </div>
        <div class="rank-list">
          <div v-for="(op, idx) in topOps.slice(0, 3)" :key="op.operator_id" class="rank-item">
            <span :class="['rank-idx', idx < 3 ? 'rank-top3' : '']">{{ idx + 1 }}</span>
            <img class="rank-avatar" :src="'https://q1.qlogo.cn/g?b=qq&nk=' + op.operator_id + '&s=100'" alt="头像">
            <span class="rank-id">{{ op.operator_id }}</span>
            <span class="rank-cnt">{{ op.cnt }} 次</span>
          </div>
        </div>
      </div>

      <!-- 操作者排行完整榜单弹窗（TOP20） -->
      <el-dialog v-model="rankDialog" title="操作者排行 TOP 20" :width="rankDialogWidth">
        <div class="rank-dialog-list">
          <div v-for="(op, idx) in topOps" :key="op.operator_id" class="rank-dialog-item">
            <span :class="['rank-idx', idx < 3 ? 'rank-top3' : '']">{{ idx + 1 }}</span>
            <img class="rank-avatar" :src="'https://q1.qlogo.cn/g?b=qq&nk=' + op.operator_id + '&s=100'" alt="头像">
            <span class="rank-id">{{ op.operator_id }}</span>
            <span class="rank-cnt">{{ op.cnt }} 次</span>
          </div>
        </div>
      </el-dialog>

      <!-- 空状态 -->
      <div v-if="records.length === 0" class="empty-tip">暂无数据</div>

      <!-- 踢人记录条目 -->
      <template v-if="activeTab === 'kick'">
        <div v-for="e in records" :key="e.id" class="record-item">
          <img class="record-avatar" :src="'https://q1.qlogo.cn/g?b=qq&nk=' + e.target_id + '&s=100'" alt="头像">
          <div class="record-info">
            <div class="record-ids">
              被踢：{{ e.target_id }}
              <span class="record-op">by {{ e.operator_id }}</span>
            </div>
            <div class="record-meta">群：{{ e.group_id }}</div>
          </div>
          <div class="record-time">{{ formatTime(e.time) }}</div>
        </div>
      </template>

      <!-- 批准入群记录条目 -->
      <template v-if="activeTab === 'approve'">
        <div v-for="e in records" :key="e.id" class="record-item">
          <img class="record-avatar" :src="'https://q1.qlogo.cn/g?b=qq&nk=' + e.req_id + '&s=100'" alt="头像">
          <div class="record-info">
            <div class="record-ids">
              申请：{{ e.req_id }}
              <span class="record-op">by {{ e.operator_id }}</span>
            </div>
            <div class="record-meta">群：{{ e.group_id }}</div>
          </div>
          <div class="record-time">{{ formatTime(e.time) }}</div>
        </div>
      </template>

      <!-- 禁言记录条目 -->
      <template v-if="activeTab === 'mute'">
        <div v-for="e in records" :key="e.id" class="record-item">
          <img class="record-avatar" :src="'https://q1.qlogo.cn/g?b=qq&nk=' + e.target_id + '&s=100'" alt="头像">
          <div class="record-info">
            <div class="record-ids">
              <span :style="{ color: e.duration === 0 ? '#16a34a' : '#dc2626' }">
                {{ e.duration === 0 ? '解禁' : '禁言' }}
              </span>：{{ e.target_id }}
              <span class="record-op">by {{ e.operator_id }}</span>
            </div>
            <div class="record-meta">
              群：{{ e.group_id }}
              <span v-if="e.duration > 0" class="mute-duration">· {{ formatDuration(e.duration) }}</span>
            </div>
          </div>
          <div class="record-time">{{ formatTime(e.time) }}</div>
        </div>
      </template>

      <!-- 分页控制 -->
      <div class="pagination-row" v-if="total > 0">
        <button class="action-btn action-btn-outline" @click="prevPage" :disabled="page <= 1">上一页</button>
        <span class="pagination-info">第 {{ page }} / {{ totalPages }} 页 · 共 {{ total }} 条</span>
        <button class="action-btn action-btn-outline" @click="nextPage" :disabled="page >= totalPages">下一页</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()

/** localStorage 存储 key 名称 */
const LS_KEY = 'manage_access_key'

/** 当前已确认的访问密钥 */
const manageKey = ref(localStorage.getItem(LS_KEY) || '')

/** 密钥输入框绑定值 */
const keyInput = ref('')

/** 密钥是否已就绪（有值即可访问） */
const keyOk = computed(() => !!manageKey.value)

/** 当前激活标签 */
const activeTab = ref<'kick' | 'mute' | 'approve'>('kick')

/** 筛选条件：群号 */
const filterGid = ref('')

/** 筛选条件：操作者 ID（空表示全部） */
const filterOperator = ref('')

/** 操作者下拉选项：已记录操作者与实际群管理/群主合并 [{id, recorded, role}] */
const operatorOptions = ref<{ id: string; recorded: boolean; role: string }[]>([])

/** 所有已记录过数据的群号（来自 /api/manage/groups），用于群快捷筛选补全 */
const recordedGroupIds = ref<string[]>([])

/** 时间范围选择器绑定值，value-format="x" 返回毫秒时间戳数字 */
const dateRange = ref<[number, number] | null>((() => {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 30)
  start.setHours(0, 0, 0, 0)
  return [start.getTime(), end.getTime()]
})())

/** 日期快捷选项 */
const dateShortcuts = [
  {
    text: '今天',
    value: () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      return [start, now]
    },
  },
  {
    text: '最近7天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 6)
      start.setHours(0, 0, 0, 0)
      return [start, end]
    },
  },
  {
    text: '最近30天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 29)
      start.setHours(0, 0, 0, 0)
      return [start, end]
    },
  },
]

/** 分页记录列表及总数 */
const records = ref<any[]>([])
const total = ref(0)
const page = ref(1)
const PAGE_SIZE = 20

/** 操作者排行列表 */
const topOps = ref<any[]>([])

/** 操作者排行完整榜单弹窗显隐 */
const rankDialog = ref(false)

/** 窗口宽度，用于响应式（移动端弹窗宽度自适应） */
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
function onResize() {
  windowWidth.value = window.innerWidth
}

/** 排行弹窗宽度：窄屏占满、桌面固定 420px */
const rankDialogWidth = computed(() => (windowWidth.value <= 768 ? '92%' : '420px'))

/** 群列表，用于快捷筛选 chip */
const groupList = ref<{ tid: number; name: string; icon: string; k4: boolean }[]>([])

/** 总页数（至少为1） */
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / PAGE_SIZE)))

/**
 * 群快捷筛选列表：以「所有已记录过数据的群号」(/api/manage/groups) 为准，
 * 名称/头像优先从 groupList 取，缺失时以群号兜底。
 * 修复点：原先只能依赖 bot 在线群列表 + 当前页记录中的群号，会漏掉历史群导致无法选择过滤。
 * @return 群筛选项数组 { gid, name, icon }
 */
const activeGroupChips = computed<{ gid: string; name: string; icon: string }[]>(() => {
  const nameMap = new Map<string, { name: string; icon: string }>()
  for (const g of groupList.value) {
    nameMap.set(String(g.tid), { name: g.name, icon: g.icon })
  }
  return recordedGroupIds.value.map(gid => {
    const info = nameMap.get(gid)
    return {
      gid,
      name: info?.name || gid,
      icon: info?.icon || `https://p.qlogo.cn/gh/${gid}/${gid}/0`,
    }
  })
})

/**
 * 创建携带 X-Manage-Key 请求头的 axios 实例
 * @return axios 实例
 */
function makeHttp() {
  return axios.create({
    headers: { 'X-Manage-Key': manageKey.value },
  })
}

onMounted(() => {
  // 优先读取 URL 查询参数中的 key（?key=xxx），方便直链访问
  const qKey = route.query.key as string | undefined
  if (qKey) {
    manageKey.value = qKey
    localStorage.setItem(LS_KEY, qKey)
  }
  if (keyOk.value) {
    loadData()
    loadGroupList()
    loadGroups()
    loadOperators()
  }
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

/**
 * 密钥确认后持久化并触发加载
 */
function submitKey() {
  const k = keyInput.value.trim()
  if (!k) {
    ElMessage.warning('请输入访问密钥')
    return
  }
  manageKey.value = k
  localStorage.setItem(LS_KEY, k)
  keyInput.value = ''
  loadData()
  loadGroupList()
  loadGroups()
  loadOperators()
}

/**
 * 清除访问密钥，回到输入界面
 */
function clearKey() {
  manageKey.value = ''
  localStorage.removeItem(LS_KEY)
  records.value = []
  topOps.value = []
  groupList.value = []
  recordedGroupIds.value = []
  operatorOptions.value = []
  filterOperator.value = ''
}

/**
 * 加载群列表，失败时静默处理（接口可能不支持 manage key 认证）
 */
function loadGroupList() {
  makeHttp().get('/api/glist').then(res => {
    groupList.value = res.data || []
  }).catch(() => {})
}

/**
 * 加载所有已记录过数据的群号，用于群快捷筛选补全（修复漏群 bug）
 */
function loadGroups() {
  makeHttp().get('/api/manage/groups').then(res => {
    recordedGroupIds.value = (res.data || []).map((x: any) => String(x))
  }).catch(() => {})
}

/**
 * 加载操作者下拉选项：已记录操作者与实际群管理/群主合并。
 * 随当前群号过滤（gid>0 时仅取该群管理员）。
 */
function loadOperators() {
  const gid = filterGid.value.trim().replace(/\D/g, '') || '0'
  makeHttp().get(`/api/manage/operators?gid=${gid}`).then(res => {
    operatorOptions.value = res.data || []
  }).catch(() => {})
}

/**
 * 切换标签页，重置到第一页并重新加载
 * @param tab 目标标签
 */
function switchTab(tab: 'kick' | 'mute' | 'approve') {
  activeTab.value = tab
  page.value = 1
  loadData()
}

/**
 * 构建通用查询参数字符串
 * @param extra 额外附加的键值对参数
 * @return URLSearchParams 序列化字符串
 */
function buildParams(extra: Record<string, string | number> = {}): string {
  // 去除可能存在的非数字前缀（如 "g1041541077" → "1041541077"）
  const gid = filterGid.value.trim().replace(/\D/g, '') || '0'
  // 操作者 ID 过滤，空表示全部
  const operator = filterOperator.value.trim().replace(/\D/g, '') || '0'
  // value-format="x" 返回毫秒时间戳字符串，未选择则为 0
  const startTime = dateRange.value ? dateRange.value[0] : '0'
  const endTime = dateRange.value ? dateRange.value[1] : '0'
  const params = new URLSearchParams({
    gid,
    operator,
    startTime: String(startTime),
    endTime: String(endTime),
    ...Object.fromEntries(Object.entries(extra).map(([k, v]) => [k, String(v)]))
  })
  return params.toString()
}

/**
 * 快捷选择群号并触发查询
 * @param tid 群号字符串，空字符串表示全部
 */
function selectGroup(tid: string) {
  filterGid.value = tid
  page.value = 1
  loadData()
  loadOperators()
}

/**
 * 触发查询，重置到第一页
 */
function doSearch() {
  page.value = 1
  loadData()
  loadOperators()
}

/**
 * 重置所有筛选条件并重新查询
 */
function resetFilter() {
  filterGid.value = ''
  filterOperator.value = ''
  dateRange.value = null
  page.value = 1
  loadData()
  loadOperators()
}

/**
 * 加载当前标签的分页记录与操作者排行
 * 遇到 401/403 时提示密钥无效
 */
function loadData() {
  const base = activeTab.value === 'kick' ? '/api/manage/kick'
    : activeTab.value === 'mute' ? '/api/manage/mute'
    : '/api/manage/approve'

  const http = makeHttp()

  // 并发加载分页数据与排行榜
  http.get(`${base}?${buildParams({ page: page.value, size: PAGE_SIZE })}`).then(res => {
    records.value = res.data.list || []
    total.value = res.data.total || 0
  }).catch(err => {
    const status = err?.response?.status ?? err?.status
    if (status === 401 || status === 403) {
      ElMessage.error('密钥无效或已失效，请重新输入')
      clearKey()
    } else {
      ElMessage.error(String(err))
    }
  })

  http.get(`${base}/top-operators?${buildParams({ limit: 20 })}`).then(res => {
    topOps.value = res.data || []
  }).catch(() => {})
}

/**
 * 跳转上一页
 */
function prevPage() {
  if (page.value > 1) {
    page.value--
    loadData()
  }
}

/**
 * 跳转下一页
 */
function nextPage() {
  if (page.value < totalPages.value) {
    page.value++
    loadData()
  }
}

/**
 * 格式化毫秒时间戳为 yyyy-MM-dd HH:mm
 * @param ts 毫秒时间戳
 * @return 格式化后的日期时间字符串
 */
function formatTime(ts: number): string {
  if (!ts) return ''
  const d = new Date(ts)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

/**
 * 格式化禁言时长秒数为可读字符串
 * @param sec 禁言秒数，0 表示解除
 * @return 可读时长字符串
 */
function formatDuration(sec: number): string {
  if (sec <= 0) return '解除禁言'
  if (sec < 60) return `${sec}秒`
  if (sec < 3600) {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return s > 0 ? `${m}分${s}秒` : `${m}分`
  }
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  return m > 0 ? `${h}小时${m}分` : `${h}小时`
}
</script>

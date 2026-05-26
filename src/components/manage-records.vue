<style scoped>
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

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-items: center;
  margin-bottom: 1rem;
}
.filter-row .input-card { flex: 1; min-width: 150px; }

.rank-section {
  margin-bottom: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  background: rgba(124, 58, 237, 0.05);
  border: 1px solid rgba(124, 58, 237, 0.12);
}
.rank-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #7c3aed;
  margin-bottom: 0.6rem;
}
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
</style>

<template>
  <div class="page-card">
    <h1 class="page-title">群管理记录</h1>

    <!-- 标签切换 -->
    <div class="tab-bar">
      <button :class="['tab-btn', activeTab === 'kick' ? 'tab-btn-active' : '']" @click="switchTab('kick')">踢人记录</button>
      <button :class="['tab-btn', activeTab === 'mute' ? 'tab-btn-active' : '']" @click="switchTab('mute')">禁言记录</button>
    </div>

    <!-- 筛选条件 -->
    <div class="filter-row">
      <div class="input-card">
        <span class="input-card-label">群号</span>
        <input type="text" v-model="filterGid" placeholder="不填=全部">
      </div>
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

    <!-- 操作者排行 -->
    <div class="rank-section" v-if="topOps.length > 0">
      <div class="rank-title">操作者排行 TOP 10</div>
      <div class="rank-list">
        <div v-for="(op, idx) in topOps" :key="op.operator_id" class="rank-item">
          <span :class="['rank-idx', idx < 3 ? 'rank-top3' : '']">{{ idx + 1 }}</span>
          <img class="rank-avatar" :src="'https://q1.qlogo.cn/g?b=qq&nk=' + op.operator_id + '&s=100'" alt="头像">
          <span class="rank-id">{{ op.operator_id }}</span>
          <span class="rank-cnt">{{ op.cnt }} 次</span>
        </div>
      </div>
    </div>

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
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import axios from '@/axios_in'

/** 当前激活标签 */
const activeTab = ref<'kick' | 'mute'>('kick')

/** 筛选条件：群号 */
const filterGid = ref('')

/** 时间范围选择器绑定值，元素为毫秒时间戳字符串，null 表示未选择 */
const dateRange = ref<[string, string] | null>(null)

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

/** 总页数（至少为1） */
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / PAGE_SIZE)))

onMounted(() => {
  loadData()
})

/**
 * 切换标签页，重置到第一页并重新加载
 * @param tab 目标标签
 */
function switchTab(tab: 'kick' | 'mute') {
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
  const gid = filterGid.value.trim() || '0'
  // value-format="x" 返回毫秒时间戳字符串，未选择则为 0
  const startTime = dateRange.value ? dateRange.value[0] : '0'
  const endTime = dateRange.value ? dateRange.value[1] : '0'
  const params = new URLSearchParams({
    gid,
    startTime: String(startTime),
    endTime: String(endTime),
    ...Object.fromEntries(Object.entries(extra).map(([k, v]) => [k, String(v)]))
  })
  return params.toString()
}

/**
 * 触发查询，重置到第一页
 */
function doSearch() {
  page.value = 1
  loadData()
}

/**
 * 重置所有筛选条件并重新查询
 */
function resetFilter() {
  filterGid.value = ''
  dateRange.value = null
  page.value = 1
  loadData()
}

/**
 * 加载当前标签的分页记录与操作者排行
 */
function loadData() {
  const base = activeTab.value === 'kick' ? '/api/manage/kick' : '/api/manage/mute'

  // 并发加载分页数据与排行榜
  axios.get(`${base}?${buildParams({ page: page.value, size: PAGE_SIZE })}`).then(res => {
    records.value = res.data.list || []
    total.value = res.data.total || 0
  }).catch(err => { alert(err) })

  axios.get(`${base}/top-operators?${buildParams({ limit: 10 })}`).then(res => {
    topOps.value = res.data || []
  }).catch(err => { alert(err) })
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

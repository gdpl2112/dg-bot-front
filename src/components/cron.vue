<style scoped>
.cron-section {
  margin-bottom: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.06);
}
.cron-section-title {
  font-weight: 700;
  font-size: 0.92rem;
  color: #0f172a;
  margin-bottom: 0.5rem;
}
.week-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.week-btn {
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(248, 250, 252, 0.98);
  font-size: 0.82rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}
.week-btn-selected {
  background: rgba(37, 99, 235, 0.12);
  border-color: rgba(37, 99, 235, 0.3);
  color: #2563eb;
}
.type-toggle {
  display: flex;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}
.type-btn {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(248, 250, 252, 0.98);
  font-size: 0.82rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}
.type-btn-active {
  background: rgba(37, 99, 235, 0.12);
  border-color: rgba(37, 99, 235, 0.3);
  color: #2563eb;
}
.select-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.select-card {
  flex: 1;
  min-width: 100px;
}
.select-card select {
  width: 100%;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 10px;
  padding: 0.4rem 0.65rem;
  font-size: 0.88rem;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
}
.target-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.target-row .input-card { flex: 1; min-width: 140px; }
</style>

<template>
  <RouterLink to="/bot" class="back-link">← 返回个人首页</RouterLink>
  <RouterLink to="/cron-list" class="back-link">← 返回定时任务</RouterLink>

  <div class="page-card">
    <h1 class="page-title" style="color: rgba(213,97,118,0.95);">Cron任务添加</h1>

    <!-- 日期类型选择 -->
    <div class="cron-section">
      <div class="type-toggle">
        <button :class="['type-btn', dateType === 'week' ? 'type-btn-active' : '']" @click="dateType='week'">星期模式</button>
        <button :class="['type-btn', dateType === 'month-day' ? 'type-btn-active' : '']" @click="dateType='month-day'">月/日模式</button>
      </div>

      <!-- 星期选择 -->
      <div v-if="dateType === 'week'" class="week-grid">
        <button v-for="w in weekOptions" :key="w.value"
                :class="['week-btn', selectedWeeks.includes(w.value) ? 'week-btn-selected' : '']"
                @click="toggleWeek(w.value)">{{ w.label }}</button>
      </div>

      <!-- 月/日选择 -->
      <div v-if="dateType === 'month-day'">
        <div class="type-toggle">
          <button :class="['type-btn', monthMode === 'eve' ? 'type-btn-active' : '']" @click="monthMode='eve'">每月</button>
          <button :class="['type-btn', monthMode === 'point' ? 'type-btn-active' : '']" @click="monthMode='point'">指定月</button>
          <button :class="['type-btn', dayMode === 'eve' ? 'type-btn-active' : '']" @click="dayMode='eve'">每日</button>
          <button :class="['type-btn', dayMode === 'point' ? 'type-btn-active' : '']" @click="dayMode='point'">指定日</button>
        </div>
        <div class="select-row">
          <div v-if="monthMode === 'point'" class="select-card">
            <select v-model="selectedMonth">
              <option v-for="e in months" :key="e" :value="e">{{ e }}月</option>
            </select>
          </div>
          <div v-if="dayMode === 'point'" class="select-card">
            <select v-model="selectedDay">
              <option v-for="e in days" :key="e" :value="e">{{ e }}日</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 时/分选择 -->
    <div class="cron-section">
      <div class="cron-section-title">时/分</div>
      <div class="select-row">
        <div class="select-card">
          <select v-model="selectedHour">
            <option v-for="e in hours" :key="e" :value="e">{{ e }}点</option>
          </select>
        </div>
        <div class="select-card">
          <select v-model="selectedMin">
            <option v-for="e in mils" :key="e" :value="e">{{ e }}分</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 发送目标与内容 -->
    <div class="cron-section">
      <div class="cron-section-title">信息补充</div>
      <div class="target-row">
        <div class="input-card">
          <select v-model="tidType" style="border:0;background:transparent;padding:0.4rem 0.65rem;font-size:0.88rem;outline:none">
            <option value="f">好友</option>
            <option value="g">群</option>
          </select>
          <input type="text" v-model="targetId" placeholder="发送到tid">
        </div>
        <div class="input-card">
          <span class="input-card-label">内容</span>
          <input type="text" v-model="content" placeholder="内容可为code">
        </div>
      </div>
    </div>

    <button class="action-btn action-btn-primary" style="width:100%;padding:0.65rem" @click="submit0()">添加</button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import axios from "@/axios_in";
import router from "@/router/index.js";

/** 时间选项 */
let hours = ref(Array.from(new Array(24).keys()).slice(0))
let mils = ref(Array.from(new Array(60).keys()).slice(0))
let days = ref(Array.from(new Array(32).keys()).slice(1))
let months = ref(Array.from(new Array(13).keys()).slice(1))

/** 星期选项 */
const weekOptions = [
  {label: '星期一', value: '2'}, {label: '星期二', value: '3'},
  {label: '星期三', value: '4'}, {label: '星期四', value: '5'},
  {label: '星期五', value: '6'}, {label: '星期六', value: '7'},
  {label: '星期日', value: '1'},
]

/** 表单状态 */
const dateType = ref('month-day')
const selectedWeeks = ref<string[]>([])
const monthMode = ref('point')
const dayMode = ref('point')
const selectedMonth = ref(1)
const selectedDay = ref(1)
const selectedHour = ref(0)
const selectedMin = ref(0)
const tidType = ref('f')
const targetId = ref('')
const content = ref('')

/**
 * 切换星期选择
 * @param value 星期数值
 */
function toggleWeek(value: string) {
  const idx = selectedWeeks.value.indexOf(value)
  if (idx >= 0) selectedWeeks.value.splice(idx, 1)
  else selectedWeeks.value.push(value)
}

/** 提交Cron任务 */
function submit0() {
  let obj: Record<string, string> = {
    'l1-type': dateType.value,
    'hour': String(selectedHour.value),
    'mil': String(selectedMin.value),
    'tid-type': tidType.value,
    'targetId': targetId.value,
    'content': content.value,
  }

  if (dateType.value === 'week') {
    // 星期模式：拼接选中的星期值
    obj['week'] = selectedWeeks.value.join('')
  } else {
    // 月/日模式
    obj['for-month'] = monthMode.value
    obj['for-day'] = dayMode.value
    if (monthMode.value === 'point') obj['month'] = String(selectedMonth.value)
    if (dayMode.value === 'point') obj['day'] = String(selectedDay.value)
  }

  let json = JSON.stringify(obj);
  axios.post("/api/cronAdd", json).then(function (response) {
    let tips = response.data;
    alert(tips);
    if (tips === "ok") {
      router.push("/cron-list")
    }
  }).catch(function (err) {
    alert(err);
  })
}
</script>
<style scoped>
.add-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}
.add-row input {
  flex: 1;
  min-width: 120px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 10px;
  padding: 0.5rem 0.85rem;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  transition: border-color 0.2s;
}
.add-row input:focus { border-color: rgba(37, 99, 235, 0.35); }
.touch-card {
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.06);
  margin-bottom: 0.65rem;
  overflow: hidden;
  transition: background 0.2s;
}
.touch-card:hover { background: rgba(255, 255, 255, 0.88); }
.touch-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  cursor: pointer;
  user-select: none;
}
.touch-name { font-weight: 700; color: #0f172a; font-size: 0.95rem; }
.touch-count {
  font-size: 0.78rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
  font-weight: 600;
  margin-left: 0.5rem;
}
.touch-body { padding: 0 1rem 0.75rem; }
.out-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0;
  border-top: 1px solid rgba(15, 23, 42, 0.04);
  font-size: 0.88rem;
  color: #334155;
}
</style>

<template>

  <div class="page-card">
    <h1 class="page-title">被动回复词管理</h1>

    <!-- 添加表单 -->
    <div class="add-row">
      <input type="text" v-model="newTouch" placeholder="触发词">
      <input type="text" v-model="newOut" placeholder="回复词">
      <button class="action-btn action-btn-primary" @click="add()">添加</button>
    </div>

    <!-- 触发词列表 -->
    <div v-for="(e, i) in all" :key="e.touch" class="touch-card">
      <div class="touch-header" @click="toggleExpand(i)">
        <span>
          <span class="touch-name">{{ e.touch }}</span>
          <span class="touch-count">{{ e.outs.length }}条回复</span>
        </span>
        <span style="display:flex;gap:0.4rem;align-items:center;">
          <button class="action-btn action-btn-danger" @click.stop="del(e.touch, null)">删除</button>
          <span style="font-size:0.75rem;color:#94a3b8">{{ expandedSet.has(i) ? '▲' : '▼' }}</span>
        </span>
      </div>
      <div v-if="expandedSet.has(i)" class="touch-body">
        <div v-for="o in e.outs" :key="o" class="out-item">
          <span>{{ o }}</span>
          <button class="action-btn action-btn-danger" style="font-size:0.78rem;padding:0.25rem 0.6rem" @click="del(e.touch, o)">删除</button>
        </div>
      </div>
    </div>

    <div v-if="all.length === 0" style="text-align:center;color:#94a3b8;padding:2rem 0;">暂无回复词数据</div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "@/axios_in";

/** 被动回复词列表 */
let all = ref<any[]>([])

/** 新增触发词/回复词输入 */
const newTouch = ref('')
const newOut = ref('')

/** 展开的触发词索引集合 */
const expandedSet = ref(new Set<number>())

onMounted(() => {
  axios.get("/api/p-list").then(function (response) {
    all.value = response.data
  }).catch(function (err) {
    alert(err);
  })
})

/** 添加回复词 */
function add() {
  axios.post("/api/p-add", {t0: newTouch.value, t1: newOut.value}).then(function (response) {
    all.value = response.data;
    newOut.value = ""
  }).catch(function (err) {
    alert(err);
  })
}

/**
 * 删除触发词或单条回复
 * @param touch 触发词
 * @param o 回复词内容，null时删除整个触发词
 */
function del(touch: string, o: string | null) {
  axios.post("/api/p-del", {touch: touch, out: o}).then(function (response) {
    if (response.data === true) {
      if (o !== null) {
        // 仅删除单条回复，若回复清空则移除整个触发词
        all.value = all.value.filter(function (item: any) {
          if (item.touch === touch) {
            item.outs = item.outs.filter(function (i0: string) {
              return i0 !== o;
            })
          }
          return item.outs.length > 0
        });
      } else {
        all.value = all.value.filter(function (item: any) {
          return item.touch !== touch
        });
      }
    }
  }).catch(function (err) {
    alert(err);
  })
}

/**
 * 切换展开/折叠状态
 * @param index 触发词索引
 */
function toggleExpand(index: number) {
  if (expandedSet.value.has(index)) {
    expandedSet.value.delete(index)
  } else {
    expandedSet.value.add(index)
  }
}
</script>
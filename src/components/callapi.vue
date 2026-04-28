<style scoped>
.api-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.06);
  margin-bottom: 0.65rem;
  transition: background 0.2s;
}
.api-card:hover { background: rgba(255, 255, 255, 0.88); }
.api-info { flex: 1; min-width: 0; }
.api-info-item {
  display: flex;
  gap: 0.4rem;
  padding: 0.3rem 0;
  font-size: 0.88rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.04);
}
.api-info-label { color: #64748b; font-weight: 600; white-space: nowrap; }
.api-info-value { color: #0f172a; word-break: break-all; }
.api-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}
.api-favicon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  object-fit: contain;
}
@media (max-width: 576px) {
  .api-card { flex-direction: column; }
  .api-actions { flex-direction: row; }
}
</style>

<template>
  <RouterLink to="/bot" class="back-link">← 返回个人首页</RouterLink>

  <div class="page-card">
    <h1 class="page-title">API调用管理</h1>

    <div class="info-bar">
      参考 <a href="https://github.com/gdpl2112/MiraiCallApiPlugin" target="_blank" style="color:#1d4ed8;font-weight:600">MiraiCallApiPlugin</a>
    </div>

    <div style="text-align:center; margin-bottom:1rem;">
      <button class="action-btn action-btn-primary" @click="openAddModal()">添加API</button>
    </div>

    <!-- API列表 -->
    <div v-for="e in data" :key="e.touch" class="api-card">
      <div class="api-info">
        <div class="api-info-item">
          <span class="api-info-label">输出格式:</span>
          <span class="api-info-value">{{ e.out }}</span>
        </div>
        <div class="api-info-item">
          <span class="api-info-label">输出参数:</span>
          <span class="api-info-value">{{ getStrArgs(e.outArgs) }}</span>
        </div>
        <div class="api-info-item">
          <span class="api-info-label">触发词:</span>
          <span class="api-info-value">{{ e.touch }}</span>
        </div>
        <div class="api-info-item">
          <span class="api-info-label">地址:</span>
          <span class="api-info-value">{{ e.url }}</span>
        </div>
        <div class="api-info-item">
          <span class="api-info-label">不输出条件:</span>
          <span class="api-info-value">{{ e.jude }}</span>
        </div>
      </div>
      <div class="api-actions">
        <img class="api-favicon" :src="getFavicon(e)" alt="favicon">
        <button class="action-btn action-btn-danger" @click="delete0(e.touch)">删除</button>
        <button class="action-btn action-btn-outline" @click="openModifyModal(e)">修改</button>
      </div>
    </div>

    <div v-if="data.length === 0" style="text-align:center;color:#94a3b8;padding:2rem 0;">暂无API数据</div>
  </div>

  <!-- 添加/修改弹窗 -->
  <div v-if="modalVisible" class="modal-mask" @click.self="modalVisible=false">
    <div class="modal-card">
      <div class="modal-card-header">
        <span class="modal-card-title">{{ isEditing ? '修改API' : '添加API' }}</span>
        <button class="modal-card-close" @click="modalVisible=false">✕</button>
      </div>
      <div class="modal-card-body">
        <div class="input-card" style="margin-bottom:0.65rem">
          <span class="input-card-label">输出格式</span>
          <input type="text" v-model="form.out">
        </div>
        <div class="input-card" style="margin-bottom:0.65rem">
          <span class="input-card-label">输出参数</span>
          <input type="text" v-model="form.outArgs" placeholder="用,分割参数(英文)">
        </div>
        <div class="input-card" style="margin-bottom:0.65rem">
          <span class="input-card-label">触发词</span>
          <input type="text" v-model="form.touch">
        </div>
        <div class="input-card" style="margin-bottom:0.65rem">
          <span class="input-card-label">网址</span>
          <input type="text" v-model="form.url">
        </div>
        <div class="input-card" style="margin-bottom:0.65rem">
          <span class="input-card-label">否条件</span>
          <input type="text" v-model="form.jude">
        </div>
      </div>
      <div class="modal-card-footer">
        <button class="action-btn action-btn-outline" @click="modalVisible=false">关闭</button>
        <button class="action-btn action-btn-primary" @click="submit0()">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "@/axios_in";
import {onMounted, reactive, ref} from "vue";

/** API列表数据 */
let data = ref<any[]>([])

/** 弹窗控制 */
const modalVisible = ref(false)
const isEditing = ref(false)

/** 表单数据 */
const form = reactive({ out: '', outArgs: '', touch: '', url: '', jude: '' })

onMounted(() => {
  axios.get("/api/ca/get_data").then(function (response) {
    data.value = response.data;
  }).catch(function (err) {
    alert(err);
  })
})

/** 提交添加/修改 */
function submit0() {
  let v1 = encodeURIComponent(form.out)
  let v2 = encodeURIComponent(form.outArgs)
  let v3 = encodeURIComponent(form.touch)
  let v4 = encodeURIComponent(form.url)
  let v5 = encodeURIComponent(form.jude)
  let url = "/api/ca/append?out=" + v1
      + "&outArgs=" + v2
      + "&touch=" + v3
      + "&url=" + v4
      + "&jude=" + v5;

  axios.post(url).then(function (response) {
    data.value = response.data;
    modalVisible.value = false
    resetForm()
  }).catch(function (err) {
    alert(err);
  })
}

/** 打开添加弹窗 */
function openAddModal() {
  isEditing.value = false
  resetForm()
  modalVisible.value = true
}

/**
 * 打开修改弹窗，填充已有数据
 * @param e 当前API数据对象
 */
function openModifyModal(e: any) {
  isEditing.value = true
  form.out = e.out
  form.outArgs = e.outArgs
  form.touch = e.touch
  form.url = e.url
  form.jude = e.jude
  modalVisible.value = true
}

/**
 * 删除指定触发词的API
 * @param touch 触发词
 */
function delete0(touch: string) {
  axios.get("/api/ca/delete?touch=" + touch).then(function (response) {
    data.value = response.data;
  }).catch(function (err) {
    alert(err);
  })
}

/**
 * 获取网站favicon地址
 * @param e API数据对象
 * @return favicon URL
 */
function getFavicon(e: any) {
  let u0 = e.url;
  let i0 = u0.substr(8).indexOf("/")
  return u0.substr(0, 9 + i0) + "favicon.ico"
}

/**
 * 格式化输出参数
 * @param args 逗号分隔的参数字符串
 * @return 换行分隔的参数
 */
function getStrArgs(args: string) {
  return args.split(",").join(", ")
}

/** 重置表单 */
function resetForm() {
  form.out = ''
  form.outArgs = ''
  form.touch = ''
  form.url = ''
  form.jude = ''
}
</script>
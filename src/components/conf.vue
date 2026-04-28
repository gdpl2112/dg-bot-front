<style scoped>
.conf-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.conf-field {
  flex: 1;
  min-width: 220px;
}
.code-area {
  width: 100%;
  min-height: 240px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  padding: 0.75rem;
  font-family: 'Courier New', monospace;
  font-size: 0.88rem;
  background: rgba(248, 250, 252, 0.98);
  color: #0f172a;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
}
.code-area:focus {
  border-color: rgba(37, 99, 235, 0.35);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
.script-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.modal-body-text {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  white-space: pre-wrap;
  word-break: break-all;
  line-height: 1.7;
}
.modal-body-text.is-error { color: #dc2626; }
.log-entry {
  margin: 0;
  padding: 0.25rem 0;
  border-bottom: 1px solid rgba(15, 23, 42, 0.04);
}
</style>

<template>

  <div class="page-card">
    <h1 class="page-title" style="color: rgba(37,99,235,0.95);">Bot代挂 · 配置中心</h1>

    <!-- 回复配置 -->
    <div class="conf-row">
      <div class="conf-field">
        <div class="input-card">
          <span class="input-card-label">回复CD(秒)</span>
          <input type="number" min="1" v-model="formData.cd0">
        </div>
        <button class="action-btn action-btn-outline" style="margin-top:0.4rem" @click="modify('cd0')">修改</button>
      </div>
      <div class="conf-field">
        <div class="input-card">
          <span class="input-card-label">复述前置</span>
          <input type="text" v-model="formData.retell">
        </div>
        <button class="action-btn action-btn-outline" style="margin-top:0.4rem" @click="modify('retell')">修改</button>
      </div>
    </div>

    <div class="conf-row">
      <div class="conf-field">
        <div class="input-card">
          <span class="input-card-label">回复开启</span>
          <input type="text" v-model="formData.open0">
        </div>
        <button class="action-btn action-btn-outline" style="margin-top:0.4rem" @click="modify('open0')">修改</button>
      </div>
      <div class="conf-field">
        <div class="input-card">
          <span class="input-card-label">回复关闭</span>
          <input type="text" v-model="formData.close0">
        </div>
        <button class="action-btn action-btn-outline" style="margin-top:0.4rem" @click="modify('close0')">修改</button>
      </div>
    </div>

    <div class="conf-row">
      <div class="conf-field">
        <div class="input-card">
          <span class="input-card-label">调用开启</span>
          <input type="text" v-model="formData.open1">
        </div>
        <button class="action-btn action-btn-outline" style="margin-top:0.4rem" @click="modify('open1')">修改</button>
      </div>
      <div class="conf-field">
        <div class="input-card">
          <span class="input-card-label">调用关闭</span>
          <input type="text" v-model="formData.close1">
        </div>
        <button class="action-btn action-btn-outline" style="margin-top:0.4rem" @click="modify('close1')">修改</button>
      </div>
    </div>

    <div class="info-bar">纯数字为好友f(id); g(id)为群聊; 找不到时则发到自己bot</div>

    <div class="conf-row">
      <div class="conf-field">
        <div class="input-card">
          <span class="input-card-label">监听发送到</span>
          <input type="text" v-model="formData.rsid">
        </div>
        <button class="action-btn action-btn-outline" style="margin-top:0.4rem" @click="modify('rsid')">修改</button>
      </div>
      <div class="conf-field">
        <div class="input-card">
          <span class="input-card-label">状态查看</span>
          <input type="text" v-model="formData.status0">
        </div>
        <button class="action-btn action-btn-outline" style="margin-top:0.4rem" @click="modify('status0')">修改</button>
      </div>
    </div>

    <div class="conf-row">
      <div class="conf-field">
        <div class="input-card">
          <span class="input-card-label">添词</span>
          <input type="text" v-model="formData.add0">
        </div>
        <button class="action-btn action-btn-outline" style="margin-top:0.4rem" @click="modify('add0')">修改</button>
      </div>
      <div class="conf-field">
        <div class="input-card">
          <span class="input-card-label">添加时取消</span>
          <input type="text" v-model="formData.cancel0">
        </div>
        <button class="action-btn action-btn-outline" style="margin-top:0.4rem" @click="modify('cancel0')">修改</button>
      </div>
    </div>

    <div class="conf-row">
      <div class="conf-field">
        <div class="input-card">
          <span class="input-card-label">查词</span>
          <input type="text" v-model="formData.select0">
        </div>
        <button class="action-btn action-btn-outline" style="margin-top:0.4rem" @click="modify('select0')">修改</button>
      </div>
      <div class="conf-field">
        <div class="input-card">
          <span class="input-card-label">删词</span>
          <input type="text" v-model="formData.del0">
        </div>
        <button class="action-btn action-btn-outline" style="margin-top:0.4rem" @click="modify('del0')">修改</button>
      </div>
    </div>

    <hr>

    <!-- 通知配置 -->
    <div class="info-bar">通知(当bot上线/离线时访问指定URL)</div>
    <div class="conf-row">
      <div class="conf-field" style="flex:1">
        <div class="input-card">
          <span class="input-card-label">通知</span>
          <input type="text" v-model="formData.nu">
        </div>
        <button class="action-btn action-btn-outline" style="margin-top:0.4rem" @click="modify('nu')">修改</button>
      </div>
    </div>

    <div class="info-bar">自定义脚本与[API调用]共用开关</div>

    <!-- 脚本操作按钮 -->
    <div class="script-actions">
      <button class="action-btn action-btn-success" @click="codePost()">修改脚本</button>
      <button class="action-btn action-btn-primary" @click="getException()">获取报错</button>
      <button class="action-btn action-btn-outline" @click="getLogMsg()">获得日志</button>
    </div>

    <div class="info-bar">
      示例js代码 使用Java Nashorn引擎
      <a href="https://github.com/gdpl2112/dg-script" target="_blank" style="color:#1d4ed8;font-weight:600">详见仓库</a>
      参考模版API
    </div>

    <textarea class="code-area" v-model="formData.code" placeholder="java script 自定义脚本"></textarea>
  </div>

  <!-- 日志/报错弹窗 -->
  <div v-if="modalVisible" class="modal-mask" @click.self="closeModal">
    <div class="modal-card modal-card-lg">
      <div class="modal-card-header">
        <span class="modal-card-title">{{ modalTitle }}</span>
        <button class="modal-card-close" @click="closeModal">✕</button>
      </div>
      <div class="modal-card-body">
        <div :class="['modal-body-text', { 'is-error': isError }]">
          <p v-for="(line, i) in modalLines" :key="i" class="log-entry">{{ line }}</p>
        </div>
      </div>
      <div class="modal-card-footer">
        <button class="action-btn action-btn-outline" @click="closeModal">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "@/axios_in";
import {onMounted, onBeforeUnmount, reactive, ref} from "vue";
import {formatMsgTime} from "@/assets/utils";

/** 表单数据，键与后端配置项对应 */
const formData = reactive<Record<string, any>>({
  cd0: '', retell: '', open0: '', close0: '',
  open1: '', close1: '', rsid: '', status0: '',
  add0: '', cancel0: '', select0: '', del0: '',
  nu: '', code: ''
})

/** 弹窗控制 */
const modalVisible = ref(false)
const modalTitle = ref('')
const modalLines = ref<string[]>([])
const isError = ref(false)
let showLoging = false
let logTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  axios.get("/api/config").then(function (response) {
    // 将后端返回的配置项填充到表单
    Object.keys(response.data).forEach(key => {
      if (key in formData) {
        formData[key] = response.data[key]
      }
    })
  }).catch(function (err) {
    alert(err);
  })
})

onBeforeUnmount(() => {
  if (logTimer) clearInterval(logTimer)
})

/**
 * 修改单个配置项
 * @param key 配置项键名
 */
function modify(key: string) {
  let value: string = String(formData[key] ?? '')
  if (value.indexOf("&") >= 0) value = encodeURIComponent(value)
  axios.get("/api/conf-modify?key=" + key + "&value=" + value).then(function (response) {
    alert(response.data)
  }).catch(function (err) {
    alert(err);
  })
}

/** 提交自定义脚本代码 */
function codePost() {
  let df = new FormData()
  df.set("code", formData.code)
  axios.post("/api/code-modify", df).then(function (response) {
    alert(response.data)
  }).catch(function (err) {
    alert(err);
  })
}

/** 获取报错信息并展示弹窗 */
function getException() {
  axios.get("/api/get-exception").then(function (response) {
    modalTitle.value = "时间: " + formatMsgTime(response.data.time)
    modalLines.value = response.data.msg
      .replaceAll("\r\n", "\n")
      .replaceAll("\t", "  ")
      .split("\n")
    isError.value = true
    modalVisible.value = true
  }).catch(function (err) {
    alert(err);
  })
}

/** 获取日志信息并展示弹窗，同时开启自动刷新 */
function getLogMsg() {
  axios.get("/api/get-log").then(function (response) {
    modalTitle.value = "日志信息 #脚本内使用log.log(str)可打印日志"
    modalLines.value = response.data
    isError.value = false
    showLoging = true
    modalVisible.value = true
    // 每3秒自动刷新日志
    if (!logTimer) {
      logTimer = setInterval(() => {
        if (showLoging) {
          axios.get("/api/get-log").then(function (response) {
            modalLines.value = response.data
          })
        }
      }, 3000)
    }
  }).catch(function (err) {
    alert(err);
  })
}

/** 关闭弹窗并停止日志刷新 */
function closeModal() {
  modalVisible.value = false
  showLoging = false
}
</script>
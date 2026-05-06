<template>
  <div class="page-card">
    <h1 class="page-title" style="color: rgba(37,99,235,0.95);">AI管理</h1>

    <div class="info-bar">
      配置按当前登录用户自动加载与保存，首次进入会自动创建默认配置。
    </div>

    <div class="summary-grid">
      <div class="summary-card">
        <span class="summary-label">配置状态</span>
        <span :class="['status-badge', form.open ? 'status-badge-success' : 'status-badge-secondary']">
          {{ form.open ? '已开启' : '已关闭' }}
        </span>
      </div>
      <div class="summary-card">
        <span class="summary-label">联网能力</span>
        <span :class="['status-badge', form.network ? 'status-badge-info' : 'status-badge-secondary']">
          {{ form.network ? '允许联网' : '离线模式' }}
        </span>
      </div>
      <div class="summary-card">
        <span class="summary-label">当前模型</span>
        <strong>{{ form.modelId || '未设置' }}</strong>
      </div>
      <div class="summary-card">
        <span class="summary-label">唤起前缀</span>
        <strong>{{ form.prefix || 'AI' }}</strong>
      </div>
    </div>

    <div class="section-row">
      <div class="section-card">
        <div class="section-title">基础信息</div>
        <div class="field-list">
          <div class="input-card field-item">
            <span class="input-card-label">配置归属</span>
            <input type="text" :value="form.qid || '当前登录用户'" readonly>
          </div>
          <div class="input-card field-item">
            <span class="input-card-label">AI名字</span>
            <input type="text" v-model="form.name" placeholder="小生AI">
          </div>
          <div class="input-card field-item">
            <span class="input-card-label">AI性格</span>
            <input type="text" v-model="form.trait" placeholder="乖巧,可爱">
          </div>
        </div>
      </div>

      <div class="section-card">
        <div class="section-title">开关与参数</div>
        <div class="field-list">
          <div class="toggle-row">
            <span class="toggle-label">AI功能</span>
            <button :class="['toggle-btn', form.open ? 'toggle-btn-on' : 'toggle-btn-off']" type="button" @click="form.open = !form.open">
              {{ form.open ? '开启' : '关闭' }}
            </button>
          </div>
          <div class="toggle-row">
            <span class="toggle-label">联网</span>
            <button :class="['toggle-btn', form.network ? 'toggle-btn-on' : 'toggle-btn-off']" type="button" @click="form.network = !form.network">
              {{ form.network ? '允许' : '禁止' }}
            </button>
          </div>
          <div class="input-card field-item">
            <span class="input-card-label">前缀</span>
            <input type="text" v-model="form.prefix" placeholder="AI">
          </div>
          <div class="input-card field-item">
            <span class="input-card-label">记忆条数</span>
            <input type="number" min="1" step="1" v-model.number="form.maxMessage">
          </div>
          <div class="input-card field-item">
            <span class="input-card-label">温度</span>
            <input type="number" min="0" max="2" step="0.1" v-model.number="form.temperature">
          </div>
        </div>
      </div>
    </div>

    <div class="section-row">
      <div class="section-card section-card-wide">
        <div class="section-title">接口配置</div>
        <div class="field-list">
          <div class="input-card field-item api-key-row">
            <span class="input-card-label">API Key</span>
            <input :type="showApiKey ? 'text' : 'password'" v-model="form.apiKey" placeholder="sk-xxxxxx">
            <button class="action-btn action-btn-outline api-toggle-btn" type="button" @click="showApiKey = !showApiKey">
              {{ showApiKey ? '隐藏' : '显示' }}
            </button>
          </div>
          <div class="input-card field-item">
            <span class="input-card-label">Base URL</span>
            <input type="text" v-model="form.baseUrl" placeholder="https://api.openai.com/v1">
          </div>
          <div class="input-card field-item">
            <span class="input-card-label">模型 ID</span>
            <input type="text" v-model="form.modelId" placeholder="gpt-3.5-turbo">
          </div>
        </div>
      </div>
    </div>

    <div class="section-row">
      <div class="section-card section-card-wide">
        <div class="section-title">记忆与提示词</div>
        <div class="input-card textarea-card">
          <span class="input-card-label">AI提示</span>
          <textarea v-model="form.trait" rows="4" placeholder="可输入更细致的性格设定或提示词"></textarea>
        </div>
        <div class="hint-text">
          <span>•</span>
          <span>建议按逗号或短句拆分性格关键词，方便后续维护。</span>
        </div>
      </div>
    </div>

    <div class="action-bar">
      <button class="action-btn action-btn-outline" type="button" :disabled="loading" @click="loadConfig">
        {{ loading ? '加载中...' : '重新加载' }}
      </button>
      <button class="action-btn action-btn-outline" type="button" :disabled="saving" @click="fillDefaults">
        填充默认值
      </button>
      <button class="action-btn action-btn-success" type="button" :disabled="saving" @click="saveConfig">
        {{ saving ? '保存中...' : '保存配置' }}
      </button>
    </div>

    <div class="info-bar">
      上次加载：{{ lastLoadedText }}；保存时不会提交 `qid`，始终只会更新当前登录用户自己的配置。
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import axios from '@/axios_in'

interface AiConfForm {
  qid: string
  open: boolean
  prefix: string
  apiKey: string
  baseUrl: string
  modelId: string
  temperature: number
  network: boolean
  name: string
  trait: string
  maxMessage: number
}

const defaultConfig: AiConfForm = {
  qid: '',
  open: false,
  prefix: 'AI',
  apiKey: '',
  baseUrl: 'https://api.openai.com/v1',
  modelId: 'gpt-3.5-turbo',
  temperature: 0.7,
  network: false,
  name: '小生AI',
  trait: '乖巧,可爱',
  maxMessage: 10,
}

const form = reactive<AiConfForm>({ ...defaultConfig })
const loading = ref(false)
const saving = ref(false)
const showApiKey = ref(false)
const lastLoadedText = ref('尚未加载')

function normalizeConfig(data: Partial<AiConfForm>): AiConfForm {
  return {
    qid: String(data.qid ?? ''),
    open: Boolean(data.open ?? false),
    prefix: String(data.prefix ?? 'AI'),
    apiKey: String(data.apiKey ?? ''),
    baseUrl: String(data.baseUrl ?? 'https://api.openai.com/v1'),
    modelId: String(data.modelId ?? 'gpt-3.5-turbo'),
    temperature: Number(data.temperature ?? 0.7),
    network: Boolean(data.network ?? false),
    name: String(data.name ?? '小生AI'),
    trait: String(data.trait ?? '乖巧,可爱'),
    maxMessage: Number(data.maxMessage ?? 10),
  }
}

function applyConfig(data: Partial<AiConfForm>) {
  const normalized = normalizeConfig(data)
  Object.assign(form, normalized)
  showApiKey.value = false
  lastLoadedText.value = new Date().toLocaleString()
}

function loadConfig() {
  loading.value = true
  axios.get('/api/ai-conf/config').then(response => {
    applyConfig(response.data ?? {})
  }).catch(error => {
    alert(error?.message || '加载 AI 配置失败')
  }).finally(() => {
    loading.value = false
  })
}

function fillDefaults() {
  const currentQid = form.qid
  Object.assign(form, { ...defaultConfig, qid: currentQid })
}

function saveConfig() {
  saving.value = true
  const payload = {
    open: form.open,
    prefix: form.prefix.trim(),
    apiKey: form.apiKey.trim(),
    baseUrl: form.baseUrl.trim(),
    modelId: form.modelId.trim(),
    temperature: Number(form.temperature),
    network: form.network,
    name: form.name.trim(),
    trait: form.trait.trim(),
    maxMessage: Number(form.maxMessage),
  }

  axios.post('/api/ai-conf/update', payload).then(response => {
    const result = response.data
    if (typeof result === 'object' && result !== null) {
      alert(result.message || result.data || '更新成功')
    } else {
      alert(String(result || '更新成功'))
    }
    loadConfig()
  }).catch(error => {
    const message = error?.response?.data?.message || error?.message || '保存 AI 配置失败'
    alert(message)
  }).finally(() => {
    saving.value = false
  })
}

onMounted(() => {
  loadConfig()
})
</script>

<style scoped>
.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.summary-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.9rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(15, 23, 42, 0.06);
}

.summary-label,
.toggle-label {
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 600;
}

.section-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.section-card {
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 1rem;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
}

.section-card-wide {
  grid-column: 1 / -1;
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.9rem;
}

.field-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field-item {
  width: 100%;
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 0.9rem;
  border-radius: 12px;
  background: rgba(248, 250, 252, 0.95);
  border: 1px solid rgba(15, 23, 42, 0.08);
}

.api-key-row {
  gap: 0.5rem;
}

.api-toggle-btn {
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.textarea-card {
  align-items: stretch;
  min-height: 132px;
}

.textarea-card textarea {
  width: 100%;
  resize: vertical;
  min-height: 120px;
}

.hint-text {
  display: flex;
  gap: 0.4rem;
  align-items: flex-start;
  margin-top: 0.75rem;
  color: #64748b;
  font-size: 0.85rem;
  line-height: 1.6;
}

.action-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-bottom: 0.8rem;
}

@media (max-width: 960px) {
  .summary-grid,
  .section-row {
    grid-template-columns: 1fr;
  }

  .action-bar {
    justify-content: stretch;
  }

  .action-bar .action-btn {
    flex: 1;
  }
}
</style>

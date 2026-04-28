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
.tab-btn-active {
  color: #2563eb;
  border-bottom-color: #2563eb;
}
.manager-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.06);
  margin-bottom: 0.5rem;
  transition: background 0.2s;
}
.manager-item:hover { background: rgba(255, 255, 255, 0.88); }
.manager-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.manager-name { flex: 1; font-weight: 600; color: #0f172a; font-size: 0.9rem; }
.search-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.search-row input {
  flex: 1;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 10px;
  padding: 0.45rem 0.85rem;
  font-size: 0.88rem;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
}
.search-row input:focus { border-color: rgba(37, 99, 235, 0.35); }
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.65rem;
  max-height: 700px;
  overflow-y: auto;
  padding-right: 0.25rem;
}
.contact-card {
  text-align: center;
  padding: 0.75rem 0.5rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.06);
  transition: all 0.2s;
}
.contact-card:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}
.contact-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.35rem;
}
.contact-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.toggle-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.3rem;
}
</style>

<template>
  <RouterLink to="/bot" class="back-link">← BOT个人首页</RouterLink>

  <div class="page-card">
    <h1 class="page-title">管理页面</h1>

    <!-- 标签切换 -->
    <div class="tab-bar">
      <button :class="['tab-btn', activeTab === 'managers' ? 'tab-btn-active' : '']" @click="switchTab('managers')">管理者列表</button>
      <button :class="['tab-btn', activeTab === 'groups' ? 'tab-btn-active' : '']" @click="switchTab('groups')">群列表开关</button>
      <button :class="['tab-btn', activeTab === 'friends' ? 'tab-btn-active' : '']" @click="switchTab('friends')">好友列表开关</button>
    </div>

    <!-- 管理者列表 -->
    <div v-if="activeTab === 'managers'">
      <div class="info-bar">此管理可进行 开关控制 词管理和复述</div>
      <div class="search-row">
        <input type="text" v-model="newManagerId" placeholder="输入QQ号">
        <button class="action-btn action-btn-primary" @click="madd()">添加</button>
      </div>
      <div v-for="e in list" :key="e.targetId" class="manager-item">
        <img class="manager-avatar" :src="'https://q1.qlogo.cn/g?b=qq&nk='+e.targetId+'&s=640'" alt="头像">
        <span class="manager-name">{{ e.targetId }}</span>
        <button class="action-btn action-btn-danger" @click="del(e.targetId)">删除</button>
      </div>
    </div>

    <!-- 群列表开关 -->
    <div v-if="activeTab === 'groups'">
      <div class="info-bar">
        按钮依次为 <strong style="color:#16a34a">API调用</strong> ·
        <strong style="color:#15803d">撤回监听</strong> ·
        <strong style="color:#ca8a04">被动回复</strong> ·
        <strong style="color:#2563eb">内置功能</strong> 的控制开关，红色=已关闭，默认开启
      </div>
      <div class="search-row">
        <input type="text" v-model="gSearch" placeholder="检索群..." @input="filterGroups">
      </div>
      <div class="contact-grid">
        <div v-for="e in glist" :key="e.tid" class="contact-card">
          <img class="contact-avatar" :src="e.icon" alt="头像">
          <div class="contact-name">{{ e.name }}</div>
          <div class="toggle-group">
            <button :class="['toggle-btn', e.k0 ? 'toggle-btn-on' : 'toggle-btn-off']" @click="gm0(e.tid)" title="API调用开关">
              {{ e.k0 ? 'API开' : 'API关' }}
            </button>
            <button :class="['toggle-btn', e.k1 ? 'toggle-btn-on' : 'toggle-btn-off']" @click="gm1(e.tid)" title="撤回监听开关">
              {{ e.k1 ? '监开' : '监关' }}
            </button>
            <button :class="['toggle-btn', e.k2 ? 'toggle-btn-on' : 'toggle-btn-off']" @click="gm2(e.tid)" title="被动回复开关">
              {{ e.k2 ? '复开' : '复关' }}
            </button>
            <button :class="['toggle-btn', e.k3 ? 'toggle-btn-on' : 'toggle-btn-off']" @click="gm3(e.tid)" title="内置功能开关">
              {{ e.k3 ? '内开' : '内关' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 好友列表开关 -->
    <div v-if="activeTab === 'friends'">
      <div class="info-bar">
        按钮依次为 <strong style="color:#16a34a">API调用</strong> ·
        <strong style="color:#15803d">撤回监听</strong> ·
        <strong style="color:#ca8a04">被动回复</strong> ·
        <strong style="color:#2563eb">内置功能</strong> 的控制开关，红色=已关闭，默认开启
      </div>
      <div class="search-row">
        <input type="text" v-model="fSearch" placeholder="检索好友..." @input="filterFriends">
      </div>
      <div class="contact-grid">
        <div v-for="e in flist" :key="e.tid" class="contact-card">
          <img class="contact-avatar" :src="e.icon" alt="头像">
          <div class="contact-name">{{ e.name }}</div>
          <div class="toggle-group">
            <button :class="['toggle-btn', e.k0 ? 'toggle-btn-on' : 'toggle-btn-off']" @click="gm0(e.tid)" title="API调用开关">
              {{ e.k0 ? 'API开' : 'API关' }}
            </button>
            <button :class="['toggle-btn', e.k1 ? 'toggle-btn-on' : 'toggle-btn-off']" @click="gm1(e.tid)" title="撤回监听开关">
              {{ e.k1 ? '监开' : '监关' }}
            </button>
            <button :class="['toggle-btn', e.k2 ? 'toggle-btn-on' : 'toggle-btn-off']" @click="gm2(e.tid)" title="被动回复开关">
              {{ e.k2 ? '复开' : '复关' }}
            </button>
            <button :class="['toggle-btn', e.k3 ? 'toggle-btn-on' : 'toggle-btn-off']" @click="gm3(e.tid)" title="内置功能开关">
              {{ e.k3 ? '内开' : '内关' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "@/axios_in";

/** 当前激活的标签页 */
const activeTab = ref<'managers' | 'groups' | 'friends'>('managers')

/** 管理员列表 */
let list = ref<any[]>([])
let newManagerId = ref('')

/** 群列表 */
let glist = ref<any[]>([])
let oGlist = ref<any[]>([])
let gSearch = ref('')

/** 好友列表 */
let flist = ref<any[]>([])
let oFlist = ref<any[]>([])
let fSearch = ref('')

onMounted(() => {
  loadManagers()
})

/**
 * 切换标签页并加载对应数据
 * @param tab 目标标签
 */
function switchTab(tab: 'managers' | 'groups' | 'friends') {
  activeTab.value = tab
  if (tab === 'managers') loadManagers()
  else if (tab === 'groups') loadGroups()
  else if (tab === 'friends') loadFriends()
}

function loadManagers() {
  axios.get("/api/mlist").then(function (response) {
    list.value = response.data;
  }).catch(function (err) { alert(err); });
}

function loadGroups() {
  axios.get("/api/glist").then(function (response) {
    glist.value = response.data
    oGlist.value = response.data
  }).catch(function (err) { alert(err); });
}

function loadFriends() {
  axios.get("/api/flist").then(function (response) {
    flist.value = response.data
    oFlist.value = response.data
  }).catch(function (err) { alert(err); });
}

/** 添加管理员 */
function madd() {
  let id = newManagerId.value;
  axios.get("/api/m_add?id=" + id).then(function (response) {
    if (response.data === true) {
      list.value.splice(0, 0, {"qid": 0, "targetId": id})
      newManagerId.value = ''
    }
  }).catch(function (err) { alert(err); })
}

/**
 * 删除管理员
 * @param id 管理员QQ号
 */
function del(id: string) {
  axios.get("/api/mdel?id=" + id).then(function () {
    loadManagers()
  }).catch(function (err) { alert(err); })
}

/** 群列表搜索过滤 */
function filterGroups() {
  let s = gSearch.value
  if (s === "") {
    glist.value = [...oGlist.value]
  } else {
    glist.value = oGlist.value.filter((element: any) => {
      return (element.tid.toString() + element.name).includes(s)
    });
  }
}

/** 好友列表搜索过滤 */
function filterFriends() {
  let s = fSearch.value
  if (s === "") {
    flist.value = [...oFlist.value]
  } else {
    flist.value = oFlist.value.filter((element: any) => {
      return (element.tid.toString() + element.name).includes(s)
    });
  }
}

/** 以下为4个开关切换函数，tid为目标ID */
function gm0(tid: number) {
  axios.get("/api/gc0?tid=" + tid).then(function (response) {
    if (response.data === true) {
      glist.value.forEach((e: any) => { if (e.tid === tid) e.k0 = !e.k0; })
    }
  }).catch(function (err) { alert(err); })
}
function gm1(tid: number) {
  axios.get("/api/gc1?tid=" + tid).then(function (response) {
    if (response.data === true) {
      glist.value.forEach((e: any) => { if (e.tid === tid) e.k1 = !e.k1; })
    }
  }).catch(function (err) { alert(err); })
}
function gm2(tid: number) {
  axios.get("/api/gc2?tid=" + tid).then(function (response) {
    if (response.data === true) {
      glist.value.forEach((e: any) => { if (e.tid === tid) e.k2 = !e.k2; })
    }
  }).catch(function (err) { alert(err); })
}
function gm3(tid: number) {
  axios.get("/api/gc3?tid=" + tid).then(function (response) {
    if (response.data === true) {
      glist.value.forEach((e: any) => { if (e.tid === tid) e.k3 = !e.k3; })
    }
  }).catch(function (err) { alert(err); })
}
</script>
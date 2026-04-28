<style scoped>
.v11-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.v11-card {
  padding: 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.06);
}
.v11-card-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: #0f172a;
  margin-bottom: 0.5rem;
  text-align: center;
}
.v11-card-sub {
  font-size: 0.78rem;
  color: #94a3b8;
  margin-bottom: 0.4rem;
}
.v11-btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;
  margin-top: 0.5rem;
}
.v11-textarea {
  width: 100%;
  min-height: 60px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 10px;
  padding: 0.5rem;
  font-size: 0.85rem;
  background: rgba(255, 255, 255, 0.9);
  color: #0f172a;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
}
.v11-textarea:focus { border-color: rgba(37, 99, 235, 0.35); }
.evl-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.5rem;
}
.evl-btn {
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.group-check-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(15, 23, 42, 0.04);
}
.group-check-item img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}
</style>

<template>

  <div class="page-card">
    <h1 class="page-title">V11配置</h1>
    <div class="info-bar" style="background:rgba(220,38,38,0.08);border-color:rgba(220,38,38,0.15);color:#b91c1c">
      此页功能取决于登录协议，可能尚未支持
    </div>

    <div class="v11-grid">
      <!-- 自动回赞 -->
      <div class="v11-card">
        <div class="v11-card-title">自动回赞</div>
        <div class="v11-btn-row">
          <button :class="['toggle-btn', data.autoLike ? 'toggle-btn-on' : 'toggle-btn-off']"
                  @click="modify('autoLike', !data.autoLike)">
            {{ data.autoLike ? '当前开启' : '当前关闭' }}
          </button>
          <button :class="['toggle-btn', data.needMaxLike ? 'toggle-btn-on' : 'toggle-btn-off']"
                  @click="modify('needMaxLike', !data.needMaxLike)">
            {{ data.needMaxLike ? '点满回赞' : '不满也回赞' }}
          </button>
          <button class="action-btn action-btn-primary" @click="adn()">立刻执行</button>
        </div>
        <hr style="margin:0.5rem 0">
        <div class="v11-card-title">自动点赞昨日</div>
        <div class="v11-btn-row">
          <button :class="['toggle-btn', data.autoLikeYesterday ? 'toggle-btn-on' : 'toggle-btn-off']"
                  @click="modify('autoLikeYesterday', !data.autoLikeYesterday)">
            {{ data.autoLikeYesterday ? '当前开启' : '当前关闭' }}
          </button>
          <button class="action-btn action-btn-primary" @click="ydn()">立刻执行</button>
        </div>
      </div>

      <!-- 黑名单 -->
      <div class="v11-card">
        <div class="v11-card-title">黑名单设置</div>
        <div class="v11-card-sub">设置后即使黑名单用户点赞，也不回赞</div>
        <textarea class="v11-textarea" v-model="data.likeBlack" placeholder="用英文分号(;)分隔QQ号"></textarea>
        <div class="v11-btn-row">
          <button class="action-btn action-btn-outline" @click="modify('likeBlack', data.likeBlack)">应用设置</button>
        </div>
      </div>

      <!-- 白名单 -->
      <div class="v11-card">
        <div class="v11-card-title">白名单设置</div>
        <div class="v11-card-sub">设置后即使白名单用户不点赞，也回赞</div>
        <textarea class="v11-textarea" v-model="data.likeWhite" placeholder="用英文分号(;)分隔QQ号"></textarea>
        <div class="v11-btn-row">
          <button class="action-btn action-btn-outline" @click="modify('likeWhite', data.likeWhite)">应用设置</button>
        </div>
      </div>
    </div>

    <!-- 自动打卡群 -->
    <div class="v11-card" style="margin-bottom:0.75rem">
      <div class="v11-card-title">自动打卡群设置</div>
      <div class="v11-card-sub">用英文分号(;)分隔群聊ID · 若设置过多则会产生延迟</div>
      <textarea class="v11-textarea" v-model="data.signGroups" placeholder="用英文分号(;)分隔群聊ID"></textarea>
      <div class="v11-btn-row">
        <button class="action-btn action-btn-outline" @click="modify('signGroups', data.signGroups)">应用设置</button>
        <button class="action-btn action-btn-success" @click="showGroupModal=true">便捷设置</button>
        <button class="action-btn action-btn-primary" @click="sgn()">立刻执行</button>
      </div>
    </div>

    <!-- 空间功能 -->
    <div class="v11-card">
      <div class="v11-card-title">空间自动点赞</div>
      <div class="v11-btn-row" style="margin-bottom:0.5rem">
        <button :class="['toggle-btn', data.autoZoneLike ? 'toggle-btn-on' : 'toggle-btn-off']"
                @click="modify('autoZoneLike', !data.autoZoneLike)">
          {{ data.autoZoneLike ? '当前开启' : '当前关闭' }}
        </button>
      </div>

      <div class="v11-card-title" style="font-size:0.88rem;margin-top:0.5rem">自动评论空间</div>
      <textarea class="v11-textarea" v-model="data.zoneComment" placeholder="评论文本"></textarea>
      <div class="v11-btn-row">
        <button class="action-btn action-btn-outline" @click="modify('zoneComment', data.zoneComment)">应用设置</button>
        <button class="action-btn action-btn-success" @click="showEvlModal=true">频率设置</button>
      </div>

      <hr style="margin:0.5rem 0">

      <div class="v11-card-title" style="font-size:0.88rem">自动空间访问</div>
      <textarea class="v11-textarea" v-model="data.zoneWalks" placeholder="要访问的QQ号以;分割"></textarea>
      <div class="v11-btn-row">
        <button class="action-btn action-btn-outline" @click="modify('zoneWalks', data.zoneWalks)">应用设置</button>
      </div>
    </div>
  </div>

  <!-- 群打卡便捷设置弹窗 -->
  <div v-if="showGroupModal" class="modal-mask" @click.self="showGroupModal=false">
    <div class="modal-card modal-card-lg">
      <div class="modal-card-header">
        <span class="modal-card-title">群打卡设置</span>
        <button class="modal-card-close" @click="showGroupModal=false">✕</button>
      </div>
      <div class="modal-card-body">
        <div v-for="e in groupInfos" :key="e.id" class="group-check-item">
          <input type="checkbox" :value="e.id" v-model="checkedGroupIds">
          <img :src="e.icon" alt="头像">
          <span style="flex:1;font-weight:600;font-size:0.88rem;color:#0f172a">{{ e.name }}</span>
          <span style="font-size:0.78rem;color:#94a3b8">{{ e.id }}</span>
        </div>
      </div>
      <div class="modal-card-footer">
        <button class="action-btn action-btn-outline" @click="showGroupModal=false">关闭</button>
        <button class="action-btn action-btn-primary" @click="saveGsign">保存设置</button>
      </div>
    </div>
  </div>

  <!-- 频率设置弹窗 -->
  <div v-if="showEvlModal" class="modal-mask" @click.self="showEvlModal=false">
    <div class="modal-card">
      <div class="modal-card-header">
        <span class="modal-card-title">空间访问频率设置</span>
        <button class="modal-card-close" @click="showEvlModal=false">✕</button>
      </div>
      <div class="modal-card-body">
        <div class="v11-card-sub">频率 1-10 分钟/次，越快越及时，过快有封号风险</div>
        <div style="margin:0.5rem 0;font-weight:600;color:#0f172a">当前频率: {{ data.zoneEvl }} 分钟/次</div>
        <div class="evl-grid">
          <button v-for="v in [1,2,3,4,5,6,7,8,9,10,20,30]" :key="v"
                  class="evl-btn" :style="v === data.zoneEvl ? 'background:rgba(37,99,235,0.12);border-color:rgba(37,99,235,0.3);color:#2563eb' : ''"
                  @click="modify('zoneEvl', v); showEvlModal=false">{{ v }}</button>
        </div>
      </div>
      <div class="modal-card-footer">
        <button class="action-btn action-btn-outline" @click="showEvlModal=false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "@/axios_in";
import {onMounted, ref} from "vue";

/** V11配置数据 */
let data = ref({
  zoneEvl: 10,
  zoneComment: "",
  zoneWalks: "",
  signGroups: "",
  likeBlack: "",
  likeWhite: "",
  autoLike: false,
  needMaxLike: false,
  autoLikeYesterday: false,
  autoZoneLike: false
})

/** 群组信息列表 */
let groupInfos = ref<{id: number, name: string, icon: string}[]>([])

/** 弹窗控制 */
const showGroupModal = ref(false)
const showEvlModal = ref(false)

/** 群打卡选中的ID列表 */
const checkedGroupIds = ref<number[]>([])

onMounted(() => {
  axios.get("/api/v11/get-conf").then(function (response) {
    data.value = response.data;
  }).catch(function (err) {
    alert(err);
  })
  axios.get("/api/v11/getGroups").then(function (response) {
    groupInfos.value = response.data;
  }).catch(function (err) {
    alert(err);
  })
})

/**
 * 修改V11配置项
 * @param key 配置键名
 * @param value 配置值
 */
function modify(key: string, value: any) {
  axios.get("/api/v11/modify-conf?key=" + key + "&value=" + value).then(function (response) {
    data.value = response.data;
    alert("修改成功")
  }).catch(function (err) {
    alert(err);
  })
}

/** 保存群打卡设置 */
function saveGsign() {
  // 将选中的群组ID用分号连接
  data.value.signGroups = checkedGroupIds.value.join(';');
  showGroupModal.value = false
  modify('signGroups', data.value.signGroups)
}

/** 立刻执行昨日点赞 */
function ydn() {
  axios.get("/api/v11/autoLikeYesterdayNow").then(function (response) {
    alert(response.data)
  }).catch(function (err) {
    alert(err);
  })
}

/** 立刻执行自动点赞 */
function adn() {
  axios.get("/api/v11/autoLikeNow").then(function (response) {
    alert(response.data)
  }).catch(function (err) {
    alert(err);
  })
}

/** 立刻执行群打卡 */
function sgn() {
  axios.get("/api/v11/signGroupNow").then(function (response) {
    alert(response.data)
  }).catch(function (err) {
    alert(err);
  })
}
</script>
<style>

</style>

<template>
  <center style="color: rgba(255,79,152,0.97);"><h1> Bot代挂信息 个人中心 </h1></center>
  <div class="container" style="margin-top: 45px">
    <div class="row" style="margin-bottom: 25px;">
      <div class="col-2"></div>
      <div style="border-radius: 25px;background-color: rgba(86,117,105,0.4);text-align: center;" class="col-8">
        <br>
        <img style="max-width: 75px" :src="user.icon" alt="icon">
        <br>
        <br>
        <div class="media-body">
          <br>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">QQ</span>
            </div>
            <input type="text" aria-label="name" class="form-control" :value="user.qid">
          </div>
          <br>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">昵称</span>
            </div>
            <input type="text" aria-label="name" class="form-control" :value="user.nickname">
          </div>
          <br>
          <div class="input-group form-inline justify-content-center">
            <div class="alert alert-secondary" role="alert">
              代挂剩余时间:
              <div :class="'form-group mx-sm-5 mb-2 '+ je0(user.expire)">{{ je(user.expire) }}</div>
            </div> &nbsp;&nbsp;
            <div class="alert alert-secondary" role="alert">
              自上次登录已在线时长:
              <div :class="'form-group mx-sm-5 mb-2 '+ ji0(user.t0)">{{ formatMsgTime1(user.t0, "未在线") }}
              </div>
            </div>
          </div>
          <br>
          <hr>
          <div class="alert alert-info" role="alert">
            <RouterLink to="/conf" type="button" class="btn btn-outline-info">配置中心</RouterLink>
          </div>
          <hr>
          <div class="input-group form-inline">

            <div class="alert alert-info" role="alert">
              管理员数: {{ count.mc }} &nbsp;
              <RouterLink to="/manager" type="button" class="btn btn-info">管理</RouterLink>
            </div>
            &nbsp;&nbsp;
            <div class="alert alert-secondary" role="alert">
              定时任务数: {{ count.cc }} &nbsp;
              <RouterLink to="/cron-list" type="button" class="btn btn-secondary">管理</RouterLink>
            </div> &nbsp;&nbsp;

            <div class="alert alert-warning" role="alert">
              被动消息数: {{ count.pc }} &nbsp;
              <RouterLink to="/passive" type="button" class="btn btn-warning">管理</RouterLink>
            </div>

            <div class="alert alert-primary" role="alert">
              调用api数: {{ count.cac }} &nbsp;
              <RouterLink to="/callapi" type="button" class="btn btn-light">管理</RouterLink>
            </div>&nbsp;&nbsp;

            <div class="alert alert-success" role="alert">
              内置扩展
              <RouterLink to="/optsv" type="button" class="btn btn-success">可选功能</RouterLink>
            </div>&nbsp;&nbsp;

            <div class="alert alert-dark" role="alert">
              v11功能
              <RouterLink to="/v11c" type="button" class="btn btn-dark">管理</RouterLink>
            </div> &nbsp;&nbsp;


          </div>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "@/axios_in";

import {formatMsgTime1} from "@/assets/utils";

let user = ref({t0: -1, expire: -1, nickname: "", qid: "", icon: ""})

let count = ref({mc: 0, cc: 0, pc: 0, cac: 0})

onMounted(() => {

  axios.get('/api/user').then(response => {
    user.value = response.data
    if (user.value.t0 > 0) {
      setInterval(function () {
        user.value.t0++;
      }, 1000)
    }
  })
  axios.get('/api/statistics').then(response => {
    count.value = response.data
  })
})

function je(t: number) {
  let dateTime = new Date(t)
  let nowTime = new Date()
  if (nowTime.getTime() > dateTime.getTime()) {
    return "已过期"
  } else {
    let year = dateTime.getFullYear()
    let month = dateTime.getMonth() + 1
    let day = dateTime.getDate()
    return "至" + year + "-" + month + "-" + day
  }
}

function je0(t: number) {
  let dateTime = new Date(t)
  let nowTime = new Date()
  if (nowTime.getTime() > dateTime.getTime()) {
    return "alert alert-danger"
  } else {
    return "alert alert-success"
  }
}

function ji0(t: number) {
  if (t <= 0) {
    return "alert alert-danger"
  } else {
    return "alert alert-success"
  }
}

</script>
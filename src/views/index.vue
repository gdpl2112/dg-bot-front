<style>

</style>

<template>
  <div class="tm-1 jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">QQ代挂系统</h1><br>
      <p class="lead">支持 撤回监听/自动续火/被动续火/定时消息发送/自定义功能调用 等功能</p>
      <p class="lead">稳定在线! 后台管理功能全面</p>
      <p class="lead">TIPS: 所有QQ代挂,即利用程序登录qq账号来达到各种想要的效果,自设置的回复,定时发送消息等等...</p>
    </div>
  </div>
  <br>
  <br>
  <div class="container tm-0">
    <div class="row">
      <p class="col" style="color: rgb(235,253,192);background-color: rgba(171,171,163,0.56);border-radius: 5px"
         role="alert">
        按月续租. 新开月租仅1元/月
      </p>
    </div>
  </div>
  <br>
  <br>
  <div class="container tm-0">
    <div class="row">
      <div class="col align-self-center">
        <RouterLink to="/join" type="button" class="btn btn-lg btn-block btn-outline-success">现在开始
        </RouterLink>
      </div>
    </div>
  </div>
  <br>
  <div class="container tm-0">
    <div class="row">
      <div class="col align-self-center">
        <RouterLink to="/login" type="button" class="btn btn-lg btn-block btn-outline-success">个人信息</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router'
</script>
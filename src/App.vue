<script setup lang="ts">
import {RouterView} from 'vue-router'
import router from "@/router";
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light tm-0" style="border-radius: 10px">
    <a class="navbar-brand" @click="router.push('/')">
      <img style="opacity: 0.86;max-width: 50px; border-radius: 999px"
           class="navbar-brand" src="http://kloping.top/icon.jpg" alt="qq"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" @click="router.push('/')">首页<span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://kloping.top/">博客</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="router.push('/join')">请求帮助</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">更多功能;敬请期待.</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <a class="dropdown-item" target="_blank" href="https://github.com/gdpl2112/dg-bot">
          <img style="opacity: 0.86;max-width: 35px" alt="github" loading="lazy"
               src="https://s.nmxc.ltd/sakurairo_vision/@2.6/display_icon/sora/github.png">
          github 开源地址
        </a>
      </form>
    </div>
  </nav>
  <br>
  <br>
  <br>

  <RouterView/>

  <br>
  <hr>
  <center>
    <div id="footer0">
      <center>power by github@<b>kloping</b> use vue3</center>
      <center>update time on <strong>25/08/25</strong></center>
    </div>
  </center>
  <hr>
  <br>
</template>

<style scoped>
#footer0 {
  background-color: rgba(221, 221, 221, 0.6);
  width: 70%;
  border-radius: 33px;
  color: black;
}
</style>

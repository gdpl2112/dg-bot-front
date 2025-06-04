<style>

</style>

<template>
  <center>
    <RouterLink style="width: 50%" to="/bot" type="button" class="btn btn-lg btn-block btn-outline-success">返回个人首页
    </RouterLink>
  </center>
  <hr>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <button id="b2" class="nav-link">cron任务列表</button>
          </li>
        </ul>
        <div>
          <br>
          <div id="c-div">
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="input-group mb-3">
                  <RouterLink to="/cron" type="button" class="btn btn-primary btn-lg btn-block">添加</RouterLink>
                </div>
              </li>
              <li v-for="(e,i) in arr1"
                  class="list-group-item d-flex justify-content-between align-items-center">
                <img :src="e.icon" style="width: 45px"
                     class=" img-thumbnail rounded float-left">
                {{ e.desc }} 发送
                <span class="badge badge-pill">
                               {{ e.msg }}
                            </span>
                到
                <span class="badge badge-pill">
                               {{ e.targetId }}
                            </span>
                <span class="badge badge-pill">
                                <button v-on:click="del(e.id)" type="button" class="btn btn-danger">删除</button>
                            </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import {onMounted, ref} from "vue";
import axios from "axios";
import {RouterLink} from "vue-router";

let arr1 = ref([])

onMounted(()=>{
  axios.get("/cron-list").then(function (response) {
    arr1.value = response.data
  }).catch(function (err) {
    alert(err);
  })
})

function del(id) {
  axios.get("/cron-del?id=" + id).then(function (response) {
    arr1.value = response.data;
  }).catch(function (err) {
    alert(err);
  })
}
</script>
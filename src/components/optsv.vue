<style>

</style>

<template>
  <center>
    <RouterLink style="width: 50%" to="/bot" type="button" class="btn btn-lg btn-block btn-outline-success">返回个人首页
    </RouterLink>
  </center>
  <hr>
  <div class="container bg-light">
    <div class="row">
      <div class="col-12 center-block" id="table_main">
        <small class="form-text text-muted"> 与API调用 共用开关 </small>
        <div class="container">
          <hr>
          <div class="row ">
            <div class="col-8">
              <ul class="list-group">
                <li aria-disabled="true" class="list-group-item disabled">功能ID</li>
                <li aria-disabled="true" class="list-group-item disabled">功能名字</li>
                <li aria-disabled="true" class="list-group-item disabled">描述</li>
              </ul>
            </div>
            <div class="col-4">操作 开关 (当前状态)</div>
          </div>
          <div :class="getTrClass()+' row'" style="margin-top: 15px;padding-bottom: 10px;padding-top: 10px"
               v-for="e in data">
            <div class="col-8">
              <ul class="list-group">
                <li class="list-group-item" style="overflow:scroll;">{{e.opt}}</li>
                <li class="list-group-item" >{{e.name}}</li>
                <li class="list-group-item" style="overflow:scroll;">{{e.desc}}</li>
              </ul>
            </div>
            <div class="col-4">
              <div class="custom-control custom-switch">
                <button v-on:click="toggle(e.opt)" type="button" :class="'btn btn-' + (e.open ? 'success' : 'danger')">
                  {{ (e.open ? '开启' : '关闭') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">

import axios from "axios";
import {onMounted, ref} from "vue";
import {RouterLink} from "vue-router";

let data = ref([])
onMounted(()=>{
  axios.get("/opts").then(function (response) {
    data.value = response.data;
  }).catch(function (err) {
    alert(err);
  })
})
function getTrClass() {
  return 'alert-info'
}

function toggle(opt) {
  axios.get("/opts/toggle?opt=" + opt).then(function (response) {
    data.value = response.data
  }).catch(function (err) {
    alert(err);
  })
}
</script>
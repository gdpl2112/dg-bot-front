<style>

</style>

<template>

  <div class="modal fade" id="appendModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">添加一个API</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="关闭" @click="$('#appendModal').modal('hide')">X</button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-out">输出格式</span>
            <input type="text" class="form-control" aria-label="Sizing example input">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-outArgs">输出参数</span>
            <input placeholder="用,分割参数(英文" type="text" class="form-control"
                   aria-label="Sizing example input">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-touch">触发词</span>
            <input type="text" class="form-control" aria-label="Sizing example input">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-url">网址</span>
            <input type="text" class="form-control" aria-label="Sizing example input">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-jude">否条件</span>
            <input type="text" class="form-control" aria-label="Sizing example input">
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                  @click="$('#appendModal').modal('hide')">关闭
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="submit0()">确定</button>
        </div>
      </div>
    </div>
  </div>
  <br>

  <div class="container">
    <div class="row-12">
      <div class="center-block">
        <div style="text-align: center;">
          <button @click="add0()" type="button" class="btn btn-primary btn-lg btn-block" data-bs-toggle="modal">
            添加
          </button>
        </div>
        <br>
        <hr>
      </div>
    </div>
  </div>

  <div class="container bg-light">
    <div class="row">
      <div id="table_main" class="center-block col-12">
        <small class="form-text text-muted">tips: 参考 https://github.com/gdpl2112/MiraiCallApiPlugin</small>
        <div class="container">
          <hr>
          <div class="row ">
            <div class="col-8">
              <ul class="list-group">
                <li class="list-group-item disabled" aria-disabled="true">输出格式</li>
                <li class="list-group-item disabled" aria-disabled="true">输出参数</li>
                <li class="list-group-item disabled" aria-disabled="true">触发词</li>
                <li class="list-group-item disabled" aria-disabled="true">地址</li>
                <li class="list-group-item disabled" aria-disabled="true">不输出条件</li>
              </ul>
            </div>
            <div class="col-4">操作</div>
          </div>
          <div v-for="(e) in data" :class="getTrClass()+' row'"
               style="margin-top: 15px;padding-bottom: 10px;padding-top: 10px">
            <div class="col-8">
              <ul class="list-group">
                <li class="list-group-item" style="overflow:scroll;">{{ e.out }}</li>
                <li class="list-group-item">{{ getStrArgs(e.outArgs) }}</li>
                <li class="list-group-item">{{ e.touch }}</li>
                <li class="list-group-item" style="overflow:scroll;">{{ e.url }}</li>
                <li class="list-group-item" style="overflow:scroll;">{{ e.jude }}</li>
              </ul>
            </div>
            <div class="col-4">
              <img class="rounded img-fluid img-responsive" :src="getFavicon(e)" style="max-width: 90px">
              <hr>
              <button v-on:click="delete0(e.touch)" type="button" class="btn btn-danger col">删除</button>
              <hr>
              <button v-on:click="modify0(e)" type="button" class="btn btn-primary col">修改</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import $ from 'jquery'
import axios from "axios";
import {onMounted, ref} from "vue";


function submit0() {
  let e_out = $("#inputGroup-out").next();
  let e_outArgs = $("#inputGroup-outArgs").next();
  let e_touch = $("#inputGroup-touch").next();
  let e_url = $("#inputGroup-url").next();
  let e_jude = $("#inputGroup-jude").next();

  let v1 = encodeURIComponent(e_out.val())
  let v2 = encodeURIComponent(e_outArgs.val())
  let v3 = encodeURIComponent(e_touch.val())
  let v4 = encodeURIComponent(e_url.val())
  let v5 = encodeURIComponent(e_jude.val())
  let url = "/ca/append?out=" + v1
      + "&outArgs=" + v2
      + "&touch=" + v3
      + "&url=" + v4
      + "&jude=" + v5;

  axios.post(url).then(function (response) {
    trIndex = 0;
    data.value = response.data;
    e_out.val("")
    e_outArgs.val("")
    e_touch.val("")
    e_url.val("")
    e_jude.val("")
  }).catch(function (err) {
    alert(err);
  })
}

function add0() {
  $('#exampleModalLabel').html('添加一个API');
  $('#appendModal').modal('show')
  let e_out = $("#inputGroup-out").next();
  let e_outArgs = $("#inputGroup-outArgs").next();
  let e_touch = $("#inputGroup-touch").next();
  let e_url = $("#inputGroup-url").next();
  let e_jude = $("#inputGroup-jude").next();

  e_out.val("")
  e_outArgs.val("")
  e_touch.val("")
  e_url.val("")
  e_jude.val("")
}

let trClasses = ["alert-primary", "alert-secondary", "alert-success", "alert-danger", "alert-warning", "alert-info", "alert-light", "alert-dark"];
let trIndex = 0

let data = ref([])

onMounted(() => {
  axios.get("/ca/get_data").then(function (response) {
    trIndex = 0;
    data.value = response.data;
  }).catch(function (err) {
    alert(err);
  })
})

function getFavicon(e) {
  let u0 = e.url;
  let i0 = u0.substr(8).indexOf("/")
  return u0.substr(0, 9 + i0) + "favicon.ico"
}

function delete0(touch) {
  axios.get("/ca/delete?touch=" + touch).then(function (response) {
    trIndex = 0;
    data.value = response.data;
  }).catch(function (err) {
    alert(err);
  })
}

function modify0(e) {
  let e_out = $("#inputGroup-out").next();
  let e_outArgs = $("#inputGroup-outArgs").next();
  let e_touch = $("#inputGroup-touch").next();
  let e_url = $("#inputGroup-url").next();
  let e_jude = $("#inputGroup-jude").next();

  e_out.val(e.out)
  e_outArgs.val(e.outArgs)
  e_touch.val(e.touch)
  e_url.val(e.url)
  e_jude.val(e.jude)
  $('#exampleModalLabel').html('修改一个API');
  $('#appendModal').modal('show')
}

function getTrClass() {
  return trClasses[trIndex++ % trClasses.length].toString()
}

function getStrArgs(args) {
  let out = "";
  args.split(",").forEach(function (e) {
    out = out + e + "\n";
  })
  return out.trim()
}

</script>
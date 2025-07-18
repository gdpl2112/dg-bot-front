<style>

</style>

<template>
  <center>
    <RouterLink style="width: 50%" to="/bot" type="button" class="btn btn-lg btn-block btn-outline-success">返回个人首页
    </RouterLink>
  </center>
  <hr>
  <center style="color: rgba(33,151,252,0.95);"><h1> Bot代挂 配置中心 </h1></center>
  <div class="container" id="main">
    <div class="">
      <div class="row">
        <div class="input-group col-sm mb-3">
          <label for="cd0">
            <div class="input-group-prepend">
              <span class="input-group-text">回复cd(单位/秒):</span>
            </div>
          </label>
          <input id="cd0" type="number" min="1" class="form-control"/>
          <button v-on:click="modify('cd0')" type="button" class="btn btn-outline-primary">修改</button>
        </div>
        <div class="input-group col-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">复述前置:</span>
          </div>
          <input id="retell" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('retell')" type="button" class="btn btn-outline-primary">修改
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="input-group col-sm  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">回复开启:</span>
          </div>
          <input id="open0" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('open0')" type="button" class="btn btn-outline-primary">修改</button>
          </div>
        </div>
        <div class="input-group col-sm  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">回复关闭:</span>
          </div>
          <input id="close0" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('close0')" type="button" class="btn btn-outline-primary">修改
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="input-group col-sm  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">调用开启:</span>
          </div>
          <input id="open0" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('open0')" type="button" class="btn btn-outline-primary">修改</button>
          </div>
        </div>
        <div class="input-group col-sm  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">调用关闭:</span>
          </div>
          <input id="close0" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('close0')" type="button" class="btn btn-outline-primary">修改
            </button>
          </div>
        </div>
        <small class="form-text text-muted">纯数字为好友f(id);g(id)为群聊;找不到时则发到自己bot</small>
        <div class="input-group col-sm  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">监听发送到:</span>
          </div>
          <input id="rsid" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('rsid')" type="button" class="btn btn-outline-primary">修改</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="input-group col-sm  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">回复添加:</span>
          </div>
          <input id="add0" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('add0')" type="button" class="btn btn-outline-primary">修改</button>
          </div>
        </div>
        <div class="input-group col-sm  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">取消添加回复:</span>
          </div>
          <input id="cancel0" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('cancel0')" type="button" class="btn btn-outline-primary">修改
            </button>
          </div>
        </div>
        <div class="input-group col-sm  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">查询回复:</span>
          </div>
          <input id="select0" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('select0')" type="button" class="btn btn-outline-primary">修改
            </button>
          </div>
        </div>
      </div>
      <hr>
      <small class="form-text text-muted">通知(当bot上线/离线是访问指定url)</small>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">通知:</span>
        </div>
        <input id="nu" type="text" class="form-control" aria-label="">
        <div class="input-group-append">
          <button v-on:click="modify('nu')" type="button" class="btn btn-outline-primary">修改</button>
        </div>
      </div>
      <div class="alert alert-info text-center" role="alert">
        自定义脚本 与API调用 共用开关
      </div>
      <button v-on:click="codePost('code')" type="button"
              class="btn btn-primary btn-lg btn-block">修改
      </button>
      <button v-on:click="getException()" type="button"
              class="btn btn-primary btn-lg btn-block">获取报错
      </button>
      <hr>
      <div class="input-group">
                <textarea style="height: 240px" id="code" class="form-control" aria-label="js 脚本"
                          placeholder="java script 自定义脚本">
                </textarea>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import axios from "axios";
import $ from 'jquery'
import {RouterLink} from "vue-router";
import {onMounted} from "vue";


onMounted(() => {
  axios.get("/config",).then(function (response) {
    let keys = Object.keys(response.data);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = response.data[key]
      $("#" + key).val(value)
    }
  }).catch(function (err) {
    alert(err);
  })
})

function modify(id) {
  let key = id;
  let value = $("#" + id).val()
  if (value.indexOf("&") >= 0) value = encodeURIComponent(value)
  axios.get("/conf-modify?key=" + key + "&value=" + value).then(function (response) {
    alert(response.data)
  }).catch(function (err) {
    alert(err);
  })
}

function codePost(id) {
  let value = $("#" + id).val()
  let df = new FormData()
  df.set("code", value)
  axios.post("/code-modify", df).then(function (response) {
    alert(response.data)
  }).catch(function (err) {
    alert(err);
  })
}

function getException() {
  axios.get("/get-exception").then(function (response) {
    $("#moda-label").html("时间: " + formatMsgTime(response.data.time))
    $("#modal-body").html(response.data.msg.replaceAll("\r\n", "<br>").replaceAll("\t", "&nbsp;&nbsp;"))
    $('#modal-a').modal('show')
  }).catch(function (err) {
    alert(err);
  })
}

</script>
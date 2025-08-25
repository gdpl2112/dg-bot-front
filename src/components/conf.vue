<style>
#main {
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.73);
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>

<template>
  <center>
    <RouterLink style="width: 50%" to="/bot" type="button" class="btn btn-lg btn-block btn-outline-success">返回个人首页
    </RouterLink>
  </center>
  <hr>
  <div class="container" id="main">
    <center style="color: rgba(33,151,252,0.95);"><h1> Bot代挂 配置中心 </h1></center>
    <div class="" style="margin-top: 15px">
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
          <input id="open1" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('open1')" type="button" class="btn btn-outline-primary">修改</button>
          </div>
        </div>
        <div class="input-group col-sm  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">调用关闭:</span>
          </div>
          <input id="close1" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('close1')" type="button" class="btn btn-outline-primary">修改
            </button>
          </div>
        </div>
      </div>
      <small class="form-text text-muted">纯数字为好友f(id);g(id)为群聊;找不到时则发到自己bot</small>
      <div class="row">
        <div class="input-group col-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">监听发送到:</span>
          </div>
          <input id="rsid" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('rsid')" type="button" class="btn btn-outline-primary">修改</button>
          </div>
        </div>

        <div class="input-group col-sm  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">状态查看:</span>
          </div>
          <input id="status0" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('status0')" type="button" class="btn btn-outline-primary">修改</button>
          </div>
        </div>

      </div>

      <div class="row">
        <div class="input-group col-sm  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">添词:</span>
          </div>
          <input id="add0" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('add0')" type="button" class="btn btn-outline-primary">修改</button>
          </div>
        </div>
        <div class="input-group col-sm  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">添加时取消:</span>
          </div>
          <input id="cancel0" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('cancel0')" type="button" class="btn btn-outline-primary">修改
            </button>
          </div>
        </div>
        <div class="input-group col-sm  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">查词:</span>
          </div>
          <input id="select0" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('select0')" type="button" class="btn btn-outline-primary">修改
            </button>
          </div>
        </div>
        <div class="input-group col-sm  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">删词:</span>
          </div>
          <input id="del0" type="text" class="form-control" aria-label="">
          <div class="input-group-append">
            <button v-on:click="modify('del0')" type="button" class="btn btn-outline-primary">修改
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
        自定义脚本与[API调用]共用开关
      </div>

      <div style="width: 80%;margin-left: 10%;font-weight: bold;">
        <button v-on:click="codePost('code')" type="button"
                class="btn btn-outline-success btn-lg btn-block">修改
        </button>
        <button v-on:click="getException()" type="button"
                class="btn btn-primary btn-lg btn-block">获取报错
        </button>
        <button v-on:click="getLogMsg()" type="button"
                class="btn btn-secondary btn-lg btn-block">获得日志
        </button>
      </div>

      <hr>
      <center>
        <p style="background-color: rgba(204,204,204,0.34);width: 80%;border-radius: 10px">示例js代码 使用Java Nashorn引擎
          <a
              href="https://github.com/gdpl2112/dg-script">详见仓库</a>参考模版API</p>
      </center>
      <div class="input-group">
                <textarea style="height: 240px" id="code" class="form-control" aria-label="js 脚本"
                          placeholder="java script 自定义脚本">
                </textarea>
      </div>
    </div>
  </div>
  <br>
  <br>
  <div class="modal fade" id="modal-a" tabindex="-1" aria-labelledby="moda-label" aria-hidden="true"
       data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="moda-label">报错详情</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" @click="showLoging=false;"
                  aria-label="关闭"></button>
        </div>
        <div class="modal-body text-danger" id="modal_body">
          <samp id="modal-body">

          </samp>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                  @click="showLoging=false;ma0.modal('hide')">
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>
  <br>
</template>

<script setup lang="ts">

import axios from "@/axios_in";
import $ from 'jquery'
import {RouterLink} from "vue-router";
import {onMounted} from "vue";
import {formatMsgTime} from "@/assets/utils";

let ma0: any;
let mbody: any;
onMounted(() => {
  ma0 = $('#modal-a') as any;
  mbody = $("#modal-body");
  axios.get("/api/config",).then(function (response) {
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
  let value: string = $("#" + id).val() as string
  if (value.indexOf("&") >= 0) value = encodeURIComponent(value)
  axios.get("/api/conf-modify?key=" + key + "&value=" + value).then(function (response) {
    alert(response.data)
  }).catch(function (err) {
    alert(err);
  })
}

function codePost(id: string) {
  let value: string = $("#" + id).val() as string
  let df = new FormData()
  df.set("code", value)
  axios.post("/api/code-modify", df).then(function (response) {
    alert(response.data)
  }).catch(function (err) {
    alert(err);
  })
}

function getException() {
  axios.get("/api/get-exception").then(function (response) {
    $("#moda-label").html("时间: " + formatMsgTime(response.data.time))
    mbody.html(response.data.msg.replaceAll("\r\n", "<br>").replaceAll("\t", "&nbsp;&nbsp;"))
    $("#modal_body").addClass("text-danger")
    ma0.modal('show')
  }).catch(function (err) {
    alert(err);
  })
}

let showLoging = false
let hb = ""

setInterval(function () {
  if (showLoging) {
    hb = ""
    axios.get("/api/get-log").then(function (response) {
      response.data.forEach(function (value) {
        hb += ("<p>" + value + "</p>")
      })
      mbody.html(hb)
    })
  }
}, 3000);

function getLogMsg() {
  axios.get("/api/get-log").then(function (response) {

    $("#moda-label").html("日志信息 #脚本内使用log.log(str)可打印日志")

    hb = ""
    response.data.forEach(function (value) {
      hb += ("<p>" + value + "</p>")
    })
    mbody.html(hb)

    $("#modal_body").removeClass("text-danger")
    showLoging = true
    ma0.modal('show')
  }).catch(function (err) {
    alert(err);
  })
}

</script>
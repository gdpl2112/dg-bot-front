<style>

</style>

<template>
  <center>
    <RouterLink style="width: 50%" to="/bot" type="button" class="btn btn-lg btn-block btn-outline-success">返回个人首页
    </RouterLink>
    <RouterLink style="width: 50%" to="/cron-list" type="button" class="btn btn-lg btn-block btn-outline-success">返回定时任务
    </RouterLink>
  </center>
  <hr>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col align-self-center" style="background-color: rgba(169,196,208,0.5);border-radius: 10px">
        <center style="margin-top: 50px;color: rgba(213,97,118,0.95);"><h1> Cron任务添加 </h1></center>
        <form id="main-form">
          <div class="form-group flex-nowrap">
            <br>
            <hr>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="l1-type" id="week-type" value="week">
              <label class="form-check-label" for="week-type">
                星期
              </label>
              <div class="alert alert-secondary" role="alert">
                <div class="form-check form-check-inline">
                  <input name="week" class="form-check-input" type="checkbox" id="week1" value="1">
                  <label class="form-check-label" for="week1">星期一</label>
                </div>&nbsp;
                <div class="form-check form-check-inline">
                  <input name="week" class="form-check-input" type="checkbox" id="week2" value="2">
                  <label class="form-check-label" for="week2">星期二</label>
                </div>&nbsp;
                <div class="form-check form-check-inline">
                  <input name="week" class="form-check-input" type="checkbox" id="week3" value="3">
                  <label class="form-check-label" for="week3">星期三</label>
                </div> &nbsp;
                <div class="form-check form-check-inline">
                  <input name="week" class="form-check-input" type="checkbox" id="week4" value="4">
                  <label class="form-check-label" for="week4">星期四</label>
                </div> &nbsp;
                <div class="form-check form-check-inline">
                  <input name="week" class="form-check-input" type="checkbox" id="week5" value="5">
                  <label class="form-check-label" for="week5">星期五</label>
                </div>
                &nbsp;
                <div class="form-check form-check-inline">
                  <input name="week" class="form-check-input" type="checkbox" id="week6" value="6">
                  <label class="form-check-label" for="week6">星期六</label>
                </div>
                &nbsp;
                <div class="form-check form-check-inline">
                  <input name="week" class="form-check-input" type="checkbox" id="week7" value="7">
                  <label class="form-check-label" for="week7">星期日</label>
                </div>
              </div>
            </div>
            <hr>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="l1-type" id="md-type" value="month-day" checked>
              <label class="form-check-label" for="md-type">
                月/日
              </label>
              <div class="form-row">
                <div class="col">
                  <div class="form-check">
                    <!--指定 或 每 月/日-->
                    <input class="form-check-input" type="radio" name="for-month" id="md-p-eve-m"
                           value="eve">
                    <label class="form-check-label" for="md-p-eve-m">每月</label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-check">
                    <!--指定 或 每 月/日-->
                    <input class="form-check-input" type="radio" name="for-day" id="md-p-eve-d"
                           value="eve">
                    <label class="form-check-label" for="md-p-eve-d">每日</label>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-check">
                    <!--指定 或 每 月-->
                    <input class="form-check-input" type="radio" name="for-month" id="md-p-m"
                           value="point" checked>
                    <label class="form-check-label" for="md-p-m">指定月</label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-check">
                    <!--指定 或 每 日-->
                    <input class="form-check-input" type="radio" name="for-day" id="md-p-d"
                           value="point" checked>
                    <label class="form-check-label" for="md-p-d">指定日</label>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <select name="month" class="custom-select my-1 mr-sm-2" id="md-p-d-select">
                    <option v-for="e in months" :value="e">{{ e }}月</option>
                  </select>
                </div>
                <div class="col">
                  <select name="day" class="custom-select my-1 mr-sm-2">
                    <!--                                    <option selected>请选择天</option>-->
                    <option v-for="e in days" :value="e">{{ e }}日</option>
                  </select>
                </div>
              </div>
            </div>
            <hr>
            <div class="form-check">
              <label class="form-check-label">
                时/分
              </label>
              <div class="form-row">
                <div class="col">
                  <select name="hour" class="custom-select my-1 mr-sm-2">
                    <!--                                    <option selected>请选择时h</option>-->
                    <option v-for="e in hours" :value="e">{{ e }}点</option>
                  </select>
                </div>
                <div class="col">
                  <select name="mil" class="custom-select my-1 mr-sm-2">
                    <!--                                    <option selected>请选择分钟m</option>-->
                    <option v-for="e in mils" :value="e">{{ e }}分</option>
                  </select>
                </div>
              </div>
            </div>
            <hr>
            <div class="form-check">
              <label class="form-check-label" for="targetId">
                信息补充
              </label>
              <div class="form-row align-items-center">
                <div class="col">
                  <div class="input-group-prepend">
                    <select name="tid-type" class="input-group-text">
                      <option value="f" selected>好友</option>
                      <option value="g">群</option>
                    </select>
                    <input id="targetId" name="targetId" type="text" class="form-control"
                           placeholder="发送到tid">
                  </div>
                </div>
                <div class="col">
                  <div class="input-group-prepend">
                    <span class="input-group-text">内容</span>
                    <input type="text" class="form-control" placeholder="内容可为code" name="content">
                  </div>
                </div>
              </div>
            </div>
            <hr>
            <button type="button" class="btn btn-primary btn-lg  btn-block" v-on:click="submit0()">添加</button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {ref} from "vue";

import $ from 'jquery'
import axios from "axios";
import router from "@/router/index.js";
import {RouterLink} from "vue-router";

let hours = ref(Array.from(new Array(24).keys()).slice(0))
let mils = ref(Array.from(new Array(60).keys()).slice(0))
let days = ref(Array.from(new Array(32).keys()).slice(1))
let months = ref(Array.from(new Array(13).keys()).slice(1))

function submit0() {
  let arr = $("#main-form").serializeArray()
  let obj = {};
  $.each(arr, function (index, field) {
    if (obj[field.name] === undefined) {
      obj[field.name] = field.value;
    } else {
      obj[field.name] = obj[field.name] + field.value;
    }
  })
  let json = JSON.stringify(obj);
  console.log(json)
  axios.post("/cronAdd", json).then(function (response) {
    let tips = response.data;
    alert(tips);
    if (tips === "ok"){
      router.push("/cron-list")
    }
  }).catch(function (err) {
    alert(err);
  })
}
</script>
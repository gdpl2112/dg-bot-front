<style>

</style>

<template>
  <div class="container tm-0">
    <div class="row">
      <div class="list-group col" id="main-div">
        <div class="list-group-item list-group-item-action" v-for="e in list">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">{{ e.qid }}</span>
            </div>
            <input :id="'auth-'+e.qid" type="text" class="form-control" :value="e.auth">
            <div class="input-group-prepend">
              <span class="input-group-text">exp</span>
            </div>
            <input :qid="e.qid" :id="'exp-'+e.qid" type="text" class="form-control i" :value="e.exp">
          </div>
          <div class="input-group">
            <div class="alert alert-secondary" role="alert">
              自上次登录已在线时长:
              <div :class="'form-group mx-sm-5 mb-2 '+ ji0(e.t0)">{{ formatMsgTime1(e.t0, "未在线") }}
              </div>
            </div>
            <div class="input-group-prepend">
              <span class="input-group-text">年</span>
            </div>
            <input :qid="e.qid" :id="'year-'+e.qid" type="text" class="form-control o" :value="e.y">
            <div class="input-group-prepend">
              <span class="input-group-text">月</span>
            </div>
            <input :qid="e.qid" :id="'month-'+e.qid" type="text" class="form-control o" :value="e.m">
            <div class="input-group-prepend">
              <span class="input-group-text" id="addon-wrapping">日</span>
            </div>
            <input :qid="e.qid" :id="'day-'+e.qid" type="text" class="form-control o" :value="e.d">
            &nbsp;&nbsp;
          </div>
          <button type="button" class="btn btn-info" v-on:click="modify(e.qid)">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import $ from 'jquery'
import {formatMsgTime1} from "@/assets/utils.js";

let list = ref([])
onMounted(() => {
  axios.get("/m/list").then(function (response) {
    list.value = response.data
  }).catch(function (err) {
    alert(err);
  })
})

function modify(id) {
  let auth = $("#auth-" + id).val()
  let exp = $("#exp-" + id).val()
  axios.get("/m/modify?qid=" + id + "&auth=" + auth + "&exp=" + exp).then(function (response) {
    list.value = response.data
    alert("ok")
  }).catch(function (err) {
    alert(err);
  })
}

function ji0(t) {
  if (t <= 0) {
    return "alert alert-danger"
  } else {
    return "alert alert-success"
  }
}

onMounted(() => {
  $(".o").change(function (e) {
    let qid = $(this).attr("qid")
    let year = $("#year-" + qid).val()
    let month = $("#month-" + qid).val()
    let day = $("#day-" + qid).val()
    axios.get("/m/get-exp?y=" + year + "&m=" + month + "&d=" + day).then(function (response) {
      $("#exp-" + qid).val(response.data)
    }).catch(function (err) {
      alert(err);
    })

  });

  $(".i").change(function (e) {
    let qid = $(this).attr("qid")
    let exp = $("#exp-" + qid).val()
    axios.get("/m/exp-ymd?exp=" + exp).then(function (response) {
      let ds = response.data
      $("#year-" + qid).val(ds[0])
      $("#month-" + qid).val(ds[1])
      $("#day-" + qid).val(ds[2])
    }).catch(function (err) {
      alert(err);
    })
  });
})
</script>
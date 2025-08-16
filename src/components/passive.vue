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
            <button id="b2" class="nav-link">被动消息列表</button>
          </li>
        </ul>
        <div>
          <br>
          <div id="m-div">
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="input-group mb-3">
                  <input id="pas-touch" type="text" class="form-control" placeholder="触发词">
                  <input id="pas-out" type="text" class="form-control" placeholder="回复词"> &nbsp;
                  <button v-on:click="add()" type="button" class="btn btn-primary">添加一个</button>
                </div>
              </li>
              <li class="list-group-item list-group-item-action" v-for="(e,i) in all">
                <div class="d-flex w-100 justify-content-between">
                  <button class="btn btn-outline-primary btn-link btn-block" type="button"
                          data-toggle="collapse"
                          :data-target="`#collapse-`+i" aria-expanded="false"
                          :aria-controls="`#collapse-`+i">
                    {{ e.touch }}
                  </button> &nbsp;&nbsp;
                  <span class="badge badge-pill">
                                    <span class="badge badge-primary badge-pill">{{ e.outs.length }}</span>&nbsp;&nbsp;
                                    <button v-on:click="del(e.touch,null)" type="button"
                                            class="btn btn-danger">删除</button>
                                </span>
                </div>
                <div class="collapse" :id="`collapse-`+i">
                  <br>
                  <div class="card card-body">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item list-group-item-action" v-for="o in e.outs">
                        <div class="d-flex w-100 justify-content-between">
                          {{ o }}
                          <span class="badge badge-pill">
                                                 <button v-on:click="del(e.touch,o)" type="button"
                                                         class="btn btn-danger">删除</button>
                                                </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router'
import {onMounted, ref} from "vue";
import axios from "@/axios_in";
import $ from 'jquery'

let all = ref([])
onMounted(() => {
  axios.get("/api/p-list").then(function (response) {
    all.value = response.data
  }).catch(function (err) {
    alert(err);
  })
})

function add() {
  let inp1 = $("#pas-touch");
  let inp2 = $("#pas-out");
  let t0 = inp1.val()
  let t1 = inp2.val()
  axios.get("/api/p-add?t0=" + t0 + "&t1=" + t1).then(function (response) {
    all.value = response.data;
    inp2.val("")
  }).catch(function (err) {
    alert(err);
  })
}

function del(touch, o) {
  axios.post("/api/p-del",{touch: touch, out: o} ).then(function (response) {
    if (response.data === true) {
      if (o !== null) {
        all.value = all.value.filter(function (item) {
          if (item.touch === touch) {
            item.outs = item.outs.filter(function (i0) {
              return i0 !== o;
            })
          }
          return item.outs.length > 0
        });
      } else {
        all.value = all.value.filter(function (item) {
          return item.touch !== touch
        });
      }
    }
  }).catch(function (err) {
    alert(err);
  })
}
</script>
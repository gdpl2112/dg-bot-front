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
            <button id="b1" class="nav-link active">管理者列表</button>
          </li>
          <li class="nav-item">
            <button id="b2" class="nav-link">群列表开关</button>
          </li>
        </ul>
        <div>
          <br>
          <div id="m-div">
            <ul id="m-div-ul" class="list-group">
              <li class="list-group-item ist-group-item-action">
                <small class="form-text text-muted">此管理 可进行复述,开/关 回复,监听 添加/删除 回复</small>
                <div class="d-flex w-100 justify-content-between">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">请输入QQ:</span>
                    </div>
                    <input id="m_add_i" type="text" class="form-control" aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-default">
                    <button v-on:click="madd()" type="button" class="btn btn-primary">添加一个</button>
                  </div>
                </div>
              </li>
              <li v-for="e in list"
                  class="list-group-item d-flex justify-content-between align-items-center">
                <img :src="'https://q1.qlogo.cn/g?b=qq&nk='+e.targetId+'&s=640'" style="width: 45px"
                     class=" img-thumbnail rounded float-left">
                {{ e.targetId }}
                <span class="badge badge-pill">
                                <button v-on:click="del(e.targetId)" type="button" class="btn btn-danger">删除</button>
                            </span>
              </li>
            </ul>
          </div>
          <div id="g-div" style="display: none;">
            <ul id="g-div-ul" class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">检索</span>
                  </div>
                  <input id="g-search" type="text" class="form-control">
                  <button type="button" class="btn btn-primary">检索</button>
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <p>头像</p>
                <p>tid</p>
                <p>昵称</p>
                <span class="badge badge-pill">

                                <button data-toggle="tooltip" data-placement="top" title="API调用开关"
                                        class="btn btn-outline-secondary" disabled>API调用开关</button>

                                <button data-toggle="tooltip" data-placement="top" title="对象监听开关"
                                        class="btn btn-outline-secondary" disabled>对象监听开关</button>

                                <button data-toggle="tooltip" data-placement="top" title="对象被动回复开关"
                                        class="btn btn-outline-secondary" disabled>对象被动回复开关</button>
                            </span>
              </li>

              <li v-for="e in glist"
                  class="list-group-item d-flex justify-content-between align-items-center">
                <img :src="e.icon" style="width: 45px"
                     class=" img-thumbnail rounded float-left">
                {{ e.tid }}
                {{ e.name }}
                <span class="badge badge-pill">

                                <button v-on:click="gm0(e.tid)" type="button"
                                        data-toggle="tooltip" data-placement="top" title="API调用开关"
                                        :class="'btn btn-outline-'+(e.k0?'success':'danger')">{{(e.k0?'开':'关')}}</button>

                                <button v-on:click="gm1(e.tid)" type="button"
                                        data-toggle="tooltip" data-placement="top" title="对象监听开关"
                                        :class="'btn btn-outline-'+(e.k1?'success':'danger')">{{(e.k1?'开':'关')}}</button>

                                <button v-on:click="gm2(e.tid)" type="button"
                                        data-toggle="tooltip" data-placement="top" title="对象被动回复开关"

                                        :class="'btn btn-outline-'+(e.k2?'success':'danger')">{{(e.k2?'开':'关')}}</button>

                            </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import $ from 'jquery'
import {RouterLink} from "vue-router";

onMounted(() => {
  let but1 = $("#b1")
  let but2 = $("#b2")
  let mdiv = $("#m-div")
  let gdiv = $("#g-div")

  but1.click(function () {
    mdiv.show()
    gdiv.hide()
    but2.removeClass("active")
    but1.addClass("active")
  });
  but2.click(function () {
    gdiv.show()
    mdiv.hide()
    but1.removeClass("active")
    but2.addClass("active")
  });
  axios.get("/mlist").then(function (response) {
    list.value = response.data;
  }).catch(function (err) {
    alert(err);
  });

  axios.get("/glist").then(function (response) {
    glist.value = response.data
    oGlist.value = response.data
  }).catch(function (err) {
    alert(err);
  });

  $("#g-search").change(function () {
    let s = $("#g-search").val()
    if (s === "") {
      glist.value = oGlist.value
    } else {
      glist.value = oGlist.value.filter((element) => {
        return (element.tid.toString() + element.name).includes(s)
      });
    }
  });

})

let list = ref([])
let glist = ref([])
let oGlist = ref([])

function madd() {
  let id = $("#m_add_i").val();
  axios.get("/m_add?id=" + id).then(function (response) {
    if (response.data === true) {
      list.value.splice(0, 0, {"qid": 0, "targetId": id})
    }
  }).catch(function (err) {
    alert(err);
  })
}

function del(id) {
  axios.get("/mdel?id=" + id).then(function (response) {
    axios.get("/mlist").then(function (response) {
      list.value = response.data;
    }).catch(function (err) {
      alert(err);
    });
  }).catch(function (err) {
    alert(err);
  })
}

function gm0(tid) {
  axios.get("/gc0?tid=" + tid).then(function (response) {
    if (response.data === true) {
      glist.value.forEach((e) => {
        if (e.tid === tid) e.k0 = !e.k0;
      })
    }
  }).catch(function (err) {
    alert(err);
  })
}

function gm1(tid) {
  axios.get("/gc1?tid=" + tid).then(function (response) {
    if (response.data === true) {
      glist.value.forEach((e) => {
        if (e.tid === tid) e.k1 = !e.k1;
      })
    }
  }).catch(function (err) {
    alert(err);
  })
}

function gm2(tid) {
  axios.get("/gc2?tid=" + tid).then(function (response) {
    if (response.data === true) {
      glist.value.forEach((e) => {
        if (e.tid === tid) e.k2 = !e.k2;
      })
    }
  }).catch(function (err) {
    alert(err);
  })
}
</script>
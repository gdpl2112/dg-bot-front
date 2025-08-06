<style>
.ma-2 {
  margin: 2px;
}
</style>

<template>
  <center>
    <div style="background-color: rgba(255,255,255,0.8);border-radius: 10px;padding-top: 15px;padding-bottom: 15px"
         class="container">
      <RouterLink
          style="width: 60%" to="/bot" type="button" class="btn btn-lg btn-block btn-outline-success">BOT个人首页
      </RouterLink>
      <!--        <div class="row justify-content-md-center">
                <RouterLink to="/manager" type="button" class="col-3 btn btn-lg btn-block btn-outline-dark ma-2">管理页面
                </RouterLink>
                <RouterLink to="/conf" type="button" class="col-3 btn btn-lg btn-block btn-outline-dark ma-2">配置中心
                </RouterLink>
                <RouterLink to="/cron-list" type="button" class="col-3 btn btn-lg btn-block btn-outline-dark ma-2">定时任务
                </RouterLink>
                <RouterLink to="/passive" type="button" class="col-3 btn btn-lg btn-block btn-outline-dark ma-2">回复词
                </RouterLink>
                <RouterLink to="/optsv" type="button" class="col-3 btn btn-lg btn-block btn-outline-dark ma-2">内置功能
                </RouterLink>
                <RouterLink to="/callapi" type="button" class="col-3 btn btn-lg btn-block btn-outline-dark ma-2">API管理
                </RouterLink>
                <RouterLink to="/v11c" type="button" class="col-3 btn btn-lg btn-block btn-outline-dark ma-2">V11</RouterLink>
              </div-->
    </div>
  </center>
  <hr>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col">
        <ul class="nav nav-tabs" style="background-color: rgba(211,211,211,0.6)">
          <li class="nav-item">
            <button id="b1" class="nav-link active">管理者列表</button>
          </li>
          <li class="nav-item">
            <button id="b2" class="nav-link">群列表开关</button>
          </li>
          <li class="nav-item">
            <button id="b3" class="nav-link">好友列表开关</button>
          </li>
        </ul>

        <div>
          <br>
          <div id="m-div">
            <ul id="m-div-ul" class="list-group">
              <li class="list-group-item ist-group-item-action">
                <small class="form-text text-muted">此管理可进行 开关控制 词管理和复述</small>
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
                     class=" img-thumbnail rounded float-left"/>
                {{ e.targetId }}
                <span class="badge badge-pill">
                  <button v-on:click="del(e.targetId)" type="button" class="btn btn-danger">删除</button>
                </span>
              </li>
            </ul>
          </div>
          <!--群-->
          <div id="g-div" style="display: none;">
            <p style="background-color: rgba(211,211,211,0.8)">
              从左至右按钮分别是 控制开关
              <span style="color: #67f327">被动回复</span>&nbsp;
              <span style="color: #2e8f00">API调用</span>&nbsp;
              <span style="color: #184c00">撤回监听</span>
              #红色代表已关闭 默认开启
            </p>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">检索</span>
              </div>
              <input id="g-search" type="text" class="form-control">
              <button type="button" class="btn btn-primary">检索</button>
            </div>
            <div class="row" style="overflow-y: scroll;height: 700px">
              <div class="col-md-2 col-4 mt-2" v-for="e in glist">
                <div style="border-radius: 15px;padding: 1px; background-color: rgba(230,230,230,0.8)">
                  <hr>
                  <center><img :src="e.icon" class="card-img-top" alt="头像" style="width: 74%;border-radius: 999px">
                  </center>
                  <center><p>{{ e.name }}</p></center>
                  <div class="align-content-center">
                    <button v-on:click="gm2(e.tid)" type="button" title="对象被动回复开关"
                            :class="'ml-2 mb-1 btn btn-outline-'+(e.k2?'success':'danger')">{{ (e.k2 ? '开' : '关') }}
                    </button>
                    <button v-on:click="gm0(e.tid)" type="button" title="API调用开关"
                            :class="'ml-1 mb-1 btn btn-outline-'+(e.k0?'success':'danger')">{{ (e.k0 ? '开' : '关') }}
                    </button>
                    <button v-on:click="gm1(e.tid)" type="button"
                            title="对象监听开关"
                            :class="'ml-1 mb-1 btn btn-outline-'+(e.k1?'success':'danger')">{{ (e.k1 ? '开' : '关') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--好友-->
          <div id="f-div" style="display: none;">
            <p style="background-color: rgba(211,211,211,0.8)">
              从左至右按钮分别是 控制开关
              <span style="color: #67f327">被动回复</span>&nbsp;
              <span style="color: #2e8f00">API调用</span>&nbsp;
              <span style="color: #184c00">撤回监听</span>
              #红色代表已关闭 默认开启
            </p>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">检索</span>
              </div>
              <input id="f-search" type="text" class="form-control">
              <button type="button" class="btn btn-primary">检索</button>
            </div>
            <div class="row" style="overflow-y: scroll;height: 700px">
              <div class="col-md-2 col-4 mt-2" v-for="e in flist">
                <div style="border-radius: 15px;padding: 1px; background-color: rgba(230,230,230,0.8)">
                  <hr>
                  <center><img :src="e.icon" class="card-img-top" alt="头像" style="width: 74%;border-radius: 999px">
                  </center>
                  <center><p>{{ e.name }}</p></center>
                  <div class="align-content-center">
                    <button v-on:click="gm2(e.tid)" type="button" title="对象被动回复开关"
                            :class="'ml-2 mb-1 btn btn-outline-'+(e.k2?'success':'danger')">{{ (e.k2 ? '开' : '关') }}
                    </button>
                    <button v-on:click="gm0(e.tid)" type="button" title="API调用开关"
                            :class="'ml-1 mb-1 btn btn-outline-'+(e.k0?'success':'danger')">{{ (e.k0 ? '开' : '关') }}
                    </button>
                    <button v-on:click="gm1(e.tid)" type="button" title="对象监听开关"
                            :class="'ml-1 mb-1 btn btn-outline-'+(e.k1?'success':'danger')">{{ (e.k1 ? '开' : '关') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
  let but3 = $("#b3")
  let mdiv = $("#m-div")
  let gdiv = $("#g-div")
  let fdiv = $("#f-div")

  but1.click(function () {
    mdiv.show()
    fdiv.hide()
    gdiv.hide()
    but3.removeClass("active")
    but2.removeClass("active")
    but1.addClass("active")
    axios.get("/mlist").then(function (response) {
      list.value = response.data;
    }).catch(function (err) {
      alert(err);
    });
  });

  but2.click(function () {
    gdiv.show()
    mdiv.hide()
    fdiv.hide()
    but3.removeClass("active")
    but1.removeClass("active")
    but2.addClass("active")

    axios.get("/glist").then(function (response) {
      glist.value = response.data
      oGlist.value = response.data
    }).catch(function (err) {
      alert(err);
    });

  });

  but3.click(function () {
    fdiv.show()
    mdiv.hide()
    gdiv.hide()
    but1.removeClass("active")
    but2.removeClass("active")
    but3.addClass("active")

    axios.get("/flist").then(function (response) {
      flist.value = response.data
      oFlist.value = response.data
    }).catch(function (err) {
      alert(err);
    });

  });

  axios.get("/mlist").then(function (response) {
    list.value = response.data;
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

  $("#f-search").change(function () {
    let s = $("#f-search").val()
    if (s === "") {
      flist.value = oFlist.value
    } else {
      flist.value = oFlist.value.filter((element) => {
        return (element.tid.toString() + element.name).includes(s)
      });
    }
  });

})

let list = ref([])

let glist = ref([])
let oGlist = ref([])

let flist = ref([])
let oFlist = ref([])

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
<style>

</style>

<template>
  <center>
    <RouterLink style="width: 50%" to="/bot" type="button" class="btn btn-lg btn-block btn-outline-success">返回个人首页
    </RouterLink>
  </center>
  <hr>
  <center style="color: rgba(1,20,37,0.95);"><h1> V11配置 </h1></center>
  <center><h5 style="background-color: rgba(198,198,198,0.65);color: rgba(255,110,110,0.95);width: 50%">
    此页功能可能尚未支持 </h5></center>

  <div class="container" style="background-color: rgba(181,181,181,0.75);border-radius: 15px">
    &nbsp;<p>v11功能取决于登录协议可能尚未支持</p>

    <div class="row">

      <div class="col-12 col-md-6">
        <form class="row alert justify-content-center">
          <div class="alert alert-secondary text-center justify-content-center" role="alert"
               style="border-radius: 15px">
            <center>自动回赞</center>
            <button v-on:click="modify('autoLike',!data.autoLike)" type="button"
                    :class="'btn mb-3 btn-'+(data.autoLike?'success':'danger' )" style="margin-top: 14px">
              {{ (data.autoLike ? '当前开启' : '当前关闭') }}
            </button>
            <button v-on:click="modify('needMaxLike',!data.needMaxLike)" type="button"
                    :class="'btn mb-3 btn-outline-'+(data.needMaxLike?'warning':'success' )" style="margin-top: 14px">
              {{ (data.needMaxLike ? '点满回赞' : '不满也回赞') }}
            </button>
            <button v-on:click="adn()" type="button" class="btn mb-3 btn-info" style="margin-top: 14px">
              立刻执行
            </button>
          </div>
        </form>
      </div>

      <div class="col-12 col-md-6">
        <form class="row alert justify-content-center">
          <div class="alert alert-secondary" role="alert" style="border-radius: 15px">
            <center>自动点赞昨日</center>
            <button v-on:click="modify('autoLikeYesterday',!data.autoLikeYesterday)" type="button"
                    :class="'btn mb-3 btn-'+(data.autoLikeYesterday?'success':'danger' )" style="margin-top: 14px">
              {{ (data.autoLikeYesterday ? '当前开启' : '当前关闭') }}
            </button>

            <button v-on:click="ydn()" type="button" class="btn mb-3 btn-info" style="margin-top: 14px">
              立刻执行
            </button>
          </div>
        </form>
      </div>

      <div class="col-12 col-md-12">
        <form class="row justify-content-center text-center">
          <div class="alert alert-secondary" role="alert" style="border-radius: 15px">
            <label for="sgtt" class="form-label">自动打卡群设置</label>
            <textarea class="form-control" id="sgtt" rows="3"
                      placeholder="用英文分号(;)分隔群聊ID">{{data.signGroups}}</textarea>
            <button v-on:click="modify('signGroups',$('#sgtt').val())" type="button"
                    :class="'btn mb-3 btn-outline-primary'" style="margin-top: 14px"> 应用设置
            </button>
          </div>
        </form>
      </div>

      <div class="col-12 col-md-12 alert justify-content-center text-center">
        <form class="row justify-content-center">
          <div class="alert alert-secondary justify-content-center" role="alert" style="border-radius: 15px">
            <center>空间自动点赞 #尚未实现</center>
            <button v-on:click="modify('autoZoneLike',!data.autoZoneLike)" type="button"
                    :class="'btn mb-3 btn-'+(data.autoZoneLike?'success':'danger' )" style="margin-top: 14px">
              {{ (data.autoZoneLike ? '当前开启' : '当前关闭') }}
            </button>
            <br>
            <label for="zctt" class="form-label">自动评论空间</label>
            <textarea class="form-control" id="zctt" rows="3" placeholder="评论文本">{{data.zoneComment}}</textarea>
            <button v-on:click="modify('zoneComment',$('#zctt').val())" type="button"
                    :class="'btn mb-3 btn-outline-primary'" style="margin-top: 14px"> 应用设置
            </button>
          </div>
        </form>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import $ from 'jquery'
import axios from "axios";
import {RouterLink} from "vue-router";
import {onMounted, ref} from "vue";


onMounted(() => {
  axios.get("/api/v11/get-conf",).then(function (response) {
    data.value = response.data;
  }).catch(function (err) {
    alert(err);
  })
})

let data = ref(
    {
      zoneComment: "",
      signGroups: "",
      autoLike: false,
      needMaxLike: false,
      autoLikeYesterday: false,
      autoZoneLike: false
    });

function modify(key: String, value: any) {
  console.log("modfiy " + key + " : " + value)
  axios.get("/api/v11/modify-conf?key=" + key + "&value=" + value).then(function (response) {
    data.value = response.data;
    alert("修改成功")
  }).catch(function (err) {
    alert(err);
  })
}

function ydn() {
  axios.get("/api/v11/autoLikeYesterdayNow").then(function (response) {
    alert(response.data)
  }).catch(function (err) {
    alert(err);
  })
}

function adn() {
  axios.get("/api/v11/autoLikeNow").then(function (response) {
    alert(response.data)
  }).catch(function (err) {
    alert(err);
  })
}


</script>
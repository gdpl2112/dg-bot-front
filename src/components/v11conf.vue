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

      <div class="col-12 col-md-4">
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
            <hr>
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

      <div class="col-12 col-md-4">
        <div class="alert alert-secondary" role="alert" style="border-radius: 15px">
          <label for="like_black" class="form-label">黑名单设置</label>
          <small class="form-text text-muted">设置后即使黑名单用户点赞,也不回赞</small>
          <textarea class="form-control" id="like_black" rows="3"
                    placeholder="用英文分号(;)分隔QQ号">{{data.likeBlack}}</textarea>
          <button v-on:click="modify('likeBlack',$('#like_black').val())" type="button"
                  :class="'btn mb-3 btn-outline-primary'" style="margin-top: 14px"> 应用设置
          </button>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="alert alert-secondary" role="alert" style="border-radius: 15px">
          <label for="like_white" class="form-label">白名单设置</label>
          <small class="form-text text-muted">设置后即使白名单用户不点赞,也回赞</small>
          <textarea class="form-control" id="like_white" rows="3"
                    placeholder="用英文分号(;)分隔QQ号">{{data.likeWhite}}</textarea>
          <button v-on:click="modify('likeWhite',$('#like_white').val())" type="button"
                  :class="'btn mb-3 btn-outline-primary'" style="margin-top: 14px"> 应用设置
          </button>
        </div>
      </div>


      <div class="col-12 col-md-12">
        <form class="row justify-content-center text-center">
          <div class="alert alert-secondary" role="alert" style="border-radius: 15px">
            <label for="sgtt" class="form-label">自动打卡群设置</label>
            <textarea class="form-control" id="sgtt" rows="3"
                      placeholder="用英文分号(;)分隔群聊ID">{{data.signGroups}}</textarea>
            <small class="form-text text-muted">若设置过多则会产生延迟</small>
            <button v-on:click="modify('signGroups',$('#sgtt').val())" type="button"
                    :class="'btn mb-3 btn-outline-primary'" style="margin-top: 14px"> 应用设置
            </button>
            <button type="button" data-toggle="modal" data-target="#gsign-modal"
                    class="btn mb-3 btn-outline-success" style="margin-top: 14px" v-on:click="loadSignGroups">便捷设置
            </button>
            <button v-on:click="sgn()" type="button" class="btn mb-3 btn-info" style="margin-top: 14px">
              立刻执行
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
            <hr>
            <label for="zcwk" class="form-label">自动空间访问</label>
            <textarea class="form-control" id="zcwk" rows="3" placeholder="要访问的QQ号以;分割">{{data.zoneWalks}}</textarea>
            <button v-on:click="modify('zoneWalks',$('#zcwk').val())" type="button"
                    :class="'btn mb-3 btn-outline-primary'" style="margin-top: 14px"> 应用设置
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>


  <div id="gsign-modal" class="modal fade " tabindex="-1" aria-hidden="true">
    <div class="modal-dialog  modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">群打卡设置</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="gsign-body">
          <table class="table">
            <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">头像</th>
              <th scope="col">信息</th>
              <th scope="col">选项</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(e,i) in groupInfos">
              <th scope="row">{{ i }}</th>
              <td>
                <img :src="e.icon" class="card-img-top" alt="头像" style="width: 75px">
              </td>
              <td>{{ e.name }}
                <small class="form-text text-muted">{{ e.id }}</small>
              </td>
              <td>
                <input class="form-check-input" type="checkbox" :value="e.id" :ref="'groupCheck' + e.id">
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
          <button v-on:click="saveGsign" type="button" class="btn btn-primary">保存设置</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import $ from 'jquery'
import axios from "@/axios_in";
import {RouterLink} from "vue-router";
import {onMounted, ref} from "vue";


onMounted(() => {
  axios.get("/api/v11/get-conf",).then(function (response) {
    data.value = response.data;
  }).catch(function (err) {
    alert(err);
  })
  axios.get("/api/v11/getGroups",).then(function (response) {
    groupInfos.value = response.data;
  }).catch(function (err) {
    alert(err);
  })
})

let groupInfos = ref([{id: 0, name: "A", icon: ""}])

function saveGsign() {
  let checked = $('#gsign-body input:checked').map(function () {
    return $(this).val();
  }).get();
  // 将选中的群组ID用分号连接并更新到data.value.signGroups
  data.value.signGroups = checked.join(';');
  // 同时更新textarea中的内容
  $('#sgtt').val(data.value.signGroups);
  console.log(checked);
  ($('#gsign-modal') as any).modal('hide')
  modify('signGroups', data.value.signGroups)
}

// 添加新函数用于加载已配置的群组
function loadSignGroups() {
  // 等待DOM更新完成后执行
  setTimeout(() => {
    // 清空所有选择
    $('#gsign-body input:checkbox').prop('checked', false);

    // 获取已配置的群组列表
    const signGroups = data.value.signGroups;
    if (signGroups) {
      const groups = signGroups.split(';');
      groups.forEach(groupId => {
        if (groupId.trim()) {
          // 查找对应的checkbox并勾选
          $(`#gsign-body input[value="${groupId.trim()}"]`).prop('checked', true);
        }
      });
    }
  }, 100);
}

let data = ref(
    {
      zoneComment: "",
      zoneWalks: "",
      signGroups: "",
      likeBlack: "",
      likeWhite: "",
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

function sgn() {
  axios.get("/api/v11/signGroupNow").then(function (response) {
    alert(response.data)
  }).catch(function (err) {
    alert(err);
  })
}


</script>
<style>

</style>

<template>
  <div class="tm-1 jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">请选择以下任一方式申请</h1><br>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="card col-4" style="width: 18rem;">
        <img src="/img/sm-card.png" class="card-img-top" style="margin-top: 15px" alt="">
        <div class="card-body">
          <h5 class="card-title">联系询问</h5>
          <a href="https://qm.qq.com/q/44TwlimEyQ" class="btn btn-primary">现在去</a>
        </div>
      </div>
      <div class="card col-4" style="width: 18rem;">
        <img src="/img/sm-card1.png" class="card-img-top" style="margin-top: 15px" alt="">
        <div class="card-body">
          <h5 class="card-title">进群询问</h5>
          <a href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=Tuzi4oqX0tlE4ZSNA63XF5m8tF6jzmkD&authKey=8Y8gls5ocqYex0If27cIVHDIwfNR%2B5Mg%2FKtAaerxG92oaym6TyC5RYBZoa2G0ft2&noverify=0&group_code=278681553"
             class="btn btn-primary">现在去</a>
        </div>
      </div>
      <div class="card col-4" style="width: 18rem;">
        <img src="/img/sm-card2.jpg" class="card-img-top" style="margin-top: 15px" alt="">
        <div class="card-body">
          <h5 class="card-title">进频道询问</h5>
          <a href="https://pd.qq.com/s/bdn0qowhn" class="btn btn-primary">现在去</a>
        </div>
      </div>
    </div>
  </div>
  <hr>

  <center>
    <RouterLink style="width: 50%" to="/" type="button" class="btn btn-lg btn-block btn-outline-success">返回主页
    </RouterLink>
  </center>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router'
</script>
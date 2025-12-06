<style>

</style>

<template>
  <div class="tm-1 jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">请选择以下任一方式咨询</h1><br>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="card col-4" style="width: 18rem;">
        <hr>
        <h4>个人私信</h4>
        <img src="/img/sm-card.png" class="card-img-top" style="margin-top: 15px" alt="">
        <div class="card-body">
          <h5 class="card-title">联系询问</h5>
          <a href="https://qm.qq.com/q/44TwlimEyQ" class="btn btn-primary">现在去</a>
        </div>
      </div>
      <div class="card col-4" style="width: 18rem;">
        <hr>
        <h4>群聊讨论</h4>
        <img src="/img/sm-card1.png" class="card-img-top" style="margin-top: 15px" alt="">
        <div class="card-body">
          <h5 class="card-title">进群询问</h5>
          <a href="https://qun.qq.com/universal-share/share?ac=1&authKey=hzQV6YQPXEKqRG1RPtwi7w77wFXltgufoFjv%2FsTFBh0oF04fdyPhkIcMWL3moUWL&busi_data=eyJncm91cENvZGUiOiI5NDM2NDgxNTEiLCJ0b2tlbiI6Ii8wbWNyTGxHOTQrMFRnL2hUVGRNck1FY2JubGlibDVlazQ4ZlUydU1neUEyMElUeTlLbG4wdzk0ckF5SndVRUkiLCJ1aW4iOiIzNDc0MDA2NzY2In0%3D&data=7GizNYlpH7SkzukK4s_FJfW1GLh0PywGGiMyOg-Bq8934xajZhEh6vYD8VpwcNMNerw4zX7F1o8QZLDe0R9ZYA&svctype=4&tempid=h5_group_info"
             class="btn btn-primary">现在去</a>
        </div>
      </div>
      <div class="card col-4" style="width: 18rem;">
        <hr>
        <h4>频道咨询(不在推荐)</h4>
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
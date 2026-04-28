<style scoped>
.hero {
  text-align: center;
  padding: 3rem 1rem 2rem;
  background: rgb(243 247 255 / 0.6);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.hero h1 {
  font-size: 2.2rem;
  font-weight: 800;
  color: #21a5da;
  margin-bottom: 1rem;
}
.hero p {
  font-size: 1rem;
  color: #2a2526;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 0.5rem;
}
.price-tag {
  display: inline-block;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  background: rgb(118 190 211 / 0.2);
  border: 1px solid rgb(56 96 196 / 0.3);
  color: #323d48;
  font-weight: 600;
  font-size: 0.92rem;
  margin: 1.5rem 0;
  max-width: 500px;
}
.cta-row {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}
</style>

<template>
  <div class="hero">
    <h1>Q云端代挂</h1>
    <p>支持 撤回监听/自动续火/被动续火/定时消息发送/自定义功能调用 等功能</p>
    <p>稳定在线！后台管理功能全面</p>
    <p style="font-size:0.85rem;color:rgb(109 76 204)">TIPS: 所有QQ代挂，即利用程序登录QQ账号来达到各种想要的效果，自设置的回复，定时发送消息等...</p>

    <div class="price-tag">按月续租 · 新开月租仅1元/月</div>

    <div class="cta-row">
      <RouterLink to="/join" class="action-btn action-btn-primary" style="font-size:1rem;padding:0.65rem 2rem">现在开始</RouterLink>
      <RouterLink to="/login" class="action-btn action-btn-outline" style="font-size:1rem;padding:0.65rem 2rem">登录页面</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
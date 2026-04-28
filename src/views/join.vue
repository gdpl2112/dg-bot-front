<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}
.contact-card {
  text-align: center;
  padding: 1.25rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.06);
  transition: all 0.2s;
}
.contact-card:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}
.contact-card h4 {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
}
.contact-card img {
  width: 100%;
  max-width: 200px;
  border-radius: 10px;
  margin-bottom: 0.75rem;
}
.contact-card h5 {
  font-size: 0.88rem;
  color: #64748b;
  margin-bottom: 0.75rem;
}
</style>

<template>
  <div class="page-card">
    <h1 class="page-title">请选择以下任一方式咨询</h1>

    <div class="contact-grid">
      <div class="contact-card">
        <h4>个人私信</h4>
        <img src="/img/sm-card.png" alt="私信二维码">
        <h5>联系询问</h5>
        <a href="https://qm.qq.com/q/44TwlimEyQ" class="action-btn action-btn-primary">现在去</a>
      </div>
      <div class="contact-card">
        <h4>群聊讨论</h4>
        <img src="/img/sm-card1.png" alt="群聊二维码">
        <h5>进群询问</h5>
        <a href="https://qun.qq.com/universal-share/share?ac=1&authKey=hzQV6YQPXEKqRG1RPtwi7w77wFXltgufoFjv%2FsTFBh0oF04fdyPhkIcMWL3moUWL&busi_data=eyJncm91cENvZGUiOiI5NDM2NDgxNTEiLCJ0b2tlbiI6Ii8wbWNyTGxHOTQrMFRnL2hUVGRNck1FY2JubGlibDVlazQ4ZlUydU1neUEyMElUeTlLbG4wdzk0ckF5SndVRUkiLCJ1aW4iOiIzNDc0MDA2NzY2In0%3D&data=7GizNYlpH7SkzukK4s_FJfW1GLh0PywGGiMyOg-Bq8934xajZhEh6vYD8VpwcNMNerw4zX7F1o8QZLDe0R9ZYA&svctype=4&tempid=h5_group_info"
           class="action-btn action-btn-primary">现在去</a>
      </div>
      <div class="contact-card">
        <h4>频道咨询(不推荐)</h4>
        <img src="/img/sm-card2.jpg" alt="频道二维码">
        <h5>进频道询问</h5>
        <a href="https://pd.qq.com/s/bdn0qowhn" class="action-btn action-btn-primary">现在去</a>
      </div>
    </div>

    <div style="text-align:center;margin-top:1rem">
      <RouterLink to="/" class="back-link">← 返回主页</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
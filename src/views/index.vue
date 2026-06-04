<style scoped>
/* ===== Hero Section ===== */
.hero-section {
  text-align: center;
  padding: 4rem 2rem 2rem;
  position: relative;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 背景光晕动画 */
.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(37, 99, 235, 0.07) 0%, transparent 55%),
    radial-gradient(ellipse at 70% 60%, rgba(168, 85, 247, 0.07) 0%, transparent 55%),
    radial-gradient(ellipse at 50% 80%, rgba(236, 72, 153, 0.04) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
  animation: bgShift 16s ease-in-out infinite alternate;
}

@keyframes bgShift {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-2%, -1%) scale(1.04); }
}

/* ===== 状态徽章 ===== */
.hero-badge {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.1rem;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.18);
  color: #2563eb;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.7s ease-out;
  backdrop-filter: blur(10px);
}

.hero-badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulseDot 2s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.6);
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.6); }
}

/* ===== 主标题 ===== */
.hero-title {
  position: relative;
  z-index: 1;
  font-size: clamp(2.2rem, 5.5vw, 3.6rem);
  font-weight: 900;
  line-height: 1.15;
  margin: 0 0 0.85rem;
  background: linear-gradient(135deg, #1e40af 0%, #7c3aed 40%, #db2777 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInUp 0.7s ease-out 0.1s both;
  letter-spacing: 0.04em;
}

.hero-subtitle {
  position: relative;
  z-index: 1;
  font-size: 1.05rem;
  color: #475569;
  line-height: 1.75;
  max-width: 600px;
  margin: 0 auto 0.4rem;
  animation: fadeInUp 0.7s ease-out 0.2s both;
}

.hero-tip {
  position: relative;
  z-index: 1;
  font-size: 0.84rem;
  color: #94a3b8;
  max-width: 560px;
  margin: 0.4rem auto 0;
  line-height: 1.65;
  animation: fadeInUp 0.7s ease-out 0.25s both;
}

/* ===== AI 特色亮点区块 ===== */
.ai-highlight {
  position: relative;
  max-width: 780px;
  width: 100%;
  margin: 2.2rem auto 0;
  padding: 2rem 2.5rem;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.88) 0%,
    rgba(249, 250, 255, 0.92) 100%
  );
  backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(124, 58, 237, 0.15);
  box-shadow:
    0 8px 32px rgba(124, 58, 237, 0.08),
    0 2px 8px rgba(15, 23, 42, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  animation: fadeInUp 0.7s ease-out 0.3s both;
  overflow: hidden;
  transition: box-shadow 0.4s, transform 0.3s;
}

.ai-highlight:hover {
  box-shadow:
    0 12px 40px rgba(124, 58, 237, 0.14),
    0 4px 12px rgba(15, 23, 42, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* 光晕装饰 */
.ai-highlight::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 160px;
  height: 160px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.12), transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.ai-highlight::after {
  content: '';
  position: absolute;
  bottom: -40px;
  left: -40px;
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.1), transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.ai-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  position: relative;
  z-index: 1;
}

.ai-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  box-shadow:
    0 8px 24px rgba(124, 58, 237, 0.28),
    0 0 0 6px rgba(124, 58, 237, 0.06);
  flex-shrink: 0;
  animation: floatIcon 3.5s ease-in-out infinite;
}

@keyframes floatIcon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}

.ai-icon {
  font-size: 1.6rem;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.ai-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #1e1b4b;
  line-height: 1.4;
}

.ai-title-gradient {
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ai-desc {
  position: relative;
  z-index: 1;
  margin-top: 1.1rem;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  background: rgba(124, 58, 237, 0.04);
  border-left: 3px solid #7c3aed;
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.7;
}

.ai-features {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1.05rem;
}

.ai-feature-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: rgba(124, 58, 237, 0.06);
  border: 1px solid rgba(124, 58, 237, 0.1);
  font-size: 0.8rem;
  font-weight: 600;
  color: #6d28d9;
  transition: all 0.25s;
  cursor: default;
}

.ai-feature-tag:hover {
  background: rgba(124, 58, 237, 0.13);
  border-color: rgba(124, 58, 237, 0.22);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.12);
}

.tag-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #8b5cf6;
  flex-shrink: 0;
}

/* ===== 功能卡片网格 ===== */
.features-section {
  position: relative;
  z-index: 1;
  max-width: 900px;
  width: 100%;
  margin: 2.5rem auto 0;
  animation: fadeInUp 0.7s ease-out 0.4s both;
}

.features-section-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.9rem;
}

.feature-card {
  padding: 1.35rem 1.2rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  text-align: left;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.82);
  box-shadow:
    0 14px 36px rgba(15, 23, 42, 0.1),
    0 2px 4px rgba(15, 23, 42, 0.04);
  border-color: rgba(37, 99, 235, 0.15);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 13px;
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
}

.feature-card:nth-child(1) .feature-icon { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.feature-card:nth-child(2) .feature-icon { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.feature-card:nth-child(3) .feature-icon { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
.feature-card:nth-child(4) .feature-icon { background: rgba(236, 72, 153, 0.1); color: #ec4899; }
.feature-card:nth-child(5) .feature-icon { background: rgba(168, 85, 247, 0.1); color: #a855f7; }

.feature-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.2rem;
}

.feature-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.5;
}

/* ===== 底部 CTA ===== */
.cta-section {
  position: relative;
  z-index: 1;
  text-align: center;
  margin: 3rem auto 2rem;
  padding: 2rem 1.5rem;
  max-width: 500px;
  width: 100%;
  animation: fadeInUp 0.7s ease-out 0.5s both;
}

.price-tag {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.07), rgba(124, 58, 237, 0.07));
  border: 1px solid rgba(37, 99, 235, 0.2);
  color: #1e40af;
  font-weight: 700;
  font-size: 0.93rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 12px rgba(37, 99, 235, 0.06);
  backdrop-filter: blur(8px);
}

.price-highlight {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.15rem;
}

.cta-row {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.78rem 2.4rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: #fff;
  border: none;
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.32);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.02em;
}

.cta-btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
  border-radius: 999px;
  opacity: 0;
  transition: opacity 0.3s;
}

.cta-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.45);
  color: #fff;
  text-decoration: none;
}

.cta-btn-primary:hover::after {
  opacity: 1;
}

.cta-btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.cta-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.78rem 2.4rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(148, 163, 184, 0.35);
  color: #334155;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.02em;
}

.cta-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.88);
  border-color: rgba(100, 116, 139, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.1);
  text-decoration: none;
  color: #1e293b;
}

.cta-btn-secondary:active {
  transform: translateY(0);
}

/* ===== 入场动画 ===== */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== 响应式适配 ===== */
@media (max-width: 768px) {
  .hero-section {
    padding: 2.5rem 1rem 1.5rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
  }

  .ai-highlight {
    padding: 1.5rem 1.25rem;
    margin: 1.5rem 0 0;
    border-radius: 18px;
  }

  .ai-header {
    gap: 0.65rem;
  }

  .ai-icon-wrapper {
    width: 44px;
    height: 44px;
    border-radius: 13px;
  }

  .ai-icon {
    font-size: 1.3rem;
  }

  .ai-title {
    font-size: 1rem;
  }

  .ai-desc {
    font-size: 0.84rem;
    padding: 0.7rem 0.85rem;
  }

  .ai-features {
    gap: 0.4rem;
  }

  .ai-feature-tag {
    font-size: 0.75rem;
    padding: 0.3rem 0.7rem;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.7rem;
  }

  .feature-card {
    padding: 1rem 0.85rem;
    border-radius: 15px;
  }

  .feature-icon {
    width: 38px;
    height: 38px;
    font-size: 1.1rem;
    border-radius: 11px;
  }

  .feature-name {
    font-size: 0.88rem;
  }

  .feature-desc {
    font-size: 0.76rem;
  }

  .cta-section {
    padding: 1.5rem 1rem;
    margin: 2rem auto 1rem;
  }

  .cta-btn-primary,
  .cta-btn-secondary {
    padding: 0.7rem 1.8rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<template>
  <div class="hero-section">
    <!-- 状态徽章 -->
    <div class="hero-badge">
      <span class="hero-badge-dot"></span>
      系统稳定运行中
    </div>

    <!-- 主标题 -->
    <h1 class="hero-title">Q云端代挂</h1>

    <!-- 副标题 -->
    <p class="hero-subtitle">
      新一代智能 QQ 机器人代挂平台，支持多种自动化功能<br/>让您的账号管理更加轻松高效
    </p>
    <p class="hero-tip">
      💡 TIPS：所有QQ代挂即利用程序登录QQ账号来实现各种自动化效果，如自定义回复、定时消息发送等
    </p>

    <!-- ===== AI 智能助手亮点区块 ===== -->
    <div class="ai-highlight">
      <div class="ai-header">
        <div class="ai-icon-wrapper">
          <span class="ai-icon">🤖</span>
        </div>
        <div class="ai-title">
          系统已接入 <span class="ai-title-gradient">AI 智能助手</span><br/>帮助您快捷操作与管理
        </div>
      </div>
      <div class="ai-desc">
        🧠 通过 AI 技术，您可以更快速地完成配置调整、任务创建、数据查询等操作。AI 助手能够理解您的意图，智能推荐最佳设置方案，大幅提升使用效率。
      </div>
      <div class="ai-features">
        <span class="ai-feature-tag"><span class="tag-dot"></span>智能配置推荐</span>
        <span class="ai-feature-tag"><span class="tag-dot"></span>一键任务创建</span>
        <span class="ai-feature-tag"><span class="tag-dot"></span>自然语言交互</span>
        <span class="ai-feature-tag"><span class="tag-dot"></span>智能数据查询</span>
        <span class="ai-feature-tag"><span class="tag-dot"></span>操作辅助引导</span>
      </div>
    </div>

    <!-- ===== 功能卡片展示 ===== -->
    <div class="features-section">
      <div class="features-section-title">核心功能</div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">👂</div>
          <div class="feature-name">撤回监听</div>
          <div class="feature-desc">实时监听消息撤回，防止重要信息遗漏</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔥</div>
          <div class="feature-name">自动续火</div>
          <div class="feature-desc">自动维持群聊活跃度，保持好友火苗不断</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⏰</div>
          <div class="feature-name">定时消息</div>
          <div class="feature-desc">预设消息定时自动发送，解放您的双手</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <div class="feature-name">被动续火</div>
          <div class="feature-desc">智能响应触发续火机制，省心又省力</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔧</div>
          <div class="feature-name">自定义功能</div>
          <div class="feature-desc">灵活调用自定义插件，满足个性化需求</div>
        </div>
      </div>
    </div>

    <!-- ===== 底部 CTA ===== -->
    <div class="cta-section">
      <div class="price-tag">
        按月续租 · 新开月租仅 <span class="price-highlight">1元/月</span>
      </div>
      <div class="cta-row">
        <RouterLink to="/join" class="cta-btn-primary">
          现在开始 →
        </RouterLink>
        <RouterLink to="/login" class="cta-btn-secondary">
          登录页面
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

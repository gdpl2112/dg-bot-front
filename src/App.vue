<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'
import router from "@/router";
import {ref} from "vue";

/** 导航栏菜单项配置 */
const navItems = [
  {label: '首页', route: '/'},
  {label: '个人信息', route: '/bot'},
  {label: '博客', href: 'https://kloping.top/'},
  {label: '请求帮助', route: '/join'},
  {label: '更多功能，敬请期待'},
]

/** 移动端导航菜单展开状态 */
const navExpanded = ref(false)

/** 当前路由信息，用于高亮当前页面对应的导航项 */
const currentRoute = useRoute()

/**
 * 判断菜单项是否与当前路由匹配
 * @param route 菜单项路由地址
 * @return 当前路由是否匹配
 */
function isRouteActive(route?: string) {
  return !!route && currentRoute.path === route
}

/**
 * 跳转到指定路由
 * @param route 目标路由地址
 */
function pushRoute(route: string) {
  navExpanded.value = false
  router.push(route)
}
</script>

<template>
  <nav class="app-navbar">
    <div class="nav-header">
      <button class="brand-button" type="button" aria-label="返回首页" @click="pushRoute('/')">
        <img class="nav-logo" src="http://kloping.top/icon.jpg" alt="qq">
        <span class="brand-text">Q云端代挂</span>
      </button>
      <button class="navbar-toggler" type="button" :aria-expanded="navExpanded"
              aria-controls="navbarSupportedContent" aria-label="Toggle navigation"
              @click="navExpanded = !navExpanded">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>

    <div class="navbar-collapse" :class="{ show: navExpanded }" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item" v-for="item in navItems" :key="item.label">
          <button v-if="item.route" class="nav-btn"
                  :class="isRouteActive(item.route) ? 'nav-btn-active' : 'nav-btn-default'"
                  type="button" @click="pushRoute(item.route)">
            {{ item.label }}
          </button>
          <a v-else-if="item.href" class="nav-btn nav-btn-default"
             :href="item.href" target="_blank" rel="noreferrer" @click="navExpanded = false">
            {{ item.label }}
          </a>
          <span v-else class="nav-disabled">{{ item.label }}</span>
        </li>
      </ul>
      <div class="nav-github">
        <a class="github-link" target="_blank" rel="noreferrer" href="https://github.com/gdpl2112/dg-bot"
           @click="navExpanded = false">
          <img class="github-icon" alt="github" loading="lazy"
               src="https://s.nmxc.ltd/sakurairo_vision/@2.6/display_icon/sora/github.png">
          <span>GitHub 开源地址</span>
        </a>
      </div>
    </div>
  </nav>

  <main class="app-main">
    <RouterView/>
  </main>

  <footer class="app-footer tm-0">
    <div class="footer-content">
      <p>Powered by GitHub@<strong>kloping</strong></p>
      <p>更新时间 <strong>26/04/27</strong></p>
    </div>
  </footer>
</template>

<style scoped>
/* 顶部导航栏 */
.app-navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: saturate(130%) blur(14px);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.1);
  margin: 0.75rem auto 0;
  padding: 0.75rem 1rem;
  width: calc(100% - 2rem);
  max-width: 1180px;
}

/* 导航顶部行：品牌与折叠按钮 */
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-shrink: 0;
  width: auto;
}

/* 品牌入口按钮 */
.brand-button {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  border: 0;
  background: transparent;
  min-width: 0;
  padding: 0;
  color: #0f172a;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 800;
  text-align: left;
}

.brand-button:focus-visible {
  outline: 2px solid rgba(255, 79, 152, 0.3);
  outline-offset: 4px;
  border-radius: 12px;
}

.navbar-brand {
  display: inline-flex;
  align-items: center;
  margin-right: 0.25rem;
}

.navbar-toggler {
  display: none;
  border: 1px solid rgba(37, 99, 235, 0.18);
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(241, 245, 249, 0.98));
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
  padding: 0.5rem 0.7rem;
}

.navbar-toggler-icon {
  display: block;
  width: 1.35rem;
  height: 1rem;
  background: linear-gradient(#1f2937, #1f2937) 0 0 / 100% 2px no-repeat,
  linear-gradient(#1f2937, #1f2937) 0 50% / 100% 2px no-repeat,
  linear-gradient(#1f2937, #1f2937) 0 100% / 100% 2px no-repeat;
}

.navbar-collapse {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  justify-content: flex-start;
  gap: 1rem;
  width: auto;
}

.navbar-nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-item {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.nav-logo {
  opacity: 0.88;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s;
}

.nav-logo:hover {
  transform: scale(1.08);
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 999px;
  font-weight: 600;
  margin: 0;
  min-height: 2.55rem;
  padding: 0.5rem 1rem;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn-default {
  background: rgba(248, 250, 252, 0.98);
  border-color: rgba(148, 163, 184, 0.35);
  color: #0f172a;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
}

.nav-btn-default:hover {
  background: rgba(226, 232, 240, 0.98);
  border-color: rgba(100, 116, 139, 0.4);
  color: #0f172a;
  transform: translateY(-1px);
}

.nav-btn-active {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  border-color: #1d4ed8;
  color: #ffffff;
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.24);
}

.nav-btn-active:hover {
  color: #ffffff;
  transform: translateY(-1px);
}

.nav-disabled {
  display: inline-flex;
  align-items: center;
  min-height: 2.55rem;
  padding: 0.5rem 0.2rem;
  color: #64748b;
  font-size: 0.95rem;
}

/* GitHub 链接区域 */
.nav-github {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: auto;
}

.github-link {
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.03);
  padding: 0.48rem 0.88rem;
  color: #0f172a;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.2s;
}

.github-link:hover {
  color: #1d4ed8;
  border-color: rgba(37, 99, 235, 0.18);
  background: rgba(37, 99, 235, 0.08);
}

.github-icon {
  opacity: 0.95;
  width: 22px;
  height: 22px;
}

/* 主内容区域 */
.app-main {
  width: calc(100% - 2rem);
  max-width: 1180px;
  margin: 1.35rem auto 2rem;
  min-height: 60vh;
}

/* 页脚 */
.app-footer {
  text-align: center;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.footer-content {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(6px);
  border-radius: 20px;
  padding: 1rem 2.5rem;
  color: #555;
  font-size: 0.9rem;
  line-height: 1.8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.footer-content p {
  margin: 0;
}

@media (max-width: 768px) {
  .app-navbar {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 0.85rem;
    width: calc(100% - 0.75rem);
    margin-top: 0.5rem;
    padding: 0.75rem;
  }

  .nav-header {
    width: 100%;
    padding-bottom: 0.35rem;
    border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  }

  .brand-text {
    display: none;
  }

  .navbar-toggler {
    display: inline-flex;
  }

  .navbar-collapse {
    display: none;
    flex-basis: 100%;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 0.75rem;
  }

  .navbar-collapse.show {
    display: flex;
  }

  .navbar-nav {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 0.55rem;
    flex-wrap: nowrap;
  }

  .nav-item {
    width: 100%;
  }

  .nav-btn,
  .nav-disabled {
    width: 100%;
    margin: 0;
    text-align: center;
  }

  .nav-github {
    width: 100%;
    justify-content: center;
    order: 2;
    margin-left: 0;
  }

  .github-link {
    width: 100%;
    justify-content: center;
    padding: 0.65rem 0.9rem;
  }

  .navbar-nav {
    order: 1;
  }

  .app-main {
    width: calc(100% - 0.75rem);
    margin-top: 1rem;
  }

  .footer-content {
    width: calc(100% - 1rem);
    padding: 0.9rem 1rem;
  }
}
</style>

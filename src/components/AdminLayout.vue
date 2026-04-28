<script setup lang="ts">
import {RouterView, useRoute, useRouter} from 'vue-router'
import {ref, computed, onMounted, onUnmounted} from 'vue'
import axios from '@/axios_in'

/**
 * 后台管理布局组件
 * 提供左侧导航栏 + 顶部头部 + 主内容区的传统后台管理布局
 */

const route = useRoute()
const router = useRouter()

/** 侧边栏折叠状态 */
const sidebarCollapsed = ref(false)

/** 移动端侧边栏展开状态 */
const mobileMenuOpen = ref(false)

/** 用户角色（admin/user） */
const userRole = ref('')

/** 侧边栏菜单配置（连接配置仅管理员可见） */
const allMenuItems = [
  {label: '个人中心', route: '/bot', icon: '👤', adminOnly: false},
  {label: '配置中心', route: '/conf', icon: '⚙️', adminOnly: false},
  {label: '管理员管理', route: '/manager', icon: '🛡️', adminOnly: false},
  {label: '定时任务', route: '/cron-list', icon: '⏰', adminOnly: false},
  {label: '回复词', route: '/passive', icon: '💬', adminOnly: false},
  {label: '调用API', route: '/callapi', icon: '🔗', adminOnly: false},
  {label: '内置扩展', route: '/optsv', icon: '📦', adminOnly: false},
  {label: 'V11功能', route: '/v11c', icon: '🔧', adminOnly: false},
  {label: '连接配置', route: '/conn-conf', icon: '🌐', adminOnly: true},
]

/** 根据角色过滤后的菜单项 */
const menuItems = computed(() => {
  return allMenuItems.filter(item => !item.adminOnly || userRole.value === 'admin')
})

/**
 * 判断菜单项是否激活
 * @param path 菜单路由路径
 * @return 是否为当前激活菜单
 */
function isActive(path: string): boolean {
  return route.path === path
}

/**
 * 跳转到指定路由
 * @param path 目标路由
 */
function navigateTo(path: string) {
  mobileMenuOpen.value = false
  router.push(path)
}

/** 当前页面标题，根据路由动态计算 */
const currentPageTitle = computed(() => {
  const item = menuItems.value.find(m => m.route === route.path)
  return item ? item.label : '后台管理'
})

/**
 * 退出登录，返回首页
 */
function handleLogout() {
  router.push('/')
}

/**
 * 切换侧边栏折叠
 */
function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

/**
 * 切换移动端菜单
 */
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

/** 组件挂载时添加管理布局body类并获取用户角色 */
onMounted(() => {
  document.body.classList.add('admin-body')
  axios.get('/api/user').then(response => {
    userRole.value = response.data.role || 'user'
  }).catch(() => {
    userRole.value = 'user'
  })
})

/** 组件卸载时移除管理布局body类 */
onUnmounted(() => {
  document.body.classList.remove('admin-body')
})
</script>

<template>
  <div class="admin-layout" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
    <!-- 移动端遮罩 -->
    <div v-if="mobileMenuOpen" class="mobile-overlay" @click="mobileMenuOpen = false"></div>

    <!-- 左侧边栏 -->
    <aside class="admin-sidebar" :class="{ 'mobile-open': mobileMenuOpen }">
      <!-- Logo区域 -->
      <div class="sidebar-header">
        <img class="sidebar-logo" src="http://kloping.top/icon.jpg" alt="Logo">
        <span v-if="!sidebarCollapsed" class="sidebar-title">Q云端代挂</span>
      </div>

      <!-- 导航菜单 -->
      <nav class="sidebar-nav">
        <div
          v-for="item in menuItems"
          :key="item.route"
          :class="['nav-menu-item', isActive(item.route) ? 'nav-menu-item-active' : '']"
          @click="navigateTo(item.route)"
        >
          <span class="nav-menu-icon">{{ item.icon }}</span>
          <span v-if="!sidebarCollapsed" class="nav-menu-label">{{ item.label }}</span>
        </div>
      </nav>

      <!-- 底部折叠按钮 -->
      <div class="sidebar-footer">
        <button class="collapse-btn" @click="toggleSidebar" :title="sidebarCollapsed ? '展开' : '收起'">
          <span class="collapse-icon" :class="{ 'collapsed': sidebarCollapsed }">◀</span>
        </button>
      </div>
    </aside>

    <!-- 右侧主体区域 -->
    <div class="admin-main">
      <!-- 顶部头部 -->
      <header class="admin-header">
        <div class="header-left">
          <!-- 移动端菜单按钮 -->
          <button class="mobile-menu-btn" @click="toggleMobileMenu">
            <span class="hamburger-icon">☰</span>
          </button>
          <h2 class="header-title">{{ currentPageTitle }}</h2>
        </div>
        <div class="header-right">
          <a class="github-link" target="_blank" rel="noreferrer" href="https://github.com/gdpl2112/dg-bot">
            <img class="github-icon" alt="github" loading="lazy"
                 src="https://s.nmxc.ltd/sakurairo_vision/@2.6/display_icon/sora/github.png">
            <span>GitHub</span>
          </a>
          <button class="logout-btn" @click="handleLogout">退出</button>
        </div>
      </header>

      <!-- 内容区域 -->
      <div class="admin-content">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 管理布局容器 */
.admin-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* 左侧边栏 */
.admin-sidebar {
  width: 220px;
  background: #1e293b;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: width 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  overflow-y: auto;
}

.sidebar-collapsed .admin-sidebar {
  width: 64px;
}

/* 侧边栏头部 */
.sidebar-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar-logo {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #f1f5f9;
  white-space: nowrap;
  overflow: hidden;
}

/* 导航菜单 */
.sidebar-nav {
  flex: 1;
  padding: 0.75rem 0;
}

.nav-menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 1.25rem;
  cursor: pointer;
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
}

.nav-menu-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #e2e8f0;
}

.nav-menu-item-active {
  background: rgba(37, 99, 235, 0.2);
  color: #60a5fa;
  border-right: 3px solid #3b82f6;
}

.nav-menu-item-active:hover {
  background: rgba(37, 99, 235, 0.25);
  color: #93bbfd;
}

.nav-menu-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
  width: 24px;
  text-align: center;
}

.nav-menu-label {
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 侧边栏底部折叠按钮 */
.sidebar-footer {
  padding: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem;
  border: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s;
}

.collapse-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #e2e8f0;
}

.collapse-icon {
  transition: transform 0.3s;
  font-size: 0.85rem;
}

.collapse-icon.collapsed {
  transform: rotate(180deg);
}

/* 右侧主体 */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-left: 220px;
  transition: margin-left 0.3s ease;
}

.sidebar-collapsed .admin-main {
  margin-left: 64px;
}

/* 顶部头部 */
.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 56px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: saturate(130%) blur(14px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-menu-btn {
  display: none;
  border: 0;
  background: transparent;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  color: #0f172a;
}

.mobile-menu-btn:hover {
  background: rgba(15, 23, 42, 0.06);
}

.header-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.github-link {
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.03);
  padding: 0.35rem 0.75rem;
  color: #0f172a;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s;
}

.github-link:hover {
  color: #1d4ed8;
  border-color: rgba(37, 99, 235, 0.18);
  background: rgba(37, 99, 235, 0.08);
}

.github-icon {
  width: 18px;
  height: 18px;
  opacity: 0.9;
}

.logout-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  border: 1px solid rgba(220, 38, 38, 0.25);
  background: rgba(220, 38, 38, 0.06);
  color: #dc2626;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.logout-btn:hover {
  background: rgba(220, 38, 38, 0.12);
  border-color: rgba(220, 38, 38, 0.4);
}

/* 内容区域 */
.admin-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

/* 移动端遮罩 */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .admin-sidebar {
    transform: translateX(-100%);
    width: 220px;
  }

  .admin-sidebar.mobile-open {
    transform: translateX(0);
  }

  .sidebar-collapsed .admin-sidebar {
    width: 220px;
  }

  .admin-main {
    margin-left: 0;
  }

  .sidebar-collapsed .admin-main {
    margin-left: 0;
  }

  .mobile-menu-btn {
    display: inline-flex;
  }

  .admin-content {
    padding: 1rem;
  }

  .github-link span {
    display: none;
  }
}
</style>

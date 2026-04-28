<style scoped>
.conn-form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.conn-form-field label {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.25rem;
}
.conn-form-field input,
.conn-form-field select {
  width: 100%;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 10px;
  padding: 0.45rem 0.75rem;
  font-size: 0.88rem;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  transition: border-color 0.2s;
}
.conn-form-field input:focus,
.conn-form-field select:focus {
  border-color: rgba(37, 99, 235, 0.35);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
.conn-table-wrap {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.06);
}
.conn-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}
.conn-table th {
  background: rgba(241, 245, 249, 0.98);
  padding: 0.65rem 0.85rem;
  text-align: left;
  font-weight: 600;
  color: #475569;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}
.conn-table td {
  padding: 0.55rem 0.85rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.04);
  color: #0f172a;
}
.conn-table tr:hover td { background: rgba(248, 250, 252, 0.6); }
.pagination-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
.page-btn {
  padding: 0.3rem 0.6rem;
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.2s;
}
.page-btn-active {
  background: rgba(37, 99, 235, 0.12);
  border-color: rgba(37, 99, 235, 0.3);
  color: #2563eb;
  font-weight: 600;
}
.page-btn:disabled { opacity: 0.4; cursor: default; }
</style>

<template>
  <div class="page-card">
    <h1 class="page-title">连接配置管理</h1>
    <div class="info-bar">管理 WebSocket 和 Server-Sent Events 连接配置</div>

    <!-- 表单区域 -->
    <div class="v11-card" style="margin-bottom:0.75rem">
      <div class="v11-card-title">{{ isEditing ? '编辑配置' : '新增配置' }}</div>
      <div class="v11-card-sub">{{ isEditing ? '修改现有连接配置' : '添加一个新的连接配置' }}</div>
      <form @submit.prevent="saveConfig">
        <div class="conn-form-grid">
          <div class="conn-form-field">
            <label>Bot账号(QQ号) *</label>
            <input type="text" v-model="currentConfig.qid" required>
          </div>
          <div class="conn-form-field">
            <label>服务器IP *</label>
            <input type="text" v-model="currentConfig.ip" required>
          </div>
          <div class="conn-form-field">
            <label>端口号 *</label>
            <input type="number" v-model.number="currentConfig.port" required>
          </div>
          <div class="conn-form-field">
            <label>连接类型 *</label>
            <select v-model="currentConfig.type" required>
              <option value="ws">WebSocket (ws)</option>
              <option value="se">Server-Sent Events (se)</option>
            </select>
          </div>
          <div class="conn-form-field">
            <label>心跳间隔(秒)</label>
            <input type="number" v-model.number="currentConfig.heart" placeholder="可选">
          </div>
          <div class="conn-form-field">
            <label>认证令牌</label>
            <input type="text" v-model="currentConfig.token" placeholder="可选">
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:0.5rem">
          <button type="button" class="action-btn action-btn-outline" @click="resetForm" v-if="isEditing">取消</button>
          <button type="submit" class="action-btn action-btn-primary">{{ isEditing ? '更新' : '添加' }}</button>
        </div>
      </form>
    </div>

    <!-- 配置列表 -->
    <div class="v11-card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem">
        <div class="v11-card-title" style="margin-bottom:0">配置列表</div>
        <div style="display:flex;gap:0.5rem">
          <input type="text" v-model="searchKeyword" placeholder="搜索配置..."
                 style="border:1px solid rgba(15,23,42,0.12);border-radius:10px;padding:0.35rem 0.75rem;font-size:0.82rem;outline:none;min-width:160px">
          <button class="action-btn action-btn-outline" @click="loadConfigs">刷新</button>
        </div>
      </div>

      <div class="conn-table-wrap">
        <table class="conn-table">
          <thead>
            <tr>
              <th>Bot账号</th>
              <th>IP地址</th>
              <th>端口</th>
              <th>类型</th>
              <th>令牌</th>
              <th>心跳</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="config in filteredConfigs" :key="config.qid">
              <td>{{ config.qid }}</td>
              <td>{{ config.ip }}</td>
              <td>{{ config.port }}</td>
              <td>
                <span class="status-badge" :class="config.type === 'ws' ? 'status-badge-success' : 'status-badge-info'">
                  {{ config.type }}
                </span>
              </td>
              <td>{{ config.token || '-' }}</td>
              <td>{{ config.heart || '-' }}</td>
              <td>
                <button class="action-btn action-btn-outline" style="font-size:0.78rem;padding:0.2rem 0.5rem" @click="editConfig(config)">编辑</button>
                <button class="action-btn action-btn-danger" style="font-size:0.78rem;padding:0.2rem 0.5rem" @click="deleteConfig(config.qid)">删除</button>
              </td>
            </tr>
            <tr v-if="filteredConfigs.length === 0">
              <td colspan="7" style="text-align:center;color:#94a3b8;padding:1.5rem">暂无配置数据</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination-row">
        <span style="font-size:0.82rem;color:#64748b">共 {{ pagination.total }} 条</span>
        <div style="display:flex;gap:0.25rem;align-items:center">
          <button class="page-btn" :disabled="pagination.current === 1" @click="changePage(pagination.current - 1)">上一页</button>
          <button v-for="page in pageNumbers" :key="page"
                  :class="['page-btn', page === pagination.current ? 'page-btn-active' : '']"
                  @click="changePage(page)">{{ page }}</button>
          <button class="page-btn" :disabled="pagination.current === pagination.pages" @click="changePage(pagination.current + 1)">下一页</button>
        </div>
        <select v-model="pagination.size" @change="changePageSize"
                style="border:1px solid rgba(15,23,42,0.1);border-radius:8px;padding:0.25rem 0.5rem;font-size:0.82rem;outline:none">
          <option value="5">5条/页</option>
          <option value="10">10条/页</option>
          <option value="20">20条/页</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import axios from "@/axios_in";

/** 连接配置项接口 */
interface ConnConfig {
  qid: string;
  ip: string;
  port: number;
  type: string;
  token?: string;
  heart?: number;
}

/** 当前编辑的配置 */
const currentConfig = reactive<ConnConfig>({
  qid: '',
  ip: '',
  port: 8080,
  type: 'ws',
  token: '',
  heart: 30
});

/** 配置列表 */
const configs = ref<ConnConfig[]>([]);

/** 分页信息 */
const pagination = reactive({
  total: 0,
  current: 1,
  pages: 0,
  size: 10
});

/** 搜索关键词 */
const searchKeyword = ref('');

/** 是否正在编辑 */
const isEditing = ref(false);

/** 根据搜索关键词过滤配置列表 */
const filteredConfigs = computed(() => {
  if (!searchKeyword.value) {
    return configs.value;
  }
  const keyword = searchKeyword.value.toLowerCase();
  return configs.value.filter(config => 
    config.qid.includes(keyword) ||
    config.ip.toLowerCase().includes(keyword) ||
    config.port.toString().includes(keyword) ||
    config.type.toLowerCase().includes(keyword) ||
    (config.token && config.token.toLowerCase().includes(keyword))
  );
});

/** 计算分页页码范围 */
const pageNumbers = computed(() => {
  const pages: number[] = [];
  const currentPage = pagination.current;
  const totalPages = pagination.pages;
  
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, currentPage + 2);
  
  if (end - start < 4) {
    if (start === 1) {
      end = Math.min(totalPages, start + 4);
    } else {
      start = Math.max(1, end - 4);
    }
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

/** 加载配置列表（分页） */
const loadConfigs = () => {
  axios.get("/api/conn-config/page", {
    params: {
      page: pagination.current,
      size: pagination.size
    }
  })
  .then(response => {
    const data = response.data;
    if (data.code === 200) {
      configs.value = data.data.records;
      pagination.total = data.data.total;
      pagination.current = data.data.current;
      pagination.pages = data.data.pages;
    } else {
      alert("加载配置失败: " + data.message);
    }
  })
  .catch(error => {
    console.error("加载配置时出错:", error);
    alert("加载配置失败，请查看控制台了解详细信息");
  });
};

/** 保存配置（新增或更新） */
const saveConfig = () => {
  if (!currentConfig.qid || !currentConfig.ip || !currentConfig.port || !currentConfig.type) {
    alert("请填写必填字段");
    return;
  }

  const configToSave = { ...currentConfig };
  
  if (isEditing.value) {
    // 更新配置
    axios.post("/api/conn-config/update", configToSave)
      .then(response => {
        const data = response.data;
        if (data.code === 200) {
          alert("配置更新成功");
          resetForm();
          loadConfigs();
        } else {
          alert("配置更新失败: " + data.message);
        }
      })
      .catch(error => {
        console.error("更新配置时出错:", error);
        alert("配置更新失败，请查看控制台了解详细信息");
      });
  } else {
    // 新增配置
    axios.post("/api/conn-config/add", configToSave)
      .then(response => {
        const data = response.data;
        if (data.code === 200) {
          alert("配置添加成功");
          resetForm();
          loadConfigs();
        } else {
          alert("配置添加失败: " + data.message);
        }
      })
      .catch(error => {
        console.error("添加配置时出错:", error);
        alert("配置添加失败，请查看控制台了解详细信息");
      });
  }
};

/**
 * 填充表单进入编辑模式
 * @param config 要编辑的配置对象
 */
const editConfig = (config: ConnConfig) => {
  Object.assign(currentConfig, config);
  isEditing.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * 删除指定配置
 * @param id 配置ID(Bot QQ号)
 */
const deleteConfig = (id: string) => {
  if (!confirm("确定要删除这个配置吗？")) {
    return;
  }
  
  axios.post("/api/conn-config/delete", null, {
    params: { id }
  })
  .then(response => {
    const data = response.data;
    if (data.code === 200) {
      alert("配置删除成功");
      loadConfigs();
    } else {
      alert("配置删除失败: " + data.message);
    }
  })
  .catch(error => {
    console.error("删除配置时出错:", error);
    alert("配置删除失败，请查看控制台了解详细信息");
  });
};

/** 重置表单到初始状态 */
const resetForm = () => {
  Object.assign(currentConfig, {
    qid: '',
    ip: '',
    port: 8080,
    type: 'ws',
    token: '',
    heart: 30
  });
  isEditing.value = false;
};

/**
 * 切换分页页码
 * @param page 目标页码
 */
const changePage = (page: number) => {
  if (page >= 1 && page <= pagination.pages) {
    pagination.current = page;
    loadConfigs();
  }
};

/** 更改每页条数并重新加载 */
const changePageSize = () => {
  pagination.current = 1;
  loadConfigs();
};

onMounted(() => {
  loadConfigs();
});
</script>
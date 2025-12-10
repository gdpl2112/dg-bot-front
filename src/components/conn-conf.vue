ci<style scoped>
.ma-2 {
  margin: 2px;
}

.card {
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.form-section {
  background-color: rgba(245, 245, 245, 0.8);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.btn-action {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>

<template>
  <div class="container">
    <h2 class="text-center my-4">连接配置管理</h2>
    <p class="text-center text-muted">管理 WebSocket 和 Server-Sent Events 连接配置</p>
    
    <div class="card form-section">
      <h5>{{ isEditing ? '编辑配置' : '新增配置' }}</h5>
      <p class="text-muted">{{ isEditing ? '修改现有连接配置' : '添加一个新的连接配置' }}</p>
      <form @submit.prevent="saveConfig">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="configQid" class="form-label">Bot账号(QQ号) *</label>
            <input type="text" class="form-control" id="configQid" v-model="currentConfig.qid" required>
          </div>
          
          <div class="col-md-6 mb-3">
            <label for="configIp" class="form-label">服务器IP *</label>
            <input type="text" class="form-control" id="configIp" v-model="currentConfig.ip" required>
          </div>
          
          <div class="col-md-6 mb-3">
            <label for="configPort" class="form-label">端口号 *</label>
            <input type="number" class="form-control" id="configPort" v-model.number="currentConfig.port" required>
          </div>
          
          <div class="col-md-6 mb-3">
            <label for="configType" class="form-label">连接类型 *</label>
            <select class="form-select" id="configType" v-model="currentConfig.type" required>
              <option value="ws">WebSocket (ws)</option>
              <option value="se">Server-Sent Events (se)</option>
            </select>
          </div>
          
          <div class="col-md-6 mb-3">
            <label for="configHeart" class="form-label">心跳间隔(秒)</label>
            <input type="number" class="form-control" id="configHeart" v-model.number="currentConfig.heart" 
                   placeholder="可选的心跳检测间隔(秒)">
          </div>
          
          <div class="col-md-12 mb-3">
            <label for="configToken" class="form-label">认证令牌</label>
            <input type="text" class="form-control" id="configToken" v-model="currentConfig.token" 
                   placeholder="可选的认证令牌">
          </div>
        </div>
        
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-secondary me-2" @click="resetForm" v-if="isEditing">取消</button>
          <button type="submit" class="btn btn-primary">{{ isEditing ? '更新' : '添加' }}</button>
        </div>
      </form>
    </div>
    
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5>配置列表</h5>
        <div class="d-flex">
          <input type="text" class="form-control form-control-sm me-2" placeholder="搜索配置..." v-model="searchKeyword">
          <button class="btn btn-sm btn-outline-primary" @click="loadConfigs">刷新</button>
        </div>
      </div>
      
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Bot账号(QQ号)</th>
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
                <span class="badge" :class="config.type === 'ws' ? 'bg-primary' : 'bg-success'">{{ config.type }}</span>
              </td>
              <td>{{ config.token || '-' }}</td>
              <td>{{ config.heart || '-' }}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary btn-action" @click="editConfig(config)">编辑</button>
                <button class="btn btn-sm btn-outline-danger btn-action" @click="deleteConfig(config.qid)">删除</button>
              </td>
            </tr>
            <tr v-if="filteredConfigs.length === 0">
              <td colspan="6" class="text-center">暂无配置数据</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="card-footer d-flex justify-content-between align-items-center">
        <div>总共 {{ pagination.total }} 条记录</div>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item" :class="{ disabled: pagination.current === 1 }">
              <a class="page-link" href="#" @click.prevent="changePage(pagination.current - 1)">上一页</a>
            </li>
            <li class="page-item" v-for="page in pageNumbers" :key="page" :class="{ active: page === pagination.current }">
              <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: pagination.current === pagination.pages }">
              <a class="page-link" href="#" @click.prevent="changePage(pagination.current + 1)">下一页</a>
            </li>
          </ul>
        </nav>
        <div>
          <select class="form-select form-select-sm" v-model="pagination.size" @change="changePageSize">
            <option value="5">每页 5 条</option>
            <option value="10">每页 10 条</option>
            <option value="20">每页 20 条</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import axios from "@/axios_in";

// 定义配置项接口
interface ConnConfig {
  qid: string;
  ip: string;
  port: number;
  type: string;
  token?: string;
  heart?: number;
}

// 当前编辑的配置
const currentConfig = reactive<ConnConfig>({
  qid: '',
  ip: '',
  port: 8080,
  type: 'ws',
  token: '',
  heart: 30
});

// 配置列表
const configs = ref<ConnConfig[]>([]);

// 分页信息
const pagination = reactive({
  total: 0,
  current: 1,
  pages: 0,
  size: 10
});

// 搜索关键词
const searchKeyword = ref('');

// 是否正在编辑
const isEditing = ref(false);

// 计算过滤后的配置列表
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

// 计算分页页码
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

// 加载配置列表
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

// 保存配置（新增或更新）
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

// 编辑配置
const editConfig = (config: ConnConfig) => {
  Object.assign(currentConfig, config);
  isEditing.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 删除配置
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

// 重置表单
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

// 切换页面
const changePage = (page: number) => {
  if (page >= 1 && page <= pagination.pages) {
    pagination.current = page;
    loadConfigs();
  }
};

// 更改页面大小
const changePageSize = () => {
  pagination.current = 1;
  loadConfigs();
};

// 组件挂载时加载数据
onMounted(() => {
  loadConfigs();
});
</script>
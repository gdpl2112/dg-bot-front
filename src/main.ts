import './assets/main.css'
import 'element-plus/dist/index.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const app = createApp(App)

app.use(router)
app.use(ElementPlus, { locale: zhCn })
app.config.globalProperties.$ = $;
app.mount('#app')

import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from "path";

let baseUrl = 'http://127.0.0.1:34740/'
// let baseUrl = 'http://192.168.1.11:34740/'
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    }, server: {
        host: '0.0.0.0', // 这个用于启动
        // port: 34740, // 指定启动端口
        open: false, //启动后是否自动打开浏览器
        proxy: {
            '/api': {
                target: baseUrl,
                changeOrigin: false,
                // rewrite: (path) => path.replace(/^\/api/, '/api')
            }, '/bot/login': {
                target: baseUrl,
                changeOrigin: false,
            }
        }
    }
})

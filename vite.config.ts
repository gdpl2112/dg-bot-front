import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from "path";

let baseUrl = 'http://127.0.0.1:34740/'
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
        disableHostCheck: true,
        host: '0.0.0.0', // 这个用于启动
        // port: 34740, // 指定启动端口
        open: false, //启动后是否自动打开浏览器
        proxy: {
            '/pre': {
                target: baseUrl,
                changeOrigin: false,
                // rewrite: (path) => path.replace(/^\/api/, '/api')
            }, '/bot/login': {
                target: baseUrl,
                changeOrigin: false,
            }, '/statistics': {
                target: baseUrl,
                changeOrigin: false,
            }, '/user': {
                target: baseUrl,
                changeOrigin: false,
            }, '/code-modify': {
                target: baseUrl,
                changeOrigin: false,
            }, '/get-exception': {
                target: baseUrl,
                changeOrigin: false,
            }, '/config': {
                target: baseUrl,
                changeOrigin: false,
            },'/cron-del': {
                target: baseUrl,
                changeOrigin: false,
            },'/cron-list': {
                target: baseUrl,
                changeOrigin: false,
            },'/cronAdd': {
                target: baseUrl,
                changeOrigin: false,
            },'/p-del': {
                target: baseUrl,
                changeOrigin: false,
            },'/p-add': {
                target: baseUrl,
                changeOrigin: false,
            },'/opts': {
                target: baseUrl,
                changeOrigin: false,
            },'/ca': {
                target: baseUrl,
                changeOrigin: false,
            },'/m': {
                target: baseUrl,
                changeOrigin: false,
            },'/gc0': {
                target: baseUrl,
                changeOrigin: false,
            },'/gc1': {
                target: baseUrl,
                changeOrigin: false,
            },'/gc2': {
                target: baseUrl,
                changeOrigin: false,
            },'/mlist': {
                target: baseUrl,
                changeOrigin: false,
            },'/mdel': {
                target: baseUrl,
                changeOrigin: false,
            },'/m_add': {
                target: baseUrl,
                changeOrigin: false,
            },'/mlist': {
                target: baseUrl,
                changeOrigin: false,
            },'/glist': {
                target: baseUrl,
                changeOrigin: false,
            },
        }
    }
})

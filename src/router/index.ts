
import {createRouter, createWebHistory} from 'vue-router'

import index from '../views/index.vue'
import join from '../views/join.vue'
import login from '../views/login.vue'
import manager from '../components/manager.vue'
import bot from '../components/bot.vue'
import conf from '../components/conf.vue'
import cronList from '@/components/cron-list.vue'
import cron from '@/components/cron.vue'
import passive from '../components/passive.vue'
import optsv from '../components/optsv.vue'
import callapi from '../components/callapi.vue'
import um from '../components/um.vue'
import v11c from '../components/v11conf.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: index,
        }, {
            path: '/join',
            name: 'join',
            component: join,
        }, {
            path: '/login',
            name: 'login',
            component: login,
        }, {
            path: '/manager',
            name: 'manager',
            component: manager,
        }, {
            path: '/bot',
            name: 'bot',
            component: bot,
        }, {
            path: '/conf',
            name: 'conf',
            component: conf,
        }, {
            path: '/cron-list',
            name: 'cron-list',
            component: cronList,
        }, {
            path: '/cron',
            name: 'cron',
            component: cron,
        }, {
            path: '/passive',
            name: 'passive',
            component: passive,
        }, {
            path: '/optsv',
            name: 'opts',
            component: optsv,
        }, {
            path: '/callapi',
            name: 'callapi',
            component: callapi,
        }, {
            path: '/um',
            name: 'um',
            component: um,
        },{
            path: '/v11c',
            name: 'v11c',
            component: v11c,
        },
    ],
})

export default router

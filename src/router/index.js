import Vue from 'vue'
import Router from 'vue-router'

import login from '@/pages/login'
import manage from '@/pages/manage'
import tomato from '@/pages/tomato'
import todo from '@/pages/todo'
import statistics from '@/pages/statistics'



Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: login
    }, {
        path: '/home',
        component: manage,
        name: '',
        children: [{
            path: '',
            component: tomato,
            meta: [],
        }, {
            path: '/tomato',
            component: tomato,
            meta: ['番茄钟']
        }, {
            path: '/todo',
            component: todo,
            meta: ['待办']
        }, {
            path: '/statistics',
            component: statistics,
            meta: ['统计数据']
        }]
    }]
})
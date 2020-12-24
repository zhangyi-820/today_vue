// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入ElementUI相关
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs';
import axios from 'axios';
import VueCookies from 'vue-cookies' //引入VueCookies 



Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;
Vue.use(VueCookies);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
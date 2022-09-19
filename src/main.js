/*
 * @Author: yutao
 * @Date: 2022-09-17 16:14:31
 * @LastEditors: yutao
 * @LastEditTime: 2022-09-19 19:13:33
 * @Description: file content
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import { tab } from '../packages/layout/index';
import '@/assets/icons'; // icon

Vue.use(ElementUI);
Vue.prototype.$tab = tab;
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

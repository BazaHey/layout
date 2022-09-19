/*
 * @Author: yutao
 * @Date: 2022-09-17 16:14:31
 * @LastEditors: yutao
 * @LastEditTime: 2022-09-19 19:15:02
 * @Description: file content
 */
import Layout from './src/index.vue';
import ParentView from './src/ParentView';
import InnerLink from './src/InnerLink';
import tab from './src/plugins/tab';
import Vue from 'vue';
import eventBus from './src/plugins/eventBus_base';
Vue.prototype.$eventBus_base = eventBus;
export default Layout;
export { ParentView, InnerLink, tab };

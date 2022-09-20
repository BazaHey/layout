/*
 * @Author: yutao
 * @Date: 2022-09-19 13:52:46
 * @LastEditors: yutao
 * @LastEditTime: 2022-09-20 10:43:01
 * @Description: file content
 */
// import router from '@/router';
import eventBus from '../plugins/eventBus_base';
export default {
  $eventBus_base1: eventBus,
  // 刷新当前tab页签
  refreshPage(obj, router) {
    const { path, query, matched } = router.currentRoute;
    if (obj === undefined) {
      matched.forEach((m) => {
        if (m.components && m.components.default && m.components.default.name) {
          if (!['Layout', 'ParentView'].includes(m.components.default.name)) {
            obj = { name: m.components.default.name, path, query };
          }
        }
      });
    }
    this.$eventBus_base1.$emit('delCachedView', obj);
    // return store.dispatch('tagsView/delCachedView', obj).then(() => {
    //   const { path, query } = obj;
    //   router.replace({
    //     path: '/redirect' + path,
    //     query,
    //   });
    // });
  },
  // 关闭当前tab页签，打开新页签
  closeOpenPage(obj) {
    // store.dispatch('tagsView/delView', router.currentRoute);
    // if (obj !== undefined) {
    //   return router.push(obj);
    // }
  },
  // 关闭指定tab页签
  closePage(obj) {
    // debugger;
    // if (obj === undefined) {
    //   this.$eventBus_base1.$emit('delView', router.currentRoute);
    // }
    this.$eventBus_base1.$emit('delView', obj);

    // if (obj === undefined) {
    //   return store.dispatch('tagsView/delView', router.currentRoute).then(({ lastPath }) => {
    //     return router.push(lastPath || '/');
    //   });
    // }
    // return store.dispatch('tagsView/delView', obj);
  },
  // 关闭所有tab页签
  closeAllPage() {
    // return store.dispatch('tagsView/delAllViews');
    this.$eventBus_base1.$emit('delAllViews');
  },
  // 关闭左侧tab页签
  closeLeftPage(obj) {
    this.$eventBus_base1.$emit('delLeftTags', obj);
    // return store.dispatch('tagsView/delLeftTags', obj || router.currentRoute);
  },
  // 关闭右侧tab页签
  closeRightPage(obj) {
    // return store.dispatch('tagsView/delRightTags', obj || router.currentRoute);
    this.$eventBus_base1.$emit('delRightTags', obj);
  },
  // 关闭其他tab页签
  closeOtherPage(obj) {
    this.$eventBus_base1.$emit('delOthersVisitedViews', obj);
    // return store.dispatch('tagsView/delOthersViews', obj || router.currentRoute);
  },
  // 添加tab页签
  openPage(title, url, params) {
    // const obj = { path: url, meta: { title } };
    // store.dispatch('tagsView/addView', obj);
    // return router.push({ path: url, query: params });
  },
  // 修改tab页签
  updatePage(obj) {
    // return store.dispatch('tagsView/updateVisitedView', obj);
  },
};

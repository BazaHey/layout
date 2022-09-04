<template>
  <layout :logoTitle="logoTitle" :menuRoutes="menuRoutes" :settings="settings">
    <template v-slot:logo>
      <img
        src="https://ts1.cn.mm.bing.net/th/id/R-C.7db570f253315dc3d1a480b2d17ad1ed?rik=08rgwATqX5kw6w&riu=http%3a%2f%2fdzyl.xiangshenghang.com%2fuserfiles%2fimage%2ffilm_festival%2f20120117%2fpic%2fs%2f06.jpg&ehk=zx%2fJsIb83EhUbyBeDmpoo%2fw3kvSCpxfV%2fBZyKoH3B9A%3d&risl=&pid=ImgRaw&r=0"
      />
    </template>

    <template v-slot:rightMenu>
      <template v-if="'device' !== 'mobile'">
        <search id="header-search" class="right-menu-item" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="avatar" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="showSettings = true">
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>

    <template v-slot:default>
      <router-view></router-view>
    </template>
  </layout>
</template>

<script>
import router from '../router';
import Screenfull from '@/components/Screenfull';
import SizeSelect from '@/components/SizeSelect';
import Search from '@/components/HeaderSearch';
import Layout, { ParentView, InnerLink } from '../../packages/layout/index';
import { mockData } from '../mock/mockData';

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children);
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout;
      } else if (route.component === 'ParentView') {
        route.component = ParentView;
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children !== null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type);
    } else {
      delete route.children;
      delete route.redirect;
    }
    return true;
  });
}

function filterChildren(childrenMap, lastRouter = false) {
  let children = [];
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach((c) => {
          c.path = el.path + '/' + c.path;
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c));
            return;
          }
          children.push(c);
        });
        return;
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path;
    }
    children = children.concat(el);
  });
  return children;
}

export const loadView = (view) => {
  if (process.env.NODE_ENV === 'development') {
    return (resolve) => require([`@/views/${view}`], resolve);
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views/${view}`);
  }
};

export default {
  name: 'BasicLayout',
  components: {
    Layout,
    Screenfull,
    SizeSelect,
    Search,
  },
  data() {
    return {
      // logo 文本
      logoTitle: 'logo 文字测试',
      // 路由菜单
      menuRoutes: mockData,
      // 配置
      settings: {
        title: 'test',
        theme: '#409EFF', // 主题色
        sideTheme: 'theme-dark', // 左侧菜单栏主题色
        showSettings: false,
        topNav: false,
        tagsView: false,
        fixedHeader: false,
        sidebarLogo: true,
        dynamicTitle: true,
      },
    };
  },
  computed: {
    showSettings: {
      get() {
        return this.settings.showSettings;
      },
      set(val) {
        this.settings.showSettings = val;
      },
    },
  },
  mounted() {
    // 注册路由
    const rewriteRoutes = filterAsyncRouter(mockData, false, true);
    rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true });
    (rewriteRoutes || []).forEach((route) => {
      // 动态添加可访问路由表
      console.log(route.path);
      router.addRoute(route);
    });
  },
};
</script>

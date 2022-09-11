<template>
  <pro-layout :logoTitle="logoTitle" :menuRoutes="menuRoutes" :settings="settings" @changeSetting="handleSetting">
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
  </pro-layout>
</template>

<script>
import router from '../router';
import Screenfull from '@/components/Screenfull';
import SizeSelect from '@/components/SizeSelect';
import Search from '@/components/HeaderSearch';
import ProLayout from '../../packages/layout/index';
import { mockData } from '../mock/mockData';
import { filterAsyncRouter } from './utils';

export default {
  name: 'BasicLayout',
  components: {
    ProLayout,
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
        showSettings: false, // 显示配置项

        sideTheme: 'theme-dark', // 整体风格设置：亮色菜单风格、暗色菜单风格
        theme: '#409EFF', // 主题色

        navMode: '', // 导航模式：侧边菜单布局、顶部菜单布局、混合菜单布局
        fixedHeader: false, // 固定Header
        fixedSide: false, // 固定侧边菜单
        autoMenu: false, // 自动分割菜单

        showHeader: true, // 显示顶栏
        showSide: true, // 显示菜单，即显示侧边菜单
        showLogo: true, // 显示Logo

        showTagsView: false, // 显示页签
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
  methods: {
    handleSetting(obj) {
      const { key, value } = obj;
      this.settings[key] = value;
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
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
};
</script>

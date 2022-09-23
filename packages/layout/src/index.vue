<template>
  <div :class="classObj" class="thtf-pro-basicLayout" :style="{ '--current-color': settings.theme }">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar
      v-show="showSide"
      :device="device"
      :logoTitle="logoTitle"
      :sideTheme="settings.sideTheme"
      :theme="settings.theme"
      :showLogo="settings.showLogo && settings.navMode !== 'mix'"
      :fixedSide="settings.fixedSide"
      :sidebarOpened="sidebar.opened"
      :sidebarRoutes="sidebarRoutes"
      @toggleSidebar="toggleSidebar"
      class="sidebar-container"
      :class="{ 'sidebar-container-fixed': settings.fixedSide }"
      :style="{ paddingTop: settings.navMode === 'mix' ? `${headerHeight}px` : 0 }"
    />
    <div
      v-show="settings.fixedSide && showSide"
      class="sidebar-container-placeholder"
      :style="{ paddingTop: settings.navMode === 'mix' ? `${headerHeight}px` : 0 }"
    ></div>

    <div :class="{ fixedHeader: settings.fixedHeader }" class="main-container">
      <navbar
        v-if="settings.showHeader"
        :class="{ header__fixed: settings.fixedHeader || settings.navMode === 'mix' }"
        :settings="settings"
        :logoTitle="logoTitle"
        :menuRoutes="menuRoutes"
        :headerHeight="headerHeight"
        @setSidebarRoutes="setSidebarRoutes"
      />
      <header
        v-if="(settings.fixedHeader || settings.navMode === 'mix') && settings.showHeader"
        class="header-placeholder"
        :style="{ height: settings.fixedHeader || settings.navMode === 'mix' ? `${headerHeight}px` : 0 }"
      ></header>
      <slot v-if="settings.showTagsView" name="tagsView"></slot>
      <app-main :tagsView="tagsView" />
    </div>
    <right-panel :showSettings="settings.showSettings" @changeSetting="handleSetting">
      <settings :settings="settings" @changeSetting="handleSetting" @setSidebarRoutes="setSidebarRoutes" />
    </right-panel>

    <!-- 隐藏顶部时 -->
    <div v-if="!settings.showHeader" class="handle" @click.stop="handleClick">
      <i class="el-icon-setting"></i>
    </div>
    <!-- mobile 时 -->
    <hamburger
      v-if="device === 'mobile'"
      :is-active="sidebar.opened"
      class="hamburger-container hamburger"
      :class="{ 'theme-dark': settings.sideTheme === 'theme-dark' }"
      @toggleClick="toggleSidebar"
    />
  </div>
</template>

<script>
import AppMain from './AppMain.vue';
import Navbar from './Navbar/index.vue';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import Settings from './Settings';
import Hamburger from './Hamburger';

import './styles/sidebar.scss';

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design
// const defaultSettings = {
//   showSettings: false,
//   sideTheme: 'theme-dark',
//   navMode: 'mix', // 导航模式：侧边菜单布局、顶部菜单布局、混合菜单布局
//   fixedHeader: true, // 固定Header
//   fixedSide: true, // 固定侧边菜单
//   autoMenu: true, // 自动分割菜单
//   showHeader: true, // 显示顶栏
//   showSide: true, // 显示菜单，即显示侧边菜单
//   showLogo: true, // 显示Logo
//   showTagsView: false, // 显示页签
// };
export default {
  name: 'ProLayout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    RightPanel,
    Settings,
    Hamburger,
  },
  provide() {
    return {
      app: this,
    };
  },
  props: {
    // 设备：桌面(desktop)、移动(mobile)
    device: {
      type: String,
      default: 'desktop',
    },
    logoTitle: {
      type: String,
      default: '',
    },
    headerHeight: {
      type: Number,
      default: 80,
    },
    menuRoutes: {
      type: Array,
      default: () => [],
    },
    settings: {
      type: Object,
      default: () => {},
    },
    tagsView: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      sidebarRoutes: this.menuRoutes,
      // 侧边栏
      sidebar: {
        opened: true,
        widthoutAnimation: true,
      },
    };
  },
  computed: {
    classObj() {
      const { navMode } = this.settings;
      return {
        'thtf-pro-basicLayout-side': navMode === 'side',
        'thtf-pro-basicLayout-top': navMode === 'top',
        'thtf-pro-basicLayout-mix': navMode === 'mix',
        closeSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        hideSidebar: !this.showSide || this.device === 'mobile',
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      };
    },
    showSide() {
      if (this.settings.showSide === false) {
        return false;
      }

      if (this.settings.navMode === 'top') {
        return false;
      }

      if (!this.settings.showSide) {
        return false;
      }

      return true;
    },
  },
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        this.closeSidebar({ withoutAnimation: false });
      }
    },
  },
  methods: {
    // 侧边栏相关方法
    toggleSidebar() {
      const { opened } = this.sidebar;
      if (!this.settings.showSide) {
        return false;
      }
      this.sidebar.opened = !opened;
      this.sidebar.withoutAnimation = false;
    },
    closeSidebar({ withoutAnimation }) {
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleSidebarHide(status) {
      this.$emit('changeSetting', { showSide: status });
    },
    setSidebarRoutes(routes) {
      // 如果没有路由信息，就使用默认的全部。
      // 当模式为 mix 时，启用自动分割菜单的话，把非一级菜单设置为左侧菜单列。
      if (Array.isArray(routes)) {
        this.sidebarRoutes = routes;
      } else {
        // 当模式为 side，mix但不为自动分割菜单的话，使用所有。
        this.sidebarRoutes = this.menuRoutes;
      }
    },
    handleClick() {
      this.$emit('changeSetting', { key: 'showSettings', value: true });
    },
    // 配置相关方法
    handleSetting(obj) {
      this.$emit('changeSetting', obj);
    },
    handleClickOutside() {
      this.closeSidebar({ withoutAnimation: false });
    },
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        const device = isMobile ? 'mobile' : 'desktop';
        this.$emit('onDevice', device);

        if (isMobile) {
          this.closeSidebar({ withoutAnimation: true });
        }
      }
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler);
  },
  mounted() {
    const isMobile = this.$_isMobile();
    if (isMobile) {
      this.$emit('onDevice', 'mobile');

      this.closeSidebar({ withoutAnimation: true });
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler);
  },
};
</script>

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
      :sidebarOpened="sidebar.opened"
      :sidebarRoutes="sidebarRoutes"
      @toggleSidebar="toggleSidebar"
      class="sidebar-container"
    />
    <div
      :class="{ hasTagsView: settings.showTagsView, headerHide: !settings.showHeader, sidebarHide: !showSide }"
      class="main-container"
    >
      <navbar
        v-if="settings.showHeader"
        :class="{ 'fixed-header': settings.fixedHeader || settings.navMode === 'mix' }"
        :sidebarOpened="sidebar.opened"
        :sideTheme="settings.sideTheme"
        :theme="settings.theme"
        :navMode="settings.navMode"
        :logoTitle="logoTitle"
        :showLogo="settings.showLogo"
        :topbarRoutes="topbarRoutes"
        @toggleSidebarHide="toggleSidebarHide"
        @setSidebarRoutes="setSidebarRoutes"
      />
      <header class="thtf-layout-header"></header>
      <tags-view v-if="settings.showTagsView" />
      <app-main :tagsView="tagsView" />
    </div>

    <right-panel :showSettings="settings.showSettings" @changeSetting="handleSetting">
      <settings
        :settings="settings"
        @changeSetting="handleSetting"
        @toggleSidebarHide="toggleSidebarHide"
        @setSidebarRoutes="setSidebarRoutes"
        @resetSidebarRoutes="resetSidebarRoutes"
      />
    </right-panel>
  </div>
</template>

<script>
import AppMain from './AppMain.vue';
import Navbar from './Navbar/index.vue';
import Sidebar from './Sidebar';
import TagsView from './TagsView';
import RightPanel from './RightPanel';
import Settings from './Settings';
import variables from './styles/variables.module.scss';
import './styles/sidebar.scss';

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design

export default {
  name: 'ProLayout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    RightPanel,
    Settings,
    TagsView,
  },
  provide() {
    return {
      app: this,
    };
  },
  props: {
    logoTitle: {
      type: String,
      default: '',
    },
    menuRoutes: {
      type: Array,
      default: () => [],
    },
    settings: {
      type: Object,
      default: () => ({
        showSettings: false,
        sideTheme: 'theme-dark',
        navMode: 'mix', // 导航模式：侧边菜单布局、顶部菜单布局、混合菜单布局
        fixedHeader: true, // 固定Header
        fixedSide: true, // 固定侧边菜单
        autoMenu: true, // 自动分割菜单
        showHeader: true, // 显示顶栏
        showSide: true, // 显示菜单，即显示侧边菜单
        showLogo: true, // 显示Logo
        showTagsView: false, // 显示页签
      }),
    },
  },
  data() {
    return {
      // 设备：桌面(desktop)、移动(mobile)
      device: 'desktop',
      // 侧边栏
      sidebar: {
        hide: false,
        opened: true,
        widthoutAnimation: true,
      },
      // 标签
      tagsView: {
        visitedViews: [],
        cachedViews: [],
        iframeViews: [],
      },
      // 路由菜单
      sidebarRoutes: [],
      topbarRoutes: [],
    };
  },
  computed: {
    classObj() {
      const { navMode, fixedSide } = this.settings;
      return {
        'thtf-pro-basicLayout-side': navMode === 'side',
        'thtf-pro-basicLayout-top': navMode === 'top',
        'thtf-pro-basicLayout-mix': navMode === 'mix',
        'thtf-pro-basicLayout-fix-siderbar': fixedSide,
        closeSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      };
    },
    variables() {
      return variables;
    },
    showSide() {
      if (this.settings.showSide === false) {
        return false;
      }

      if (this.settings.navMode === 'top') {
        return false;
      }

      if (this.sidebar.hide && !this.settings.showSide) {
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
    menuRoutes: {
      handler(val) {
        this.sidebarRoutes = val;
        this.topbarRoutes = JSON.parse(JSON.stringify(this.sidebarRoutes));
        this.defaultRoutes = JSON.parse(JSON.stringify(this.sidebarRoutes));
      },
      deep: true,
    },
  },
  methods: {
    // 侧边栏相关方法
    toggleSidebar() {
      const { hide, opened } = this.sidebar;
      if (hide) {
        return false;
      }
      this.sidebar.opened = !opened;
      this.sidebar.withoutAnimation = false;
      if (opened) {
        localStorage.setItem('sidebarStatus', 1);
      } else {
        localStorage.setItem('sidebarStatus', 0);
      }
    },
    closeSidebar({ withoutAnimation }) {
      localStorage.setItem('sidebarStatus', 0);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleSidebarHide(status) {
      this.sidebar.hide = status;
    },
    setSidebarRoutes(routes) {
      this.sidebarRoutes = routes;
    },
    resetSidebarRoutes() {
      this.sidebarRoutes = this.defaultRoutes;
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
        this.device = isMobile ? 'mobile' : 'desktop';

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
      this.device = 'mobile';
      this.closeSidebar({ withoutAnimation: true });
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler);
  },
};
</script>

<template>
  <div :class="classObj" class="app-wrapper" :style="{ '--current-color': theme }">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar
      v-if="!sidebar.hide"
      :device="device"
      :logoTitle="logoTitle"
      :sidebarLogo="sidebarLogo"
      :theme="theme"
      :sideTheme="sideTheme"
      :sidebarOpened="sidebar.opened"
      :sidebarRoutes="sidebarRoutes"
      class="sidebar-container"
    />
    <div :class="{ hasTagsView: needTagsView, sidebarHide: sidebar.hide }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar
          :theme="theme"
          :sidebarOpened="sidebar.opened"
          :topNav="topNav"
          :topbarRoutes="topbarRoutes"
          @toggleSidebar="toggleSidebar"
          @toggleSidebarHide="toggleSidebarHide"
          @setSidebarRoutes="setSidebarRoutes"
        />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main :tagsView="tagsView" />
      <right-panel :showSettings="showSettings" @changeSetting="handleSetting">
        <settings
          :theme="theme"
          :sideTheme="sideTheme"
          :showSettings="showSettings"
          :topNav="topNav"
          :tagsView="needTagsView"
          :fixedHeader="fixedHeader"
          :sidebarLogo="sidebarLogo"
          :dynamicTitle="dynamicTitle"
          @changeSetting="handleSetting"
          @toggleSidebarHide="toggleSidebarHide"
          @setSidebarRoutes="setSidebarRoutes"
          @resetSidebarRoutes="resetSidebarRoutes"
        />
      </right-panel>
    </div>
  </div>
</template>

<script>
import AppMain from './AppMain.vue';
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar';
import TagsView from './TagsView';
import RightPanel from './RightPanel';
import Settings from './Settings';
import variables from './styles/variables.module.scss';
import './styles/sidebar.scss';
import { filterAsyncRouter } from './utils';

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
      default: () => {
        return {
          title: 'test',
          theme: '#409EFF',
          sideTheme: 'theme-dark',
          showSettings: false,
          topNav: false,
          tagsView: false,
          fixedHeader: false,
          sidebarLogo: true,
          dynamicTitle: true,
        };
      },
    },
  },
  data() {
    return {
      // 设备：桌面(desktop)、移动(mobile)
      device: 'desktop',
      // 配置项
      theme: '#409EFF',
      sideTheme: 'theme-dark',
      showSettings: false,
      topNav: false,
      fixedHeader: false,
      sidebarLogo: true,
      dynamicTitle: false,
      needTagsView: false,
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
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      };
    },
    variables() {
      return variables;
    },
  },
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        this.closeSidebar({ withoutAnimation: false });
      }
    },
    settings: {
      handler(val) {
        const { theme, sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = val;
        this.theme = theme;
        this.sideTheme = sideTheme;
        this.showSettings = showSettings;
        this.topNav = topNav;
        this.needTagsView = tagsView;
        this.fixedHeader = fixedHeader;
        this.sidebarLogo = sidebarLogo;
        this.dynamicTitle = dynamicTitle;
      },
      deep: true,
    },
    menuRoutes: {
      handler(val) {
        this.sidebarRoutes = filterAsyncRouter(JSON.parse(JSON.stringify(val)));
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

<style lang="scss">
@import './styles/mixin.scss';
@import './styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$base-sidebar-width});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.sidebarHide .fixed-header {
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}
</style>

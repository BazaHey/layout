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
    />
    <div v-if="settings.fixedSide && showSide" class="sidebar-container-placeholder"></div>

    <div :class="{ hasTagsView: settings.showTagsView }" class="main-container">
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
      <header v-if="settings.fixedHeader" class="navbar-placeholder"></header>
      <tags-view v-if="settings.showTagsView" ref="tagsView" />
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
// import { filterAsyncRouter } from './utils';

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
      default: () => {},
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
      const { navMode } = this.settings;
      return {
        'thtf-pro-basicLayout-side': navMode === 'side',
        'thtf-pro-basicLayout-top': navMode === 'top',
        'thtf-pro-basicLayout-mix': navMode === 'mix',
        closeSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        hideSidebar: !this.showSide,
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
      const { name } = route;
      if (name) {
        this.addVisitedView(route);
        this.addCacheView(route);
      }
    },
    menuRoutes: {
      handler(val) {
        // this.sidebarRoutes = filterAsyncRouter(JSON.parse(JSON.stringify(val)));
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
    // 添加访问过的view by yut 20220919
    addVisitedView(view) {
      if (this.tagsView.visitedViews.some((v) => v.path === view.path)) return;
      const activeName = ['AddAndEditInitRules'];
      if (activeName.includes(view.name)) {
        this.tagsView.visitedViews.push(
          Object.assign({}, view, {
            title: view.query.navTitle || 'no-name',
          }),
        );
      } else {
        this.tagsView.visitedViews.push(
          Object.assign({}, view, {
            title: view.meta.title || 'no-name',
          }),
        );
      }
    },
    // 缓存view by yut 20220919
    addCacheView(view) {
      if (this.tagsView.cachedViews.includes(view.name)) return;
      if (view.meta && !view.meta.noCache) {
        this.tagsView.cachedViews.push(view.name);
      }
    },
    // 更新view视图 by yut 20220919
    updateVisitedView(view) {
      for (let v of this.tagsView.visitedViews) {
        if (v.path === view.path) {
          const activeName = ['AddAndEditInitRules'];
          if (activeName.includes(view.name)) {
            v = Object.assign(v, view, {
              title: view.query.navTitle || 'no-name',
            });
          } else {
            v = Object.assign(v, view);
          }
          break;
        }
      }
    },
    //  删除右侧view视图 by yut 20220919
    delRightTags(view) {
      const index = this.tagsView.visitedViews.findIndex((v) => v.path === view.path);
      if (index === -1) {
        return;
      }
      this.tagsView.visitedViews = this.tagsView.visitedViews.filter((item, idx) => {
        if (idx <= index || (item.meta && item.meta.affix)) {
          return true;
        }
        const i = this.tagsView.cachedViews.indexOf(item.name);
        if (i > -1) {
          this.tagsView.cachedViews.splice(i, 1);
        }
        return false;
      });
    },
    // 删除左侧view视图 by yut 20220919
    delLeftTags(view) {
      const index = this.tagsView.visitedViews.findIndex((v) => v.path === view.path);
      if (index === -1) {
        return;
      }
      this.tagsView.visitedViews = this.tagsView.visitedViews.filter((item, idx) => {
        if (idx >= index || (item.meta && item.meta.affix)) {
          return true;
        }
        const i = this.tagsView.cachedViews.indexOf(item.name);
        if (i > -1) {
          this.tagsView.cachedViews.splice(i, 1);
        }
        return false;
      });
    },
    // 删除tag视图
    delView(view) {
      for (const [i, v] of this.tagsView.visitedViews.entries()) {
        if (v.path === view.path) {
          this.tagsView.visitedViews.splice(i, 1);
          break;
        }
      }
    },
    // 删除缓存的视图
    delCachedView(view) {
      const index = this.tagsView.cachedViews.indexOf(view.name);
      index > -1 && this.tagsView.cachedViews.splice(index, 1);
    },
    // 删除访问过的views
    delOthersVisitedViews(view) {
      this.tagsView.visitedViews = this.tagsView.visitedViews.filter((v) => {
        return v.meta.affix || v.path === view.path;
      });
    },
    // 删除缓存过的views
    delOthersCachedViews(view) {
      const index = this.tagsView.cachedViews.indexOf(view.name);
      if (index > -1) {
        this.tagsView.cachedViews = this.tagsView.cachedViews.slice(index, index + 1);
      } else {
        this.tagsView.cachedViews = [];
      }
    },
    // 关闭所有标签
    delAllVisitedViews() {
      // keep affix tags
      const affixTags = this.tagsView.visitedViews.filter((tag) => tag.meta.affix);
      this.tagsView.visitedViews = affixTags;
    },
    // 关闭所有缓存标签
    delAllCachedViews() {
      this.tagsView.cachedViews = [];
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
    const self = this;
    const isMobile = this.$_isMobile();
    if (isMobile) {
      this.device = 'mobile';
      this.closeSidebar({ withoutAnimation: true });
    }

    this.$nextTick(() => {
      this.$eventBus_base.$on('delView', function (obj) {
        self.delView(obj);
        self.delCachedView(obj);
        self.$refs.tagsView.toLastView(self.tagsView.visitedViews, obj);
      });
      this.$eventBus_base.$on('delRightTags', function (obj) {
        self.delRightTags(obj);
      });
      this.$eventBus_base.$on('delLeftTags', function (obj) {
        self.delLeftTags(obj);
      });
      this.$eventBus_base.$on('delOthersVisitedViews', function (obj) {
        self.delOthersVisitedViews(obj);
        self.delOthersCachedViews(obj);
        self.$refs.tagsView.moveToCurrentTag();
      });
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler);
  },
};
</script>

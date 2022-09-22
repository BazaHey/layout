<template>
  <el-scrollbar wrap-class="scrollbar-wrapper__x scrollbar-wrapper__y">
    <el-menu
      :default-active="activeMenu"
      :background-color="theme"
      :text-color="textColor"
      :unique-opened="true"
      :active-text-color="textColor"
      :collapse-transition="false"
      mode="horizontal"
    >
      <topbar-item
        v-for="(route, index) in menuRoutes"
        :key="route.path + index"
        :item="route"
        :base-path="route.path"
        :device="device"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { getGrayReversedColor } from '../utils';
import TopbarItem from './TopbarItem';

export default {
  name: 'TopBar',
  components: { TopbarItem },
  props: {
    device: {
      type: String,
      default: 'desktop',
    },
    theme: {
      type: String,
      default: '#409EFF',
    },
    menuRoutes: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    textColor() {
      return getGrayReversedColor(this.theme);
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta?.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
};
</script>

<style lang="scss">
.el-scrollbar__view {
  ul > a {
    float: left;
  }
}
.topmenu-container .el-menu--horizontal > .el-menu-item,
.topmenu-container .el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 80px;
  line-height: 80px;
}
</style>

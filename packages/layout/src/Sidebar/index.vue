<template>
  <div
    :class="{ 'has-logo': showLogo }"
    :style="{
      backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground,
    }"
  >
    <logo v-if="showLogo" :logoTitle="logoTitle" :collapse="isCollapse" :sideTheme="sideTheme" />
    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper__y">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
        :text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
        :unique-opened="true"
        :active-text-color="theme"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRoutes"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
          :device="device"
        />
      </el-menu>
    </el-scrollbar>

    <hamburger
      :is-active="sidebarOpened"
      class="hamburger-container"
      :class="{ 'theme-dark': sideTheme === 'theme-dark' }"
      @toggleClick="toggleSidebar"
    />
  </div>
</template>

<script>
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import Hamburger from '../Hamburger';
import variables from '../styles/variables.module.scss';

export default {
  name: 'SideBar',
  components: { SidebarItem, Logo, Hamburger },
  props: {
    device: {
      type: String,
      default: 'desktop',
    },
    logoTitle: {
      type: String,
      default: '',
    },
    sideTheme: {
      type: String,
      default: 'theme-dark',
    },
    theme: {
      type: String,
      default: '#409EFF',
    },
    showLogo: {
      type: Boolean,
      default: true,
    },
    sidebarOpened: {
      type: Boolean,
      default: true,
    },
    sidebarRoutes: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta?.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebarOpened;
    },
  },
  methods: {
    toggleSidebar(value) {
      this.$emit('toggleSidebar', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.hamburger-container {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 46px;
  line-height: 46px;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}

.hamburger-container.theme-dark {
  fill: #fff;
}
</style>

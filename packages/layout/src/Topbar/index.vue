<template>
  <div
    :class="{ 'has-logo': showLogo }"
    :style="{
      backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground,
    }"
  >
    <logo v-if="showLogo" :logoTitle="logoTitle" :sideTheme="sideTheme" />
    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper__x">
      <el-menu
        :default-active="activeMenu"
        :background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
        :text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
        :unique-opened="true"
        :active-text-color="theme"
        :collapse-transition="false"
        mode="horizontal"
      >
        <topbar-item
          v-for="(route, index) in topbarRoutes"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
          :device="device"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from '../Sidebar/Logo';
import TopbarItem from './TopbarItem';
import variables from '../styles/variables.module.scss';

export default {
  name: 'TopBar',
  components: { TopbarItem, Logo },
  props: {
    device: {
      type: String,
      default: 'desktop',
    },
    logoTitle: {
      type: String,
      default: '',
    },
    showLogo: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: '#409EFF',
    },
    sideTheme: {
      type: String,
      default: 'theme-dark',
    },
    topbarRoutes: {
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
  },
};
</script>

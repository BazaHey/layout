<script>
import { Fragment } from 'vue-fragment';
import Logo from './Logo.vue';
import Topbar from './Topbar.vue';
import Mixbar from './Mixbar.vue';
import Breadcrumb from '../Breadcrumb';
import variables from '../styles/variables.module.scss';

export default {
  name: 'NavBar',
  components: {
    Logo,
    Topbar,
    Mixbar,
    Breadcrumb,
    Fragment,
  },
  inject: ['app'],
  props: {
    sidebarOpened: {
      type: Boolean,
      default: true,
    },
    sideTheme: {
      type: String,
      default: 'theme-dark',
    },
    theme: {
      type: String,
      default: '#409EFF',
    },
    navMode: {
      type: String,
      default: 'mix',
    },
    logoTitle: {
      type: String,
      default: '',
    },
    showLogo: {
      type: Boolean,
      default: false,
    },
    topbarRoutes: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    toggleSidebarHide(value) {
      this.$emit('toggleSidebarHide', value);
    },
    setSidebarRoutes(routes) {
      this.$emit('setSidebarRoutes', routes);
    },
  },
  render() {
    const { logoTitle, sideTheme, theme, navMode, showLogo, topbarRoutes } = this;
    const rightMenu = this.app.$slots.rightMenu;

    return (
      <header
        class={{ navbar: true, 'has-logo': showLogo && navMode !== 'side' }}
        style={{
          backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground,
        }}
      >
        {navMode !== 'side' && showLogo && <logo logoTitle={logoTitle} sideTheme={sideTheme} />}
        {navMode === 'top' && (
          <topbar sideTheme={sideTheme} theme={theme} topbarRoutes={topbarRoutes} class="topmenu-container" />
        )}
        {navMode === 'mix' && (
          <mixbar
            sideTheme={sideTheme}
            theme={theme}
            topbarRoutes={topbarRoutes}
            vOn:toggleSidebarHide={this.toggleSidebarHide}
            vOn:setSidebarRoutes={this.setSidebarRoutes}
            class="topmenu-container"
          />
        )}
        {navMode === 'side' && <breadcrumb class="breadcrumb-container" />}
        <fragment>{rightMenu}</fragment>
      </header>
    );
  },
};
</script>

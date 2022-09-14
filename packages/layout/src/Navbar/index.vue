<script>
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
      <div
        class={{ navbar: true, 'has-logo': showLogo }}
        style={{
          backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground,
        }}
      >
        {navMode !== 'side' && (
          <div class={{ logo: showLogo }}>{showLogo && <logo logoTitle={logoTitle} sideTheme={sideTheme} />}</div>
        )}
        {navMode === 'top' && (
          <topbar
            sideTheme={sideTheme}
            theme={theme}
            topbarRoutes={topbarRoutes}
            vOn:toggleSidebarHide={this.toggleSidebarHide}
            vOn:setSidebarRoutes={this.setSidebarRoutes}
            class="topmenu-container"
          />
        )}
        {navMode === 'side' && <breadcrumb class="breadcrumb-container" />}
        <div>{rightMenu}</div>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.module.scss';
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .logo {
    width: $base-sidebar-width;
    float: left;
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    width: 100%;
  }
  &.has-logo {
    .topmenu-container {
      padding-left: $base-sidebar-width;
    }
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
}
</style>

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
    settings: {
      type: Object,
      default: () => {},
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
  },
  methods: {
    setSidebarRoutes(routes) {
      this.$emit('setSidebarRoutes', routes);
    },
  },
  render() {
    const { logoTitle, settings, headerHeight, menuRoutes } = this;
    const { sideTheme, theme, navMode, autoMenu, showLogo } = settings;
    const rightMenu = this.app.$slots.rightMenu;

    return (
      <header
        class={{ header: true, 'has-logo': showLogo && navMode !== 'side' }}
        style={{
          height: Number.isInteger(headerHeight) ? `${headerHeight}px` : 0,
          color: sideTheme === 'theme-dark' ? variables.menuLightBackground : variables.menuBackground,
          backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground,
        }}
      >
        {navMode !== 'side' && showLogo && <logo logoTitle={logoTitle} sideTheme={sideTheme} />}
        {navMode === 'top' && (
          <topbar sideTheme={sideTheme} theme={theme} menuRoutes={menuRoutes} class="topmenu-container" />
        )}
        {navMode === 'mix' && autoMenu && (
          <mixbar
            sideTheme={sideTheme}
            theme={theme}
            menuRoutes={menuRoutes}
            vOn:setSidebarRoutes={this.setSidebarRoutes}
            class="topmenu-container"
          />
        )}
        {navMode === 'side' && <breadcrumb class="breadcrumb-container" />}
        {rightMenu}
      </header>
    );
  },
};
</script>

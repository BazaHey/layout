<script>
import variables from '../styles/variables.module.scss';

export default {
  name: 'SidebarLogo',
  inject: ['app'],
  props: {
    logoTitle: {
      type: String,
      default: '',
    },
    collapse: {
      type: Boolean,
      required: true,
    },
    sideTheme: {
      type: String,
      default: 'theme-dark',
    },
  },
  computed: {
    variables() {
      return variables;
    },
  },
  data() {
    return {};
  },
  render() {
    const { logoTitle, sideTheme, collapse } = this;

    const className = {
      'sidebar-logo-container': true,
      collapse,
    };
    const style = {
      backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground,
    };
    const titleStyle = {
      color: sideTheme === 'theme-dark' ? variables.logoTitleColor : variables.logoLightTitleColor,
    };

    const logo = this.app.$slots.logo;

    return (
      <div class={className} style={style}>
        <transition name="sidebarLogoFade">
          {collapse ? (
            <router-link key="collapse" class="sidebar-logo-link" to="/">
              logo ? (<span class="sidebar-logo">{logo}</span>) :(
              <h1 class="sidebar-title" style={titleStyle}>
                {logoTitle}
              </h1>
              )
            </router-link>
          ) : (
            <router-link key="expand" class="sidebar-logo-link" to="/">
              logo && (<span class="sidebar-logo">{logo}</span>)
              <h1 class="sidebar-title" style={titleStyle}>
                {logoTitle}
              </h1>
            </router-link>
          )}
        </transition>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>

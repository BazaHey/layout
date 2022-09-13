<script>
import variables from '../styles/variables.module.scss';

export default {
  name: 'NavbarLogo',
  inject: ['app'],
  props: {
    logoTitle: {
      type: String,
      default: '',
    },
    sideTheme: {
      type: String,
      default: 'theme-dark',
    },
  },
  data() {
    return {};
  },
  render() {
    const { logoTitle, sideTheme } = this;

    const style = {
      backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground,
    };
    const titleStyle = {
      color: sideTheme === 'theme-dark' ? variables.logoTitleColor : variables.logoLightTitleColor,
    };

    const logo = this.app.$slots.logo;

    return (
      <div class="navbar-logo-container" style={style}>
        <transition name="navbarLogoFade">
          <router-link class="navbar-logo-link" to="/">
            {logo && <span class="navbar-logo">{logo}</span>}
            <h1 class="navbar-title" style={titleStyle}>
              {logoTitle}
            </h1>
          </router-link>
        </transition>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.navbarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.navbarLogoFade-enter,
.navbarLogoFade-leave-to {
  opacity: 0;
}

.navbar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .navbar-logo-link {
    height: 100%;
    width: 100%;

    & .navbar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .navbar-title {
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
}
</style>

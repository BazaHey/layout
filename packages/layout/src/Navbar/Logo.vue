<script>
import { Fragment } from 'vue-fragment';
import variables from '../styles/variables.module.scss';

export default {
  name: 'NavbarLogo',
  components: {
    Fragment,
  },
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
        <router-link class="navbar-logo-link" to="/">
          <fragment>{logo}</fragment>
          <h1 class="navbar-title" style={titleStyle}>
            {logoTitle}
          </h1>
        </router-link>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.navbar-logo-container {
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;

  & .navbar-logo-link {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;

    & .navbar-title {
      margin: 0 0 0 12px;
      color: #fff;
      font-weight: 600;
      font-size: 18px;
    }
  }
}
</style>

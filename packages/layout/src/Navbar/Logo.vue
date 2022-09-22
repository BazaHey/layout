<script>
import { getGrayReversedColor } from '../utils';
export default {
  name: 'NavbarLogo',
  inject: ['app'],
  props: {
    logoTitle: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: '#409EFF',
    },
  },
  data() {
    return {};
  },
  render() {
    const { logoTitle, theme } = this;
    const style = { backgroundColor: theme };
    const titleStyle = { color: getGrayReversedColor(theme) };

    const logo = this.app.$slots.logo;

    return (
      <div class="navbar-logo-container" style={style}>
        <router-link class="navbar-logo-link" to="/">
          {logo}
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

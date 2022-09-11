<script>
import Breadcrumb from './Breadcrumb';
import TopNav from './TopNav';
import Hamburger from './Hamburger';

export default {
  name: 'NavBar',
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
  },
  inject: ['app'],
  props: {
    sidebarOpened: {
      type: Boolean,
      default: true,
    },
    navMode: {
      type: String,
      default: 'mix',
    },
    topbarRoutes: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar');
    },
    toggleSidebarHide(value) {
      this.$emit('toggleSidebarHide', value);
    },
    setSidebarRoutes(routes) {
      this.$emit('setSidebarRoutes', routes);
    },
  },
  render() {
    const { sidebarOpened, theme, navMode, topbarRoutes } = this;
    const rightMenu = this.app.$slots.rightMenu;

    return (
      <div class="navbar">
        <hamburger
          id="hamburger-container"
          is-active={sidebarOpened}
          class="hamburger-container"
          vOn:toggleClick={this.toggleSidebar}
        />

        {navMode === 'top' || navMode === 'mix' ? (
          <top-nav
            theme={theme}
            topbarRoutes={topbarRoutes}
            vOn:toggleSidebarHide={this.toggleSidebarHide}
            vOn:setSidebarRoutes={this.setSidebarRoutes}
            id="topmenu-container"
            class="topmenu-container"
          />
        ) : (
          <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        )}

        <div class="right-menu">{rightMenu}</div>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

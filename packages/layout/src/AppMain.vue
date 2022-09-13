<script>
import iframeToggle from './IframeToggle/index';

export default {
  name: 'AppMain',
  components: { iframeToggle },
  inject: ['app'],
  props: {
    tagsView: {
      type: Object,
      default: () => {},
    },
  },
  render() {
    const { cachedViews } = this.tagsView;
    const key = this.$route.path;
    // const defaultSlot = this.app.$slots.default;

    return (
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive include={cachedViews}>
            <router-view key={key} />
          </keep-alive>
        </transition>
        <iframe-toggle />
      </section>
    );
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.headerHide {
  .app-main {
    min-height: 100vh;
  }
}

.hasTagsView.headerHide {
  .app-main {
    min-height: calc(100vh - 34px);
  }
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 17px;
  }
}
</style>

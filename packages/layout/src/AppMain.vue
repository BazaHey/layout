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

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .header__fixed {
    padding-right: 17px;
  }
}
</style>

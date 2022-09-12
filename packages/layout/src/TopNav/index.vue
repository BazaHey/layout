<template>
  <mix-nav v-if="mode === 'mix'" opbarRoutes="topbarRoutes"></mix-nav>
  <top-bar v-else :topbarRoutes="topbarRoutes"></top-bar>
</template>

<script>
import MixNav from './MixNav.vue';
import TopBar from '../Topbar';

export default {
  name: 'TopNav',
  props: {
    navMode: {
      type: String,
      default: 'mix',
    },
    topbarRoutes: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    MixNav,
    TopBar,
  },
  data() {
    return {};
  },
};
</script>

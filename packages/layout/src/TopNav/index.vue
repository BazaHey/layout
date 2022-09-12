<template>
  <mix-nav v-if="mode === 'mix'"></mix-nav>
  <side-bar v-else></side-bar>
</template>

<script>
import MixNav from './MixNav.vue';
import SideBar from '../Sidebar';

export default {
  name: 'TopNav',
  props: {
    mode: {
      type: String,
      default: 'top',
    },
  },
  components: {
    MixNav,
    SideBar,
  },
  data() {
    return {};
  },
};
</script>

<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
import Layout from './components/index.vue';

export default {
  name: 'app',
  components: {
    Layout,
  },
  data() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

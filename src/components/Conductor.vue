<template>
  <div>
    <Page
      v-for="(page, key) in this.$store.state.composition.PAGES"
      v-show="true"
      v-bind:key="key"
      v-bind:content="page"
    ></Page>
  </div>
</template>

<script>
import Vue from 'vue';
// import Experiment from './Experiment.vue';
import Page from './Page.vue';

export default {
  data() {
    return {
      page: 0,
      test: {},
    };
  },
  beforeMount() {
    Vue.prototype.$resourcePaths = {};
    this.importAllResourcePaths(require.context('@/assets/', true));

    Vue.prototype.$preloadedMedia = {};
    this.importAllMedia(require.context('@/assets/material/', true, /\.png$/));
  },
  components: {
    // Experiment,
    Page,
  },
  methods: {
    importAllResourcePaths(assets) {
      // let resourcePaths = this.$store.state.composition.RESOURCE_PATHS;
      // for (var path_key in resourcePaths) {
      // this.$resourcePaths[path_key] = require('@/assets' +
      // resourcePaths[path_key]);
      assets.keys().forEach((key) => {
        this.$resourcePaths[key] = {
          webpackPath: assets(key),
          fileName: key,
        };
      });
    },
    importAllMedia(media) {
      media.keys().forEach((key) => {
        this.$preloadedMedia[key] = {
          path: media(key),
          fileName: key,
        };
      });
    },
  },
};
</script>

<style>
</style>
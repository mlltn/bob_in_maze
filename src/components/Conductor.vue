<template>
  <div>
    <Page
      v-for="(page, key, index) in this.$store.state.composition.PAGES"
      v-show="currentPage == index"
      v-bind:key="key"
      v-bind:content="page"
    ></Page>

    <el-button
      v-on:click="nextPage"
      type="success"
      class="button-corner"
      :key="'asd'"
      >next</el-button
    >
  </div>
</template>

<script>
import Vue from 'vue';
// import Experiment from './Experiment.vue';
import Page from './Page.vue';
import test from '../logic/utils.js';

export default {
  data() {
    return {
      currentPage: 0,
      test: test,
      test2: this.$store.state.next_page_conditions,
      test3: this.$store.state.composition.PAGES,
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
    nextPage() {
      this.$store.commit('resetNextPageConditions');
      this.currentPage++;
    },
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
.button-corner {
  position: fixed;
  bottom: 100px;
  right: 100px;
}
</style>
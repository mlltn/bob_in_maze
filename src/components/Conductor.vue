<template>
  <div>
    <Page
      v-for="(page, key, index) in this.$store.state.composition.PAGES"
      v-show="$store.state.currentPage == index"
      :key="key"
      :content="page"
      :id="key"
    ></Page>
  </div>
</template>

<script>
import Vue from 'vue';
import Page from './Page.vue';

export default {
  data() {
    return {};
  },
  beforeMount() {
    Vue.prototype.$resourcePaths = {};
    this.importAllResourcePaths(require.context('@/assets/', true));

    Vue.prototype.$preloadedMedia = {};
    this.importAllMedia(require.context('@/assets/material/', true, /\.png$/));
  },
  components: {
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
.button-right-corner {
  position: fixed;
  bottom: 100px;
  right: 100px;
  text-align: right;
}
.button-left-corner {
  position: fixed;
  bottom: 100px;
  left: 100px;
  text-align: left;
}
.button-right-top-corner {
  position: fixed;
  top: 100px;
  right: 100px;
  text-align: right;
}
</style>
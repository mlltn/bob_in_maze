<template>
  <div>
    <Experiment />
  </div>
</template>

<script>
import Vue from 'vue';
import Experiment from './Experiment.vue';

export default {
  data() {
    return {};
  },
  beforeMount() {
    Vue.prototype.$preloadedMedia = {};
    this.importAll(require.context('../assets/material/', true, /\.png$/));
  },
  components: {
    Experiment,
  },
  methods: {
    importAll(media) {
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
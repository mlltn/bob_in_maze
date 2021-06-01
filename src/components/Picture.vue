<template>
  <div>
    <img :src="pictureSource" />
  </div>
</template>

<script>
export default {
  computed: {
    pictureSource() {
      let folder = this.$store.state.composition.RESOURCE_PATHS[
        this.$attrs.source.path_key
      ];
      let path = folder + this.$attrs.source.filename;
      return this.$resourcePaths[path].webpackPath;
    },
  },
};
</script>

<style>
</style>
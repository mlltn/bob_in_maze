<template>
  <img :class="styles" :src="pictureSource" />
</template>

<script>
export default {
  computed: {
    pictureSource() {
      let folder =
        this.$store.state.composition.RESOURCE_PATHS[
          this.$attrs.content.src.path_key
        ];
      let path = folder + this.$attrs.content.src.filename;
      return this.$resourcePaths[path].webpackPath;
    },
    styles() {
      if ('size' in this.$attrs.content) {
        let size = this.$attrs.content.size;
        return 'm-auto w-' + size + ' min-w-' + size;
      }
      return 'm-auto w-96 min-w-96';
    },
  },
};
</script>

<style>
</style>
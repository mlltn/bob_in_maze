<template>
  <img class="m-auto w-96 min-w-96" :src="pictureSource" />
</template>

<script>
export default {
  computed: {
    pictureSource() {
      let folder =
        this.$store.state.composition.RESOURCE_PATHS[
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
<template>
  <p style="white-space: pre-line" :class="getStyles">
    {{ $t(text) }}
  </p>
</template>

<script>
export default {
  props: {
    name: String,
    id: String,
    text: String,
    type: String,
  },
  computed: {
    getStyles() {
      switch (this.type) {
        case 'title':
          return 'mx-auto my-4';
        case 'description':
          return 'text-left m-4 max-w-96';
        default:
          return 'text-left my-4 max-w-96 mx-auto';
      }
    },
  },
};
</script>

<style>
</style>
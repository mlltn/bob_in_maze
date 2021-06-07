<template>
  <!-- <div>df {{ this.$vnode.key }}</div> -->
  <div>
    <Brick
      v-for="(component, name) in this.$attrs.content"
      v-bind:key="name + '_' + $uuid.v4()"
      v-bind:name="name"
      v-bind:content="component"
      :horizontal="false"
    >
    </Brick>
  </div>
</template>

<script>
import Brick from './Brick.vue';

export default {
  date() {
    return {};
  },
  components: {
    Brick,
  },
};
</script>

<style>
</style>
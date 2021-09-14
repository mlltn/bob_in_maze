<template>
  <div class="text-left m-5">
    <p>{{ $t(title) }}</p>
    <el-checkbox-group v-model="checked">
      <div
        v-for="translation in translations"
        v-bind:key="translation + '_' + $uuid.v4()"
        class="m-1 ml-5"
      >
        <el-checkbox :label="$t(translation)" />
      </div>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    id: String,
    pageId: String,
    title: String,
    translations: Array,
  },
  data() {
    return {
      checked: [],
    };
  },
  components: {},
};
</script>

<style>
</style>
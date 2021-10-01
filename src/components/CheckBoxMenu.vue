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
import { bus } from '../main.js';
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
      checkBoxGroupKey: 'checkBoxGroupKey_' + this.pageId + '_' + this.id,
    };
  },
  watch: {
    checked: function () {
      this.checkBoxChanged();
    },
  },
  methods: {
    checkBoxChanged() {
      if (this.allBoxesChecked()) {
        bus.$emit('all-boxes-checked', true);
      } else {
        bus.$emit('all-boxes-checked', false);
      }
    },
    allBoxesChecked() {
      if (this.translations.length == this.checked.length) {
        return true;
      } else {
        return false;
      }
    },
  },
  computed: {
    checked: {
      get() {
        if (
          typeof this.$store.state.dynamicProps[this.checkBoxGroupKey] ===
          'undefined'
        ) {
          return [];
        }
        return this.$store.state.dynamicProps[this.checkBoxGroupKey];
      },
      set(newValue) {
        this.$store.commit('setDynamicProp', {
          key: this.checkBoxGroupKey,
          value: newValue,
        });
      },
    },
  },
  components: {},
};
</script>

<style>
</style>
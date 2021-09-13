<template>
  <el-input
    ref="access_code_input"
    :placeholder="placeholder"
    v-model="inputValue"
  />
</template>

<script>
import { bus } from '../main.js';
import { mapGetters } from 'vuex';
export default {
  props: {
    id: String,
    pageId: String,
    placeholder: String,
    type: String,
  },
  data() {
    return {
      inputKey: 'inputValue_' + this.pageId + '_' + this.id,
    };
  },
  mounted() {
    this.$refs.access_code_input.focus();
  },
  watch: {
    inputValue: function () {
      this.inputChanged();
    },
  },
  methods: {
    inputChanged() {
      if (this.inputValue != '') {
        bus.$emit('input-not-empty', true);
      } else {
        bus.$emit('input-not-empty', false);
      }
    },
    executeLeavePageActions() {
      //REFACTOR to more general solution
      if (this.id == 'InputField#access-code' && this.inputValue == 'dev') {
        this.$store.commit('setDynamicProp', {
          key: 'DEV_MODE',
          value: true,
        });
      }
    },
  },
  computed: {
    ...mapGetters(['getDynamicProp']),
    inputValue: {
      get() {
        return this.$store.state.dynamicProps[this.inputKey];
      },
      set(newValue) {
        this.$store.commit('setDynamicProp', {
          key: this.inputKey,
          value: newValue,
        });
      },
    },
  },
};
</script>

<style>
</style>
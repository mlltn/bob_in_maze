<template>
  <!-- <div>df {{ this.$vnode.key }}</div> -->
  <div>
    <p>{{ '(' + id + ')' }}</p>
    <Brick
      v-for="(component, name) in content.components"
      :key="name + '_' + $uuid.v4()"
      :name="name"
      :id="name"
      :pageId="id"
      :content="component"
      :horizontal="false"
    >
    </Brick>
    <el-button
      v-if="content.useDefaultNextButton && currentPage > 0"
      v-on:click="previousPage()"
      type="info"
      class="button-left-corner"
      :key="'button-' + $uuid.v4()"
      >previous</el-button
    >
    <el-button
      v-if="content.useDefaultNextButton"
      :disabled="!nextPageConditionsMet"
      v-on:click="nextPage()"
      type="success"
      class="button-right-corner"
      :key="'button-' + $uuid.v4()"
      >next</el-button
    >
  </div>
</template>

<script>
import Brick from './Brick.vue';
import { mapGetters, mapState } from 'vuex';
import * as utils from '../logic/utils.js';

import { bus } from '../main.js';

export default {
  props: { id: String, content: Object },
  data() {
    return {
      nextPageConditionMap: utils.initBooleanConditions(
        this.content.nextPageConditions
      ),
    };
  },
  created() {
    for (var condition of this.content.nextPageConditions) {
      bus.$on(condition, (value) => {
        this.updateNextPageConditions(condition, value);
      });
    }
  },
  components: {
    Brick,
  },
  methods: {
    updateNextPageConditions(condition, value) {
      this.nextPageConditionMap[condition] = value;
    },

    previousPage() {
      this.$store.commit('resetNextPageConditions');
      this.$store.commit('previousPage');
      bus.$emit('reset-slider-score', {}); //make general resetter
    },

    nextPage() {
      this.$store.commit('resetNextPageConditions');
      this.$store.commit('nextPage');
      bus.$emit('reset-slider-score', {}); //make general resetter
    },
  },
  computed: {
    ...mapGetters(['getPageById']),
    ...mapState({
      currentPage: (state) => state.currentPage,
    }),
    nextPageConditionsMet() {
      for (let condition in this.nextPageConditionMap) {
        if (!this.nextPageConditionMap[condition]) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<style>
</style>
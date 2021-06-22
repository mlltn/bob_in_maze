<template>
  <!-- <div>df {{ this.$vnode.key }}</div> -->
  <div>
    <p>{{ id }}</p>
    <Brick
      v-for="(component, name) in content.components"
      :key="name + '_' + $uuid.v4()"
      :name="name"
      :id="name"
      :content="component"
      :horizontal="false"
    >
    </Brick>

    <el-button
      v-if="content.useDefaultNextButton"
      :disabled="!nextPageConditionsMet"
      v-on:click="nextPage()"
      type="success"
      class="button-corner"
      :key="'button-' + $uuid.v4()"
      >next</el-button
    >
  </div>
</template>

<script>
import Brick from './Brick.vue';
import { mapGetters } from 'vuex';
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
    nextPage() {
      this.$store.commit('resetNextPageConditions');
      this.$store.commit('nextPage');
    },
  },
  computed: {
    ...mapGetters(['getPageById']),
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
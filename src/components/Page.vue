<template>
  <!-- <div>df {{ this.$vnode.key }}</div> -->
  <div>
    <p v-if="$store.state.showGuides">{{ '(' + id + ')' }}</p>
    <Brick
      v-for="(component, name) in content.components"
      :key="name"
      :name="name"
      :id="name"
      :ref="name"
      :pageId="id"
      :content="component"
      :horizontal="false"
    >
    </Brick>
    <div class="button-right-corner">
      <p v-if="'nextButton' in content._helpTexts" class="my-3 max-w-xxs">
        {{ $t(content._helpTexts.nextButton) }}
      </p>
      <el-button
        v-if="content._useDefaultNextButton"
        :disabled="!nextPageConditionsMet"
        v-on:click="nextPage()"
        type="success"
        :key="name +'--button-next-page'"
        >next</el-button
      >
    </div>
    <div v-if="devModeEnabled" id="admin-panel" class="button-right-top-corner">
      <el-button
        v-on:click="toggleGuides()"
        type="danger"
        key='button-toggle-guides'
        >toggle guides</el-button
      >
      <el-button
        v-on:click="toExperiment()"
        type="danger"
        key='button-to-experiment'
        >Go to experiment</el-button
      >
      <el-button
        v-if="currentPage > 0"
        v-on:click="previousPage()"
        type="danger"
        key='button-previous-page'
        >previous</el-button
      >
      <el-button
        v-on:click="nextPage()"
        type="danger"
        key='button-next-page'
        >next</el-button
      >
      <el-button
        v-on:click="testPost()"
        type="danger"
        key='button-test-post'
        >testpost</el-button
      >
    </div>
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
        this.content._nextPageConditions
      ),
    };
  },
  created() {
    for (var condition of this.content._nextPageConditions) {
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
      this.executeLeavePageActions();
      this.$store.commit('resetNextPageConditions');
      this.$store.commit('nextPage');
      bus.$emit('reset-slider-score', {}); //make general resetter
    },
    executeLeavePageActions() {
      try {
        Object.keys(this.content.components).forEach((refHandle) => {
          this.$refs[refHandle][0].executeLeavePageActions();
        });
        // // Working code if leave Page Actions are enabled for page level
        // this.content._leavePageActions.forEach((action) => {
        //   this.$store.commit('executeLeavePageAction', action);
        // });
      } catch {
        console.log('NoLeavePageAction: ' + this.id);
      }
    },
    toggleGuides() {
      this.$store.commit('toggleGuides');
    },
    toExperiment() {
      this.$store.commit('toExperiment');
    },
    testPost() {
      this.$store.commit('pushNewExperimentResult', { time_spent: 123 });
      this.$store.commit('submitResults');
    },
  },
  computed: {
    ...mapGetters(['getDynamicProp']),
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
    devModeEnabled() {
      return this.getDynamicProp('DEV_MODE');
    },
  },
};
</script>

<style>
</style>
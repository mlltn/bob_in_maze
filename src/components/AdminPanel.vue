<template>
  <div>
    <el-button
      v-on:click="toggleGuides()"
      type="danger"
      :key="page + '--button-toggle-guides'"
      >toggle guides</el-button
    >
    <el-button
      v-on:click="toExperiment()"
      type="danger"
      :key="page + '--button-to-experiment'"
      >Go to experiment</el-button
    >
    <el-button
      v-if="currentPage > 0"
      v-on:click="previousPage()"
      type="danger"
      :key="page + '--button-previous-page'"
      >previous</el-button
    >
    <el-button
      v-on:click="nextPage()"
      type="danger"
      :key="page + '--button-force-next-page'"
      >next</el-button
    >
    <el-button
      v-on:click="testPost()"
      type="danger"
      :key="page + '--button-test-post'"
      >testpost</el-button
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: { page: String, nextPage: Function, previousPage: Function },
  methods: {
    toggleGuides() {
      this.$store.commit("toggleGuides");
    },
    toExperiment() {
      this.$store.commit("toExperiment");
    },
    testPost() {
      this.$store.commit("pushNewExperimentResult", { time_spent: 123 });
      this.$store.commit("submitResults");
    },
  },
  computed: {
    ...mapState({
      currentPage: (state) => state.currentPage,
    }),
  },
};
</script>

<style>
</style>
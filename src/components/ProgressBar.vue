<template>
  <div class="border-2">
    <div
      v-bind:style="{
        color: 'white',
        backgroundColor: 'green',
        width: progressPercent + '%',
      }"
    >
      {{ step + '/' + maxSteps }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    id: String,
    step: Number,
    maxSteps: Number,
  },
  computed: {
    progressPercent() {
      return (this.step / this.maxSteps) * 100;
    },
  },
};
</script>

<style>
</style>
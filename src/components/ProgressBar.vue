<template>
  <div class="fixed left-1/4 bottom-24 border-2 m-3 w-1/2">
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
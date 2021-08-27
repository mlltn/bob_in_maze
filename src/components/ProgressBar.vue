<template>
  <div class="fixed left-1/4 bottom-24 m-3 w-1/2">
    <p class="m">{{ title }}</p>
    <div class="w-full border-2">
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
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    id: String,
    title: String,
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
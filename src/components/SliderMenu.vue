<template>
  <div id="slider-menu" class="bg-green-300">
    <div class="bg-red-500" v-bind:class="{ 'bg-green-500': totalScore == 10 }">
      Total score {{ totalScore }}
    </div>
    <div>
      <div class="flex" v-for="slider in sliders" v-bind:key="slider.id">
        <el-slider
          v-bind:id="'slider-' + slider.id"
          class="flex-auto bg-red-200"
          :min="0"
          :max="10"
          show-stops
          v-model="slider.score"
        ></el-slider>
        <div class="m-2">{{ slider.score }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      default_settings: {
        score: 0,
        min: 0,
        max: 10,
      },
      sliders: [
        { id: 1, color: "rgb(0, 255, 255)" },
        { id: 2, color: "rgb(255, 0, 0)" },
        { id: 3, color: "rgb(0, 0, 255)" },
      ],
    };
  },
  created() {
    this.sliders.forEach((slider, index) => {
      this.$set(this.sliders[index], "score", this.default_settings.score);
      this.$set(this.sliders[index], "min", this.default_settings.min);
      this.$set(this.sliders[index], "max", this.default_settings.max);
    });
  },
  computed: {
    totalScore() {
      let totalScore = 0;
      this.sliders.forEach((slider) => {
        console.log(totalScore);
        totalScore += slider.score;
      });
      return totalScore;
    },
    // dynamicStyles() {
    //   return;
    // },
  },
};
</script>

<style>
</style>
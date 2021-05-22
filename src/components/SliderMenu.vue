<template>
  <div id="slider-menu" class="bg-green-300">
    <div
      class="bg-red-500"
      v-bind:class="{ 'bg-green-500': isValidTotalScore }"
    >
      Total score {{ totalScore }}
    </div>
    <div>
      <div class="flex" v-for="slider in sliders" v-bind:key="slider.id">
        <el-slider
          v-bind:id="'slider-' + slider.id"
          class="flex-auto bg-red-200"
          :class="slider.color"
          slider.color
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
      props: {
        validTotalScore: 10,
      },
      default_settings: {
        score: 0,
        min: 0,
        max: 10,
      },
      sliders: [
        { id: 1, color: "yellow" },
        { id: 2, color: "red" },
        { id: 3, color: "green" },
      ],
    };
  },
  created() {
    this.sliders.forEach((slider, index) => {
      this.$set(slider, "score", this.default_settings.score);
      this.$set(this.sliders[index], "min", this.default_settings.min);
      this.$set(this.sliders[index], "max", this.default_settings.max);
    });
  },
  computed: {
    totalScore() {
      let totalScore = 0;
      this.sliders.forEach((slider) => {
        totalScore += slider.score;
      });
      return totalScore;
    },
    isValidTotalScore() {
      return this.totalScore == this.props.validTotalScore;
    },
  },
};
</script>

<style lang="scss">
.yellow {
  .el-slider__button {
    border-color: yellow;
    background-color: yellow;
  }
  .el-slider__bar {
    background-color: yellow;
  }
}
.red {
  .el-slider__button {
    border-color: red;
    background-color: red;
  }
  .el-slider__bar {
    background-color: red;
  }
}
.green {
  .el-slider__button {
    border-color: green;
    background-color: green;
  }
  .el-slider__bar {
    background-color: green;
  }
}
</style>
<template>
  <div
    id="slider-menu"
    class="centered"
    :style="{ width: props.sliderBoxWidth }"
  >
    <div
      class="bg-red-500"
      v-bind:class="{ 'bg-green-500': isValidTotalScore }"
    >
      Total score {{ totalScore + '/' + props.validTotalScore }}
    </div>
    <div>
      <div class="flex mt-5" v-for="slider in sliders" v-bind:key="slider.id">
        <el-slider
          v-bind:id="'slider-' + slider.id"
          class="flex-auto"
          :class="slider.color"
          :min="slider.min"
          :max="slider.max"
          show-stops
          v-model="slider.score"
          @change="scoreChanged"
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
        sliderBoxWidth: '300px',
      },
      default_settings: {
        score: 0,
        min: 0,
        max: 10,
      },
      sliders: [
        { id: 1, color: 'green' },
        { id: 2, color: 'blue' },
        { id: 3, color: 'blueviolet' },
      ],
    };
  },
  created() {
    this.sliders.forEach((slider, index) => {
      this.$set(slider, 'score', this.default_settings.score);
      this.$set(this.sliders[index], 'min', this.default_settings.min);
      this.$set(this.sliders[index], 'max', this.default_settings.max);
    });
  },
  methods: {
    scoreChanged() {
      this.$emit('scoreChanged', this.isValidTotalScore);
    },
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
.green {
  .el-slider__button {
    border-color: green;
    background-color: green;
  }
  .el-slider__bar {
    background-color: green;
  }
}
.blue {
  .el-slider__button {
    border-color: blue;
    background-color: blue;
  }
  .el-slider__bar {
    background-color: blue;
  }
}
.blueviolet {
  .el-slider__button {
    border-color: blueviolet;
    background-color: blueviolet;
  }
  .el-slider__bar {
    background-color: blueviolet;
  }
}
</style>
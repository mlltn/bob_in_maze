<template>
  <div
    id="slider-menu"
    class="centered"
    :style="{ width: content.sliderBoxWidth }"
  >
    <div
      class="bg-red-500"
      v-bind:class="{ 'bg-green-500': isValidTotalScore }"
    >
      Total score
      {{ totalScore + '/' + content.validTotalScore }}
    </div>
    <div>
      <div
        class="flex mt-5"
        v-for="slider in this.sliders"
        v-bind:key="slider.id"
      >
        <el-slider
          v-bind:id="'slider-' + slider.id"
          class="flex-auto"
          :class="slider.color"
          :min="slider.min"
          :max="slider.max"
          show-stops
          v-model="slider.score"
          @change="scoreChanged(slider.id)"
        ></el-slider>
        <div class="m-2">{{ slider.score }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from '../main.js';

export default {
  props: {
    content: Object,
  },

  data() {
    return {
      sliders: [],
      lastEmittedScoreStatus: false,
    };
  },
  beforeMount() {},
  created() {
    bus.$on('resetSliderScore', this.resetSliderScore());

    this.content.sliderProps.forEach((sliderProp) => {
      this.sliders.push({
        id: sliderProp.id,
        color: sliderProp.color,
        min: this.content.defaultSettings.min,
        max: this.content.defaultSettings.max,
        score: this.content.defaultSettings.score,
      });
    });
  },
  mounted() {
    console.log('jes');
    // this.$store.commit('setSliderMenuVisible', true);
  },
  beforeUnmount() {
    console.log('jes');
    // this.isVisible = false;
  },
  methods: {
    scoreChanged() {
      let ivts = this.isValidTotalScore;
      if (ivts != this.lastEmittedScoreStatus)
        bus.$emit('sliderScoreChange', ivts);
      this.lastEmittedScoreStatus = ivts;
    },
    resetSliderScore() {
      this.sliders.forEach((slider) => {
        slider.score = 0;
      });
      this.scoreChanged();
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
      return this.totalScore == this.content.validTotalScore;
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
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
      Total score
      {{ totalScore + '/' + $store.state.sliderMenu.props.validTotalScore }}
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
import { mapState } from 'vuex';

export default {
  data() {
    return {
      sliders: [],
    };
  },
  beforeMount() {},
  created() {
    this.sliderProps.forEach((sliderProp) => {
      this.sliders.push({
        id: sliderProp.id,
        color: sliderProp.color,
        min: this.defaultSettings.min,
        max: this.defaultSettings.max,
        score: this.defaultSettings.score,
      });
    });
  },
  mounted() {
    this.$store.commit('setSliderMenuVisible', true);
  },
  beforeUnmount() {
    console.log('unmounted');
    this.isVisible = false;
  },
  methods: {
    scoreChanged() {
      this.$store.commit('setTotalScoreValid', this.isValidTotalScore);
    },
    resetSliderScore() {
      this.sliders.forEach((slider) => {
        slider.score = 0;
      });
      this.$store.commit('setTotalScoreValid', this.isValidTotalScore);
    },
  },
  computed: {
    ...mapState({
      isVisible: (state) => state.sliderMenu.isVisible,
      isValidScore: (state) => state.sliderMenu.isValidScore,
      props: (state) => state.sliderMenu.props,
      defaultSettings: (state) => state.sliderMenu.defaultSettings,
      sliderProps: (state) => state.sliderMenu.sliderProps,
    }),

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
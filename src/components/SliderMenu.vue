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
        v-for="slider in getComponentById(pageId, id).sliders"
        :key="slider.id"
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
import { mapGetters } from 'vuex';
export default {
  props: {
    id: String,
    pageId: String,
    content: Object,
  },

  data() {
    return {};
  },
  beforeMount() {},
  created() {
    bus.$on('reset-slider-score', this.resetSliderScore);
  },
  mounted() {
    // this.$store.commit('setSliderMenuVisible', true);
  },
  beforeUnmount() {
    // this.isVisible = false;
  },
  methods: {
    scoreChanged() {
      let ivts = this.isValidTotalScore;
      bus.$emit('slider-total', ivts);
    },
    resetSliderScore() {
      this.sliders.forEach((slider) => {
        slider.score = 0;
      });
      this.scoreChanged();
    },
  },
  computed: {
    ...mapGetters(['getComponentById']),
    properties() {
      return this.getComponentById(this.pageId, this.id);
    },
    sliders() {
      return this.getComponentById(this.pageId, this.id).sliders;
    },
    totalScore() {
      let totalScore = 0;
      this.sliders.forEach((slider) => {
        totalScore += slider.score;
      });
      return totalScore;
    },
    isValidTotalScore() {
      return this.totalScore == this.properties.validTotalScore;
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
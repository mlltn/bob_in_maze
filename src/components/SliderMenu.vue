<template>
  <div id="slider-menu" class="bg-green-300">
    <div>Total score 10</div>
    <div>
      {{ test }}
      <el-slider min="1" max="10" v-model="test"></el-slider>
      <input
        type="range"
        min="1"
        max="100"
        value="0"
        class="slider"
        id="firstSlider"
      />
    </div>
    <div>
      <input
        type="range"
        min="1"
        max="100"
        value="0"
        class="slider"
        id="secondSlider"
      />
    </div>
    <div>
      <input
        type="range"
        min="1"
        max="100"
        value="0"
        class="slider"
        id="thirdSlider"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: 4,
    };
  },
};
</script>

<style>
</style>
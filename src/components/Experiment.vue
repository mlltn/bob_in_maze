<template>
  <div>
    <div>Experiment</div>
    <div>
      <div class="flex">
        <div id="pictureFrame" class="flex-1 bg-black">
          <img :src="currentImg" />
        </div>
        <div class="flex-1 ml-10 mr-10 mt-28">
          <SliderMenu v-if="step % 3 == 2" />
        </div>
      </div>
      <div>
        <el-button v-on:click="step++" class="bg-red-200">next</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import SliderMenu from "./SliderMenu.vue";

export default {
  data() {
    return {
      step: 0,
      img_srcs: [
        require("./../assets/material/Stimulus9-1.png"),
        require("./../assets/material/Stimulus9-2.png"),
        require("./../assets/material/Test9-1.png"),
      ],
    };
  },
  components: {
    SliderMenu,
  },
  computed: {
    currentImg() {
      return this.img_srcs[this.step % 3];
    },
  },
};
</script>

<style>
</style>
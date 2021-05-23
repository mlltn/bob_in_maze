<template>
  <div>
    <!-- <div>Experiment</div> -->
    <div class="w-full">
      <!-- PICTURE MODES -->
      <!-- MODE 1 -->
      <div v-if="props.mode == 1" class="flex">
        <div
          id="pictureFrame"
          class="flex flex-2 flex-wrap justify-center w-full"
          style=""
        >
          <div
            v-for="image in img_srcs"
            v-bind:key="image"
            class="p-2"
            style="width: 500px"
          >
            <img :src="image" class="" style="" />
          </div>
        </div>
        <div id="sliderFrame" class="flex-1 m-20" ref="slidermenu">
          <SliderMenu @scoreChanged="this.enableNextButton" class="w-full" />
        </div>
      </div>
      <!-- MODE 2 -->
      <div v-else-if="props.mode == 2" class="">
        <div id="pictureFrame" class="bg-black" style="width: 300px">
          <img :src="currentImg" />
        </div>
        <div v-if="step % 3 == 2" class="ml-10 mr-10 mt-28">
          <SliderMenu />
        </div>
      </div>
      <!-- MODE 3 -->
      <div v-else class="">
        <div id="pictureFrame" class="bg-black" style="min-width: 300px">
          <img :src="currentImg" />
        </div>
        <div v-if="step % 3 == 2" class="ml-10 mr-10 mt-28">
          <SliderMenu />
        </div>
      </div>
      <div class="m-10"></div>
      <!-- END OF PICTURE MODES -->
    </div>
    <el-button
      v-on:click="nextTask"
      :type="nextEnabled ? 'success' : 'plain'"
      class="button-corner"
      >next</el-button
    >
  </div>
</template>

<script>
import SliderMenu from './SliderMenu.vue';

export default {
  data() {
    return {
      step: 0,
      nextEnabled: false,

      props: {
        pic_width: '10em',
        mode: 1,
      },
      img_srcs: [
        require('./../assets/material/Stimulus9-1.png'),
        require('./../assets/material/Stimulus9-2.png'),
        require('./../assets/material/Test9-1.png'),
      ],
    };
  },
  components: {
    SliderMenu,
  },
  methods: {
    enableNextButton(enable) {
      this.nextEnabled = enable;
    },
    nextTask() {
      return true;
    },
  },
  computed: {
    currentImg() {
      return this.img_srcs[this.step % 3];
    },
  },
};
</script>

<style>
.center-help-div {
  display: table-cell;
  vertical-align: middle;
}
.button-corner {
  position: fixed;
  bottom: 100px;
  right: 100px;
}
</style>
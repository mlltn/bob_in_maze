<template>
  <div>
    <!-- <div>Experiment</div> -->
    <div class="w-full">
      <!-- PICTURE MODES -->
      <el-button
        v-on:click="props.mode = (props.mode % 3) + 1"
        :type="'primary'"
        class="button-corner-tl"
        >CHANGE MODE ({{ props.mode }})</el-button
      >
      <!-- MODE 1 -->
      <div v-if="props.mode == 1" class="flex">
        <div
          id="pictureFrame"
          class="flex flex-2 flex-wrap justify-center w-full"
          style=""
        >
          <div
            v-for="image in currentImgSet"
            v-bind:key="image.fileName"
            class="p-2"
            style="width: 500px"
          >
            <p>{{ image.fileName }}</p>
            <img :src="image.path" class="" style="" />
          </div>
        </div>
        <div id="sliderFrame" class="flex-1 m-20">
          <SliderMenu
            ref="slidermenu"
            class="w-full"
            :content="content['SliderMenu#experiment']"
            id="SliderMenu#experiment"
          />
        </div>
      </div>
      <!-- MODE 2 -->
      <div v-else-if="props.mode == 2" class="flex">
        <div
          id="pictureFrame"
          class="flex flex-2 flex-wrap justify-center w-full"
          style=""
        >
          <div v-if="step % 2 == 0" class="p-2" style="width: 500px">
            <p>{{ currentImgSet[0].fileName }}</p>
            <img :src="currentImgSet[0].path" class="" style="" />
          </div>
          <div v-if="step % 2 == 0" class="p-2" style="width: 500px">
            <p>{{ currentImgSet[1].fileName }}</p>
            <img :src="currentImgSet[1].path" class="" style="" />
          </div>
          <div v-if="step % 2 == 1">
            <p>{{ currentImgSet[2].fileName }}</p>
            <img :src="currentImgSet[2].path" class="" style="width: 500px" />
          </div>
        </div>
        <div v-if="step % 2 == 1" id="sliderFrame" class="flex-1 m-20">
          <SliderMenu
            ref="slidermenu"
            :content="content['SliderMenu#experiment']"
            class="w-full"
            id="SliderMenu#experiment"
          />
        </div>
      </div>

      <!-- MODE 3 -->
      <div v-else-if="props.mode == 3" class="flex">
        <div
          id="pictureFrame"
          class="flex flex-2 flex-wrap justify-center w-full"
          style=""
        >
          <div
            v-for="(image, index) in currentImgSet"
            v-bind:key="image.fileName"
            v-show="step % 3 == index"
            class="p-2"
            style="width: 500px"
          >
            <p>{{ image.fileName }}</p>
            <img :src="image.path" class="" style="" />
          </div>
        </div>
        <div v-if="step % 3 == 2" id="sliderFrame" class="flex-1 m-20">
          <SliderMenu
            ref="slidermenu"
            :content="content['SliderMenu#experiment']"
            lass="w-full"
            id="SliderMenu#experiment"
          />
        </div>
      </div>

      <!-- END OF PICTURE MODES -->
    </div>
    <el-button
      v-on:click="nextStep"
      :disabled="!isValidTotal"
      type="success"
      class="button-corner"
      :key="step"
      >next</el-button
    >
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';
import SliderMenu from './SliderMenu.vue';

import { bus } from '../main.js';

export default {
  props: { content: Object },
  data() {
    return {
      asdf: 1,
      step: 0,
      task: 1,
      isValidTotal: true,
      props: {
        pic_width: '10em',
        mode: 2,
        totalTasks: 5,
      },
      randomizedTaskOrder: [],
    };
  },
  components: {
    SliderMenu,
  },
  created() {
    bus.$on('slider-total', (condition) => {
      this.isValidTotal = condition;
    });
    this.randomizedTaskOrder = _.shuffle([...Array(5).keys()]);
  },
  methods: {
    nextStep() {
      this.step++;
      if (this.step > this.props.mode) {
        this.step = 0;
        this.task++;
        bus.$emit('reset-slider-score', {});
        if (this.task > this.totalTasks) {
          this.endExperiment();
        }
      }
    },
    endExperiment() {
      console.log('loppu');
      return;
    },
  },
  computed: {
    ...mapState({
      sliderMenu: (state) => state.sliderMenu,
      preloadedMedia: (state) => state.preloadedMedia,
    }),
    currentImgSet() {
      let stimulus1 =
        this.preloadedMedia[
          './' + this.randomizedTaskOrder[this.task] + '/Stimulus-1.png'
        ];
      let stimulus2 =
        this.preloadedMedia[
          './' + this.randomizedTaskOrder[this.task] + '/Stimulus-2.png'
        ];
      let test =
        this.preloadedMedia[
          './' + this.randomizedTaskOrder[this.task] + '/Test-1.png'
        ];
      return [stimulus1, stimulus2, test];
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
.button-corner-tl {
  position: fixed;
  top: 20px;
  left: 20px;
}
</style>
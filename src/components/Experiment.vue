<template>
  <div>
    <!-- <div>Experiment</div> -->
    <div class="w-full mt-40">
      <!-- PICTURE MODES -->
      <el-button
        v-if="devModeEnabled"
        v-on:click="mode = (mode % 2) + 1"
        :type="'primary'"
        class="button-corner-tl"
        >CHANGE MODE ({{ mode }})</el-button
      >
      <!-- MODE 1 -->
      <div v-if="mode == 1" class="flex">
        <div
          id="pictureFrame"
          class="flex flex-1 flex-wrap w-full"
          :class="step % 3 == 2 ? 'justify-end' : 'justify-center'"
          style=""
        >
          <div
            v-for="(image, index) in currentImgSet"
            v-bind:key="image.fileName"
            v-show="step % 3 == index"
            class="p-2"
            style="width: 500px"
          >
            <p v-if="$store.state.showGuides">
              {{ '(' + image.fileName + ')' }}
            </p>
            <img :src="image.path" class="" style="" />
          </div>
        </div>
        <div v-if="step % 3 == 2" id="sliderFrame" class="flex-1 m-20 mt-28">
          <SliderMenu
            ref="slidermenu"
            :content="content['SliderMenu#experiment']"
            class="w-full"
            id="SliderMenu#experiment"
            pageId="experiment"
          />
        </div>
      </div>
      <!-- MODE 2 -->
      <div v-if="mode == 2" class="flex">
        <div
          id="pictureFrame"
          class="flex flex-1 flex-wrap w-full"
          :class="step % 2 == 1 ? 'justify-end' : 'justify-center'"
          style=""
        >
          <div v-if="step % 2 == 0" class="p-2 mx-12" style="width: 500px">
            <p v-if="$store.state.showGuides">
              {{ '(' + currentImgSet[0].fileName + ')' }}
            </p>
            <img :src="currentImgSet[0].path" class="" style="" />
          </div>
          <div v-if="step % 2 == 0" class="p-2 mx-12" style="width: 500px">
            <p v-if="$store.state.showGuides">
              {{ '(' + currentImgSet[1].fileName + ')' }}
            </p>
            <img :src="currentImgSet[1].path" class="" style="" />
          </div>
          <div v-if="step % 2 == 1">
            <p v-if="$store.state.showGuides">
              {{ '(' + currentImgSet[2].fileName + ')' }}
            </p>
            <img :src="currentImgSet[2].path" class="" style="width: 500px" />
          </div>
        </div>
        <div v-if="step % 2 == 1" id="sliderFrame" class="flex-1 m-20 mt-28">
          <SliderMenu
            ref="slidermenu"
            :content="content['SliderMenu#experiment']"
            class="w-full"
            id="SliderMenu#experiment"
            pageId="experiment"
          />
        </div>
      </div>

      <!-- END OF PICTURE MODES -->
    </div>

    <ProgressBar
      class="fixed left-1/4 bottom-24 m-3 w-1/2"
      :step="task + 1"
      :maxSteps="props.totalTasks"
    >
    </ProgressBar>

    <el-button
      v-on:click="nextStep"
      :disabled="isSliderStep() && !isValidTotal"
      type="success"
      class="button-corner"
      :key="step"
      >next</el-button
    >
    <!-- <el-button v-on:click="saveResult" type="success" key="asfkjasf"
      >test</el-button
    > -->
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState, mapGetters } from 'vuex';
import SliderMenu from './SliderMenu.vue';
import ProgressBar from './ProgressBar.vue';

import { bus } from '../main.js';

export default {
  props: { content: Object },
  data() {
    return {
      step: 0,
      task: 0,
      mode: 0,
      isValidTotal: false,
      props: {
        pic_width: '10em',
        totalTasks: 2,
      },
      currentTaskStartTime: Date.now(),
      randomizedTaskOrder: [],
    };
  },
  components: {
    SliderMenu,
    ProgressBar,
  },
  created() {
    bus.$on('slider-total', (condition) => {
      this.isValidTotal = condition;
    });

    this.randomizedTaskOrder = _.shuffle([
      ...Array(this.getTaskCount()).keys(),
    ]);
    this.mode = _.random(1, 2);
  },
  methods: {
    getTaskCount() {
      let tasks = {};
      Object.keys(this.preloadedMedia).forEach((key) => {
        tasks[key.split('/')[1]] = 'PURKKA';
      });
      return Object.keys(tasks).length;
    },
    nextStep() {
      this.step++;
      if (this.endOfTask()) {
        this.saveResult();
        this.prepareNextTask();
        if (this.isEndOfExperiment()) {
          this.endExperiment();
        }
      }
    },
    saveResult() {
      let taskResult = {};

      taskResult['task_index'] = this.task;
      taskResult['task_id'] = this.getCurrentTaskId();
      taskResult['time_spent'] = this.getTaskCompletionTime();
      taskResult['slider_info'] = this.getSliders();

      this.$store.commit('pushNewExperimentResult', taskResult);
    },
    getTaskCompletionTime() {
      return Date.now() - this.currentTaskStartTime;
    },
    getSliders() {
      return _.cloneDeep(this.sliders);
    },
    prepareNextTask() {
      this.step = 0;
      this.task++;
      bus.$emit('reset-slider-score', {});
      this.currentTaskStartTime = Date.now();
    },
    isSliderStep() {
      if (this.mode == 1) {
        return this.step == 2;
      } else if (this.mode == 2) {
        return this.step == 1;
      } else {
        console.log('############# VIRHE ###############');
      }
    },
    endOfTask() {
      if (this.mode == 1) {
        return this.step > 2;
      } else if (this.mode == 2) {
        return this.step > 1;
      } else {
        console.log('############# VIRHE ###############');
      }
    },
    getCurrentTaskId() {
      return this.randomizedTaskOrder[this.task];
    },
    isEndOfExperiment() {
      return this.task > this.props.totalTasks - 1;
    },
    endExperiment() {
      console.log('loppu');
      this.$store.commit('submitResults');
      this.$store.commit('nextPage');
      return;
    },
  },
  computed: {
    ...mapGetters(['getDynamicProp']),
    ...mapState({
      sliders: (state) =>
        state.pages['experiment'].components['SliderMenu#experiment'].sliders,
      preloadedMedia: (state) => state.preloadedMedia,
    }),
    currentImgSet() {
      let stimulus1 =
        this.preloadedMedia['./' + this.getCurrentTaskId() + '/Stimulus-1.png'];
      let stimulus2 =
        this.preloadedMedia['./' + this.getCurrentTaskId() + '/Stimulus-2.png'];
      let test =
        this.preloadedMedia['./' + this.getCurrentTaskId() + '/Test-1.png'];
      return [stimulus1, stimulus2, test];
    },

    devModeEnabled() {
      return this.getDynamicProp('DEV_MODE');
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

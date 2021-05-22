<template>
  <div>
    <div>Experiment</div>
    <div>
      <div class="flex">
        <div id="pictureFrame" class="flex-1 bg-black">
          <img src="./../assets/material/Stimulus9-1.png" />
        </div>
        <div class="flex-1 bg-green-500">
          <SliderMenu />
        </div>
      </div>
      <div>
        <button class="bg-red-200">next</button>
      </div>
    </div>
  </div>
</template>

<script>
import SliderMenu from "./SliderMenu.vue";

export default {
  components: {
    SliderMenu,
  },
};
</script>

<style>
</style>
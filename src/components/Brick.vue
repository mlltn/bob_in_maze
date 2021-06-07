<template>
  <div
    :class="
      (this.$attrs.content._styles !== undefined
        ? this.$attrs.content._styles
        : '') +
      (this.$attrs.name.startsWith('Horizontal') ? ' flex justify-center' : '')
    "
  >
    <template
      v-if="
        this.$attrs.name.startsWith('Horizontal') ||
        this.$attrs.name.startsWith('Vertical')
      "
    >
      <Brick
        v-for="(content, name) in parseComponents(this.$attrs.content)"
        v-bind:key="name + '_' + $uuid.v4()"
        v-bind:name="name"
        v-bind:content="content"
      >
      </Brick>
    </template>
    <template v-else-if="this.$attrs.name == 'Title'">
      <h1>{{ $t(this.$attrs.content.caption) }}</h1>
    </template>
    <template v-else-if="this.$attrs.name.startsWith('TextArea')">
      <p>
        {{ $t(this.$attrs.content.text) }}
      </p>
    </template>
    <template v-else-if="this.$attrs.name.startsWith('Picture')">
      <Picture v-bind:source="this.$attrs.content.src" />
    </template>

    <template v-else-if="this.$attrs.name.startsWith('Sliders')">
      <SliderMenu />
    </template>
    <template v-else-if="this.$attrs.name.startsWith('Experiment')">
      <Experiment />
    </template>

    <!-- <div
      v-for="(item, name) in this.$attrs.content"
      v-bind:key="name + '_' + $uuid.v4()"
    >
      {{ item }}
        </div> -->
  </div>
</template>

<script>
import Picture from './Picture.vue';
import Experiment from './Experiment.vue';
import SliderMenu from './SliderMenu';
export default {
  name: 'Brick',
  data() {
    return {};
  },
  components: {
    Picture,
    Experiment,
    SliderMenu,
  },
  methods: {
    parseComponents(components) {
      const arr = Object.entries(components);
      const filteredArr = arr.filter(([key]) => !key.startsWith('_'));
      return Object.fromEntries(filteredArr);
    },
  },
};
</script>

<style>
</style>
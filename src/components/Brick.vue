<template>
  <div
    :class="
      (content._styles !== undefined ? content._styles : '') +
      (name.startsWith('Horizontal') ? ' flex justify-center' : '')
    "
  >
    <template
      v-if="name.startsWith('Horizontal') || name.startsWith('Vertical')"
    >
      <Brick
        v-for="(content, name) in parseComponents(content)"
        v-bind:key="name + '_' + $uuid.v4()"
        :name="name"
        :id="name"
        :content="content"
      >
      </Brick>
    </template>
    <template v-else-if="name == 'Title'">
      <h1>{{ $t(content.caption) }}</h1>
    </template>
    <template v-else-if="name.startsWith('TextArea')">
      <p>
        {{ $t(content.text) }}
      </p>
    </template>
    <template v-else-if="name.startsWith('Picture')">
      <Picture v-bind:source="content.src" />
    </template>

    <template v-else-if="name.startsWith('SliderMenu')">
      <SliderMenu :content="content" :id="name" />
    </template>
    <template v-else-if="name.startsWith('Experiment')">
      <Experiment :content="content" />
    </template>

    <!-- <div
      v-for="(item, name) in content"
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
  props: { name: String, id: String, content: Object },
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
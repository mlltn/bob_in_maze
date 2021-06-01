<template>
  <div :class="horizontal ? 'inline-block' : ''">
    <template v-if="this.$attrs.name == 'Horizontal'">
      <Brick
        v-for="(component, name) in this.$attrs.content"
        v-bind:key="name + '_' + $uuid.v4()"
        v-bind:name="name"
        v-bind:content="component"
        :horizontal="true"
      >
      </Brick>
    </template>
    <template v-else-if="this.$attrs.name == 'Title'">
      <h1>{{ this.$attrs.content.caption }}</h1>
    </template>
    <template v-else-if="this.$attrs.name == 'Text'">
      <p
        v-for="(text_code, id) in this.$attrs.content"
        v-bind:key="id + '_' + $uuid.v4()"
      >
        {{ $t(text_code) }}
      </p>
    </template>
    <template v-else-if="this.$attrs.name == 'Image'">
      <Picture v-bind:source="this.$attrs.content.src" />
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
export default {
  name: 'Brick',
  props: { horizontal: Boolean },
  data() {
    return {};
  },
  components: {
    Picture,
  },
};
</script>

<style>
</style>
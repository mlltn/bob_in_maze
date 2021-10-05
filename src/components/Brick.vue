<template>
  <div
    :class="
      (content._styles !== undefined ? content._styles : '') +
      (name.startsWith('Horizontal') ? ' flex justify-left' : '')
    "
  >
    <p
      v-if="
        $store.state.showGuides &&
        !name.startsWith('Horizontal') &&
        !name.startsWith('Vertical')
      "
    >
      {{ '(' + name + ')' }}
    </p>

    <template
      v-if="name.startsWith('Horizontal') || name.startsWith('Vertical')"
    >
      <Brick
        v-for="(content, name) in parseComponents(content)"
        v-bind:key="name + '_' + $uuid.v4()"
        :name="name"
        :id="name"
        :pageId="pageId"
        :content="content"
        class="m-4"
        :ref="'_REF_HANDLE_'"
      >
      </Brick>
    </template>

    <template v-else-if="name.startsWith('TextArea')">
      <TextAreaTODO
        :id="name"
        :pageId="pageId"
        :text="content.text"
        :type="content.type"
      />
    </template>

    <template v-else-if="name.startsWith('InputField')">
      <InputField
        :id="name"
        :pageId="pageId"
        :placeholder="content.placeholder"
        :type="content.type"
        :ref="'_REF_HANDLE_'"
      ></InputField>
    </template>

    <template v-else-if="name.startsWith('Picture')">
      <Picture v-bind:content="content" />
    </template>

    <template v-else-if="name.startsWith('SliderMenu')">
      <SliderMenu
        :content="content"
        :id="name"
        :pageId="pageId"
        :name="name"
        :ref="'_REF_HANDLE_'"
      />
    </template>
    <template v-else-if="name.startsWith('CheckBoxMenu')">
      <CheckBoxMenu
        :id="name"
        :pageId="pageId"
        :name="name"
        :translations="content.translations"
        :title="content.title"
        :ref="'_REF_HANDLE_'"
      />
    </template>

    <template v-else-if="name.startsWith('ProgressBar')">
      <ProgressBar
        :id="name"
        :title="content.title"
        :step="content.step"
        :maxSteps="content.maxSteps"
      />
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
import Experiment from './Experiment';
import SliderMenu from './SliderMenu';
import ProgressBar from './ProgressBar';
import InputField from './InputField';
import CheckBoxMenu from './CheckBoxMenu';
import TextAreaTODO from './TextAreaTODO';
export default {
  props: {
    name: String,
    id: String,
    pageId: String,
    content: Object,
  },
  name: 'Brick',
  data() {
    return {};
  },
  components: {
    Picture,
    Experiment,
    SliderMenu,
    ProgressBar,
    InputField,
    CheckBoxMenu,
    TextAreaTODO,
  },
  methods: {
    parseComponents(components) {
      const arr = Object.entries(components);
      const filteredArr = arr.filter(([key]) => !key.startsWith('_'));
      return Object.fromEntries(filteredArr);
    },
    executeLeavePageActions() {
      try {
        this.$refs['_REF_HANDLE_'].executeLeavePageActions();
      } catch {
        // console.log('NoLeavePageAction: ' + this.id);
      }
      if (typeof this.content['resultKey'] !== 'undefined') {
        this.$store.commit('saveResult', {
          resultKey: this.content['resultKey'],
          key: this.name.split('#')[1], //TODO dynamically add names to mongoose model
          value: this.$refs['_REF_HANDLE_'].getValue(),
        });
      }
    },
  },
};
</script>

<style>
</style>
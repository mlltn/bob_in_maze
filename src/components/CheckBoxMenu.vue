<template>
  <div class="text-left m-5">
    <div>
      <el-checkbox
        v-for="checkbox in checkBoxes"
        :label="$t(checkbox.label)"
        v-bind:key="checkbox.index"
        v-model="checkbox.checked"
        @change="checkBoxChanged()"
      ></el-checkbox>
    </div>
  </div>
</template>

<script>
import { bus } from "../main.js";
import { mapGetters } from "vuex";
export default {
  props: {
    name: String,
    id: String,
    pageId: String,
  },
  data() {
    return {};
  },
  methods: {
    checkBoxChanged() {
      if (this.allBoxesChecked) {
        bus.$emit("all-boxes-checked", true);
      } else {
        bus.$emit("all-boxes-checked", false);
      }
    },
  },
  computed: {
    ...mapGetters(["getComponentById"]),
    checkBoxes() {
      return this.getComponentById(this.pageId, this.id).checkboxes;
    },
    allBoxesChecked() {
      let allBoxesChecked = true;
      this.checkBoxes.forEach((cb) => {
        if (!cb.checked) {
          allBoxesChecked = false;
          return;
        }
      });
      return allBoxesChecked;
    },
  },
  components: {},
};
</script>

<style>
</style>
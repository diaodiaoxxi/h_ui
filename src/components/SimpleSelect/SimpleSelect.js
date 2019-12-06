import SimpleSelect from "../SelectTable/SelectTable.vue";
export default {
  name: "SimpleSelect",
  mixins: [SimpleSelect],
  props: {
    block: {
      default: true
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    // 是否展示下拉项的提示信息
    showTitle: {
      type: Boolean,
      default: false
    }
  }
};

<template>
  <div style="background: #eee;">
      <h-select-tree
      v-model="val1"
      style="width:200px"
      selectToCheck
      @on-select-change="selectChange"
      @on-check-change="checkChange"
      :data="baseData1"
      showCheckbox
      checkStrictly
    ></h-select-tree>
    <!-- <h-select-tree
      v-model="val1"
      style="width:200px"
      selectToCheck
      @on-select-change="selectChange"
      @on-check-change="checkChange"
      :data="baseData1"
    ></h-select-tree> -->
    <div style="background: #eee;">
      <h-button type="primary">Primary</h-button>
      <h-button type="ghost">Ghost</h-button>
      <h-button type="dashed">Dashed</h-button>
      <h-button type="text">Text</h-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      val1: [],
      baseData1: [
        {
          title: "parent",
          id: "1-0",
          expand: true,
          children: [
            {
              title: "child1",
              id: "1-1",
              expand: true,
              children: [
                {
                  title: "child1-1-1",
                  id: "1-1-1",
                  // disableCheckbox: false,
                  // disabled: true,
                  // selected: true,
                  checked: true
                },
                {
                  title: "child1-1-2",
                  id: "1-1-2",
                  checked: true
                }
              ]
            },
            {
              title: "child2",
              id: "1-2",
              children: []
            }
          ]
        }
      ]
    };
  },
  methods: {
    selectChange(item) {
      console.log('触发了 select change', item)
    },
    checkChange(item) {
      console.log('触发了 check change', item)
    }
  }
};
</script>

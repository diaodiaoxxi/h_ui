<template>
  <div>
    <h-transfer-table
      :lColumns="columns1"
      :rColumns="columns1"
      :lData="data0"
      :rData="data1"
      stripe
      :option="options1"
      noEdit
      :itemHeight="28"
      :treeOption="treeOption"
    ></h-transfer-table>
  </div>
</template>
<script>
var tData = [
  {
    name: "王小明1",
    age: 18,
    address: "北京市朝阳区芍药居",
    money: "120.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1"
    // _highlight: true//默认选择当前项
  },
  {
    name: "张小刚2",
    age: 25,
    address: "北京市海淀区西二旗",
    money: "130.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1"
  },
  {
    name: "李小红3",
    age: 30,
    address: "上海市浦东新区世纪大道",
    money: "140.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1"
  },
  {
    name: "周小伟4",
    age: 26,
    address: "深圳市南山区深南大道",
    money: "150.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1"
  },
  {
    name: "王小明5",
    age: 18,
    address: "北京市朝阳区芍药居",
    money: "120.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1"
    // _highlight: true//默认选择当前项
  },
  {
    name: "张小刚6",
    age: 25,
    address: "北京市海淀区西二旗",
    money: "130.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1"
  },
  {
    name: "李小红7",
    age: 30,
    address: "上海市浦东新区世纪大道",
    money: "140.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1"
  },
  {
    name: "李小红8",
    age: 30,
    address: "上海市浦东新区世纪大道",
    money: "140.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1"
  },
  {
    name: "李小红9",
    age: 30,
    address: "上海市浦东新区世纪大道",
    money: "140.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1"
  },
  {
    name: "李小红10",
    age: 30,
    address: "上海市浦东新区世纪大道",
    money: "140.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1"
  },
  {
    name: "李小红11",
    age: 30,
    address: "上海市浦东新区世纪大道",
    money: "140.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1"
  },
  {
    name: "李小红12",
    age: 30,
    address: "上海市浦东新区世纪大道",
    money: "140.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1"
  },
];
var column = [
  {
    type: "selection",
    width: 50
  },
  {
    title: "姓名",
    key: "name",
    width: 160,
  },

  {
    title: "年龄",
    width: 200,
    key: "age"
  },
  {
    width: 200,
    title: "地址"
  },
  {
    title: "金额",
    width: 200,
    key: "money"
  },
  {
    type: "card",
    title: "卡号",
    key: "cardId"
  },
  {
    title: "地区",
    width: 200,
    key: "city"
  },
  {
    title: "日期",
    width: 200,
    key: "dating"
  },
  {
    title: "时间",
    width: 200,
    key: "timing"
  },
  {
    title: "下拉树",
    width: 200,
    key: "tree1"
  }
];

export default {
  data() {
    return {
      columns1: column,
      data0: [],
      data1: tData,
      options1: [],
      treeOption: []
    };
  },
  methods: {
    ttt(a, b, c) {
      console.log(a.length);
      console.log(b);
      console.log(c);
      if (a.length > 5) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style >
.h-table th, .h-table td {
  height: 28px!important;
}
</style>
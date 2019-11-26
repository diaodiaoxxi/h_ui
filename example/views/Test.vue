<template>
  <div>
    {{model1}}
    <h-select v-model="model1" style="width:300px" initValueTypeToString>
      <h-option v-for="(item,index) in cityList" :value="item.value" :key="index">{{ item.label }}</h-option>
    </h-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cityList: [],
      model1: ""
    };
  },
  created() {
    this.cityList = [
      {
        value: "beijing",
        label: "北京市"
      },
      {
        value: "shanghai",
        label: "上海市"
      },
      {
        value: "shenzhen",
        label: "深圳市"
      },
      {
        value: "hangzhou",
        label: "杭州市"
      },
      {
        value: "1",
        label: "南京市"
      },
      {
        value: "2",
        label: "重庆市"
      },
      {
        value: "3",
        label: "天津市"
      }
    ];
    setTimeout(() => {
      this.model1 = 1  
    }, 1000);
  }
};
</script>

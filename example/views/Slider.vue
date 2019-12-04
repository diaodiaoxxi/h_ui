<template>
  <div>
    <h1>基本用法</h1>
    <h-slider v-model="value1"></h-slider>
    <h-slider v-model="value2" range></h-slider>
    <h-slider v-model="value3" range disabled></h-slider>
    <h1>通过设置属性 step 可以控制每次滑动的间隔</h1>
    <h-slider v-model="value4" :step="10"></h-slider>
    <h-slider v-model="value5" :step="10" range></h-slider>
    <h1>显示断点</h1>
    <h-slider v-model="value6" :step="10" show-stops></h-slider>
    <h-slider v-model="value7" :step="10" show-stops range></h-slider>
    <h1>带输入框</h1>
    <h-slider v-model="value8" show-input></h-slider>
    <h1>自定义提示</h1>
    <h-slider v-model="value9" :tip-format="format"></h-slider>
    <h-slider v-model="value10" :tip-format="hideFormat"></h-slider>
    <h1>always</h1>
    <h-slider v-model="value11" :tip-format="format" show-tip="always" ></h-slider>
  </div>  
</template>

<script>

export default {
  name: 'Slider',
  data() {
    return {
      value1: 25,
      value2: [20, 50],
      value3: [20, 50],
      value4: 30,
      value5: [20, 50],
      value6: 30,
      value7: [20, 50],
      value8: 25,
      value9: 25,
      value10: 25,
      value11: 30
    }
  },
  methods:{
    format (val) {
      return '进度' + val + '%';
    },
    hideFormat () {
      return null;
    }
  } 
}
</script>
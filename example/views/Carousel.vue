<template>
	<div>
	  <h1>基本用法</h1>
		<h-carousel v-model="value1" @on-change="change" :height="300">
      <h-carouselitem>
        <div class="demo-carousel">1</div>
      </h-carouselitem>
      <h-carouselitem>
        <div class="demo-carousel">2</div>
      </h-carouselitem>
      <h-carouselitem>
        <div class="demo-carousel">3</div>
      </h-carouselitem>
      <h-carouselitem>
        <div class="demo-carousel">4</div>
      </h-carouselitem>
      <h-carouselitem>
        <div class="demo-carousel">5</div>
      </h-carouselitem>
    </h-carousel>
    <br>
    <h-carousel v-model="value1" easing="linear">
      <h-carouselitem>
        <div class="demo-carousel">1</div>
      </h-carouselitem>
      <h-carouselitem>
        <div class="demo-carousel">2</div>
      </h-carouselitem>
      <h-carouselitem>
        <div class="demo-carousel">3</div>
      </h-carouselitem>
      <h-carouselitem>
        <div class="demo-carousel">4</div>
      </h-carouselitem>
      <h-carouselitem>
        <div class="demo-carousel">5</div>
      </h-carouselitem>
    </h-carousel>
    <br>
    <h-carousel v-model="value1" easing="ease-out">
      <h-carouselitem>
        <div class="demo-carousel">1</div>
      </h-carouselitem>
      <h-carouselitem>
        <div class="demo-carousel">2</div>
      </h-carouselitem>
      <h-carouselitem>
        <div class="demo-carousel">3</div>
      </h-carouselitem>
      <h-carouselitem>
        <div class="demo-carousel">4</div>
      </h-carouselitem>
      <h-carouselitem>
        <div class="demo-carousel">5</div>
      </h-carouselitem>
    </h-carousel>
	</div>
</template>
<script>
export default{
	name:'Carouser',
	data(){
    return{
      value1: 0
    }
	},
  methods:{
    change (s,i) {
      console.log(s);
      console.log(i);
    }
  }
}
</script>
<style type="text/css">
  .demo-carousel{
    height: 200px;
    line-height: 200px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: #506b9e;
  }
</style>
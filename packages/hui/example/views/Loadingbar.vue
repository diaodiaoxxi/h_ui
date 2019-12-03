<template>
	<div>		
		<p>概述：全局创建一个显示页面加载、异步请求、文件上传等的加载进度条。</p>		
		<p>说明：LoadingBar 只会在全局创建一个，因此在任何位置调用的方法都会控制这同一个组件。主要使用场景是路由切换和Ajax，因为这两者都不能拿到精确的进度，LoadingBar 会模拟进度，当然也可以通过update()方法来传入一个精确的进度，比如在文件上传时会很有用，具体见API。</p>	
		<h2>基本用法</h2>	
		<h-button @click="start">Start</h-button>
	  <h-button @click="finish">Finish</h-button>
	  <h-button @click="error">Error</h-button>
		<h2>通过直接调用以下方法来使用组件：</h2>
		<p><i>this.$Loading.start()</i></p>
		<p><i>this.$Loading.finish()</i></p>
		<p><i>this.$Loading.error()</i></p>
		<p><i>this.$Loading.update(percent)</i></p>
		<h2>另外提供了全局配置和全局销毁的方法：</h2>
		<p><i>this.$Loading.config(options)</i></p>
		<p><i>this.$Loading.destroy()</i></p>
	</div>
</template>
<script>	
	export default{
		data(){
			return{

			}
		},
		methods:{
			start () {
        this.$hLoading.start();
      },
      finish () {
        this.$hLoading.finish();
      },
      error () {
        this.$hLoading.error();
      }
		}
	}
</script>
<style>
	
</style>
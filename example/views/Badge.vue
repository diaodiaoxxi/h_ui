<template>
	<div>
	  <h2>基础用法</h2>
		<h-badge count="3">
      <a href="#" class="demo-badge"></a>
    </h-badge>
    <h2>圆点</h2>
    <h-badge dot>
      <a href="#" class="demo-badge"></a>
    </h-badge>
    <h-badge dot>
      <h-icon name="clock" size="26"></h-icon>
    </h-badge>
    <h-badge dot>
      <a href="#">可以是一个链接</a>
    </h-badge>
    <h2>通过设置overflow-count属性设置一个封顶值，当超过时，会显示${overflowCount}+</h2>
    <h-badge count="100" >
      <a href="#" class="demo-badge"></a>
    </h-badge>
    <h-badge count="1000" overflow-count="999">
      <a href="#" class="demo-badge"></a>
    </h-badge>
    <h2>独立使用及自定义样式</h2>
    <h-badge count="10"></h-badge>
    <h-badge count="20" class-name="demo-badge-alone"></h-badge>
	</div>
</template>
<script>
  export default {
      
  }
</script>
<style type="text/css">
  .demo-badge-alone{
    background: #5cb85c !important;
  }
	.demo-badge{
    width: 42px;
    height: 42px;
    background: #eee;
    border-radius: 6px;
    display: inline-block;
  }
</style>
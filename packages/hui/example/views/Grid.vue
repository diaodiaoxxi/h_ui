<template>
	<div class="example-demo">
	  <h1>基本用法</h1>
		<h-row>
      <h-col span="12">col-12</h-col>
      <h-col span="12">col-12</h-col>
    </h-row>
    <br>
    <h-row>
      <h-col span="8">col-8</h-col>
      <h-col span="8">col-8</h-col>
      <h-col span="8">col-8</h-col>
    </h-row>
    <br>
    <h-row>
      <h-col span="6">col-6</h-col>
      <h-col span="6">col-6</h-col>
      <h-col span="6">col-6</h-col>
      <h-col span="6">col-6</h-col>
    </h-row>
    <h1>区块间隔</h1>
    <p>通过给 row 添加 gutter 属性，可以给下属的 col 添加间距，推荐使用 (16+8n)px 作为栅格间隔。</p>
    <h-row :gutter="16">
      <h-col span="6">
        <div>col-6</div>
      </h-col>
      <h-col span="6">
        <div>col-6</div>
      </h-col>
      <h-col span="6">
        <div>col-6</div>
      </h-col>
      <h-col span="6">
        <div>col-6</div>
      </h-col>
    </h-row>
    <h1>栅格顺序(Flex)</h1>
    <p>通过 Flex 布局的order来改变栅格的顺序。</p>
    <h-row type="flex">
      <h-col span="6" order="4">1 | order-4</h-col>
      <h-col span="6" order="3">2 | order-3</h-col>
      <h-col span="6" order="2">3 | order-2</h-col>
      <h-col span="6" order="1">4 | order-1</h-col>
    </h-row>
    <h1>栅格排序</h1>
    <p>通过设置push和pull来改变栅格的顺序。向左移动或者向右移动</p>
    <h-row>
      <h-col span="18" push="6">col-18 | push-6</h-col>
      <h-col span="6" pull="18">col-6 | pull-18</h-col>
    </h-row>
    <h1>左右偏移</h1>
    <p>通过设置offset属性，将列进行左右偏移，偏移栅格数为offset的值。</p>
    <h-row>
        <h-col span="8">col-8</h-col>
        <h-col span="8" offset="8">col-8 | offset-8</h-col>
    </h-row>
    <br>
    <h-row>
        <h-col span="6" offset="8">col-6 | offset-8</h-col>
        <h-col span="6" offset="4">col-6 | offset-4</h-col>
    </h-row>
    <br>
    <h-row>
        <h-col span="12" offset="8">col-12 | offset-8</h-col>
    </h-row>
    <h1>Flex布局</h1>
    <p>通过给row设置参数justify为不同的值，来定义子元素的排布方式。在flex模式下有效</p>
    <p>子元素向左排列</p>
    <h-row type="flex" justify="start" class="code-row-bg">
        <h-col span="4">col-4</h-col>
        <h-col span="4">col-4</h-col>
        <h-col span="4">col-4</h-col>
        <h-col span="4">col-4</h-col>
    </h-row>
    <p>子元素向右排列</p>
    <h-row type="flex" justify="end" class="code-row-bg">
        <h-col span="4">col-4</h-col>
        <h-col span="4">col-4</h-col>
        <h-col span="4">col-4</h-col>
        <h-col span="4">col-4</h-col>
    </h-row>
    <p>子元素居中排列</p>
    <h-row type="flex" justify="center" class="code-row-bg">
        <h-col span="4">col-4</h-col>
        <h-col span="4">col-4</h-col>
        <h-col span="4">col-4</h-col>
        <h-col span="4">col-4</h-col>
    </h-row>
    <p>子元素等宽排列</p>
    <h-row type="flex" justify="space-between" class="code-row-bg">
        <h-col span="4">col-4</h-col>
        <h-col span="4">col-4</h-col>
        <h-col span="4">col-4</h-col>
        <h-col span="4">col-4</h-col>
    </h-row>
    <p>子元素分散排列</p>
    <h-row type="flex" justify="space-around" class="code-row-bg">
        <h-col span="4">col-4</h-col>
        <h-col span="4">col-4</h-col>
        <h-col span="4">col-4</h-col>
        <h-col span="4">col-4</h-col>
    </h-row>
    <h1>Flex对齐</h1>
    <p>通过给row设置参数align为不同的值，来定义子元素在垂直方向上的排布方式。在flex模式下有效。</p>
    <p>顶部对齐</p>
    <h-row type="flex" justify="center" align="top" class="code-row-bg">
        <h-col span="4"><p style="height: 80px">col-4</p></h-col>
        <h-col span="4"><p style="height: 30px">col-4</p></h-col>
        <h-col span="4"><p style="height: 100px">col-4</p></h-col>
        <h-col span="4"><p style="height: 60px">col-4</p></h-col>
    </h-row>
    <p>底部对齐</p>
    <h-row type="flex" justify="center" align="bottom" class="code-row-bg">
        <h-col span="4"><p style="height: 80px">col-4</p></h-col>
        <h-col span="4"><p style="height: 30px">col-4</p></h-col>
        <h-col span="4"><p style="height: 100px">col-4</p></h-col>
        <h-col span="4"><p style="height: 60px">col-4</p></h-col>
    </h-row>
    <p>居中对齐</p>
    <h-row type="flex" justify="center" align="middle" class="code-row-bg">
        <h-col span="4"><p style="height: 80px">col-4</p></h-col>
        <h-col span="4"><p style="height: 30px">col-4</p></h-col>
        <h-col span="4"><p style="height: 100px">col-4</p></h-col>
        <h-col span="4"><p style="height: 60px">col-4</p></h-col>
    </h-row>
    <h1>响应式布局</h1>
    <p>预设四个响应尺寸：xs小于768px sm≥768px md≥992px lg≥1200px </p>
    <h-row>
        <h-col :xs="2" :sm="4" :md="6" :lg="8">Col</h-col>
        <h-col :xs="20" :sm="16" :md="12" :lg="8">Col</h-col>
        <h-col :xs="2" :sm="4" :md="6" :lg="8">Col</h-col>
    </h-row>
    <h1>其它属性的响应式</h1>
    <h-row>
        <h-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</h-col>
        <h-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</h-col>
        <h-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</h-col>
    </h-row>
	</div>
</template>
<script>	
	export default{
		name:"Gird"
	}
</script>
<style>
	.example-demo .h-col,.example-demo .h-col div{
    color: #fff;
    padding: 10px 0;
    text-align: center;
    background: rgba(0,153,229,.9);
  }
  .example-demo .h-col:nth-child(odd) {
    background: rgba(0,153,229,.7);
  }
  .code-row-bg {
    background: rgba(0,0,0,.05);
  }

</style>
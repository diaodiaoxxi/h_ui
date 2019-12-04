<template>
  <div>
    <h2>基础用法</h2>
    <h-spin></h-spin>
    <h2>各种尺寸</h2>
    <h-spin size="small"></h-spin>
    <h-spin></h-spin>
    <h-spin size="large"></h-spin>
    <h2>居中固定</h2>
    <div class="demo-spin-container">
      <h-spin fix></h-spin>
    </div>
    <h2>自定义内容</h2>
    <div class="demo-spin-col" span="8">
      <h-spin fix>加载中...</h-spin>
    </div>
    <div class="demo-spin-col" span="8">
      <h-spin fix>
          <h-icon name="load-c" size=18 class="demo-spin-icon-load"></h-icon>
          <div>Loading</div>
      </h-spin>
    </div>

    <div class="demo-spin-article">
        <h3>登金陵凤凰台</h3>
        <address>李白</address>
        <article>
            <p>凤凰台上凤凰游，凤去台空江自流。</p>
            <p>吴宫花草埋幽径，晋代衣冠成古丘。</p>
            <p>三山半落青天外，二水中分白鹭洲。</p>
            <p>总为浮云能蔽日，长安不见使人愁。</p>
        </article>
        <h-spin size="large" fix v-if="spinShow"></h-spin>
    </div>
    <br>
    切换显示状态：<h-switch @on-change="spinShow = !spinShow"></h-switch>
  </div>  
</template>

<script>

export default {
  
  name: 'home',
  data() {
    return {
      switch1:false,
      disabled: true,
      spinShow: true
    }
  },
  methods:{
    change(status){
      console.log(status);
    }
  } 
}
</script>
<style type="text/css">
.demo-spin-article{
        width: 400px;
        height: 200px;
        padding: 10px;
        position: relative;
        border: 1px solid #eee;
        text-align: center;
    }
    .demo-spin-article h3{
        font-size: 22px;
    }
    .demo-spin-article address{
        color: #999;
        font-style: normal;
        font-size: 14px;
    }
    .demo-spin-article p{
        font-size: 16px;
    }
.demo-spin-container{
    display: inline-block;
    width: 200px;
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
</style>
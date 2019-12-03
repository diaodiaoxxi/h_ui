<template>
  <div>
    <h2>基本用法 - 固定在顶部</h2><br>
    <h-affix>
      <span class="demo-affix">固定在最顶部</span>
    </h-affix>
    <br>
    
    <h2>顶部偏移</h2><br>
    <h-affix :offset-top="80">
      <span class="demo-affix">固定在离顶部80px的位置</span>
    </h-affix>
    <br>
    
    <h2>固定状态改变时回调</h2><br>
    <h-affix :offset-top="160" @on-change="change">
      <span class="demo-affix">固定在离顶部160px的位置</span>
    </h-affix>
    <br>
    
    <h2>固定在底部</h2><br>
    <h-affix :offset-bottom="80">
      <span class="demo-affix">固定在离底部80px的位置</span>
    </h-affix>
    <br>
    
    <h2>底部偏移</h2><br>
    <h-affix :offset-bottom="0">
      <span class="demo-affix">固定在离底部0px的位置</span>
    </h-affix>
    <br>

    <div style="height:1000px;"></div>

  </div>  
</template>

<script>

export default {
  name: 'Affix',
  data () {
    return{}
  },
  methods:{
    change (status) {
      this.$hMessage.info(`当前状态：${status}`);
    }
  }
}
</script>

<style type="text/css">
  .demo-affix {
    display: inline-block;
    color: #fff;
    padding: 10px 30px;
    text-align: center;
    background: rgba(0,153,229,.9);
  }
</style>
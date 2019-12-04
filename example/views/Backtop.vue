<template>
  <div>
  
    <h2>backTop 基本用法 (只显示图标)</h2>
    <h-backtop bottom="30" duration="2000"></h-backtop>

    <h2>自定义图标</h2>
    <h-backtop bottom="80" height="300">
      <h-icon name="chevron-up">4444</h-icon>
    </h-backtop>

    <h2>基本用法 (只显示文字)</h2>
    <h-backtop bottom="130" height="200" right="200"></h-backtop>

    <h2>自定义文字</h2>
    <h-backtop bottom="165" height="100">
      <span class="top">backtop</span>
    </h-backtop><br><br>



    <h1>backBottom 基本用法 (只显示图标)</h1>
    <h-gobottom  top="30" duration="2000"></h-gobottom>

    <h2>自定义图标</h2>
    <h-gobottom  top="80" reserve-height="300">
      <h-icon name="chevron-down"></h-icon>
    </h-gobottom>

    <h2>基本用法 (只显示文字)</h2>
    <h-gobottom  top="130" reserve-height="200"></h-gobottom>

    <h2>自定义文字</h2>
    <h-gobottom  top="165" reserve-height="100" right="200">
      <div class="top"> backbottom </div>
    </h-gobottom>


    <div style="height:2000px;"></div>
    <div class="bottom">底部</div>

  </div>  
</template>

<script>
export default {
  
}
</script>
<style type="text/css">
  .bottom {
    margin: 0 50px;
    border-bottom: solid 1px #ddd;
    text-align: center;
  }
  .top{
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>

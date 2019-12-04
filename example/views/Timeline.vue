<template>
  <div>
    <h2>基础用法</h2>
    <h-timeline>
      <h-timeline-item>
        <p class="time">1976年</p>
        <p class="content">Apple I 问世</p>
      </h-timeline-item>
      <h-timeline-item>
        <p class="time">1984年</p>
        <p class="content">发布 Macintosh</p>
      </h-timeline-item>
      <h-timeline-item>
        <p class="time">2007年</p>
        <p class="content">发布 iPhone</p>
      </h-timeline-item>
      <h-timeline-item>
        <p class="time">2010年</p>
        <p class="content">发布 iPad</p>
      </h-timeline-item>
      <h-timeline-item>
        <p class="time">2011年10月5日</p>
        <p class="content">史蒂夫·乔布斯去世</p>
      </h-timeline-item>
    </h-timeline>
    <h2>改变圈圈的颜色</h2>
    <p>用各种颜色来标识不同状态，可以使用green、red、blue或自定义的颜色，默认是 blue</p>
    <h-timeline>
      <h-timeline-item color="green">发布1.0版本</h-timeline-item>
      <h-timeline-item color="green">发布2.0版本</h-timeline-item>
      <h-timeline-item color="red">严重故障</h-timeline-item>
      <h-timeline-item color="blue">发布3.0版本</h-timeline-item>
    </h-timeline>
    <h2>最后一个</h2>
    <p>通过添加pending属性来标记最后一个为幽灵节点，标识还未完成。</p>
    <h-timeline pending>
      <h-timeline-item >发布1.0版本</h-timeline-item>
      <h-timeline-item >发布2.0版本</h-timeline-item>
      <h-timeline-item >严重故障</h-timeline-item>
      <h-timeline-item ><a href="#/timeline">查看更多</a></h-timeline-item>
    </h-timeline>
    <h2>自定义时间轴点</h2>
    <p>接受一个 slot 来自定义轴点的内容，比如一个图标。</p>
    <h-timeline>
      <h-timeline-item color="green">
        <h-icon name="add" slot="dot"></h-icon>
        <span>发布里程碑版本</span>
      </h-timeline-item>
      <h-timeline-item color="blue">发布1.0版本</h-timeline-item>
      <h-timeline-item color="blue">发布2.0版本</h-timeline-item>
      <h-timeline-item color="blue">发布3.0版本</h-timeline-item>
    </h-timeline>
  </div>
</template>
<script>
  export default {
    data () {
     return{}
    }
  }
</script>
<style type="text/css" scoped>
  .time{
    font-size: 14px;
    font-weight: bold;
  }
  .content{
    padding-left: 5px;
  }
</style>
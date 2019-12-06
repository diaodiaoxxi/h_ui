<template>
  <h-poptip isNotCache>
        <a>click 激活</a>
        <!-- <div slot="title"><i>自定义标题</i></div> -->
        <div class="test" slot="content">
          <h-ring :data="chartData"></h-ring>
        </div>
  </h-poptip>
  <!-- <h-ring :data="chartData"></h-ring> -->
</template>

<script>
  export default {
    data () {
      return {
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
          ]
        }
      }
    }
  }
</script>
<style  scoped>
.test{
  width: 300px;
}
</style>
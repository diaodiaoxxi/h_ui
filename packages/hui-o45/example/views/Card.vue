<template>
<div>
    <h2>基本用法</h2><br>
    <h-card style="width:350px">
        <p slot="title">
            <h-icon name="android-film"></h-icon>
            经典电影
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
            <h-icon name="refresh"></h-icon>
            换一换
        </a>
        <ul>
            <li v-for="item in movieList.slice(limitFrom,limitFrom+5)">
                <a :href="item.url" target="_blank">{{ item.name }}</a>
                <span>
                    <h-icon name="ios-star" v-for="n in 4" :key="n"></h-icon>
                    <h-icon name="ios-star" v-if="item.rate >= 9.5"></h-icon>
                    <h-icon name="ios-star-half" v-else></h-icon>
                    {{ item.rate }}
                </span>
            </li>
        </ul>
    </h-card>
    <br><br>

    <h2>无边框标题</h2>
    <p>通过设置属性<code>bordered</code>为 false ，可以不添加边框，建议在灰色背景下使用。</p><br>
     <div style="width:350px;background:#eee;padding: 20px">
        <h-card :bordered="false">
            <p slot="title">无边框标题</p>
            <p>无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充。</p>
        </h-card>
    </div>
    <br><br>

    <h2>禁用悬停阴影</h2>
    <p>通过设置属性dis-hover来禁用鼠标悬停显示阴影的效果。</p><br>
    <h-row>
     <h-col span="4">
        <h-card>
          <p slot="title">标准卡片</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
        </h-card>
      </h-col>
      <h-col span="4" offset="1">
        <h-card dis-hover>
          <p slot="title">禁用悬停阴影的卡片</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
        </h-card>
      </h-col>
    </h-row>
    <br><br>

    <h2>卡片阴影</h2>
    <p>通过设置属性<code>shadow</code>来显示卡片阴影，使用该属性后，<code>bordered</code>和<code>dis-hover</code>将无效，建议在灰色背景下使用。</p><br>
    <h-row style="background:#eee;padding:20px">
     <h-col span="4">
        <h-card :bordered="false">
          <p slot="title">无边框卡片</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
        </h-card>
      </h-col>
      <h-col span="4" offset="1">
        <h-card shadow>
          <p slot="title">使用阴影效果的卡片</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
        </h-card>
      </h-col>
    </h-row>
    <br><br>

    <h2>简洁卡片</h2>
    <p>只包含内容区域，没有标题。</p><br>
    <h-card style="width:320px">
        <div style="text-align:center">
            <h-icon name="bug"></h-icon>
            <h3>一套基于 Vue.js 的高质量UI组件库</h3>
        </div>
    </h-card>

</div>
</template>

<script>
export default {
    data () {
        return {
            limitNum: 5,
            limitFrom: 0,
            movieList: [
                {
                    name: '肖申克的救赎',
                    url: 'https://movie.douban.com/subject/1292052/',
                    rate: 9.6
                },
                {
                    name: '这个杀手不太冷',
                    url: 'https://movie.douban.com/subject/1295644/',
                    rate: 9.4
                },
                {
                    name: '霸王别姬',
                    url: 'https://movie.douban.com/subject/1291546/',
                    rate: 9.5
                },
                {
                    name: '阿甘正传',
                    url: 'https://movie.douban.com/subject/1292720/',
                    rate: 9.4
                },
                {
                    name: '美丽人生',
                    url: 'https://movie.douban.com/subject/1292063/',
                    rate: 9.5
                },
                {
                    name: '千与千寻',
                    url: 'https://movie.douban.com/subject/1291561/',
                    rate: 9.2
                },
                {
                    name: '辛德勒的名单',
                    url: 'https://movie.douban.com/subject/1295124/',
                    rate: 9.4
                },
                {
                    name: '海上钢琴师',
                    url: 'https://movie.douban.com/subject/1292001/',
                    rate: 9.2
                },
                {
                    name: '机器人总动员',
                    url: 'https://movie.douban.com/subject/2131459/',
                    rate: 9.3
                },
                {
                    name: '盗梦空间',
                    url: 'https://movie.douban.com/subject/3541415/',
                    rate: 9.2
                }
            ]
        }
    },
    methods: {
        changeLimit () {
            this.limitFrom = this.limitFrom === 0 ? 5 : 0;
            console.log(this.limitFrom);
        }
    }
}
</script>

<style type="text/css" scoped>
  p {
    font-size: 14px;
  }
  .h-card h3 {
    font-weight: 400;
  }
  .h-card .icon-bug {
    font-size: 40px;
  }
</style>

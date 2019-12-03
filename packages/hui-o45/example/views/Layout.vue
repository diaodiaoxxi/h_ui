<template>
	<div>
	  <h1>布局一</h1>
		<div class="layout1">
			<h-menu mode="horizontal" theme="dark" active-name="1">
	      <div class="layout1-logo"></div>
	      <div class="layout1-nav">
	        <h-menu-item name="1">
	          <h-icon name="add"></h-icon>
	          导航一
	        </h-menu-item>
	        <h-menu-item name="2">
	          <h-icon name="add"></h-icon>
	          导航二
	        </h-menu-item>
	        <h-menu-item name="3">
	          <h-icon name="add"></h-icon>
	          导航三
	        </h-menu-item>
	        <h-menu-item name="4">
	          <h-icon name="add"></h-icon>
	          导航四
	        </h-menu-item>
	      </div>
		  </h-menu>
		  <h-menu mode="horizontal" active-name="1">
	      <div class="layout1-assistant">
	        <h-menu-item name="1">二级导航</h-menu-item>
	        <h-menu-item name="2">二级导航</h-menu-item>
	        <h-menu-item name="3">二级导航</h-menu-item>
	      </div>
	    </h-menu>
	    <div class="layout1-breadcrumb">
	      <h-breadcrumb>
	        <h-breadcrumb-item href="#">首页</h-breadcrumb-item>
	        <h-breadcrumb-item href="#">应用中心</h-breadcrumb-item>
	        <h-breadcrumb-item>某应用</h-breadcrumb-item>
	      </h-breadcrumb>
	    </div>
	    <div class="layout1-content">
	      内容区域
	    </div>
	    <div class="layout1-copy">
	      2011-2016 &copy; TalkingData
	    </div>
		</div>
		<h1>布局二</h1>
		<div class="layout2">
      <h-menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout2-logo"></div>
        <div class="layout2-nav">
          <h-menu-item name="1">
            <h-icon name="add"></h-icon>
            导航一
          </h-menu-item>
          <h-menu-item name="2">
            <h-icon name="add"></h-icon>
            导航二
          </h-menu-item>
          <h-menu-item name="3">
            <h-icon name="add"></h-icon>
            导航三
          </h-menu-item>
          <h-menu-item name="4">
            <h-icon name="add"></h-icon>
            导航四
          </h-menu-item>
        </div>
      </h-menu>
      <h-menu mode="horizontal" active-name="1">
        <div class="layout2-assistant">
          <h-menu-item name="1">二级导航</h-menu-item>
          <h-menu-item name="2">二级导航</h-menu-item>
          <h-menu-item name="3">二级导航</h-menu-item>
        </div>
      </h-menu>
      <div class="layout2-content">
        <h-row>
          <h-col span="5">
            <h-menu active-name="1-2" width="auto" :open-names="['1']">
              <h-submenu name="1">
                <template slot="title">
                    <h-icon type="ios-navigate"></h-icon>
                    导航一
                </template>
                <h-menu-item name="1-1">选项 1</h-menu-item>
                <h-menu-item name="1-2">选项 2</h-menu-item>
                <h-menu-item name="1-3">选项 3</h-menu-item>
              </h-submenu>
              <h-submenu name="2">
                <template slot="title">
                    <h-icon type="ios-keypad"></h-icon>
                    导航二
                </template>
                <h-menu-item name="2-1">选项 1</h-menu-item>
                <h-menu-item name="2-2">选项 2</h-menu-item>
              </h-submenu>
              <h-submenu name="3">
                <template slot="title">
                    <h-icon type="ios-analytics"></h-icon>
                    导航三
                </template>
                <h-menu-item name="3-1">选项 1</h-menu-item>
                <h-menu-item name="3-2">选项 2</h-menu-item>
              </h-submenu>
            </h-menu>
          </h-col>
          <h-col span="19">
            <div class="layout2-content-main">内容区域</div>
          </h-col>
        </h-row>
      </div>
      <div class="layout2-copy">
          2011-2016 &copy; TalkingData
      </div>
    </div>

		<h1>布局三</h1>
		<div class="layout3">
      <h-row type="flex">
        <h-col span="5" class="layout3-menu-left">
          <h-menu active-name="0-0" theme="dark" width="auto" :open-names="['0']" @on-open-change="s3()" @on-select="si3">
            <div class="layout3-logo-left"></div>
            <!-- 菜单模块 -->
            <h-submenu v-for="(v, k, index) in data3" :key="'o'+String(index)" :name="index">
              <template slot="title">
                <h-icon name="add"></h-icon>
                {{k}}
              </template>
              <h-menu-item  v-for="(item, i) in v" :key="'t'+String(index)+String(i)" :name="String(index)+'-'+String(i)">{{item}}</h-menu-item>
            </h-submenu>
          </h-menu>
        </h-col>
        <h-col span="19">
          <div class="layout3-header"></div>
          <div class="layout3-breadcrumb">
            <h-breadcrumb>
              <h-breadcrumb-item v-for="(item,n) in arr3" :key="item+n" >{{item}}</h-breadcrumb-item>
                <!-- <h-breadcrumb-item href="#">首页</h-breadcrumb-item>
                <h-breadcrumb-item href="#">应用中心</h-breadcrumb-item>
                <h-breadcrumb-item>某应用</h-breadcrumb-item> -->
            </h-breadcrumb>
          </div>
          <div class="layout3-content">
            <div class="layout3-content-main">
              内容区域
              <h-button @click="btnClick">增加一个试图</h-button>
            </div>
          </div>
          <div class="layout3-copy">
            2011-2016 &copy; TalkingData
          </div>
        </h-col>
      </h-row>
    </div>
    <h1>布局四</h1>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
      <h-row type="flex">
        <h-col :span="spanLeft" class="layout-menu-left">
          <h-menu active-name="1" theme="dark" width="auto">
            <div class="layout-logo-left"></div>
            <h-menu-item name="1">
                <h-icon name="activity" :size="iconSize"></h-icon>
                <span class="layout-text">选项 1</span>
            </h-Menu-item>
            <h-menu-item name="2">
                <h-icon name="activity" :size="iconSize"></h-icon>
                <span class="layout-text">选项 2</span>
            </h-Menu-item>
            <h-menu-item name="3">
                <h-icon name="activity" :size="iconSize"></h-icon>
                <span class="layout-text">选项 3</span>
            </h-Menu-item>
          </h-Menu>
        </h-col>
        <h-col :span="spanRight">
            <div class="layout-header">
              <h-button type="text" @click="toggleClick">
                <h-icon name="barrage" size="32"></h-icon>
              </h-button>
            </div>
            <div class="layout-breadcrumb">
              <h-breadcrumb>
                  <h-breadcrumb-item href="#">首页</h-breadcrumb-item>
                  <h-breadcrumb-item href="#">应用中心</h-breadcrumb-item>
                  <h-breadcrumb-item>某应用</h-breadcrumb-item>
              </h-breadcrumb>
            </div>
            <div class="layout-content">
                <div class="layout-content-main">内容区域</div>
            </div>
            <div class="layout-copy">
                2011-2016 &copy; TalkingData
            </div>
        </h-col>
      </h-row>
    </div>
	</div>
</template>
<script>	
  var data={
    '导航一':['选项一','选项二','选项三'],
    '导航二':['选项一','选项二','选项三'],
    '导航三':['选项一','选项二','选项三']
  };
	export default{
		name:"Layout",
		data () {
      return {
        spanLeft: 5,
        spanRight: 19,
        data3:data,
        arr3:['首页']
      }
    },
    computed: {
      iconSize () {
        return this.spanLeft === 5 ? 14 : 24;
      }
    },
    methods: {
      si3(name) {
        this.arr3=['首页'];
        var arr = name.split("-"),
            arrC=[];
        var n=0
        for (var i in data) {
          if (n==arr[0]) {
            arrC[0]=i
          }
          data[i].forEach((val,index)=>{
            if (index==arr[1]) {
              arrC[1]=val
            }
          })
          n=n+1
        }
        n=0;
        this.arr3=arrC
      },
      btnClick (e) {
        this.arr3.push('新视图')
      },
      s3(){
      },
      toggleClick () {
        if (this.spanLeft === 5) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 5;
          this.spanRight = 19;
        }
      }
    }
	}
</script>
<style>
	.layout1{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
  }
  .layout1-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout1-nav{
    width: 470px;
    margin: 0 auto;
  }
  .layout1-assistant{
    width: 350px;
    margin: 0 auto;
    height: inherit;
  }
  .layout1-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout1-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout1-content-main{
    padding: 10px;
  }
  .layout1-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout2{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
  }
  .layout2-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout2-nav{
    width: 450px;
    margin: 0 auto;
  }
  .layout2-assistant{
    width: 350px;
    margin: 0 auto;
    height: inherit;
  }
  .layout2-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout2-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout2-content-main{
    padding: 10px;
  }
  .layout2-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout3{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
  }
  .layout3-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout3-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout3-content-main{
    padding: 10px;
  }
  .layout3-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout3-menu-left{
    background: #464c5b;
  }
  .layout3-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout3-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #464c5b;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .layout-ceiling-main a{
    color: #9ba7b5;
  }
  .layout-hide-text .layout-text{
    display: none;
  }
  .h-col{
    transition: width .2s ease-in-out;
  }
</style>
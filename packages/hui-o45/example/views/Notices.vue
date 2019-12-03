<template>
	<div>	
	  <h1>Notice 通知提醒</h1>	
	  <h1>基础用法 </h1>	
		<h-button type="primary" @click="open(false)">打开提醒</h-button>
    <h-button @click="open(true)">打开提醒（仅标题）</h-button>
  	<h1>提醒类型</h1>
  	<h2>带描述信息</h2>
    <h-button @click="info(false)" name="key1">消息</h-button>
    <h-button @click="success(false)">成功</h-button>
    <h-button @click="warning(false)">警告</h-button>
    <h-button @click="error(false)">错误</h-button>
    <h2>仅标题</h2>
    <h-button @click="info(true)">消息</h-button>
    <h-button @click="success(true)">成功</h-button>
    <h-button @click="warning(true)">警告</h-button>
    <h-button @click="error(true)">错误</h-button>
    <h-button @click="error(true)">错误</h-button>
    <h2>自定义提示存在时间 duration为 0 则不自动关闭</h2>
    <h-button type="primary" @click="time">打开提醒</h-button>
    <h-button type="primary" @click="close">关闭name为key1的notice</h-button>
    <h-button type="primary" @click="destroy">全局销毁</h-button>
    <h2>自定义通知提醒</h2>
    <h-button @click="openRender">自定义通知提醒</h-button>
	</div>
</template>
<script>	
	export default{
		name:"Notices",
		data(){
			return {}
		},
		methods: {
      open (nodesc) {
        this.$hNotice.open({
          title: '这是通知标题',
          desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述',
          key:'key1',
          duration: 5,
        });
      },
      clickHandler1() {
        this.$hNotice.close("custom")
        this.$hMessage.info({content: "已读"});
      },
      clickHandler2() {
        this.$hNotice.close("custom")
        this.$hMessage.info({content: "消息已删除"});
      },
      info (nodesc) {
        this.$hNotice.info({
          title: '这是通知标题',
          desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述',
        });
      },
      success (nodesc) {
        this.$hNotice.success({
          title: '这是通知标题',
          desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
        });
      },
      warning (nodesc) {
        this.$hNotice.warning({
          title: '这是通知标题',
          desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
        });
      },
      error (nodesc) {
        this.$hNotice.error({
          title: '这是通知标题',
          desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
        });
      },
      time () {
        this.$hNotice.open({
          title: '这是通知标题',
          desc: '这条通知不会自动关闭，需要点击关闭按钮才可以关闭。',
          duration: 0
        });
      },
      close(){
        this.$hNotice.close('key1')
        this.$nextTick(()=>{
          this.$hNotice.open({
            title: '这是通知标题',
            desc: '这条通知不会自动关闭，需要点击关闭按钮才可以关闭。',
            duration: 5,
            name:'key1'
          });
        })
      },
      destroy(){
        this.$hNotice.destroy()
      },
      openRender() {
        let self = this;
        this.$hNotice.open({
          name: "custom",
          duration: 5,
          render(h) {
            return h('div', 
            {
              style: {
                display: "flex",
                "flex-flow": "row wrap"
              }
            }, [
              h('p', {
                style: {
                  width: "100%",
                  lineHeight: "30px"
                }
              }, ['通知标题']),
              h('p', {
                style: {
                  width: "100%",
                  fontSize: "13px",
                  lineHeight: "15px",
                  color: "#999",
                  marginBottom: "15px"
                }
              }, ['通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述' + Math.random()]),
              h('h-button', {
                attrs: {
                  type: "primary"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: self.clickHandler1
                }
              }, ['已读']),
              h('h-button', {
                on: {
                  click: self.clickHandler2
                }
              },  ['删除'])
            ])
          }
        });
      }

    },
    mounted () {
      this.$hNotice.config({
          top: 200,
          duration: 3
      });
    }
	}
</script>
<style>
	
</style>
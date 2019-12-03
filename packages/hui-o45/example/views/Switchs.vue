<template>
  <div id="switch" class="wrapper">
    <h2>Switch基本示例</h2>
    <h-switch v-model="switch1" @on-change="change" ref="test" @on-focus="fo" @on-blur="bl"></h-switch>
    <h-switch disabled></h-switch>
    <Button @on-click="testClick">获取焦点</Button>
    <br><br>
    <h2>尺寸</h2>
    <h-switch size="large" @on-focus="fo"></h-switch>
    <h-switch @on-focus="fo"></h-switch>
    <h-switch size="small" @on-focus="fo"></h-switch>
    <br><br>
    <h-switch v-model="switch2" @on-change="change"></h-switch>
    <h-switch v-model="switch3" type="info" @on-change="change"></h-switch>
    <h-switch v-model="switch4" type="success" @on-change="change"></h-switch>
    <h-switch v-model="switch5" type="warning" @on-change="change"></h-switch>
    <h-switch v-model="switch6" type="error" @on-change="change"></h-switch>
    <br><br>
    <h1>文字和图标</h1>
    <h-switch>
      <span slot="open">开</span>
      <span slot="close">关</span>
    </h-switch>
    <h-switch>
      <h-icon name="right" slot="open"></h-icon>
      <h-icon name="close" slot="close"></h-icon>
    </h-switch>
    <br><br>
    <h-switch size="large">
      <span slot="open">开启</span>
      <span slot="close">关闭</span>
    </h-switch>
    <h-switch size="large">
      <span slot="open">ON</span>
      <span slot="close">OFF</span>
    </h-switch>
    <h2>自定义大小</h2>
    <h-switch @on-change="change" width="80" height="40"></h-switch>
    <h-switch @on-change="change" width="60" height="40"></h-switch>
    <h2>不可用</h2>
    <h-switch :disabled="disabled"></h-switch>
    <h-button type="primary" @click="disabled = !disabled">Toggle Disabled</h-button>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      switch1:false,
      switch2:true,
      switch3:true,
      switch4:true,
      switch5:true,
      switch6:true,
      disabled: true
    }
  },
  methods:{
    change(status){
      console.log(status);
    },
    testClick() {
      this.$refs.test.focus()
    },
    fo(e) {
      console.log("focus", e.target)
    },
    bl() {
      console.log("blur")
    }
  }
}
</script>
<style type="text/css">
</style>

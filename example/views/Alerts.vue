<template>
  <div>
    <h1>Alert组件</h1>
    <h2>静态地呈现一些警告信息，可手动关闭</h2>
    <br>
    <br>
    <h1>基础用法</h1>
  	<h-alert>消息提示文案</h-alert>
    <h-alert type="success">成功提示文案</h-alert>
    <h-alert type="warning">警告提示文案</h-alert>
    <h-alert type="error">错误提示文案</h-alert>

    <h1>自定义 slot="desc" 描述内容。</h1>
    <h-alert>
      消息提示文案
      <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
    </h-alert>
    <h-alert type="success">
      成功提示文案
      <span slot="desc">成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案</span>
    </h-alert>
    <h-alert type="warning">
      警告提示文案
      <template slot="desc">
          警告的提示描述文案警告的提示描述文案警告的提示描述文案
      </template>
    </h-alert>
    <h-alert type="error">
      错误提示文案
      <span slot="desc">
        自定义错误描述文案。<h-icon name="delete" size="14"></h-icon>
      </span>
    </h-alert>

    <h1>带图标的h-alert</h1>
    <h-alert show-icon>消息提示文案</h-alert>
    <h-alert type="success" show-icon>成功提示文案</h-alert>
    <h-alert type="warning" show-icon>警告提示文案</h-alert>
    <h-alert type="error" show-icon>错误提示文案</h-alert>
    <h-alert show-icon>
        消息提示文案
        <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
    </h-alert>
    <h-alert type="success" show-icon>
        成功提示文案
        <span slot="desc">成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案</span>
    </h-alert>
    <h-alert type="warning" show-icon>
        警告提示文案
        <template slot="desc">
            警告的提示描述文案警告的提示描述文案警告的提示描述文案
        </template>
    </h-alert>
    <h-alert type="error" show-icon>
        错误提示文案
        <span slot="desc">
            自定义错误描述文案。
        </span>
    </h-alert>
    <h-alert show-icon>
        自定义图标
        <h-icon name="remind" slot="icon"></h-icon>
        <template slot="desc">自定义图标文案自定义图标文案自定义图标文案自定义图标文案自定义图标文案</template>
    </h-alert>
    <h1>h-alert可关闭</h1>
    <h-alert closable>消息提示文案</h-alert>
    <h-alert type="success" show-icon closable @on-close="close">
      成功提示文案
      <span slot="desc">成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案</span>
    </h-alert>
    <h-alert type="warning" closable>
      自定义关闭内容
      <span slot="close">不再提示</span>
  </h-alert>
  </div>
</template>
<script>
    export default {
        methods:{
          close(){
            console.log("你关闭了当前alert")
          }
        }
    }
</script>
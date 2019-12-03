<template>
  <div>
    <h1>基础用法及是否可关闭</h1>
    <h-tag>标签一</h-tag>
    <h-tag>标签二</h-tag>
    <h-tag v-if="show" closable @on-close="handleClose" @click.native="click">标签三</h-tag>
    <h1>标签是否可选择及可设置颜色</h1>
    <h-tag checkable color="primary" showTitle @click.native="click">标签一</h-tag>
    <h-tag checkable color="success" showTitle title="123" @click.native="click">标签二</h-tag>
    <h-tag checkable color="error"  showTitle placement="top">标签三</h-tag>
    <h-tag checkable color="warning">标签四</h-tag>
    <h1>标签border、dot</h1>
    <h-tag type="border" closable color="primary" @on-close="handleClose" @click.native="click">标签一</h-tag>
    <h-tag type="border" closable color="success" @on-close="handleClose">标签二</h-tag>
    <h-tag type="border" closable color="error" @on-close="handleClose">标签三</h-tag>
    <h-tag type="border" closable color="warning" @on-close="handleClose" :width="400">标签四overflow: hidden;text-overflow:ellipsis;
white-space: nowrap;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;</h-tag>
    <br><br>
    <h-tag type="dot" closable color="primary" @on-close="handleClose" @click.native="click">标签一</h-tag>
    <h-tag type="dot" closable color="success" @on-close="handleClose">标签二</h-tag>
    <h-tag type="dot" closable color="error" @on-close="handleClose">标签三</h-tag>
    <h-tag type="dot" closable color="warning" @on-close="handleClose">标签四</h-tag>
    <h-tag type="dot" closable color="warning" @on-close="handleClose">标签四</h-tag>
    <h1>name属性</h1>
    <h-tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose2">标签{{ item + 1 }}</h-tag>
    <h-button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</h-button>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                show: true,
                count: [0, 1, 2]
                
            }
        },
        methods: {
            click(){
                console.log('click')
            },
            handleClose () {
                // this.show = false;
                console.log('close')
            },
            handleAdd () {
                if (this.count.length) {
                    this.count.push(this.count[this.count.length - 1] + 1);
                } else {
                    this.count.push(0);
                }
            },
            handleClose2 (event, name) {
                const index = this.count.indexOf(name);
                this.count.splice(index, 1);
            }
        }
    }
</script>
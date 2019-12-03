<template>
	<div>
	  <h2>单独使用</h2>
    {{btncheck}}
    <h-checkbox-group v-model="btncheck" @on-change="change" label-in-value>
      <h-checkbtn value="twitter" label="Twitter1" disabled>
        <!-- <span>Twitter</span> -->
      </h-checkbtn>
      <h-checkbtn value="facebook" label="facebook1" @on-click="click">
        <span>Facebook1</span>
      </h-checkbtn>
      <h-checkbtn value="github" label="github1">
        <span>Github1</span>
      </h-checkbtn>
      <h-checkbtn value="snapchat" label="snapchat1">
        <span>Snapchat1</span>
      </h-checkbtn>
    </h-checkbox-group>

  <h-msg-box v-model="changeform" width="900">
    <h-checkbox v-model="single1" size="large" true-value="1" false-value="0">checkbox</h-checkbox><br>{{single1}}
    <h-checkbox v-model="single">checkbox</h-checkbox><br>{{single}}
		<h-checkbox v-model="single" size="small">checkbox</h-checkbox><br>{{single}}
  </h-msg-box>
  <Button @on-click="changeform1">显示隐藏</Button>
		<h2>组合使用</h2>
		<h-checkbox-group v-model="social" vertical @on-change="change">
      <h-checkbox label="twitter" text="1" size="large" ref="test" @on-focus="fo" @on-blur="bl">
      </h-checkbox>
      <h-checkbox label="facebook" text="1">
      </h-checkbox>
      <h-checkbox label="github" text="1" size="small">
      </h-checkbox>
      <h-checkbox label="snapchat" text="1">
      </h-checkbox>
    </h-checkbox-group>
    <Button @on-click="testClick">获取焦点</Button>
    <!-- {{social}} -->
    <h-checkbox-group v-model="fruit">
      <h-checkbox label="香蕉"></h-checkbox>
      <h-checkbox label="苹果"></h-checkbox>
      <h-checkbox label="西瓜"></h-checkbox>
    </h-checkbox-group>
    {{fruit}}
    <h-button @on-click="changeFruit"></h-button>
    <h2>不可用</h2>
    <h-checkbox v-model="disabledSingle" disabled>checkbox</h-checkbox>
    {{disabledSingle}}
    <h-checkbox-group v-model="disabledGroup">
        <h-checkbox label="香蕉" disabled></h-checkbox>
        <h-checkbox label="苹果" disabled></h-checkbox>
        <h-checkbox label="西瓜"></h-checkbox>
    </h-checkbox-group>
    {{disabledGroup}}
    <h2>与其它组件通信</h2>
    <h-checkbox v-model="checked" :disabled="disabled">
        <span v-if="checked">选中</span>
        <span v-else>取消</span>
         -
        <span v-if="!disabled">可用</span>
        <span v-else>不可用</span>
    </h-checkbox>
    <br>
    <h-button type="primary" @click="checked = !checked">
        <span v-if="!checked">选中</span>
        <span v-else>取消</span>
    </h-button>
    <h-button type="primary" @click="disabled = !disabled">
        <span v-if="disabled">可用</span>
        <span v-else>不可用</span>
    </h-button>
    <h2>全选</h2>
    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
      <h-checkbox
        :indeterminate="indeterminate"
        :value="checkAll"
        @click.prevent.native="handleCheckAll">全选</h-checkbox>
    </div>
    <h-checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
        <h-checkbox label="香蕉"></h-checkbox>
        <h-checkbox label="苹果"></h-checkbox>
        <h-checkbox label="西瓜"></h-checkbox>
    </h-checkbox-group>
    <br><br><br><br><br><br><br><br><br>
	</div>
</template>
<script>
	export default{
		name:'Checkboxw',
		data(){
			return {
        single1:1,
				single:false,
				social: ['facebook', 'github'],
        fruit: ['苹果'],
        disabledSingle: true,
        disabledGroup: ['苹果'],
        checked: true,
        disabled: false,
        indeterminate: true,
        checkAll: false,
        checkAllGroup: ['香蕉', '西瓜'],
        changeform:false,
        btncheck:[],
			}
		},
		methods:{
      testClick() {
        this.$refs.test.focus()
      },
      fo(e) {
        console.log(e)
      },
      bl(e) {
        console.log(e)
      },
      changeform1(){
        this.changeform = !this.changeform;
      },
      changeFruit(){
        this.fruit=['苹果','香蕉'];
      },
			handleCheckAll () {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          this.checkAllGroup = ['香蕉', '苹果', '西瓜'];
        } else {
          this.checkAllGroup = [];
        }
      },
			checkAllGroupChange (data) {
        if (data.length === 3) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
      },
      click(e,val){
        console.log(e);
        console.log(val);
      },
      change(data){
        console.log(data)
      }
    },
    mounted(){
      this.btncheck = ['facebook']
    }
	}
</script>

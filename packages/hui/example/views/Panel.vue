<template>
  <div>
    <h2>基础用法 </h2>
    <h-row>
    	<h-col span="24">
    		<h-field-panel @on-change="change" collapse :showIcon="false">
    		  <span slot="title">提示标题文案</span>
    		  12124
    		  <h-input></h-input>
    		  <h-select></h-select>
					<h-table></h-table>
    		  <h-field-panel iconAlgin='left'>
    		    <span slot="title">提示标题文案</span>
    		    12124
    		  </h-field-panel>
    		  <h-field-panel iconAlgin='right'>
    		    <span slot="title">提示标题文案</span>
    		    12124
    		  </h-field-panel>
    		</h-field-panel>
    	</h-col>
    </h-row>
  </div>
</template>
<script>  
  export default {
  	data(){
  		return {};
  	},
  	methods:{
  		change(val){
  			console.log(val);
  		}
  	}
  }
</script>
<style type="text/css" scoped>
  span{
    font-size:14px;
    color:#495060;
    font-weight:bold;
  }
</style>
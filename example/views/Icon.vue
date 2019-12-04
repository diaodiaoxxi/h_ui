<template>
	<div>	
	    <i class="icon iconfont icon-doublearrow"></i>
	    <h-icon name="doublearrow"></h-icon>	
		<div>
			<h1>Icon-mine-add</h1>
			<div class="position">
				<h-icon name="add" size="40" color="red"></h-icon>
			</div>
		</div>
		<div>
			<h1>Icon-normal-add</h1>
			<div>
				<h-icon name="add"></h-icon>
			</div>
		</div>
		<div>
			<h1>Icon-add-自定义Class</h1>
			<div>
				<h-icon name="add" class="h-select-arrow"></h-icon>
			</div>
		</div>
		<div>
			<h1>Icon-delete_fill</h1>
			<div>
				<h-icon name="delete_fill"></h-icon>
			</div>
		</div>
		<div>
			<h1>Icon-coupons</h1>
			<div>
				<h-icon name="coupons"></h-icon>
			</div>
		</div>
		<div>
			<h1>Icon-createtask</h1>
			<div>
				<h-icon name="createtask"></h-icon>
			</div>
		</div>
				
	</div>
</template>
<script>	
	export default{
		name:"Icon"
	}
</script>
<style>
	.position{
		position: relative;
	}
	.position .h-icon-add{
		width: 50px;
		height: 50px;
		display: inline-block;
		background: red;
		border-radius:50%;
	}
	.position .h-icon-add.icon-add:before{
		display: inline-block;
		position: absolute;
		top: 18px;
		left: 18px;
	}
</style>
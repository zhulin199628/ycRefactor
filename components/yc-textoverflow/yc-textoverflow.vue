<template>
	<view class="main">
		<view class="yc-text-container" :style="{
			display: '-webkit-box', 
			overflow: 'hidden', 
			wordBreak: 'break-all',
			textOverflow: textOverflow,
			'-webkit-box-orient': 'vertical',
			'-webkit-line-clamp': lineCunt
			}"
		>
			<slot></slot>
		</view>
		<view class="moreText">
			{{moreText}}
		</view>
	</view>
</template>

<script>
	export default{
		 name: "ycTextoverflow",
		 data(){
			 return {
				
			 }
		 },
		 props:{
			 lineCunt: {
				 type:Number,
				 default:1
			 },
			 moreText: {
				 type:String,
				 default: ""
			 },
			 textOverflow:{
				 type:String,
				 default: "ellipsis"
			 }
		 }
	}
</script>

<style>
	.main{
		position: relative;
	}
	.moreText{
		position: absolute;
		bottom: 0;
		right: 0;
	}
</style>

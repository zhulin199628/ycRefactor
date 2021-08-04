<template>
	<view class = "content">
	  <cell>
		<view class="thumbnail">
			 <image :src="thumbnail" mode=""></image>
		</view>
		<view class="content">
			<view class="themeTitle">
				 {{theme}}
			</view>
			<view class="Introduction">
				{{Introduction}}
			</view>
		</view>
		<view class="bottomRight">
			 {{bottomRight}}
		</view>
	  </cell>
	</view>
</template>

<script>
	
	/**
	 * @property {String} thumbnail  缩略图
	 * @property {String} theme  主题 title
	 * @property {String} Introduction  简介
	 * @property {String}  bottomRight  右下角内容（价格、状态）
	 * **/
	export default {
		name: 'yc-list',
		  data(){
			  return {
				  
			  }
		  },
		  props:{
			 thumbnail:{
				 type: String,
				 default: ''
			 },
			 theme: {
				 type: String,
				 default: ''
			 },
			 Introduction:{
				 type: String,
				 default: ''
			 },
			 bottomRight: {
				 type: String,
				 default: ''
			 }
			 
		  }
	}
	
</script>

<style>
</style>

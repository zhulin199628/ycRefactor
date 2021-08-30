<template>
	<view class="main padding16">
		<view class="">
			<view class="title-left fl white font16">
				<text>全部跟读</text>
				<text class = "count">4</text>
			</view>
			<view class="title-right flex-style">
				<view class="">最新</view>
				<view class="line">|</view>
				<view class="">最热</view>
			</view>
		</view>
		<view class="">
			 <view class="">
				 <image src="../../../static/images/tx.png" mode="" class="iconWidth"></image>
				<view class="">
					<view class="">
						陆仙儿
					</view>
					<view class="">
						18:17
					</view>
				</view>
			 </view>
			 <view class="">
			 	  <image src="../../../static/images/active.png" mode=""  class="iconWidth"></image>
				  <image src="../../../static/images/remove.png" mode=""  class="iconWidth"></image>
				  <image src="../../../static/images/share.png" mode=""  class="iconWidth"></image>
				  <image src="../../../static/images/play.png" mode=""  class="iconWidth"></image>
				  <image src="../../../static/images/collect.png" mode=""  class="iconWidth"></image>
			 </view>
			<!-- <view class="">
			 	<ycAudio  
				@setAudioStatu="setAudioStatu" 
				:voicePath="tempFilePath" 
				:audioTime="audioTime"
			 	:autoplay="autoplay" ref="child" 
				/>
			 </view> -->
		</view>
	</view>
</template>

<script>
	import ycAudio from "../../../components/ycAudio/ycAudio.vue"
	export default {
		components: {
			ycAudio,
		},
		data() {
			return {

			}
		}
	}
</script>

<style>
	.count{
		margin-left: 8rpx
	}
	.line{
		margin: 0 16rpx 0 16rpx;
	}
</style>

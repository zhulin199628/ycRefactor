<template>
	<view>
		<view class="Mantle">
			<view>
				<view class="messageStyle">{{message}}</view>
				<view>
					<view class="confirmStyle">{{confirm}}</view>
					<view class="cancelStyle">{{cancel}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			message: {
				type:String,
				default:"<view style='font-size:20vw;background-color:red'>提示</view>"
			},
			confirm: {
				type:String,
				default:"<view style='font-size:20vw;background-color:green'>ok</view>"
			},
			cancel: {
				type:String,
				default:"<view style='font-size:20vw;background-color:black'>no</view>"
			},
		},
		methods: {
		
		}
	}
</script>

<style>
	.Mantle {
		height: 100vh;
		width: 100vw;
		background-color: rgba(0,0,0,0.8);
	}
</style>

<template>
	<view class="wrap">
		<view class="list">
			<view class="content" v-for="n in count">
				<view class="cline" style="height: 2px;"></view>
				<view class="cline" style="height: 4px;"></view>
				<view class="cline" style="height: 6px;"></view>
				<view class="cline" style="height: 8px;"></view>
				<view class="cline" style="height: 6px;"></view>
				<view class="cline" style="height: 10px;"></view> 
				<view class="cline" style="height: 12px;"></view>
				<view class="cline" style="height: 10px;"></view>
				<view class="cline" style="height: 8px;"></view>
				<view class="cline" style="height: 6px;"></view>
				<view class="cline" style="height: 4px;"></view>
				<view class="cline" style="height: 6px;"></view>
				<view class="cline" style="height: 4px;"></view>
				<view class="cline" style="height: 2px;"></view>
			</view>
			<view class="content" v-for="n in count">
				<view class="cline" style="height: 2px;"></view>
				<view class="cline" style="height: 4px;"></view>
				<view class="cline" style="height: 6px;"></view>
				<view class="cline" style="height: 8px;"></view>
				<view class="cline" style="height: 6px;"></view>
				<view class="cline" style="height: 10px;"></view> 
				<view class="cline" style="height: 12px;"></view>
				<view class="cline" style="height: 10px;"></view>
				<view class="cline" style="height: 8px;"></view>
				<view class="cline" style="height: 6px;"></view>
				<view class="cline" style="height: 4px;"></view>
				<view class="cline" style="height: 6px;"></view>
				<view class="cline" style="height: 4px;"></view>
				<view class="cline" style="height: 2px;"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "recordAnimate",
		data() {
			return {
				count: 20
			}
		},


	}
</script>

<style>
	.wrap {
		overflow: hidden;
		margin: 48rpx auto;
	}

	.list {
		position:relative;
		top:0px;
		left:0px;
		width:200%;
		height:100%;
		list-style:none;
		animation:mymove 5s infinite linear;
	}

	.cline {
		width: 2px;
		background-color: #555;
		float: left;
		vertical-align: middle;
		text-align: center;
		line-height: 196rpx;
		color: white;
		font-weight: 600;
		margin-left: 0.6rpx;
	}
	
	
	.content{
		margin-left: 20rpx;
	}
	
	.list,.content{
		 display: flex;
		 flex-direction: row;
		 justify-content: center;
		 align-items: center;
	}

	@-webkit-keyframes mymove {
		from {
			left: 0px;
		}

		to {
			left: -1000rpx;
		}
	}
</style>

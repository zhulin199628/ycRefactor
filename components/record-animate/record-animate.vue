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
		width: 500px;
		height: 100px;
		border: 1px solid #000;
		margin: 50px auto;
	}

	.list {
		position:relative;
		top:0px;
		left:0px;
		width:200%;
		height:100%;
		border:1px solid #f00;
		list-style:none;
		animation:mymove 5s infinite linear;
	}

	.cline {
		width: 2px;
		/* height: 98px; */
		background-color: #000000;
		/* border: 1px solid white; */
		/* background: blue; */
		float: left;
		vertical-align: middle;
		text-align: center;
		line-height: 98px;
		color: white;
		font-weight: 600;
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
			left: -500px;
		}
	}
</style>

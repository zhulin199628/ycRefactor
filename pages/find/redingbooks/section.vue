<template>
	<view class="section-main">
		<view class="section-image fontOpacity">
			<view class="listen-count">
				<image src="../../../static/images/music.png" mode="" class="iconWidth"></image>
				<text class="font12 count">6088</text>
			</view>
			<view class="record-count">
				<image src="../../../static/images/record.png" mode="" class="iconWidth"></image>
				<text class="font12 count">6088</text>
			</view>
		</view>
		<view class="section-introduction font14  fontOpacity">
			《道德经》，春秋时期老子（李耳）的哲学作品，又称《道德真经》、《老子》、《五千言》、《老子五千文》，是中国古代先秦诸子分家前的一部著作，是道家哲学思想的重要来源。道德经分上下两篇，原文上篇《德经》、下篇《道经》，不分章，后改为《道经》37章在前，第38章在后为《德经》，并分为81章。
		</view>
		<view class="section-wrapper">
			<view class="section-order fontOpacity">
				<text>第一章</text>
			</view>
			<view class="section-list">
				<view class="list-wrapper white" v-for="i in 10">
					<view class="inline">1.1</view>
					<view class="inline text font14">道 可道非常道 名 可名非常名 无 名则</view>
					<image src="../../../static/images/active.png" mode="" class="iconWidth active-marker"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style>
	.section-main {
		padding: 0rpx 32rpx 0rpx 32rpx;
	}

	.section-image {
		width: 352rpx;
		height: 480rpx;
		background-color: #1A1A1A;
		margin: 0 auto;
		/* margin-top: 70rpx; */
	}

	.section-image {
		display: flex;
		align-items: flex-end;
	}

	.listen-count,
	.record-count {
		position: relative;
		margin-bottom: 16rpx;
	}

	.count {
		position: absolute;
		top: -4rpx;
		right: -55rpx;
	}

	.listen-count {
		margin-left: 40rpx;
	}

	.record-count {
		margin-left: 132rpx;
	}

	.section-introduction {
		margin-top: 48rpx;
		text-indent: 56rpx;
		height: 252rpx;
		line-height: 42rpx;
	}

	.inline {
		display: inline-block;
		vertical-align: middle;
	}

	.active-marker {
		vertical-align: middle;
		margin-left: 56rpx;
	}

	.list-wrapper {
		height: 112rpx;
		line-height: 112rpx;
	}

	.section-wrapper {
		margin-top: 80rpx;
	}

	.section-order {
		height: 112rpx;
		line-height: 112rpx;
	}

	.text {
		margin-left: 38rpx;
	}
</style>

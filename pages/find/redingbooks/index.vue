<template>
	<view class="bgColorGreen1">
		<view class="yc-secion-navbar bgColorGreen1">
			<view class="yc-section-container bgColorGreen1" :style="{'margin-top':statusBarHeight + 'rpx'}">
				<view class="yc-back-container bgColorGreen1 fl">
					<image src="../../../static/images/back.png" style="margin-top: 20rpx;" mode="" class="iconWidth">
					</image>
				</view>
				<view class="yc-navbar-text bgColorGreen1 fl">
					<ycTabs :tabs="tabs" :bgColor="tabsBgColor" :bold="tabsBold" :color="tabsColor"
						:activeColor="tabsActiveColor" @change="changeTab" />
				</view>
			</view>
		</view>
		<view class="container-tabs__list">
			<swiper class="container-tabs__swiper" :current="changIndex" :style="{'height': swiperHeight + 'rpx'}"
				@animationfinish="animationFinished" @change="tapChange">
				<swiper-item>
					<view class="swiperItem1" :style="{'margin-top':marginTopCount + 'rpx'}">
						<Section />
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiperItem2" :style="{'margin-top':marginTopCount+ 'rpx'}">
						<SectionAudio />
					</view>
				</swiper-item>
				<swiper-item>
					<view class="">

					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import ycTabs from "../../../components/v-tabs/v-tabs.vue"
	import SectionAudio from "./SectionAudio.vue"
	import Section from "./section.vue"
	import {
		adaptNavbar,
		getSwiperHeight
	} from "../../../utils/adapt.js"
	export default {
		components: {
			ycTabs,
			SectionAudio,
			Section
		},
		data() {
			return {
				tabs: ["章节", "音频", "跟读"],
				tabsBgColor: "#3A5562",
				tabsColor: "#fff",
				tabsActiveColor: "#fff",
				tabsBold: false,
				changIndex: 0,
				statusBarHeight: null,
				swiperHeight: 0,  
				marginTopCount: 0,
				windowHeight:0
			}
		},
		onLoad(options) {
			adaptNavbar().then(res => {
				this.statusBarHeight = res.statusBarHeight * 2;
				this.windowHeight = res.windowHeight
			}).catch(err => {})
		},
		onReady() {
			getSwiperHeight("yc-secion-navbar", this).then(res => {
				this.marginTopCount = (res + 24) * 2
			}).catch(err => {})
			getSwiperHeight("swiperItem1", this).then(res => {
				this.swiperHeight = (res * 2) + (this.marginTopCount);
			}).catch(err => {})
		},
		methods: {
			changeTab: function(index) {
				this.changIndex = index;
				if (index === 0) {
					getSwiperHeight("swiperItem1", this).then(res => {
						this.swiperHeight = (res * 2) + (this.marginTopCount);
					}).catch(err => {})
				} else if (index === 1) {
					console.log(this.windowHeight)
					this.swiperHeight = this.windowHeight * 2;
					// getSwiperHeight("swiperItem2", this).then(res => {
					// 	this.swiperHeight = (res * 2) + (this.marginTopCount);
					// }).catch(err => {})
				} else {

				}
			},
			animationFinished(e) {
				this.current = e.detail.current
				this.swiperCurrent = e.detail.current
			},
			tapChange(event) {
				let index = event.detail.current;
			}
		}
	}
</script>

<style>
	page {
		background-color: #3A5562;
	}

	.yc-secion-navbar {
		width: 750rpx;
		position: fixed;
		z-index: 99999;
	}

	.yc-back-container {
		margin-left: 24rpx;
	}

	.yc-navbar-text {
		margin-left: 148rpx;
	}

	.container-tabs__swiper {
		height: 100%;
	}

	.yc-section-container {
		height: 88rpx;
	}

	.container-tabs__list {
		/* height:1206rpx; */
	}
</style>

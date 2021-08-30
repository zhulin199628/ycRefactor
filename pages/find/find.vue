<template>
	<view class="main">
		<!-- 海报图 -->
		<view class="banner">
		</view>
		<!-- 句读读法 -->
		<view class="" style="width: 343px; height: 50px;">
			<ycTextOverFlow lineCunt="6" moreText="更多">
				<text>
					顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶抵达长沙出差山地车山地车山地车山地车是ssssssssssssssssssssssssssssssssssssssss顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶抵达长沙出差山地车山地车山地车山地车是ssssssssssssssssssssssssssssssssssssssss
					顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶抵达长沙出差山地车山地车山地车山地车是ssssssssssssssssssssssssssssssssssssssss
				</text>
			</ycTextOverFlow>
		</view>
		<view class="">
			<ycAudio :autoplay="autoplay" :voicePath="voicePath" :playMethod="playMethod" @provious="provious"
				@next="next" />
		</view>
		<view class="">
			<uni-popup ref="record" background-color="#fff" type="share">
				<recordAnimate :start="start" />
				<ycRecord> </ycRecord>
			</uni-popup>
		</view>
		<view class="">
			<view class="example-body share hideOnPc">
				<button class="button" type="primary" @click="shareToggle"><text class="button-text">录音</text></button>
			</view>
		</view>
		<view class="">
			<button @tap="auth">授权</button>
		</view>
	</view>
</template>

<script>
	import {
		URLS
	} from '../../common/api.config.js'
	import yclink from "@/components/yc-link/yc-link.vue"
	import ycTextOverFlow from "@/components/yc-textoverflow/yc-textoverflow.vue"
	import ycAudio from "@/components/ycAudio/ycAudio.vue"
	import ycRecord from '@/components/yc-record/yc-record.vue'
	import recordAnimate from '@/components/record-animate/record-animate.vue'
	export default {
		components: {
			ycTextOverFlow,
			ycAudio,
			yclink,
			ycRecord,
			recordAnimate
		},
		data() {
			return {
				swiperOptons: { // 轮播图
					indicatorDots: false,
					indicatorColor: '',
					activeClass: 'active-swiper-item',
					autoplay: false,
					interval: 3000,
					circular: true,
					displayCount: 2,
					nextMargin: "80rpx",
					//
					autoplay: false, // 是否默认播放
					sectionIndex: null, //  当前播放的章节索引
					sectionLength: null, // 当前书籍的所有章节， 避免在最后或第一章的时候，用户还能进行切换音频
					voicePath: "https://ygyc-product.oss-cn-hangzhou.aliyuncs.com/sdu/krifation/voice/fc2a496753a8461d8bd5bad9e341f604-道德经 1.mp3", //   音频路径
					playMethod: "",
					start: true
				},
				cardOptions: {
					isFull: true
				},
				commentData: []
			}
		},
		onShow() {
			this.getList();
		},
		methods: {
			//  查询列表
			getList() {
				URLS.readApi.list().then(res => {
					this.commentData = res.data;
				}).catch(err => {
					uni.showModal()({
						title: err.message,
						icon: "none"
					});
				})
			},
			provious: function() {
				console.log("--上一个")
			},
			next: function() {
				console.log("--下一个")
			},
			shareToggle: function() {
				this.$refs.record.open()
			},
			auth: function() {
				uni.navigateTo({
					url: "../auth/auth"
				})
				console.log("------auth")
			}
		}
	}
</script>

<style>
	.banner {
		background: #049B96;
		height: 663.461rpx;
	}

	.bgColor {
		background-color: #957354
	}

	.swiper-item {
		height: 90%;
		width: 95%;
		border-radius: 19.23rpx;
	}

	.parent-swiper-item {
		padding: 0 9.615rpx;
	}

	.yc-text {
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 6;
	}
</style>

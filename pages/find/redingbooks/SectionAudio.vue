<template>
	<view class="yc-section-content">
		<view class="section-title fontOpacity font16">
			第一章 1.1
		</view>
		<view class="text-container">
			<text v-if="!ischangeText" class="section-text font16 fontfamily">
				道 可道非常道 名 可名非常名 无名 天地之始有 名 万物之母故常无 欲以观其妙 常 有 欲以观其缴 此两者 同出而异名 同 谓之玄 玄之又玄众妙之 门
			</text>
			<text v-else class="section-text font16 fontfamily">
				白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文白话文
			</text>
		</view>
		<view class="yc-section-operate flex-items">
			<image v-if="!changeing" src="../../../static/images/cycle.png" mode="" class="iconWidth" @click="changeModal"></image>
			<image v-else src="../../../static/images/single.png" mode="" class="iconWidth" @click="changeModal"></image>
			<view class="operate music flex-items">
				<image src="../../../static/images/music.png" mode="" class="iconWidth"></image>
				<view class="count font12">
					12
				</view>
			</view>
			<image v-if="!ischangeText" src="../../../static/images/translate.png" mode="" class="iconWidth diff" @click="changeText"></image>
			<image v-else src="../../../static/images/original.png" mode="" class="iconWidth diff" @click="changeText"></image>
			<image src="../../../static/images/record.png" mode="" class="iconWidth operate" @click="showRecordModal">
			</image>
		</view>
		<view class="section-music">
			<ycAudio :isChange="audioIsChange" @changeModal = "changeModal" ref="audio" />
		</view>

		<!-- 录音 -->
		<uni-popup ref="record" type="share" :mask-click="false">
			<view class="tryListen-wrapper bgColorBlockOpacity4" v-if="tempFilePath !== ''">
				<view class="tryListen-container padding16">
					<view class="tryListen-operate">
						<view class="font16">
							跟读录音
						</view>
						<view class="note font12 opacity4">
							{{startTime}}录音，当前为临时文件
						</view>
						<view class="tryplay" opacity4>
							<image v-if="!audioStatu" src="../../../static/images/play.png" mode="" class="iconWidth"
								@click="play">
							</image>
							<image v-else src="../../../static/images/stop.png" mode="" class="iconWidth" @click="play">
							</image>
						</view>
						<view class="release" opacity4>
							<image src="../../../static/images/release.png" mode="" class="iconWidth"></image>
						</view>
					</view>
				</view>
				<view class="padding16">
					<ycAudio @setAudioStatu="setAudioStatu" :voicePath="tempFilePath" :audioTime="audioTime"
						:autoplay="autoplay" ref="child" />
				</view>
			</view>
			<view class="record-wrapper">
				<ycRecord @startrecord="startrecord" @stoprecord="stoprecord" @hide="hide"></ycRecord>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		URLS
	} from "../../../common/api.config.js";
	import {
		FUN
	} from "../../../common/publicFunction.js";
	import ycAudio from "../../../components/ycAudio/ycAudio.vue"
	import ycRecord from '@/components/yc-record/yc-record.vue'
	export default {
		components: {
			ycAudio,
			ycRecord,
		},
		data() {
			return {
				autoplay: false,
				audioIsChange: true,
				readingBookId: '',
				name: '',
				resData: [],
				SectionList: [],
				start: false,
				tempFilePath: "",
				startTime: "", // 开始录音时间
				audioTime: "",
				audioStatu: false,
				changeing: false, 
				ischangeText: false,
				
			}
		},
		onLoad(options) {

		},
		onShow() {
			// this.getSectionList();
		},
		methods: {
			//  正则匹配 html  标签 和空格
			replaceHTML(text) {
				var reg = /<[^>]+>/g;
				text = text.replace(reg, ''); //替换HTML标签
				text = text.replace(/&nbsp;/ig, ''); //替换HTML空格
				return text
			},
			//  获取章节列表
			getSectionList() {
				URLS.readApi.menuList({
					readingBookId: this.readingBookId
				}).then(res => {
					let resData = res.data;
					resData.map((item, index) => {
						let newNumber = FUN.changeNumber(item.chapter);
						item["newChapter"] = `第${newNumber}章`;
						item.readingBookSectionList.map((item2, index2) => {
							item2.content =
								`<div style='overflow:hidden;white-space: nowrap;text-overflow: ellipsis; '>${this.replaceHTML(item2.content)}</div>`;
						})
					});
					this.SectionList = resData;
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "none"
					});
				})
			},
			// 显示音频
			showRecordModal() {
				this.$refs.record.open()
			},
			stoprecord(opt) {
				this.start = false;
				this.tempFilePath = opt.msg;
				this.startTime = opt.now;
				this.audioTime = opt.time;
			},
			startrecord() {
				// 音频正在播放   进行录音操作， 音频暂停   
				this.audioStatu = false;
				if (this.tempFilePath !== "") {
					this.$refs.child.pause();
				}
				this.start = true
			},
			play() {
				if (this.start) {
					uni.showModal({
						title: "提示",
						content: "当前正在录音，请先结束录音"
					})
					return
				}
				if (!this.audioStatu) {
					this.$refs.child.play(this.tempFilePath)
				} else {
					this.$refs.child.pause()
				}
				this.audioStatu = !this.audioStatu;
			},
			hide() {
				this.$refs.record.close()
			},
			setAudioStatu(opt) {
				this.audioStatu = opt.start
			},
			changeModal(){
				this.changeing = !this.changeing;
				this.$refs.audio.changeModal();
			},
			changeText(){
				this.ischangeText = !this.ischangeText;
			}
		}
	}
</script>

<style>
	.yc-section-content {
		padding: 0rpx 32rpx 0rpx 32rpx;
		color: #FFFFFF;
	}

	.text-container {
		height: 712rpx;
		overflow-y: scroll;
		margin-top: 32rpx;
	}

	.section-text {
		line-height: 64rpx;
	}

	.yc-section-operate {
		display: flex;
	}

	.operate {
		margin-left: 164rpx;
	}

	.diff {
		margin-left: 166rpx;
	}

	.music {
		position: relative;
	}

	.section-music {
		margin-top: 48rpx;
	}

	.count {
		position: absolute;
		top: -4rpx;
		right: -21rpx;
	}

	.section-title {
		line-height: 44rpx;
	}

	.note {
		margin-left: 16rpx;
	}

	.tryplay {
		margin-left: 98rpx;
	}

	.release {
		margin-left: 48rpx;
	}

	.tryListen-operate {
		display: -webkit-box;
		align-items: center;
	}

	.record-wrapper {
		height: 472rpx;
		background-color: #FFFFFF;
	}
</style>

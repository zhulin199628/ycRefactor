<template>
	<view class="">
		<view class="audio-main">
			<view class="startTime font12">
				{{currentNum}}
			</view>
			<view class="uni-padding-wrap uni-common-mt">
				<slider class="music-slider" :value="current" @change="dropFastForward" @changing="droping"
					:max="duration" block-size="12" />
			</view>
			<view class="endTime font12">
				{{audioTime}}
			</view>
		</view>
		<view class="music-container flex-style" v-if="isChange">
			<view class="">
				<image src="../../static/images/previous.png" mode="" class="iconWidth"></image>
			</view>
			<view class="play-wrapper">
				<image src="../../static/images/play.png" mode="" class = "play"></image>
			</view>
			<view class="">
				<image src="../../static/images/next.png" mode="" class="iconWidth"></image>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * @property {String} voicePath 音频地址 
	 * @property {Boolean} autoplay 自动播放
	 * @property {String} playMethod 播放模式
	 * @property {Boolean} isChange  是否显示上一曲、下一曲
	 **/
	import {changeTime} from "../../utils/time.js"
	export default {
		name: 'ycAudio',
		data() {
			return {
				start: false,
				audioInstance: uni.createInnerAudioContext(),
				current: '00:00', //当前播放时间
				duration: '', // 音频总时间
				progress_rate: 0,
				seek: false ,//  是否快进
				currentNum: "00:00"  ,// 实现 MM:SS 格式，  value属性不能是MM:SS格式
				playMethod: ""
			}
		},

		props: {
			voicePath: {
				type: String,
				required: true
			},
			autoplay: {
				type: Boolean,
				default: false
			},
			isChange: {
				type: Boolean,
				default: false
			},
			audioTime:{
				type: String,
				default:"00:00"
			}
		},
		methods: {
			listenOperate: function() {
				if (!this.start) {
					// 播放
					this.play()
				} else {
					// 暂停
					this.pause()
				}
			},
			// 播放
			play: function(path = "") {
				this.audioInstance.src = path || this.voicePath;
				this.audioInstance.play();
				//  只有执行这个方法之后，onTimeUpdate 才会被调用, 目前没想到其它的方法
				setTimeout(() => {
					this.audioInstance.paused
				}, 100)
			},
			//  暂停
			pause: function() {
				this.audioInstance.pause();
			},
			// 上一个
			provious: function() {
				this.$emit('provious')
			},
			// 下一个
			next: function() {
				this.$emit('next')
			},
			// 播放模式  目前只有循环播放模式，可拓展
			changeModal: function() {
				if (this.playMethod === "cycle") {
					this.playMethod = ""
				} else {
					this.playMethod = "cycle"
				}
			},
			// 拖动快进
			dropFastForward: function(opt) {
				let count = opt.detail.value;
				// this.current = count;
				this.audioInstance.seek(count);
			},
			//  拖动过程中
			droping: function(opt) {
				let count = opt.detail.value;
				this.current = changeTime(count);
				this.seek = true;
			},
		},
		created() {
			//  默认自动播放
			if (this.voicePath) {
				this.audioInstance.src = this.voicePath;
				this.audioInstance.autoplay = this.autoplay
			}
			this.audioInstance.onTimeUpdate(() => {
				if (!this.seek) {
					this.currentNum = changeTime(parseInt(this.audioInstance.currentTime)*1000);
					this.current = parseInt(this.audioInstance.currentTime);
				}
				if (!this.duration) {
					this.duration = parseInt(this.audioInstance.duration);
				}
				this.start = true;
			})
			//手机系统静音模式下，默认没有声音
			this.audioInstance.obeyMuteSwitch = false;
			//  监听播放事件
			this.audioInstance.onPlay(() => {
				this.start = true;
				this.$emit("setAudioStatu",{
					start: this.start
				})
			});
			//  监听暂停事件
			this.audioInstance.onPause(() => {
				this.start = false;
				this.$emit("setAudioStatu",{
					start: this.start
				})
			})
			//  音频自然结束事件
			this.audioInstance.onEnded(() => {
				this.start = false;
				this.current = 0;
				this.currentNum = "00:00";
				if (this.playMethod === 'cycle') {
					this.play();
				} else {
					this.next();
				}
				this.$emit("setAudioStatu",{
					start: this.start
				})
			});
			//  正在快进
			this.audioInstance.onSeeking((opt) => {

			})
			// 快进结束
			this.audioInstance.onSeeked((opt) => {
				this.seek = false;
				this.audioInstance.paused
			})
			this.audioInstance.offWaiting(() => {})
		},
		watch: {
			voicePath(voice, oldVoice) {
				this.audioInstance.src = voice
				this.current = 0	
				this.duration = 0
				// if (oldVoice || this.autoplay) {
				// 	this.play()
				// }
			}
		},
		onUnload() {
			this.innerAudioContext.destroy();
		}
	}
</script>

<style>
	.audio-main {
		display: flex;
		align-items: center;
	}
	.music-slider {
		width: 522rpx;
		margin: 0rpx 16rpx 0rpx 22rpx;
	}
	.play{
		width: 112rpx;
		height: 112rpx;
	}
	.music-container{
		margin-top: 64rpx;
	}
	.play-wrapper{
		margin: 0 80rpx;
	}
</style>

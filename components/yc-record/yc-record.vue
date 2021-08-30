<template>
	<view class="record-main bgWhite padding16">
		<view class="down">
			<image src="../../static/images/dropdown.png" mode="" class="iconWidth" @click="hide"></image>
		</view>
		<view class="textCenter black1 font16">
			<text v-if="start">跟读录音</text>
			<text v-else>重新跟读录音</text> 
		</view>
		<view class="textCenter black11 font12 des" v-if="!start">
			<text v-if="start">点击下方按钮开始录音</text>
			<text v-else>点击下方按钮开始录音，结束后则覆盖跟读试录</text> 
			
		</view>
		<view class="textCenter black11 font12 des" v-if="start">
			<text>{{min}}</text>
			<text>:</text>
			<text>{{second}}</text>
		</view>
		<view class="" v-if="start">
			<recordAnimate />
		</view>
		<view class="textCenter startBtn" @click="startRecord" :style="{'margin-top':!start?'158rpx':'48rpx'}">
			<view class="record-container flex-style">
				<image v-if="!start" src="../../static/images/recordPlay.png" mode="" class="startIcon"></image>
				<image v-else src="../../static/images/rect.png" mode="" class="iconWidth"></image>
			</view>
		</view>
	</view>
</template>
<script>
	import recordAnimate from "../record-animate/record-animate.vue"
	import moment from "../../utils/moment.js"
	import {changeTime} from "../../utils/time.js"
	let timer = null;
	export default {
		name: "ycRecord",
		components: {
			recordAnimate
		},
		data() {
			return {
				recordInterface: uni.getRecorderManager(),
				audioInterface: uni.createInnerAudioContext(),
				start: false,
				tempFilePath: "",
				min: "00",
				second: "00",  
			}
		},
		created() {
			// 
			//手机系统静音模式下，默认没有声音
			this.audioInterface.obeyMuteSwitch = false;

			//  录音开始事件
			this.recordInterface.onStart(() => {
				console.log("-------====onstart")
			})

			//  录音结束事件
			this.recordInterface.onStop((filepath) => {
				this.start = false;
				this.tempFilePath = filepath.tempFilePath
			})

			// 录音错误事件
			this.recordInterface.onError((err) => {
				console.log(err,"-----e-rr")
				this.start = false;
				if (err.errMsg === "operateRecorder:fail auth deny") {
					uni.showModal({
						title: "麦克风权限未开启",
						content: "无法录制声音，请前往手机设置里面打开麦克风权限"
					})
				}
			})
		},
		methods: {
			//  开始计时
			startTime: function() {
				this.min = "00";
				this.second = "00";
				let min = 0;
				let second = 0;
				timer = setInterval(() => {
					second++;
					if (second < 10) {
						this.second = '0' + second
					} else {
						if (second === 60) {
							min++;
							second = 0;
							this.second = '0' + second
							if (min < 10) {
								this.min = '0' + min
							} else {
								this.min = min
							}
						}
						this.second = second
					}
				}, 1000)
			},
			
			// 开始录音
			startRecord: function() {
				console.log(this.start,"---onstart1")
				if (!this.start) {
					console.log("------getInto")
					this.recordInterface.start();
					this.recordInterface.onStart(() => {
						console.log("---onstart")
						this.startTime();
						this.$emit('startrecord')
					})
				} else {
					this.recordInterface.stop();
					this.recordInterface.onStop((file) => {
						let now = moment().locale('zh-cn').format('HH:mm');
						let time = changeTime(file.duration)
						clearInterval(timer);
						this.$emit('stoprecord', {
							msg: file.tempFilePath,
							now,
							time
						})
					})
				}
				this.start = !this.start;
			},
			// 结束录音
			stopRecord: function() {
				this.recordInterface.stop();
				this.recordInterface.onStop((file) => {
					this.$emit('recordStop')
				})
			},
			// 试听
			tryListen: function() {
				this.audioInterface.src = this.tempFilePath;
				this.audioInterface.play();
			},
			hide: function() {
				this.$emit('hide')
			}
		}
	}
</script>

<style>
	.record-main {
		position: relative;
	}

	.down {
		position: absolute;
	}

	.textCenter {
		text-align: center;
	}

	.des {
		margin-top: 18rpx;
	}

	.startBtn {
		margin-top: 158rpx;
		display: flex;
		justify-content: center;
	}

	.record-container {
		border: 4rpx solid #BBBBBB;
		border-radius: 50% 50%;
		text-align: center;
		width: 112rpx;
		height: 112rpx;
	}

	.startIcon {
		width: 96rpx;
		height: 96rpx;
	}
</style>

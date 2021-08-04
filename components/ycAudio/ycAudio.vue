<template>
	<view class="">
		<button type="default" @click="listenOperate" v-if="!start">开始</button>
		<button type="default" @click="listenOperate" v-else="start">暂停</button>
		<button type="default" @click="provious">上一个</button>
		<button type="default" @click="next">下一个</button>
		<button type="default" @click="changeModal">循环播放</button>
		<view class="uni-padding-wrap uni-common-mt">
			<text>{{duration}}</text>
			<slider 
			:value="current" 
			@change="dropFastForward" 
			@changing="droping"
			:max = "duration"/>
			<text>{{current}}</text>
		</view>
	</view>
</template>

<script>
	/**
	 * @property {String} voicePath 音频地址 
	 * @property {Boolean} autoplay 自动播放
	 * @property {String} playMethod 播放模式
	 **/
	export default {
		name: 'ycAudio',
		data() {
			return {
				start: false,
				audioInstance: uni.createInnerAudioContext(),
				current: '', //当前播放时间
				duration: '', // 音频总时间
				progress_rate: 0,
				seek: false //  是否快进
			}
		},

		props: {
			voicePath: {
				type: String,
				required: true
			},
			autoplay: {
				type: Boolean,
				default: true
			},
			playMethod:{
				type: String,
				default: ''
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
			play: function() {
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
			changeModal: function(){
				if(this.playMethod  === "cycle"){
					this.playMethod = ""
				}else{
					this.playMethod = "cycle"
				}
			},
			// 拖动快进
			dropFastForward: function(opt){
				let count = opt.detail.value;
				// this.current = count;
				this.audioInstance.seek(count);
			},
			//  拖动过程中
			droping: function(opt){
				let count = opt.detail.value;
				this.current = count;
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
				console.log(this.seek,"------进度更新")
				if(!this.seek){
					this.current = parseInt(this.audioInstance.currentTime);
				}
				if(!this.duration){
					this.duration = parseInt(this.audioInstance.duration);
				}
				this.start = true;
			})
			//手机系统静音模式下，默认没有声音
			this.audioInstance.obeyMuteSwitch = false;
			//  监听播放事件
			this.audioInstance.onPlay(() => {
				this.start = true;
			});
			//  监听暂停事件
			this.audioInstance.onPause(() => {
				this.start = false;
			})
			//  音频自然结束事件
			this.audioInstance.onEnded(() => {
				this.start = false;
				this.current = 0;
				if(this.playMethod === 'cycle'){
					this.play();
				}else{
					this.next();
				}
			});
			//  正在快进
			this.audioInstance.onSeeking((opt) =>{
				
			})
			// 快进结束
			this.audioInstance.onSeeked((opt) =>{
				 this.seek = false;
				 this.audioInstance.paused
			})
			this.audioInstance.offWaiting(() =>{})
		},
		watch:{
			voicePath(voice, oldVoice){
				this.audio.src = voice
				this.current = 0
				this.duration = 0
				if (oldVoice || this.autoplay) {
					this.play()
				}
			}
		},
		onUnload() {
			this.innerAudioContext.destroy();
		}
	}
</script>

<style>
</style>

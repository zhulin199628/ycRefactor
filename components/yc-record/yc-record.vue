<template>
	<view class="">
		<button type="default" v-if="!start" @click="startRecord">开始录音</button>
		<button type="default" v-else @click="stopRecord">结束录音</button>
		<button type="default" v-if="" @click="tryListen">试听</button>
	</view>
</template>
<script>
	export default{
		name: "ycRecord",
		data(){
			return {
				recordInterface: uni.getRecorderManager(),
				audioInterface: uni.createInnerAudioContext(),
				start: false,
				tempFilePath: ""
			}
		},
		created(){
			//手机系统静音模式下，默认没有声音
			this.audioInterface.obeyMuteSwitch = false;
			
			//  录音开始事件
			this.recordInterface.onStart(() =>{
				this.start = true;
			})
			
			//  录音结束事件
			this.recordInterface.onStop((filepath) =>{
				 this.start = false;
				 this.tempFilePath = filepath.tempFilePath
			})
			
			// 录音错误事件
			this.recordInterface.onError((err) =>{
				this.start = false;
				if(err.errMsg === "operateRecorder:fail auth deny"){
					uni.showModal({
						title: "麦克风权限未开启",
						content: "无法录制声音，请前往手机设置里面打开麦克风权限"
					})
				}
			})
			this.recordInterface.onFrameRecorded((arraybuffer, islastframe) =>{
				console.log(arraybuffer, islastframe,"-----onFrameRecorded")
			})
		},
		methods:{
			// 开始录音
			startRecord: function(){
				this.recordInterface.start({})
			},
			// 结束录音
			stopRecord: function(){
				this.recordInterface.stop();
			},
			// 试听
			tryListen: function(){
				 this.audioInterface.src = this.tempFilePath;
				 this.audioInterface.play();
			}
		}
	}
	
</script>

<style>
</style>

// 播放音频类
class CustomMusic {
	constructor(options) {
		var {
			autoplay
		} = options;
		//  是否是自动播放
		this.autoplay = autoplay;
		//  实例化 Audio
		console.log(uni, "------uni")
		this.innerAudioContext = uni.createInnerAudioContext();
	}

	playMusic(opt) {
		console.log("-----playMusic1", opt)
		let {
			src
		} = opt;
		this.src = src;
		this.innerAudioContext.src = src;
		this.innerAudioContext.play();
	}
	onError() {
		this.innerAudioContext.onError = ((res) => {
			console.log(res, "-----播放出错")
		})
	}
	destroy() {
		this.innerAudioContext.destroy();
	}
}


//  录音类
class Recording {
	constructor() {
		this.voicePath = null;
		this.recorderManager = uni.getRecorderManager();
		this.innerAudioContext = uni.createInnerAudioContext();
	}

	start() {
		this.recorderManager.start()
	}

	stop() {
		this.recorderManager.stop()
	}

	play() {
		if (this.voicePath) {
			this.innerAudioContext.src = this.voicePath;
			this.innerAudioContext.play();
		}
	}
	onStop(){
		console.log("--------录音文件临时储存路径")
		this.recorderManager.onStop((res) =>{
			console.log(res,"-----录音文件临时储存路径")
			return res.tempFilePath
			// this.voicePath = res.tempFilePath;
		})	
	}
}

export {
	CustomMusic,
	Recording
}

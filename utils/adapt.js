//  适配导航栏  刘海屏
const adaptNavbar = function() {
	return new Promise((resolve, reject) => {
		wx.getSystemInfo({
			success(info) {
				// that.statusBarHeight = info.statusBarHeight * 2;
				resolve(info)
			},
			fail(err) {
				console.log("获取设备信息失败")
				reject(err);
			}
		})
	})
}

// Tabs  距离顶部的距离适配， 刘海屏

const getSwiperHeight = function(eleclass, that) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let query = uni.createSelectorQuery().in(that);
			query.select('.'+ eleclass).boundingClientRect();
			query.exec((res => {
				if (!res) {
					getSwiperHeight();
				} else {
					resolve(res[0].height);
				}
			}))
		}, 20)
	})
}

export {
	adaptNavbar,
	getSwiperHeight
}

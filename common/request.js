/*
更新时间：   2021/7/9
authtor:  seaward
1. 测试服务器：  http://47.99.141.28:8080/
2. 生产服务器:  https://www.krifation.cn/  ————> IP:  116.62.167.193
*/

const POST = 'POST';
const GET = 'GET';
const token =  uni.getStorageSync('token');//  此处后台逻辑需要更改， 后台token 是定死的

function request(data = '', method, contentType,url){
	return new Promise((resolve, reject) =>{ 
		let header = {
			token,
			'Content-Type': contentType
		};
		uni.request({
			url,
			method,
			header,
			data: data,
			success: res => {
				if (res.data.code == 1000) {
					resolve(res.data);
				} else if (res.data.code == 1003) {
					uni.reLaunch({
						url: '../index/index'
					});
				}else if(res.data.code == 1001){
					reject(res.data)
				}else{
					reject(res.data)
				}
			},
			fail() {
				reject("请求失败！请刷新当前页面")
			}
		});
	})
}

module.exports = {
	request:request
}
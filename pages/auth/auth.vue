<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="isCanUse">
			<view>
				<view class='header'>
					<image src="https://ygyc-product.oss-cn-hangzhou.aliyuncs.com/sdu/krifation/img/static/logo.jpg">
					</image>
				</view>
				<view class='content' v-show="boon">
					<view>申请获取以下权限</view>
					<text>获得你信息(昵称，头像、地区等)</text>
				</view>
				<view class='content' v-show="!boon">
					<view>申请绑定手机号</view>
					<text>为给您提供更好的服务,请补全账号信息</text>
				</view>
				<button v-if="boon" class='bottom' open-type="getUserInfo" withCredentials="true" lang="zh_CN"
					@click="wxGetUserInfo">
					授权
				</button>
				<button v-show="!boon" class='bottom' open-type="getPhoneNumber"
					@getphonenumber="getPhoneNumber">确认绑定</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		URLS
	} from '../../common/api.config.js'
	export default {
		data() {
			return {
				nickName: null,
				avatarUrl: null,
				isCanUse: true, //默认为true
				wxCode: "",
				boon: true,
				wxCode: "",
				arr: {},
				token: "",
				userId: "", //邀请人的ID

			};
		},
		onShow() {
			this.userId = uni.getStorageSync("userId")
		},
		methods: {
			//根据名称拿到分享过来的参数
			getQueryString(name) {
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
				var r = window.location.search.substr(1).match(reg);
				if (r != null) {
					return unescape(r[2]);
				}
				return null;
			},
			//第一授权获取用户信息===》按钮触发  
			wxGetUserInfo() {
				uni.getUserProfile({
					desc: "登录",
					success: res => {
						this.boon = false
						this.arr.name = res.userInfo.nickName; //昵称
						this.arr.imageUrl = res.userInfo.avatarUrl; //头像
						this.arr.sex = res.userInfo.gender
					},
					fail: err => {
						uni.showModal({
							title: "提示",
							content: "授权失败"
						})
					}
				})
			},
			getPhoneNumber(e) {
				uni.login({
					success: (res) => {
						if (e.detail.errMsg == 'getPhoneNumber:ok') {
							let arr = uni.getStorageSync('arr')
							this.arr.wxCode = res.code
							this.arr.iv = e.detail.iv
							this.arr.encryptedData = e.detail.encryptedData
							this.arr.shareUserId = this.userId;
							URLS.loginApi.xcxWxVerify(this.arr).then(res => {
								uni.setStorageSync('token', res.data.user.token);
								uni.setStorageSync('myIntro', res.data.user);
								uni.setStorageSync("guide", "1")
								uni.switchTab({
									url: '/pages/find/find',
								});
							}).catch(err => {
								uni.showToast({
									title: "绑定手机号失败",
									icon: "none"
								})
							})
						}
					},
					fail(err) {
						uni.showToast({
							title: "绑定手机号失败",
							icon: "none"
						})
					}
				});
			}
		},
		onLoad() { //默认加载
			this.token = uni.getStorageSync("token")
			if (this.token != "") {
				uni.switchTab({
					url: '../askQuestionList/askQuestionList',
				});
			}
		}
	}
</script>

<style>
	.header {
		margin: 154rpx 0 90rpx 50rpx;
		border-bottom: 2rpx solid #F4F4F4;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content view {
		color: #313236;
		font-size: 28rpx;
		font-weight: 400;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		font-size: 28rpx;
		font-size: 400;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
		background: #946BE3;
		color: #FFFFFF;
		box-shadow: 0 2px 14px 0 rgba(148, 107, 227, 0.4);
	}
</style>

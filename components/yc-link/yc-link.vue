<template>
	<view class="" @click="go()">
			<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'ycLink',
		data() {
			return {}
		},
		props: {
			pathObj: Object,
			default: ''
		},
		methods: {
			formatpath: function(goPath){
				let pageName = goPath[goPath.length - 1];
				return pageName
			},
			format: function(opt) {
				let mark = "&";
				let path = "";
				for (let key in opt) {
					path += key + '=' + opt[key] + mark ;
				};
				return path
			},
			go: function() {
				let pathname = this.pathObj.pathname;
				let options = this.pathObj.options || {};
				let path = pathname + "?" + this.format(options);
				let goPath = pathname.split('/');
				let pageName = this.formatpath(goPath);
				//  tab页跳转和 页内跳转的判断
				if (pageName === "trainingList" || pageName === "meditation" || pageName === "issueList") {
					uni.switchTab({
						url: path
					});
				} else {
					uni.navigateTo({
						url: path
					});
				}
			}
		}
	}
</script>

<style>
</style>

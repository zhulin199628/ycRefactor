<template>
	 
</template>

<script>
	import {URLS} from "../../../common/api.config.js"
	import {FUN} from "../../../common/publicFunction.js";
	export default{
		data(){
			return {
				readingBookId:'',
				name:'',
				resData: [],
				SectionList:[]
			}
		},
		onLoad(options) {
			this.readingBookId = options.readingBookId
			this.name = options.name
		},
		onShow() {
			this.getSectionList();
		},
		methods:{
			//  正则匹配 html  标签 和空格
			replaceHTML(text){
				var reg = /<[^>]+>/g;
				text = text.replace(reg, '');//替换HTML标签
				text = text.replace(/&nbsp;/ig, '');//替换HTML空格
				return text
			},
			
			//  获取章节列表
			getSectionList(){
				URLS.readApi.menuList({readingBookId: this.readingBookId}).then(res =>{
					let resData = res.data;
					resData.map((item, index) => {
						let newNumber = FUN.changeNumber(item.chapter);
						 item["newChapter"] = `第${newNumber}章`;
						item.readingBookSectionList.map((item2, index2) =>{
							item2.content =`<div style='overflow:hidden;white-space: nowrap;text-overflow: ellipsis; '>${this.replaceHTML(item2.content)}</div>`;
						})
					});
					this.SectionList = resData; 
				}).catch(err =>{
					uni.showToast({
						title: err.message,
						icon: "none"
					});
				})
			}
		}
	}
</script>

<style>
</style>

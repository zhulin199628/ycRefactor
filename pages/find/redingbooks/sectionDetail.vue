<template>
</template>

<script>
	import {URLS} from "../../../common/api.config.js"
	import {FUN} from "../../../common/publicFunction.js";
	export default{
		 data(){
			 return {
				 
			 }
		 },
		 onLoad(options) {
		 	this.readingBookId = options.readingBookId
		 	this.newChapter = options.newChapter
		 	this.name = options.name
		 	this.readingBookSectionId = options.readingBookSectionId;
		 },
		 onShow() {
		 	
		 },
		 //  销毁音频实例
		 onUnload(){
			 
		 },
		 methods:{
			 
		 }
	}
</script>

<style>
</style>

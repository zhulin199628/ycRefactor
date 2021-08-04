<template>
	<view class="content">
		<view class="header">
			<vtabs v-model="current" :tabs="tabs" @change="changeTab"></vtabs>
		</view>
		<view @click="selectAddress">
			<text>地点</text>
		</view>
	<uni-list>
	    <uni-list-item  title="列表文字" ></uni-list-item>
	</uni-list>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
	</view>
</template>
 
<script>
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	import vtabs from '@/components/v-tabs/v-tabs.vue'
	export default {
		components: {
			simpleAddress,
			vtabs,
		}, 
		data() {
			return {
				current: 0,
				tabs: ['已报名','报名截止','进行中','结束'],
				defaultAddress: ['北京市', '市辖区', '东城区'],
				cityPickerValueDefault: [0, 0, 1],
				address: {}
			}
		},

		onLoad() {},
		methods: {
			changeTab: function(index){
				this.current = index
			},
			// 地址选择
			selectAddress: function(){
				var index = this.$refs.simpleAddress.queryIndex(this.defaultAddress, 'label');
				this.cityPickerValueDefault = index.index;
				this.$refs.simpleAddress.open();
			},
			onConfirm: function(e){
				this.address = e
			}
		},
		
	}
</script>

<style>
</style>

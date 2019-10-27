<template>
	<view class="content">
		<view class="navTab">
			<mine-nav-tab @changeTab="tabChange" :tabTitle="tabTitleDates" :navTabHeight='tabHeight' :isShowUnderLine='isShowUnderLine'
			 :backgroundColor='backgroundColor'> </mine-nav-tab>
		</view>

		<swiper class="page-content" >
			<swiper-item class="page-item">
				<view class="swiper-item">
					在线音乐页面
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					本地音乐页面
				</view>
			</swiper-item>

		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabHeight: 32,
				isShowUnderLine: false,
				backgroundColor: '#E04B28',
				tabTitleDates: ['在线音乐', '本地音乐'], //导航栏格式 --导航栏组件
				tabTitleDates1: ['在线音乐', '本地音乐', '在线音乐', '本地音乐', '在线音乐', '本地音乐'], //导航栏格式 --导航栏组件
				title: 'Hello',
				scrollLeft: 0,
				tabCurrentIndex: 0,
				newDates: null
			}
		},
		onLoad() {
			// this.newDates = newsData;
		},
		methods: {
			changeTab(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	/* tab栏设置 */
	.navTab {
		display: flex;
		margin: 8rpx 25%;
		width: 50%;
		border-radius: 40rpx;
		overflow: hidden;
	}
	/* 页面样式设定 */
	.page-content {
		height: 100%;

		
	}
</style>

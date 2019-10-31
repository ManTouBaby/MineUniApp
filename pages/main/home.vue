<template>
	<view class="content">
		<view class="navTab">
			<mine-nav-tab @changeTab="tabChange" :tabTitle="tabTitleDates" :navTabHeight='tabHeight' :isShowUnderLine='isShowUnderLine'
			 :backgroundColor='backgroundColor'> </mine-nav-tab>
		</view>

		<swiper class="page-content">
			<swiper-item class="page-item">
				<view class="swiper-item">
					<swiper class="bannerContainer" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item class="bannerItem" v-for="(item , index) in bannerDates" :key='index'>
							<view>
								<image :src="item.bannerImgUrl"></image><strong></strong>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="uni-flex uni-row">
					<view class="flex-item uni-flex-item" v-for="(item,index) in senconTabDates" :key='index'>
						<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
							<view >
								<image class="flex-item" :src="item.tabTagUrl"></image>
							</view>
						</view>
						<text class="senconTab">{{item.tabName}}</text>
					</view>
					
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
	import json from '@/json.js'
	export default {
		data() {
			return {
				tabHeight: 32,
				isShowUnderLine: false,
				backgroundColor: '#E04B28',
				scrollLeft: 0,
				tabCurrentIndex: 0,
				tabTitleDates: ['在线音乐', '本地音乐'], //导航栏格式 --导航栏组件
				bannerDates:[],
				senconTabDates:[
					{
						tabName:'每日推荐',
						tabTagUrl:'../../static/t_dragonball_icn_daily.png',
						tabIndex:0
					},
					{
						tabName:'歌单',
						tabTagUrl:'../../static/t_dragonball_icn_playlist.png',
						tabIndex:0
					},
					{
						tabName:'排行榜',
						tabTagUrl:'../../static/t_dragonball_icn_rank.png',
						tabIndex:0
					},
					{
						tabName:'电台',
						tabTagUrl:'../../static/t_dragonball_icn_radio.png',
						tabIndex:0
					},
					{
						tabName:'直播',
						tabTagUrl:'../../static/t_dragonball_icn_look.png',
						tabIndex:0
					},
				],
			}
		},
		onLoad() {
			// this.newDates = newsData;
			this.bannerDates =json.bannerDates;
		},
		methods: {
			tabChange(e) {
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
		
		/* Banner广播 */
		.bannerContainer{
			width: 100%;
			height: 200rpx;
			margin: 20rpx 0;
			.bannerItem{
				width: 100%;
				height: 100%;
				view{
					width: 90%;
					height: 100%;
					margin: 0 5%;
					border-radius: 16rpx;
					overflow: hidden;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		
		
		/* 菜单 */
		.flex-item {
			.uni-flex {
				view {
					width: '60%';
					height: 90rpx;
					background-color: #FF3333;
					border-radius: 46rpx;
					
					image {
						width: 80rpx;
						height: 80rpx;
						margin: 5rpx;
					}
				}
			}
		
			.senconTab {
				margin-top: 6rpx;
				display: block;
				text-align: center;
				font-size: 16rpx;
				color: #2C405A;
			}
		}
	}

	
</style>

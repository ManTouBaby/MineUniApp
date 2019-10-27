<template>
	<view class="content">
		<!-- 滚动导航 -->
		<mine-nav-tab @changeTab="onTabBarClick" :tabTitle="tabBars" :defaultTextColor='defaultTextColor' :backgroundColor='backgroundColor' :selectTextColor="selectTextColor"> </mine-nav-tab>

		<!-- 内容列表 -->
		<swiper class="swiper-box" :current="currentPage" @change="pageChange">
			<swiper-item v-for="(item,index) in newsList" :key='index'>
				<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore">
					<!-- 
						* 新闻列表 
						* 和nvue的区别只是需要把uni标签转为weex标签而已
						* class 和 style的绑定限制了一些语法，其他并没有不同
					-->
					<view v-for="(item, index) in item.data" :key="index" class="news-item" @click="navToDetails(item)">
						<text :class="['title', 'title'+item.type]">{{item.title}}</text>
						<view v-if="item.images.length > 0" :class="['img-list', 'img-list'+item.type, item.images.length === 1 && item.type===3 ? 'img-list-single': '']">
							<view v-for="(imgItem, imgIndex) in item.images" :key="imgIndex" :class="['img-wrapper', 'img-wrapper'+item.type, item.images.length === 1 && item.type===3 ? 'img-wrapper-single': '']">
								<image class="img" :src="imgItem"></image>
								<view class="video-tip" v-if="item.videoSrc">
									<image class="video-tip-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEC0lEQVRoQ+2ajVEVMRDHdzuwA6ACpQKxArECtQKxAqECoQKhAqECoQKxAqEDrWCdn7Nx8vJy+bp3T4YhM2+O8S7J/rO7//2IKo9k6CPBIU9Acpo0s10ReSkiPA8mtH0tIncicqOqPDcyZmvEhX8rIu8cQI9gtyJyKSIXc0ENA3EAnxxAj/BT356LyEdV/TWyWDcQM3smIgA4mtjwXkQ4aX4Mngj3QkSYy5PfTmb+laoeLg7EzBDga8aEEB4TOVfVAKAoj2sUc+QXQC0PxMzY8Esi3W8ROVbV05FTDHPMDC1AEBzEcqY1AeLMQQxtXANuZvjMa/cb/i6Oqo9kQKCFI1WtLl7bfOq9mUHd3/w9ND1F5f+WKAJxn/gebQiIg1Y/mAEEUsDX8J0zVZ0iljoQZydAYLuMrYCIwXOQrYc2qREzw4E/RAu/X9KcRrUX5mWBODX+jBY/UdXjuZuNznd5PnscepNjtikgODJpRzCp3VFaHBU+MTEOkSDMIJ0hFKyMNSAZbZA2NMUJn7ujqjebABDWyDDnXpqb5YDEvnGvqsHZi7I5CMgBxiHDxRx5bmSYGZlyyADWmCwHBN8IwjdRH5Im3B+En5UIJuYFBeMnjFtV3Y/frwDJmNV+K/1NAGEvIv+pqp7MUU1GthXzSoHE+VSzWRU0EsuOaUDhw+aWmNdKOEiBxOzQlYkWNJIqAiAI0V0dmhkZNvkXYyUkpEDYhFJ17cOaWXQACUtxaPhgc9JpZvFBr+Rg/xNI8B+0w0lXR0LDzUCIoE0bNPpISdC1uJD7uJQVlzTyEIFQgFGhMpo10pVfDfgIwlAiU9s0af4h+gglARkE8WURZ98G/V65Fhal3zgg3qnqXpVK/IMG0/rhAOYExDh9KgZEcqy4DtlEirKpTgutqLjsnk5RnEaLWeaUhiY0srFOS1KxrqVPtTS+2by8xsdsnkONNN5G0pDCQcVmtcaoLYVVV63e0zDo8L+0OVgvrNy84lIXemRiM022CtjynWsabVCwMdpKXQeSOlZXcGwRsPWbJAgyLZvOPOh2UKZWn6xYS0Dibl/IVF+1VoytJ15wbqyCtmkwKdIZGnZZE+9tmbLI4mC8VRuDAG8xpo00sQFDi2iRJrabU2jGBYVVmbMKxJ0/dzfSXeGVzM3ZiRZt2tGsgmDdJiAFMGiHNPxijk+YGV1NsuHgD82aCB82A4lomdohvf8jrQm3s61XbzgzAMJtVXwWOPZhD7F0AXEwnBrqjzv1sRCACnfp/HvIdsNlTbiDn+pgDuVn3UCCxN4wA1Bods+xrr8R26/yuuuULh8p8D0nSzsTE8ldOZcAhttgKsUhAEM+Ujty1xIm1PJfOK7nCh/LM2xaNVDbfv8EZNsnXtvvDyrmF1FIBKIwAAAAAElFTkSuQmCC"></image>
								</view>
							</view>
						</view>
						<!-- 空图片占位 -->
						<view v-else class="img-empty"></view>
						<view :class="['bot', 'bot'+item.type]">
							<text class="author">{{item.author}}</text>
							<text class="time">{{item.time}}</text>
						</view>
					</view>

					<!-- 上滑加载更多组件 -->
					<!-- <mix-load-more :status="tabItem.loadMoreStatus"></mix-load-more> -->
				</scroll-view>

			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import json from "@/json.js"
	export default {
		data() {
			return {
				backgroundColor: '#FFFFFF',
				selectTextColor:'#E04B28',
				defaultTextColor:'#333333',
				tabTitleDates: ['选择一', '选择二', '选择三', '选择四'], //导航栏格式 --导航栏组件
				tabBars: [],
				newsList: [],
				scrollViewInfo: "",
				currentPage: 0,
				enableScroll: true
			}
		},
		onLoad() {
			this.loadTabbars();
			setTimeout(() => {
				this.tabBars.forEach((tabBar) => {
					this.newsList.push({
						data: [],
						isLoading: false,
						refreshText: "",
						loadingText: '加载更多...'
					});
				});
				this.loadNewsList(0);
			}, 350)
		},
		methods: {
			//获取分类
			loadTabbars() {
				let tabList = json.mineTabList;
				// tabList.forEach(item => {
				// 	item.newsList = [];
				// 	item.loadMoreStatus = 0; //加载更多 0加载前，1加载中，2没有更多了
				// 	item.refreshing = 0;
				// })
				this.tabBars = tabList;
			},
			//获取新闻列表
			loadNewsList(index) {
				let activeTab = this.newsList[0];
				let list = [];
				for (let i = 0; i < 10; i++) {
					let item = json.newsList[Math.floor(Math.random() * json.newsList.length)];
					list.push(item);
				}
				activeTab.data = activeTab.data.concat(list);
			},


			onTabBarClick(e) {
				console.log(e)
			},
			pageChange(e) {
				console.debug(e)
			},
		}
	}
</script>

<style lang="scss">
	.navBar {
		position: relative;
		height: 54rpx;
		background: #1C2438;
	}

	.scroll-h {
		width: 750rpx;
		height: 80rpx;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;

		/* #endif */
		/* flex-wrap: nowrap; */
		/* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
		.uni-tab-item {
			/* #ifndef APP-PLUS */
			display: inline-block;
			/* #endif */
			flex-wrap: nowrap;
			padding-left: 34rpx;
			padding-right: 34rpx;

			.uni-tab-item-title {
				color: #555;
				font-size: 30rpx;
				height: 80rpx;
				line-height: 80rpx;
				flex-wrap: nowrap;
				/* #ifndef APP-PLUS */
				white-space: nowrap;
				/* #endif */
			}

			.uni-tab-item-title-active {
				color: #007AFF;
			}
		}
	}

	.swiper-box {
		height: 100%;
		margin-top: 40px;
	}

	.panel-scroll-box {
		height: 100%;

		.panel-item {
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}

	/**
	 * 新闻列表 直接拿的nvue样式修改，,
	 * 一共需要修改不到10行代码, 另外px需要直接修改为rpx，只有单位不一样，计算都是一样的
	 * 吐槽：难道不能在编译的时候把nuve中的rpx转为px? 这样就不用修改单位了
	 */
	.video-wrapper {
		width: 100%;
		height: 440rpx;

		.video {
			width: 100%;
		}
	}

	view {
		display: flex;
		flex-direction: column;
	}

	.img {
		width: 100%;
		height: 100%;
	}

	/* 新闻列表  emmm 仅供参考 */
	.news-item {
		position: relative;
		width: 706rpx;
		padding: 24rpx 30rpx;
		border-bottom-width: 1px;
		border-color: #eee;
		background-color: #fff;
	}

	.title {
		font-size: 32rpx;
		color: #303133;
		line-height: 46rpx;
		padding-right: 15rpx;
	}

	.bot {
		flex-direction: row;
	}

	.author {
		font-size: 26rpx;
		color: #aaa;
	}

	.time {
		font-size: 26rpx;
		color: #aaa;
		margin-left: 20rpx;
	}

	.img-list {
		flex-shrink: 0;
		flex-direction: row;
		background-color: #fff;
		width: 220rpx;
		height: 140rpx;
	}

	.img-wrapper {
		flex: 1;
		flex-direction: row;
		height: 140rpx;
		position: relative;
		overflow: hidden;
	}

	.img {
		flex: 1;
	}

	.img-empty {
		height: 20rpx;
	}

	/* 图在左 */
	.img-list1 {
		position: absolute;
		left: 30rpx;
		top: 24rpx;
	}

	.title1 {
		padding-left: 240rpx;
	}

	.bot1 {
		padding-left: 240rpx;

	}

	/* 图在右 */
	.img-list2 {
		position: absolute;
		right: 30rpx;
		top: 24rpx;
	}

	.title2 {
		padding-right: 218rpx;
	}

	.bot2 {
		margin-top: 20rpx;
	}

	/* 底部3图 */
	.img-list3 {
		width: 700rpx;
		margin: 16rpx 0rpx;
	}

	.img-wrapper3 {
		margin-right: 4rpx;
	}

	/* 底部大图 */
	.img-list-single {
		width: 690rpx;
		height: 240rpx;
		margin: 16rpx 0rpx;
	}

	.img-wrapper-single {
		height: 240rpx;
		margin-right: 0rpx;
	}

	.video-tip {
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .3);
	}

	.video-tip-icon {
		width: 60rpx;
		height: 60rpx;
	}
</style>

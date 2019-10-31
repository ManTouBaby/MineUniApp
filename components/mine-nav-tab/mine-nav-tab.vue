<template>
	<view id='mineTabBox' ref="mineTabBox" class="navTabBox" :style="{'backgroundColor':backgroundColor}">
		<!-- 标题数量小于5 -->
		<view :style="{'height':navTabHeight+'px','line-height':isShowUnderLine?(navTabHeight-3)+'px':navTabHeight+'px'}"
		 class="shortTab" v-if="tabTitle.length<=5">
			<!-- 导航栏 -->
			<view class='navTab' :style="{'height':navTabHeight+'px','line-height':isShowUnderLine?(navTabHeight-3)+'px':navTabHeight+'px'}">
				<view v-for="(item,index) in tabTitle" :key="index" class='navTabItem' :style="{'color':index===minetabSelect?selectTextColor:defaultTextColor,'font-size':navTextSize+'px'}"
				 @click='navClick(index)'>{{item}}</view>
			</view>
			<!-- 下划线 -->
			<view v-if="isShowUnderLine" class="underlineBox" :style='"transform:translateX("+isLeft+"px);width:"+isWidth+"px"'>
				<view class="underline" :style="{'backgroundColor':selectTextColor}"></view>
			</view>
		</view>
		<!-- 标题数量大于5 开启长导航栏模式 -->
		<view :style="{'height':navTabHeight+'px','line-height':isShowUnderLine?(navTabHeight-4)+'px':navTabHeight+'px'}"
		 class="longTab" v-if="tabTitle.length>5">
			<scroll-view class="uni-scroll-view" :show-scrollbar="false" scroll-x="true" style="white-space: nowrap; display: flex"
			 scroll-with-animation :scroll-into-view="toView">
				<view class="longItem" :data-index="index" :style="{'color':index===minetabSelect?selectTextColor:defaultTextColor,'font-size':navTextSize+'px'}"
				 v-for="(item,index) in tabTitle" :key="index" :id="'id'+index" @click="longClick(index)">{{item}}</view>
				<view v-if="isShowUnderLine" class="underlineBox" :style='"transform:translateX("+isLeft+"px);"'>
					<view class="underline" :style="{'backgroundColor':selectTextColor}"></view>
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	export default {
		name: 'navTab',
		props: {
			backgroundColor: {
				type: String,
				default: '#007AFF'
			},
			selectTextColor: {
				type: String,
				default: '#FFFFFF'
			},
			defaultTextColor: {
				type: String,
				default: '#e4e4e4'
			},
			isShowUnderLine: {
				type: [String, Boolean],
				default: true
			},
			navTabWidth:{
				type:[Number],
				default:0
			},
			navTabHeight:{
				type: Number,
				default: 40
			},
			navTextSize: {
				type: Number,
				default: 13
			},
			tabTitle: {
				type: Array,
				value: []
			},
			tabSelect: {
				type: Number,
				default: 0
			}

		},
		data() {
			return {
				minetabSelect: 0, //导航栏被点击
				isLeft: 0, //导航栏下划线位置
				isWidth: 0, //每个导航栏占位
				toView: '',
				isLongWidth: 0
			};
		},
		created() {
			var that = this
			// 获取设备宽度
			uni.getSystemInfo({
				success(e) {
					that.isWidth = e.windowWidth / that.tabTitle.length //宽度除以导航标题个数=一个导航所占宽度
					that.isLongWidth = e.windowWidth / that.tabTitle.length 
					console.log(e)
				}
			})
			// that.isWidth = this.$refs.navTabBox.offsetWidth;

			this.toView = 'id0'
		},
		mounted() {
			if(this.navTabWidth!=0){
				this.isLongWidth = this.navTabWidth / this.tabTitle.length
				this.isWidth = this.navTabWidth / this.tabTitle.length;
			}
			
			uni.createSelectorQuery().select("#mineTabBox").fields({  
			    size: true,  
			}, (data) => {  
			    console.log(data);  
			}).exec();
			
			// console.log(this)
		},
		methods: {
			// 导航栏点击
			navClick(index) {
				// this.$parent.currentTab = index 
				this.minetabSelect = index //设置导航点击了哪一个
				this.isLeft = index * this.isWidth //设置下划线位置
				this.$emit('changeTab', index); //设置swiper的第几页
			},
			longClick(index) {
				var tempIndex = index - 2
				tempIndex = tempIndex <= 0 ? 0 : tempIndex
				this.toView = `id${tempIndex}` //动画滚动,滚动至中心位置
				this.minetabSelect = index //设置导航点击了哪一个
				this.isLeft = index * this.isLongWidth //设置下划线位置
				this.$emit('changeTab', index); //设置swiper的第几页
				// this.$parent.currentTab = index //设置swiper的第几页
			}
		},
		watch: {
			minetabSelect() {
				this.isLeft = this.minetabSelect * this.isLongWidth //设置下划线位置
				// this.tabSelect = this.minetabSelect;
			},
			tabSelect(e) {
				var tempIndex = e - 2
				tempIndex = tempIndex <= 0 ? 0 : tempIndex
				this.toView = `id${tempIndex}` //动画滚动,滚动至中心位置
				this.minetabSelect = e; //
			}
		}
	}
</script>

<style lang="scss">
	.navTabBox {
		width: 100%;

		.longTab {
			width: 100%;

			.longItem {
				width: 20vw;
				display: inline-block;
				text-align: center;
			}

			.uni-scroll-view::-webkit-scrollbar {
				display: none;
				width: 0 !important;
				height: 0 !important;
				-webkit-appearance: none;
				background: transparent;
			}

			.underlineBox {
				height: 3px;
				width: 20%;
				display: flex;
				align-content: center;
				justify-content: center;
				transition: .5s;

				.underline {
					width: 84upx;
					height: 4px;
				}
			}
		}

		.shortTab {
			width: 100%;

			.navTab {
				display: flex;
				width: 100%;
				position: relative;

				.navTabItem {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
				}
			}

			.underlineBox {
				height: 3px;
				display: flex;
				align-content: center;
				justify-content: center;
				transition: .5s;

				.underline {
					width: 84upx;
					height: 3px;
					// background-color: #4CD964;
				}
			}
		}
	}
</style>

<template>
    <scroll-view scroll-y
    @scrolltolower='handleToLower'
    class="recommend_scroll_view"
    v-if="recommends.length>0">
        <!-- 上方推荐4张图片 -->
        <view class="recommend_wrap">
            <navigator 
            v-for="item in recommends" :key="item.id"
            class="recommend_item"
            :url="`/pages/album/index?id=${item.target}`">
                <image mode="widthFix" :src="item.thumb" />
            </navigator>
        </view>
        <!-- 月份时间  -->
        <view class="months_wrap">
            <view class="months_title">
                <wiew class="months_title_info">
                    <text>{{months.DD}}/</text>
                    {{months.MM}}月
                </wiew>
                <wiew class="months_title_text">{{months.title}}</wiew>
                <wiew  class="months_title_more">更多></wiew>
            </view>
            <view class="months_content">
                <view class="months_item" 
                v-for="(item, index) in months.items" :key="item.id">
                    <go-detail :list="months.items" :index="index">
                        <image mode="aspectFill"
                        :src="item.img+item.rule.replace('$<Height>',360)" />
                    </go-detail>
                </view>
            </view>
        </view>
        <!-- 热门 开始 -->
        <view class="hots_wrap">
            <view class="hots_title">
                <text> 热门 </text>
            </view>
            <view class="hots_content">
                <view
                class="hot_item"
                v-for="(item,index) in hots"
                :key="item.id">
                    <go-detail :list="hots" :index="index">
                        <image mode="widthFix"
                        :src="item.thumb"/>
                    </go-detail>
                </view>
            </view>
        </view>
    </scroll-view>
</template>

<script>
import moment from 'moment'
import GoDetail from '@/components/goDetail/GoDetail'


export default {
    components: {GoDetail},
    data() {
        return {
            recommends: [],
            months: [],
            hots:[],
            params: {
                // 要获取几条
                limit: 30,
                // 关键字
                order: "hot",
                // 要跳过几条
                skip: 0
            },
            // 是否还有下一页
            hasMore: true
        }
    },
    mounted() {
        this.getList()
        //修改顶端标题
        uni.setNavigationBarTitle({title: "推荐"})
    },
    methods: {
        getList() {
            this.request({
                url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
                data: this.params
            }).then(res => {
                //判断还有没有数据
                if(res.res.vertical.length === 0) {
                    this.hasMore = false
                    uni.showToast({
                        title: "没有更多了",
                        icon: "none"
                    })
                    return
                }


                if(this.recommends.length === 0){
                    //第一次获取数据
                    this.recommends = res.res.homepage[1].items
                    //月份数据
                    this.months = res.res.homepage[2]
                    this.months.MM = moment(this.months.stime).format('MM')
                    this.months.DD = moment(this.months.stime).format('DD')
                }

                //热门列表
                this.hots = [...this.hots, ...res.res.vertical]

            })
        },
        handleToLower() {
            if(this.hasMore) {
                this.params.skip += this.params.limit
                this.getList()
            }else{
                uni.showToast({
                    title: "没有更多了",
                    icon: "none"
                })
            }
        }
    }
}
</script>

<style lang='scss'>
.recommend_scroll_view {
  // 屏幕的高度 -  头部标题的高度
  height: calc(100vh - 36px);
}
.recommend_wrap {
    display: flex;
    flex-wrap: wrap;
    .recommend_item {
        width: 50%;
        border: 5rpx solid #fff;
    }
}
.months_wrap {
  .months_title {
      display: flex;
      padding: 20rpx 0;
      font-size: 32rpx;
      font-weight: 600;
    .months_title_info {
        width: 23%;
        color: $color;
        text {
            font-size: 38rpx;
        }
    }
    .months_title_text {
        flex: 1;
        font-size: 36rpx;
        color: #666;
    }

    .months_title_more {
        width: 13%;
        color: $color;
    }
  }
  .months_content {
      display: flex;
      flex-wrap: wrap;
      .months_item {
          width: 33.3%;
          border: 5rpx solid #fff;
      }
  }
}
.hots_wrap {
  .hots_title {
    padding: 20rpx;
    text {
      border-left: 20rpx solid $color;
      padding-left: 20rpx;
      font-size: 34rpx;
      font-weight: 600;
    }
  }

  .hots_content {
    display: flex;
    flex-wrap: wrap;
    .hot_item {
      width: 33.33%;
      border: 5rpx solid #fff;
      image {
      }
    }
  }
}
</style>
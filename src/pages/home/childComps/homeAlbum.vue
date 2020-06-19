<template>
    <scroll-view scroll-y
    @scrolltolower='handleToLower'
    class="album_scroll_view">
        <!-- 轮播图 -->
        <view class="album_swiper">
            <swiper 
            indicator-dots
            circular
            autoplay>
                <swiper-item v-for="(item, index) in banner" :key="index">
                    <image :src="item.thumb" />
                </swiper-item>
            </swiper>
        </view>
        <!-- 列表 开始 -->
        <view class="album_list">
            <navigator class="album_item"
            v-for="item in album" :key="item.id"
            url='pages/album/index'>
                <view class="album_img">
                    <image
                        mode="aspectFill"
                        :src="item.cover"
                    ></image>
                </view>
                <view class="album_info">
                    <view class="album_name">{{item.name}}</view>
                    <view class="album_desc">{{item.desc}}</view>
                    <view class="album_btn">
                        <view class="album_attention">关注</view>
                    </view>
                </view>
            </navigator>
        </view>

    </scroll-view>
</template>

<script>

export default {
    data() {
        return {
            params: {
                // 要获取几条
                limit: 30,
                // 关键字
                order: "new",
                // 要跳过几条
                skip: 0
            },
            album: [],
            banner: [],
            hasMore: true
        }
    },
    mounted() {
        this.getList()
        uni.setNavigationBarTitle({title: "专辑"})
    },
    methods: {
        getList() {
            this.request({
                url:"http://157.122.54.189:9088/image/v1/wallpaper/album",
                data: this.params
            }).then(result => {
                //判断还有没有数据
                if(result.res.album.length === 0) {
                    this.hasMore = false
                    uni.showToast({
                        title: "没有更多了",
                        icon: "none"
                    })
                    return
                }
                
                //判断是否第一次获取数据
                if(this.banner.length === 0) {
                    this.banner = result.res.banner
                }
                this.album = [...this.album,...result.res.album]
            })
        },
        handleToLower() {
            if(this.hasMore) {
                this.params.skip += this.params.limit
                this.getList()
                console.log("触底")
            }else{
                uni.showToast({
                    title: "没有更多了",
                    icon: "none"
                })
            }
        }
    },
}
</script>

<style scoped lang='scss'>
.album_scroll_view {
    height: calc(100vh - 36px);
}
.album_swiper {
    swiper{
        height: 332rpx;
        image {
            height: 100%;
        }
    }
}

.album_list {
  padding: 10rpx;
  .album_item {
    padding: 10rpx 0;
    display: flex;
    border-bottom: 1rpx solid #ccc;
    .album_img {
      flex: 1;
      padding: 10rpx;
      image {
        width: 200rpx;
        height: 200rpx;
      }
    }

    .album_info {
      flex: 2;
      padding: 0 10rpx;
      overflow: hidden;
      .album_name {
        font-size: 31rpx;
        color: #000;
        padding: 10rpx 0;
      }

      .album_desc {
        padding: 10rpx 0;
        font-size: 25rpx;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .album_btn {
        padding: 10rpx;
        margin-top: 10rpx;
        display: flex;
        justify-content: flex-end;
        .album_attention {
          color: $color;
          border: 1rpx solid $color;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>
<template>
    <view>
        <!-- 作者信息 开始 -->
        <view class="user_info" v-if="imgDetail.user">
            <view class="user_icon">
                <image :src="imgDetail.user.avatar" mode="widthFix"/>
            </view>
            <view class="user_desc">
                <view class="user_name">{{imgDetail.user.name}}</view>
                <view class="user_time">{{imgDetail.cnTime}}</view>
            </view>
        </view>
        <!-- 作者信息 结束 -->
        <!-- 大图 开始 -->
        <view class="high_img">
            <image mode="widthFix" :src="imgDetail.thumb"/>
        </view>
        <!-- 大图 结束 -->
        <!-- 点赞收藏 开始 -->
        <view class="img_rank">
            <view class="rank">
                <text class="iconfont icondianzan">{{imgDetail.rank}}</text>
            </view>
            <view class="collect">
                <text class="iconfont iconshoucang">收藏</text>
            </view>
        </view>
        <!-- 点赞收藏 结束 -->
        <!-- 专辑相关 开始 -->
        <view class="album_wrap" v-if="album.length">
            <view class="album_title">相关</view>
            <view class="album_list">
                <view class="album_item" v-for="item in album" :key="item.id">
                    <view class="album_cover">
                        <image :src="item.cover" mode="aspectFill"/>
                    </view>
                    <view class="album_info">
                        <view class="album_info_text">专辑</view>
                        <view class="album_name">{{item.name}}</view>
                        <text class="iconfont iconiconfontjiantou4"></text>

                    </view>
                </view>
            </view>
        </view>
        <!-- 专辑相关 结束 -->
        <!-- 最热评论 comment hot -->
        <view
        class="comment hot"
        v-if="hot.length"
        >
            <view class="comment_title">
                <text class="iconfont iconhot1"></text>
                <text class="comment_text">最热评论</text>
            </view>
            <comments-list :comments = 'hot' />
        </view>
        <!-- 最热评论 comment hot 结束 -->
        <!-- 最新评论 comment new -->
        <view
        class="comment new"
        v-if="comment.length"
        >
            <view class="comment_title">
                <text class="iconfont iconpinglun"></text>
                <text class="comment_text">最新评论</text>
            </view>
            <comments-list :comments = 'comment' />
        </view>

    </view>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')

import CommentsList from './commentsList/CommentsList'
export default {
    data() {
        return {
            //图片信息
            imgDetail: {},
            // 专辑数据 数组
            album: [],
            // 最热评论
            hot: [],
            // 最新评论
            comment: [],
                }
    },
    components: {CommentsList},
    onLoad() {
        const {imgList,imgIndex} = getApp().globalData
        this.imgDetail = imgList[imgIndex]
        console.log(this.imgDetail)
        //获取图片距今数据
        this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow()

        //获取专辑相关信息
        this.getComment(this.imgDetail.id)
    },
    methods: {
        getComment(id) {
            this.request({
                url:`http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
            }).then(result => {
                console.log(result)
                this.album = result.res.album

                // 给数组中的对象添加一个时间属性 xxx月前
                result.res.hot.forEach(
                    v => (v.cnTime = moment(v.atime * 1000).fromNow())
                );
                result.res.comment.forEach(
                    v => (v.cnTime = moment(v.atime * 1000).fromNow())
                );

                this.hot = result.res.hot
                this.comment = result.res.comment
            })
        }
    }

}
</script>

<style scoped lang='scss'>
.user_info {
    padding: 20rpx;
    display: flex;
  .user_icon {
      padding: 0 20rpx;
    image {
        width: 88rpx;
        border-radius: 50%;
    }
  }

  .user_desc {
    .user_name {
        color: #000;
        font-weight: 600;
        padding: 8rpx 0;
    }

    .user_time {
        color: #ccc;
        font-size: 24rpx;
    }
  }
}

.img_rank {
    display: flex;
    height: 80rpx;
    border-bottom: 5rpx solid #eee;
  .rank {
        display: flex;
        justify-content: center;
        align-items: center;

        flex: 1;
    .iconfont {}
  }

  .collect {
        display: flex;
        justify-content: center;
        align-items: center;

        flex: 1;
    .iconfont {}
  }
}

.album_wrap {
  padding: 20rpx;
  .album_title {
    padding: 10rpx 0;
  }

  .album_list {
    .album_item {
      display: flex;
      padding: 10rpx 0;
      border-bottom: 10rpx solid #eee;
      .album_cover {
        flex: 1;
        image {
          width: 180rpx;
          height: 180rpx;
        }
      }

      .album_info {
        flex: 3;
        padding-left: 20rpx;
        position: relative;
        .album_info_text {
          width: 100rpx;
          height: 50rpx;
          background-color: $color;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .album_name {
          padding: 10rpx 0;
          color: #888;
        }
        .iconfont {
          font-size: 40rpx;
          position: absolute;
          top: 50%;
          // css3 变换 转换
          transform: translateY(-50%);
          right: 10%;
          color: #000;
        }
      }
    }
  }
}

// 最热评论
.comment {
  .comment_title {
    padding: 15rpx;
    .iconfont {
      color: red;
      font-size: 40rpx;
    }

    .comment_text {
      font-weight: 600;
      font-size: 28rpx;
      color: #666;
      margin-left: 10rpx;
    }
  }
}

// 最新评论
.new {
  .iconpinglun {
    color: aqua !important;
  }
}
</style>
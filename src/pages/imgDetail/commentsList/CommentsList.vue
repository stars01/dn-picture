<!--  -->
<template>
    <view class="comment_list">
        <view class="comment_item"
        v-for="item in comments"
        :key="item.id">
            <!-- 用户信息 -->
            <view class="comment_user">
                <!-- 用户头像 -->
                <view class="user_icon">
                    <image mode="widthFix" :src="item.user.avatar">
                    </image>
                </view>
                <!-- 用户名称 -->
                <view class="user_name">
                    <view class="user_nickname">{{item.user.name}}</view>
                    <view class="user_time">{{item.cnTime}}</view>
                </view>
                <!-- 用户徽章 -->
                <view class="user_badge">
                <image
                    v-for=" item2 in  item.user.title"
                    :key="item2.icon"
                    :src="item2.icon"
                ></image>
                </view>
            </view>
          <!-- 评论数据 -->
            <view class="comment_desc">
                <view class="comment_content">{{item.content}}</view>
                <view class="comment_like">
                    <text class="iconfont icondianzan">{{item.size}}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')

export default {
    props:{
        comments: Array
    },
    data() {
//这里存放数据
        return {};
    },
    methods: {

    },
    created() {
        
    }

}
</script>

<style scoped lang='scss'>
  .comment_list {
    .comment_item {
      border-bottom: 15rpx solid #eee;
      padding: 0 20rpx;
      // 用户信息
      .comment_user {
        display: flex;
        padding: 20rpx 0;
        .user_icon {
          width: 15%;
          display: flex;
          justify-content: center;
          align-items: center;
          image {
            width: 90%;
          }
        }

        .user_name {
          flex: 1;
          .user_nickname {
            color: #777;
          }

          .user_time {
            color: #ccc;
            font-size: 24rpx;
            padding: 5rpx;
          }
        }

        .user_badge {
          image {
            width: 40rpx;
            height: 40rpx;
            display: inline-block;
          }
        }
      }
      // 评论数据
      .comment_desc {
        display: flex;
        padding: 30rpx 0;
        .comment_content {
          flex: 1;
          padding-left: 15%;
          color: #000;
        }

        .comment_like {
          text-align: right;
          .icondianzan {
          }
        }
      }
    }
  }
</style>
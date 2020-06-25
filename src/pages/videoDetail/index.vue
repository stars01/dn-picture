<template>
    <view class="video_detail">
        <!-- 背景图 -->
        <image :src="videoItem.img" />

        <!-- 工具栏 开始 -->
        <view class="video_tool">
            <view @click="handleMuted" :class="['iconfont',muted?'iconjingyin':'iconshengyin']"></view>
            <view class="iconfont iconzhuanfa">
                <button open-type="share"></button>
            </view>
        </view>
        <!-- 工具栏 结束 -->
        <!-- 视频 开始 -->
        <view class="video_wrap">
            <video objectFit="cover" :src="videoItem.video"
            :muted="muted"></video>
        </view>
        <!-- 视频 结束 -->
        <!-- 下载 开始 -->
        <view class="download">
            <view class="download_btn" @click="handleDownload">下载高清</view>
        </view>
        <!-- 下载 结束 -->
    </view>
</template>

<script>
export default {
    data() {
        return {
            videoItem: {},
            // 是否静音
            muted: false
        };
    },
    onLoad() {
        this.videoItem = getApp().globalData.video;
    },
    methods: {
        // 开关声音
        handleMuted() {
            this.muted = !this.muted;
        },
        // 下载视频
        async handleDownload() {
            // uni.downloadFile 缓存到小程序
            // uni.saveVideoToPhotosAlbum 将视频从小程序下载到本地

            await uni.showLoading({
                title: "下载中"
            });

            // 1 将远程文件下载到小程序的内存中 tempFilePath
            // const result1 = await uni.downloadFile({ url: this.imgDetail.img });
            // const { tempFilePath } = result1[1];
            const { tempFilePath } = (
                await uni.downloadFile({ url: this.videoItem.video })
            )[1];

            //  2 将小程序内存中的临时文件下载到本地上
            await uni.saveVideoToPhotosAlbum({ filePath: tempFilePath });
            // console.log(result2);
            // 3 提示用户下载成功

            uni.hideLoading(); //取消下载中 弹窗
            await uni.showToast({
                title: "下载成功"
                // icon
            });
        }
    }
};
</script>

<style scoped lang='scss'>
.video_detail {
    position: relative;
    image {
        position: absolute;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        // css3 滤镜
        filter: blur(20px);
    }

    .video_tool {
        height: 80rpx;
        display: flex;
        justify-content: flex-end;
        .iconfont {
            width: 80rpx;
            color: #fff;
            font-size: 50rpx;
            border-radius: 40rpx;
            background-color: rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20rpx;
        }
        .iconzhuanfa {
            position: relative;
            button {
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
            }
        }
    }

    .video_wrap {
        display: flex;
        justify-content: center;
        video {
            width: 350rpx;
            height: 600rpx;
        }
    }

    .download {
        display: flex;
        justify-content: center;
        margin-top: 30rpx;
        .download_btn {
            width: 360rpx;
            height: 80rpx;
            border-radius: 40rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            border: 1rpx solid #fff;
            background-color: rgba(0, 0, 0, 0.6);
        }
    }
}
</style>
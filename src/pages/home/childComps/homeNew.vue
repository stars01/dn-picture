<template>
    <scroll-view
    scroll-y enable-flex
    @scrolltolower="getList"
    class="news_content">
        <view class="new_item" 
        v-for="(item,index) in news" :key="item.id">
            <go-detail :list="news" :index="index">
                <image mode="widthFix" :src="item.thumb" />
            </go-detail>
        </view>
    </scroll-view>
</template>

<script>
import GoDetail from '@/components/goDetail/GoDetail'

export default {
    components: {GoDetail},
    data() {
        return {
            news: [],
            params: {
                // 要获取几条
                limit: 30,
                // 关键字
                order: "new",
                // 要跳过几条
                skip: 0
            }
        };
    },
    mounted() {
        uni.setNavigationBarTitle({ title: "最新" });
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            this.request({
                url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
                data: this.params
            }).then(result => {
                //判断还有没有数据
                if (result.res.vertical.length === 0) {
                    uni.showToast({
                        title: "没有更多数据了",
                        icon: "none"
                    });
                    return;
                }
                // console.log(result)
                this.news = [...this.news, ...result.res.vertical];
                // console.log(this.imgList[index].list)
                //调用一次跳30张
                this.params.skip += 30;
            });
        }
    }
};
</script>

<style scoped lang='scss'>
.news_content {
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    .new_item {
        width: 33.3%;
        border: 5rpx solid #fff;
    }
}
</style>
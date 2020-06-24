<template>
    <scroll-view
    scroll-y enable-flex
    @scrolltolower="getList"
    class="main_content">
        <view class="main_item" 
        v-for="(item,index) in mainList" :key="item.id">
            <image mode="widthFix" :src="item.img" />
        </view>
    </scroll-view>
</template>

<script>

export default {
    props: {
        urlObj: Object
    },
    data() {
        return {
            mainList: []
        }
    },
    mounted() {
        console.log(this.urlObj)
        this.getList()
    },
    watch: {
        urlObj() {
            this.mainList = []
            this.getList()
        }
    },
    methods: {
        getList() {
            this.request({
                url: this.urlObj.url,
                data: this.urlObj.params
            }).then(result => {
                //判断还有没有数据
                if (result.res.videowp.length === 0) {
                    uni.showToast({
                        title: "没有更多数据了",
                        icon: "none"
                    });
                    return;
                }
                console.log(result)
                this.mainList = [...this.mainList, ...result.res.videowp];
                this.urlObj.params.skip += 30;
            });
        }
    }
}
</script>

<style scoped lang='scss'>
.main_content {
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    .main_item {
        width: 33.3%;
        border: 5rpx solid #fff;
    }
}
</style>
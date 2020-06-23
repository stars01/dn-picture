<template>
    <view class="home_category">
        <navigator class="category_item" v-for="(item, index) in category" :key="item.id"
        :url="`/pages/imgCategory/index?id=${item.id}`">
            <image :src="item.cover" mode="aspectFill" />
            <view class="name">{{item.name}}</view>
        </navigator>
    </view>
</template>

<script>
export default {
    data() {
        return {
            category: []
        };
    },
    mounted() {
        uni.setNavigationBarTitle({ title: "分类" });

        this.getList();
    },
    methods: {
        getList() {
            this.request({
                url: "http://157.122.54.189:9088/image/v1/vertical/category"
            }).then(reslut => {
                console.log(reslut);
                this.category = reslut.res.category;
            });
        }
    }
};
</script>

<style scoped lang='scss'>
.home_category {
    display: flex;
    flex-wrap: wrap;
    .category_item {
        width: 33.3%;
        border: 5rpx solid #fff;
        position: relative;
        image {
            height: 240rpx;
        }

        .name {
            position: absolute;
            width: 100%;
            height: 50rpx;
            left: 0;
            bottom: 0;
            color: #fff;
            // css3 渐变
            background-image: linear-gradient(to right top,rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0));
            font-size: 40rpx;
            display: flex;
            align-items: center;
            padding-left: 20rpx;
        }
    }
}
</style>
<!--  -->
<template>
    <view class="category_tab">
        <view class="category_tab_title">
            <view class="title_inner">
                <uni-segmented-control
                    :current="current"
                    :values="items.map(v => v.title)"
                    @clickItem="onClickItem"
                    style-type="text"
                    active-color="#d4237a"
                ></uni-segmented-control>
            </view>
            <view class="iconfont iconsearch"></view>
        </view>
        <scroll-view
            scroll-y
            enable-flex
            @scrolltolower="getList(current)"
            class="category_tab_content"
        >
            <view
                class="category_tab_item"
                v-for="(item, index) in imgList[current].list"
                :key="item.id"
            >
                <go-detail :list="imgList[current].list" :index="index">
                    <image mode="widthFix" :src="item.thumb" />
                </go-detail>
                
            </view>
        </scroll-view>
    </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";

import GoDetail from '@/components/goDetail/GoDetail'

export default {
    components: {
        uniSegmentedControl,
        GoDetail
    },
    data() {
        return {
            items: [{ title: "最新" }, { title: "热门" }],
            current: 0,
            id: 0,
            imgList: [
                //最新的数据
                {
                    params: { limit: 30, order: "new", skip: 0 },
                    list: []
                },
                //热门的数据
                {
                    params: { limit: 30, order: "hot", skip: 0 },
                    list: []
                }
            ]
        };
    },
    onLoad(options) {
        this.id = options.id;
        // this.getList(this.current)
        this.getList(0);
        this.getList(1);
    },
    methods: {
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }
        },
        getList(index) {
            this.request({
                url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
                data: this.imgList[index].params
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
                this.imgList[index].list = [...this.imgList[index].list,...result.res.vertical];
                // console.log(this.imgList[index].list)
                //调用一次跳30张
                this.imgList[index].params.skip += 30;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.category_tab {
    .category_tab_title {
        position: relative;
        .title_inner {
            width: 60%;
            margin: 0 auto;
        }
        .iconfont {
            position: absolute;
            top: 50%;
            right: 5%;
            transform: translateY(-50%);
        }
    }
}
.category_tab_content {
    display: flex;
    flex-wrap: wrap;

    height: calc(100vh - 36px);
    .category_tab_item {
        width: 33.3%;
        border: 5rpx solid #fff;
    }
}
</style>
<!--  -->
<template>
    <view class="home_tab">
        <view class="home_tab_title">
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
        <view class="home_tab_content">
            <view v-if="current === 0">
                <home-recommend></home-recommend>
            </view>
            <view v-if="current === 1">
                <home-category></home-category>
            </view>
            <view v-if="current === 2">
                <home-new></home-new>
            </view>
            <view v-if="current === 3">
                <home-album></home-album>
            </view>
        </view>
    </view>
</template>

<script>
import homeRecommend from './childComps/homeRecommend'
import homeCategory from './childComps/homeCategory'
import homeNew from './childComps/homeNew'
import homeAlbum from './childComps/homeAlbum'

import {uniSegmentedControl} from '@dcloudio/uni-ui'
export default {
    components: {
        homeRecommend,
        homeCategory,
        homeNew,
        homeAlbum,
        uniSegmentedControl 
    },
    data() {
        return {
            items: [
                {title: '推荐'},
                {title: '分类'},
                {title: '最新'},
                {title: '专辑'},
            ],
            current: 0
        }
    },
    methods: {
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }
        }
    },
    onLoad() {
        this.request({
            url: "http://157.122.54.189:9088/image/v3/homepage/vertical"
        })
    }

}
</script>

<style lang="scss">
.home_tab {
    .home_tab_title {
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
</style>
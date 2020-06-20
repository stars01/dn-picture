<!-- 收集图片列表信息，挂载到全局 -->
<template>
    <view @click="handleClick">
        <slot></slot>
    </view>
</template>

<script>

export default {
    props: {
        list: Array,
        index: Number
    },
    components: {},
    methods: {
        handleClick() {
            // 1 将数据缓存下拉,挂载起来
            getApp().globalData.imgList=this.list
            getApp().globalData.imgIndex = this.index

            // 2 再实现点击跳转页面
            uni.navigateTo({
                url:"/pages/imgDetail/index"
            })
        }
    },
}
</script>

<style scoped>

</style>
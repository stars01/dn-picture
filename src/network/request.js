export default (params) => {

    //加载中弹窗
    uni.showLoading({
        title: "加载中"
    })


    return new Promise((resolve,reject) => {
        wx.request({
            ...params,
            success(res){
                resolve(res)
            },
            fail(err){
                reject(err)
            },
            complete(){//无论请求成功还是失败都会执行
                uni.hideLoading()//取消显示的加载中，弹窗
            }
        })
    })
}
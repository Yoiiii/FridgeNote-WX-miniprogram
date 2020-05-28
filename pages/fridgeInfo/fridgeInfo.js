// pages/fridgeInfo/fridgeInfo.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        active: 'fridgeInfo',
    },
    onLoad: function(options) {

    },
    onShow: function() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                active: this.data.active
            })
        }
    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    }
})
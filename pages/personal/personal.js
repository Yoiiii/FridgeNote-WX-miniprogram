// pages/personal/personal.js
Page({
    data: {
        active: 'personal', 
    },
    onLoad: function (options) {

    },
    onShow: function () {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                active: this.data.active
            })
        }
    },
})
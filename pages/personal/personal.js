// pages/personal/personal.js
const app = getApp();
const $http = app.globalData.http;
Page({
    data: {
        active: 'personal',
        userInfo: null,
        addFridge: false
    },
    onLoad: function (options) {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo
            })
        } else {
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: app.globalData.userInfo
                })
                console.log(this.data.userInfo);
            }
        }
    },
    onShow: function () {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                active: this.data.active
            })
        }
    },
    addfridge() {
        this.setData({ addFridge: true })
    }
})
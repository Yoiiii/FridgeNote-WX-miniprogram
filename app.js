//app.js
import http from "./utils/api.js"
App({
    onLaunch: function() {
        // 登录
        wx.login({
            success: async res => {
                //const { token,id }=await http.login({code:res.code})// 发送 res.code 到后台换取 openId, sessionKey, unionId;
                const {data}=await http.login({code:res.code})
                wx.setStorageSync('token', data.token)
                this.globalData.id=data.id
                console.log("this.globalData.id",this.globalData.id); 
                if (this.userIdReadyCallback) {
                    this.userIdReadyCallback(res)
                }
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo//nikeName,avatarUrl
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        http,
        id:null
    }
})
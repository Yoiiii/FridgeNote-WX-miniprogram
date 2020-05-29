// pages/fridgeInfo/fridgeInfo.js
const app = getApp();
const $http = app.globalData.http;
Page({
    data: {
        active: 'fridgeInfo',
        hasFridge:true,
        addFridge:false,
    },
    onLoad: function(options) {
        this.getfridgelist()
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

    },
    //获取冰箱列表
    async getfridgelist(){
        const params = {data: app.globalData.id}
           const { data } = await $http.getfridgelist(params)
           console.log(data);
           if (data.length!=0){
             console.log('成功');
           }else{
            this.setData({ hasFridge: false });
           }
        },
        openAddFridge(){
            console.log('666');
            this.setData({ addFridge: true });
        },
        closeAddFridge(){
            this.setData({ addFridge: false });
        }
    
})
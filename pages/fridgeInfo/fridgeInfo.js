// pages/fridgeInfo/fridgeInfo.js
const app = getApp();
const $http = app.globalData.http;
Page({
    data: {
        active: 'fridgeInfo',
        hasFridge: false,
        addFridge: false,
        fridgeChange: false,
        addFridgeloading: false,
        fridgeList:[],
        fridge: {
            id: "",
            name: "我的冰箱",
            cold: [],
            freeze: []
        },
        tabActive:0
    },
    onLoad: function (options) {
        if (app.globalData.id) {
            this.getfridgelist()
        } else {
            app.userIdReadyCallback = res => {
                this.getfridgelist()
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
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    },
    //获取冰箱列表
    async getfridgelist() {
        const params = { id: app.globalData.id }
        const { data } = await $http.getfridgelist(params)
        if (data.length != 0) {
            this.setData({ hasFridge: true });
            console.log("this.data.fridgeList11",this.data.fridgeList);
            this.setData({fridgeList:data})
            console.log("this.data.fridgeList",this.data.fridgeList);
            
        } else {
            this.setData({ hasFridge: false });
        }
    },
    openAddFridge() {
        this.setData({ addFridge: true });
    },
    closeAddFridge() {
        this.setData({ addFridge: false });
    },
    async addFridge(e) {
        const res = await $http.addfridge(e.detail)
        console.log(res);
        if(res.data){
            Notify({ type: 'success', message:"添加成功" });
            this.setData({
                addFridgeloading: false,
                addFridge: false,
            })
            this.getfridgelist()
        }else{
            this.setData({
                addFridgeloading: false,
            })
        }

    },
    openfridgeChange() {
        this.setData({ fridgeChange: true });
    },
    closefridgeChange() {
        this.setData({ fridgeChange: false });
    },
    fridgeChange() {

    },
    addGoods() {

    }

})
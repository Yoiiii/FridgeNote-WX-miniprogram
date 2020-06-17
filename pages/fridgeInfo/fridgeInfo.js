// pages/fridgeInfo/fridgeInfo.js
const app = getApp();
const $http = app.globalData.http;
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify'
Page({
    data: {
        active: 'fridgeInfo',
        hasFridge: false,
        addFridge: false,
        fridgeChange: false,
        addFridgeloading: false,
        addGoods: false,
        loading: true,
        fridgeList: [],
        fridge: {
            id: "",
            name: "我的冰箱",
            cold: [],
            freeze: []
        },
        tabActive: 0
    },
    onLoad: async function (options) {
        if (app.globalData.id) {
            await this.getfridgelist()
            if (this.data.hasFridge) {
                this.setData({
                    "fridge.id": this.data.fridgeList[0]._id,
                    "fridge.name": this.data.fridgeList[0].name
                })
                app.globalData.fridgeId=this.data.fridgeList[0]._id
                this.getGoodsList()
            }
        } else {
            app.userIdReadyCallback = async res => {
                await this.getfridgelist()
                if (this.data.hasFridge) {
                    this.setData({
                        "fridge.id": this.data.fridgeList[0]._id,
                        "fridge.name": this.data.fridgeList[0].name
                    })
                    app.globalData.fridgeId=this.data.fridgeList[0]._id
                    this.getGoodsList()
                }
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
    overLoading() {
        this.setData({ loading: false })
    },
    //获取冰箱列表
    async getfridgelist() {
        const params = { id: app.globalData.id }
        const { data } = await $http.getfridgelist(params)
        if (data.length != 0) {
            this.setData({
                hasFridge: true,
                fridgeList: data
            });
            this.overLoading()
        } else {
            this.setData({ hasFridge: false });
        }
    },
    async getGoodsList() {
        const params = { id: this.data.fridge.id }
        const { data } = await $http.getgoodslist(params)
        console.log(data);
    },
    openAddFridge() {
        this.setData({ addFridge: true });
    },
    closeAddFridge() {
        this.setData({ addFridge: false });
    },
    addFridge(e) {
        if (e.detail) {
            Notify({ type: 'success', message: "添加成功" });
            this.setData({
                addFridge: false,
            })
            this.getfridgelist()
        } else {
            Notify({ type: 'danger', message: "添加失败" });
        }
    },
    openfridgeChange() {
        this.setData({ fridgeChange: true });
    },
    closefridgeChange() {
        this.setData({ fridgeChange: false });
    },
    fridgeChange(e) {
        //console.log("e",e.detail);
        this.setData({
            "fridge.id": this.data.fridgeList[e.detail]._id,
            "fridge.name": this.data.fridgeList[e.detail].name,
            fridgeChange: false
        })
        this.getGoodsList()
    },
    openaddGoods() {
        if (this.data.fridgeList.length == 0) {
            this.setData({ addFridge: true })
        } else {
            this.setData({ addGoods: true })
        }
    },
    closeaddGoods() {
        this.setData({
            addGoods: false
        })
    },
    addGoods(e) {
        if (e.detail) {
            Notify({ type: 'success', message: "添加成功" });
            this.setData({
                addGoods: false,
            })
            this.getGoodsList()
        } else {
            Notify({ type: 'danger', message: "添加失败" });
        }
    }
})  
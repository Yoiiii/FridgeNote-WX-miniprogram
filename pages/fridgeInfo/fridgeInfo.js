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
        fridgeList: [],
        fridge: {
            id: "",
            name: "我的冰箱",
            cold: [],
            freeze: []
        },
        tabActive: 0
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
            this.setData({
                hasFridge: true,
                fridgeList: data
            });
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
        this.getGoodsList(this.data.fridgeList[0]._id)
    },
    async getGoodsList(id) {
        //console.log(id);
        const res = await $http.getgoodslist({ id: id })
        console.log(res);
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
            this.getfridgelist()
        } else {
            Notify({ type: 'danger', message: "添加失败" });
        }
    }
})
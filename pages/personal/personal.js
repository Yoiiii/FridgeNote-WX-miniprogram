// pages/personal/personal.js
const app = getApp();
const $http = app.globalData.http;
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify'
Page({
    data: {
        active: 'personal',
        userInfo: null,
        addFridge: false,
        delFrdige: false,
        addFridgeLoading: false,
        delFridgeLoading: false,
        fridgeList:[]
    },
    onLoad:async function (options) {
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
        if (app.globalData.id) {
            await this.getfridgelist()
        } else {
            app.userIdReadyCallback = async res => {
                await this.getfridgelist()
            }
        }
    },
    onShow:async function () {
        if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
            active: this.data.active
        })
    }
        if (app.globalData.id) {
            await this.getfridgelist()
        } else {
            app.userIdReadyCallback = async res => {
                await this.getfridgelist()
            }
        }
 
    },
    openaddfridge() {
        this.setData({ addFridge: true })
    },
    closeAddFridge() {
        this.setData({ addFridge: false })
    },
    opendelfridge() {
        this.setData({ delFridge: true })
    },
    closeDelFridge() {
        this.setData({ delFridge: false })
    },
    async getfridgelist() {
        const params = { id: app.globalData.id }
        const { data } = await $http.getfridgelist(params)
        this.setData({
            fridgeList: data
        });
    },
    // addFridge组件方法
    async addFridge(e) {
        const res = await $http.addfridge(e.detail)
        if (res.data) {
            Notify({ type: 'success', message: "添加成功" });
            this.setData({
                addFridgeLoading: false,
                addFridge: false
            })
            await this.getfridgelist()
        }
        else {
            this.setData({
                addFridgeLoading: false
            })
        }
    },
    // delFrdige组件方法
    async delFridge(e){
        console.log(e.detail);
            let params=[]
            e.detail.forEach(element => {
                let item ={
                    _id:element,
                    onwer:element
                }
                params.push(item)
            });
            const result = await $http.delfridge(params)
            if(result.data.success){
                this.setData({
                    delFridge:false,
                    delFridgeLoading:false,
                })
                Notify({ type: 'success', message: "删除成功" });
                await this.getfridgelist()
            }
    }
})
const config = require('../config');
import Dialog from '../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../miniprogram_npm/@vant/weapp/toast/toast';
import Notify from '../miniprogram_npm/@vant/weapp/notify/notify';
const service = {
    get(url, data) {
        return new Promise((resolve, reject) => {
            wx.request({
                method: 'get',
                url: url,
                data: data,
                header: {
                    "content-type": "application/json"
                },
                success: (res) => {
                    // 调用接口成功
                    this.requestLog(url, res);
                    this.errorMessage(res);
                    resolve(res);
                },
                fail: (err) => {
                    // 调用接口失败
                    this.errorMessage(err);
                    this.requestLog(url, err);
                    reject(err)
                }
            })
        })
    },
    post(url, data) {
        return new Promise((resolve, reject) => {
            wx.request({
                method: 'post',
                url: url,
                data: data,
                header: {
                    "content-type": "application/json",
                    "Authorization": 'Bearer ' + (wx.getStorageSync('token') || " "),
                    //"content-type": "application/x-www-form-urlencoded"
                },
                success: (res) => {
                    // 调用接口成功
                    this.errorMessage(res)
                    this.requestLog(url, res);
                    if (res.statusCode == 200) {
                        resolve(res)
                    }
                    resolve(res.statusCode)
                },
                fail: (err) => {
                    console.log(err);
                    // 调用接口失败
                    this.errorMessage(err);
                    this.requestLog(url, err);
                    reject(err)
                }
            })
        })
    },
    upload(url, data) {
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: url, // 仅为示例，非真实的接口地址
                filePath: data.path,
                name: 'file',
                formData: { user: 'test' },
                header: {
                    "content-type": "application/json",
                    "Authorization": 'Bearer ' + (wx.getStorageSync('token') || " "),
                    //"content-type": "application/x-www-form-urlencoded"
                },
                success: (res) => {
                    // 调用接口成功
                    this.errorMessage(res)
                    this.requestLog(url, res);
                    resolve(res)
                },
                fail: (err) => {
                    // 调用接口失败
                    this.errorMessage(err);
                    this.requestLog(url, err);
                    reject(err)
                }
            });
        })
    },
    errorMessage(res) {
        if (!res.statusCode) {
            Notify({ type: 'danger', message: res.errMsg });
        }
        else if (res.statusCode != 200) {
            let code = res.statusCode.toString();
            if (code.substring(0, 1) == "4") {
                Dialog.alert({
                    title: '错误',
                    message: '请求出错: ' + res.errMsg + '\n ErrorCode:' + res.statusCode,
                }).then(() => { });

            } else if (code.substring(0, 1) == "5") {
                Dialog.alert({
                    title: '错误',
                    message: '服务器异常: ' + res.errMsg + '\n ErrorCode:' + res.statusCode,
                }).then(() => { });
            } else {
                Dialog.alert({
                    title: '错误',
                    message: '异常: ' + res.errMsg + '\n ErrorCode:' + res.statusCode,
                }).then(() => { });
            }
        }
    },
    requestLog(url, res) {
        let str = url.split('/');
        let length = str.length - 1;
        let logHead = "[" + `${config.serverType}` + "][" + str[length] + "]:"
        if (res.data) {
            console.log(logHead, res.data);
        } else {
            console.log(logHead, res);
        }
    }
}
const login = (data) => {
    return service.post(`${config.baseUrl}/wxlogin`, data)
}
const test = () => {
    return service.get(`${config.baseUrl}/test`)
}
const getfridgelist = (data) => {
    return service.post(`${config.baseUrl}/getfridgelist`, data)
}
const addfridge = (data) => {
    return service.post(`${config.baseUrl}/addfridge`, data)
}
const addgoods = (data) => service.post(`${config.baseUrl}/addgoods`, data)

const getgoodslist = (data) => {
    return service.post(`${config.baseUrl}/getgoodslist`, data)
}
const upload = (data) => {
    return service.upload(`${config.baseUrl}/upload`, data)
}
const goodscountchange = (data)=> service.post(`${config.baseUrl}/goodscountchange`,data)

const delgoods = data => service.post(`${config.baseUrl}/delgoods`,data)
module.exports = {
    //登錄(獲取openID)
    login,
    test,
    getfridgelist,
    addfridge,
    getgoodslist,
    upload,
    addgoods,
    goodscountchange,
    delgoods
}
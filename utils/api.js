const config = require('../config');
import Dialog from '../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../miniprogram_npm/@vant/weapp/toast/toast';
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
        console.log(data)
        return new Promise((resolve, reject) => {
            wx.request({
                method: 'post',
                url: url,
                data: data,
                header: {
                    //"content-type": "application/x-www-form-urlencoded"
                    "content-type": "application/json"
                },
                success: (res) => {
                    // 调用接口成功
                    this.errorMessage(res);
                    this.requestLog(url, res);
                    resolve(res)
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
    errorMessage(res) {
        if (res.statusCode != 200) {
            let code = res.statusCode.toString();
            if (code.substring(0, 1) == "4") {
                Dialog.alert({
                    title: '錯誤',
                    message: '請求出錯: ' + res.errMsg + '\n ErrorCode:' + res.statusCode,
                }).then(() => { });
            } else if (code.substring(0, 1) == "5") {
                Dialog.alert({
                    title: '錯誤',
                    message: '服務器異常: ' + res.errMsg + '\n ErrorCode:' + res.statusCode,
                }).then(() => { });
            } else {
                Dialog.alert({
                    title: '錯誤',
                    message: '異常: ' + res.errMsg + '\n ErrorCode:' + res.statusCode,
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
    return new Promise((resolve, reject) => {
        resolve(service.post(`${config.baseUrl}/wxlogin`, data))
    })
}
const test =  () => {
    return  service.get(`${config.baseUrl}/test`)
     
}
module.exports = {
    //登錄(獲取openID)
    login,
    test
}
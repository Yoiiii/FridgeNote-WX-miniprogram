import service from "./api.js"
const config = require('../config.js');
const login = (data) => {
    return new Promise((resolve, reject) => {
        resolve(service.post(`${config.baseUrl}/wxlogin`, data))
    })
}
const test = () => {
    return new Promise((resolve, reject) => {
        resolve(service.get(`${config.baseUrl}/test`))
    })
}

module.exports = {
    login,
    test
}
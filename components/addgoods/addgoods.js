// components/addgoods/addgoods.js
const app = getApp();
const $http = app.globalData.http;
import util from "../../utils/util"
Component({
  properties: {

  },
  options: {
    styleIsolation: 'shared',
  },
  lifetimes: {
    attached: function () {
      // let date=new Date()
      // let nowday = date.getFullYear()+"-"+date.getMonth()+1+"-"+date.getDay()
      // this.setData({
      //   "model.outDate":nowday
      // })
    },
    detached: function () {
    },
  },

  data: {
    fileList: [],
    nameVerify: true,
    model: {
      name: null,
      count: 1,
      image: null,
      owner: null,
      type: '1',
      outDate: null
    },
    showOutDate: false,
    minDate: new Date().getTime(),
    maxDate: new Date(2099, 12, 31).getTime(),
    currentDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}`;
      } else if (type === 'month') {
        return `${value}`;
      }
      return value;
    },
    loading: false,
  },

  methods: {
    async afterRead(event) {
      const { file } = event.detail;
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      const res = await $http.upload({ ...file })
      let jsonObj = JSON.parse(res.data);
      const { fileList = [] } = this.data;
      fileList.push({ name: '图片', url: jsonObj.url, isImage: true, });
      this.setData({
        fileList,
        "model.image": jsonObj.url
      });
      console.log("this.data.fileList", this.data.fileList);
    },
    delete(){
      this.setData({
        fileList:[]
      });
    },
    nameChange(event) {
      this.setData({
        "model.name": event.detail,
      });
    },
    typeChange(event) {
      this.setData({
        "model.type": event.detail,
      });
    },
    countChange(event) {
      this.setData({
        "model.count": event.detail,
      });
    },
    openOutDate() {
      this.setData({
        showOutDate: true,
      });
    },
    closeOutDate() {
      this.setData({
        showOutDate: false,
      });
    },
    outDateChange(event) {
      let outDate = util.formatTime2(new Date(event.detail), "yyyy-MM-dd")
      this.setData({
        "model.outDate": outDate,
      });
    },
    verify() {
      if (this.data.model.name != null && this.data.model.name != "") {
        return true
      } else {
        this.setData({
          nameVerify: false
        })
        return false
      }
    },
    async addGoods() {
      this.setData({
        loading: true
      })
      console.log(this.data.model);
      let result = this.verify()
      if (result) {
        this.setData({
          "model.owner": app.globalData.fridgeId
        })
        const res = await $http.addgoods(this.data.model)
        console.log(res);
        if (res.data) {
          this.setData({
            loading: false
          })
          this.triggerEvent('addGoods', true)
        }
        else {
          this.setData({
            loading: false
          })
          //this.triggerEvent('addGoods', false)
        }
      }
      else {
        this.setData({
          loading: false
        })
        //this.triggerEvent('addGoods', false)
      }
    }
  }
})

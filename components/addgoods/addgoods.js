// components/addgoods/addgoods.js
const app = getApp();
const $http = app.globalData.http;
import util from "../../utils/util"
Component({
  properties: {

  },
  lifetimes: {
    attached: function() {
      // let date=new Date()
      // let nowday = date.getFullYear()+"-"+date.getMonth()+1+"-"+date.getDay()
      // this.setData({
      //   "model.outDate":nowday
      // })
    },
    detached: function() {
    },
  },

  data: {
    fileList: [],
    nameVerify: true,
    model: {
      name: null,
      count: 0,
      image: null,
      owner: null,
      type: '1',
      outDate:null
    },
    showOutDate:false,
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
    loading:false,
  },

  methods: {
    async afterRead(event) {
      const { file } = event.detail;
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      const res = await $http.upload({ ...file })
      console.log(res);
      const { fileList = [] } = this.data;
      fileList.push({ name: '图片', url: res.url, isImage: true, });
      this.setData({
        fileList,
        "model.image": res.url
      });
      console.log("this.data.fileList", this.data.fileList);
    },
    typeChange(event) {
      this.setData({
        "model.type": event.detail,
      });
    },
    countChange(event){
      this.setData({
        "model.count": event.detail,
      });
    },
    openOutDate(){
      this.setData({
        showOutDate: true,
      });
    },
    closeOutDate(){
      this.setData({
        showOutDate: false,
      });
    },
    outDateChange(event){
      let outDate =util.formatTime2(new Date(event.detail),"yyyy-MM-dd")      
      this.setData({
        "model.outDate": outDate,
      });
    }
  }
})

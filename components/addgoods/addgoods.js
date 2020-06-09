// components/addgoods/addgoods.js
const app = getApp();
const $http = app.globalData.http;
Component({
  /**
   * 组件的属性列表
   */

  properties: {

  },

  /**
   * 组件的初始数据
   */
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
        return `${value}+`;
      } else if (type === 'month') {
        return `${value}`;
      }
      return value;
    },
    loading:false,
    // "name" : "鸡扒",
    // "count" : 8,
    // "inDate" : ISODate("2020-04-30T06:19:43.196Z"),
    // "exp" : 364,
    // "outDate" : ISODate("2021-04-29T16:00:00.000Z"),
    // "image" : "",
    // "type" : 2,
    // "owner" : ObjectId("5eaa6df8726ef37be7e08982"),
  },

  /**
   * 组件的方法列表
   */
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
      this.setData({
        "model.outDate": event.detail,
      });
    }
  }
})

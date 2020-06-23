// components/addfridge/addfridge.js
const app = getApp();
const $http = app.globalData.http;
Component({
  properties: {
    loading: {
      type:Boolean,
      observer: function(newData, oldData){
        console.log("newData",newData);
        
        this.setData({
          loading:newData
        })
      }
    }
  },
  data: {
    model: {
      name: null,
      owner: null
    },
    name: null,
    error: false,
  },
  methods: {
    //点击添加冰箱按钮
    async addfridge() {
      console.log(this.data.name);
      if (this.data.name) {
        this.setData({
          loading: true
        })
        
        this.setData({
          'model.owner': app.globalData.id,
          'model.name': this.data.name
        })
        this.triggerEvent('addfridge', this.data.model)
      } else {
        this.setData({
          error: true
        })
      }
    }
  }
})

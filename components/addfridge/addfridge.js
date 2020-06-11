// components/addfridge/addfridge.js
const app = getApp();
const $http = app.globalData.http;
Component({
  properties: {
    loading: Boolean
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
      this.setData({
        loading: true
      })
      if (this.data.name) {
        this.setData({
          'model.owner': app.globalData.id,
          'model.name': this.data.name
        })
        const res = await $http.addfridge(this.data.model)
        if (res.data) {
          //Notify({ type: 'success', message: "添加成功" });
          this.setData({
            loading: false
          })
          this.triggerEvent('addfridge', true)
        } 
        else 
        {
          //Notify({ type: 'success', message: "添加成功" });
        }
      } else {
        this.setData({
          error: true
        })
      }
    }
  }
})

// components/addfridge/addfridge.js
const app =getApp()
Component({
  properties: {
    loading:Boolean
  },
  data: {
    model:{
      name:null,
      owner:null
    },
    name:null,
    error:false,
    
  },
  methods: {
    addfridge(){
      console.log(this.data.name);
      if(this.data.name){
        this.setData({
          'model.owner':app.globalData.id,
          'model.name':this.data.name
        })
        this.triggerEvent('addfridge', this.data.model)
        this.setData({
          loading:true
        })
      }else{
        this.setData({
          error:true
        })
      }
    }
  }
})

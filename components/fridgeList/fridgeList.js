// components/fridgeList/fridgeList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    List: {
      type: Array,
      value: [],
      observer: function(newData, oldData){
        console.log("111",newData);
        
      }
    },
    fridgeList:{
      type:Array,
      value: [],
      observers:function(fridgeList) {
          console.log("66666");
          this.setData({
            List: fridgeList
          })
          console.log("this.data.fridgeList",this.data.List);
        }
    },
  },
  lifetimes: {
    ready(){
    },
    attached () {
    },
    detached () {
    }
   },
  
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

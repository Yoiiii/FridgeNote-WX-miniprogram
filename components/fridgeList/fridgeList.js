// components/fridgeList/fridgeList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fridgeList:Array,
    propA:Array
  },
  observers: {
    'fridgeList': function(fridgeList) {
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      this.setData({
        fridgeList: fridgeList
      })
      console.log("this.data.fridgeList",this.data.fridgeList);
      
    }
  },
  lifetimes: {
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

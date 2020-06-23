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
        this.setData({
          List:newData
        })
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
    onClick(event){
      //console.log("item._id",event.target);
      this.triggerEvent('fridgeChange', event.target.dataset.index)
    }
  }
})

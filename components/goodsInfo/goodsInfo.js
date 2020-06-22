// components/goodsInfo/goodsInfo.js

import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Component({
  properties: {
    goods: {
      type: Object,
         observer: function(newData, oldData){
         this.init()
       }
    }
  },
  data: {

  },
  lifetimes: {
    attached: function () {
      
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    onClose(event) {
      const { position, instance } = event.detail;
      switch (position) {
        case 'left':
        case 'cell':
          instance.close();
          break;
        case 'right':
          Dialog.confirm({
            message: '确定全部取出吗？',
          }).then(() => {
            instance.close();
            this.triggerEvent('allOut', this.data.goods)
          });
          break;
      }
    },
    countChange(event) {
      let goods = {
        id: this.data.goods._id,
        count: event.detail
      }
      this.triggerEvent('countChange', goods)
    },
    init(){
      let goods = this.data.goods
      console.log("goods", goods);
      if (goods.exp >= 0) {
        goods.over = false
      } else {
        goods.exp = goods.exp * -1
        goods.over = true
      }
      this.setData({
        goods: goods
      })
    }
  }
})

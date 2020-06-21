// components/goodsInfo/goodsInfo.js
Component({
  properties: {
    goods:{
      type:Object
    }
  },
  data: {

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
          });
          break;
      }
    },
    countChange(event){
      console.log(event.detail);
      this.triggerEvent('countChange', event.detail)
    }
  }
})

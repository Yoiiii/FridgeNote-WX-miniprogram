// components/delfridge/delfridge.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        fridgeList: Array,
        loading: Boolean
    },
    data: {
        result: []
    },
    methods: {
        onChange(event) {
            this.setData({
                result: event.detail
            });
        },
        toggle(event) {
            const { index } = event.currentTarget.dataset;
            const checkbox = this.selectComponent(`.checkboxes-${index}`);
            checkbox.toggle();
        },
        noop() { },
        delfridge() {
            console.log("this.data.result",this.data.result);
            
            if(this.data.result.length!=0){
                this.setData({
                    loading: true
                })
                this.triggerEvent('delfridge', this.data.result)
            }
            else{
                Notify({ type: 'danger', message: "请选择冰箱" });
            }
        }
    }
})

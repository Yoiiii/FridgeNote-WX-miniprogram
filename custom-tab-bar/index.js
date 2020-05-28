// custom-tab-bar/index.js
Component({
    properties: {

    },
    data: {
        active: 'fridgeInfo',
    },
    methods: {
        onChange(event) {
            this.setData({ active: event.detail });
            wx.switchTab({
                url: "../" + event.detail + "/" + event.detail
            });
        },
    }
})

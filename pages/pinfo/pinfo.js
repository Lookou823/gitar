// pages/pinfo/pinfo.js
Page({
  data: {
    pinfo: {
      name: '',
      gender:'',
      type:'',
      phone: '',
    },

    // picker组件使用的数组和 序号
    array:['男','女'],
    index:-1,

    array2:['家长','本人'],
    index2:-1





  },
  onLoad() {
    var self = this;

    wx.getStorage({
      key: 'pinfo',
      success: function (res) {
        self.setData({
          pinfo: res.data
        })
      }
    })
  },

  //之后把数组的值直接传给 storage
  bindPicker1:function(e){
    console.log('picker发送选择改变相应的值',e.detail.value)


      var that = this;
      that.setData({
        index:e.detail.value
      })


  },
  bindPicker2: function (e) {
    console.log('picker发送选择改变相应的值', e.detail.value)


    var that = this;
    that.setData({
      index2: e.detail.value
      
    })


  },





  formSubmit(e) {
    const value = e.detail.value;
    if (value.name && value.phone && value.gender &&  value.type ) {
      wx.setStorage({
        key: 'pinfo',
        data: value,
        success() {
          wx.navigateBack();
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false
      })
    }
  }
})
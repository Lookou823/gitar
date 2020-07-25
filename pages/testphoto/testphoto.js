//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    result: ''

  },

  onLoad: function () {

  },

  getScancode: function () {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        console.log(res)
        _this.setData({
          result: result,

        })

        console.log(_this.data.result)
      }
    })

  }

})
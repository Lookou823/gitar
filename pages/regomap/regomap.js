var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {}
  },
  onLoad: function () {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getRegeo({
      iconPath: "../../img/marker.png",
      iconWidth: 22,
      iconHeight: 32,
      success: function (data) {
        console.log(data)
        var marker = [{
          id: data[0].id,
          latitude: 30.313967,
          longitude: 120.354591,
          iconPath: data[0].iconPath,
          width: data[0].width,
          height: data[0].height
        }]
        that.setData({
          markers: marker
        });
        that.setData({
          latitude: 30.313967
        });
        that.setData({
          longitude: 120.354591
        });
        that.setData({
          textData: {
            name: "浙江理工大学下沙校区",
            desc: "2号大街928号",
            latitude: 30.313967,
            longitude: 120.354591

          }
        })
      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      }
    })
  }
})
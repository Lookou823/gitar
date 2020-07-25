
var app = getApp();
Page({
  data: {
    scene: ''
  },
  onLoad: function (options) {
    var that = this
    var scene_img = 'https://gitar-1300314777.cos.ap-chengdu.myqcloud.com/%E5%9B%BE%E6%A0%87/%E5%90%89%E4%BB%96%E7%A4%BE%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg' //这里添加图片的地址
    that.setData({
      scene: scene_img
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      urls: this.data.scene.split(',')
      // urls:'https://gitar-1300314777.cos.ap-chengdu.myqcloud.com/%E6%8B%9B%E7%94%9F%E4%BF%A1%E6%81%AF/%E4%BF%A1%E6%81%AF%E5%AE%A3%E4%BC%A02.jpg'
      // urls: 'https://gitar-1300314777.cos.ap-chengdu.myqcloud.com/%E5%9B%BE%E6%A0%87/%E5%90%89%E4%BB%96%E7%A4%BE%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg'
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错
    })
  }

})

 
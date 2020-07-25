// pages/gitarplayer/gitarplayer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gpList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化数据库
    let that = this;
    const gpDb = wx.cloud.database();
    //获取吉他产品所有信息
    gpDb.collection('gitarplayer').get({
      success: res => {
        console.log('获取所有吉他师信息：', res.data);

        that.setData({

          gpList: res.data
        })

        console.log("获取的吉他师数组的参考")
        console.log(that.data.gpList)
      },
      fail: res => {
        console.log("获取吉他师信息失败", res);
      }


    })
  },



  gotoDetail: function (e) {
    // 为点击事件进行类型转换
    var index1 = e.currentTarget.dataset.id;
    var index = index1.match(/gp(.*)/)[1];
    var index = parseInt(index);
    console.log(index);
    wx.navigateTo({
      url: '/pages/gpDetail/gpDetail?index=' + index,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
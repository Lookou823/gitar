// pages/gpDetail/gpDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    player: {},
    infodata: [],
    currentData: 0,
    videoList:{}


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

          infodata: res.data
        })

        console.log("获取的吉他师数组的参考")
        console.log(that.data.infodata)

     
        console.log(options.index);
        var index = options.index - 1;
        console.log(that.data.infodata[index]);

        that.setData({
          player: that.data.infodata[index]
        })


        console.log(that.data.player);
      },
      fail: res => {
        console.log("获取吉他师信息失败", res);
      }


    })
    // 获取吉他弹奏视频
    gpDb.collection('gitarvideo').where({
      gpname: "吉他师1"


    })
    .get({
        success:function(res){

          console.log("ssssssss")
          console.log(res.data)
          that.setData({

            videoList: res.data
          })
          console.log(that.data.videoList)
        }
        
    })

  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },

  // 错误回调
  videoErrorCallback:function(e){
    console.log("视频错误信息：")
    console.log(e.detail.errMsg)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  stopTouchMove: function () {

    return false;

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
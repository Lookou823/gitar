// pages/infopage/infopage.js
//初始化获取全局变量
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    //轮播图的index
    swiperIndex: 0,
    //轮播图的一些基本参数
    indicatorDots: false,

    autoplay: false,

    interval: 5000,

    duration: 1000,


    brandList: ["https://gitar-1300314777.cos.ap-chengdu.myqcloud.com/%E5%90%89%E4%BB%96%E5%9B%BE%E6%A0%87/voki.png", "https://gitar-1300314777.cos.ap-chengdu.myqcloud.com/%E5%90%89%E4%BB%96%E5%9B%BE%E6%A0%87/%E5%B8%83%E9%B2%81%E5%85%8B.png","https://gitar-1300314777.cos.ap-chengdu.myqcloud.com/%E5%90%89%E4%BB%96%E5%9B%BE%E6%A0%87/%E4%BA%9A%E4%BC%AF%E5%85%B0%E5%90%AB.png"],

    imgUrls: [
      'https://gitar-1300314777.cos.ap-chengdu.myqcloud.com/%E5%90%89%E4%BB%96%E7%A4%BE%E4%BF%A1%E6%81%AF/%E5%90%89%E4%BB%96%E7%A4%BE1.jpg',
      'https://gitar-1300314777.cos.ap-chengdu.myqcloud.com/%E5%90%89%E4%BB%96%E7%A4%BE%E4%BF%A1%E6%81%AF/%E5%90%89%E4%BB%96%E7%A4%BE2.jpg',
      'https://gitar-1300314777.cos.ap-chengdu.myqcloud.com/%E5%90%89%E4%BB%96%E7%A4%BE%E4%BF%A1%E6%81%AF/%E5%90%89%E4%BB%96%E7%A4%BE3.jpg'
    ],
    //轮播图的属性
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,

    //设置保存数据库json数组的数组。
    gitarList:[]
  },

  showGlobalConstant: function (e){
    
    var test = app.globalData.mainColor
    console.log(test)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化数据库
    let that = this;
    const gitarDb = wx.cloud.database();
    //获取吉他产品所有信息
    gitarDb.collection('gitar').get({
      success:res=>{
        console.log('获取所有吉他产品信息：',res.data);

        that.setData({

          gitarList:res.data
        })

        console.log("获取的吉他数组的参考")
        console.log(that.data.gitarList)
       },
      fail:res=>{
        console.log("获取吉他产品信息失败",res);
      }


    })

  },

  // 页面跳转
  gotoBrand: function (e) {
    var index = e.currentTarget.dataset.id;
    console.log(index);
    wx.navigateTo({
      url: '/pages/branddetail/branddetail?index=' + index,
    })
  },


//跳转至地图页面
  navigationLocation:function(e){

    console.log("Hi")
    wx.navigateTo({
      url: '../mapdetail/mapdetail'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  gotoDetail:function(e){
    // 为点击事件进行类型转换
    var index1 = e.currentTarget.dataset.id;
    // var index = index1.match(/gp(.*)/)[1];
    console.log(index1);
    var index = parseInt(index1);
    console.log(index);
    wx.navigateTo({
      url: '/pages/gitarDetail/gitarDetail?index=' + index,
    })
   
  },

  // 轮播图的代码


  swiperChange(e) {

    const that = this;

    that.setData({

      swiperIndex: e.detail.current,

    })

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
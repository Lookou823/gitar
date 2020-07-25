// pages/branddetail/branddetail.js


let col1H = 0;
let col2H = 0;

let col3H = 0;
let col4H = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    gitarList:[],
    gitarList2:[],
    //瀑布流的属性
    scrollH: 0,
    scrollH2: 0,

    imageList: [],
    co1: [],
    co2: [],
    co3: [],
    co4: [],
    //
    brandList: ["https://gitar-1300314777.cos.ap-chengdu.myqcloud.com/%E5%90%89%E4%BB%96%E5%9B%BE%E6%A0%87/voki.png", "https://gitar-1300314777.cos.ap-chengdu.myqcloud.com/%E5%90%89%E4%BB%96%E5%9B%BE%E6%A0%87/%E5%B8%83%E9%B2%81%E5%85%8B.png", "https://gitar-1300314777.cos.ap-chengdu.myqcloud.com/%E5%90%89%E4%BB%96%E5%9B%BE%E6%A0%87/%E4%BA%9A%E4%BC%AF%E5%85%B0%E5%90%AB.png"],
    f:"",
    jud:""
  },

  //顶部导航栏
  //顶部导航栏切换代码
  swichNav: function (e) {

    console.log(e);

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {

      return false;

    } else {

      that.setData({

        currentTab: e.target.dataset.current,

      })

    }

  },

  swiperChange: function (e) {

    console.log(e);

    this.setData({

      currentTab: e.detail.current,

    })


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let flag = options.index;
    console.log(flag)
    that.setData({

      f:this.data.brandList[flag]
    })
    //获取系统高度

    if(flag == 0)
    {
      that.setData({

        jud: "voki"
      })
    }
    else if (flag == 1) {
      that.setData({

        jud: "布鲁克"
      })
    }
    else if (flag == 2) {
      that.setData({

        jud: "亚伯拉罕"
      })
    }


    wx.getSystemInfo({
      success: (res) => {
        let wh = res.windowHeight;

        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          scrollH2:scrollH
        });
      }

      })


    const gitarDb = wx.cloud.database();
    //获取吉他产品所有信息
    gitarDb.collection('actualGitar').where({

      brand:that.data.jud,
      type:"面单"
      

    }).get({
      success: res => {
        console.log('获取所有品牌吉他产品信息：', res.data);

        that.setData({

          gitarList: res.data
        })

        console.log("获取的吉他数组的参考")
        console.log(that.data.gitarList)
        that.setupData();

      },
      fail: res => {
        console.log("获取吉他产品信息失败", res);
      }


    })


    gitarDb.collection('actualGitar').where({

      brand: that.data.jud,
      type: "全单"


    }).get({
      success: res => {
        console.log('获取所有品牌吉他产品全单信息：', res.data);

        that.setData({

          gitarList2: res.data
        })

        console.log("获取的吉他数组的参考")
        console.log(that.data.gitarList2)
        that.setupData2();

      },
      fail: res => {
        console.log("获取吉他产品信息失败", res);
      }


    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
      loadImages: function () {
        var that = this;
        let temp = that.data.styleList
        if (temp.length > 0) {

          this.setupData();

        }

      },

  setupData: function () {

    let co1 = []
    let co2 = []
    for (let i = 0; i < this.data.gitarList.length; i = i + 2) {
      co1.push(this.data.gitarList[i]);
      if (i + 1 < this.data.gitarList.length) {
        co2.push(this.data.gitarList[i + 1]);
      }
    }

    this.setData({
      co1: co1,
      co2: co2


    })




  },



  setupData2: function () {

    let co3 = []
    let co4 = []
    console.log("全单", this.data.gitarList2)
    for (let i = 0; i < this.data.gitarList2.length; i = i + 2) {
      co3.push(this.data.gitarList2[i]);
      if (i + 1 < this.data.gitarList2.length) {
        co4.push(this.data.gitarList2[i + 1]);
      }
    }

    this.setData({
      co3: co3,
      co4: co4


    })
    console.log("全单3", this.data.co3)
    console.log("全单4", this.data.co4)




  },

  gotodetail1:function(e){
    var index = e.currentTarget.dataset.id
    console.log("brand页面获取参数",index)
    wx.navigateTo({
      url: '/pages/gitarDetail/gitarDetail?index='+index,
    })

  },

  gotodetail2: function (e) {
    var index = e.currentTarget.dataset.id
    console.log("brand页面获取参数", index)
    wx.navigateTo({
      url: '/pages/gitarDetail/gitarDetail?index=' + index,
    })

  },
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
// pages/personcenter/personcenter.js
Page({
  data: {
    thumb: '',
    nickname: '',
    orders: [],
    hasAddress: false,
    address: {},
    useid:'',
    sce:''
  },
  onLoad() {
    //获得popup组件
    this.popup = this.selectComponent("#popup");
    this.popup2 = this.selectComponent("#popup2");

    //获得imgup组件
    this.imgup = this.selectComponent("#imgup");
    console.log(this.imgup)
    var self = this;
    var scene_img = 'https://gitar-1300314777.cos.ap-chengdu.myqcloud.com/%E5%9B%BE%E6%A0%87/%E5%90%89%E4%BB%96%E7%A4%BE%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg' //这里添加图片的地址
    self.setData({
      scene: scene_img
    })
    /**
     * 获取用户信息
     */
    // const wxContext = wx.cloud.getWXContext();
    // self.setData({
    //   useid: wxContext.OPENID
     
    // })
    wx.getUserInfo({
      success: function (res) {
        console.log("res=",res)
        self.setData({
          useid: res.userInfo.province,
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    })

      // /**
      //  * 发起请求获取订单列表信息
      //  */
      // wx.request({
      //   url: 'http://www.gdfengshuo.com/api/wx/orders.txt',
      //   success(res) {
      //     self.setData({
      //       orders: res.data
      //     })
      //   }
      // })
  },

// 测试云函数
  // testCloud:function(){
  //   wx.cloud.callFunction({
  //     name:'add',
  //     data:{
  //       a:1999,
  //       b:1224
  //     },
  //     success:res=>{
  //       console.log("res=",res.result)
  //     },
  //     fail:err=>{

  //     },
  //     complete:()=>{
  //       //...

  //     }


  //   })

  // },


// 测试云函数操作数据库

  // testCloudDb:function(){

  //   /**
  //   * 获取用户信息
  //   */
  //   var that = this;

  //   console.log(that.data.useid)
  //   wx.cloud.callFunction({
  //     name: 'cloudadd',
  //     data: {
  //       _id: that.data.useid,
  //       name: "Tom",
  //       num: "13777888391"
  //     },


  //       success: res => {
  //        wx.showToast({
  //     title: '报名成功',
  //     duration:2000
  //   })
  //     console.log("res=", res.result)
  //   },
  //   fail: err => {
  //     wx.showToast({
  //       title: '报名失败',
  //       icon:'none',
  //       duration: 2000
  //     })
  //   },
  //     complete: res => {
  //       console.log('callFunction test result: ', res)
  //     }
  //   })

  // // wx.cloud.callFunction({

  // //   name: 'addEnrollment',
  // //     data: {
  // //       name:"ssss",
  // //       phone:"13777888391"
   
  // //       },
  // //   success: res => {
  // //        wx.showToast({
  // //     title: '报名成功',
  // //     duration:2000
  // //   })
  // //     console.log("res=", res.result)
  // //   },
  // //   fail: err => {
  // //     wx.showToast({
  // //       title: '报名失败',
  // //       icon:'none',
  // //       duration: 2000
  // //     })
  // //   },
  // //   complete: res => {
  // //     console.log('callFunction test result: ', res)
  // //   }
  // // })



  // },
  //报名弹出框的代码
  //弹出框的代码
  showPopup() {
    this.popup.showPopup();
  },
  showpop2() {
    this.popup2.showPopup();
  },

  _error3() {
    console.log('你点击了取消');
    this.popup2.hidePopup();
  },


  _success3() {
    console.log('你点击了确定');
    this.popup2.hidePopup();
    wx.navigateTo({
      url: '/pages/pinfo/pinfo',
    })
  },

  //取消事件
  _error() {
    console.log('你点击了取消');
    this.popup.hidePopup();
  },
  //确认事件
  _success() {
    console.log('你点击了确定');
    this.popup.hidePopup();
    let that = this;
    // 获取本地数据
    wx.getStorage({
      key: 'pinfo',
      success: function (res) {
        console.log(res);
        that.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
    console.log("测试区域输出 useid 省份名字")
    console.log(that.data.useid)
    console.log("测试区域输出本地缓存数据")
    //千万别忘记 that.data再. 定义的变量
    console.log(that.data.address);
    console.log(that.data.address.phone);

    // 首先要判断本地缓存不为空
    if (that.data.address.name && that.data.address.phone && that.data.address.gender && that.data.address.type){

      wx.cloud.callFunction({
        name: 'cloudadd',
        data: {
          _id: that.data.useid + that.data.address.phone,
          name: that.data.address.name,
          gender: that.data.address.gender,
          type: that.data.address.type,
          num: that.data.address.phone
        },


        success: res => {
          wx.showToast({
            title: '报名成功',
            duration: 2000
          })
          console.log("res=", res.result)
        },
        fail: err => {
          wx.showToast({
            title: '报名失败',
            icon: 'none',
          })
        },
        complete: res => {
          console.log('callFunction test result: ', res)
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请在填写完整信息后报名',
        showCancel: false,
        success: function () {
          wx.navigateTo({
            url: '../../pages/pinfo/pinfo'
          })

         }
      })
     
    }
    
    // wx.cloud.callFunction({
    //   name: 'cloudadd',
    //   data: {
    //     _id: that.data.useid + that.data.address.phone,
    //     name: that.data.address.name,
    //     num: that.data.address.phone
    //   },


    //   success: res => {
    //     wx.showToast({
    //       title: '报名成功',
    //       duration: 2000
    //     })
    //     console.log("res=", res.result)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       title: '报名失败',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   },
    //   complete: res => {
    //     console.log('callFunction test result: ', res)
    //   }
    // })

  },

  //弹出公众号二维码的函数代码
  showImgup() {
    this.imgup.showImgup();
  },

  //取消事件
  _error2() {
    console.log('你点击了关闭');
    this.imgup.hideImgup();
  },

  _success2() {
    console.log('你点击了关注');
    wx.previewImage({
      // urls: this.data.scene.split(',')
      urls: this.data.scene.split(',')
    })
    this.imgup.hideImgup();
  },
  cleartest:function(e){
    let that = this;
    that.setData({
      address:{}
    })
    wx.removeStorage({
      key: 'pinfo',
      success: function(res) {console.log("清除成功")},
    })

  },

  gotoAd:function(e){

    console.log("ssssssss")
    wx.navigateTo({
      url: '../../pages/adinfo/adinfo'
    })

  


  },

  gotopub:function(e){
    console.log("test for clicking")
  },

  gotoManager:function(e){
    wx.navigateTo({
      url: '../../pages/mainfo/mainfo'
    })
    
  },

  gotoenrollment: function (e) {
    wx.navigateTo({
      url: '../../pages/mainfo/mainfo'
    })

  },

  gotoclass: function (e) {
    wx.navigateTo({
      url: '../../pages/classinfo/classinfo'
    })

  },



  onShow() {
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'pinfo',
      success: function (res) {
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
  },
  // /**
  //  * 发起支付请求
  //  */
  // payOrders() {
  //   wx.requestPayment({
  //     timeStamp: 'String1',
  //     nonceStr: 'String2',
  //     package: 'String3',
  //     signType: 'MD5',
  //     paySign: 'String4',
  //     success: function (res) {
  //       console.log(res)
  //     },
  //     fail: function (res) {
  //       wx.showModal({
  //         title: '支付提示',
  //         content: '<text>',
  //         showCancel: false
  //       })
  //     }
  //   })
  // }
})
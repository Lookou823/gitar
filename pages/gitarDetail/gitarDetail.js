// pages/gitarDetail/gitarDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img1:"../../icon/收 藏 (2).png",
    img2:"../../icon/收 藏 (1).png",
    iconflag:1,
    img:'../../icon/收 藏 (2).png',
    //用来拼接，然后进行判断，明天早上写
    //我来了 2.13
    sample:'',
    //用来存放对应的吉他细节图片
    gtdList:[],
    //轮播图的index
    swiperIndex:0,
    //轮播图的一些基本参数
    indicatorDots: false,

    autoplay: false,

    interval: 5000,

    duration: 1000,

    //设置数组获取全部吉他
    gitarList:[],
    //设置json类型数据存放对应的吉他
    gitar:{},
    //获取详情页面对应的吉他名字
    gitarname:"",
    //获得本地缓存用的变量（有些可能用不到）
    thumb: '',
    nickname: '',
    orders: [],
    hasAddress: false,
    address: {},
    useid: '',
    sce: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    



    let that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log("res=", res)
        that.setData({
          useid: res.userInfo.province,
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })



        let index = options.index
        console.log("跳转参数", index)
        that.setData({
          gitarname: index
        })
        const gtDb = wx.cloud.database();

        //获取吉他列表
        gtDb.collection('actualGitar').where({

          attri: that.data.gitarname
        }).get({
          success: res => {
            console.log('获取所有吉他产品信息：', res.data);

            that.setData({

              gitarList: res.data[0]
            })

            console.log("获取的吉他数组的参考")
            console.log(that.data.sampleindex)
            console.log(that.data.gitarList)
            console.log(that.data.gitarList)
            console.log(that.data.gitarList)
            // 获取点击事件的序号
            // console.log("点击测试")
            // console.log(options.index);
            // var indexss = options.index;
            // var index = parseInt(indexss);
            // console.log(index)
            // console.log(that.data.gitarList[index]);
            that.setData({

              gitar: that.data.gitarList
            })

            console.log(that.data.gitar)

            console.log("测试参数传递2")

            console.log(that.data.gitar)
            that.setData({
              sample: that.data.gitar._id
            })
            console.log("测试参数传递")
            console.log(that.data.sample)
            gtDb.collection('gitardetail').where({
              gitarname: that.data.sample


            })
              .get({
                success: function (res) {

                  console.log("ssssssss")
                  console.log(res.data)
                  that.setData({

                    gtdList: res.data
                  })
                  console.log(that.data.gtdList)
                }

              })
            // 获取吉他细节图片
          },
          fail: res => {
            console.log("获取吉他产品信息失败", res);
          }


        })


        //收藏按钮的显示

        // 获取本地数据
        wx.getStorage({
          key: 'pinfo',
          success: function (res) {
            console.log(res);
            that.setData({
              hasAddress: true,
              address: res.data
            })
            console.log("收藏测试", that.data.useid + that.data.address.phone + that.data.gitarname)
            const redb = wx.cloud.database();
            redb.collection('gitarRequire').where({

              _id: that.data.useid + that.data.address.phone + that.data.gitarname,


            }).get({

              success: function (res) {
                console.log(res.data)

                if (res.data.length >= 1)
                {
                  that.setData({
                    img: that.data.img2,
                    iconflag: -1
                  })


                  wx.showToast({
                    title: '你已经收藏',
                    duration:500
                  })
                }
                else{
                  that.setData({
                    img: that.data.img1,
                    iconflag: 1
                  })

                  wx.showToast({
                    title: '你没有收藏',
                    icon: none,
                    duration: 500
                  })
                }
             
              },
              fail: function (res) {
            
              }
            })
          }
        })

      }
    })
   
   
  },

  sendRequire:function(e){
    let that = this;
    let temp = that.data.iconflag;

    const redb = wx.cloud.database();
    // redb.collection('gitarRequire').where({
        
    //   _id: that.data.useid + that.data.address.phone + that.data.gitarname,
    //   gitarname: that.data.gitarname


    // }).get({

    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       img: that.data.img2,
    //       iconflag: 1
    //     })
    //   }
    // })



    console.log("测试收藏",temp);
    if(temp == -1){

        wx.cloud.callFunction({

            name:'remove',
            data:{
              _id: that.data.useid + that.data.address.phone + that.data.gitarname,
              gitarname:that.data.gitarname
            },
          success: res => {
            wx.showToast({
              title: '取消成功',
              duration: 2000
            })
            console.log("res=", res.result)
          },
          fail: err => {
            console.log(err)
            wx.showToast({
              title: '取消失败',
              icon: 'none',
            })
          },



        })






      that.setData({
        img : that.data.img1,
        iconflag:1
      })

     
    }

    if (temp == 1) {

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


          console.log("测试区域输出 useid 省份名字")
          console.log(that.data.useid)
          console.log("测试区域输出本地缓存数据")
          //千万别忘记 that.data再. 定义的变量
          console.log(that.data.address);
          console.log(that.data.address.phone);

          // 首先要判断本地缓存不为空
          if (that.data.address.name && that.data.address.phone && that.data.address.gender && that.data.address.type && that.data.gitarname) {

            wx.cloud.callFunction({
              name: 'addrequire',
              data: {
                _id: that.data.useid + that.data.address.phone + that.data.gitarname,
                name: that.data.address.name,
                gender: that.data.address.gender,
                type: that.data.address.type,
                num: that.data.address.phone,
                attri: that.data.gitarname
              },


              success: res => {
                wx.showToast({
                  title: '收藏成功',
                  duration: 2000
                })
                console.log("res=", res.result)




                that.setData({
                  img: that.data.img2,
                  iconflag: -1
                })
              },
              fail: err => {
                wx.showToast({
                  title: '收藏失败',
                  icon: 'none',
                })
              },
              complete: res => {
                console.log('callFunction test result: ', res)
              }
            })


          } else {
            wx.showModal({
              title: '提示',
              content: '请在填写完整信息后进行收藏',
              showCancel: false,
              success: function () {
                wx.navigateTo({
                  url: '../../pages/pinfo/pinfo'
                })

              }
            })

          }




        



        },
        fail:function(res){

          wx.showModal({
            title: '提示',
            content: '请在填写完整信息后进行收藏',
            showCancel: false,
            success: function () {
              wx.navigateTo({
                url: '../../pages/pinfo/pinfo'
              })
            }
            })  
        }
          
       
      })


    }
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
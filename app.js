//app.js
App({
  onLaunch: function () {

      wx.cloud.init({
        traceUser:true,
        env:"gitar-ikgfg"

          })
    
    },
    //定义全局变量，便于统一更改颜色等设计参数
  globalData: {
    userInfo: null,
    mainColor:"bef"
  }
})
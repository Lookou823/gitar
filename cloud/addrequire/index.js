// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: 'gitar-ikgfg' })

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('gitarRequire').add({
    data: {
      _id: event._id,
      name: event.name,
      gender: event.gender,
      type: event.type,
      num: event.num,
      attri:event.attri

    },
    success: function (res) {
      wx.showToast({
        title: "添加成功",
        duration: 2000
      })

    },
    fail: function (res) {
      wx.showToast({
        title: "添加失败",
        duration: 2000
      })
    }
  })
}
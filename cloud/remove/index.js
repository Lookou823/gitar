// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: 'gitar-ikgfg' })
const db = cloud.database()

const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('gitarRequire').where({


      attri: event.gitarname,
      _id: event._id

    }).remove()
  } catch (e) {
    console.error(e)
  }
  


}
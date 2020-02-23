// pages/showVideo/showVideo.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    items: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    var name = options.name
    var that = this
    if (name == 'commercial') {
      db.collection('commercialVideo').where({
        publish: _.eq(true)
      }).get({
        success(res) {
          var i = 0
          var items = []
          while (i < res.data.length) { //获取封面
            items = items.concat(res.data[i].item)
            i++;
          }
          that.setData({ //反转使最新的在最上面
            items: items.reverse(),
            id:id
          })
        }
      })
    }
  },

})
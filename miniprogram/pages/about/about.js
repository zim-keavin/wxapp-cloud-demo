// pages/about/about.js
const db = wx.cloud.database()
Page({
  data: {
    url: ''
  },

  onLoad: function (options) {
    var that = this
    db.collection('aboutUs').get({
      success(res) {
        that.setData({ //反转使最新的在最上面
          url: res.data[0].url,
        })
      }
    })
  },

})
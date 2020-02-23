// pages/activityPhoto/activityPhoto.js
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    items: [],
    show: -1,
    id: -1, //用于关掉上一个视频
  },

  onLoad: function (options) {
    var that = this
    db.collection('microFilm').where({
      publish: _.eq(true)
    }).get({
      success(res) {
        that.setData({ //反转使最新的在最上面
          items: res.data.reverse()
        })
      }
    })
  },

  cover: function (e) {
    var index = e.currentTarget.dataset.id
    var id = 'my' + e.currentTarget.dataset.id
    console.log(index)
    if (this.data.show != index) {          //用于暂停前一个视频
      var i = 'my' + this.data.show
      this.videoContext = wx.createVideoContext(i)
      this.videoContext.pause({})
    }
    this.setData({
      show: index //相等就隐藏封面，即点击隐藏
    })
    this.videoContext = wx.createVideoContext(id)
    this.videoContext.play({})
  }
})
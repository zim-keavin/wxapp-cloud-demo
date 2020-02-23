// pages/activityPhoto/activityPhoto.js
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    items: [],  // 视频数据的数组
    show: -1,  // 记录正在播放的视频下标
    id: -1,  // 用于关掉上一个视频
  },

  /**
   * 从云开发后台获取数据
   */
  onLoad: function(options) {
    var that = this
    db.collection('commercialVideo').where({
      publish: _.eq(true)
    }).get({
      success(res) {
        that.setData({
          items: res.data.reverse()  // 反转使最新数据的在最上面
        })
      }
    })
  },

  /**
   * 点击视频后，隐藏封面，暂停上一次点击的视频，播放点击的视频
   */
  cover: function(e) {
    var index = e.currentTarget.dataset.id
    var id = 'my' + e.currentTarget.dataset.id
    if (this.data.show != index) {  // 此处的show是上一个视频的下标
      var i = 'my' + this.data.show
      this.videoContext = wx.createVideoContext(i)  // 小程序的视频api
      this.videoContext.pause({})  // 暂停上一个播放的视频
    }
    this.setData({
      show: index  // 将show更新至最新点击的视频的下标
    })
    this.videoContext = wx.createVideoContext(id)
    this.videoContext.play({})  // 开始播放当前视频
  }
})
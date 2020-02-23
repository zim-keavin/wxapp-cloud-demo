// pages/activityPhoto/activityPhoto.js
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    image: '',
  },

  onLoad: function (options) {
    var that = this
    db.collection('IDPhoto').get({
      success(res) {
        that.setData({ 
          image:res.data[0].photo
        })
      }
    })
  },
  preview:function(){
    console.log(this.data.image)
    wx.previewImage({
      current: this.data.image, // 当前显示图片的http链接
      urls: [this.data.image] // 需要预览的图片http链接列表
    })
    
  }

})
// pages/ActivityPhotoPhoto/ActivityPhotoPhoto.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
  },

  onLoad: function (options) {
    this.getActivityPhoto();
  },


  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    that.onShow()
  },
  onShow: function () {
    var that = this
    that.getActivityPhoto()
  },
  //得到摄影推文
  getActivityPhoto: function () {
    var that = this
    db.collection('activityPhoto').get({
      success(res) {
        that.setData({
          activityPhoto: res.data.reverse(),
        })
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        //  console.log("res.data")
      }
    })
  },
  //公告跳转
  toActivityPhoto: function (e) {
    var id = e.currentTarget.dataset.id;
    var url = this.data.activityPhoto[id].url;

    wx.navigateTo({
      url: '/pages/showTweets/showTweets?name=activityPhoto&url=' + url,
    })
  },

})
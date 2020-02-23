// pages/activityPhoto/activityPhoto.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],
  },

  onLoad: function (options) {
    this.getProductPhoto();
  },


  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    that.onShow()
  },
  onShow: function () {
    var that = this
    that.getProductPhoto()
  },
  //得到摄影推文
  getProductPhoto: function () {
    var that = this
    db.collection('productPhoto').get({
      success(res) {
        that.setData({
          productPhoto: res.data.reverse(),
        })
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        //  console.log("res.data")
      }
    })
  },
  //公告跳转
  toProductPhoto: function (e) {
    var id = e.currentTarget.dataset.id;
    var url = this.data.productPhoto[id].url;

    wx.navigateTo({
      url: '/pages/showTweets/showTweets?name=productPhoto&url=' + url,
    })
  },
})
// pages/portrayPhoto/portrayPhoto.js
const db = wx.cloud.database({});
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getportaryTweets();
  },


  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
   that.onShow()
  },
  onShow: function () {
    var that = this
    that.getportaryTweets()
  },
  //得到摄影推文
  getportaryTweets: function () {
    var that = this
    db.collection('portaryTweets').get({
      success(res) {
        that.setData({
          portaryTweets: res.data.reverse(),
        })
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        //  console.log("res.data")
      }
    })
  },
  //公告跳转
  toPortaryTweets: function (e) {
    var id = e.currentTarget.dataset.id;
    var url = this.data.portaryTweets[id].url;
   
    wx.navigateTo({
      url: '/pages/showTweets/showTweets?name=portaryTweets&url='+url,
    })
  },
})
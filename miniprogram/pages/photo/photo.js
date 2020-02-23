const app = getApp();
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    cardCur: 0,
    tower: [{ //轮播图
      id: 0,
      url: 'cloud://saurystudio-3a5350.7361-saurystudio-3a5350/swiper/swiper1.jpg'
    }, {
      id: 1,
        url: 'cloud://saurystudio-3a5350.7361-saurystudio-3a5350/swiper/swiper2.jpg'
    }, {
      id: 2,
        url: 'cloud://saurystudio-3a5350.7361-saurystudio-3a5350/swiper/swiper3.jpg'
    }],
    //icon图
    iconList: [{
      icon: 'evaluate_fill',
      color: 'orange',
      name: '产品摄影',
      url: '/pages/productPhoto/productPhoto'
    }, {
      icon: 'skinfill',
      color: 'yellow',
      name: '活动摄影',
      url: '/pages/activityPhoto/activityPhoto'
    }, {
      icon: 'addressbook',
      color: 'green',
      name: '写真',
      url: '/pages/portrayPhoto/portrayPhoto'
    }, {
      icon: 'profilefill',
      color: 'cyan',
      name: '最美证件照',
      url: '/pages/IDPhoto/IDPhoto'
    }],
    gridCol: 4,
  },
 
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  navigate:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: this.data.iconList[id].url
    })
  },

  onLoad: function (options) {
    this.getPhotoTweets()
  },
  

  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    that.onShow()
  },
  onShow: function () {
    var that = this
    that.getPhotoTweets()
  },

  /**
   * 从云开发数据库中获取推文
   */
  getPhotoTweets: function () {
    var that = this
    db.collection('photoTweets').get({
      success(res) {
        that.setData({
          photoTweets: res.data.reverse(),  // 使最新推文在上面
        })
        wx.hideNavigationBarLoading()  // 完成停止加载
        wx.stopPullDownRefresh()  // 停止下拉刷新
      }
    })
  },
  //公告跳转
  toPhotoTweets: function (e) {
    var id = e.currentTarget.dataset.id;  // 获取点击的推文的数组下标
    var url = this.data.photoTweets[id].url;  // 通过id判断是哪个推文的链接
    //跳转并传参
    wx.navigateTo({
      url: '/pages/showTweets/showTweets?name=photoTweets&url=' + url,
    })
  },
});
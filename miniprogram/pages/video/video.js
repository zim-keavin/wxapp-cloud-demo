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
      url: 'cloud://saurystudio-3a5350.7361-saurystudio-3a5350/swiper/swiper4.jpg'
    }, {
      id: 1,
        url: 'cloud://saurystudio-3a5350.7361-saurystudio-3a5350/swiper/swiper5.jpg'
    }],
    iconList: [{
      icon: 'sponsorfill',
      color: 'red',
      name: '商业宣传片',
      url: '/pages/commercialVideo/commercialVideo'
    }, {
      icon: 'cardboardfill',
      color: 'orange',
      name: '活动纪录片',
      url: '/pages/activityVideo/activityVideo'
    }, {
      icon: 'attentionfavorfill',
      color: 'yellow',
      name: '微电影',
      url: '/pages/microFilm/microFilm'
    }, {
      icon: 'musicfill',
      color: 'olive',
      name: '抖音短视频',
      url: '/pages/TikTokVideo/TikTokVideo'
    }, {
      icon: 'circlefill',
      color: 'green',
      name: '电商视频',
      url: '/pages/eCommerceVideo/eCommerceVideo'
    }, {
      icon: 'weixin',
      color: 'cyan',
      name: '朋友圈短视频',
      url: '/pages/wechatVideo/wechatVideo'
    }, {
      icon: 'friendfamous',
      color: 'blue',
      name: '写真视频',
      url: '/pages/portrayVideo/portrayVideo'
    }, {
      icon: 'game',
      color: 'purple',
      name: 'mg动画',
      url: '/pages/mgcartoon/mgcartoon'
    }],
    iconList2:[{
        icon: 'more',
        color: 'mauve',
        name: '更多',
        url: ''   
    }],
    gridCol: 3,
    gridRow: 4
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
  navigate: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: this.data.iconList[id].url
    })
  },
  
  navigate2: function (e) {
    wx.showToast({
      icon:'none',
      title: '正待开发......',
    })
   },
  onLoad: function (options) {
    this.getVideoTweets()
  },


  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    that.onShow()
  },
  onShow: function () {
    var that = this
    that.getVideoTweets()
  },
  //得到摄影推文
  getVideoTweets: function () {
    var that = this
    db.collection('videoTweets').get({
      success(res) {
        that.setData({
          videoTweets: res.data.reverse(),
        })
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        //  console.log("res.data")
      }
    })
  },
  //公告跳转
  toVideoTweets: function (e) {
    var id = e.currentTarget.dataset.id;
    var url = this.data.videoTweets[id].url;

    wx.navigateTo({
      url: '/pages/showTweets/showTweets?name=videoTweets&url=' + url,
    })
  },
});
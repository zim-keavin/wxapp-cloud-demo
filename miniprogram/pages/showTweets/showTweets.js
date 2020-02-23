// pages/showPhoto/showPhoto.js
Page({
 
  onLoad: function(options) { 
    this.setData({
      url:options.url   // 通过传参实现跳转公众号推文
    })    
  },
 
})
// pages/appointment/appointment.js
var util = require('../util/util.js');
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoItems: [{
      name: '活动视频'
    }, {
      name: '商业宣传片'
    }, {
      name: '微电影'
    }, {
      name: '电商视频'
    }, {
      name: '抖音短视频'
    }, {
      name: '朋友圈短视频',
    }],

    photoItems: [{
      name: '商品摄影',
    }, {
      name: '活动跟拍'
    }, {
      name: '写真',
    }, {
      name: '最美证件照',
    }],

    warnText: '',
    checkPhoneNum: false,
    head:'',

    //数据库内容
    name: '',
    phoneNum: '',
    weixin: '',
    content: '',
    video: [],
    photo: [],
    videoOther: '',
    photoOther: ''
  },
   
  onLoad: function (options) {
    var that = this
    db.collection('appointmentPhoto-Head').get({
      success(res) {
        console.log(res.data[0].photo)
        that.setData({ 
          head:res.data[0].photo
        })
      }
    })
  },

  //视频多选框方法
  checkboxChange01: function(e) {
    var that = this;
    that.data.video = e.detail.value;
  },

  //照片多选框方法
  checkboxChange02: function(e) {
    var that = this;
    that.data.photo = e.detail.value;
  },

  //提交表单
  onConfirm: function(e) {
    var warnText = '';
    if (this.data.checkPhoneNum) {
      this.addOrder(e);
    }
  },

  //向数据库添加预约数据
  addOrder: function(e) {
    var that = e.detail.value;     //表单中的数据
    var that01 = this              //data中设置的数据
    const db = wx.cloud.database();
    db.collection('appointment').add({
      data: {
        name: that.name,
        phoneNum: that.phoneNum,
        weixin: that.weixin,
        content: that.content,
        video: that01.data.video,
        photo: that01.data.photo,
        videoOther: that.videoOther,
        photoOther: that.photoOther,
        time: util.formatTime(new Date())
      },
      success: res => {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1500
        });
        console.log('[数据库] [新增记录] 成功，记录：', res._id);
        setTimeout(function() {
          wx.reLaunch({
            url: '../photo/photo',
          })
        }, 1500)
      },
      fail: err => {
        wx.showToast({
          title: '认证失败',
          icon: 'none',
          duration: 1500
        });
        console.log('[数据库] [新增记录] 失败：', err);
      }
    })
  },

  /**
   * 手机号码约束规范
   */
  checkPhoneNum: function(e) {
    var mobile = /^[1][3,4,5,7,8][0-9]{9}$/;
    //判断是否是座机电话
    var myreg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    //检查
    var isMobile = mobile.exec(e.detail.value) || myreg.exec(e.detail.value);

    //输入有误的话，弹出模态框提示
    if (e.detail.value == '') {
      this.setData({
        warnText: '注意：手机号码不得为空！',
        checkPhoneNum: false
      })
    } else {
      if (!isMobile) {
        this.setData({
          warnText: "手机号码格式错误",
          checkPhoneNum: false
        })
      } else {
        this.setData({
          warnText: '',
          checkPhoneNum: true,
          phoneNum: e.detail.value
        })
      }
    }
  },
})
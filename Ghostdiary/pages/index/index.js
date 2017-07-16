//获取应用实例
var app = getApp()
Page({
  data: {
    homeIcon: app.globalData.imagePath+'/home-hover.png',
    diaryIcon: app.globalData.imagePath+'/diary.png',
    calendarIcon: app.globalData.imagePath+'/calendar.png',
    hiddenLoading: true,
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady:function(){
  	this.setData({
  		hiddenLoading: false
  	})
  },
  onShow:function(){
  	this.setData({
  		hiddenLoading: false
  	})
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      });
      console.log(userInfo)
    });
  },
  adminPage: function(e){
    wx.navigateTo({
      url: '../../pages/adminnewdiary/adminnew'
    })
  }
})
//获取应用实例
var app = getApp()
Page({
  data: {
    homeIcon: app.globalData.imagePath+'/home.png',
    diaryIcon: app.globalData.imagePath+'/diary-hover.png',
    calendarIcon: app.globalData.imagePath+'/calendar.png',
    hiddenLoading: true
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
  onLoad: function (options) {
    //console.log(this);
  },
  GotoEditDiaryPage: function (argument) {
    wx.navigateTo({
      url: '../../pages/newdiary/new'
    })
  }
})
//编辑日记
//获取应用实例
var app = getApp()
Page({
  data: {
    homeIcon: app.globalData.imagePath+'/home.png',
    diaryIcon: app.globalData.imagePath+'/diary.png',
    calendarIcon: app.globalData.imagePath+'/calendar.png',
    containerType1: app.globalData.imagePath+'/type1.png',
    containerType2: app.globalData.imagePath+'/type2.png',
    containerType3: app.globalData.imagePath+'/type3.png',
    diaryImage: app.globalData.imagePath+'/12.png',
    classType: 'normal-type',
    hiddenLoading: true,
    textareaPlaceholder: '请输入文字，最多100个字',
    textAlign: "",
    maxTextAreaLength: 100,
    composingClass: "",
    composingClassContainer: "",
    styleText: ""
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
   
  },
  changeDiaryImage: function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          diaryImage: tempFilePaths
        });
      }
    })
  },
  changeTypeSetting: function(event){
    var typeSetting = event.currentTarget.dataset.type;
    if(typeSetting == "1")
    {
      this.setData({
        textareaPlaceholder: "请输入文字，最多100个字",
        composingClass: "",
        maxTextAreaLength: 100,
        composingClassContainer: "",
        styleText: ""
      });
    }
    else if(typeSetting == "2")
    {
      this.setData({
        textareaPlaceholder: "请输入文字，最多50个字",
        composingClass: "composing2",
        maxTextAreaLength: 50,
        composingClassContainer:"composingContainer2",
        styleText: "background-image: url('../../../images/edit-model2.png');background-size: 100px 160px;"
      });
    }
    else if(typeSetting == "3")
    {
      this.setData({
        textareaPlaceholder: "请输入文字，最多100个字",
        composingClass: "composing3",
        maxTextAreaLength: 100,
        composingClassContainer:"composingContainer3",
        styleText: "background-image: url('../../../images/edit-model3.png');background-size: 180px 180px;"
      });
    }
  },
  textAlignEvent: function(event){
    var typeSetting = event.currentTarget.dataset.classtype;
    this.setData({
      textareaPlaceholder: typeSetting,
      textAlign: typeSetting
    });
  }
})
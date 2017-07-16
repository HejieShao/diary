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
    textAlign: "",
    maxTextAreaLength: 100,
    composingTextarea: "composing1",
    composingClassContainer: "",
    styleText: "",
    textareaValue: "",
    placeholderTextarea: "请输入文字，最多100个字"
  },
  diaryData: {
    textareaValue: ""
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
        showClass1: "",
        showClass2: "none",
        showClass3: "none",
        maxTextAreaLength: 100,
        composingClassContainer: "",
        styleText: "",
        composingTextarea: "composing1",
        placeholderTextarea: "请输入文字，最多100个字"
      });
    }
    else if(typeSetting == "2")
    {
      this.setData({
        showClass1: "none",
        showClass2: "",
        showClass3: "none",
        maxTextAreaLength: 50,
        composingClassContainer:"composingContainer2",
        styleText: "background-image: url('http://oqcvdvwwm.bkt.clouddn.com/edit-model2.png');background-size: 100px 160px;",
        composingTextarea: "composing2",
        placeholderTextarea: "请输入文字\n最多50个"
      });
    }
    else if(typeSetting == "3")
    {
      this.setData({
        cshowClass1: "none",
        showClass2: "none",
        showClass3: "",
        maxTextAreaLength: 100,
        composingClassContainer:"composingContainer3",
        styleText: "background-image: url('http://oqcvdvwwm.bkt.clouddn.com/edit-model3.png');background-size: 180px 180px;",
        composingTextarea: "composing3",
        placeholderTextarea: "请输入文字，最多100个字"
      });
    }
  },
  textAlignEvent: function(event){
    var typeSetting = event.currentTarget.dataset.classtype;
    this.setData({
      textareaPlaceholder: typeSetting,
      textAlign: typeSetting
    });
  },
  textBlurEvent: function(event){
    this.diaryData.textareaValue = event.detail.value;
  },
  didPressChooseImage: function() {
    var that = this;
    // 选择图片
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var filePath = res.tempFilePaths[0];
        // 交给七牛上传
        qiniuUploader.upload(filePath, (res) => {
          // 每个文件上传成功后,处理相关的事情
          // 其中 info 是文件上传成功后，服务端返回的json，形式如
          // {
          //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
          //    "key": "gogopher.jpg"
          //  }
          // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
          that.setData({
            'imageURL': res.imageURL,
          });
        }, (error) => {
          console.log('error: ' + error);
        }, {
          region: 'ECN',
          domain: 'oqcvdvwwm.bkt.clouddn.com', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
          key: 'customFileName.jpg', // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
          // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
          uptoken: '[yourTokenString]', // 由其他程序生成七牛 uptoken
          uptokenURL: 'UpTokenURL.com/uptoken', // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "[yourTokenString]"}
          uptokenFunc: function() {return '[yourTokenString]';}
        });
      }
    })
  }
})
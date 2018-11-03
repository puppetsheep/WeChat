//获取应用实例
var app = getApp();
var mtabW;
Page({
  data: {
    tabs: ["新闻动态", "通知公告", "党务公开","我的收藏"],
    activeIndex: 0,
    slideOffset: 0,
    winHeight:"",
    tabW: 0,
    b:[]
  },


  //事件处理函数
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        mtabW = res.windowWidth / 4; //设置tab的宽度
        that.setData({
          tabW: mtabW
        })
      }
    });




    // var postsData = require('../toutiao/toutiao.js');
    // //postid 赋值
    // this.data.currentPostId = postId
    // var postData = postsData.postList[postId];
    // //  this.data.postData=postData;
    // this.setData({
    //   postData: postData
    // });



    wx.request({
      url:'https://www.apiopen.top/journalismApi', 
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.statusCode == 200) {
    //      console.log(res.data.data.toutiao[0].link);
          that.setData({
            b: res.data.data.toutiao
          })
        }
      }
    })

    wx.getSystemInfo({
      success: function (s) {
        var clientHeight = s.windowHeight,
          clientWidth = s.windowWidth,
          rpxR = 1180 / clientWidth;
        var calc = clientHeight * rpxR - 100;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  
  },
  tabClick: function (e) {
    var that = this;
    var idIndex = e.currentTarget.id;
    var offsetW = e.currentTarget.offsetLeft; //2种方法获取距离文档左边有多少距离
    this.setData({
      activeIndex: idIndex,
      slideOffset: offsetW
    });
  },
  bindChange: function (e) {
    var current = e.detail.current;
    if ((current + 1) % 4 == 0) {

    }
    var offsetW = current * mtabW; //2种方法获取距离文档左边有多少距离
    this.setData({
      activeIndex: current,
      slideOffset: offsetW
    });
  }
  ,
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '标题', // 分享标题
      desc: '描述', // 分享描述
      path: '路径' // 分享路径
    }
  }
})
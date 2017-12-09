// pages/addresslist/addresslist.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    tabs: ["按行业", "按专业", "按年级"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    list1: '',
    list2: '',
    list3: '',
    url: '',
    people: 0,
    alumniID: 0,
    search: ''
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    var _this = this;
    console.info(e.detail.value);
    var openid = app.globalData.openid;
    if (openid != '' || openid != undefined) {
      var datas = {
        keywords: e.detail.value,
        id: _this.data.alumniID
      }
      wx.request({
        url: app.globalData.url + 'searchXiaoyou',
        data: datas,
        method: 'POST',
        success: function (res) {
          console.info(res.data);
          _this.setData({
            search: res.data
          });
        },
        fail: function (res) {
          console.error(res);
        }
      })
    }
    this.setData({
      inputVal: e.detail.value
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      alumniID: options.id
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    wx.request({
      url: app.globalData.url + 'apiXiaoyouDetail',
      data: {
        id: options.id,
        type: 1
      },
      success: function(res){
        console.info(res.data);
        that.setData({
          list1: res.data
        })
      }
    })
    wx.request({
      url: app.globalData.url + 'apiXiaoyouDetail',
      data: {
        id: options.id,
        type: 2
      },
      success: function (res) {
        console.info(res.data);
        that.setData({
          list2: res.data
        })
      }
    })
    wx.request({
      url: app.globalData.url + 'apiXiaoyouDetail',
      data: {
        id: options.id,
        type: 3
      },
      success: function (res) {
        console.info(res.data);
        that.setData({
          list3: res.data
        })
      }
    })
    var _this = this;
    wx.request({
      url: app.globalData.url + 'apiXiaoyouhuiDetail/' + options.id,
      success: function (res) {
        that.setData({
          people: res.data.number_xiaoyouhui
        })
      },
      fail: function (res) {
        console.error(res);
      }
    })
  },
  watch: function () {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // return {
    //   title: '自定义转发标题',
    //   path: '/pages/addresslist/addresslist'
    // }
  }
})
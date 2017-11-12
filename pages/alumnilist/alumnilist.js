// pages/alumnilist/alumnilist.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    alumnis: '',
    src: '../../image/1.png',
    mode: 'scaleToFill',
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
    this.setData({
      inputVal: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.userInfo) {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    console.info('111111');
    var _this = this;
    var openid = app.globalData.openid;
    if (openid == '') {
      app.openIdReadyCallback = res => {
        var json = JSON.parse(res.data);
        openid = json.openid;
        wx.request({
          url: app.globalData.url + 'apiXiaoyouList',
          data: { openid: openid },
          method: 'POST',
          success: function (res) {
            console.info(res.data);
            _this.setData({
              alumnis: res.data,
            })
            wx.hideLoading();
          },
          fail: function (res) {
            wx.hideLoading();
            console.error(res);
          }
        })
      }
    } else {
      wx.request({
        url: app.globalData.url + 'apiXiaoyouList',
        data: { openid: openid },
        method: 'POST',
        success: function (res) {
          _this.setData({
            alumnis: res.data,
          })
          wx.hideLoading();
        },
        fail: function (res) {
          wx.hideLoading();
          console.error(res);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // wx.hideLoading();
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
    console.info('这是下拉');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.info('这是上拉');
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var _this = this;
    var openid = app.globalData.openid;
    if (openid == '') {
      app.openIdReadyCallback = res => {
        var json = JSON.parse(res.data);
        openid = json.openid;
        wx.request({
          url: app.globalData.url + 'apiXiaoyouList',
          data: { openid: openid },
          method: 'POST',
          success: function (res) {
            _this.setData({
              alumnis: res.data,
            })
            wx.hideLoading();
          },
          fail: function (res) {
            wx.hideLoading();
            console.error(res);
          }
        })
      }
    } else {
      wx.request({
        url: app.globalData.url + 'apiXiaoyouList',
        data: { openid: openid },
        method: 'POST',
        success: function (res) {
          _this.setData({
            alumnis: res.data,
          })
          wx.hideLoading();
        },
        fail: function (res) {
          wx.hideLoading();
          console.error(res);
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
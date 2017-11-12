// pages/visitcard/visitcard.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: '../../image/1.png',
    mode: 'scaleToFill',
    topimg: app.globalData.imgurl,
    info: {},
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    wx.showLoading({
      title: '加载中',
    }) 
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
    var _this = this;
    var openid = app.globalData.openid;
    if (openid == '') {
      app.openIdReadyCallback = res => {
        var json = JSON.parse(res.data);
        openid = json.openid;
        wx.request({
          url: app.globalData.url + 'apiUserInfo',
          data: { openid: openid },
          method: 'POST',
          success: function (res) {
            if (app.globalData.userInfo) {
              _this.setData({
                userInfo: app.globalData.userInfo,
              })
            } else {
              wx.getUserInfo({
                success: res => {
                  app.globalData.userInfo = res.userInfo
                  _this.setData({
                    userInfo: res.userInfo,
                  })
                }
              })
            }
            if (res.data.name != "") {
              _this.setData({
                info: res.data
              })
            } else {
              wx.redirectTo({
                url: '../../personal/personal',
              })
            }
            wx.hideLoading();
          },
          fail: function (res) {
            console.error(res);
          }
        })
      }
    } else {
      wx.request({
        url: app.globalData.url + 'apiUserInfo',
        data: { openid: openid },
        method: 'POST',
        success: function (res) {
          if (app.globalData.userInfo) {
            _this.setData({
              userInfo: app.globalData.userInfo,
            })
          } else {
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo
                _this.setData({
                  userInfo: res.userInfo,
                })
              }
            })
          }
          if (res.data.name != "") {
            _this.setData({
              info: res.data
            })
          } else {
            wx.redirectTo({
              url: '../../personal/personal',
            })
          }
          wx.hideLoading();
        },
        fail: function (res) {
          console.error(res);
        }
      })
    }
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
    console.info('6666666666')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '校友会',
      path: '/pages/visitcard/visitcard',
      success: function (res) {
        // 转发成功
        // wx.redirectTo({
        //   url: '../visitcard/visitcard',
        // })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  editCard: function(e){
    wx.navigateTo({
      url: '../personal/personal'
    })
  },
  share: function (e) {
    wx.showModal({
      title: '无法分享',
      content: '请先完善名片内容',
      showCancel: true,
      confirmText: '去完善'
    })
  }
})
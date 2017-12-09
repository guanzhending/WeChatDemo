// pages/invitation/invitation.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 'scaleToFill',
    topimg: app.globalData.imgurl,
    info: {},
    userInfo: {},
    activityinfo: '',
    src: app.globalData.smallimg
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.info(options);
    wx.request({
      url: app.globalData.url + 'apiActivityDetail',
      data: { id: options.id},
      method: 'POST',
      success: function (res) {
        console.info(res);
        _this.setData({
          activityinfo: res.data,
        })
      }
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
            if (res.data.name != "" && res.data.name != "null" && res.data.name != null) {
              _this.setData({
                info: res.data
              })
              console.info(res.data);
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
            console.info(res.data);
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    var path = 'pages/personinvit/personinvit?id=' + _this.data.info.id + '&userid=' + _this.data.info.userinfo.id;
    return {
      title: '自定义转发标题',
      path: path,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
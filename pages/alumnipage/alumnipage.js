// pages/alumnipage/alumnipage.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: app.globalData.acimg,
    mode: 'scaleToFill',
    isAgree: false,
    creater: '../../image/creater.png',
    addresslist: '../../image/addresslist.png',
    people: '../../image/right.png',
    activities: '',
    topmsg: app.globalData.imgurl,
    info:{},
    iscreater:false,
    headimg: '',
    hasactivity: false,
    addresslisturl: '',
    alumniId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      alumniId: options.id
    })
    wx.request({
      url: app.globalData.url + 'apiXiaoyouhuiDetail/'+options.id,
      success:function(res){
        console.info(res);
        if (app.globalData.openid){
          if (app.globalData.openid == res.data.add_user){
            _this.setData({
              iscreater: true
            })
          }
        }
        _this.setData({
          info: res.data,
          addresslisturl: '../addresslist/addresslist?id=' + res.data.id,
          headimg: app.globalData.imgpath + res.data.school_info.logo
        })
        if (res.data.activitys.length > 0){
          _this.setData({
            hasactivity: true
          })
        }
      },
      fail:function(res){
        console.error(res);
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
    wx.request({
      url: app.globalData.url + 'apiXiaoyouhuiDetail/' + _this.data.alumniId,
      success: function (res) {
        if (app.globalData.openid) {
          if (app.globalData.openid == res.data.add_user) {
            _this.setData({
              iscreater: true
            })
          }
        }
        _this.setData({
          info: res.data,
          addresslisturl: '../addresslist/addresslist?id=' + res.data.id,
          headimg: app.globalData.imgpath + res.data.school_info.logo
        })
        if (res.data.activitys.length > 0) {
          _this.setData({
            hasactivity: true
          })
        }
      },
      fail: function (res) {
        console.error(res);
      }
    })
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
  onShareAppMessage: function (res) {
    var _this = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res)
    }
    console.info(_this.data.info);
    var path = 'pages/personinvit/personinvit?id=' + _this.data.info.id + '&userid=' + _this.data.info.userinfo.id;
    return {
      title: '邀请函',
      path: path,
      success: function (res) {
        console.info('分享成功');
        if (_this.data.info.is_connect == 1) {
          if (res.errMsg == 'shareAppMessage:ok') {
            wx.getShareInfo({
              shareTicket: res.shareTickets[0],
              complete: function (res) {
                wx.checkSession({
                  success: function () {
                    //session 未过期，并且在本生命周期一直有效
                    var sessionKey = wx.getStorageSync('session_key');
                    var updateOpenGId = {
                      alumniId: _this.data.info.id,
                      encryptedData: res.encryptedData,
                      iv: res.iv,
                      appid: app.globalData.appid,
                      sessionKey: sessionKey
                    }
                    console.info(updateOpenGId);
                    wx.request({
                      url: app.globalData.url + 'getOpenGid',
                      method: 'POST',
                      data: updateOpenGId,
                      success: function (res) {
                        console.info(res);
                        if (res.data == 'isbuild') {
                          wx.showModal({
                            title: '绑定结果',
                            content: '校友会已绑定，绑定微信群失败',
                            showCancel: false,
                            confirmText: '知道了'
                          })
                        }
                        if (res.data == '-41003') {
                          wx.showModal({
                            title: '绑定结果',
                            content: '绑定微信群失败',
                            showCancel: false,
                            confirmText: '知道了'
                          })
                        }
                      },
                      fail: function (res) {
                        console.error(res);
                      }
                    })
                  },
                  fail: function () {
                    //登录态过期
                    wx.login({
                      success: res => {
                        wx.request({
                          url: app.globalData.url + 'apiCheckLogin/' + res.code,
                          success: function(res2){
                            var json = JSON.parse(res2.data);
                            var updateOpenGId = {
                              alumniId: _this.data.info.id,
                              encryptedData: res.encryptedData,
                              iv: res.iv,
                              appid: app.globalData.appid,
                              sessionKey: json.session_key
                            }
                            wx.request({
                              url: app.globalData.url + 'getOpenGid',
                              method: 'POST',
                              data: updateOpenGId,
                              success: function (res) {
                                console.info(res + 'fail');
                                if (res.data == 'isbuild') {
                                  wx.showModal({
                                    title: '绑定结果',
                                    content: '校友会已绑定，绑定微信群失败',
                                    showCancel: false,
                                    confirmText: '知道了'
                                  })
                                }
                                if (res.data == '-41003') {
                                  wx.showModal({
                                    title: '绑定结果',
                                    content: '绑定微信群失败',
                                    showCancel: false,
                                    confirmText: '知道了'
                                  })
                                }
                              },
                              fail: function (res) {
                                console.error(res);
                              }
                            })
                          }
                        })
                      }
                    })
                    }
                  })
              }
            })
          }
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '',
          content: '分享失败',
          showCancel: false,
          confirmText: '知道了'
        })
      },
      complete: function (res){
        
      }
    }
  },
  /**
   * 编辑
   */
  edit: function(res){
    wx.navigateTo({
      url: '../createpage/createpage?id=' + this.data.info.id
    })
  },
  /**
   * 删除
   */
  deleted: function(res){
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在删除',
            mask: true
          })
          wx.request({
            url: app.globalData.url + 'deleteXiaoyouhui/' + _this.data.info.id,
            success: function(res){
              wx.hideLoading();
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              wx.switchTab({
                url: '../alumnilist/alumnilist',
              })
            },
            fail: function(res){
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '删除失败',
                showCancel: false,
                confirmText: '知道了'
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 查看通讯录
   */
  lookAddress: function(){
    wx.navigateTo({
      url: this.data.addresslisturl,
    })
  }
})
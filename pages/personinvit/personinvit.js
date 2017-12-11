// pages/personinvit/personinvit.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 'scaleToFill',
    img: '../../image/1.png',
    topmsg: app.globalData.imgurl,
    alumniInfo: '',
    userinfo: '',
    schoollogo: ''
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
    var _this = this;
    if(options){
      wx.request({
        url: app.globalData.url + 'apiXiaoyouhuiDetail/' + options.id,
        success: function (res) {
          console.info(res);
          _this.setData({
            alumniInfo: res.data,
            schoollogo: app.globalData.imgpath + res.data.school_info.logo
          })
        }
      })
      wx.request({
        url: app.globalData.url + 'apiUserInfo',
        data: { id: options.userid },
        method: 'POST',
        success: function (res) {
          _this.setData({
            userinfo: res.data
          });
        },
        fail: function (res) {
          console.error(res);
        }
      })
    }
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
  
  },
  /**
   * 加入校友会
   */
  join: function(){
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
        var data = {
          openid: openid,
          xiaoyouhui_id: _this.data.alumniInfo.id
        }
        wx.request({
          url: app.globalData.url + 'apiEnterXiaoyou',
          method: 'POST',
          data: data,
          success: function (res) {
            console.info(res);
            wx.hideLoading();
          },
          fail: function (res) {
            wx.hideLoading();
            wx.showModal({
              title: '',
              content: '加入失败',
              showCancel: false,
              confirmText: '知道了'
            })
          }
        })
      }
    } else {
      var data = {
        openid: openid,
        xiaoyouhui_id: _this.data.alumniInfo.id
      }
      wx.request({
        url: app.globalData.url + 'apiEnterXiaoyou',
        method: 'POST',
        data: data,
        success: function(res){
          wx.hideLoading();
          wx.navigateTo({
            url: '',
          })
        },
        fail: function(res){
          wx.hideLoading();
          wx.showModal({
            title: '',
            content: '加入失败',
            showCancel: false,
            confirmText: '知道了'
          })
        }
      })
    }
  }
})
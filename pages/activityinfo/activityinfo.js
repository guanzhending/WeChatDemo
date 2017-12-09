// pages/activityinfo/activityinfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: app.globalData.imgurl,
    mode: 'scaleToFill',
    applicants: 'ewq',
    activityInfo: '',
    is_baoming: true,
    is_creater: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var info={
      openid: app.globalData.openid,
      id: options.id
    }
    wx.request({
      url: app.globalData.url + 'apiActivityDetail',
      data: info,
      method: 'POST',
      success: function (res) {
        console.info(res);
        if(res.data.is_baoming == 1){
          _this.setData({
            is_baoming: false
          })
        }
        if (app.globalData.openid == res.data.openid){
          _this.setData({
            is_creater: true
          })
        }
        _this.setData({
          activityInfo: res.data
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
   * 报名
   */
  enrol: function(){
    var _this = this;
    var info = {
      openid: app.globalData.openid,
      huodong_id: _this.data.activityInfo
    }
    wx.request({
      url: app.globalData.url + 'apiBaoming',
      data: info,
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '报名成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  edit: function(){
    wx.navigateTo({
      url: '../createactivity/createactivity?id=' + this.data.activityInfo.id
    })
  },
  share: function(){
    wx.navigateTo({
      url: '../invitation/invitation?id=' + this.data.activityInfo.id
    })
  }
})
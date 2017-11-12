// pages/activitylist/activitylist.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '../../image/1.png',
    mode: 'scaleToFill',
    activitylist: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var openid = app.globalData.openid;
    wx.request({
      url: app.globalData.url + 'apiActivityList',
      data: { openid: openid },
      method: 'POST',
      success: function(res){
        console.info(res.data);
        _this.setData({
          activitylist: res.data,
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 跳转创建活动
   */
  createac: function(res){
    wx.navigateTo({
      url: '../createactivity/createactivity',
    })
  }
})
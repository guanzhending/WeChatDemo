// pages/joinactivity/joinactivity.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 'scaleToFill',
    topimg: app.globalData.imgpath + 'invite1.png',
    schoolinfo: '',
    xiaoyouinfo: '',
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
      data: { id: options.id },
      method: 'POST',
      success: function (res) {
        console.info(res.data);
        if(res.data){
          _this.setData({
            activityinfo: res.data,
          })
          if(res.data.xiaoyouinfo != null){
            _this.setData({
              xiaoyouinfo: res.data.xiaoyouinfo,
            })
          }
          if(res.data.xiaoyou_id){
            wx.request({
              url: app.globalData.url + 'apiXiaoyouhuiDetail/' + res.data.xiaoyou_id,
              success: function (res2) {
                if(res2.data.school_info != null){
                  _this.setData({
                    schoolinfo: res2.data.school_info,
                  })
                }
              },
              fail: function (res3) {
                console.error(res3);
              }
            })
          }
        }
      }
    })
    wx.request({
      url: app.globalData.url + 'apiActivityDetail',
      data: { id: options.id },
      method: 'POST',
      success: function (res) {
        console.info(res.data);
        if (res.data) {
          _this.setData({
            activityinfo: res.data,
          })
          if (res.data.xiaoyouinfo != null) {
            _this.setData({
              xiaoyouinfo: res.data.xiaoyouinfo,
            })
          }
          if (res.data.xiaoyou_id) {
            wx.request({
              url: app.globalData.url + 'apiXiaoyouhuiDetail/' + res.data.xiaoyou_id,
              success: function (res2) {
                if (res2.data.school_info != null) {
                  _this.setData({
                    schoolinfo: res2.data.school_info,
                  })
                }
              },
              fail: function (res3) {
                console.error(res3);
              }
            })
          }
        }
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
  
  }
})
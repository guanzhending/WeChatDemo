// pages/alumnipage/alumnipage.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '../../image/1.png',
    mode: 'scaleToFill',
    isAgree: false,
    creater: '../../image/creater.png',
    addresslist: '../../image/addresslist.png',
    people: '../../image/right.png',
    activities: 'ewq',
    topmsg: app.globalData.imgurl,
    info:{},
    iscreater:false,
    headimg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
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
          headimg: app.globalData.imgpath+res.data.school_info.logo
        })
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
    return {
      title: '自定义转发标题',
      path: '/pages/personinvit',
      success: function (res) {
        console.info('分享成功');
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
        if (_this.data.info.is_connect == 0){
          if (res.errMsg == 'shareAppMessage:ok'){
            console.info(res.shareTickets[0]);
            wx.getShareInfo({
              shareTicket: res.shareTickets[0],
              complete: function(res){
                console.info(res);
                var updateOpenGId={
                  alumniId: _this.data.info.id,
                  encryptedData: res.encryptedData,
                  iv: res.iv
                }
                // wx.request({
                //   url: '',
                //   method: 'POST',
                //   data: updateOpenGId
                // })
              }
            })
          }
        }
      }
    }
  },
  edit: function(res){
    wx.navigateTo({
      url: '../createpage/createpage?id=' + this.data.info.id
    })
  }
})
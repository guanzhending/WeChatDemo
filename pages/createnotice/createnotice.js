// pages/createnotice/createnotice.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   xiaoyouid:'',
   noticeid: '',
   notice:'',
   is_zhiding: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if(options.xiaoyouid){
      _this.setData({
        xiaoyouid: options.xiaoyouid,
      })
    }
    if (options.id) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      wx.request({
        url: app.globalData.url + 'getNotice',
        data: { id: options.id},
        success: function(res){
          wx.hideLoading();
          if(res.data){
            _this.setData({
              notice: res.data,
            })
            if (res.data.zhidingNum != '0' && res.data.zhidingNum != 0){
              _this.setData({
                is_zhiding: true,
              })
            }
          }
        }
      })
      _this.setData({
        noticeid: options.id,
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
   * 创建公告
   */
  formSubmit: function (e) {
    var _this = this;
    var openid = app.globalData.openid;
    var acinfo = e.detail.value;
    if (acinfo.title == '' || acinfo.title == null){
      wx.showModal({
        title: '',
        content: '您还没有输入公告标题',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (acinfo.content == '' || acinfo.content == null) {
      wx.showModal({
        title: '',
        content: '您还没有输入公告内容',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    var zhiding = 0;
    if (acinfo.zhiding){
      zhiding = 1;
    }
    var notice = '';
    if (_this.data.noticeid == '' || _this.data.noticeid == undefined){
      notice = {
        title: acinfo.title,
        content: acinfo.content,
        zhiding: zhiding,
        openid: openid,
        xiaoyou_id: _this.data.xiaoyouid
      }
    }else{
      notice = {
        id: _this.data.noticeid,
        title: acinfo.title,
        content: acinfo.content,
        zhiding: zhiding
      }
    }
    wx.request({
      url: app.globalData.url + 'addNotice',
      data: notice,
      method: 'POST',
      success: function (res) {
        if (res.data != 'error'){
          wx.showModal({
            title: '',
            content: '创建成功',
            showCancel: false,
            confirmText: '知道了',
            success: function (res) {
              // wx.redirectTo({
              //   url: '/pages/alumnipage/alumnipage?id=' + _this.data.xiaoyouid,
              //   success: function (res) {
              //     wx.hideLoading();
              //   },
              //   fail: function (res) {
              //   }
              // })
              wx.switchTab({
                url: '../alumnilist/alumnilist',
              })
            }
          })
        }else{
          wx.showModal({
            title: '',
            content: '创建失败，服务器错误',
            showCancel: false,
            confirmText: '知道了',
          })
        }
      }
    })
  }
})
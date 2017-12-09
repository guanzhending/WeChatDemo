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
    search: '',
    isshow: true
  },
  create: function () {
    wx.navigateTo({
      url: '../createpage/createpage',
    })
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
    var _this=this;
    var openid = app.globalData.openid;
    if(openid != '' || openid != undefined){
      var datas = {
        keywords: e.detail.value,
        openid: openid
      }
      wx.request({
        url: app.globalData.url + 'apiXiaoyouList',
        data: datas,
        method: 'POST',
        success: function (res) {
          _this.setData({
            search: res.data
          });
        },
        fail: function (res) {
          console.error(res);
        }
      })
    }
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
            if(res.data == ''){
              _this.setData({
                isshow: false,
              })
            }else{
              _this.setData({
                isshow: true,
              })
            }
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
          if (res.data == '') {
            _this.setData({
              isshow: false,
            })
          }else{
            _this.setData({
              isshow: true,
            })
          }
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
    var _this = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.url + 'apiXiaoyouList',
      data: { openid: app.globalData.openid },
      method: 'POST',
      success: function (res) {
        if (res.data == '') {
          _this.setData({
            isshow: false,
          })
        } else {
          _this.setData({
            isshow: true,
          })
        }
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
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
            if (res.data == '') {
              _this.setData({
                isshow: false,
              })
            } else {
              _this.setData({
                isshow: true,
              })
            }
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
          if (res.data == '') {
            _this.setData({
              isshow: false,
            })
          } else {
            _this.setData({
              isshow: true,
            })
          }
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
  }
})
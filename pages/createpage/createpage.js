// pages/createpage/createpage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '../../image/1.png',
    mode: 'scaleToFill', 
    isAgree: false,
    schoolname: [],
    alinfo: [],
    schoolIndex: null,
    address: '',
    region: [],
    isconnect: 0,
    alumniInfo: ''
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
    console.info(e.detail.value);
  },
  /**
   * 关联学校select
   */
  bindSchoolChange: function (e) {
    this.setData({
      schoolIndex: e.detail.value
    })
  },
  /**
   * 活动区域select
   */
  bindAvtivityChange: function (e) {
    this.setData({
      activityIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var openid = app.globalData.openid;
    wx.request({
      url: app.globalData.url + 'apiUserInfo',
      data: { openid: openid },
      method: 'POST',
      success: function (res) {
        console.info(res);
        if (res.data.name != "" && res.data.name != "null" && res.data.name != null) {
          _this.setData({
            info: res.data
          })
        } else {
          wx.reLaunch({
            url: '../personal/personal',
          })
        }
      },
      fail: function (res) {
        console.error(res);
      }
    })
    wx.request({
      url: app.globalData.url +'/apiSchool',
      success:function(res) {
        var alinfo = res.data;
        console.info(alinfo);
        var schoolname = new Array();
        for (var i = 0; i < alinfo.length;i++){
          schoolname.push(res.data[i].schoolname);
        }
        _this.setData({
          schoolname: schoolname,
          alinfo: alinfo
        });
        if(options.id){
          wx.request({
            url: app.globalData.url + 'apiXiaoyouhuiDetail/' + options.id,
            success: function(res){
              console.info(res.data);
              var area = new Array();
              area = res.data.area.split(" ");
              for (var i = 0; i < alinfo.length; i++) {
                if (alinfo[i].id == res.data.school_id){
                  _this.setData({
                    schoolIndex: i
                  })
                  break;
                }
              }
              
              var info = {
                alumniname: res.data.name,
                region: area,
                alumnidetail: res.data.content,
                is_connect: res.data.is_connect,
              }
            }
          })
        }
      }
    });
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
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  relationWeiChat: function (e) {
    console.info(e.detail);
    if (e.detail.value){
      wx.showModal({
        title: '',
        content: '开启隐私权限设置后，只需分享此校友会到微信群就能关联哦~',
        showCancel: false,
        confirmText: '知道了'
      })
      this.setData({
        isconnect: 1
      });
    }else{
      this.setData({
        isconnect: 0
      });
    }
  },
  formSubmit: function (e) {
    if (!this.data.isAgree){
      wx.showModal({
        title: '',
        content: '您还没有阅读并同意相关条款',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.alname=="") {
      wx.showModal({
        title: '',
        content: '您还没有输入校友会名称',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.schoolname == "") {
      wx.showModal({
        title: '',
        content: '您还没有关联学校',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.citys.length == 0) {
      wx.showModal({
        title: '',
        content: '您还没有关联活动区域',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.alumnidetail == "") {
      wx.showModal({
        title: '',
        content: '您还没有输入校友会介绍',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    var cityString = '';
    for (var i = 0; i < e.detail.value.citys.length; i++){
      cityString += e.detail.value.citys[i] + ' ';
    }
    var alinfo = {
      name: e.detail.value.alname,
      school_id: this.data.alinfo[this.data.schoolIndex].id,
      area: cityString,
      content: e.detail.value.alumnidetail,
      add_user: app.globalData.openid,
      wx_name: '',
      is_connect: this.data.isconnect
    }
    wx.showLoading({
      title: '数据加载中',
      mask:true
    });
    wx.request({
      url: app.globalData.url + '/apiAddXiaoyou',
      data: alinfo,
      success:function(option){
          wx.redirectTo({
            url: '/pages/alumnipage/alumnipage?id=' + option.data,
            success:function(res){
              wx.hideLoading();
            },
            fail:function(res){
              console.info(res);
            }
          })
      },
      fail:function(){
        wx.showModal({
          title: '',
          content: '创建失败',
          showCancel: false,
          confirmText: '知道了'
        })
        return
      }
    })
  }
})
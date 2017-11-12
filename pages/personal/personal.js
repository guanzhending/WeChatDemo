// pages/personal/personal.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    schoolname: [],
    alinfo: [],
    schoolIndex: null,
    major:[],
    majorindex: null,
    majorname: [],
    industry: [],
    industryindex: null,
    industryname: [],
    Education: ["小学","初中","高中","大学","硕士","博士"],
    educationIndex: null,
    date: '',
    birthday: '',
    isAgree: false,
    interestVal: '',
    nameVal: '',
    telVal: '',
    weChatVal: '',
    schoolClassVal: '',
    companyVal: '',
    positionVal: '',
    personalInfoVal: '',
    addressVal: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var _this = this;
    wx.request({
      url: app.globalData.url + 'apiSchool',
      success: function (res) {
        var alinfo = res.data;
        var schoolname = new Array();
        for (var i = 0; i < res.data.length; i++) {
          schoolname.push(res.data[i].schoolname);
        }
        _this.setData({
          schoolname: schoolname,
          alinfo: alinfo
        });
      }
    });
    wx.request({
      url: app.globalData.url + '/settingApi/0',
      success: function (res){
        var majorname = new Array();
        for (var i = 0; i < res.data.length; i++) {
          majorname.push(res.data[i].name);
        }
        _this.setData({
          major: res.data,
          majorname: majorname
        });
      }
    })
    wx.request({
      url: app.globalData.url + '/settingApi/1',
      success: function (res) {
        var industryname = new Array();
        for (var i = 0; i < res.data.length; i++) {
          industryname.push(res.data[i].name);
        }
        _this.setData({
          industry: res.data,
          industryname: industryname
        });
      }
    })
    if (app.globalData.openid !==''){
      wx.request({
        url: app.globalData.url + 'apiUserInfo',
        data: { openid: app.globalData.openid },
        method: 'POST',
        success: function (res) {
          var schoolname = res.data.school_info.schoolname;
          var schoolindexs = null;
          for (var i = 0; i < _this.data.schoolname.length; i++){
            if (_this.data.schoolname[i] == schoolname){
              schoolindexs = i;
            }
          }
          var majornames = res.data.zhuanye_info.name;
          var majorindexs = null;
          for (var j = 0; j < _this.data.majorname.length; j++) {
            if (_this.data.majorname[j] == majornames) {
              majorindexs = j;
            }
          }
          var Educations = res.data.xueli;
          var educationIndexs = null;
          for (var z = 0; z < _this.data.Education.length; z++) {
            if (_this.data.Education[z] == Educations) {
              educationIndexs = z;
            }
          }
          var industrynames = res.data.hangye_info.name;
          var industryindexs = null;
          for (var a = 0; a < _this.data.industryname.length; a++) {
            if (_this.data.industryname[a] == industrynames) {
              industryindexs = a;
            }
          }
          _this.setData({
            nameVal: res.data.name,
            telVal: res.data.tel,
            weChatVal: res.data.wx_number,
            schoolIndex: schoolindexs,
            majorindex: majorindexs,
            educationIndex: educationIndexs,
            date: res.data.school_time,
            schoolClassVal: res.data.banji,
            companyVal: res.data.company,
            positionVal: res.data.zhiwei,
            industryindex: industryindexs,
            personalInfoVal: res.data.content,
            addressVal: res.data.address,
            birthday: res.data.birthday,
            interestVal: res.data.aihao
          });
        },
        fail: function (res) {
          console.error(res);
        }
      })
    }
  },
  /**
   * 同意协议
   */
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  /**
   * 关联日期
   */
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
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
   * 关联学历select
   */
  bindEducationChange: function (e) {
    this.setData({
      educationIndex: e.detail.value
    })
  },
  /**
   * 关联专业select
   */
  bindMajorChange: function (e) {
    this.setData({
      majorindex: e.detail.value
    })
  },
  /**
   * 关联专业select
   */
  bindIndustryChange: function (e) {
    this.setData({
      industryindex: e.detail.value
    })
  },
  /**
   * 关联生日
   */
  bindBirthdayChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
   * 表单提交
   */
  formSubmit: function (e) {
    if (!this.data.isAgree) {
      wx.showModal({
        title: '',
        content: '您还没有阅读并同意相关条款',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.name == "") {
      wx.showModal({
        title: '',
        content: '您还没有输入名字',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.schoolId == null) {
      wx.showModal({
        title: '',
        content: '您还没有关联学校',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.company == "") {
      wx.showModal({
        title: '',
        content: '您还没有输入公司',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.positon == "") {
      wx.showModal({
        title: '',
        content: '您还没有输入职位',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.industryId == null) {
      wx.showModal({
        title: '',
        content: '您还没有关联行业',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.address == "") {
      wx.showModal({
        title: '',
        content: '您还没有输入常住地',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    var tel = "";
    if (e.detail.value.telPhone != ""){
      tel = e.detail.value.telPhone.trim();
      if(tel.length != 11){
        wx.showModal({
          title: '',
          content: '手机号输入格式不正确',
          showCancel: false,
          confirmText: '知道了'
        })
        return
      }
    }
    var person = {
      openid: app.globalData.openid,
      name: e.detail.value.name,
      tel: tel,
      wx_number: e.detail.value.weChatId,
      school_id: e.detail.value.schoolId,
      zhuanye_id: e.detail.value.majorId,
      xueli: this.data.Education[e.detail.value.Education],
      school_time: e.detail.value.schoolOpenTime,
      banji: e.detail.value.schoolClass,
      company: e.detail.value.company,
      zhiwei: e.detail.value.positon,
      hangye: e.detail.value.industryId,
      content: e.detail.value.personalInfo,
      address: e.detail.value.address,
      birthday: e.detail.value.birthday,
      aihao: e.detail.value.interest
    }
    wx.showLoading({
      title: '数据加载中',
      mask: true
    });
    wx.request({
      url: app.globalData.url + 'apiEditUser',
      data: person,
      method: 'POST',
      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          mask: true
        })
        wx.switchTab({
          url: '../visitcard/visitcard',
          success: function (res) {
          },
          fail: function (res) {
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '保存失败',
          duration: 2000,
          mask: true
        })
      }
    })
  }
})
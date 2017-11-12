//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        var _this = this;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var storOpenid = wx.getStorageSync('openid');
        if (storOpenid !== ''){
          _this.globalData.openid = storOpenid;
        }else{
          wx.request({
            url: this.globalData.url+'apiCheckLogin/'+res.code,
            success:function(res) {
              var json = JSON.parse(res.data);
              _this.globalData.openid = json.openid;
              // 由于 request 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (_this.openIdReadyCallback) {
                _this.openIdReadyCallback(res)
              }
              wx.setStorageSync('openid', json.openid);
              wx.request({
                url: _this.globalData.url +'apiAddUser',
                data: {openid: _this.globalData.openid},
                method: 'POST',
                success: function(res){
                },
                fail: function(res){
                  console.error(res);
                }
              })
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    openid:'',
    userInfo: null,
    url:'https://tianluyangfa.com/xiaoyouhui/public/',
    imgurl:'http://m.tianluyangfa.com/xiaoyouhui/public/images/pic/xiaoyouhui_top.jpeg',
    imgpath:'http://m.tianluyangfa.com/xiaoyouhui/public/uploads/'
  }
})
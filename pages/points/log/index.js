const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], // 充值记录
    isLoading: true, // 是否正在加载中
    page: 1, // 当前页码
    userinfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this;
    // 设置列表容器高度
    _this.setListHeight();
    _this.getUserDetail();
  },
  /**
  * 获取当前用户信息
  */
  getUserDetail() {
    let _this = this;
    App._get('user.index/detail', {}, function (result) {
      _this.setData(result.data);
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let _this = this;
    // 获取积分明细列表
    _this.getPointsLog();
  },

  /**
   * 获取积分明细列表
   */
  getPointsLog(isPage, page) {
    let _this = this;
    App._get('points.log/index', {
      page: page || 1
    }, result => {
      let resList = result.data.list,
        dataList = _this.data.list;
      if (isPage == true) {
        _this.setData({
          'list.data': dataList.data.concat(resList.data),
          isLoading: false,
        });
      } else {
        _this.setData({
          list: resList,
          isLoading: false,
        });
      }
    });
  },

  /**
   * 设置列表容器高度
   */
  setListHeight() {
    let _this = this,
      systemInfo = wx.getSystemInfoSync();
    _this.setData({
      scrollHeight: (systemInfo.windowHeight-110) * 0.98
    });
  },

  /**
   * 下拉到底加载数据
   */
  onPageDown() {
    let _this = this;
    // 已经是最后一页
    if (_this.data.page >= _this.data.list.last_page) {
      _this.setData({
        no_more: true
      });
      return false;
    }
    // 加载下一页列表
    _this.getPointsLog(true, ++_this.data.page);
  },

})
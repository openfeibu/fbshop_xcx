const App = getApp();
const pageIndex = 'category/list::';

Component({
  data: {
    scrollHeight: null,
    showView: false, // 列表显示方式
    sortType: 'all', // 排序类型
    sortPrice: false, // 价格从低到高
    number:8,
    list: {}, // 商品列表数据
    no_more: false, // 没有更多数据
    isLoading: true, // 是否正在加载中
    page: 1, // 当前页码
  },
  options: {

  },

  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  ready() {
    let _this = this;

  
    // 获取商品列表
    _this.getGoodsList();
  },
  methods: {
  /**
   * 获取商品列表
   * @param {bool} isPage 是否分页
   * @param {number} page 指定的页码
   */
  getGoodsList(isPage, page) {
    let _this = this;
    App._get('goods/lists', {
      page: page || 1,
      sortType: this.data.sortType,
      sortPrice: this.data.sortPrice ? 1 : 0,
      category_id: 0,
      listRows:this.data.number
    }, result => {
      console.log(result)
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
   * 下拉到底加载数据
   */
  bindDownLoad() {
    // 已经是最后一页
    if (this.data.page >= this.data.list.last_page) {
      this.setData({
        no_more: true
      });
      return false;
    }
    // 加载下一页列表
    this.getGoodsList(true, ++this.data.page);
  },
}

});
Component({
  
  options: {

  },

  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    diyItems: Object,
    statusBarHeight:String
  },
  methods: {
    /**
     * 跳转到搜索页面
     */
    onTargetSearch(e) {
      // 记录formid
      App.saveFormId(e.detail.formId);
      App.navigationTo('pages/search/index');
    },
  }

})
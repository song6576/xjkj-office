module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16, // 基准大小，根据设计稿的实际大小来定，例如设计稿是750px宽，那么可以设置为37.5（即1rem = 75px），或者设置为16（即1rem = 16px）
      propList: ['*'], // 可以指定转换的属性，如['font', 'font-size', 'width', 'height']等，'*'代表全部属性
      selectorBlackList: [], // 指定不转换为rem的选择器
      replace: true, // 替换包含REM的规则，而不是添加回退
      mediaQuery: false, // 允许在媒体查询中转换px
      minPixelValue: 1 // 设置要替换的最小像素值（3px will be converted）
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        path: './postcss.config.js' // 使用外部的postcss配置文件
      }
    }
  }
}
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true, // 将其设置为false来关闭ESLint
  devServer: {
    client: {
      overlay: false,
    },
  }
});
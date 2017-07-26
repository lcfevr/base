/**
 * Created by admin on 2017/6/20.
 */

var globalConfigs = {
  GLOBAL: {
    baseUrl: process.env.NODE_ENV !== '"production"' ? '"http://example.com"' : '"{!API_URL}"', // 运行时自动替换变量
  },
  BRAND: {
    name:'"base"',
    logo:'""',
    title:'""',
    cache:'""'
  }
};

module.exports = globalConfigs

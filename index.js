/**
 * Created by admin on 2017/6/20.
 */

var globalConfigs = {
  'GLOBAL': {
    'baseUrl': process.env.NODE_ENV !== '"production"' ? '"http://admin.dev.tnf.ibrand.cc/"' : '"{!API_URL}"', // 运行时自动替换变量
  },
};

module.exports = globalConfigs

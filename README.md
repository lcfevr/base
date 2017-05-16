## base

入口文件
```
app.vue

```

启动配置
```
src/main.js

```


安装
```
npm install

```
初始化
```
npm run init

```
开发环境
```
npm run dev

```

生产环境
```
npm run build

```


端口号

```
8080

```


开发环境下建议开启 source-map 便于调试

```
var config = require('./webpack.base.config');

config.devtool = '#source-map';

module.exports = config;

```



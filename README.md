
# Vue2.x+Vue-router2.x+webpack2.x基础构架

## 一、文件目录

```
│  .gitignore          # git提交忽略文件
│  package.json        # 项目配置
│  README.md           # 项目说明
│  .bablerc            # babel配置项
│  .eslintrc           # eslint配置项
│  .eslintignore       # eslint忽略项
│
│
│
├─node_modules
│
├─dist                 # 打包后生成的文件目录
├─build                # 打包后生成的文件目录
    │
│   ├─ webpack.base.config.js         # webpack 参数配置
│   │
│   ├─ webpack.dev.config.js          # webpack 开发环境配置
│   │
│   ├─ webpack.prod.config.js         # webpack 生产环境配置
│   │
│   ├─ zip.js                         # 生产环境下文件打包为zip格式
│
├─example                 # 初始化后生成的开发环境运行所需文件
│
└─src
    ├─ main.js         # 入口文件
    │
    ├─ router.js       # 路由配置 ├─ index.js                       # 全局配置(便于docker容器配置)，开发环境下访问globalConfigs，生产环境下访问window.globalConfigs
    │
    ├─ project         # 项目文件夹
    │       │
    │       ├─ page    # 各项目下的page目录
    │       │
    │       ├─ index.js # 项目参数配置（启动对应项目会加载对应的index.js）
    │
    ├─components       # 组件
    │       │
    │       └─ app.vue # 入口组件
    │
    ├─views            # 视图(即路由)
    │
    ├─assets           # 静态资源文件
    │
    ├─directives       # 自定义指令
    │
    ├─filters          # 自定义过滤器
    │
    ├─config           # 配置文件
    │
    │
    ├─utils           # 工具函数
    │   │
    │   └─ util.js # 工具函数
    │   │
    │   │
    │   └─ cache.js # 缓存文件
    │
    ├─mixin             # 混合
    │
    ├─styles           # 放置css
    │    │
    │    ├─ index.less # 入口css
    │
    │
    └─template         # 放置html模板,webpack依赖此文件生成所需的html
         │
         │
         └─ index.ejs # 默认的html模板


```


## 二、使用

### 安装
1.执行命令
```
npm install
```

2.安装完毕之后，初次运行执行以下命令,生成example目录，该目录下文件为开发环境运行所需

```
npm run init
```

3.开启服务,默认端口8080，通过[http://127.0.0.1:8080](http://127.0.0.1:8080/)访问

```
npm run dev

//默认端口8080，可通过配置参数port来更改端口   npm run dev -- --port 8081
```

4.生产环境打包

```
npm run build
```

### 说明

1.已通过webpack做代码切割，按需加载，若无需代码切割，请删除dev && prod 环境下的chunk配置

2.已处理 *.vue 文件内的 <style> 提取，若需要按需加载，请移除webpack.base.config.js下的ExtractTextPlugin配置，且移除dev && prod 中 ExtractTextPlugin 相关plugin配置

3.process.env.NODE_ENV 变量在dev 跟 prod环境下的值 分别为 'development' 跟 'production'，可根据需要自行配置

4.prod环境下打包完成会生成一个全局的config.js文件，该文件下存储了window.globalConfigs全局变量，方便docker容器配置

5.gitignore已默认将dist 跟 example 目录下的文件忽略


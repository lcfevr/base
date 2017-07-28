/**
 * Created by lcfevr on 16/6/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/app.vue';


import Config from './config/config'
import Axios from 'axios'
import Router from './project/bases/page/index/router'


Vue.use(VueRouter);


// 开启debug模式

Vue.config.debug = true;

Vue.prototype.$Config = Config;
Vue.prototype.$http = Axios;


console.log(globalConfigs)

// 路由配置


let req = require.context('./project/' + process.env.PROJECT, true, /.*router\.js$/);


let routes = [];
req.keys().forEach(p => {
  let r = req(p);
  r.default.forEach(k => routes.push(k));
});


let router = new VueRouter({
    history: process.env.NODE_ENV !== 'production',
    routes:routes
});


router.beforeEach((to,from,next) => {
    // let title = to.meta.title || Config.doc_title;
    // setPageTitle(title);

    window.scrollTo(0, 0);
    next();
});

router.afterEach(() => {

});

window.EventBus = new Vue();

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})

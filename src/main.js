/**
 * Created by lcfevr on 16/6/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/app.vue';
import Routers from './router';
import Env from './config/env';
import Config from './config/config'
import Axios from 'axios'

import Request from './utils/request'

Vue.use(VueRouter);


// 开启debug模式
Vue.config.debug = true;

Vue.prototype.$Config = Config;
Vue.prototype.$Request = Request;
Vue.prototype.$http = Axios;

window.globalConfigs = globalConfigs;

// 路由配置
let router = new VueRouter({

    history: Env.Env != 'production',
    routes:Routers
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

/**
 * Created by lcfevr on 16/6/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/app.vue';
import Routers from './router';

import Config from './config/config'
import Axios from 'axios'



Vue.use(VueRouter);


// 开启debug模式

Vue.config.debug = true;

Vue.prototype.$Config = Config;
Vue.prototype.$http = Axios;




// 路由配置
let router = new VueRouter({

    history: process.env.NODE_ENV != 'production',
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

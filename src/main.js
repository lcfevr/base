/**
 * Created by lcfevr on 16/6/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/app.vue';


import Config from './config/config'
import Axios from 'axios'



Vue.use(VueRouter);
console.log(Vue)

// 开启debug模式

Vue.config.debug = true;

Vue.prototype.$Config = Config;
Vue.prototype.$http = Axios;




// 路由配置





let routes = []

function importAll (r) {
  r.keys().forEach(key => {
    routes.push(...r(key).default)
  });

}

importAll(require.context('./project/', true, /.*router\.js$/));



console.log(routes)

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

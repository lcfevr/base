/**
 * Created by lcfevr on 16/8/22.
 */


const routers = [
    {
        path:'/',
        redirect:'/guide'
    },
    {
        path:'/guide',
        name:'guide',
        component:resolve => require(['./index.vue'], resolve),
        meta:{
            title:'导航'
        }
    }
]
export default routers;

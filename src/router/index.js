import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入页面级组件  [import 静态引入,预编译时就引入，可以加快首屏显示速度]
import Layout from '@/layout';
import Login from '@/views/login';
// import { component } from 'vue/types/umd';

// 

Vue.use(VueRouter);
// 配置页面级组件和路由的一一对应关系
// const routes = [{
//         path: '/login',
//         component: Login,
//     },
//     {
//         path: '/',
//         redirect: '/home',
//     },
//     // 首页
//     {
//         path: '/home',
//         component: Layout,
//         children: [{
//             path: '',
//             // 路由懒加载，当输入的路由地址与之匹配的时候才会加载词此组件
//             component: () => {
//                 return import ('@/views/home');
//             }
//         }]
//     },
//     // 订单
//     {
//         path: '/order',
//         component: Layout,
//         children: [{
//             path: '',
//             component: () => {
//                 return import ('@/views/order');
//             }
//         }]
//     },
//     // 商品管理
//     {
//         path: '/goods',
//         component: Layout,
//         redirect: '/goods/goods-list',
//         children: [{
//             path: '/goods/goods-add',
//             // 路由懒加载，当输入的路由地址与之匹配的时候才会加载词此组件
//             component: () => {
//                 return import ('@/views/goods/goods-add.vue');
//             }
//         }, {
//             path: '/goods/goods-cate',
//             component: () => {
//                 return import ('@/views/goods/goods-cate.vue');
//             }
//         }, {
//             path: '/goods/goods-list',
//             component: () =>
//                 import ('@/views/goods/goods-list.vue')
//         }]
//     },
//     // 店铺管理
//     {
//         path: '/shop',
//         component: Layout,
//         children: [{
//             path: '/shop',
//             component: () => {
//                 return import ('@/views/shop/shop.vue');
//             }
//         }]
//     },
//     // 账号管理
//     {
//         path: '/account',
//         component: Layout,
//         redirect: '/account/account-list',
//         children: [{
//                 path: '/account/account-add',
//                 component: () => {
//                     return import ('@/views/account/account-add.vue');
//                 }
//             },
//             {
//                 path: '/account/account-list',
//                 component: () => {
//                     return import ('@/views/account/account-list.vue');
//                 }
//             }, {
//                 path: '/account/account-modify',
//                 component: () => {
//                     return import ('@/views/account/password-modify.vue');
//                 }
//             }, {
//                 path: '/account/account-person',
//                 component: () => {
//                     return import ('@/views/account/person.vue');
//                 }
//             }
//         ]
//     },
//     // 销售统计
//     {
//         path: '/total',
//         component: Layout,
//         redirect: '/total/total-goods',
//         children: [{
//                 path: '/total/total-order',
//                 component: () => {
//                     return import ('@/views/total/total-order.vue');
//                 }
//             },
//             {
//                 path: '/total/total-goods',
//                 component: () => {
//                     return import ('@/views/total/total-goods.vue');
//                 }
//             }
//         ]
//     },
// ]
const routes = [{
        path: '/login',
        component: Login
    },
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: Layout,
        children: [{
            path: '',
            component: () => {
                return import ('@/views/home')
            }
        }]
    },
    {
        path: '/order',
        component: Layout,
        children: [{
            path: '/order',
            component: () => {
                return import ('@/views/order')
            }
        }]
    },
    {
        path: '/goods',
        component: Layout,
        redirect: '/goods/goods-list',
        children: [{
            path: '/goods/goods-list',
            component: () => {
                return import ('@/views/goods/goods-list.vue')
            }
        }, {
            path: '/goods/goods-add',
            component: () => {
                return import ('@/views/goods/goods-add.vue')
            }
        }, {
            path: '/goods/goods-cate',
            component: () => {
                return import ('@/views/goods/goods-cate.vue')
            }
        }]
    },
    {
        path: '/shop',
        component: Layout,
        children: [{
            path: '/shop',
            component: () => {
                return import ('@/views/shop/shop.vue')
            }
        }]
    },
    {
        path: '/account',
        component: Layout,
        redirect: '/account/account-list',
        children: [{
                path: '/account/account-list',
                component: () => {
                    return import ('@/views/account/account-list.vue');
                }
            },
            {
                path: '/account/account-add',
                component: () => {
                    return import ('@/views/account/account-add.vue');
                }
            },
            {
                path: '/account/password-modify',
                component: () => {
                    return import ('@/views/account/password-modify.vue');
                }
            },
            {
                path: '/account/person',
                component: () => {
                    return import ('@/views/account/person.vue');
                }
            }
        ]
    },
    {
        path: '/total',
        component: Layout,
        redirect: '/total/total-goods',
        children: [{
            path: '/total/total-goods',
            component: () => {
                return import ('@/views/total/total-goods.vue')
            }
        }, {
            path: '/total/total-order',
            component: () => {
                return import ('@/views/total/total-order.vue')
            }
        }]
    },
    // 404页面
    {
        path: '*', // *代表全部生效的地址
        redirect: '/404', // 将匹配不到的地址接入404页面
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/error404'),
    }
]

const router = new VueRouter({
    routes
})

export default router
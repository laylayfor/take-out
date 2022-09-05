import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入页面级组件  [import 静态引入,预编译时就引入，可以加快首屏显示速度]
import Layout from '@/layout';
import Login from '@/views/login';
import Register from '@/views/register';
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

// 清除掉原地跳转报错
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [{
        path: '/login',
        component: Login
    }, {
        path: '/register',
        component: Register,
    },
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: Layout,
        meta: { path: '/home', title: '首页' },
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
        meta: { path: '/order', title: '订单' },
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
        meta: { path: '/goods', title: '商品管理' },
        children: [{
            path: '/goods/goods-list',
            meta: { path: '/goods/goods-list', title: '商品列表' },
            component: () => {
                return import ('@/views/goods/goods-list.vue')
            }
        }, {
            path: '/goods/goods-add',
            meta: { path: '/goods/goods-add', title: '商品添加' },

            component: () => {
                return import ('@/views/goods/goods-add.vue')
            }
        }, {
            path: '/goods/goods-cate',
            meta: { path: '/goods/goods-cate', title: '商品分类' },
            component: () => {
                return import ('@/views/goods/goods-cate.vue')
            }
        }]
    },
    {
        path: '/shop',
        component: Layout,
        meta: { path: '/shop', title: '店铺管理' },
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
        meta: { path: '/account', title: '账号管理' },
        children: [{
                path: '/account/account-list',
                meta: { path: '/account/account-list', title: '账号列表' },
                component: () => {
                    return import ('@/views/account/account-list.vue');
                }
            },
            {
                path: '/account/account-add',
                meta: { path: '/account/account-add', title: '添加账号' },
                component: () => {
                    return import ('@/views/account/account-add.vue');
                }
            },
            {
                path: '/account/password-modify',
                meta: { path: '/account/password-modify', title: '修改密码' },
                component: () => {
                    return import ('@/views/account/password-modify.vue');
                }
            },
            {
                path: '/account/person',
                meta: { path: '/account/person', title: '个人中心' },
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
        meta: { path: '/total', title: '销售统计' },
        children: [{
            path: '/total/total-goods',
            meta: { path: '/total/total-goods', title: '商品统计' },
            component: () => {
                return import ('@/views/total/total-goods.vue')
            }
        }, {
            path: '/total/total-order',
            meta: { path: '/total/total-order', title: '订单统计' },
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
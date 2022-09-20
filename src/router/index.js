// import Vue from "vue";
// import VueRouter from "vue-router";

// 引入页面级组件  [import 静态引入,预编译时就引入，可以加快首屏显示速度]
import Layout from "@/layout";
import Login from "@/views/login";
import local from "@/utils/local";


// Vue.use(VueRouter);
// 配置页面级组件和路由的一一对应关系

// 清除掉原地跳转报错
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};
/** 路由一分为三： 静态路由、动态路由、错误路由 */
// 静态路由，所有人都能看
const routes = [{
        path: "/login",
        component: Login,
        hidden: true, // 加上hidden字段，表明不是菜单
    },
    {
        path: "/",
        redirect: "/home",
        hidden: true, // 加上hidden字段，表明不是菜单
    },
    {
        path: "/home",
        component: Layout,
        meta: { icon: "iconfont icon-home", path: "/home", title: "首页" },
        children: [{
            path: "/home",
            component: () => {
                return import ("@/views/home");
            },
        }, ],
    },
];
// 动态路由，区分权限
const dynamicRoutes = [{
        path: "/order",
        component: Layout,
        meta: {
            icon: "iconfont icon-order",
            path: "/order",
            title: "订单",
            roles: ["super"],
        },
        children: [{
                path: "/order",
                component: () => {
                    return import ("@/views/order/index.vue");
                },
            },
            {
                path: "/order/order-detail",
                hidden: true, // 加上hidden字段，表明不是菜单
                meta: { path: "/order/order-detail", title: "订单详情" },
                component: () => {
                    return import ("@/views/order/order-detail.vue");
                },
            },
        ],
    },
    {
        path: "/goods",
        component: Layout,
        redirect: "/goods/goods-list",
        meta: { icon: "iconfont icon-goods", path: "/goods", title: "商品管理" },
        children: [{
                path: "/goods/goods-list",
                meta: { path: "/goods/goods-list", title: "商品列表" },
                component: () => {
                    return import ("@/views/goods/goods-list.vue");
                },
            },
            {
                path: "/goods/goods-add",
                meta: { path: "/goods/goods-add", title: "商品添加", roles: ["super"] },

                component: () => {
                    return import ("@/views/goods/goods-add.vue");
                },
            },
            {
                path: "/goods/goods-cate",
                meta: {
                    path: "/goods/goods-cate",
                    title: "商品分类",
                },
                component: () => {
                    return import ("@/views/goods/goods-cate.vue");
                },
            },
        ],
    },
    {
        path: "/shop",
        component: Layout,
        meta: {
            icon: "iconfont icon-shop",
            path: "/shop",
            title: "店铺管理",
            roles: ["super"],
        },
        children: [{
            path: "/shop",
            component: () => {
                return import ("@/views/shop/shop.vue");
            },
        }, ],
    },
    {
        path: "/account",
        component: Layout,
        redirect: "/account/account-list",
        meta: {
            icon: "iconfont icon-account",
            path: "/account",
            title: "账号管理",
        },
        children: [{
                path: "/account/account-list",
                meta: {
                    path: "/account/account-list",
                    title: "账号列表",
                    roles: ["super"],
                },
                component: () => {
                    return import ("@/views/account/account-list.vue");
                },
            },
            {
                path: "/account/account-add",
                meta: {
                    path: "/account/account-add",
                    title: "添加账号",
                    roles: ["super"],
                },
                component: () => {
                    return import ("@/views/account/account-add.vue");
                },
            },
            {
                path: "/account/password-modify",
                meta: { path: "/account/password-modify", title: "修改密码" },
                component: () => {
                    return import ("@/views/account/password-modify.vue");
                },
            },
            {
                path: "/account/person",
                meta: { path: "/account/person", title: "个人中心" },
                component: () => {
                    return import ("@/views/account/person.vue");
                },
            },
        ],
    },
    {
        path: "/total",
        component: Layout,
        redirect: "/total/total-goods",
        meta: {
            icon: "iconfont icon-total",
            path: "/total",
            title: "销售统计",
            roles: ["super"],
        },
        children: [{
                path: "/total/total-goods",
                meta: { path: "/total/total-goods", title: "商品统计" },
                component: () => {
                    return import ("@/views/total/total-goods.vue");
                },
            },
            {
                path: "/total/total-order",
                meta: { path: "/total/total-order", title: "订单统计" },
                component: () => {
                    return import ("@/views/total/total-order.vue");
                },
            },
        ],
    },
];
// 错误路由
const errorRoutes = [
    // 404页面
    {
        path: "*", // *代表全部生效的地址
        redirect: "/404", // 将匹配不到的地址接入404页面
    },
    {
        path: "/404",
        component: () =>
            import ("@/views/error404"),
    },
];
const router = new VueRouter({
    routes,
});
/**是否有权限 */
const isPermission = (role, route) => {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(role);
    } else {
        // 没有meta 且没配置roles字段的，所有人都能访问
        return true;
    }
};
/**动态计算路由 */
const calcDynamic = (role, routes) => {
    let temp = [];
    routes.forEach((v) => {
        // 循环，如果当前路由有权限，就push进去
        if (isPermission(role, v)) {
            if (v.children && v.children.length) {
                v.children = calcDynamic(role, v.children);
            }
            temp.push(v);
        }
    });
    return temp;
};
/**计算菜单 */
const filterMenu = (routes) => {
    let temp = [];
    routes.forEach((v) => {
        // 判断当前路由是否有hidden字段
        if (!v.hidden) {
            if (v.children && v.children.length) {
                v.children = filterMenu(v.children);
            }
            temp.push(v);
            // console.log("temp1 :>> ", temp);
        }
    });
    return temp;
};
/**创建路由函数*/
export const createRouter = () => {
    const role = local.get("role");
    // 如果没有角色，直接return
    if (!role) {
        return;
    }
    // 计算出可以使用的路由
    const accessRoutes = calcDynamic(role, dynamicRoutes);
    // 把筛选后的路由添加进路由里面
    router.addRoutes([...accessRoutes, ...errorRoutes]);
    // 计算菜单 把不是菜单的剔除掉
    let menu = filterMenu([...routes, ...accessRoutes]);
    // console.log(111);
    // console.log("menu :>> ", menu);
    // 把计算出来的菜单存入本地
    local.set("menu", menu);
};
// 初始化调用一次
createRouter();
// 路由全局前置守卫
router.beforeEach((to, from, next) => {
    /**
     * to 去哪里
     * from 从哪来
     * next() 放行
     */
    // console.log(to);
    // console.log('---------');
    // console.log(next);
    const token = localStorage.getItem("t_k");
    // 如果有token 就跳转，如果没有就跳转到login
    if (token) {
        next();
    } else {
        if (to.path === "/login") {
            next();
        } else {
            next("/login");
        }
    }
});

export default router;
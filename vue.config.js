module.exports = {
    productionSourceMap: false, // 去掉打包时生成的map文件
    assetsDir: "static", // 静态资源目录名称
    publicPath: "./", // 打包后的位置，如果不设置这个静态资源会报错
    css: {
        //css处理器
        loaderOptions: {
            sass: {
                //prependData: `@import "~@/assets/scss/_setting.scss";`, 前面加不加~都行 也可以混合
                prependData: `@import "@/assets/scss/_setting.scss";@import "~@/assets/scss/_mixin.scss";`,
            },
        },
    },
    // devServer: {
    //     host: "localhost", // 主机地址
    //     port: "3000", // 端口
    //     open: true, // 热启动
    //     proxy: {
    //         "/api": {
    //             target: "http://localhost:5000", // 真实地址
    //             changeOrigin: true, // 是否跨域
    //             ws: true,
    //             pathRewrite: {
    //                 "/api": "/", // 把api重新变为 /
    //             },
    //         },
    //     },
    // },
    configureWebpack: (config) => {
        return {
            devServer: {
                host: "localhost", // 主机地址
                port: "3000", // 端口
                open: true, // 热启动
                proxy: {
                    "/": {
                        target: "http://localhost:5000", // 真实地址
                        changeOrigin: true, // 是否跨域
                        ws: true,
                        pathRewrite: {
                            "^/": "/", // 把api重新变为 /
                        },
                    },
                },
            },
            // 外部扩展
            externals: {
                "echarts": "echarts",
                "vue": "Vue",
                "element-ui": "ELEMENT",
                "vue-router": "VueRouter",
            },
        };
    },
};
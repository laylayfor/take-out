module.exports = {
    // productionSourceMap: false,
    // assetsDir: 'static',
    // publicPath: './',
    css: { //css处理器
        loaderOptions: {
            sass: {
                //prependData: `@import "~@/assets/scss/_setting.scss";`, 前面加不加~都行 也可以混合
                prependData: `@import "@/assets/scss/_setting.scss";@import "~@/assets/scss/_mixin.scss";`,
            },
        },
    },
    configureWebpack: config => {
        return {
            devServer: {
                host: 'localhost', // 主机地址
                port: "3000", // 端口
                open: true, // 热启动
                proxy: {
                    '/': {
                        target: 'http://localhost:5000', // 真实地址
                        changeOrigin: true, // 是否跨域
                        ws: true,
                        pathRewrite: {
                            '^/': '/' // 把api重新变为 /
                        }
                    }
                }

            },

        }
    }


}
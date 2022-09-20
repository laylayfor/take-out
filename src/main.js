// import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入 element-ui
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// 引入全局过滤器
import * as filters from '@/filters';
// 循环注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
})

// 引入默认样式
import './assets/css/property.css';
import './assets/css/reset.css';
// 引入字体图标
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false

// 创建一个中央事件总线
Vue.prototype.$bus = new Vue();
// 使用element-ui
// Vue.use(ElementUI);
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
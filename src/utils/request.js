/* 工具函数层 */
import axios from "axios";

import router from '@/router'

import local from '@/utils/local';

// 引入message弹窗
import { Message } from 'element-ui';
// 默认请求地址
// axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.baseURL = '';
// 默认超时时间
axios.defaults.timeout = 10000;
// 请求拦截器: 携带统一参数
axios.interceptors.request.use((config) => {
    const token = local.get('t_k');
    // 在config.headers里面配置一个和后端商议的字段去携带token
    config.headers.authorization = token;
    // config 请求信息对象
    // console.log('请求拦截器', config);
    return config;
}, (err) => {
    console.log(err);
    return Promise.reject(err);
});
// 响应拦截器
axios.interceptors.response.use((response) => {
    // console.log('响应拦截器:', response);
    // 统一处理状态码
    let { code, msg } = response.data;

    if (code === 0) {
        Message.success(msg);
        // console.log('响应式拦截器111');
    }
    if (code === 1) {
        Message.success(msg);
    }
    if (code === 5001) {
        Message.success(msg);
    }
    return response
}, (err) => {
    let { status } = err.response;
    let { code } = err;
    let { message } = err;
    if (status === 404) {
        Message.error(message)
    }
    // 网络超时
    if (code === 'ECONNABORTED') {
        Message.error('网络超时!')
    }
    // 无效的token
    if (status === 401) {
        Message.error('401 无效的token!');
        local.clear();
        // 获取当前地址
        let path = router.currentRoute.path
            // 跳转到登录页面地址，并携带当前地址
        router.push({ path: '/login', query: { redirect: path } });
    }
    return Promise.reject(err);
});
// 导出配置好的axios
export default axios;
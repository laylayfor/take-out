/* 工具函数层 */
import axios from "axios";
// 默认请求地址
axios.defaults.baseURL = 'http://localhost:5000';
// 默认超时时间
axios.defaults.timeout = 10000;
// 请求拦截器: 携带统一参数
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('t_k');
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
        return response
    }, (err) => {
        return Promise.reject(err);
    })
    // 导出配置好的axios
export default axios;
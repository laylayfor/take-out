/* 用户接口模块 */

// 引入工具函数 reques.js
import request from '@/utils/request';

/**登录接口 */
// /users/checkLogin
export const checkLoginReq = (data) => {
    return request({
        url: '/users/checkLogin',
        method: 'post',
        data: data,
    })
}

/**添加账号 */
export const userAddReq = (data) => {
    return request({
        url: 'users/add',
        method: 'post',
        data,
    })
};
/**获取账号列表 */
export const getUserListReq = (data) => {
    return request({
        url: '/users/list',
        method: 'get',
        params: data,
    });
};
/**删除账号 */
export const delUserReq = (params) => {
    return request({
        url: '/users/del',
        method: 'get',
        params,
    })
};
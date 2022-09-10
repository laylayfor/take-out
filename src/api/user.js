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
export const getUserListReq = (params) => {
    return request({
        url: '/users/list',
        method: 'get',
        params,
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
/**批量删除 */
export const batchDelUserReq = (params) => {
    return request({
        url: '/users/batchdel',
        method: 'get',
        params,
    })
};
/**获取管理员信息 */
export const getUserMsgReq = (params) => {
    return request({
        url: '/users/info',
        method: 'get',
        params,
    })
};
/**头像上传 */
export const editAvatarReq = (params) => {
    return request({
        url: '/users/avataredit',
        method: 'get',
        params,
    })
};
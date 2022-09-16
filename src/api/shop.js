/* 店铺接口模块 */
import request from '@/utils/request';
/** 获取店铺详情 */

export const getShopDetailReq = (params) => {
    return request({
        url: '/shop/info',
        method: 'get',
        params,
    })
}
/**订单接口模块 */
import request from '@/utils/request';
export const getOrderListReq = (params) => {
    return request({
        url: '/order/list',
        method: 'get',
        params,
    })
}
/**订单接口模块 */
import request from "@/utils/request";
export const getOrderListReq = (params) => {
    return request({
        url: "/order/list",
        method: "get",
        params,
    });
};
/** 获取订单详情 */
export const getOrderDetailReq = (params) => {
    return request({
        url: "/order/detail",
        method: "get",
        params,
    });
};
/**商品统计接口 */
export const totalDataReq = (params) => {
    return request({
        url: "/order/ordertotal",
        method: "get",
        params,
    });
};
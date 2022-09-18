/** 后台首页接口 */
import request from "@/utils/request";
/** 首页报表 */
export const getTotalDataReq = (params) => {
    return request({
        url: "/order/totaldata",
        method: "get",
        params,
    });
};
/** 订单报表 */
export const getOrderTotalDataReq = (params) => {
    return request({
        url: "/order/ordertotal",
        method: "get",
        params,
    });
};
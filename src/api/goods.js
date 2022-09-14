/** 商品管理模块 */
import request from '@/utils/request';

/** 添加分类 */
export const addCateReq = (data) => {
    return request({
        url: '/goods/addcate',
        method: 'post',
        data,
    })
};
/**获取商品分类 */
export const getCateListReq = (params) => {
    return request({
        url: '/goods/catelist',
        method: 'get',
        params,
    })
};
/** 修改分类 */
export const editCateReq = (data) => {
    return request({
        url: '/goods/editcate',
        method: 'post',
        data,
    })
};
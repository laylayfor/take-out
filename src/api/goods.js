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
/* 删除分类 */
export const delCateReq = (params) => {
    return request({
        url: '/goods/delcate',
        method: 'get',
        params,
    })
};
/** 查询所有商品分类名称 */
export const allCateGoriesReq = (params) => {
    return request({
        url: '/goods/categories',
        method: 'get',
        params,
    })
};
/** 商品图片上传 */
export const uploadImgReq = (data) => {
    return request({
        url: '/goods/goods_img_upload',
        method: 'post',
        data,
    })
};
/** 添加商品 */
export const addGoodsReq = (data) => {
    return request({
        url: '/goods/add',
        method: 'post',
        data,
    })
};
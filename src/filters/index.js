export const formatDate = (data, changeNmuber) => {
    // 引入时间，构建date对象
    let time = new Date(data);

    let year = time.getFullYear(); // 年
    let month = time.getMonth() + 1; // 月
    let date = time.getDate(); // 日
    let week = time.getDay(); // 星期
    let h = time.getHours(); // 时
    let m = time.getMinutes(); // 分
    let s = time.getSeconds(); // 秒

    // padStart(length, number) 用于在长度不足 length位时在开头添加 number字符

    if (changeNmuber === 1) {
        // a 为 1 时返回 年-月-日
        return [year, month, date].map(v => {
            return String(v).padStart(2, '0');
        }).join('-');
    } else if (changeNmuber === 2) {
        // a 为 2 时返回 时:分:秒
        return [h, m, s].map(v => {
            return String(v).padStart(2, '0');
        }).join(':');
    } else {
        // 返回 年-月-日 时:分:秒 
        return [year, month, date].map(v => {
            return String(v).padStart(2, '0');
        }).join('-') + ' ' + [h, m, s].map(v => {
            return String(v).padStart(2, '0');
        }).join(':');
    }
};
// 处理数字，超过1000 加逗号
export const formatNum = (number) => {
    console.log('这是个过滤器!');
}
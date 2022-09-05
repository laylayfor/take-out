 // 用户名校验函数
 export const checkAccount = (rule, value, callback) => {
     // console.log('rule', rule);
     // console.log('value', value);
     // console.log('callback', callback);
     // 1, 非空校验
     if (value == '') {
         callback(new Error('请输入用户名!'));
     }
     // 2. 正则校验
     else if (!/^[a-zA-Z0-9_|\u4e00-\u9fa5]{2,8}$/.test(value)) {
         callback(new Error('请输入2到8位（字母，数字，下划线,中文）'));
     }
     // 3. 成功调用callback();
     else {
         callback();
     }
 }
 export const checkPassword = (rule, value, callback) => {
     if (value == '') {
         callback(new Error('请输入密码!'));
     } else if (!/^[a-zA-Z0-9_]{6,16}$/.test(value)) {
         callback(new Error('请输入6到16位（字母，数字，下划线）'));
     } else {
         callback();
     }
 }
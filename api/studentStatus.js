const request = require('~/utils/request.js');
const Api = require('~/api/apiUrl/');


//后台接口

//用户列表
const list = query => {
    return request({
        url: Api.studentStatus.list,
        method: 'get',
        params: query
    });
};

//导入
const importThis = query => {
    return request({
        url: Api.studentStatus.importThis,
        method: 'post',
        data: query
    });
};

//修改
const edit = query => {
    return request({
        url: Api.studentStatus.edit,
        method: 'post',
        data: query
    });
};


//调整学籍
const stutus = query => {
    return request({
        url: Api.studentStatus.stutus,
        method: 'post',
        data: query
    });
};



export default {
    importThis,
    list,
    stutus,
    edit,
}
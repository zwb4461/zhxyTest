const request = require('~/utils/request.js');
const Api = require('~/api/apiUrl/');

//列表
const list = query => {
    return request({
        url: Api.formSetting.list,
        method: 'get',
        params: query
    });
};

//添加
const add = query => {
    return request({
        url: Api.formSetting.add,
        method: 'post-json',
        data: query
    });
};
//修改
const edit = query => {
    return request({
        url: Api.formSetting.edit,
        method: 'post-json',
        data: query
    });
};

//查找
const find = query => {
    return request({
        url: Api.formSetting.find,
        method: 'get',
        params: query
    });
};

//删除
const del = query => {
    return request({
        url: Api.formSetting.del,
        method: 'get',
        params: query
    });
};





const url = query => {
    return request({
        url: Api.formSetting.url,
        method: 'post',
        data: query
    });
};






export default {
    list,
    add,
    edit,
    find,
    del,
    url
}
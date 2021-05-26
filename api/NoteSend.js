const request = require('~/utils/request.js');
const Api = require('~/api/apiUrl/');

//用户列表
const list = query => {
    return request({
        url: Api.NoteSend.list,
        method: 'get',
        params: query
    });
};

const add = query => {
    return request({
        url: Api.NoteSend.add,
        method: 'post',
        data: query
    });
};

const edit = query => {
    return request({
        url: Api.NoteSend.edit,
        method: 'post',
        data: query
    });
};

const del = query => {
    return request({
        url: Api.NoteSend.del,
        method: 'get',
        params: query
    });
};

//发送报名短信
const sendAdd = query => {
    return request({
        url: Api.NoteSend.sendAdd,
        method: 'post-json',
        data: query
    });
};

//发送修改短信
const sendEdit = query => {
    return request({
        url: Api.NoteSend.sendEdit,
        method: 'post-json',
        data: query
    });
};



export default {
    list,
    add,
    edit,
    del,
    sendAdd,
    sendEdit,
}
const request = require('../../utils/request.js');
const Api = require('../apiUrl');



//添加
const add = query => {
    return request({
        url: Api.logger.login.add,
        method: 'post',
        data: query
    });
};




//列表
const list = query => {
    return request({
        url: Api.logger.login.list,
        method: 'get',
        params: query
    });
};




export default {
    add,
    list
}
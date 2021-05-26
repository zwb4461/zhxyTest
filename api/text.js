const request = require('../utils/request.js');
const Api = require('./apiUrl/');

//用户列表
const list = query => {
    return request({
        url: Api.reportStudent.list,
        method: 'post',
        data: query
    });
};

const add = query => {
    return request({
        url: Api.reportStudent.add,
        method: 'post',
        data: query
    });
};

const edit = query => {
    return request({
        url: Api.reportStudent.edit,
        method: 'post',
        data: query
    });
};

const del = query => {
    return request({
        url: Api.reportStudent.del,
        method: 'post',
        data: query
    });
};

const find = query => {
    return request({
        url: Api.reportStudent.find,
        method: 'post',
        data: query
    });
};




export default {
    list,
    add,
    edit,
    del,
    find
}
// module.exports = exports['default'];

// module.exports = {
//     list,
//     add,
//     edit,
//     del,
//     find
// }
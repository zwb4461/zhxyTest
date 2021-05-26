
    const request = require('~/utils/request.js');
    const Api = require('~/api/apiUrl/');

    //用户列表
    const list = query => {
        return request({
            url: Api.planStudent.list,
            method: 'post',
            data: query
        });
    };
    //添加数据(以导入的形式)
    const add = query => {
        return request({
            url: Api.planStudent.add,
            method: 'post-json',
            data: query
        });
    };

    const edit = query => {
        return request({
            url: Api.planStudent.edit,
            method: 'post',
            data: query
        });
    };

    const del = query => {
        return request({
            url: Api.planStudent.del,
            method: 'post',
            data: query
        });
    };
    





    export default {
        list,
        add,
        edit,
        del
    }
    
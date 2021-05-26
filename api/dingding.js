const request = require('~/utils/request.js');
const Api = require('~/api/apiUrl/');




//钉钉登录
const login = (query, port, ip) => {
    return request({
        url: `http://${ip}:${port}/dingtalk/login`,
        method: 'get',
        params: query
    });
};

//钉钉用户列表
const user = query => {
    return request({
        url: Api.dingding.user,
        method: 'get',
        params: query
    });
};

//钉钉用户权限分配
const userPower = query => {
    return request({
        url: Api.dingding.userPower,
        method: 'post',
        data: query
    });
};

//查找钉钉用户
const findUser = query => {
    return request({
        url: Api.dingding.findUser,
        method: 'get',
        params: query
    });
};

//钉钉部门列表
const dep = query => {
    return request({
        url: Api.dingding.dep,
        method: 'get',
        params: query
    });
};

//钉钉部门同步
const asyncDep = query => {
    return request({
        url: Api.dingding.asyncDep,
        method: 'post',
        data: query
    });
};

//钉钉人员同步
const asyncUser = query => {
    return request({
        url: Api.dingding.asyncUser,
        method: 'get',
        params: query
    });
};




export default {
    user,
    userPower,
    dep,
    login,
    findUser,
    asyncDep,
    asyncUser
}
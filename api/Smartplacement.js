const request = require('../utils/request.js');
const Api = require('./apiUrl');

//待分班学生列表
const student = query => {
    return request({
        url: Api.Smartplacement.student,
        method: 'post',
        data: query
    });
};

//智能分班
const autoSmart = query => {
    return request({
        url: Api.Smartplacement.autoSmart,
        method: 'post-json',
        data: query
    });
};

//随机分班
const autoRandom = query => {
    return request({
        url: Api.Smartplacement.autoRandom,
        method: 'post-json',
        data: query
    });
};

//手动分班
const submit = query => {
    return request({
        url: Api.Smartplacement.submit,
        method: 'post-json',
        data: query
    });
};

//重置学生的分班信息
const initStudent = query => {
    return request({
        url: Api.Smartplacement.initStudent,
        method: 'post-json',
        data: query
    });
};

//查找分班信息
const find = query => {
    return request({
        url: Api.Smartplacement.find,
        method: 'post',
        data: query
    });
};

//分班确认
const confirm = query => {
    return request({
        url: Api.Smartplacement.confirm,
        method: 'post',
        data: query
    });
};
const updateClass = query => {
  return request({
    url: Api.Smartplacement.updateClass,
    method: "post",
    data: query
  });
};




export default {
  student,
  autoSmart,
  autoRandom,
  submit,
  initStudent,
  find,
  confirm,
  updateClass
};
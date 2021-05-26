const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

//h-api
const hList = query => {
  return request({
    url: Api.reportStudent.hList,
    method: "post",
    data: query
  });
};

//后台接口

//用户列表
const list = query => {
  return request({
    url: Api.reportStudent.list,
    method: "post",
    data: query
  });
};

const add = query => {
  return request({
    url: Api.reportStudent.add,
    method: "post",
    data: query
  });
};

const addTable = query => {
  return request({
    url: Api.reportStudent.addTable,
    method: "post-json",
    data: query
  });
};

const edit = query => {
  return request({
    url: Api.reportStudent.edit,
    method: "post",
    data: query
  });
};

const del = query => {
  return request({
    url: Api.reportStudent.del,
    method: "post",
    data: query
  });
};

const find = query => {
  return request({
    url: Api.reportStudent.find,
    method: "post",
    data: query
  });
};

export default {
  hList,
  list,
  add,
  edit,
  del,
  find,
  addTable
};

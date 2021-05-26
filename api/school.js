const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

//用户列表
const list = query => {
  return request({
    url: Api.school.list,
    method: "get",
    params: query
  });
};

const add = query => {
  return request({
    url: Api.school.add,
    method: "post",
    data: query
  });
};

const edit = query => {
  return request({
    url: Api.school.edit,
    method: "post",
    data: query
  });
};

const del = query => {
  return request({
    url: Api.school.del,
    method: "post",
    data: query
  });
};
const upload = query => {
  return request({
    url: Api.school.upload,
    method: "post",
    data: query
  });
};
const saveRole = query => {
  return request({
    url: Api.school.saveRole,
    method: "post-json",
    data: query
  });
};
const seeRole = query => {
  return request({
    url: Api.school.seeRole,
    method: "post-json",
    data: query
  });
};
const delRole = query => {
  return request({
    url: Api.school.delRole,
    method: "post",
    data: query
  });
};

export default {
  list,
  add,
  edit,
  del,
  upload,
  saveRole,
  seeRole,
  delRole
};

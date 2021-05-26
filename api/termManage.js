const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

//列表
const find = query => {
  return request({
    url: Api.termManage.find,
    method: "post",
    data: query
  });
};
const del = query => {
  return request({
    url: Api.termManage.del,
    method: "post",
    data: query
  });
};

const edit = query => {
  return request({
    url: Api.termManage.edit,
    method: "post-json",
    data: query
  });
};
const add = query => {
  return request({
    url: Api.termManage.add,
    method: "post-json",
    data: query
  });
};

export default {
  find,
  edit,
  del,
  add
};

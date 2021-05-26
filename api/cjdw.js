const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

//列表
const find = query => {
  return request({
    url: Api.cjdw.find,
    method: "post",
    data: query
  });
};

//添加
const add = query => {
  return request({
    url: Api.cjdw.add,
    method: "post-json",
    data: query
  });
};
//修改
const edit = query => {
  return request({
    url: Api.cjdw.edit,
    method: "post-json",
    data: query
  });
};

//删除
const del = query => {
  return request({
    url: Api.cjdw.del,
    method: "post",
    data: query
  });
};

export default {
  add,
  edit,
  del,
  find
};

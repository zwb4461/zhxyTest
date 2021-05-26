const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

const edit = query => {
  return request({
    url: Api.baoxiu.edit,
    method: "post-json",
    data: query
  });
};
const find = query => {
  return request({
    url: Api.baoxiu.find,
    method: "post-json",
    data: query
  });
};
const del = query => {
  return request({
    url: Api.baoxiu.del,
    method: "post",
    data: query
  });
};

export default {
  edit,
  del,
  find
};

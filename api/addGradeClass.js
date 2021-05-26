const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

const add = query => {
  return request({
    url: Api.addGradeClass.add,
    method: "post-json",
    data: query
  });
};
const find = query => {
  return request({
    url: Api.addGradeClass.find,
    method: "post",
    data: query
  });
};
const del = query => {
  return request({
    url: Api.addGradeClass.del,
    method: "post",
    data: query
  });
};
const loginScore = query => {
  return request({
    url: Api.addGradeClass.loginScore,
    method: "post",
    data: query
  });
};
const edit = query => {
  return request({
    url: Api.addGradeClass.edit,
    method: "post-json",
    data: query
  });
};

export default {
  add,
  find,
  del,
  edit,
  loginScore
};

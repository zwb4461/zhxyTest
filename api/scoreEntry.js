const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

const find = query => {
  return request({
    url: Api.scoreEntry.find,
    method: "post-json",
    data: query
  });
};
const del = query => {
  return request({
    url: Api.scoreEntry.del,
    method: "post",
    data: query
  });
};
const findPy = query => {
  return request({
    url: Api.scoreEntry.findPy,
    method: "post",
    data: query
  });
};
const edit = query => {
  return request({
    url: Api.scoreEntry.edit,
    method: "post-json",
    data: query
  });
};
const addEdit = query => {
  return request({
    url: Api.scoreEntry.addEdit,
    method: "post-json",
    data: query
  });
};
const insertComment = query => {
  return request({
    url: Api.scoreEntry.insertComment,
    method: "post-json",
    data: query
  });
};
const updateComment = query => {
  return request({
    url: Api.scoreEntry.updateComment,
    method: "post-json",
    data: query
  });
};
const seeSiji = query => {
  return request({
    url: Api.scoreEntry.seeSiji,
    method: "post",
    data: query
  });
};
const deleteComment = query => {
  return request({
    url: Api.scoreEntry.deleteComment,
    method: "post",
    data: query
  });
};
const testStuScore = query => {
  return request({
    url: Api.scoreEntry.testStuScore,
    method: "get",
    params: query
  });
};

export default {
  find,
  del,
  edit,
  findPy,
  addEdit,
  seeSiji,
  testStuScore,
  insertComment,
  updateComment,
  deleteComment
};

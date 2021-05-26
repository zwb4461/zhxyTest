const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

const add = query => {
  return request({
    url: Api.twManage.add,
    method: "post-json",
    data: query
  });
};
const del = query => {
  return request({
    url: Api.twManage.del,
    method: "post",
    data: query
  });
};

const find = query => {
  return request({
    url: Api.twManage.find,
    method: "post-json",
    data: query
  });
};
const selectSport = query => {
  return request({
    url: Api.twManage.selectSport,
    method: "post-json",
    data: query
  });
};
const saveSport = query => {
  return request({
    url: Api.twManage.saveSport,
    method: "post-json",
    data: query
  });
};
const deleteSport = query => {
  return request({
    url: Api.twManage.deleteSport,
    method: "post",
    data: query
  });
};
const saveTwsz = query => {
  return request({
    url: Api.twManage.saveTwsz,
    method: "post-json",
    data: query
  });
};
const seeTwsz = query => {
  return request({
    url: Api.twManage.seeTwsz,
    method: "post",
    data: query
  });
};
const delTwsz = query => {
  return request({
    url: Api.twManage.delTwsz,
    method: "post",
    data: query
  });
};
const DownTwsz = query => {
  return request({
    url: Api.twManage.DownTwsz,
    method: "post",
    data: query
  });
};

export default {
  add,
  del,
  find,
  deleteSport,
  saveSport,
  selectSport,
  saveTwsz,
  seeTwsz,
  DownTwsz,
  delTwsz
};

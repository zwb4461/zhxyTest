const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

const add = query => {
  return request({
    url: Api.jcManage.add,
    method: "post-json",
    data: query
  });
};
const del = query => {
  return request({
    url: Api.jcManage.del,
    method: "post",
    data: query
  });
};
const seeSanjiMeui = query => {
  return request({
    url: Api.jcManage.seeSanjiMeui,
    method: "post",
    data: query
  });
};
const seeJcsz = query => {
  return request({
    url: Api.jcManage.seeJcsz,
    method: "post",
    data: query
  });
};
const deleteMoralPrize = query => {
  return request({
    url: Api.jcManage.deleteMoralPrize,
    method: "post",
    data: query
  });
};
const findJc = query => {
  return request({
    url: Api.jcManage.findJc,
    method: "post-json",
    data: query
  });
};
const find = query => {
  return request({
    url: Api.jcManage.find,
    method: "post-json",
    data: query
  });
};
const saveMoralPrize = query => {
  return request({
    url: Api.jcManage.saveMoralPrize,
    method: "post-json",
    data: query
  });
};
const saveJcsz = query => {
  return request({
    url: Api.jcManage.saveJcsz,
    method: "post-json",
    data: query
  });
};

export default {
  add,
  del,
  find,
  seeSanjiMeui,
  findJc,
  saveMoralPrize,
  saveJcsz,
  seeJcsz,
  deleteMoralPrize
};

const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

const find = query => {
  return request({
    url: Api.cjdsz.find,
    method: "post-json",
    data: query
  });
};
const seeDedis = query => {
  return request({
    url: Api.cjdsz.seeDedis,
    method: "post-json",
    data: query
  });
};
const saveAchimodule = query => {
  return request({
    url: Api.cjdsz.saveAchimodule,
    method: "post-json",
    data: query
  });
};
const seeAchimodule = query => {
  return request({
    url: Api.cjdsz.seeAchimodule,
    method: "post-json",
    data: query
  });
};
const finalSeeScore = query => {
  return request({
    url: Api.cjdsz.finalSeeScore,
    method: "post",
    data: query
  });
};

export default {
  find,
  seeDedis,
  saveAchimodule,
  seeAchimodule,
  finalSeeScore
};

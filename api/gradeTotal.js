const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

const ksSeeScore = query => {
  return request({
    url: Api.gradeTotal.ksSeeScore,
    method: "post",
    data: query
  });
};
const BjSeeScore = query => {
  return request({
    url: Api.gradeTotal.BjSeeScore,
    method: "post",
    data: query
  });
};
const ztjSeeScore = query => {
  return request({
    url: Api.gradeTotal.ztjSeeScore,
    method: "post",
    data: query
  });
};
const cjfxSeeScore = query => {
  return request({
    url: Api.gradeTotal.cjfxSeeScore,
    method: "post",
    data: query
  });
};

const seeScore = query => {
  return request({
    url: Api.gradeTotal.seeScore,
    method: "get",
    params: query
  });
};

export default {
  ksSeeScore,
  seeScore,
  BjSeeScore,
  ztjSeeScore,
  cjfxSeeScore
};

const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

const saveRepairCanshu = query => {
  return request({
    url: Api.baoxiuCs.saveRepairCanshu,
    method: "post-json",
    data: query
  });
};
const findCs = query => {
  return request({
    url: Api.baoxiuCs.findCs,
    method: "post",
    data: query
  });
};
const getNjBj = query => {
  return request({
    url: Api.baoxiuCs.getNjBj,
    method: "post",
    data: query
  });
};
const reflushXh = query => {
  return request({
    url: Api.baoxiuCs.reflushXh,
    method: "post",
    data: query
  });
};
const seeMobileScore = query => {
  return request({
    url: Api.baoxiuCs.seeMobileScore,
    method: "post",
    data: query
  });
};
const repairTj = query => {
  return request({
    url: Api.baoxiuCs.repairTj,
    method: "post-json",
    data: query
  });
};
const delRepairPjqd = query => {
  return request({
    url: Api.baoxiuCs.delRepairPjqd,
    method: "post",
    data: query
  });
};
const delRepairCanshu = query => {
  return request({
    url: Api.baoxiuCs.delRepairCanshu,
    method: "post",
    data: query
  });
};
const delRepairAddr = query => {
  return request({
    url: Api.baoxiuCs.delRepairAddr,
    method: "post",
    data: query
  });
};
const selectDdUsers = query => {
  return request({
    url: Api.baoxiuCs.selectDdUsers,
    method: "get",
    params: query
  });
};

export default {
  findCs,
  saveRepairCanshu,
  selectDdUsers,
  getNjBj,
  reflushXh,
  seeMobileScore,
  repairTj,
  delRepairPjqd,
  delRepairCanshu,
  delRepairAddr
};

const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

//查看教师信息
const sel = query => {
  return request({
    url: Api.teacherInfo.sel,
    method: "post-json",
    data: query
  });
};
//删除教师信息
const del = query => {
  return request({
    url: Api.teacherInfo.del,
    method: "post",
    data: query
  });
};
const saveYw = query => {
  return request({
    url: Api.teacherInfo.saveYw,
    method: "post-json",
    data: query
  });
};
const saveRy = query => {
  return request({
    url: Api.teacherInfo.saveRy,
    method: "post-json",
    data: query
  });
};
const saveZd = query => {
  return request({
    url: Api.teacherInfo.saveZd,
    method: "post-json",
    data: query
  });
};
const saveGw = query => {
  return request({
    url: Api.teacherInfo.saveGw,
    method: "post-json",
    data: query
  });
};
const saveJl = query => {
  return request({
    url: Api.teacherInfo.saveJl,
    method: "post-json",
    data: query
  });
};
const seeYw = query => {
  return request({
    url: Api.teacherInfo.seeYw,
    method: "post-json",
    data: query
  });
};
const seeRy = query => {
  return request({
    url: Api.teacherInfo.seeRy,
    method: "post-json",
    data: query
  });
};
const seeGw = query => {
  return request({
    url: Api.teacherInfo.seeGw,
    method: "post-json",
    data: query
  });
};
const seeJl = query => {
  return request({
    url: Api.teacherInfo.seeJl,
    method: "post-json",
    data: query
  });
};
const seeZd = query => {
  return request({
    url: Api.teacherInfo.seeZd,
    method: "post-json",
    data: query
  });
};
//编辑教师信息
const edit = query => {
  return request({
    url: Api.teacherInfo.edit,
    method: "post-json",
    data: query
  });
};
//添加教师信息
const add = query => {
  return request({
    url: Api.teacherInfo.add,
    method: "post-json",
    data: query
  });
};
//导入表格
const imp = query => {
  return request({
    url: Api.teacherInfo.imp,
    method: "post-json",
    data: query
  });
};
//钉钉匹配
const pp = query => {
  return request({
    url: Api.teacherInfo.pp,
    method: "post",
    data: query
  });
};
//钉钉二次匹配
const ppTwo = query => {
  return request({
    url: Api.teacherInfo.ppTwo,
    method: "post",
    data: query
  });
};
const delYw = query => {
  return request({
    url: Api.teacherInfo.delYw,
    method: "post",
    data: query
  });
};
const delZd = query => {
  return request({
    url: Api.teacherInfo.delZd,
    method: "post",
    data: query
  });
};
const delJl = query => {
  return request({
    url: Api.teacherInfo.delJl,
    method: "post",
    data: query
  });
};
const delRy = query => {
  return request({
    url: Api.teacherInfo.delRy,
    method: "post",
    data: query
  });
};
const delGw = query => {
  return request({
    url: Api.teacherInfo.delGw,
    method: "post",
    data: query
  });
};
//根据省市区获取地区代码
const code = query => {
  return request({
    url: Api.teacherInfo.code,
    method: "post",
    data: query
  });
};

export default {
  add,
  sel,
  del,
  edit,
  imp,
  pp,
  ppTwo,
  code,
  saveYw,
  delYw,
  seeYw,
  delRy,
  saveRy,
  seeRy,
  delZd,
  saveZd,
  seeZd,
  seeGw,
  saveGw,
  delGw,
  seeJl,
  saveJl,
  delJl
};

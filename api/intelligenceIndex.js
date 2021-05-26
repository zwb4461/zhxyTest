const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

//设置/修改科目
const seeSubject = query => {
  return request({
    url: Api.courseManagement.seeSubject,
    method: "post",
    data: query
  });
};

//设置/修改科目
const setSubject = query => {
  return request({
    url: Api.courseManagement.setSubject,
    method: "post",
    data: query
  });
};

//查看课时
const seeClassHour = query => {
  return request({
    url: Api.courseManagement.seeClassHour,
    method: "post",
    data: query
  });
};

//钉钉部门列表
const dep = query => {
  return request({
    url: Api.dingding.dep,
    method: "get",
    params: query
  });
};

export default {
  dep,
  setSubject,
  seeSubject,
  seeClassHour
};

const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

const importXjStudent = query => {
  return request({
    url: Api.studentStatus.importXjStudent,
    method: "post",
    data: query
  });
};

const testStudentExcel = query => {
  return request({
    url: Api.studentStatus.testStudentExcel,
    method: "post",
    data: query
  });
};

const updateSchool = query => {
  return request({
    url: Api.studentStatus.updateSchool,
    method: "post",
    data: query
  });
};

const dd_department = query => {
  return request({
    url: Api.studentStatus.dd_department,
    method: "post",
    data: query
  });
};

const selectSchool = query => {
  return request({
    url: Api.studentStatus.selectSchool,
    method: "get",
    data: query
  });
};

const selectParent = query => {
  return request({
    url: Api.studentStatus.selectParent,
    method: "post",
    data: query
  });
};

export default {
  importXjStudent,
  testStudentExcel,
  updateSchool,
  dd_department,
  selectSchool,
  selectParent
};

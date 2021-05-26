const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

const selectEleCou = query => {
  return request({
    url: Api.personalCenter.selectEleCou,
    method: "POST",
    data: query
  });
};

const setEleCate = query => {
  return request({
    url: Api.personalCenter.setEleCate,
    method: "post-json",
    data: query
  });
};

const selectStudent = query => {
  return request({
    url: Api.personalCenter.selectStudent,
    method: "GET",
    params: query
  });
};

const getXjClass = query => {
  return request({
    url: Api.personalCenter.getXjClass,
    method: "POST",
    data: query
  });
};

const selectCategoryALL = data => {
  return request({
    url: Api.personalCenter.selectCategoryALL,
    method: "GET",
    params: data
  });
};

const deleteEleCou = query => {
  return request({
    url: Api.personalCenter.deleteEleCou,
    method: "POST",
    data: query
  });
};

const getClass = query => {
  return request({
    url: Api.personalCenter.getClass,
    method: "POST",
    data: query
  });
};

const insertCategory = query => {
  return request({
    url: Api.personalCenter.insertCategory,
    method: "post-json",
    data: query
  });
};

const deleteCategory = query => {
  return request({
    url: Api.personalCenter.deleteCategory,
    method: "GET",
    params: query
  });
};

const selectStatis = query => {
  return request({
    url: Api.personalCenter.selectStatis,
    method: "POST",
    data: query
  });
};

const setEleCate1 = query => {
  return request({
    url: Api.personalCenter.setEleCate1,
    method: "POST",
    data: query
  });
};

const selectEleCate = query => {
  return request({
    url: Api.personalCenter.selectEleCate,
    method: "POST",
    data: query
  });
};

const selectEleSchool = query => {
  return request({
    url: Api.personalCenter.selectEleSchool,
    method: "POST",
    data: query
  });
};

const setEleSchool = query => {
  return request({
    url: Api.personalCenter.setEleSchool,
    method: "post-json",
    data: query
  });
};

const teacherSeeCou = query => {
  return request({
    url: Api.personalCenter.teacherSeeCou,
    method: "post",
    data: query
  });
};

const importStatisExcel = query => {
  return request({
    url: Api.personalCenter.importStatisExcel,
    method: "get",
    params: query,
    responseType: "blob"
  });
};

export default {
  selectEleCou,
  setEleCate,
  selectStudent,
  getXjClass,
  selectCategoryALL,
  deleteEleCou,
  getClass,
  insertCategory,
  deleteCategory,
  selectStatis,
  setEleCate1,
  selectEleCate,
  selectEleSchool,
  setEleSchool,
  teacherSeeCou,
  importStatisExcel
};

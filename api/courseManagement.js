const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

//查看教师信息
const setLeiBie = query => {
  return request({
    url: Api.courseManagement.setLeiBie,
    method: "post",
    data: query
  });
};
//查看教师信息
const deleteLeiBie = query => {
  return request({
    url: Api.courseManagement.deleteLeiBie,
    method: "post",
    data: query
  });
};
//查看教师信息
const setClassHour = query => {
  return request({
    url: Api.courseManagement.setClassHour,
    method: "post-json",
    data: query
  });
};
//查看教师信息
const deleteClassHour = query => {
  return request({
    url: Api.courseManagement.deleteClassHour,
    method: "post",
    data: query
  });
};
//查看教师信息
const setSubject = query => {
  return request({
    url: Api.courseManagement.setSubject,
    method: "post",
    data: query
  });
};
//查看教师信息
const deleteSubject = query => {
  return request({
    url: Api.courseManagement.deleteSubject,
    method: "post",
    data: query
  });
};
//查看教师信息
const setTeacher = query => {
  return request({
    url: Api.courseManagement.setTeacher,
    method: "post",
    data: query
  });
};
//查看教师信息
const deleteTeacher = query => {
  return request({
    url: Api.courseManagement.deleteTeacher,
    method: "post",
    data: query
  });
};
//查看教师信息
const seeCurriculumCount = query => {
  return request({
    url: Api.courseManagement.seeCurriculumCount,
    method: "post",
    data: query
  });
};
const seeClassHour1 = query => {
  return request({
    url: Api.courseManagement.seeClassHour1,
    method: "post",
    data: query
  });
};
const intelligenceCourse = query => {
  return request({
    url: Api.courseManagement.intelligenceCourse,
    method: "post",
    data: query
  });
};
const seeOwnerHour = query => {
  return request({
    url: Api.courseManagement.seeOwnerHour,
    method: "post",
    data: query
  });
};

export default {
  setLeiBie,
  deleteLeiBie,
  setClassHour,
  deleteClassHour,
  setSubject,
  deleteSubject,
  setTeacher,
  deleteTeacher,
  seeCurriculumCount,
  seeClassHour1,
  intelligenceCourse,
  seeOwnerHour
};

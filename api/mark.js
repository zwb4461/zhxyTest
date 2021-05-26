const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

//等第打分
const dd = query => {
  return request({
    url: Api.mark.dd,
    method: "post",
    data: query
  });
};

//分项打分
const item = query => {
  return request({
    url: Api.mark.item,
    method: "post-json",
    data: query
  });
};
//分项打分
const itemEdit = query => {
  return request({
    url: Api.mark.itemEdit,
    method: "post-json",
    data: query
  });
};

//获得历史评分记录
const getOld = query => {
  return request({
    url: Api.mark.getOld,
    method: "get",
    params: query
  });
};

export default {
  dd,
  item,
  itemEdit,
  getOld
};

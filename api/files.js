const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

//列表
const add = query => {
  // // console.log(Api.files.add);
  return request({
    url: Api.files.add,
    method: "post-json",
    data: query
  });
};

export default {
  add
};

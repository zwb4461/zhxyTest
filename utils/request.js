const axios = require("axios");
const qs = require("qs");
// const setting = require('./settings');
const { getToken, getCookieServe } = require("~/utils/school");
//删除空
const deleteEmpty = object => {
  if (object) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (
          object[key] === "" ||
          object[key] === null ||
          object[key] === undefined
        ) {
          delete object[key];
        }
      }
    }
  }

  return object;
};

const getSchoolId = req => {
  //   console.log("req", req);
  let isClient = process.client;
  let isServer = process.server;
  let data;
  if (isServer) {
    date = getCookieServe(req);
    // console.log("获取学校id1:", date);
  }
  //在客户端判读是否需要登陆
  if (isClient) {
    data = getToken();
    // console.log("获取学校id2:", date);
  }

  // sessionStorage.setItem("schoolId", data);

  return data;
};

const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  // easy-mock服务挂了，暂时不使用了
  // baseURL: "",
  timeout: 60000000
});

service.interceptors.request.use(
  config => {
    // config.headers
    if (config.method === "post") {
      //普通post请求参数处理
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      config.data = deleteEmpty(config.data);

      if (!config.data.schoolId) {
        config.data.schoolId = getSchoolId(config);
        // config.params.test = "www";
      }

      config.data = qs.stringify(config.data, { indices: false });
      if (!config.params) {
        config.params = {};
      }

      config.params["_"] = new Date().getTime(); //加入时间戳阻止get请求缓存
      //过滤空
      config.params = deleteEmpty(config.params);
      config.paramsSerializer = params => {
        params = params["_"] = new Date().getTime();
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
      // config.
    } else if (config.method === "post-json") {
      //post-json请求
      config.method = "post";
      config.headers["Content-Type"] = "application/json";
      //   config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      if (!config.params) {
        config.params = {};
      }
      if (!config.params.schoolId) {
        config.params.schoolId = getSchoolId(config);
      }
      config.params["_"] = new Date().getTime(); //加入时间戳阻止get请求缓存
      config.params = deleteEmpty(config.params);
    } else if (config.method === "post-img") {
      //post-文件上传请求
      config.method = "post";
      config.headers["Content-Type"] = "multipart/form-data";
    } else if (config.method === "get") {
      // // console.log('params--------',config);
      if (!config.params) {
        config.params = {};
      }
      if (!config.params.schoolId) {
        config.params.schoolId = getSchoolId(config);
      }
      config.params["_"] = new Date().getTime(); //加入时间戳阻止get请求缓存
      config.params = deleteEmpty(config.params);
      //如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
      config.paramsSerializer = params => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
    }

    // // console.log('拦截的请求参数修改后---------------------',config);

    return config;
  },
  error => {
    // console.log(error);
    return Promise.reject();
  }
);

service.interceptors.response.use(
  response => {
    console.log("请求返回的状态吗-----", response.status);
    if (response.status === 200) {
      if (response.data.code == 200 || response.data.code == 0) {
        return response.data;
      } else {
        // // console.log(response.data.msg);
        // Message.error(response.data.msg);
        return Promise.reject(response.data.msg);
      }
    } else {
      // Message.error('');
      // console.log('返回的对象-----', response.data.msg);
      return Promise.reject("网络错误--" + response.status);
    }
  },
  error => {
    console.log(error, "111");
    //   `网络错误${JSON.stringify(error)}`
    return Promise.reject(error);
  }
);

module.exports = service;

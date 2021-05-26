module.exports = {
  //本地
  development: {
    NODE_PORT: 9000,
    NODE_API_BASE: "h-api",
    MY_BASE_URL: "http://192.168.3.102:",
    QR_URL: "http://192.168.0.104:9000",
    // BASE_URL: "http://115.238.154.91:9090",
    // BASE_URL: "http://103.219.33.112:10010",
     BASE_URL: "http://192.168.1.11:10013",
    // BASE_URL: "http://124.70.180.17:10013",
    BASE_URL_DD: "http://115.238.154.91:9090/dingtalk"
  },
  //测试服务器
  dep: {
    NODE_PORT: 9012,
    NODE_API_BASE: "h-api",
    MY_BASE_URL: "http://0.0.0.2:",
    BASE_URL: "http://115.238.154.91:8080"
  },
  //正式服务器
  production: {
    NODE_PORT: 10012,
    NODE_API_BASE: "h-api",
    MY_BASE_URL: "http://0.0.0.0:",
    QR_URL: "http://103.219.33.112:10012",
    BASE_URL: "http://103.219.33.112:10010",
    BASE_URL_DD: "http://103.219.33.112:"
  }
  // production: {
  //     NODE_PORT: 10013,
  //     NODE_API_BASE: 'h-api',
  //     MY_BASE_URL: "http://0.0.0.0:",
  //     QR_URL: "http://124.160.165.31:10013",
  //     BASE_URL: "http://124.160.165.31:10014",
  //     BASE_URL_DD: "http://103.219.33.112:"
  // }
};

const { getToken, getCookieServe } = require("~/utils/auth");

//权限判断中间件
export default function({ store, redirect, route, req, res }) {
  let isClient = process.client;
  let isServer = process.server;

  // // console.log('路由是-----', route);
  // // console.log('页面权限是-----', store.state);
  //判断是否需要权限验证
  let isNotAuth = store.state.auth.notAuthPage.find(
    item => route.path.indexOf(item) > -1
  );
  if (!isNotAuth) {
    let token;
    //在服务端
    if (isServer) {
      token = getCookieServe(req);
    }
    //在客户端判读是否需要登陆
    if (isClient) {
      token = getToken();
    }

    // // console.log('token是----得到------', token);

    //页面tab留存
    if (!token) {
      return redirect(`/dd-login`);
    }
  }
}

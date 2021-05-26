import { getToken, setToken, removeToken } from "@/utils/auth";
import {
  setToken as setSchoolToken,
  removeToken as removeSchoolToken
} from "@/utils/school";
import ddServer from "@/api/dingding";
import loginLog from "@/api/logger/login";
import login from "../api/logger/login";
import school from "~/api/school";

//企业id
import { corpId } from "../utils/corpId";

const state = () => ({
  auth: -1, //用户类型（1：超级无敌管理员，2：学校管理员）
  schoolUrl: "", //学校的域名地址
  schoolName: "", //学校名称
  schoolId: -1, //学校id,
  enrollId: -1, //学生类型id(比如几几届)
  corpId: "", //组织架构企业id
  port: "", //dd服务端口
  userInfo: {
    id: 1,
    unionid: "282220545227448134",
    name: "",
    departmentId: "",
    duty: "",
    schoolId: null,
    avatar: ""
  },
  bxActive: 1,
  bxFzrActive: 0,
  dtkActive: 0,
  bxActiveOne: 0,
  editContent: {},
  //白名单地址
  notAuthPage: ["Login", "404", "403", "phone", "dd-login"]
});

const getters = {
  getEnrollId(state) {
    return state.enrollId;
  }
};

const mutations = {
  Login(state, { info, auth }) {
    state.userInfo = info;
    state.auth = auth;
  },
  LoginOut(state, info) {
    state.userInfo = {};
  },
  //设置学校的信息
  setSchoolId(state, data) {
    state.schoolId = data.id; //学校id
    state.corpId = data.corpId; //学校企业id
    state.port = data.port; //学校的端口号
    state.schoolName = data.name; //学校的名称
    state.schoolUrl = data.domainName.replace(/dd-login/, "");
    setSchoolToken(data.id);
  },
  //设置学生类别id
  setEnrollId(state, id) {
    state.enrollId = id;
  },
  setEditContent(state, val) {
    state.editContent = val;
  },
  setBxActive(state, val) {
    state.bxActive = val;
  },
  setBxActiveOne(state, val) {
    state.bxActiveOne = val;
  },
  setDtkActive(state, val) {
    state.dtkActive = val;
  },
  setBxFzrActive(state, val) {
    state.bxFzrActive = val;
  }
};

const actions = {
  //登录
  Login(context, form) {
    //用户登录
    //224259675221595437
    //manager571
    //2239564521643510

    return new Promise((resolve, reject) => {
      if (
        form.username === "admin" &&
        form.password === "123"
      ) {
        ddServer
          .findUser({ unionid: "manager571" })
          .then(res => {
            let info = res.data[0];
            let auth = 1;
            context.commit("Login", { info, auth });
            setToken(JSON.stringify(info));
            let power = [];
            // if (info.jurisdiction) {
            // let jurisdiction = 'm-1,m-1-1,p-1-t,p-1-t-add,p-1-t-edit,p-1-t-del,p-1-l-add,p-1-l-edit,p-1-l-del,p-1-l-upload,p-1-r-add,p-1-r-edit,p-1-r-del,p-1-f,p-1-f-add,p-1-f-edit,p-1-f-del,p-1-s,p-1-close,m-1-2,m-4,m-2,m-2-2,m-2-3,m-2-4,m-3,m-3-1,m-3-2,p-1-l,p-1-r,p-1-h,p-1-x';
            let list = info.jurisdiction.split(",");
            console.log("权限", info.jurisdiction);
            // let list = jurisdiction.split(',');
            //单独添加学校管理菜单
            list.push("s-m-1");
            power = list.filter(item => item.indexOf("m-") > -1);
            sessionStorage.setItem(
              "power",
              JSON.stringify(list.filter(item => item.indexOf("p-") > -1))
            );
            // }
            //  sessionStorage.setItem('power', JSON.stringify(['p-s-edit', 'p-s-add']))
            //插入登录日志
            // loginLog.add({ unionid: '282220545227448134' })
            // console.log("我的权限------", power);
            resolve({
              power
            });
          })
          .catch(err => {
            reject(err);
          });
      } else {
        reject("用户名或密码错误,请重新输入!");
      }
    });
  },
  ddLogin(context, { unionid, auth, schoolId }) {
    //用户登录
    return new Promise((resolve, reject) => {
      ddServer
        .user({ pagenum: 1, pagesize: 10, unionid, schoolId })
        .then(res => {
          console.log("ddLogin------------", schoolId);
          let info = res.data.list[0];
          if (info) {
            context.commit("Login", info);
            setToken(JSON.stringify(info));
            let power = [];
            if (auth === 2) {
              let jurisdiction =
                "m2-6,m-18-6,m-18-7,m-m-m-1,m-m-m-2,m-m,m-m-1,m-m-2,m-m-3,m-m-4,m-m-5,m-m-6,m-m-7,m-m-8,m-18-5,m-10,m-9,m-2-5,m-18-4,m-18-3,m-18-2,m-18-1,m-18，m-6,m-5,m-5-5,m-1,m-1-1,p-1-t,p-1-t-add,p-1-t-edit,p-1-t-del,p-1-l-add,p-1-l-edit,p-1-l-del,p-1-l-upload,p-1-r-add,p-1-r-edit,p-1-r-del,p-1-f,p-1-f-add,p-1-f-edit,p-1-f-del,p-1-s,p-1-close,m-1-2,m-4,m-4-4,m-4-4-4,m-2,m-2-2,m-2-3,m-2-4,m-3,m-3-1,m-3-2,p-1-l,p-1-r,p-1-h,p-1-x,m-7,m-7-1,m-7-2,m-7-3,m-7-4,m-8";
              power = jurisdiction
                .split(",")
                .filter(item => item.indexOf("m-") > -1);
              sessionStorage.setItem(
                "power",
                JSON.stringify(
                  jurisdiction
                    .split(",")
                    .filter(item => item.indexOf("p-") > -1)
                )
              );
            } else if (info.jurisdiction) {
              power = info.jurisdiction
                .split(",")
                .filter(item => item.indexOf("m-") > -1);
              sessionStorage.setItem(
                "power",
                JSON.stringify(
                  info.jurisdiction
                    .split(",")
                    .filter(item => item.indexOf("p-") > -1)
                )
              );
            }
            context.commit("Login", { info, auth });
            //添加一条登录日志
            loginLog.add({ unionid });
            resolve({
              power
            });
          } else {
            reject(`您的信息不存在系统中，请联系技术人员同步`);
          }
        })
        .catch(err => {
          reject(`获取人员错误，请联系技术人员`);
        });
    });
  },
  //登出
  LoginOut(context) {
    return new Promise((resolve, reject) => {
      context.commit("LoginOut");
      removeToken(); //清除token的cookie
      resolve();
    });
  },
  //设置学校信息(管理员账号登录)
  setSchoolIdAuth(context, id) {
    return new Promise((resolve, reject) => {
      console.log(id, "id------");
      school
        .list({
          pagenum: 1,
          pagesize: 100,
          schoolId: id
        })
        .then(res => {
          console.log(res, "res---");
          let schoolList = res.data.schools.filter(j => j.valid === 0);
          let mySchool = schoolList.find(j => j.id == id);
          if (mySchool) {
            context.commit("setSchoolId", mySchool);
            resolve(mySchool);
          } else {
            reject("无法获取学校信息");
          }
        })
        .catch(err => {
          reject(`获取学校信息错误，请联系技术人员`);
        });
    });
  },
  //设置学校信息
  setSchoolId(context, { url, schoolId }) {
    return new Promise((resolve, reject) => {
      school
        .list({
          pagenum: 1,
          pagesize: 100,
          schoolId: schoolId
        })
        .then(res => {
          let schoolList = res.data.schools.filter(j => j.valid === 0);
          console.log("schoolList", schoolList);
          let mySchool;
          if (schoolId) {
            mySchool = schoolList.find(j => j.id == schoolId);
            console.log("mySchool1", mySchool);
          } else {
            mySchool = schoolList.find(j => j.domainName == url);
            console.log("mySchool2", mySchool);
          }
          console.log("mySchool3", mySchool);
          if (mySchool) {
            console.log("设置了schoolId");
            context.commit("setSchoolId", mySchool);
            resolve(mySchool);
          } else {
            console.log("没设置");
            reject("无法读取学校信息");
            // reject('学校不存在或已禁用');
            // reject();
          }
        })
        .catch(err => {
          reject(`获取学校信息错误，请联系技术人员`);
        });
    });
  },

  //设置学生类别id
  setEnrollId(context, id) {
    return new Promise((resolve, reject) => {
      try {
        context.commit("setEnrollId", id);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

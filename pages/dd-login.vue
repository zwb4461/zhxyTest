<template>
  <div
    v-loading="loading"
    :element-loading-text="errLogin"
    style="width: 50vh; height: 100vh; margin: 0 auto"
  ></div>
</template>

<script>
import main from "@/api/dingding";
import main1 from "@/api/baoxiuCs";
import * as dd from "dingtalk-jsapi";

export default {
  name: "ddLogin",
  data() {
    return {
      loading: true,
      errLogin: "钉钉登录中，请稍后。。。",
    };
  },
  methods: {
    testLogin() {
      let testJson = {
        departmentId: 148824287,
        id: 15,
        authtype: 2,
        locked: false,
        name: "admin",
        street: "",
        placepoint: "admin,--",
        unionid: "282220545227448134",
      };
      sessionStorage.setItem("ms_userInfo", JSON.stringify(testJson)); //登录用户姓名
      this.toLoginIng(); //跳转页面
    },
    testLogin2() {
      let testJson = {
        departmentId: 148824287,
        id: 15,
        authtype: 2,
        locked: false,
        name: "用户",
        street: "",
        placepoint: "admin2,--",
        unionid: "282220545227448134",
      };
      sessionStorage.setItem("area", "admin2");
      sessionStorage.setItem("ms_userInfo", JSON.stringify(testJson)); //登录用户姓名
      this.toLoginIng2(); //跳转页面
    },
    toLoginIng() {
      let isPC = this.$ValidateUtil.IsPC();
      if (isPC) {
        this.$router.push("/dashboard"); //跳转到PC系统首页
      } else {
        this.$router.push("/home"); //跳转到手机系统首页
      }
    },
    toLoginIng2() {
      this.$router.push("/onlyProvinceEntryPersonnel");
    },
  },
  mounted() {
    const _this = this;
    // this.testLogin();
    let type = this.$route.query.type; //进入的类型
    let dtk = this.$route.query.dtk;
    let isBx = this.$route.query.bx; //是否是报修图标进入
    let enrollId = this.$route.query.enrollId; //类别id
    let formType = this.$route.query.formType; //表单类型
    let id = this.$route.query.id;
    // let schoolId = this.$route.query.id;

    // // console.log("enrollId-----", enrollId);
    // // console.log("formType-----", formType);
    // // console.log("id-----", id);
    // // console.log("enrollId-----", enrollId);

    let schoolId = this.$route.query.schoolId;
    console.log("地址上的schoolId:", schoolId);

    // if (schoolId) {
    //如果有学校id

    if (dd.env.platform == "notInDingTalk") {
      this.errLogin = "请去钉钉工作台打开本应用";
    } else {
      dd.ready(() => {
        //获取当前域名
        let url = window.location.href;
        console.log("当前地址:", url);
        // let obj = {
        //   url,
        // };
        // _this.errLogin = url;
        _this.$store
          .dispatch("auth/setSchoolId", { url, schoolId })
          .then((schoolInfo) => {
            //获取学校corpId与钉钉登录接口
            dd.runtime.permission.requestAuthCode({
              corpId: schoolInfo.cropId,
              onSuccess: function (result) {
                let code = result.code;
                // _this.code = code;
                // _this.errLogin = code;
                console.log("runtime-schoolInfo------", schoolInfo);

                main
                  .login({ code: code }, schoolInfo.port, schoolInfo.ip)
                  //?1
                  .then((res) => {
                    console.log("1111111");
                    let ddUnionid = res.data;
                    let info = {};
                    let auth = -1;
                    if (ddUnionid === schoolInfo.managerId) {
                      auth = 2;
                    }
                    info.unionid = ddUnionid;
                    info.auth = auth;
                    info.schoolId = schoolInfo.id;
                    return _this.$store.dispatch("auth/ddLogin", info);
                  })
                  //?2
                  .then((res) => {
                    let power = res.power;
                    _this.$store.commit("layout/setPower", power);
                    // // console.log("获得到的权限是----", power);
                    if (isBx == 1) {
                      main1
                        .findCs({
                          schoolId: schoolId,
                          unionid: _this.$store.state.auth.userInfo.unionid,
                        })
                        .then((res) => {
                          if (res.data.setRepcates.length > 0) {
                            return _this.$store.dispatch("layout/getUserMenu", [
                              "m-m-m-1",
                              "m-m-m-2",
                            ]);
                          } else {
                            return _this.$store.dispatch("layout/getUserMenu", [
                              "m-m-m-1",
                            ]);
                          }
                        })
                        .catch((err) => {});
                      //!报修PC端进入
                    } else if (dtk == 1) {
                      //   ?如果存在报修管理权限
                      if (power.indexOf("m-9") > -1) {
                        return _this.$store.dispatch("layout/getUserMenu", [
                          "m-9",
                          "m-m",
                          "m-m-6",
                        ]);
                      } else {
                        return _this.$store.dispatch("layout/getUserMenu", [
                          "m-m",
                          "m-m-6",
                        ]);
                      }
                    } else {
                      //!正常进入
                      //!个人中心始终显示
                      let alwaysShow = [
                        "m-m",
                        "m-m-1",
                        "m-m-2",
                        "m-m-3",
                        "m-m-4",
                        "m-m-5",
                        "m-m-6",
                        "m-m-7",
                        "m-m-8",
                      ];
                      return _this.$store.dispatch(
                        "layout/getUserMenu",
                        power.concat(alwaysShow)
                      );
                    }
                  })
                  //?3
                  .then((res) => {
                    //  // console.log(res);
                    if (type == 1) {
                      _this.$router.push(
                        `/phone/reportStudent/${enrollId}/${formType}/${id}?schoolName=${_this.$store.state.auth.schoolName}`
                      );
                    } else if (type == 2) {
                      _this.$router.push(`/phone/dtk`);
                    } else if (type == 3) {
                      _this.$router.push(`/phone/bxPhone`);
                    } else {
                      _this.$router.push("/");
                    }
                    //   sessionStorage.setItem("name", this.param.username);
                  })
                  .catch((err) => {
                    // _this.$message.error(JSON.stringify(err));
                    _this.errLogin = err;
                  });
              },
              onFail: function (err) {
                _this.errLogin = err;
                // _this.$message.error(JSON.stringify(err));
              },
            });
          })
          .catch((err) => {
            _this.errLogin = err;
          });
      });
    }
    // } else {
    //   let url = window.location.href;
    //   this.errLogin = "错误：无法获取学校" + url;
    // }
  },
};
</script>

<style lang="scss" scoped></style>

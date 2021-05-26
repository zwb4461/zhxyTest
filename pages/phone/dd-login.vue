<template>
  <div
    v-loading="loading"
    :element-loading-text="errLogin"
    style="width: 50vh;height: 100vh;margin:0 auto;"
  ></div>
</template>

<script>
import main from "@/api/dingding";
import * as dd from "dingtalk-jsapi";

export default {
  name: "ddLogin",
  data() {
    return {
      loading: true,
      errLogin: "钉钉登录中，请稍后。。。"
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
        unionid: "282220545227448134"
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
        unionid: "282220545227448134"
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
    }
  },
  mounted() {
    const _this = this;
    // this.testLogin();
    let type = this.$route.query.type; //进入的类型
    let enrollId = this.$route.query.enrollId; //类别id
    let formType = this.$route.query.formType; //表单类型
    let id = this.$route.query.id;
    // let schoolId = this.$route.query.id;

    // // console.log("enrollId-----", enrollId);
    // // console.log("formType-----", formType);
    // // console.log("id-----", id);
    // // console.log("enrollId-----", enrollId);

    let schoolId = this.$route.query.schoolId;

    // if (schoolId) {
    //如果有学校id

    if (dd.env.platform == "notInDingTalk") {
      this.errLogin = "请去钉钉工作台打开本应用";
    } else {
      dd.ready(() => {
        //获取当前域名
        let url = window.location.href;
        // let obj = {
        //   url,
        // };
        // _this.errLogin = url;
        _this.$store
          .dispatch("auth/setSchoolId", { url, schoolId })
          .then(schoolInfo => {
            // alert("成功");
            //获取学校corpId与钉钉登录接口
            dd.runtime.permission.requestAuthCode({
              corpId: schoolInfo.cropId,
              onSuccess: function(result) {
                let code = result.code;
                // _this.code = code;
                // _this.errLogin = code;
                // alert(code);
                main
                  .login({ code: code }, schoolInfo.port, schoolInfo.ip)
                  .then(res => {
                    // _this.form.ddunionid = res.data;
                    let ddUnionid = res.data;
                    // alert("获得了----" + ddUnionid);
                    // _this.errLogin =  ddUnionid;
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
                  .then(res => {
                    let power = res.power;
                    // // console.log("获得到的权限是----", power);

                    return _this.$store.dispatch("layout/getUserMenu", power);
                  })
                  .then(res => {
                    //  // console.log(res);
                    if (type == 1) {
                      _this.$router.push(
                        `/phone/reportStudent/${enrollId}/${formType}/${id}?schoolName=${_this.$store.state.auth.schoolName}`
                      );
                    } else {
                      _this.$router.push("/");
                    }
                    //   sessionStorage.setItem("name", this.param.username);
                  })
                  .catch(err => {
                    // _this.$message.error(JSON.stringify(err));
                    _this.errLogin = err;
                  });
              },
              onFail: function(err) {
                _this.errLogin = err;
                // _this.$message.error(JSON.stringify(err));
              }
            });
          })
          .catch(err => {
            _this.errLogin = err;
          });
      });
    }
    // } else {
    //   let url = window.location.href;
    //   this.errLogin = "错误：无法获取学校" + url;
    // }
  }
};
</script>

<style lang="scss" scoped></style>

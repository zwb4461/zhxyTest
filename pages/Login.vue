<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="param.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button :loading="loading" type="primary" @click="submitForm()"
            >登录</el-button
          >
        </div>
        <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
      </el-form>
    </div>
  </div>
</template>

<script>
import main from "@/api/baoxiuCs";
export default {
  data: function () {
    return {
      loading: false,
      param: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      let isBx = this.$route.query.bx;
      let dtk = this.$route.query.dtk;
      let type = this.$route.query.type; //进入的类型
      let schoolId = this.$route.query.id;
      this.$refs.login.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("auth/setSchoolIdAuth", schoolId)
            .then((res) => {
              return this.$store.dispatch("auth/Login", this.param);
            })
            .then((res) => {
              let power = res.power;
              this.$store.commit("layout/setPower", power);
              console.log("获得到的权限是----", power);
              if (isBx == 1) {
                main
                  .findCs({
                    schoolId: schoolId,
                    unionid: this.$store.state.auth.userInfo.unionid,
                  })
                  .then((res) => {
                    if (res.data.setRepcates.length > 0) {
                      return this.$store.dispatch("layout/getUserMenu", [
                        "m-m-m-1",
                        "m-m-m-2",
                      ]);
                    } else {
                      return this.$store.dispatch("layout/getUserMenu", [
                        "m-m-m-1",
                      ]);
                    }
                  })
                  .catch((err) => {});
                //!报修PC端进入
              } else if (dtk == 1) {
                //   ?如果存在报修管理权限
                if (power.indexOf("m-9") > -1) {
                  return this.$store.dispatch("layout/getUserMenu", [
                    "m-9",
                    "m-m",
                    "m-m-6",
                  ]);
                } else {
                  return this.$store.dispatch("layout/getUserMenu", [
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
                return this.$store.dispatch(
                  "layout/getUserMenu",
                  power.concat(alwaysShow)
                );
              }
            })
            .then((res) => {
              this.loading = false;
              //  // console.log(res);
              this.$router.push("/");
              //   this.$router.push("/Phone/bxPhone");
              //   sessionStorage.setItem("name", this.param.username);
            })
            .catch((err) => {
              this.loading = false;
              this.$message.error(err);
            });
        } else {
          this.$message.error("请输入账号和密码");
          // // console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    let url = window.location.href;
    // // console.log("url是--------", url);
  },
};
</script>

<style lang="scss" scoped>
.login-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>

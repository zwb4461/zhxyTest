<template>
  <div class="contain">
    <!-- <van-radio-group v-model="form.type" direction="horizontal">
      <van-radio name="0">代课</van-radio>
      <van-radio name="1">调课</van-radio>
    </van-radio-group> -->
    <van-tabs v-model="form.type">
      <van-tab title="代课">
        <van-cell-group v-if="form.type == 0">
          <div
            style="
              text-align: center;
              color: #000000;
              font-size: 17px;
              padding: 5px 0;
            "
          >
            <span>2020/2021学年 第二学期</span>
          </div>
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">代课日期:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner" style="height: 48px">
              <van-cell
                style="height: 100%"
                :value="form.date"
                @click="showDkrq = true"
              />
            </div>
          </div>
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">代课班级:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner">
              <van-field
                readonly
                clickable
                :value="form.className"
                @click="showXq = true"
              />
            </div>
          </div>
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">代课课次:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner">
              <van-field
                readonly
                clickable
                :value="form.stanza"
                placeholder="选择代课课次"
                @click="dkkc"
              />
            </div>
          </div>
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">代课学科:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner">
              <van-field
                readonly
                clickable
                :value="form.xkname"
                placeholder="选择代课学科"
                @click="dkxk(6)"
              />
            </div>
          </div>
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">原授课人:</span>
          </div>
          <van-field readonly clickable :value="userName" />
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">现授课人:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner">
              <el-select
                popper-class="modifyStyle"
                filterable
                v-model="form.teaId"
                placeholder="请选择"
                @focus="getOpt(5)"
                @change="confirmXskr"
                style="width: 100%"
              >
                <el-option
                  v-for="item in XskrOpt"
                  :key="item.teacherUnionid"
                  :label="item.teacherName"
                  :value="item.teacherUnionid"
                >
                </el-option>
              </el-select>
              <!-- <van-field
                readonly
                clickable
                :value="form.teaname"
                placeholder="选择现授课人"
                @click="xskr()"
              /> -->
            </div>
          </div>
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">授课要求:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner">
              <van-field v-model="form.must" placeholder="授课要求" />
            </div>
          </div>
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">代课原因:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner">
              <van-field v-model="form.reason" placeholder="代课原因" />
            </div>
          </div>
          <div class="moni"></div>
        </van-cell-group>
        <div class="topBtn" v-if="form.type == 0">
          <!-- <van-button
            v-if="$route.query.have == 1"
            type="warning"
            style="width: 90%"
            @click="del"
            :disabled="formStatus"
            >删除</van-button
          > -->
          <van-button
            type="info"
            style="width: 90%; margin-left: 10px"
            @click="submit"
            :disabled="formStatus"
            >提交申请</van-button
          >
        </div>
      </van-tab>
      <van-tab title="调课">
        <van-cell-group v-if="form.type == 1">
          <div
            style="
              text-align: center;
              color: #000000;
              font-size: 17px;
              padding: 5px 0;
            "
          >
            <span>2020/2021学年 第二学期</span>
          </div>
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">调课日期:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner" style="height: 48px">
              <van-cell
                style="height: 100%"
                :value="form.date"
                @click="showDkrq = true"
              />
            </div>
          </div>
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">调课班级:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner">
              <van-field
                readonly
                clickable
                :value="form.className"
                placeholder="选择调课班级"
                @click="showXq = true"
              />
            </div>
          </div>

          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">调课课次:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner">
              <van-field
                readonly
                clickable
                :value="form.stanza"
                placeholder="选择调课课次"
                @click="tkkc"
              />
            </div>
          </div>
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">调课学科:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner">
              <van-field
                readonly
                clickable
                :value="form.xkname"
                placeholder="选择调课学科"
                @click="dkxk"
              />
            </div>
          </div>
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">原授课人:</span>
          </div>
          <van-field readonly clickable :value="userName" />
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">现授课人:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner">
              <el-select
                popper-class="modifyStyle"
                filterable
                v-model="form.teaId"
                placeholder="请选择"
                @focus="getOpt(5)"
                style="width: 100%"
                @change="confirmXskr"
              >
                <el-option
                  v-for="item in XskrOpt"
                  :key="item.teacherUnionid"
                  :label="item.teacherName"
                  :value="item.teacherUnionid"
                >
                </el-option>
              </el-select>
              <!-- <van-field
                readonly
                clickable
                :value="form.teaname"
                placeholder="选择现授课人"
                @click="xskr"
              /> -->
            </div>
          </div>
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">互调日期:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner" style="height: 48px">
              <van-cell
                style="height: 100%"
                :value="form.olddate"
                @click="htrq"
              />
            </div>
          </div>
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">互调班级:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner">
              <van-field
                readonly
                clickable
                :value="form.oldclassName"
                placeholder="选择学期年级"
                @click="hdnj"
              />
            </div>
          </div>

          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">互调课次:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner">
              <van-field
                readonly
                clickable
                :value="form.oldStanza"
                placeholder="选择互调课次"
                @click="htkc"
              />
            </div>
          </div>
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">互调学科:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner">
              <van-field
                readonly
                clickable
                :value="form.oldxkname"
                placeholder="选择互调学科"
                @click="htxk1"
              />
            </div>
          </div>
          <div class="moni"></div>
          <div class="font-bold">
            <span style="margin-left: 15px; font-size: 17px">调课原因:</span>
          </div>
          <div class="inp_contain">
            <div class="inp_contain_inner">
              <van-field v-model="form.reason" placeholder="调课原因" />
            </div>
          </div>
          <div class="moni"></div>
        </van-cell-group>

        <div class="topBtn" v-if="form.type == 1">
          <!-- <van-button
            v-if="$route.query.have == 1"
            type="warning"
            style="width: 90%"
            @click="del"
            :disabled="formStatus"
            >删除</van-button
          > -->
          <van-button
            type="info"
            style="width: 90%; margin-left: 10px"
            @click="submit"
            :disabled="formStatus"
            >提交申请</van-button
          >
        </div>
      </van-tab>
    </van-tabs>
    <!-- 学期 -->
    <van-popup v-model="showXq" round position="bottom">
      <van-picker
        ref="picker"
        value-key="name"
        show-toolbar
        :columns="XqOpt"
        @cancel="showXq = false"
        @confirm="confirmXq"
      />
    </van-popup>
    <!-- 互调学期 -->
    <van-popup v-model="showHdxq" round position="bottom">
      <van-picker
        ref="picker2"
        value-key="name"
        show-toolbar
        :columns="XqOpt"
        @cancel="showHdxq = false"
        @confirm="confirmHdxq"
      />
    </van-popup>
    <!-- 代课节次 -->
    <van-popup v-model="showDkjc" round position="bottom">
      <van-picker
        ref="picker"
        value-key="stanz"
        show-toolbar
        :columns="stanzaOpt"
        @cancel="showDkjc = false"
        @confirm="confirmDkjc"
      />
    </van-popup>
    <!-- 互调节次 -->
    <van-popup v-model="showHdkc" round position="bottom">
      <van-picker
        ref="picker"
        value-key="stanz"
        show-toolbar
        :columns="stanzaOpt"
        @cancel="showHdkc = false"
        @confirm="confirmHdkc"
      />
    </van-popup>
    <!-- 代课学科 -->
    <van-popup v-model="showDkxk" round position="bottom">
      <van-picker
        ref="picker"
        value-key="subjectName"
        show-toolbar
        :columns="xkOpt"
        @cancel="showDkxk = false"
        @confirm="confirmDkxk"
      />
    </van-popup>
    <!-- 互调学科 -->
    <van-popup v-model="showHdxk" round position="bottom">
      <van-picker
        ref="picker"
        value-key="subjectName"
        show-toolbar
        :columns="xkOpt"
        @cancel="showHdxk = false"
        @confirm="confirmHdxk"
      />
    </van-popup>
    <!-- 现授课人 -->
    <van-popup v-model="showXskr" round position="bottom">
      <van-picker
        ref="picker"
        value-key="teacherName"
        show-toolbar
        :columns="XskrOpt"
        @cancel="showXskr = false"
        @confirm="confirmXskr"
      />
    </van-popup>
    <!-- 原授课人 -->
    <van-popup v-model="showYskr" round position="bottom">
      <van-picker
        ref="picker"
        value-key="teacherName"
        show-toolbar
        :columns="YskrOpt"
        @cancel="showYskr = false"
        @confirm="confirmYskr"
      />
    </van-popup>
    <van-calendar v-model="showDkrq" @confirm="confirmDkrq" />
    <van-calendar v-model="showHdrq" @confirm="confirmHdrq" />
  </div>
</template>

<script>
import main from "~/api/dtk";
import main1 from "~/api/scoreEntry";
import main2 from "~/api/baoxiuCs";
import { Message } from "element-ui";
import { Toast } from "vant";
export default {
  computed: {
    editContent() {
      return this.$store.state.auth.editContent;
    },
    //用户id
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    userName() {
      return this.$store.state.auth.userInfo.name;
    },
    formStatus() {
      if (this.$route.query.status == 2 || this.$route.query.status == 4) {
        return true;
      } else {
        return false;
      }
    },
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  data() {
    return {
      kcZdyArr: [],
      zj: "",
      zjHt: "",
      xqName: "",
      cjlbId: "",
      active: 0,
      showXq: false,
      showDkrq: false,
      showDkjc: false,
      showDkxk: false,
      showXskr: false,
      showYskr: false,
      showHdxq: false,
      showHdxq: false,
      showHdrq: false,
      showHdkc: false,
      showHdxk: false,
      formType: 0, //0新增1编辑
      XqOpt: [],
      xkOpt: [],
      XskrOpt: [],
      YskrOpt: [],
      stanzaOpt: [],
      form: {
        type: 0,
        classId: [],
        className: "",
        date: "",
        stanza: "",
        xkname: "",
        status: "",
        reason: "",
        must: "",
        oldTeaname: "",
        teaname: "",
        teaId: "",
        oldclassId: [],
        olddate: "",
        oldStanza: "",
        oldxkname: "",
      },
    };
  },

  methods: {
    dkkc() {
      this.showDkjc = true;
      this.getOpt(4);
    },
    htkc() {
      this.showHdkc = true;
      this.getOpt(4);
    },
    hdxk() {
      this.showHdxk = true;
      this.getOpt(4);
    },
    getOpt(data) {
      if (data == 1) {
        //?代课学科opt
        let val = {
          //   classId: this.form.classId[2],
          type: 1,
          isdk: this.form.type == 1 ? 1 : "",
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.xkOpt = res.data;
          })
          .catch((err) => {});
      } else if (data == 2) {
        //?原授课人opt
        this.showYskr = true;
        let val = {
          //   classId: this.form.classId[2],
          type: 2,
          isdk: this.form.type == 1 ? 1 : "",
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.YskrOpt = res.data;
          })
          .catch((err) => {});
      } else if (data == 3) {
        //?现授课人opt

        let val = {
          //   classId: this.form.classId[2],
          type: 3,
          isdk: this.form.type == 1 ? 1 : "",
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.XskrOpt = res.data;
          })
          .catch((err) => {});
      } else if (data == 4) {
        let data = new Date(this.form.date).getDay();
        this.zj = this.getZj(data);
        //?代课学科opt
        let val = {
          //   classId: this.form.classId[2],
          type: 4,
          //   weekName: this.zj,
          //   unionid: this.unionid,
          //   data: this.form.date,
          isdk: this.form.type == 1 ? 1 : "",
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.stanzaOpt = res.data;
            this.stanzaOpt = this.stanzaOpt.concat(this.kcZdyArr);
          })
          .catch((err) => {});
      } else if (data == 5) {
        //?现授课人opt
        let val = {
          type: 5,
          isdk: this.form.type == 1 ? 1 : "",
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.XskrOpt = res.data;
          })
          .catch((err) => {});
      } else if (data == 6) {
        //?代课学科opt
        let val = {
          //   classId: this.form.classId[2],
          type: 1,
          //   stanz: this.form.stanza,
          //   weekName: this.zj,
          isdk: this.form.type == 1 ? 1 : "",
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.xkOpt = res.data;
          })
          .catch((err) => {});
      }
    },
    hdnj() {
      this.showHdxq = true;
      let teacher = [];
      teacher = this.XskrOpt.filter((item) => {
        return item.teacherName == this.form.teaname;
      });
      let val = {
        cjlbId: this.cjlbId,
        type: 1,
        // unionid: teacher.length > 0 ? teacher[0].teacherUnionid : "",
        //
      };
      main1
        .seeSiji(val)
        .then((res) => {
          this.XqOpt = res.data;
        })
        .catch((err) => {});
    },
    clearForm() {
      console.log("清空");
      this.formType = 0;
      this.form = {
        type: 0,
        classId: [],
        className: "",
        date: "",
        stanza: "",
        xkname: "",
        status: "",
        reason: "",
        must: "",
        oldTeaname: "",
        teaname: "",
        teaId: "",
        oldclassId: [],
        olddate: "",
        oldStanza: "",
        oldxkname: "",
      };
    },
    htxk1() {
      this.showHdxk = true;
      this.getOpt(6);
    },
    htrq() {
      this.showHdrq = true;
    },
    tkkc() {
      this.showDkjc = true;
      this.getOpt(4);
    },
    dkxk() {
      this.showDkxk = true;
      this.getOpt(6);
    },
    xskr() {
      this.showXskr = true;
      this.getOpt(5);
    },
    getXqNj() {
      let val = {
        cjlbId: this.cjlbId,
        // unionid: this.unionid,
        type: 1,
      };
      main1
        .seeSiji(val)
        .then((res) => {
          this.XqOpt = res.data;
        })
        .catch((err) => {});
    },
    //获取日期是周几
    getZj(data) {
      switch (data) {
        case 1:
          return "星期一";
        case 2:
          return "星期二";
        case 3:
          return "星期三";
        case 4:
          return "星期四";
        case 5:
          return "星期五";
        case 6:
          return "星期六";
        case 0:
          return "星期日";
        default:
          return "";
      }
    },
    del() {
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .del({ id: this.form.id })
            .then((res) => {
              this.$message.success("删除成功!");
              this.$router.push("/Phone/dtk");
            })
            .catch((err) => {
              Message({
                message: err,
                type: "error",
                customClass: "mzindex",
              });
            });
        },
      });
    },
    submit() {
      if (this.form.type == 0) {
        // ?代课
        if (!this.form.date) {
          Toast.fail("请填写日期");
        } else if (!this.form.className) {
          Toast.fail("请填写班级");
        } else if (!this.form.stanza) {
          Toast.fail("请填写课次");
        } else if (!this.form.xkname) {
          Toast.fail("请填写学科");
        } else {
          if (this.formType == 1) {
            //?编辑
            main
              .edit(this.form)
              .then((res) => {
                this.$message.success("编辑成功!");
                this.clearForm();
                this.$store.commit("auth/setBxActiveOne", 1);
              })
              .catch((err) => {
                Message({
                  message: err,
                  type: "error",
                  customClass: "mzindex",
                });
              });
          } else {
            //  ?新增
            let data = this.form;
            data.cjlbId = this.cjlbId;
            data.oldTeaId = this.unionid;
            data.status = undefined;
            console.log(data);
            main
              .add(data)
              .then((res) => {
                this.$message.success("提交成功!");
                this.clearForm();
                this.$store.commit("auth/setBxActiveOne", 1);
              })
              .catch((err) => {
                Message({
                  message: err,
                  type: "error",
                  customClass: "mzindex",
                });
              });
          }
        }
      } else {
        if (!this.form.date) {
          Toast.fail("请填写日期");
        } else if (!this.form.className) {
          Toast.fail("请填写班级");
        } else if (!this.form.stanza) {
          Toast.fail("请填写课次");
        } else if (!this.form.xkname) {
          Toast.fail("请填写学科");
        } else if (!this.form.teaId) {
          Toast.fail("请填写授课人");
        } else if (!this.form.olddate) {
          Toast.fail("请填写日期");
        } else if (!this.form.oldclassName) {
          Toast.fail("请填写年级");
        } else if (!this.form.oldStanza) {
          Toast.fail("请填写课次");
        } else if (!this.form.oldxkname) {
          Toast.fail("请填写学科");
        } else {
          if (this.formType == 1) {
            //?编辑
            main
              .edit(this.form)
              .then((res) => {
                this.$message.success("编辑成功!");
                this.clearForm();
                this.$store.commit("auth/setBxActiveOne", 1);
              })
              .catch((err) => {
                Message({
                  message: err,
                  type: "error",
                  customClass: "mzindex",
                });
              });
          } else {
            //  ?新增
            let data = this.form;
            data.cjlbId = this.cjlbId;
            data.oldTeaId = this.unionid;
            data.status = undefined;
            console.log(data);
            main
              .add(data)
              .then((res) => {
                this.$message.success("提交成功!");
                this.clearForm();
                this.$store.commit("auth/setBxActiveOne", 1);
              })
              .catch((err) => {
                Message({
                  message: err,
                  type: "error",
                  customClass: "mzindex",
                });
              });
          }
        }
      }
    },
    //!格式化日期
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    //!确定代课学科
    confirmDkxk(val) {
      this.showDkxk = false;
      this.form.xkname = val.subjectName;
    },
    //!确定互调学科
    confirmHdxk(val) {
      this.showHdxk = false;
      this.form.oldxkname = val.subjectName;
    },
    //!确定原授课人
    confirmYskr(val) {
      this.showYskr = false;
      this.form.oldTeaname = val.teacherName;
    },
    //!确定现授课人
    confirmXskr(val) {
      this.showXskr = false;
      //   this.form.teaname = val.teacherName;
      this.form.teaId = val;
      this.getHl("授课人", 3);
    },
    //!是否合理效验
    ifHl(res, data) {
      console.log("0000");
      switch (res) {
        case 1:
          Toast.fail(data + "不合理");
          break;
        case 2:
          Toast.fail(data + "冲突");
          break;
      }
    },

    //!调接口获取是否合理
    getHl(val, status) {
      this.form.schoolId = this.schoolId;
      this.form.ckzt = status;
      this.form.oldTeaId = this.unionid;
      main
        .takeHl(this.form)
        .then((res) => {
          console.log(res.data, "是否冲突");
          this.ifHl(res.data, val);
        })
        .catch((err) => {});
    },
    //!确定代课节次
    confirmDkjc(val) {
      this.showDkjc = false;
      this.form.stanza = val.stanz;
      let data = {
        schoolId: this.schoolId,
        classId: this.form.classId ? this.form.classId[2] : "",
        stanz: this.form.stanza,
        weekName: this.zj,
        type: 4,
      };
      this.getHl("课次", 2);
      main
        .selectTakeStanza(data)
        .then((res) => {
          let data = {};
          data = res.data;
          this.form.xkname = data[0].subjectName;
        })
        .catch((err) => {});
    },
    //!确定互调节次
    confirmHdkc(val) {
      this.showHdkc = false;
      this.form.oldStanza = val.stanz;
      let data = {};
      data = this.stanzaOpt.filter((item) => {
        return item.stanz == this.form.oldStanza;
      });
      console.log(data, "data");
      this.form.oldxkname = data[0].subjectName;
      this.getHl("课次", 5);
    },
    //!确定代课日期
    confirmDkrq(date) {
      this.showDkrq = false;
      this.form.date = this.formatDate(date);
    },
    //!确定互调日期
    confirmHdrq(date) {
      let data1 = new Date(date).getDay();
      this.zjHt = this.getZj(data1);
      this.showHdrq = false;
      this.form.olddate = this.formatDate(date);
      let tId = this.XskrOpt.filter((item) => {
        return item.teacherName == this.form.teaname;
      });
      console.log(this.zjHt);
      let val = {
        schoolId: this.schoolId,
        // classId: this.form.oldclassId ? this.form.oldclassId[2] : "",
        // unionid: tId[0].teacherUnionid,
        // weekName: this.zjHt,
        type: 4,
      };
      main
        .selectTakeStanza(val)
        .then((res) => {
          console.log(res.data, "获得的数据-------");
          this.stanzaOpt = res.data;
          this.xkOpt = res.data;
        })
        .catch((err) => {});
    },
    //!确定学期
    confirmXq(val) {
      let ind = this.$refs.picker.getIndexes();
      console.log("this.XqOpt", this.XqOpt);
      let one = this.XqOpt[ind[0]] ? this.XqOpt[ind[0]].id : "";
      let two = this.XqOpt[ind[0]]
        ? this.XqOpt[ind[0]].children[ind[1]].id
        : "";
      let three = this.XqOpt[ind[0]]
        ? this.XqOpt[ind[0]].children[ind[1]].children[ind[2]].id
        : "";
      this.form.classId = [one, two, three];
      this.form.className = val.join(",");
      this.showXq = false;
      this.getHl("班级", 1);
    },
    //!确定互调学期
    confirmHdxq(val) {
      let ind = this.$refs.picker2.getIndexes();
      let one = this.XqOpt[ind[0]].id;
      let two = this.XqOpt[ind[0]].children[ind[1]].id;
      let three = this.XqOpt[ind[0]].children[ind[1]].children[ind[2]].id;
      this.form.oldclassId = [one, two, three];
      this.form.oldclassName = val.join(",");
      this.showHdxq = false;
      this.getHl("班级", 4);
    },
    //!获取当前学期
    getXq() {
      main2
        .seeMobileScore({ schoolId: this.schoolId })
        .then((res) => {
          this.xqName = res.data.name;
          this.cjlbId = res.data.id;
          this.getXqNj();
          this.getKcZdy();
        })
        .catch((err) => {});
    },
    //!获取课次自定义参数
    getKcZdy() {
      main
        .selectSetTake({ cjlbId: this.cjlbId })
        .then((res) => {
          this.kcZdyArr = res.data.changeTakes.filter((item) => {
            return item.type == 0;
          });
          this.kcZdyArr = this.kcZdyArr.map((item) => {
            item.stanz = item.name;
            return item;
          });
          //   this.stanzaOptHt = this.stanzaOptHt.concat(this.kcZdyArr);
        })
        .catch((err) => {});
    },
    findEdit(id) {
      main
        .selectTakeTranById({ id: id })
        .then((res) => {
          this.form = res.data;
          if (JSON.stringify(this.form) !== "{}") {
            //   编辑
            this.formType = 1;
          } else {
            //   新增
            this.formType = 0;
            //
          }
          console.log(this.formType, "this.formType");
        })
        .catch((err) => {});
    },
    setForm() {
      if (this.editContent.id) {
        this.findEdit(this.editContent.id);
      }
    },
  },
  created() {
    this.clearForm();
    this.getXq();
    this.getOpt(5);
    // if (JSON.stringify(this.$route.query) !== "{}") {
    //   main
    //     .selectTakeTranById({ id: this.$route.query.id })
    //     .then((res) => {
    //       this.form = res.data;
    //       console.log("已赋值");
    //     })
    //     .catch((err) => {});
    // }
    // this.setForm();
  },
};
</script>

<style scoped>
.topBtn {
  width: 100%;
  padding: 15px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: #ffffff;
}
.contain {
  height: 100vh;
}
.inp_contain {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inp_contain_inner {
  width: 100%;
  margin: 10px;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
}
.moni {
  background-color: #ebedf0;
  width: 100%;
  height: 20px;
}
.font-bold {
  font-weight: bold;
  padding-top: 10px;
}
/deep/.modifyStyle {
  height: 87px !important;
}
</style>
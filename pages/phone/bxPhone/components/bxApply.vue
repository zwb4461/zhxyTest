<template>
  <div class="contain">
    <!-- <div class="topBtn" v-if="ifFzr == 1">
      <van-button type="info" style="width: 90%" @click="toFzr"
        >报修负责人进入</van-button
      >
    </div> -->
    <div class="topTitle">
      <span style="color: #0064ff">报修申请</span>
      <span style="font-size: 16px; margin-top: 5px">{{ xqName }}</span>
    </div>
    <div class="form">
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 18px">报修时间:</span>
      </div>
      <van-field
        style="margin-right: 15px"
        readonly
        v-model="form.bxTime"
        input-align="right"
        size="large"
      />
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 18px"
          ><span style="color: red">*</span>报修物品:</span
        >
      </div>
      <div class="inp_contain">
        <div class="inp_contain_inner">
          <van-field
            readonly
            clickable
            input-align="right"
            :value="form.maxCate + '-' + form.minCate + '-' + form.name"
            placeholder="选择报修物品"
            @click="showDl = true"
          />
        </div>
      </div>
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 18px">处理教师:</span>
      </div>
      <van-field input-align="right" readonly v-model="form.clTeaname" />
      <div class="moni"></div>
      <div class="font-bold" v-show="!ZdyAddress">
        <span style="margin-left: 15px; font-size: 18px"
          ><span style="color: red">*</span>报修地点:</span
        >
      </div>
      <div class="inp_contain">
        <div class="inp_contain_inner" style="border: none">
          <el-select
            style="width: 100%; font-size: 18px"
            v-model="form.address"
            allow-create
            filterable
            ref="select"
            @hook:mounted="cancalReadOnly"
            @visible-change="cancalReadOnly"
          >
            <el-option
              v-for="item in tableData_right"
              :key="item.id"
              :label="item.address"
              :value="item.address"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- <div class="inp_contain" v-show="!ZdyAddress">
        <div class="inp_contain_inner">
          <van-field
            v-show="!ZdyAddress"
            readonly
            input-align="right"
            placeholder="请选择报修地点"
            v-model="form.address"
            @click="showAddress = true"
          />
        </div>
      </div>
      <div class="moni" v-show="!ZdyAddress"></div>
      <div class="font-bold" v-show="ZdyAddress">
        <span style="margin-left: 15px; font-size: 18px"
          ><span style="color: red">*</span>自定义报修地点:</span
        >
      </div>
      <div class="inp_contain" v-show="ZdyAddress">
        <div class="inp_contain_inner">
          <van-field
            placeholder="请输入报修地点"
            v-show="ZdyAddress"
            input-align="right"
            v-model="form.address"
          />
        </div>
      </div> -->
      <div class="moni" v-show="ZdyAddress"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 18px"
          ><span style="color: red">*</span>情况说明:</span
        >
      </div>
      <div class="inp_contain">
        <div class="inp_contain_inner">
          <van-field
            placeholder="请输入情况说明"
            v-model="form.explaion"
            rows="3"
            input-align="left"
            autosize
            type="textarea"
          />
        </div>
      </div>
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 18px">报修图片:</span>
      </div>
      <div style="width: 100%">
        <van-uploader
          multiple
          style="margin-top: 15px; margin-left: 15px"
          v-model="form.bxImg"
          :after-read="uploadImg"
          :max-count="9"
          preview-size="80px"
          @delete="delImg"
        />
      </div>
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 18px">报修教师:</span>
      </div>
      <van-field input-align="right" readonly v-model="userName" />
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 18px">处理状态:</span>
      </div>
      <van-field input-align="right" value="待处理" readonly />
      <div class="moni"></div>
      <div class="topBtn1" style="position: sticky; bottom: 37px">
        <van-button
          type="info"
          style="width: 70%; border-radius: 10px"
          @click="submit"
          >申请报修</van-button
        >
      </div>
      <!--报修大类弹出层 -->
      <van-popup v-model="showDl" round position="bottom">
        <van-picker
          value-key="name"
          show-toolbar
          :columns="bxOpt"
          @cancel="showDl = false"
          @confirm="confirmBxwp"
        />
      </van-popup>
      <van-popup v-model="showAddress" round position="bottom">
        <van-picker
          value-key="address"
          show-toolbar
          :columns="tableData_right"
          @cancel="showAddress = false"
          @confirm="confirmAddress"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import main1 from "~/api/baoxiu";
import main from "~/api/baoxiuCs";
import axios from "axios";
import { Toast } from "vant";
export default {
  head() {
    return {
      title: "设备报修",
      meta: [],
    };
  },

  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    userName() {
      return this.$store.state.auth.userInfo.name;
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
  },
  data() {
    return {
      ZdyAddress: false,
      ifFzr: 0,
      value11: "",
      showPicker11: false,
      showAddress: false,
      columns11: [
        "杭州",
        "宁波",
        "温州",
        "绍兴",
        "湖州",
        "嘉兴",
        "金华",
        "衢州",
      ],
      xqName: "",
      wp: "",
      showDl: false,
      bxOpt: [],
      postData: [],
      fileIds: [],
      form: {
        bxTime: "",
        maxCate: "",
        minCate: "",
        name: "",
        address: "",
        explaion: "",
        bxImg: [],
        bxTeaid: "",
        clTeaid: "",
        clTeaname: "",
        status: 0,
      },
      tableData_left: [],
      tableData_center: [],
      tableData_right: [],
    };
  },
  watch: {
    schoolId(val) {
      this.getTime();
      this.getBxDl();
      this.getXq();
      this.getFzr();
    },
  },
  methods: {
    cancalReadOnly(onOff) {
      this.$nextTick(() => {
        if (!onOff) {
          const { select } = this.$refs;
          const input = select.$el.querySelector(".el-input__inner");
          input.removeAttribute("readonly");
        }
      });
    },
    //!判断是否是负责人
    getFzr() {
      main
        .findCs({
          schoolId: this.schoolId,
          unionid: this.unionid,
        })
        .then((res) => {
          if (res.data.setRepcates.length > 0) {
            console.log("负责人");
            this.ifFzr = 1;
          } else {
            console.log("不是负责人");
            this.ifFzr = 0;
          }
        })
        .catch((err) => {});
    },
    onConfirm11(value) {
      this.value = value;
      this.showPicker = false;
    },
    //!确定地址
    confirmAddress(value) {
      if (value.address == "自定义") {
        this.ZdyAddress = true;
      } else {
        this.form.address = value.address;
      }
      this.showAddress = false;
    },
    //!跳转负责人
    toFzr() {
      this.$router.push("/phone/bxPhone/components/fzr");
    },
    //!删除照片
    delImg(file, detail) {
      // 删除指定下标的图片对象
      if (isNaN(detail.index) || detail.index >= this.postData.length) {
        return false;
      }
      let tmp = [];
      for (let i = 0, len = this.postData.length; i < len; i++) {
        if (this.postData[i] !== this.postData[detail.index]) {
          tmp.push(this.postData[i]);
        }
      }
      this.postData = tmp;
      console.log("this.postData1", this.postData);
      this.fileIds.splice(detail.index, 1);
    },
    //!上传图片
    uploadImg(file) {
      this.postData.push(file); // postData是一个数组
      if (file instanceof Array) {
        file.map((item) => {
          let params = new FormData();
          params.append("imgFile", item.file);
          let config = {
            headers: {
              //添加请求头
              "Content-Type": "multipart/form-data",
            },
          };
          //把 uploadUrl 换成自己的 上传路径
          axios
            .post("http://103.219.33.112:10010/upload", params, config)
            .then((res) => {
              console.log("上传照片--res", res.data);
              this.fileIds.push({
                url: res.data.data,
              });
            })
            .catch((err) => {});
        });
      } else {
        let params = new FormData();
        params.append("imgFile", file.file);
        let config = {
          headers: {
            //添加请求头
            "Content-Type": "multipart/form-data",
          },
        };
        //把 uploadUrl 换成自己的 上传路径
        axios
          .post("http://103.219.33.112:10010/upload", params, config)
          .then((res) => {
            console.log("上传照片--res", res.data);
            this.fileIds.push({
              url: res.data.data,
            });
          })
          .catch((err) => {});
      }
    },
    //!提交
    submit() {
      let val = this.form;
      val.bxTeaid = this.unionid;
      val.bxImg = this.fileIds;
      val.schoolId = this.schoolId;
      if (!this.form.name) {
        Toast.fail("请填写报修物品");
      } else if (!this.form.address && !this.ZdyAddress) {
        Toast.fail("请填写地址");
      } else if (!this.form.explaion) {
        Toast.fail("请填写情况说明");
      } else {
        main1
          .edit(val)
          .then((res) => {
            Toast.success("报修申请成功");
            this.$store.commit("auth/setBxActive", 1);
            this.form = {
              bxTime: "",
              maxCate: "",
              minCate: "",
              name: "",
              address: "",
              explaion: "",
              bxImg: [],
              bxTeaid: "",
              clTeaid: "",
              clTeaname: "",
              status: 0,
            };
            this.getTime();
            this.refresh();
          })
          .catch((err) => {});
      }
    },
    //!获取报修大类数据源
    getBxDl() {
      main
        .findCs({ schoolId: this.schoolId })
        .then((res) => {
          this.bxOpt = res.data.setRepcates.map((item) => {
            if (item.children.length == 0) {
              item.children.push({ name: "", children: [] });
              item.children[0].children.push({ name: "", children: [] });
            } else if (item.children.length > 0) {
              item.children.map((subItem) => {
                if (subItem.children.length == 0) {
                  subItem.children.push({ name: "", children: [] });
                }
              });
            }
            item.children.map((item1) => {
              item1.children.map((item2) => {
                delete item2.children;
              });
            });
            return item;
          });
          console.log(this.bxOpt, "11111111111");
          this.tableData_center = res.data.setRepapjs;
          this.tableData_right = res.data.setAddrs;
        })
        .catch((err) => {});
    },
    //!确定报修物品
    confirmBxwp(val) {
      console.log(val);
      this.showDl = false;
      this.form.maxCate = val[0];
      this.form.minCate = val[1];
      this.form.name = val[2];
      this.bxOpt.map((item) => {
        if (item.name == val[0]) {
          this.form.clTeaname = item.owner;
          this.form.clTeaid = item.ownerId;
        }
      });
    },
    //!获取当前时间
    getTime() {
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      this.form.bxTime = yy + "-0" + mm + "-" + dd + " " + hh + ":" + mf;
    },
    //!获取当前学期
    getXq() {
      main
        .seeMobileScore({ schoolId: this.schoolId })
        .then((res) => {
          this.xqName = res.data.name;
          //   this.classId = res.data.id;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getTime();
    this.getBxDl();
    this.getXq();
    this.getFzr();
  },
};
</script>

<style lang="scss" scoped>
.contain {
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
}
.topBtn {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.topBtn1 {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.topTitle {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.font-bold {
  font-weight: bold;
  padding-top: 10px;
}
/deep/.van-field__control,
/deep/.van-field__control--right {
  font-size: 18px;
}
/deep/.van-popup,
/deep/.van-popup--round,
/deep/.van-popup--bottom {
  height: 350px;
}
.inp_contain {
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inp_contain_inner {
  width: 100%;
  margin: 15px;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
}
.inp_contain_inner1 {
  width: 100%;
  margin: 15px;
}
.moni {
  background-color: #ebedf0;
  width: 100%;
  height: 20px;
}
/deep/.el-input__inner {
  font-size: 18px;
}
</style>

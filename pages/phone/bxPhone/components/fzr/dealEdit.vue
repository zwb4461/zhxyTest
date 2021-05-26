<template>
  <div>
    <div class="topTitle">
      <span style="color: #0064ff">报修信息</span>
      <span style="font-size: 16px; margin-top: 5px"
        >2020/2021学年第一学期</span
      >
    </div>
    <div class="form">
      <van-cell-group>
        <div class="moni"></div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">报修时间:</span>
        </div>
        <van-field input-align="right" readonly :value="form.bxTime" />
        <div class="moni"></div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">报修物品:</span>
        </div>
        <van-field
          input-align="right"
          readonly
          :value="form.maxCate + '-' + form.minCate + '-' + form.name"
          placeholder="选择报修物品"
        />
        <div class="moni"></div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">报修地点:</span>
        </div>
        <van-field input-align="right" readonly v-model="form.address" />
        <div class="moni"></div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">情况说明:</span>
        </div>
        <van-field
          input-align="left"
          readonly
          v-model="form.explaion"
          rows="3"
          autosize
          type="textarea"
        />
        <div class="moni"></div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">报修图片:</span>
        </div>
        <div style="width: 100%; padding-left: 15px">
          <!-- <van-uploader
            disabled
            :deletable="false"
            style="margin-top: 15px; margin-left: 15px"
            v-model="form.bxImg"
            :after-read="uploadImg"
            :max-count="9"
            preview-size="80px"
          /> -->
          <img
            :src="item.url"
            v-for="(item, index) in form.bxImg"
            :key="index"
            style="width: 100px; height: 100px; margin: 5px"
            @click="getImg_Bx(index)"
          />
        </div>
        <div class="moni"></div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">报修教师:</span>
        </div>
        <van-field input-align="right" readonly v-model="form.bxTeaname" />

        <!-- <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">处理状态:</span>
        </div>
        <van-field
          input-align="right"
          clickable
          :value="
            form.status == 0
              ? '待处理'
              : form.status == 1
              ? '处理中'
              : form.status == 2
              ? '已处理'
              : ''
          "
          readonly
          @click="showStatus = true"
        /> -->
        <div class="moni"></div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">处理教师:</span>
        </div>
        <van-field input-align="right" readonly v-model="form.clTeaname" />
        <div class="moni"></div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">开始处理:</span>
        </div>
        <van-field readonly input-align="right" v-model="form.ksclTime" />
      </van-cell-group>
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 18px">反馈信息:</span>
      </div>
      <div class="inp_contain">
        <div class="inp_contain_inner">
          <van-field
            input-align="left"
            v-model="form.fkxx"
            rows="3"
            autosize
            type="textarea"
          />
        </div>
      </div>
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 18px">反馈图片:</span>
      </div>
      <div style="width: 100%; padding-left: 15px">
        <van-uploader
          accept="image/*"
          multiple
          style="margin-top: 15px; margin-left: 15px"
          v-model="form.fkImg"
          :after-read="uploadImg"
          :max-count="9"
          preview-size="80px"
          @delete="delImg"
        />
      </div>
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 18px">修复时间:</span>
      </div>
      <van-field input-align="right" readonly v-model="form.xfTime" />
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 18px">故障历时:</span>
      </div>
      <van-field input-align="right" readonly v-model="form.history" />
      <div class="moni"></div>
      <div class="title">
        <span>配件清单</span>
      </div>
      <el-table
        :header-cell-style="{ 'text-align': 'center' }"
        size="mini"
        :data="form.pjqd"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序" width="35"> </el-table-column>
        <el-table-column prop="name" label="名称">
          <template slot-scope="scope">
            <el-select
              style="width: 100%"
              v-model="scope.row.name"
              size="mini"
              allow-create
              filterable
              @change="changeName(scope.row)"
              ref="select"
              @hook:mounted="cancalReadOnly"
              @visible-change="cancalReadOnly"
            >
              <el-option
                v-for="item in pjqdOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="sum" label="数量" width="70">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.sum"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dw" label="单位" width="50"> </el-table-column>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              circle
              @click="delRow(form.pjqd, scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="button_add">
        <el-button
          size="mini"
          style="width: 95%; background-color: #f0f0f0"
          @click="addRow"
          >+</el-button
        >
      </div>
      <!-- 待处理 -->
      <div class="topBtn" v-show="form.status == 0">
        <van-button style="width: 25%; border-radius: 10px" @click="submit(3)"
          >保存</van-button
        >
        <van-button
          type="info"
          style="width: 25%; border-radius: 10px"
          @click="submit(1)"
          >处理中</van-button
        >
        <van-button
          type="primary"
          style="width: 25%; border-radius: 10px"
          @click="submit(2)"
          >已处理</van-button
        >
      </div>
      <!-- 处理中 -->
      <div class="topBtn" v-show="form.status == 1">
        <van-button style="width: 35%; border-radius: 10px" @click="submit(3)"
          >保存</van-button
        >
        <van-button
          type="primary"
          style="width: 35%; border-radius: 10px"
          @click="submit(2)"
          >已处理</van-button
        >
      </div>
      <!-- 已处理 -->
      <div class="topBtn" v-show="form.status == 2">
        <van-button
          style="width: 70%; border-radius: 10px"
          type="primary"
          @click="submit(3)"
          >{{
            form.kxg == 0 ? "返回" : form.kxg == 1 ? "保存" : ""
          }}</van-button
        >
      </div>
      <!--报修大类弹出层 -->
      <van-popup v-model="showStatus" round position="bottom">
        <van-picker
          value-key="name"
          show-toolbar
          :columns="StatusOpt"
          @cancel="showStatus = false"
          @confirm="confirmStatus"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import main1 from "~/api/baoxiu";
import main from "~/api/baoxiuCs";
import axios from "axios";
import { ImagePreview } from "vant";
import { Toast } from "vant";
export default {
  head() {
    return {
      title: "报修管理",
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
      fileIds: [],
      pjqdOpt: [],
      wp: "",
      showDl: false,
      showStatus: false,
      bxOpt: [],
      StatusOpt: [
        {
          name: "待处理",
          disabled: true,
        },
        {
          name: "处理中",
          disabled: false,
        },
        {
          name: "已处理",
          disabled: false,
        },
      ],
      postData: [],
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
      tableData_right: [],
    };
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
    //!预览报修图片
    getImg_Bx(index) {
      let arr = this.form.bxImg.map((item) => {
        return item.url;
      });
      ImagePreview({
        images: arr, // 预览图片的那个数组
        showIndex: true,
        loop: false,
        startPosition: index, // 指明预览第几张图
      });
    },
    //!配件清单改变名称，赋值单位
    changeName(row) {
      let data = "";
      data = this.pjqdOpt.find((item) => {
        return row.name == item.name;
      });
      row.dw = data.dw;
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
      this.fileIds.splice(detail.index, 1);
      console.log(this.fileIds);
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
              console.log("上传照片--res", res.data.data);
              this.fileIds.push({
                url: res.data.data,
              });
              console.log(this.fileIds, " this.fileIds");
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
            console.log("上传照片--res", res.data.data);
            this.fileIds.push({
              url: res.data.data,
            });
            console.log(this.fileIds, " this.fileIds");
          })
          .catch((err) => {});
      }
    },
    back() {
      this.$router.push("/phone/bxPhone/components/fzr");
    },
    //!添加表格行
    addRow() {
      this.form.pjqd.push({ sum: 1, dw: "个" });
    },
    //!删除行
    delRow(row, index) {
      row.splice(index, 1);
    },
    //!确定状态
    confirmStatus(val) {
      this.showStatus = false;
      if (val.name == "待处理") {
        this.form.status = 0;
      } else if (val.name == "处理中") {
        this.form.status = 1;
      } else if (val.name == "已处理") {
        this.form.status = 2;
      }
      console.log(val.name, this.form.status);
    },
    //!删除该报修
    delItem() {
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main1
            .del({ id: this.form.id })
            .then((res) => {
              Toast.success("删除成功");
              this.$router.push("/Phone/bxPhone");
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },

    //!提交
    submit(type) {
      let val = JSON.parse(JSON.stringify(this.form));
      val.bxTeaid = this.unionid;
      val.fkImg = this.fileIds;
      if (type == 1) {
        //   ?处理中
        val.status = 1;
      } else if (type == 2) {
        //   ?已处理
        val.status = 2;
      } else if (type == 3 && this.form.kxg == 0) {
        //   ?保存
        this.$router.push("/Phone/bxPhone");
      }
      main1
        .edit(val)
        .then((res) => {
          Toast.success("保存成功");
          this.$router.push("/Phone/bxPhone");
        })
        .catch((err) => {});
    },
    //!获取报修大类数据源
    getBxDl() {
      main
        .findCs({})
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
          this.tableData_right = res.data.setAddrs;
          this.pjqdOpt = res.data.setRepapjs;
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
  },
  created() {
    this.getTime();
    this.getBxDl();
    console.log(this.$route.query.data, "路由信息");
    this.form = this.$route.query.data;
    if (this.form.status == 2) {
      this.StatusOpt[1].disabled = true;
    }
    this.fileIds = this.form.fkImg;
    this.postData = this.form.fkImg;
    console.log(this.postData, "----");
  },
};
</script>

<style lang="scss" scoped>
.topBtn {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  bottom: 0;
  z-index: 999;
  background-color: #ffffff;
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
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0064ff;
  font-size: 18px;
}
.font-bold {
  font-weight: bold;
  padding-top: 10px;
}
/deep/.van-field__control,
/deep/.van-field__control--right {
  font-size: 18px;
}
.button_add {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
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
.moni {
  background-color: #ebedf0;
  width: 100%;
  height: 20px;
}
.btn_contain {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}
</style>

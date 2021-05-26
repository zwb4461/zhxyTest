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
        <div class="inp_contain" v-show="form.status == 0">
          <div class="inp_contain_inner">
            <van-field
              v-show="form.status == 0"
              input-align="right"
              readonly
              clickable
              :value="form.maxCate + '-' + form.minCate + '-' + form.name"
              placeholder="选择报修物品"
              @click="showDl = true"
            />
          </div>
        </div>
        <div class="inp_contain" v-show="form.status != 0">
          <div class="inp_contain_inner">
            <van-field
              v-show="form.status != 0"
              input-align="right"
              readonly
              :value="form.maxCate + '-' + form.minCate + '-' + form.name"
              placeholder="选择报修物品"
            />
          </div>
        </div>
        <div class="moni"></div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">处理教师:</span>
        </div>
        <van-field readonly input-align="right" v-model="form.clTeaname" />
        <div class="moni"></div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">报修地点:</span>
        </div>
        <div class="inp_contain">
          <div class="inp_contain_inner" style="border: none">
            <el-select
              style="width: 100%"
              v-model="form.address"
              filterable
              allow-create
              placeholder="请选择报修地点"
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
        <!-- <div class="inp_contain">
          <div class="inp_contain_inner">
            <van-field
              :readonly="form.status != 0"
              input-align="right"
              v-model="form.address"
            />
          </div>
        </div> -->
        <div class="moni"></div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">情况说明:</span>
        </div>
        <div class="inp_contain">
          <div class="inp_contain_inner">
            <van-field
              :readonly="form.status != 0"
              input-align="left"
              v-model="form.explaion"
              rows="1"
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
            accept="image/*"
            v-show="form.status == 0"
            multiple
            style="margin-top: 15px; margin-left: 15px"
            v-model="form.bxImg"
            :after-read="uploadImg"
            :max-count="9"
            preview-size="80px"
            @delete="delImg"
          />

          <img
            v-show="form.status == 1 || form.status == 2"
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
        <van-field input-align="right" readonly :value="form.bxTeaname" />
        <div class="moni"></div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">处理状态:</span>
        </div>
        <van-field
          input-align="right"
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
        />

        <div class="moni"></div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">开始处理:</span>
        </div>
        <van-field readonly input-align="right" v-model="form.ksclTime" />
        <div class="moni"></div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">反馈信息:</span>
        </div>
        <van-field
          readonly
          input-align="right"
          v-model="form.fkxx"
          rows="1"
          autosize
          type="textarea"
        />
        <div class="moni"></div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">反馈图片:</span>
        </div>
        <div
          style="width: 100%; padding-left: 15px"
          v-show="form.fkImg.length > 0"
        >
          <img
            :src="item.url"
            v-for="(item, index) in form.fkImg"
            :key="index"
            style="width: 100px; height: 100px; margin: 5px"
            @click="getImg(index)"
          />
        </div>
        <van-field
          v-show="form.fkImg.length == 0"
          readonly
          input-align="right"
        />
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
      </van-cell-group>
      <div class="title">
        <span>配件清单</span>
      </div>
      <div class="table_class">
        <div class="table_inner">
          <el-table
            :header-cell-style="{ 'text-align': 'center' }"
            size="mini"
            :data="form.pjqd"
            border
            style="width: 100%; margin-bottom: 10px"
          >
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="name" label="名称"> </el-table-column>
            <el-table-column prop="sum" label="数量" width="50">
            </el-table-column>
            <el-table-column prop="dw" label="单位" width="50">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="topBtn" style="position: sticky; bottom: 0; z-index: 999">
        <!-- <van-button
          v-show="form.status == 0"
          type="danger"
          style="width: 45%"
          @click="delItem"
          >删除</van-button
        > -->
        <div class="btn_contain">
          <van-button
            v-show="form.status == 0"
            type="info"
            style="width: 70%; border-radius: 10px"
            @click="submit"
            >修改</van-button
          >
        </div>
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
  methods: {
    //!预览反馈图片
    getImg(index) {
      let arr = this.form.fkImg.map((item) => {
        return item.url;
      });
      ImagePreview({
        images: arr, // 预览图片的那个数组
        showIndex: true,
        loop: false,
        startPosition: index, // 指明预览第几张图
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
    //!提交
    submit() {
      let val = this.form;
      val.bxTeaid = this.unionid;
      val.bxImg = this.fileIds;
      console.log(val);
      main1
        .edit(val)
        .then((res) => {
          Toast.success("修改成功");
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
          this.tableData_center = res.data.setRepapjs;
          this.tableData_right = res.data.setAddrs;
        })
        .catch((err) => {});
    },
    //!确定报修物品
    confirmBxwp(val) {
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
    this.fileIds = this.form.bxImg;
    this.postData = this.form.bxImg;
    console.log(this.postData, "----");
  },
};
</script>

<style lang="scss" scoped>
.topBtn {
  width: 100%;
  min-height: 40px;
  display: flex;
  justify-content: space-around;
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
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0064ff;
  font-size: 18px;
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
.table_class {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table_inner {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
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

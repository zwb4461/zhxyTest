<template>
  <div>
    <div class="search">
      <el-select
        clearable
        size="small"
        v-model="search.sbdl"
        placeholder="设备大类"
        class="inp"
        @focus="getBxDl"
        @change="changeBxDl1"
      >
        <el-option
          v-for="item in tableData_left"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <el-select
        clearable
        size="small"
        v-model="search.sbzl"
        placeholder="设备子类"
        class="inp"
      >
        <el-option
          v-for="item in search.sbzlOpt"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <!-- <el-date-picker
        class="inp"
        style="width: 365px"
        size="small"
        v-model="search.dataTime"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker> -->
      <el-select
        clearable
        size="small"
        v-model="search.status"
        placeholder="审核状态"
        class="inp"
      >
        <el-option
          v-for="item in search.statusOpt"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button size="small" type="primary" @click="searchTable"
        >查询</el-button
      >
      <el-button size="small" type="primary" @click="addBtn">+新增</el-button>
    </div>
    <el-table
      :header-cell-style="{ 'text-align': 'center' }"
      border
      size="small"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="bxTime" label="报修时间" align="center">
      </el-table-column>
      <el-table-column prop="maxCate" label="报修大类" align="center">
      </el-table-column>
      <el-table-column prop="minCate" label="报修小类" align="center">
      </el-table-column>
      <el-table-column prop="name" label="物品名称" align="center">
      </el-table-column>
      <el-table-column prop="address" label="报修地点" align="center">
      </el-table-column>
      <el-table-column
        prop="explaion"
        label="情况说明"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="bxTeaname" label="报修教师" align="center">
      </el-table-column>
      <el-table-column prop="status" label="处理状态" align="center">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.status == 0">待处理</el-tag>
            <el-tag type="warning" v-if="scope.row.status == 1">处理中</el-tag>
            <el-tag type="success" v-if="scope.row.status == 2">已处理</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="clTeaname" label="处理教师" align="center">
      </el-table-column>
      <el-table-column prop="xfTime" label="修复时间" align="center">
      </el-table-column>
      <el-table-column prop="history" label="故障历时" align="center">
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <a-button size="small" type="primary" @click="see(scope.row)"
            >查看</a-button
          >
          <a-button
            size="small"
            @click="edit(scope.row)"
            :disabled="scope.row.status == 1 || scope.row.status == 2"
            >编辑</a-button
          >
          <a-button
            size="small"
            type="danger"
            @click="del(scope.row)"
            :disabled="scope.row.status == 1 || scope.row.status == 2"
            >删除</a-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="报修"
      :visible.sync="showBx"
      width="450px"
      :close-on-click-modal="false"
    >
      <div>
        <el-form :model="form" label-width="85px" :rules="rules" ref="ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label-width="10px">
                <span
                  >{{ className
                  }}{{
                    classXq == 1 ? "第一学期" : classXq == 2 ? "第二学期" : ""
                  }}</span
                >
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="报修时间:">
            <span>{{ form.bxTime }}</span>
          </el-form-item>
          <el-form-item prop="maxCate" label="报修大类:">
            <el-select
              :disabled="formType == 3"
              @change="changeBxDl"
              size="small"
              v-model="form.maxCate"
            >
              <el-option
                v-for="item in maxCateOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="minCate" label="报修小类:">
            <el-select
              :disabled="formType == 3"
              @change="changeBxXl"
              size="small"
              v-model="form.minCate"
            >
              <el-option
                v-for="item in minCateOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="name" label="物品名称:">
            <el-select
              :disabled="formType == 3"
              size="small"
              v-model="form.name"
              filterable
              allow-create
            >
              <el-option
                v-for="item in nameOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="address" label="报修地点:">
            <el-select
              :disabled="formType == 3"
              v-model="form.address"
              size="small"
              filterable
              allow-create
              default-first-option
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
          </el-form-item>
          <el-form-item label="情况说明:">
            <el-input
              style="width: 80%"
              :disabled="formType == 3"
              size="small"
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 20 }"
              v-model="form.explaion"
            ></el-input>
          </el-form-item>
          <el-form-item label="报修图片:">
            <el-upload
              :class="{ disabled: formType == 3 }"
              :disabled="formType == 3"
              action="http://103.219.33.112:10010/upload"
              list-type="picture-card"
              :limit="9"
              :on-preview="pictureYl"
              :on-remove="handleRemove"
              :on-success="uploadPictureSuccess"
              name="imgFile"
              :file-list="form.bxImg"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="showPictureYl" :append-to-body="true">
              <!-- style="height: 80px" -->

              <img width="100%" :src="dialogImageUrl" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="报修教师:">
            <span>{{ userName }}</span>
          </el-form-item>
          <el-form-item label="处理状态:">
            <el-tag v-show="form.status == 0">待处理</el-tag>
            <el-tag type="warning" v-show="form.status == 1">处理中</el-tag>
            <el-tag type="success" v-show="form.status == 2">已处理</el-tag>
          </el-form-item>
          <el-form-item label="处理教师:">
            <span>{{ form.clTeaname }}</span>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="showBx = false">取 消</el-button>
        <el-button
          v-show="formType != 3"
          type="primary"
          @click="submitBx('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 用于查看 -->
    <el-dialog
      :close-on-click-modal="false"
      title="查看报修"
      :visible.sync="showBaoXiu"
      width="750px"
    >
      <el-form label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label-width="10px">
              <span
                >{{ className
                }}{{
                  classXq == 1 ? "第一学期" : classXq == 2 ? "第二学期" : ""
                }}</span
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修时间:">
              <span>{{ form.bxTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理状态:">
              <el-select
                :disabled="formType == 3"
                size="small"
                v-model="form.status"
              >
                <el-option
                  v-for="item in search.statusOpt"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修大类:">
              <span>{{ form.maxCate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理教师:">
              <span>{{ form.clTeaname }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修小类:">
              <span>{{ form.minCate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始处理:">
              <span style="margin-right: 5px">{{ form.ksclTime }}</span>
              <span>{{ form.zzTeaname }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="物品名称:">
              <span>{{ form.name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="修复时间:">
              <span style="margin-right: 5px">{{ form.xfTime }}</span>
              <span>{{ form.zzxfTeaname }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修地点:">
              <span>{{ form.address }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="故障历时:">
              <span>{{ form.history }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="情况说明:">
              <el-input
                :disabled="formType == 3"
                v-model="form.explaion"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 10 }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="反馈信息:">
              <el-input
                :disabled="formType == 3"
                v-model="form.fkxx"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 10 }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修图片:">
              <el-image
                style="width: 120px; height: 80px; margin: 5px"
                :src="item.url"
                v-for="(item, index) in form.bxImg"
                :key="index"
                :preview-src-list="urlList"
              >
              </el-image>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="反馈图片:">
              <el-image
                style="width: 120px; height: 80px; margin: 5px"
                :src="item.url"
                v-for="(item, index) in form.fkImg"
                :key="index"
                :preview-src-list="urlListFk"
              >
              </el-image>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修教师:">
              <span>{{ form.bxTeaname }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="pjqd">
        <span>配件清单</span>
      </div>
      <el-table
        :header-cell-style="{ 'text-align': 'center' }"
        size="mini"
        :data="form.pjqd"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="名称">
          <template slot-scope="scope">
            <el-select
              style="width: 100%"
              v-model="scope.row.name"
              size="mini"
              :disabled="formType == 3"
              allow-create
              filterable
              clearable
              @change="changeName(scope.row)"
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
        <el-table-column prop="sum" label="数量" width="100">
          <template slot-scope="scope">
            <el-input
              type="number"
              :disabled="formType == 3"
              size="mini"
              v-model="scope.row.sum"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dw" label="单位" width="100"> </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showBaoXiu = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import main from "~/api/baoxiu";
import main1 from "~/api/baoxiuCs";
export default {
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
      rules: {
        maxCate: [
          { required: true, message: "请选择报修大类", trigger: "blur" },
        ],
        minCate: [
          { required: true, message: "请选择报修小类", trigger: "blur" },
        ],
        name: [{ required: true, message: "请选择物品名称", trigger: "blur" }],
        address: [
          { required: true, message: "请选择报修地点", trigger: "blur" },
        ],
      },
      className: "",
      classXq: "",
      urlList: [],
      pjqdOpt: [
        {
          name: "待处理",
          id: 0,
        },
        {
          name: "已处理",
          id: 1,
        },
        {
          name: "处理中",
          id: 2,
        },
      ],
      urlListFk: [],
      hour: 120,
      showBaoXiu: false,
      gettime: "",
      formType: 1, //1--新增，2编辑
      tableData: [],
      search: {
        sbdlOpt: [],
        sbzlOpt: [],
        statusOpt: [
          {
            name: "待处理",
            id: 0,
          },
          {
            name: "处理中",
            id: 1,
          },
          {
            name: "已处理",
            id: 2,
          },
        ],
        sbdl: "",
        sbzl: "",
        dataTime: "",
        status: "",
      },
      maxCateOpt: [],
      minCateOpt: [],
      nameOpt: [],
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
      showBx: false,
      showPictureYl: false,
      tableData_left: [],
      tableData_center: [],
      tableData_right: [],
      dialogImageUrl: "",
    };
  },
  methods: {
    //!图片预览
    pictureYl(file) {
      this.dialogImageUrl = file.url;
      this.showPictureYl = true;
    },
    //!移除图片
    handleRemove(file, fileList) {
      this.form.bxImg = fileList;
      //   console.log(fileList, "fileList1");
      //   console.log(this.form.bxImg, " this.form.bxImg1");
      //   fileList.map((item) => {
      //     this.form.bxImg.push({
      //       url: item.url,
      //     });
      //   });
      console.log(fileList, "fileList2");
      console.log(this.form.bxImg, " this.form.bxImg2");
    },
    //!图片上传成功
    uploadPictureSuccess(res, file, fileList) {
      console.log(fileList, "图片上传成功");
      this.form.bxImg.push({
        url: res.data,
      });
      console.log(this.form);
    },
    //!搜索-改变报修大类赋值报修小类opt
    changeBxDl1(val) {
      this.search.sbzlOpt = [];
      this.tableData_left.filter((item) => {
        if (item.children && item.name == val) {
          item.children.map((subItem) => {
            this.search.sbzlOpt.push(subItem);
          });
        }
      });
    },
    //!改变报修大类获取报修小类和报修大类负责人
    changeBxDl(val) {
      this.minCateOpt = [];
      this.nameOpt = [];
      this.form.minCate = "";
      this.form.name = "";
      this.tableData_left.map((item) => {
        if (item.name == val) {
          this.form.clTeaname = item.owner;
          this.form.clTeaid = item.ownerId;
        }
        if (item.children && item.name == val) {
          item.children.map((subItem) => {
            this.minCateOpt.push({
              name: subItem.name,
              id: subItem.id,
            });
          });
        }
      });
    },
    //!改变报修小类获取物品名称
    changeBxXl(val) {
      this.nameOpt = [];
      this.form.name = "";
      this.tableData_left.map((item) => {
        if (item.children) {
          item.children.map((subItem) => {
            if (subItem.children && subItem.name == val) {
              subItem.children.map((subItem1) => {
                this.nameOpt.push({
                  name: subItem1.name,
                  id: subItem1.id,
                });
              });
            }
          });
        }
      });
    },
    //!获取报修大类数据源
    getBxDl() {
      main1
        .findCs({})
        .then((res) => {
          this.tableData_left = res.data.setRepcates;
          //   .filter((item) => {
          //     return item.ownerId.indexOf(this.unionid) > -1;
          //   });
          this.tableData_center = res.data.setRepapjs;
          this.tableData_right = res.data.setAddrs;
          this.search.sbzlOpt = [];
          res.data.setRepcates.map((item) => {
            if (item.children) {
              item.children.map((subItem) => {
                this.search.sbzlOpt.push(subItem);
              });
            }
          });
          console.log(this.search.sbzlOpt, "this.sbzlOpt");
          //?赋值报修大类数据源
          this.maxCateOpt = [];
          this.tableData_left.map((item) => {
            this.maxCateOpt.push({
              name: item.name,
              id: item.id,
            });
          });
        })
        .catch((err) => {});
    },
    //!提交报修
    submitBx(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let val = this.form;
          val.schoolId = this.schoolId;
          if (this.formType == 1) {
            //新增
            val.bxTeaid = this.unionid;
          } else if (this.formType == 2) {
            //编辑
          }
          main
            .edit(val)
            .then((res) => {
              this.$message.success("提交成功!");
              this.getTable(20, 1);
              this.showBx = false;
            })
            .catch((err) => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //!查询
    searchTable() {
      let val = {
        unionid: this.unionid,
        schoolId: this.schoolId,
        maxCate: this.search.sbdl,
        minCate: this.search.sbzl,
        status: this.search.status,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.records;
        })
        .catch((err) => {});
    },
    //!获取数据
    getTable(pageNum, pageSize) {
      let val = {
        // pageNum: pageNum,
        // pageSize: pageSize,
        unionid: this.unionid,
        schoolId: this.schoolId,
        type: 1,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.records;
        })
        .catch((err) => {});
    },
    //!重置表单
    clearForm() {
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
        status: 0,
      };
      this.minCateOpt = [];
      this.nameOpt = [];
      this.maxCateOpt = [];
    },
    //!点击新增按钮
    addBtn() {
      this.clearForm();
      this.getTime();
      this.getBxDl();
      this.formType = 1;
      this.showBx = true;
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
    //!赋值表单
    setForm(row) {
      this.form = JSON.parse(JSON.stringify(row));
      if (row.bxImg) {
        this.urlList = row.bxImg.map((item) => {
          return item.url;
        });
      } else {
        this.urlList = [];
      }
      if (row.fkImg) {
        this.urlListFk = row.fkImg.map((item) => {
          return item.url;
        });
      } else {
        this.urlListFk = [];
      }
    },
    //!查看
    see(row) {
      this.formType = 3;
      this.setForm(row);
      this.showBaoXiu = true;
    },
    //!编辑
    edit(row) {
      console.log(row);
      this.getBxDl();
      this.formType = 2;
      this.setForm(row);
      this.showBx = true;
    },
    //!删除
    del(row) {
      this.$confirm({
        title: "确定删除吗?",
        content: "该数据将永久删除",
        cancelText: "取消",
        okText: "删除",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .del({ id: row.id })
            .then((res) => {
              this.getTable(20, 1);
              this.$message.success("删除成功!");
            })
            .catch((err) => {});
        },
      });
    },
    getXq() {
      main1
        .seeMobileScore({ schoolId: this.schoolId })
        .then((res) => {
          this.className = res.data.name;
          this.classXq = res.data.djxq;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getTable(20, 1);
    this.getXq();
  },
};
</script>

<style scoped>
.search {
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.inp {
  width: 180px;
  margin-right: 15px;
}
/deep/ .el-upload--picture-card {
  width: 120px;
  height: 80px;
}
/deep/ .el-upload {
  width: 120px;
  height: 80px;
  line-height: 80px;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 120px;
  height: 80px;
  line-height: 80px;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 120px;
  height: 80px;
  line-height: 80px;
}
/deep/ .avatar {
  width: 120px;
  height: 80px;
}
/deep/.disabled .el-upload--picture-card {
  display: none !important;
}
/deep/.el-textarea.is-disabled,
/deep/.el-textarea__inner {
  color: #000000 !important;
}
/deep/.el-input.is-disabled,
/deep/.el-input__inner {
  color: #000000 !important;
}
/deep/.el-icon-circle-close {
  background-color: #b0ace6 !important;
}
</style>

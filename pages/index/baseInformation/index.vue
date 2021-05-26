<template>
  <div>
    <div class="search_contain">
      <div v-show="this.unionid1 == 'unionid1'" style="margin-right: 10px">
        <el-input
          class="inp"
          size="small"
          v-model="search.name"
          placeholder="姓名"
        ></el-input>
        <el-input
          class="inp"
          size="small"
          v-model="search.zjhm"
          placeholder="证件号码"
        ></el-input>
        <el-input
          class="inp"
          size="small"
          v-model="search.yddh"
          placeholder="移动电话"
        ></el-input>
        <el-button size="small" type="primary" @click="getTable(1, 20, 3)"
          >查询</el-button
        >
      </div>
      <el-button
        size="small"
        @click="add"
        v-show="this.unionid1 == 'unionid1' && tableData.length > 0"
        >新增</el-button
      >
      <el-button
        size="small"
        type="primary"
        @click="ddsync"
        v-show="this.unionid1 == 'unionid1'"
        >钉钉同步</el-button
      >
      <el-upload
        v-show="this.unionid1 == 'unionid1'"
        style="margin: 0 10px"
        class="upload-demo"
        action="http://103.219.33.112:10010/importTeacherInfo"
        :show-file-list="false"
        name="uploadFile"
        :on-success="upSuccess1"
        :data="{
          schoolId: schoolId,
          userid: unionid,
        }"
      >
        <el-button size="small" type="primary">导入数据</el-button>
      </el-upload>

      <el-button
        v-show="this.unionid1 == 'unionid1'"
        size="small"
        type="primary"
        @click="upMb"
        >模板下载</el-button
      >
    </div>
    <div class="table_contain">
      <el-table
        border
        size="small"
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="isppdd" label="钉钉绑定">
          <template slot-scope="scope">
            <div v-if="scope.row.isppdd == 1">
              <i class="el-icon-circle-check icons"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="zjhm" label="证件号码"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <div v-if="scope.row.sex == '男'" class="nan">男</div>
            <div v-else-if="scope.row.sex == '女'" class="nv">女</div>
          </template>
        </el-table-column>
        <el-table-column prop="jg" label="籍贯"> </el-table-column>
        <el-table-column prop="yddh" label="移动号码"> </el-table-column>
        <el-table-column prop="csny" label="出生年月"> </el-table-column>
        <el-table-column prop="cjgzsj" label="考入编制时间"> </el-table-column>
        <el-table-column prop="dtype" label="党派"> </el-table-column>
        <el-table-column prop="rdsj" label="入党年月"> </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="see(scope.row)"
              >查看</el-button
            >
            <el-button type="danger" size="mini" @click="del(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="changePageSize"
        @current-change="changePageNum"
        :current-page="currentPage"
        :page-sizes="[20, 40, 60, 80]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="教师基本信息"
      :visible.sync="showDia"
      width="700px"
    >
      <div>
        <el-form :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名:" label-width="80px">
                    <el-input
                      :disabled="formType == 2"
                      size="small"
                      v-model="form.name"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别:" label-width="80px">
                    <el-select
                      style="width: 100%"
                      size="small"
                      v-model="form.sex"
                      :disabled="formType == 2"
                    >
                      <el-option
                        v-for="item in sexOpt"
                        :key="item.id"
                        :label="item.val"
                        :value="item.val"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="证件号码:">
                    <el-input
                      :disabled="formType == 2"
                      size="small"
                      v-model="form.zjhm"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="籍贯:">
                    <el-input
                      :disabled="formType == 2"
                      size="small"
                      v-model="form.jg"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="出生年月:">
                    <el-date-picker
                      :disabled="formType == 2"
                      style="width: 100%"
                      size="small"
                      v-model="form.csny"
                      type="date"
                      value-format="yyyy年MM月dd日"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="移动号码:">
                    <el-input
                      :disabled="formType == 2"
                      size="small"
                      v-model="form.yddh"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-upload
                  :disabled="formType == 2"
                  style="width: 200px"
                  ref="upload"
                  action="http://103.219.33.112:10010/upload"
                  :on-success="upSuccess"
                  name="imgFile"
                  :show-file-list="false"
                >
                  <img
                    v-if="file_url.length == 1"
                    :src="file_url"
                    style="
                      width: 200px;
                      height: 263px;
                      border: 1px solid #dcdfe6;
                    "
                  />
                  <div v-else class="upStyle">
                    <i class="el-icon-plus"></i>
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="考入编制时间:">
                <el-date-picker
                  :disabled="formType == 2"
                  style="width: 100%"
                  size="small"
                  v-model="form.cjgzsj"
                  type="date"
                  value-format="yyyy年MM月dd日"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="退休时间:">
                <el-date-picker
                  :disabled="formType == 2"
                  style="width: 100%"
                  size="small"
                  v-model="form.txsj"
                  type="date"
                  value-format="yyyy年MM月dd日"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="党派:">
                <el-select
                  :disabled="formType == 2"
                  style="width: 100%"
                  size="small"
                  v-model="form.dtype"
                >
                  <el-option
                    v-for="item in dpOpt"
                    :key="item.id"
                    :label="item.val"
                    :value="item.val"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="实足教龄:">
                <el-input
                  :disabled="formType == 2"
                  size="small"
                  v-model="form.szjl"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入党年月:">
                <el-date-picker
                  :disabled="formType == 2"
                  style="width: 100%"
                  size="small"
                  v-model="form.rdsj"
                  type="date"
                  value-format="yyyy年MM月dd日"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学历(全日制):">
                <el-select
                  :disabled="formType == 2"
                  style="width: 100%"
                  size="small"
                  v-model="form.teainfoxls[0].xl"
                >
                  <el-option
                    v-for="item in xlOpt"
                    :key="item.id"
                    :label="item.val"
                    :value="item.val"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学历(最高):">
                <el-select
                  :disabled="formType == 2"
                  style="width: 100%"
                  size="small"
                  v-model="form.teainfoxls[1].xl"
                >
                  <el-option
                    v-for="item in xlOpt"
                    :key="item.id"
                    :label="item.val"
                    :value="item.val"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="毕业学校:">
                <el-input
                  :disabled="formType == 2"
                  size="small"
                  v-model="form.teainfoxls[0].school"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="毕业学校:">
                <el-input
                  :disabled="formType == 2"
                  size="small"
                  v-model="form.teainfoxls[1].school"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="专业:">
                <el-input
                  :disabled="formType == 2"
                  size="small"
                  v-model="form.teainfoxls[0].major"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专业:">
                <el-input
                  :disabled="formType == 2"
                  size="small"
                  v-model="form.teainfoxls[1].major"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="毕业时间:">
                <el-date-picker
                  :disabled="formType == 2"
                  style="width: 100%"
                  size="small"
                  v-model="form.teainfoxls[0].graduationTime"
                  type="date"
                  value-format="yyyy年MM月dd日"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="毕业时间:">
                <el-date-picker
                  :disabled="formType == 2"
                  style="width: 100%"
                  size="small"
                  v-model="form.teainfoxls[1].graduationTime"
                  type="date"
                  value-format="yyyy年MM月dd日"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <span>录入人:</span>
              <span style="margin-right: 15px">小明</span>
              <span>录入时间:</span>
              <span>2021-01-23</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span>修改人:</span>
              <span style="margin-right: 15px">小明</span>
              <span>修改时间:</span>
              <span>2021-01-23</span>
            </el-col>
          </el-row> -->
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="showDia = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import main from "~/api/teacherInfo";
export default {
  props: {
    unionid1: {
      type: String,
      default: "unionid1",
    },
  },
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      total: 0,
      // 分页相关↑
      showDia: false,
      formType: 0, //0新增--1编辑--2查看
      loading: false,
      search: {
        name: "",
        zjhm: "",
        yddh: "",
      },
      file_url: [],
      tableData: [],
      form: {
        sex: "",
        teainfoxls: [
          {
            graduationTime: "",
            major: "",
            school: "",
            xl: "",
          },
          {
            graduationTime: "",
            major: "",
            school: "",
            xl: "",
          },
        ],
      },
      xlOpt: [
        {
          id: 0,
          val: "博士",
        },
        {
          id: 1,
          val: "硕士",
        },
        {
          id: 2,
          val: "本科",
        },
        {
          id: 3,
          val: "大专",
        },
        {
          id: 4,
          val: "中专和中技",
        },
        {
          id: 5,
          val: "技工学校",
        },
        {
          id: 6,
          val: "高中",
        },
        {
          id: 7,
          val: "初中",
        },
        {
          id: 8,
          val: "小学",
        },
      ],
      dpOpt: [
        {
          id: 0,
          val: "共产党",
        },
        {
          id: 1,
          val: "无党派",
        },
      ],
      sexOpt: [
        {
          id: 0,
          val: "男",
        },
        {
          id: 1,
          val: "女",
        },
      ],
    };
  },
  methods: {
    //!上传文件成功
    upSuccess1() {
      this.tableData(1, 20);
      this.$message.success("上传成功!");
    },
    //!下载模板
    upMb() {
      window.open(
        "http://103.219.33.112:10010/uploadpic/教师基本信息导入模板.xls"
      );
    },
    //!每页条数
    changePageSize(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTable(1, this.pageSize);
    },
    //!当前第几页
    changePageNum(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getTable(val, this.pageSize);
    },
    //!钉钉同步
    ddsync() {
      this.loading = true;
      main
        .pp({ schoolId: this.schoolId })
        .then((res) => {
          this.loading = false;
          this.$message.success("同步成功");
          this.getTable(1, this.pageSize);
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    //!上传成功后回调
    upSuccess(res, file, fileList) {
      this.file_url = [];
      this.file_url.push(res.data);
      this.form.pictrue = res.data;
    },
    //!赋值表单
    setForm(row) {
      this.form = JSON.parse(JSON.stringify(row));
    },
    //!清空表单
    clearForm() {
      this.file_url = [];
      this.form = {
        sex: "",
        teainfoxls: [
          {
            graduationTime: "",
            major: "",
            school: "",
            xl: "",
          },
          {
            graduationTime: "",
            major: "",
            school: "",
            xl: "",
          },
        ],
      };
    },
    //!获取表格数据
    getTable(pageNum, pageSize, num) {
      if (num == 3) {
        this.currentPage = 1;
      }
      let val = {
        schoolId: this.schoolId,
        pageNum: pageNum,
        pageSize: pageSize,
        zjhm: this.search.zjhm,
        name: this.search.name,
        yddh: this.search.yddh,
      };
      //this.unionid1 != "unionid1" ===== 个人
      //this.unionid1 == "unionid1" ===== 管理
      if (this.unionid1 != "unionid1") {
        val.unionid = this.unionid1;
      }
      main
        .sel(val)
        .then((res) => {
          this.pageSize = res.data.size;
          this.total = res.data.total;
          this.tableData = res.data.records.map((item) => {
            if (!item.teainfoxls) {
              item.teainfoxls = [
                {
                  graduationTime: "",
                  major: "",
                  school: "",
                  xl: "",
                },
                {
                  graduationTime: "",
                  major: "",
                  school: "",
                  xl: "",
                },
              ];
            } else if (item.teainfoxls.length == 1) {
              item.teainfoxls.push({
                graduationTime: "",
                major: "",
                school: "",
                xl: "",
              });
            }
            return item;
          });
        })
        .catch((err) => {});
    },
    //!提交表单
    submit() {
      let val = JSON.parse(JSON.stringify(this.form));
      val.schoolId = this.schoolId;
      val.unionid = this.unionid;
      if (this.formType == 0) {
        // ?新增
        main
          .add(val)
          .then((res) => {
            this.$message.success("新增成功");
            this.getTable(1, this.pageSize);
            this.currentPage = 1;
            this.showDia = false;
          })
          .catch((err) => {
            this.$message.error(err);
            this.showDia = false;
          });
      } else if (this.formType == 1) {
        console.log("编辑");
        //?编辑
        main
          .edit(val)
          .then((res) => {
            this.$message.success("编辑成功");
            this.currentPage = 1;
            this.getTable(1, this.pageSize);
            this.showDia = false;
          })
          .catch((err) => {
            this.$message.error(err);
            this.showDia = false;
          });
      }
    },
    //!新增
    add() {
      this.formType = 0;
      this.clearForm();
      this.showDia = true;
    },
    //!编辑
    edit(row) {
      console.log(row, "row");
      this.clearForm();
      this.formType = 1;
      this.file_url = [];
      if (row.pictrue != "") {
        this.file_url.push(row.pictrue);
      }
      this.setForm(row);
      this.showDia = true;
    },
    //!查看
    see(row) {
      this.clearForm();
      this.formType = 2;
      this.file_url = [];
      if (row.pictrue != "") {
        this.file_url.push(row.pictrue);
      }
      this.setForm(row);
      this.showDia = true;
    },
    //!删除
    del(row) {
      this.$confirm({
        title: "确定删除吗?",
        cancelText: "取消",
        okText: "删除",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .del({ id: row.id })
            .then((res) => {
              this.getTable(1, this.pageSize);
              this.$message.success("删除成功!");
            })
            .catch((err) => {});
        },
      });
    },
  },
  created() {
    this.getTable(1, 20);
  },
};
</script>

<style scoped>
.search_contain {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.inp {
  width: 180px;
  margin-right: 15px;
}
.icons {
  background-color: #55c52a;
  border-radius: 50%;
  color: #ffffff;
  font-size: 18px;
}
.nan {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #ffffff;
  background-color: #1d92ff;
  border-radius: 50%;
}
.nv {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #ffffff;
  background-color: #be4fff;
  border-radius: 50%;
}
.upStyle {
  width: 200px;
  height: 263px;
  border: 1px solid #dcdfe6;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
::v-deep .el-input.is-disabled .el-input__inner {
  color: #000000;
}
</style>
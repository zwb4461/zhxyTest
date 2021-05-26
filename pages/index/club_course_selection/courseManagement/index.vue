<template>
  <div id="box">
    <div class="select_data">
      <el-input
        size="small"
        style="width: 150px"
        placeholder="课名"
        v-model="select_data.name"
        clearable
      >
      </el-input>
      <el-select
        size="small"
        style="width: 150px; margin: 0 15px"
        v-model="select_data.leibieName"
        placeholder="类别"
        clearable
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.value"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        size="small"
        style="width: 150px"
        placeholder="指导教师"
        v-model="select_data.teacherName"
        clearable
      >
      </el-input>
      <el-select
        size="small"
        style="width: 150px; margin: 0 15px"
        v-model="select_data.status"
        placeholder="审核状态"
        clearable
      >
        <el-option label="未提交" :value="0"> </el-option>
        <el-option label="待审核" :value="1"> </el-option>
        <el-option label="通过" :value="2"> </el-option>
        <el-option label="未通过" :value="3"> </el-option>
      </el-select>
      <el-button size="small" type="primary" @click="dataInit">查询</el-button>
      <el-button size="small" style="width: 120px" @click="category"
        >类别设置</el-button
      >
      <el-button size="small" @click="importLoad2()">导出</el-button>
    </div>
    <div class="table-box">
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 99%"
          max-height="700px"
        >
          <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column label="课程名称" prop="name"></el-table-column>
          <el-table-column label="类别" prop="leibieName"></el-table-column>
          <el-table-column
            label="指导教师"
            width="95"
            prop="teacherName"
          ></el-table-column>
          <el-table-column label="每周课时" prop="weekday"></el-table-column>
          <el-table-column label="开课时间" prop="classTime"></el-table-column>
          <!-- <el-table-column label="报名开启" width="136" prop="tableData">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isOpen == 1" type="success">开启</el-tag>
              <el-tag v-else type="warning">关闭</el-tag>
            </template>
          </el-table-column> -->
          <!-- <el-table-column label="报名时间" prop="startTime"></el-table-column> -->
          <el-table-column
            label="限定名额"
            width="80"
            prop="sum"
          ></el-table-column>
          <el-table-column label="报名人数" prop="tableData">
            <template slot-scope="scope">
              <div class="importLoad">
                <u
                  style="color: #0064ff; cursor: pointer"
                  @click="
                    applicantStatus(scope.$index, scope.row, 'applicantStatus')
                  "
                >
                  {{ scope.row.sum - scope.row.surplus }}
                </u>
                <el-button
                  size="mini"
                  @click="importLoad(scope.$index, scope.row)"
                  >导出</el-button
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="审核状态" width="130" prop="tableData">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 1">待审核</el-tag>
              <el-tag v-if="scope.row.status == 2" type="success">通过</el-tag>
              <el-tag v-if="scope.row.status == 0" type="warning"
                >未提交</el-tag
              >
              <el-tag type="danger" v-if="scope.row.status == 3">未通过</el-tag>
            </template></el-table-column
          >
          <!-- <el-table-column
            label="创建时间"
            width="185"
            prop="createTime"
          ></el-table-column> -->
          <el-table-column label="操作" width="165" prop="tableData">
            <template slot-scope="scope">
              <div class="btn" v-if="scope.row.isLock === 1">
                <el-button
                  size="small"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row, 'see')"
                  >查看</el-button
                >
              </div>

              <div class="btn" v-else>
                <el-button
                  size="small"
                  @click="handleEdit(scope.$index, scope.row, 'edit')"
                  >审核</el-button
                >
                <el-button
                  v-show="false"
                  size="small"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row, 'del')"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="table_page.pagenum"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="table_page.total"
      >
      </el-pagination>
    </div>
    <a
      v-show="false"
      id="downloadUpload"
      :href="importUrl"
      :download="download_name"
    >
    </a>
    <el-drawer
      title="社团选课"
      :visible.sync="visible_value.drawer"
      :direction="visible_value.direction"
      :before-close="handleClose"
      :modal="false"
      :wrapperClosable="false"
      :modal-append-to-body="false"
      :with-header="false"
    >
      <div class="title-box">
        <span>社团选课</span>
        <i class="el-icon-close" @click="handleClose"></i>
      </div>
      <template>
        <el-form
          ref="form"
          :label-position="visible_value.labelPosition"
          :model="form"
          label-width="80px"
          class="form"
        >
          <el-form-item label="课程名称" prop="name">
            <el-input
              size="small"
              v-model="form.name"
              placeholder="请输入课程名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="leibieName">
            <el-select
              style="width: 100%"
              placeholder="请选择"
              v-model="form.leibieName"
              size="small"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指导教师">
            {{ form.teacherName }}
            <!-- <el-input size="small" placeholder="请填写指导教师"></el-input> -->
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input
              type="textarea"
              v-model="form.brief"
              :rows="4"
              placeholder="请输入内容"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="限定名额" prop="sum">
            <el-input-number
              :min="1"
              v-model="form.sum"
              label="限定名额"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="可报名年级段" class="kbnjd" prop="grade">
            <el-select
              v-model="form.grade"
              style="width: 100%"
              size="small"
              filterable
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in optionsClass"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="每周课时">
            <aside
              class="mzks"
              v-for="(list, index) in weekTimeValue"
              :key="index"
            >
              <el-select
                v-model="list.weekValue"
                size="small"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="(list, index) in optionMzks"
                  :key="index"
                  :label="list"
                  :value="list"
                >
                </el-option>
              </el-select>
              <el-time-picker
                v-model="list.timeValue"
                size="small"
                is-range
                range-separator="~"
                format="HH:mm"
                value-format="HH:mm"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
              >
              </el-time-picker>
            </aside>
            <el-button class="mzks-btn" size="small" @click="addWeekTime()"
              >+</el-button
            >
          </el-form-item>
          <el-form-item label="指定学员">
            <el-select
              style="width: 100%"
              size="small"
              filterable
              multiple
              placeholder="请选择"
              v-model="form.students"
            >
              <el-option
                v-for="item in optionStudents"
                :key="item.id"
                :label="item.name + ' ( ' + item.className + ' ) '"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开课时间">
            <el-date-picker
              size="small"
              v-model="form.classTime"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报名人数">
            {{ form.bmPerson }}
          </el-form-item>
          <el-form-item label="审核状态">
            {{ audit_status[form.status] }}
          </el-form-item>
          <!-- <el-form-item style="text-align:right">
            <el-button
              size="small"
              type="success"
              class="success—baocun"
              @click="autoSave"
              v-show="form.isLock !== 1"
              >保 存</el-button
            >
          </el-form-item> -->
        </el-form>
        <div class="btn_box">
          <el-button size="small" @click="visible_value.drawer = false"
            >取 消</el-button
          >
          <el-button
            v-if="form.status === 0"
            size="small"
            type="primary"
            @click="onSubmit(1)"
            >提交审核</el-button
          >
          <template v-else>
            <el-button
              v-show="form.status === 2 && form.isLock !== 1"
              style="background-color: #ff6400; border: 1px solid #ff6400"
              size="small"
              type="primary"
              @click="onSubmit('锁定')"
              >锁 定</el-button
            >
            <el-button
              v-show="form.status !== 2"
              size="small"
              type="primary"
              @click="onSubmit(2)"
              >通 过</el-button
            >

            <el-button
              type="danger"
              v-show="form.isLock !== 1"
              size="small"
              @click="onSubmit(3)"
              >未通过</el-button
            >
          </template>
        </div>
      </template>
    </el-drawer>

    <el-drawer
      class="category"
      title="类别设置"
      :visible.sync="visible_value.category_drawer"
      :direction="visible_value.direction"
      :before-close="handleClose"
      :modal="false"
      :wrapperClosable="false"
      :modal-append-to-body="false"
      :with-header="false"
    >
      <div class="title-box">
        <span>类别设置</span>
        <i class="el-icon-close" @click="handleClose"></i>
      </div>
      <aside class="category-box">
        <el-table
          :data="tableDataCategory"
          border
          style="width: 99%"
          max-height="400px"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column label="类别名称" prop="tableDataCategory">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.value"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="danger"
                @click="
                  handleDelCategory(scope.$index, scope.row, 'delCategory')
                "
                >删除</el-button
              >
            </template>
          </el-table-column> -->
        </el-table>

        <el-button
          size="small"
          style="width: 100%; margin-top: 12px"
          @click="handleAdd_category"
          >+</el-button
        >
      </aside>
      <div class="btn_box">
        <el-button size="small" @click="visible_value.category_drawer = false"
          >取 消</el-button
        >
        <el-button size="small" type="primary" @click="handleAddCategory"
          >确 定</el-button
        >
      </div>
    </el-drawer>
    <el-drawer
      title="报名学生"
      :visible.sync="visible_value.signUp"
      :direction="visible_value.direction"
      :before-close="handleClose"
      :modal="false"
      :wrapperClosable="false"
      :modal-append-to-body="false"
      :with-header="false"
      id="signUp"
    >
      <div class="title-box">
        <span>{{ applicantStatusTitle }} - 报名学生</span>
        <i class="el-icon-close" @click="handleClose"></i>
      </div>
      <aside class="signUp">
        <el-table :data="tableDataSingUp" border>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column label="所在班级" prop="className"></el-table-column>
          <el-table-column label="姓名" prop="studentName"></el-table-column>
          <el-table-column label="报名人" prop="name"></el-table-column>
          <el-table-column label="报名时间" prop="createTime"></el-table-column>
          <el-table-column label="报名状态" prop="tableDataSingUp">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isHave == 1" type="success">成功</el-tag>
              <el-tag type="warning" v-else>失败</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </aside>
    </el-drawer>
  </div>
</template>

<script>
import http from "~/api/personalCenter";
export default {
  components: {},
  props: {
    cjlbId: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      select_data: {},
      options: [], // 类别
      optionsClass: [], // 可报名年级
      optionStudents: [], // 指定学员
      optionMzks: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"], // 每周课时
      tableData: [],
      tableDataCategory: [],
      tableDataSingUp: [],
      visible_value: {
        drawer: false,
        category_drawer: false,
        signUp: false,
        direction: "ltr",
        labelPosition: "right",
      },
      table_page: {
        total: null,
        pagesize: 20,
        pagenum: 1,
      },
      form: {
        status: 0,
        brief: "",
        leibieName: "",
        grade: [],
        name: "",
        students: [],
        sum: "",
        classTime: "",
        bmPerson: "",
        weekTime: [], // 每周课时
      },
      // rules: {
      //   name: [{ required: true, message: "必填项", trigger: "blur" }],
      //   leibieName: [{ required: true, message: "必填项", trigger: "blur" }],
      //   sum: [{ required: true, message: "必填项", trigger: "blur" }],
      //   grade: [{ required: true, message: "必填项", trigger: "blur" }]
      // },
      weekTimeValue: [], // 每周课时
      audit_status: {
        0: "未提交",
        1: "待审核",
        2: "通过",
        3: "未通过",
      },
      switching_value: "",
      applicantStatusTitle: "",
      importUrl: "",
      download_name: "学籍",
    };
  },
  methods: {
    importLoad2() {
      window.location.href =
        "http://103.219.33.112:10010/importStatisExcel?schoolId=" +
        this.schoolId +
        "&eleSchoolId=" +
        this.cjlbId;
      // http
      //   .importStatisExcel({ schoolId: this.schoolId })
      //   .then(result => {
      //     console.log(result);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    importLoad(index, val) {
      // console.log(val);
      this.importUrl = "";
      let data = {
        eleName: val.name,
        isdaochu: 1,
        schoolId: this.schoolId,
        eleSchoolId: this.cjlbId,
      };

      http
        .selectStatis(data)
        .then((result) => {
          this.importUrl = result.data;

          if (this.importUrl != "") {
            setTimeout(() => {
              document.getElementById("downloadUpload").click();
            }, 100);
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    handleSizeChange(val) {
      this.table_page.pagesize = val;
      this.dataInit();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.table_page.pagenum = val;
      this.dataInit();
      // console.log(`当前页: ${val}`);
    },
    category() {
      this.visible_value.category_drawer = true;
    },
    addWeekTime() {
      if (this.weekTimeValue.length === 7) {
        this.$message.warning("不可超过七天！");
        return;
      }
      this.weekTimeValue.push({ weekValue: "", timeValue: ["08:00", "17:00"] });
    },
    handleEdit(index, val, str) {
      let data = JSON.parse(JSON.stringify(val));
      data.grade = JSON.parse(data.grade);
      data.students = JSON.parse(data.students);
      this.weekTimeValue = JSON.parse(data.weekTime);
      this.form = data;
      this.switching_value = str;
      this.visible_value.drawer = true;
    },
    handleClose() {
      this.visible_value.drawer = false;
      this.visible_value.category_drawer = false;
      this.visible_value.signUp = false;
    },
    handleDel(index, val, str) {
      let id = val.id;
      http
        .deleteEleCou({ id: id })
        .then((res) => {
          this.$message.success(res.msg);
          this.dataInit();
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    handleDelCategory(index, val, str) {
      let id = val.id;
      http
        .deleteCategory({ id: id })
        .then((res) => {
          this.$message.success(res.msg);
          this.category_product();
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    handleAdd_category() {
      this.tableDataCategory.push({
        value: "",
      });
    },
    applicantStatus(index, val, str) {
      this.applicantStatusTitle = val.name;
      let query = {
        eleName: val.name,
        unionid: this.unionid,
        schoolId: val.schoolId,
        eleSchoolId: this.cjlbId,
      };

      http
        .selectStatis(query)
        .then((res) => {
          this.tableDataSingUp = res.data;
        })
        .catch((err) => {
          this.$message.error(err);
        });

      this.visible_value.signUp = true;
    },
    handleAddCategory() {
      let query = {
        categoryList: this.tableDataCategory,
        schoolId: this.schoolId,
      };

      http
        .insertCategory(query)
        .then((res) => {
          this.visible_value.category_drawer = false;
          this.category_product();
          this.$message.success(res.msg);
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    autoSave() {
      let cd = this.form.students.length;

      if (this.form.sum < cd) {
        this.$message.warning("报名人员已超过限定名额！");
        return false;
      }

      let a = JSON.parse(JSON.stringify(this.form));
      a.grade = JSON.stringify(a.grade);
      a.students = JSON.stringify(a.students);
      a.weekTime = JSON.stringify(this.weekTimeValue);

      let params = {
        elecateId: 1,
        ...a,
        teacherUnionid: this.unionid,
        schoolId: this.schoolId,
        eleSchoolId: this.cjlbId,
      };

      // this.$refs.form.validate(valid => {
      //   if (valid) {
      http
        .setEleCate(params)
        .then((res) => {
          this.dataInit();
          this.$message.success(res.msg);
          this.visible_value.drawer = false;
        })
        .catch((err) => {
          // console.log(err);
          this.$message.error(err);
        });
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    onSubmit(index) {
      let cd = this.form.students.length;

      if (this.form.sum < cd) {
        this.$message.warning("报名人员已超过限定名额！");
        return false;
      }
      // this.form.grade = JSON.stringify(this.form.grade);
      // this.form.students = JSON.stringify(this.form.students);
      // this.form.weekTime = JSON.stringify(this.weekTimeValue);
      let a = JSON.parse(JSON.stringify(this.form));
      a.grade = JSON.stringify(a.grade);
      a.students = JSON.stringify(a.students);
      a.weekTime = JSON.stringify(this.weekTimeValue);
      let params;
      if (index === "锁定") {
        params = {
          elecateId: 1,
          ...a,
          teacherUnionid: this.unionid,
          isLock: 1,
          ismanager: 1,
          schoolId: this.schoolId,
          eleSchoolId: this.cjlbId,
        };
      } else {
        params = {
          elecateId: 1,
          ...a,
          teacherUnionid: this.unionid,
          status: index,
          ismanager: 1,
          schoolId: this.schoolId,
          eleSchoolId: this.cjlbId,
        };
      }

      http
        .setEleCate(params)
        .then((res) => {
          this.dataInit();
          this.$message.success(res.msg);
          this.visible_value.drawer = false;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    dataInit() {
      let params = {
        ...this.select_data,
        unionid: this.unionid,
        ismanager: 1,
        pagesize: this.table_page.pagesize,
        pagenum: this.table_page.pagenum,
        eleSchoolId: this.cjlbId,
      };

      http
        .selectEleCou(params)
        .then((res) => {
          this.tableData = res.data.list;
          this.table_page.total = res.data.total;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    category_product() {
      http
        .selectCategoryALL({
          schoolId: this.schoolId,
          type: 1,
          eleSchoolId: this.cjlbId,
        })
        .then((res) => {
          this.options = res.data;
          this.tableDataCategory = res.data;

          return http.selectStudent({
            pagesize: 100000,
            schoolId: this.schoolId,
            studentSelection: 1,
          });
        })
        .then((res) => {
          this.optionStudents = res.data.list;

          return http.getClass({
            schoolId: this.schoolId,
            getnj: 1,
            eleSchoolId: this.cjlbId,
          });
        })
        .then((res) => {
          this.optionsClass = res.data;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
  computed: {
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    userInfo() {
      return this.$store.state.auth.userInfo;
    },
  },
  watch: {},
  beforeCreate() {},
  created() {
    this.dataInit();
    this.category_product();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped>
#box {
  .importLoad {
    /deep/.el-button {
      margin-left: 12px;
    }
  }

  /deep/.el-drawer.ltr {
    min-width: 605px;
  }

  /deep/.el-drawer__wrapper {
    left: 150px;

    /deep/.el-drawer__body {
      padding: 100px 28px 10%;
      box-sizing: border-box;
      overflow-y: auto;

      .title-box {
        z-index: 5;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgba(50, 50, 50, 1);
        background-color: #fff;
        padding: 0 25px;
        box-sizing: border-box;

        span {
          font-size: 26px;
          text-align: left;
          font-family: 方正兰亭黑-标准;
        }

        i {
          font-size: 24px;
          cursor: pointer;
        }
      }

      .btn_box {
        z-index: 5;
        border-top: 1px solid #e6e6e6;
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 58px;
        line-height: 58px;
        text-align: center;
        background-color: #fff;

        button {
          width: 120px;
        }
      }

      .success—baocun {
        width: 120px;
        border-radius: 4px;
        background-color: rgba(20, 200, 0, 1);
        color: rgba(252, 252, 252, 1);
        font-size: 14px;
        text-align: center;
        font-family: Microsoft Yahei;
        border: 1px solid rgba(255, 255, 255, 0);
      }

      .form {
        padding: 30px 25px 0;
        box-sizing: border-box;
      }

      // .scrollbar {
      //   max-height: 20vh;
      //   overflow-y: auto;
      // }

      .mzks {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .mzks-btn {
        width: 100%;
        border-radius: 4px;
        background-color: rgba(250, 250, 250, 1);
        color: rgba(100, 100, 100, 1);
        font-size: 14px;
        text-align: center;
        font-family: Roboto;
        border: 1px solid rgba(230, 230, 230, 1);
      }

      .kbnjd {
        /deep/.el-form-item__label {
          width: 105px !important;
          margin-left: -25px;
        }
      }

      .el-input-number .el-input__inner {
        text-align: left;
        padding: 0 15px;
        height: 32px;
      }

      .el-input-number__decrease,
      .el-input-number__increase {
        display: none;
      }
    }
  }

  .category {
    /deep/.el-drawer__container.el-drawer__open {
      height: 725px;
      color: rgba(16, 16, 16, 1);
      font-size: 14px;
      border: 1px solid rgba(255, 255, 255, 0);
    }
  }

  .block {
    width: 100%;
    text-align: right;
    margin-top: 30px;
    padding-right: 15px;
    box-sizing: border-box;
  }

  #signUp {
    /deep/.el-drawer {
      width: 48% !important;
    }

    /deep/th {
      background-color: #fafafa;
      text-align: center;

      /deep/.cell {
        color: rgba(100, 100, 100, 1);
        font-size: 14px;
        font-family: Microsoft Yahei;
        font-weight: 400;
      }
    }

    /deep/tr {
      background-color: #fff;

      /deep/.cell {
        color: rgba(100, 100, 100, 1);
        font-size: 14px;
        font-family: Microsoft Yahei;
        font-weight: 400;
        text-align: center;
      }
    }
  }

  .select_data {
    width: 80%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .table-box {
    margin-top: 16px;

    /deep/th {
      background-color: #fafafa;
      text-align: center;

      /deep/.cell {
        color: rgba(100, 100, 100, 1);
        font-size: 14px;
        font-family: Microsoft Yahei;
        font-weight: 400;
      }
    }

    /deep/tr {
      background-color: #fff;

      /deep/.cell {
        color: rgba(100, 100, 100, 1);
        font-size: 14px;
        font-family: Microsoft Yahei;
        font-weight: 400;
        text-align: center;
      }
    }

    .btn {
      text-align: left;
      padding-left: 10px;
      box-sizing: border-box;
    }

    /deep/.el-tag {
      width: 70px;
    }
  }
}
</style>

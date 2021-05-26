<template>
  <div>
    <div class="search_contain">
      <el-input
        class="inp"
        size="small"
        v-model="search.name"
        placeholder="姓名"
      ></el-input>
      <el-button size="small" type="primary" @click="getTable(1, 20, 3)"
        >查询</el-button
      >
      <el-button size="small" @click="add">新增</el-button>
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
        <el-table-column prop="school" label="交流学校"> </el-table-column>
        <el-table-column prop="province" label="交流省"> </el-table-column>
        <el-table-column prop="city" label="交流市"> </el-table-column>
        <el-table-column prop="time" label="交流年月"> </el-table-column>
        <el-table-column prop="endTime" label="结束时间"> </el-table-column>
        <el-table-column prop="createUser" label="录入人"> </el-table-column>
        <el-table-column prop="updateUser" label="修改人"> </el-table-column>
        <el-table-column prop="updateTime" label="修改时间"> </el-table-column>
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
      title="交流信息"
      :visible.sync="showDia"
      width="500px"
    >
      <div>
        <el-form :model="form" label-width="100px">
          <el-form-item label="姓名:">
            <el-select
              v-if="this.unionid1 == 'unionid1'"
              class="inp"
              size="small"
              v-model="form.unionid"
              :disabled="formType == 2"
              filterable
              clearable
            >
              <el-option
                v-for="item in ddOpt"
                :key="item.unionid"
                :label="item.name"
                :value="item.unionid"
              >
              </el-option>
            </el-select>
            <span v-else>{{ username }}</span>
          </el-form-item>
          <el-form-item label="交流学校:">
            <el-input
              class="inp"
              :disabled="formType == 2"
              size="small"
              v-model="form.school"
            ></el-input>
          </el-form-item>
          <el-form-item label="交流省市:">
            <el-cascader
              class="inp"
              size="small"
              :options="ssOpt"
              v-model="form.ss"
              :disabled="formType == 2"
              clearable
            >
            </el-cascader>
          </el-form-item>

          <el-form-item label="交流年月:">
            <el-date-picker
              class="inp"
              :disabled="formType == 2"
              size="small"
              v-model="form.time"
              type="date"
              value-format="yyyy年MM月dd日"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间:">
            <el-date-picker
              class="inp"
              :disabled="formType == 2"
              size="small"
              v-model="form.endTime"
              type="date"
              value-format="yyyy年MM月dd日"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
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
import main1 from "~/api/baoxiuCs";
import options from "~/utils/area_city";

export default {
  props: {
    unionid1: {
      type: String,
      default: "unionid1",
    },
  },
  computed: {
    username() {
      return this.$store.state.auth.userInfo.name;
    },
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
      },
      file_url: [],
      tableData: [],
      form: {},
      ssOpt: options.options,
      ywOpt: [
        {
          id: 0,
          val: "优质课",
        },
        {
          id: 1,
          val: "录像课",
        },
        {
          id: 2,
          val: "课题",
        },
        {
          id: 3,
          val: "论文",
        },
        {
          id: 4,
          val: "课件",
        },
      ],

      jbOpt: [
        {
          id: 0,
          val: "省级",
        },
        {
          id: 1,
          val: "市级",
        },
        {
          id: 2,
          val: "区级",
        },
      ],

      jxOpt: [
        {
          id: 0,
          val: "一等奖",
        },
        {
          id: 1,
          val: "二等奖",
        },
        {
          id: 2,
          val: "三等奖",
        },
      ],
      ddOpt: [],
    };
  },
  methods: {
    //!处理省市区格式
    setSsq() {
      this.ssOpt = this.ssOpt.map((item) => {
        if (item.children) {
          item.children.map((item1) => {
            if (item1.children) {
              delete item1.children;
            }
          });
        }
        return item;
      });
      console.log(this.ssOpt, "this.ssOpt");
    },
    //!移除图片
    handleRemove(file, fileList) {
      this.form.photoList = fileList;
    },
    //!图片上传成功
    uploadPictureSuccess(res, file, fileList) {
      console.log(res, "resresresres");
      this.form.photoList.push({
        url: res.data,
      });
    },
    //!查询钉钉用户
    fingDdUser() {
      let val = {
        pagenum: 1,
        pagesize: 10000,
        schoolId: this.schoolId,
      };
      main1
        .selectDdUsers(val)
        .then((res) => {
          this.ddOpt = res.data.list;
        })
        .catch((err) => {});
    },
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
      this.form.photoList.push(res.data);
    },
    //!赋值表单
    setForm(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.form.ss = [];
      this.form.ss[0] = this.form.province;
      this.form.ss[1] = this.form.city;
    },
    //!清空表单
    clearForm() {
      this.form = {};
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
        name: this.search.name,
      };
      if (this.unionid1 != "unionid1") {
        val.unionid = this.unionid1;
      }
      main
        .seeJl(val)
        .then((res) => {
          this.pageSize = res.data.size;
          this.total = res.data.total;
          this.tableData = res.data.records;
        })
        .catch((err) => {});
    },
    //!提交表单
    submit() {
      let val = JSON.parse(JSON.stringify(this.form));
      val.schoolId = this.schoolId;
      if (this.formType == 0) {
        val.createUser = this.unionid;
      } else {
        val.updateUser = this.unionid;
      }
      console.log(val, "val");
      if (val.ss) {
        val.province = val.ss[0];
        val.city = val.ss[1];
      }
      //?个人中心
      if (this.unionid1 != "unionid1") {
        val.unionid = this.unionid;
      }
      main
        .saveJl(val)
        .then((res) => {
          this.$message.success("提交成功");
          this.getTable(1, this.pageSize);
          this.currentPage = 1;
          this.showDia = false;
        })
        .catch((err) => {
          this.$message.error(err);
          this.showDia = false;
        });
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
            .delJl({ id: row.id })
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
    this.fingDdUser();
    this.setSsq();
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
  width: 150px;
  height: 120px;
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
.inp {
  width: 200px;
}
</style>
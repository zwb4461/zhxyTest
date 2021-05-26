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
        <el-table-column prop="type" label="类别"> </el-table-column>
        <el-table-column prop="content" label="参赛内容"> </el-table-column>
        <el-table-column prop="stuName" label="学生"> </el-table-column>
        <el-table-column prop="level" label="级别"> </el-table-column>
        <el-table-column prop="prize" label="奖项(发表)"> </el-table-column>
        <el-table-column prop="time" label="获奖时间"> </el-table-column>
        <el-table-column prop="photoList" label="证书照片">
          <template slot-scope="scope">
            <span
              style="
                text-decoration: underline;
                cursor: pointer;
                color: #0064ff;
              "
              @click="seeImage(scope.row)"
              >{{ scope.row.photoList.length }}张</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="teaName" label="指导教师"> </el-table-column>
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
      title="指导学生"
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
          <el-form-item label="类别:">
            <el-select
              class="inp"
              size="small"
              v-model="form.type"
              :disabled="formType == 2"
            >
              <el-option
                v-for="item in lbOpt"
                :key="item.id"
                :label="item.val"
                :value="item.val"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参赛内容:">
            <el-input
              class="inp"
              :disabled="formType == 2"
              size="small"
              v-model="form.content"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生:">
            <el-select
              class="inp"
              size="small"
              v-model="form.stuId"
              :disabled="formType == 2"
              filterable
              clearable
            >
              <el-option
                v-for="item in xsOpt"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="级别:">
            <el-select
              class="inp"
              size="small"
              v-model="form.level"
              :disabled="formType == 2"
            >
              <el-option
                v-for="item in jbOpt"
                :key="item.id"
                :label="item.val"
                :value="item.val"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="奖项(发表):">
            <el-select
              class="inp"
              size="small"
              v-model="form.prize"
              :disabled="formType == 2"
            >
              <el-option
                v-for="item in jxOpt"
                :key="item.id"
                :label="item.val"
                :value="item.val"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="获奖时间:">
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
          <el-form-item label="指导教师:">
            <el-select
              class="inp"
              size="small"
              v-model="form.teaId"
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
          </el-form-item>

          <el-form-item label="证书照片:">
            <!-- :on-preview="pictureYl" -->
            <el-upload
              :class="{ disabled: formType == 2 }"
              :disabled="formType == 2"
              action="http://103.219.33.112:10010/upload"
              list-type="picture-card"
              :limit="9"
              :on-remove="handleRemove"
              :on-success="uploadPictureSuccess"
              name="imgFile"
              :file-list="form.photoList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="showDia = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <el-image-viewer
      v-if="showViewer"
      :on-close="
        () => {
          showViewer = false;
        }
      "
      :url-list="imgList"
    />
  </div>
</template>

<script>
import main from "~/api/teacherInfo";
import main1 from "~/api/baoxiuCs";
import main2 from "~/api/personalCenter";
export default {
  props: {
    unionid1: {
      type: String,
      default: "unionid1",
    },
  },
  components: {
    "el-image-viewer": () =>
      import("element-ui/packages/image/src/image-viewer"),
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
      imgList: [],
      showViewer: false,
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
      form: {
        photoList: [],
      },
      xsOpt: [],
      lbOpt: [
        {
          id: 0,
          val: "美术类",
        },
        {
          id: 1,
          val: "学习类",
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
    //!查看照片
    seeImage(row) {
      this.imgList = row.photoList.map((item) => {
        return item.url;
      });
      this.showViewer = true;
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
      console.log(this.form.photoList);
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
    //!查询钉钉学生
    fingXsUser() {
      let val = {
        pagenum: 1,
        pagesize: 10000,
        distinguish: 1,
        schoolId: this.schoolId,
      };
      main2
        .selectStudent(val)
        .then((res) => {
          this.xsOpt = res.data.list;
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
    },
    //!清空表单
    clearForm() {
      this.form = {
        photoList: [],
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
        name: this.search.name,
      };
      if (this.unionid1 != "unionid1") {
        val.unionid = this.unionid1;
      }
      main
        .seeZd(val)
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
      //?个人中心
      if (this.unionid1 != "unionid1") {
        val.unionid = this.unionid;
      }
      main
        .saveZd(val)
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
            .delZd({ id: row.id })
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
    this.fingXsUser();
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
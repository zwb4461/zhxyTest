<template>
  <div>
    <div class="search">
      <el-select
        clearable
        size="small"
        v-model="search.bxdl"
        placeholder="报修大类"
        class="inp"
        @focus="getBxDl"
        @change="changeBxDl"
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
        v-model="search.bxzl"
        placeholder="报修子类"
        class="inp"
      >
        <el-option
          v-for="item in search.bxzlOpt"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <!-- <el-date-picker
        class="inp"
        style="width: 350px"
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
      <el-button size="small" style="margin-right: 15px">数据导出</el-button>
    </div>
    <el-table
      :header-cell-style="{ 'text-align': 'center' }"
      size="small"
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="bxTime" label="报修时间"> </el-table-column>
      <el-table-column prop="maxCate" label="报修大类"> </el-table-column>
      <el-table-column prop="minCate" label="报修小类"> </el-table-column>
      <el-table-column prop="name" label="物品名称"> </el-table-column>
      <el-table-column prop="address" label="报修地点"> </el-table-column>
      <el-table-column prop="explaion" label="情况说明" width="180">
      </el-table-column>
      <el-table-column prop="bxTeaname" label="报修教师"> </el-table-column>
      <el-table-column prop="status" label="处理状态">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.status == 0">待处理</el-tag>
            <el-tag type="warning" v-if="scope.row.status == 1">处理中</el-tag>
            <el-tag type="success" v-if="scope.row.status == 2">已处理</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="clTeaname" label="处理教师"> </el-table-column>
      <el-table-column prop="xfTime" label="修复时间"> </el-table-column>
      <el-table-column prop="history" label="故障历时"> </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <a-button size="small" type="primary" @click="see(scope.row)"
            >查看</a-button
          >
          <a-button size="small" @click="deal(scope.row)">处理</a-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      @size-change="changePageSize"
      @current-change="changePageNum"
      :current-page="pageNum"
      :page-sizes="[20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalDataNum"
    >
    </el-pagination> -->
    <el-dialog
      :close-on-click-modal="false"
      title="报修"
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
                :disabled="formType == 1"
                size="small"
                v-model="form.status"
              >
                <el-option
                  v-for="item in statusOpt"
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
              <span>{{ form.ksclTime }}</span>
              <span style="margin-right: 5px">{{ form.zzTeaname }}</span>
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
                disabled
                v-model="form.explaion"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 10 }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="反馈信息:">
              <el-input
                :disabled="formType == 1"
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
              <el-upload
                :class="{ disabled: formType == 1 }"
                :disabled="formType == 1"
                action="http://103.219.33.112:10010/upload"
                list-type="picture-card"
                :limit="9"
                :on-preview="pictureYl"
                :on-remove="handleRemove"
                :on-success="uploadPictureSuccess"
                name="imgFile"
                :file-list="form.fkImg"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :append-to-body="true" :visible.sync="showPictureYl">
                <img width="100%" :src="dialogImageUrl" />
              </el-dialog>
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
              :disabled="formType == 1"
              filterable
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
              :disabled="formType == 1"
              size="mini"
              v-model="scope.row.sum"
              @blur="changeSum"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dw" label="单位" width="100"> </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="danger"
              :disabled="formType == 1"
              size="mini"
              @click="delRow(form.pjqd, scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button
        v-show="formType != 1"
        size="mini"
        style="width: 100%"
        @click="addRow"
        >+</el-button
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="showBaoXiu = false">取 消</el-button>
        <el-button v-show="formType == 2" type="primary" @click="submitBX"
          >确 定</el-button
        >
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
      className: "",
      classXq: "",
      pjqdOpt: [],
      text: [],
      dialogImageUrl: "",
      showPictureYl: false,
      formType: 1, //1查看--2处理
      tableData: [{ name: "" }],
      diaTable: [],
      tableData_left: [],
      pageSize: 1,
      pageNum: 20,
      urlList: [],
      search: {
        bxdlOpt: [],
        bxzlOpt: [],
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
        bxdl: "",
        bxzl: "",
        status: "",
        dataTime: "",
      },
      showBaoXiu: false,
      statusOpt: [
        {
          name: "待处理",
          id: 0,
          disabled: true,
        },
        {
          name: "处理中",
          id: 1,
          disabled: false,
        },
        {
          name: "已处理",
          id: 2,
        },
      ],
      form: {
        address: "",
        bxImg: [],
        bxTeaid: "",
        bxTeaname: "",
        bxTime: "",
        bxfile: "",
        cjlbId: 0,
        clTeaid: "",
        clTeaname: "",
        fkImg: [],
        fkfile: "",
        history: "",
        id: 0,
        ifdelete: 0,
        maxCate: "",
        maxCateId: 0,
        minCate: "",
        minCateId: 0,
        name: "",
        pjqd: [
          {
            dw: "",
            id: 0,
            name: "",
            repairId: 0,
            sum: 1,
          },
        ],
        status: undefined,
        xfTime: "",
        ksclTime: "",
      },
    };
  },
  methods: {
    //!配件清单数量不能为负
    changeSum(e) {
      if (e.target.value <= 0) {
        e.target.value = 1;
      }
    },
    //!删除行
    delRow(row, index) {
      row.splice(index, 1);
    },
    //!图片预览
    pictureYl(file) {
      this.dialogImageUrl = file.url;
      this.showPictureYl = true;
    },
    //!移除图片
    handleRemove(file, fileList) {
      this.form.fkImg = fileList;
    },
    //!图片上传成功
    uploadPictureSuccess(res, file, fileList) {
      console.log(res, "resresresres");
      this.form.fkImg.push({
        url: res.data,
      });
      console.log(this.form.fkImg);
    },
    //!配件清单改变名称，赋值单位
    changeName(row) {
      let data = "";
      data = this.pjqdOpt.find((item) => {
        return row.name == item.name;
      });
      row.dw = data.dw;
    },
    //!添加表格行
    addRow() {
      console.log(this.form.pjqd);
      this.form.pjqd.push({ sum: 1 });
    },
    //!提交报修
    submitBX() {
      let val = this.form;
      val.bxTeaid = this.unionid;
      val.unionid = this.unionid;
      main
        .edit(val)
        .then((res) => {
          this.$message.success("处理成功!");
          this.getTable();
          this.showBaoXiu = false;
        })
        .catch((err) => {});
    },
    //!搜索-改变报修大类赋值报修小类opt
    changeBxDl(val) {
      this.search.bxzlOpt = [];
      this.tableData_left.filter((item) => {
        if (item.children && item.name == val) {
          item.children.map((subItem) => {
            this.search.bxzlOpt.push(subItem);
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
          this.pjqdOpt = res.data.setRepapjs;
        })
        .catch((err) => {});
    },
    //!查询
    searchTable() {
      console.log(process);
      let val = {
        schoolId: this.schoolId,
        maxCate: this.search.bxdl,
        minCate: this.search.bxzl,
        status: this.search.status,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.records;
        })
        .catch((err) => {});
    },
    //!获取数据源
    getTable(pageNum, pageSize) {
      let val = {
        // pageNum: pageNum,
        // pageSize: pageSize,
        schoolId: this.schoolId,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.records;
        })
        .catch((err) => {});
    },
    //!查看
    see(row) {
      console.log(row);
      this.setForm(row);
      this.formType = 1;
      this.showBaoXiu = true;
    },
    //!处理
    deal(row) {
      this.getBxDl();
      console.log(row);
      this.setForm(row);
      this.formType = 2;
      this.showBaoXiu = true;
    },
    //!赋值表单
    setForm(row) {
      this.form = row;
      this.urlList = row.bxImg.map((item) => {
        return item.url;
      });
      if (row.status == 2) {
        this.statusOpt[1].disabled = true;
      } else {
        this.statusOpt[1].disabled = false;
      }
      console.log(this.statusOpt, "this.statusOpt");
    },
    changePageSize(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTable(this.pageNum, val);
    },
    changePageNum(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getTable(val, this.pageSize);
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
    this.getTable(1, 20);
    this.getXq();
  },
};
</script>

<style scoped>
.zZindex {
  z-index: 3000 !important;
}
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
.pjqd {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0064ff;
}
/deep/.el-textarea.is-disabled,
/deep/.el-textarea__inner {
  color: #000000 !important;
}
/deep/.el-input.is-disabled,
/deep/.el-input__inner {
  color: #000000 !important;
}
/deep/.disabled .el-upload--picture-card {
  display: none !important;
}
</style>
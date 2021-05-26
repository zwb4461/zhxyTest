<template>
  <div>
    <!-- 查询条件 -->
    <a-form-model
      style="margin-bottom:10px;"
      layout="inline"
      :model="table.select"
    >
      <a-form-model-item>
        <a-input v-model="table.select.name" placeholder="姓名"></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="table.select.idno" placeholder="证件编号"></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input
          v-model="table.select.carerphone"
          placeholder="监护人手机号"
        ></a-input>
      </a-form-model-item>
      <!-- <a-form-model-item>
        <a-range-picker
          v-model="table.time"
          format="YYYY-MM-DD HH:mm"
          :placeholder="['报名起始日期', '报名截止日期']"
        />
      </a-form-model-item>-->
      <a-form-model-item>
        <a-button type="primary" @click="reloadTable">查询</a-button>
      </a-form-model-item>
      <!-- <a-form-model-item v-if="$power('p-1-f-add')">
        <a-button @click="addForm">新增</a-button>
      </a-form-model-item> -->
      <!-- <a-form-model-item v-if="$power('p-1-f-del')">
        <a-button
          :disabled="table.selectedRowKeys.length === 0"
          type="danger"
          @click="delAll"
          >删除</a-button
        >
      </a-form-model-item> -->
      <a-form-model-item>
        <a-button type="primary" @click="fastImport">导入</a-button>
      </a-form-model-item>
      <el-upload
        :data="{ schoolId: schoolId }"
        name="file"
        :on-success="handleFileSuccess"
        v-show="false"
        action="http://103.219.33.112:10010/importXjStudent"
      >
        <el-button id="xlsx"></el-button>
      </el-upload>
      <a-form-model-item>
        <a-button type="primary" @click="fastExport">导出</a-button>
      </a-form-model-item>
      <a
        v-show="false"
        id="downloadUpload"
        :href="download_url"
        :download="download_name"
      >
      </a>
      <a-form-model-item>
        <a
          href="http://103.219.33.112:10010/uploadpic/学籍信息导入模板.xlsx"
          download="学籍信息导入模板.xlsx"
        >
          <a-button type="primary">模板下载</a-button>
        </a>
      </a-form-model-item>
    </a-form-model>

    <!-- 表格 -->
    <a-table
      class="table-data"
      size="middle"
      bordered
      rowKey="id"
      :scroll="{ x: 1500, y: '60vh' }"
      :columns="table.columns"
      :dataSource="table.data"
      :pagination="table.pagination"
      @change="tableChange"
    >
      <!--   :rowSelection="{
        selectedRowKeys: table.selectedRowKeys,
        onChange: onSelectChange
      }" -->
      <template slot="idx" slot-scope="text, record, index">{{
        table.pagination.current * table.pagination.pageSize -
          table.pagination.pageSize +
          index +
          1
      }}</template>

      <template slot="name" slot-scope="text, record">
        <span
          v-if="record.sex"
          :class="['sex', record.sex === 1 ? 'nan' : 'nv']"
          >{{ record.sex === 1 ? "男" : "女" }}</span
        >
        {{ text }}
        <span v-if="record.tag" class="type">{{ record.tag }}</span>
      </template>
      <template slot="birthday" slot-scope="text">{{
        text ? $moment(text).format("YYYY-MM-DD") : ""
      }}</template>
      <template slot="idcardtype" slot-scope="text">{{
        getSelectName("idcardtype", text)
      }}</template>
      <template slot="rankShow" slot-scope="text">
        <template v-if="text">
          <a-rate style="font-size:20px" disabled :value="text" :count="4" />
          <span class="text">{{ desc[text - 1] }}</span>
        </template>
      </template>

      <template slot="studentStatus" slot-scope="text">
        <template v-for="item in select.studentStatus.filter(j => j.v == text)">
          <a-tag :key="item.v" :color="item.type">{{ item.text }}</a-tag>
        </template>
      </template>
      <!-- <template slot="address" slot-scope="text">{{text | address}}</template> -->
      <template slot="guest_status" slot-scope="text">
        <template v-if="text == 1">
          <a-tag color="green">审核通过</a-tag>
        </template>
        <template v-else-if="text == 2">
          <a-tag color="red">审核未通过</a-tag>
        </template>
        <template v-else-if="text == 0">
          <a-tag color="blue">待审核</a-tag>
        </template>
      </template>
      <template slot="rankInfo" slot-scope="text">{{
        mark.type == 2 ? text : ""
      }}</template>
      <template slot="tool" slot-scope="text, record">
        <!-- v-if="$power('p-1-f-edit')" -->
        <a-button size="small" type="waring" @click="edit(record)"
          >编辑</a-button
        >

        <!--   v-show="isPower && is_guest_status == 1 ? false : true" -->
        <a-button size="small" type="primary" @click="toChangeState(record)"
          >调整学籍状态</a-button
        >
      </template>
    </a-table>

    <!-- 新增和编辑表单   -->
    <my-drawer-vue
      title="新生学籍"
      :width="1000"
      :loading="loading.form"
      :visible="pop.form"
      :onOk="submit"
      @onClose="formClose"
      :btnShow="isPower && is_guest_status == 1 ? false : true"
    >
      <template slot="contentInfo">
        <table-form ref="tableForm" :btnLoading="btnLoading" />
      </template>
    </my-drawer-vue>

    <a-modal
      title="调整学籍状态"
      width="350px"
      :visible="pop.studentStatus"
      :confirm-loading="loading.studentStatus"
      @ok="ChangeStudentStatus"
      :ok-button-props="{
        props: { disabled: !isPower && is_guest_status == 1 ? true : false }
      }"
      @cancel="pop.studentStatus = false"
    >
      <a-radio-group v-model="studentStatus.studentstatus">
        <a-radio-button
          v-for="item in select.studentStatus"
          :key="item.v"
          :value="item.v"
          >{{ item.text }}</a-radio-button
        >
      </a-radio-group>
    </a-modal>
  </div>
</template>

<script>
//组件
import myDrawerVue from "~/components/common/myDrawer.vue"; //自定义弹出层
import tableForm from "./components/_form"; //新增编辑表单

//接口
import main from "~/api/studentStatus";
import mainCopy from "~/api/studentStatus_copy";

//数据
import tableHeard from "./components/tableHeard";
//类型数据
import {
  foreigntype,
  nation,
  country as getCountry,
  degree,
  special,
  residenceType,
  withStudent,
  goMode,
  politicalOutlook,
  studenType,
  bloodType,
  healthStatus,
  studentSources,
  disability,
  attend,
  isStayBehind,
  studyType,
  trafficType,
  studentStatus
} from "~/utils/data";

export default {
  components: {
    myDrawerVue,
    tableForm
  },
  props: {
    tableType: {
      //1:报名表单 , 2:审核表单 3:评分表单
      type: Number,
      default: 1
    },
    activing: Boolean, //是否关闭
    title: String
    // //学生类型id
    // enrollId: {
    //   type: Number,
    //   default: -1
    // }
  },
  computed: {
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    }
  },
  filters: {
    address(value) {
      let info = "";
      if (value) {
        info = value.replace(/\//g, " ");
      }
      return info;
    }
  },
  data() {
    return {
      isPower: false,
      is_guest_status: 1,
      enrollId: "", //学生类别id
      studenttype: "", //学生类别中文名
      pop: {
        form: false,
        check: false,
        studentStatus: false
      },
      loading: {
        table: false,
        form: false,
        check: false,
        studentStatus: false
      },
      select: {
        houseType: [
          { text: "不动产权证书", v: "1" },
          { text: "房地产权证", v: "2" }
        ],
        special,
        foreigntype,
        nation,
        degree,
        residenceType, //户口类别
        withStudent, //与学生关系
        goMode, //入学方式
        politicalOutlook, //政治面貌
        studenType, //学生类别
        bloodType, //血型
        healthStatus, //血型
        studentSources, //学生来源
        disability, //残疾类型
        attend, //随班就读类型
        isStayBehind, //是否农村留守儿童
        studyType, //就读方式
        trafficType, //上下学交通方式
        studentStatus, //学籍状态
        trueOrfalse: [
          { text: "是", v: true },
          { text: "否", v: false }
        ],
        idcardtype: [
          { text: "居民身份证", v: "1" },
          { text: "其它", v: "2" }
        ]
      },
      table: {
        time: [],
        select: {
          name: undefined,
          idno: undefined,
          carerphone: undefined,
          signupstarttime: undefined,
          signupendtime: undefined
        },
        selectedRowKeys: [], //选中的数据的id
        selectedRows: [], //选中的数据
        pagination: {
          current: 1,
          pageSize: 20,
          total: 0,
          showTotal: total => `共有 ${total} 条数据`,
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true, //是否可以改变 pageSize
          pageSizeOptions: ["10", "40", "60", "80", "100", "500", "3000"]
        },
        //表头,
        columns: [],
        //数据
        data: []
      },
      studentStatus: {
        id: undefined,
        studentstatus: undefined
      },
      desc: ["D", "C", "B", "A"],
      data: {
        rank: 0
      },
      download_url: "",
      download_name: "学籍表"
    };
  },
  watch: {
    "table.time"(nv) {
      if (nv) {
        this.table.select.signupstarttime = this.$moment(nv[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.table.select.signupendtime = this.$moment(nv[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        this.table.select.signupstarttime = "";
        this.table.select.signupendtime = "";
      }
    }
  },
  methods: {
    handleFileSuccess(res) {
      if (res.code === 200) {
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
      this.getTableData();
    },
    fastImport() {
      document.getElementById("xlsx").click();
    },
    fastExport() {
      this.download_url = "";

      mainCopy
        .testStudentExcel({ schoolId: this.schoolId })
        .then(res => {
          this.download_url = res.data;

          if (this.download_url != "") {
            setTimeout(() => {
              document.getElementById("downloadUpload").click();
            }, 100);
          }
        })
        .catch(err => {
          console.log(err);
        });
      // console.log("fastExport");
    },
    //设置详情
    setInfo(id, studenttype) {
      this.enrollId = id;
      this.studenttype = studenttype;

      //获取学籍数据
      this.getTableData();
    },
    //获取下拉的名称
    getSelectName(name, val, type = 1) {
      let info;
      if (type === 1) {
        info = this.select[name].find(item => item.v == val);
      } else {
        info = this.select[name].find(item => item.text == val);
      }
      if (type === 1) {
        return info ? info.text : "";
      } else {
        return info ? info.v : "";
      }
    },
    //获取数据
    getTableData() {
      //用户列表
      main
        .list({
          pagenum: this.table.pagination.current,
          pagesize: this.table.pagination.pageSize,
          schoolId: this.schoolId,
          ...this.table.select,
          unionid: this.unionid
        })
        .then(res => {
          let rdata = res.data;
          // console.log(rdata.list);
          this.table.data = rdata.list.map(item => {
            let obj = { ...item };
            if (item.rank) {
              obj.rankShow = this.desc.findIndex(j => j === item.rank) + 1;
            }

            if (item.items) {
              let info = item.items.map(el => {
                return `${el.item} ${el.branch}分`;
              });
              obj.rankInfo = info.join(",");
            }

            return obj;
          });
          this.table.pagination.total = rdata.total;
        });
      // .catch(err => {
      //   this.$message.error(err);
      // });
    },
    //页码改变触发
    tableChange({ current, pageSize }) {
      this.table.pagination.current = current;
      this.table.pagination.pageSize = pageSize;
      this.getTableData();
    },
    //获取表格选中的数据
    onSelectChange(selectedRowKeys, selectedRows) {
      this.table.selectedRowKeys = selectedRowKeys;
      this.table.selectedRows = selectedRows;
    },
    //重载表格
    reloadTable() {
      this.table.pagination.current = 1;
      //   this.table.pagination.pageSize = pageSize;
      this.getTableData();
    },
    //表单操作 ####-----
    //批量删除数据
    delAll(id, idx) {
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          this.loading.del = true;
          let list = this.table.selectedRows.map(item => {
            return main.del({
              id: item.id,
              actionUnionid: this.unionid, //用户id
              actiontime: this.$moment().format("YYYY-MM-DD HH:mm:ss") //操作时间
            });
          });

          Promise.all(list)
            .then(res => {
              this.loading.del = false;
              this.$message.success("删除成功");
              this.reloadTable();
            })
            .catch(err => {
              this.loading.del = false;
              this.$message.error(err);
            });
        }
      });
    },
    //单个删除数据
    delOne(id, idx) {
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .del({
              id,
              actionUnionid: this.unionid, //用户id
              actiontime: this.$moment().format("YYYY-MM-DD HH:mm:ss") //操作时间
            })
            .then(res => {
              this.$message.success("删除成功");
              this.reloadTable();
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      });
    },

    //编辑数据
    edit(row) {
      this.is_guest_status = row.status;

      this.pop.form = true;
      setTimeout(() => {
        this.$refs.tableForm.formType = 2;
        this.$refs.tableForm.clearForm();
        this.$refs.tableForm.setForm(row);
      }, 200);
      //   this.$nextTick(() => {
      //     this.$refs.tableForm.formType = 2;
      //     this.$refs.tableForm.clearForm();
      //     this.$refs.tableForm.setForm(row);
      //   });
    },
    //新增表单
    addForm() {
      this.pop.form = true;

      setTimeout(() => {
        this.$refs.tableForm.formType = 1;
        this.$refs.tableForm.clearForm();
      }, 200);
      //   this.$nextTick(() => {
      //     this.$refs.tableForm.formType = 1;
      //     this.$refs.tableForm.clearForm();
      //   });
    },
    //#表单相关操作--------

    //提交表单
    submit() {
      this.$refs.tableForm.onSubmit();
    },
    //关闭表单弹窗
    formClose() {
      this.pop.form = false;
    },
    //按钮加载与不加载
    btnLoading(type) {
      this.loading.form = type;
      if (type === false) {
        this.formClose(); //关闭表单
        this.reloadTable(); //重载表格
      }
    },
    //#########学籍调整相关操作
    //显示学籍调整页面
    toChangeState(data) {
      this.is_guest_status = data.status;
      this.studentStatus.id = data.id;
      this.studentStatus.studentstatus = data.studentStatus;
      this.pop.studentStatus = true;
    },
    //改变学生学籍状态
    ChangeStudentStatus() {
      this.loading.studentStatus = true;
      let formData = { ...this.studentStatus };
      formData.unionid = this.unionid;
      main
        .stutus(formData)
        .then(res => {
          this.$message.success("学籍调整成功");
          this.loading.studentStatus = false;
          this.pop.studentStatus = false;
          this.reloadTable();
        })
        .catch(err => {
          this.$message.error(err);
          this.loading.studentStatus = false;
        });
    }
  },
  created() {
    //获取表头
    let { heard1, heard2 } = tableHeard;

    this.table.columns = heard1;

    mainCopy
      .selectSchool({ schoolId: this.schoolId })
      .then(res => {
        this.isPower = res.data.schools[0].xgxj;
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    if (this.schoolId === -1) {
      window.onNuxtReady(() => {
        this.getTableData(); //获取列表
      });
    } else {
      this.getTableData(); //获取列表
    }
  }
};
</script>

<style lang="scss" scoped>
.resize-table-th {
  position: relative;
}
.table-draggable-handle {
  /* width: 10px !important; */
  height: 100% !important;
  left: auto !important;
  right: -5px;
  cursor: col-resize;
  touch-action: none;
  border: none;
}

.sex {
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  border-radius: 50%;
  text-align: center;
  // border: 1px solid black;
  font-size: 13px;
  color: white;
}
.nan {
  background: #4f6fff;
}
.nv {
  background: #be4fff;
}
.type {
  display: inline-block;
  background: #51b337;
  width: 50px;
  color: white;
  height: 20px;
  line-height: 19px;
  font-size: 12px;
  border-radius: 10px;
  text-align: center;
  position: relative;
}

.table-data::-webkit-scrollbar {
  width: 0 !important;
}
</style>

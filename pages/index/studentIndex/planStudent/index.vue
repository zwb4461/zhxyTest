<template>
  <div>
    <!-- 查询条件 -->
    <a-form-model
      style="margin-bottom:10px;"
      layout="inline"
      :model="table.select"
    >
      <a-form-model-item>
        <a-input
          v-model="table.select.name"
          placeholder="姓名"
          style="width:120px"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input
          v-model="table.select.idno"
          placeholder="证件号码"
          style="width:170px"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input
          v-model="table.select.phone"
          placeholder="监护人手机号"
          style="width:120px"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-select
          class="select"
          allowClear
          v-model="table.select.state"
          placeholder="状态"
        >
          <a-select-option v-for="item in select.state" :key="item.v">{{
            item.n
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-range-picker
          style="width:220px"
          v-model="table.time"
          :format="`YYYY-MM-DD`"
          :placeholder="['开始时间', '结束时间']"
        />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="reloadTable">查询</a-button>
      </a-form-model-item>
      <template v-if="activing">
        <a-form-model-item v-if="$power('p-1-l-upload')">
          <a-button-group>
            <a-button
              type="primary"
              :loading="loading.upload"
              @click="toChooseFiles"
            >
              <template v-if="!loading.upload">
                <a-icon type="plus" />
              </template>
              导入名单
            </a-button>
            <a-button type="primary">
              <a href="/计划新生导入模板.xlsx">
                模板下载
                <a-icon type="cloud-download" />
              </a>
            </a-button>
          </a-button-group>
        </a-form-model-item>
        <a-form-model-item v-if="$power('p-1-l-add')">
          <a-button @click="addForm">新增</a-button>
        </a-form-model-item>
        <a-form-model-item v-if="$power('p-1-l-del')">
          <a-button
            type="danger"
            :loading="loading.del"
            :disabled="table.selectedRows.length === 0"
            @click="delAll"
            >删除</a-button
          >
        </a-form-model-item>
      </template>
    </a-form-model>

    <a-upload
      v-show="false"
      name="file"
      :multiple="false"
      :beforeUpload="beforeUpload"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    >
      <a-button id="xlsx" type="primary">
        <a-icon type="plus" />导入名单
      </a-button>
    </a-upload>

    <!-- 表格 -->
    <a-table
      size="middle"
      bordered
      rowKey="id"
      :scroll="{ y: '60vh' }"
      :rowSelection="{
        selectedRowKeys: table.selectedRowKeys,
        onChange: onSelectChange
      }"
      :columns="table.columns"
      :dataSource="table.data"
      :pagination="table.pagination"
      @change="tableChange"
    >
      <template slot="idx" slot-scope="text, record, index">{{
        table.pagination.current * table.pagination.pageSize -
          table.pagination.pageSize +
          index +
          1
      }}</template>
      <template slot="state" slot-scope="text">
        <template v-for="(item, idx) in select.state">
          <template v-if="item.v === text">
            <a-tag :key="idx" :color="item.t">{{ item.n }}</a-tag>
          </template>
        </template>
      </template>

      <template slot="tool" slot-scope="text, record, index">
        <a-button
          v-if="$power('p-1-l-add')"
          size="small"
          type="waring"
          @click="edit(record)"
          >{{ activing ? "编辑" : "查看" }}</a-button
        >
        <template v-if="activing">
          <a-button
            v-if="$power('p-1-l-del')"
            size="small"
            type="danger"
            @click="del(record.id, index)"
            >删除</a-button
          >
        </template>
      </template>
    </a-table>

    <!-- 表单 -->

    <my-drawer-vue
      title="计划新生"
      :showOkbtn="activing"
      :width="400"
      :loading="loading.form"
      :visible="pop.form"
      :onOk="submit"
      @onClose="formClose"
    >
      <template slot="contentInfo">
        <table-form
          ref="tableForm"
          :btnLoading="btnLoading"
          :enrollId="enrollId"
        />
      </template>
    </my-drawer-vue>

    <a-modal
      v-model="loading.upload"
      :maskClosable="false"
      :keyboard="false"
      title="计划新生导入中"
      :footer="null"
      :closable="false"
      centered
    >
      <a-progress :percent="this.loadingTime.upload" status="active" />
    </a-modal>
  </div>
</template>

<script>
//组件
import myDrawerVue from "~/components/common/myDrawer.vue";
import tableForm from "./components/_form";

//接口
import main from "~/api/planStudent";

let uploadId;

export default {
  components: {
    tableForm,
    myDrawerVue
  },
  props: {
    activing: Boolean
    //学生类型id
    // enrollId: {
    //   type: Number,
    //   default: 0
    // }
  },
  computed: {
    //类型id
    enrollId() {
      return this.$store.state.auth.enrollId;
    },
    //用户id
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    }
  },
  data() {
    return {
      file: "",
      uploadId: "",
      format: "YYYY-MM-DD HH:mm:ss",
      pop: {
        form: false
      },
      loadingText: {
        upload: "计划新生导入中。。。"
      },
      loadingTime: {
        upload: 0
      },
      loading: {
        modal: "",
        table: false,
        form: false,
        del: false,
        upload: false
      },
      select: {
        state: [
          { n: "用户正常", v: 1, t: "#87d068" },
          //   { n: "手机号码不正确", v: 2, t: "" },
          { n: "姓名+手机号码重复", v: 2, t: "orange" },
          { n: "姓名+证件号码+手机号重复", v: 3, t: "red" },
          { n: "姓名+证件号码重复", v: 4, t: "purple" },
          { n: "姓名未填写", v: 5, t: "pink" },
          { n: "手机号未填写", v: 6, t: "cyan" }
        ]
      },
      excelHeard: [
        { c: "姓名", e: "name" },
        { c: "证件号码", e: "idno" },
        { c: "监护人手机号码", e: "phone" }
      ],
      table: {
        time: [],
        select: {
          name: undefined, //姓名
          idno: undefined, //证件号码
          phone: undefined, //监护人手机号
          state: undefined, //状态
          importstarttime: undefined, //创建时间起
          importendtime: undefined //创建时间止
        },
        selectedRowKeys: [],
        selectedRows: [],
        pagination: {
          current: 1,
          pageSize: 20,
          total: 0,
          showTotal: total => `共有 ${total} 条数据`,
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true, //是否可以改变 pageSize
          pageSizeOptions: ["20", "40", "60", "80", "100", "500", "3000"]
        },
        //表头,
        columns: [
          {
            title: "序号",
            dataIndex: "idx",
            scopedSlots: { customRender: "idx" },
            width: 60
          },
          {
            title: "姓名",
            dataIndex: "name"
          },
          {
            title: "证件号码",
            dataIndex: "idno"
          },
          {
            title: "监护人手机号码",
            dataIndex: "phone"
          },

          //   {
          //     title: "学校id",
          //     dataIndex: "schoolId"
          //   },

          {
            title: "状态",
            dataIndex: "state",
            scopedSlots: { customRender: "state" }
          },

          {
            title: "创建日期",
            dataIndex: "actiontime"
          },

          //   {
          //     title: "学生类型",
          //     dataIndex: "studenttype"
          //   },

          {
            title: "操作",
            scopedSlots: { customRender: "tool" }
          }
        ],
        //数据
        data: []
      }
    };
  },
  watch: {
    file(nv) {
      // console.log("this.this.enrollId------", this.enrollId);
    },
    //监听时间选择
    "table.time"(nv) {
      if (nv.length > 0) {
        this.table.select.importstarttime = nv[0].format(this.format);
        this.table.select.importendtime = nv[1].format(this.format);
      } else {
        this.table.select.importstarttime = "";
        this.table.select.importendtime = "";
      }
    }
  },
  methods: {
    upLoading(secondsToGo = 20, close = true) {
      if (close) {
        this.loadingTime.upload = 0;
        let aa = 0;
        this.loading.modal = setInterval(() => {
          aa += 1;
          let num = Number(((aa / secondsToGo) * 100).toFixed(2));
          this.loadingTime.upload = num;
        }, 300);
        setTimeout(() => {
          clearInterval(this.loading.modal);
        }, secondsToGo * 300);
      } else {
        clearInterval(this.loading.modal);
        this.loadingTime.upload = 100;
      }
    },
    //获取数据
    getTableData() {
      //用户列表
      main
        .list({
          pagenum: this.table.pagination.current,
          pagesize: this.table.pagination.pageSize,
          //   schoolId: this.schoolId,
          //   enrollId: 1,
          enrollId: this.enrollId,
          ...this.table.select
        })
        .then(res => {
          this.table.data = res.data.list;
          this.table.pagination.total = res.data.total;
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //页码改变触发
    tableChange({ current, pageSize }) {
      this.table.pagination.current = current;
      this.table.pagination.pageSize = pageSize;
      this.getTableData();
    },
    //获取表格选中的数据
    onSelectChange(selectedRowKeys, rows) {
      // console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.table.selectedRowKeys = selectedRowKeys;
      this.table.selectedRows = rows;
    },
    //重载表格
    reloadTable(type = true) {
      if (type) {
        this.table.pagination.current = 1;
      }
      //   this.table.pagination.pageSize = pageSize;
      this.getTableData();
    },
    //编辑数据
    edit(row) {
      // console.log(row);
      this.pop.form = true;
      setTimeout(() => {
        this.$refs.tableForm.formType = 2;
        this.$refs.tableForm.clearForm();
        this.$refs.tableForm.setForm(row);
      }, 200);
    },
    //新增表单
    addForm() {
      this.pop.form = true;
      setTimeout(() => {
        this.$refs.tableForm.formType = 1;
        this.$refs.tableForm.clearForm();
      }, 200);
    },
    //#表单相关操作--------
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
              this.reloadTable(false);
            })
            .catch(err => {
              this.loading.del = false;
              this.$message.error(err);
            });
        }
      });
    },
    //删除数据
    del(id, idx) {
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
              this.reloadTable(false);
            })
            .catch(err => {
              // console.log("接收到的东西--=-=-=-==", err);
              this.$message.error(err);
            });
        }
      });
    },
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
        this.reloadTable(false); //
      }
    },

    //####  导入相关操作--------------
    //唤起隐藏的上传按钮
    toChooseFiles() {
      //   // console.log("uploadId--1111-------", this.enrollId);
      document.getElementById("xlsx").click();
    },
    previewFile(file) {
      //   // console.log("previewFile--3333-------", uploadId);
    },
    beforeUpload(file) {
      //   // console.log("uploadId--3333-------", uploadId);
      //   // console.log("uploadId--3333-------", this.uploadId);
      this.setData(file);
      return false;
    },
    setData(file) {
      this.loading.upload = true;
      //   this.upLoading(100, false);
      this.$importExcel(file, this.excelHeard)
        .then(({ change }) => {
          // console.log("获取的数据为---------", change);
          this.upLoading(change.length);
          let list = change.map(item => {
            let obj = { ...item };
            obj.actionUnionid = this.unionid; //用户id
            obj.actiontime = this.$moment().format("YYYY-MM-DD HH:mm:ss"); //操作时间
            obj.schoolId = this.schoolId; //学校id
            obj.enrollId = this.enrollId; //学生类别id
            obj.ifdelete = 0; //删除状态
            return obj;
          });
          // console.log("转换后的值为-----", list);
          return main.add(list);
        })
        .then(res => {
          this.upLoading(0, false);
          setTimeout(() => {
            this.loading.upload = false;
          }, 1000);
          this.$message.success("导入成功!!!");
          // console.log(res);
          // 重载表格
          this.reloadTable();
        })
        .catch(err => {
          this.loading.upload = false;
          this.upLoading(0, false);
          this.$message.error(err);
        });
    }
  },
  created() {
    uploadId = this.enrollId;
    // this.upLoading();
  },
  mounted() {
    if (this.enrollId === -1) {
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
.select {
  width: 200px !important;
}
</style>

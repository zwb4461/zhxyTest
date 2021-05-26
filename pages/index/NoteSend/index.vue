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
          v-model="table.select.username"
          placeholder="username"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary">查询</a-button>
      </a-form-model-item>
      <a-form-model-item>
        <a-button @click="addForm">新增</a-button>
      </a-form-model-item>
    </a-form-model>

    <!-- 表格 -->
    <a-table
      size="middle"
      bordered
      rowKey="id"
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
      <template slot="tool" slot-scope="text, record, index">
        <a-button size="small" type="waring" @click="edit(record)"
          >编辑</a-button
        >
        <a-button size="small" type="danger" @click="del(record.id, index)"
          >删除</a-button
        >
      </template>
    </a-table>

    <!-- 表单 -->

    <my-drawer-vue
      title="表单"
      :width="400"
      :loading="loading.form"
      :visible="pop.form"
      :onOk="submit"
      @onClose="formClose"
    >
      <template slot="contentInfo">
        <table-form ref="tableForm" :btnLoading="btnLoading" />
      </template>
    </my-drawer-vue>
  </div>
</template>

<script>
//组件
import myDrawerVue from "~/components/common/myDrawer.vue";
import tableForm from "./components/_form";

//接口
import main from "~/api/NoteSend";
export default {
  components: {
    myDrawerVue,
    tableForm
  },
  computed: {
    //用户id
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    }
  },
  data() {
    return {
      pop: {
        form: false
      },
      loading: {
        table: false,
        form: false
      },
      table: {
        select: {
          username: undefined
        },
        selectedRowKeys: [],
        selectedRows: [],
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
          showTotal: total => "共有 data.total 条数据",
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true, //是否可以改变 pageSize
          pageSizeOptions: ["10", "20", "30", "40"]
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
            title: "用户名",
            dataIndex: "loginname"
          },

          {
            title: "短信模板",
            dataIndex: "messagecontent"
          },

          {
            title: "接口密匙",
            dataIndex: "password"
          },

          {
            title: "短信地址",
            dataIndex: "sendurl"
          },

          {
            title: "流水号",
            dataIndex: "serialnumber"
          },

          {
            title: "企业编号",
            dataIndex: "spcode"
          },

          {
            title: "空号处理",
            dataIndex: "f"
          },

          {
            title: "是否删除",
            dataIndex: "ifdelete"
          },

          {
            title: "学校",
            dataIndex: "schoolId"
          },

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
  methods: {
    //获取数据
    getTableData() {
      //用户列表
      main
        .list({
          pagenum: this.table.pagination.current,
          pagesize: this.table.pagination.pageSize
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
    //重载表格
    reloadTable() {
      if (type) {
        this.table.pagination.current = 1;
      }
      //   this.table.pagination.pageSize = pageSize;
      this.getTableData();
    },
    //获取表格选中的数据
    onSelectChange(selectedRowKeys, rows) {
      // console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.table.selectedRowKeys = selectedRowKeys;
      this.table.selectedRows = rows;
    },
    //编辑数据
    edit(row) {
      // console.log(row);
      this.pop.form = true;
      setTimeout(() => {
        this.$refs.tableForm.formType = 2;
        this.$refs.tableForm.clearForm();
        this.$refs.tableForm.setForm(row);
      }, 100);
    },
    //新增表单
    addForm() {
      this.pop.form = true;
      setTimeout(() => {
        this.$refs.tableForm.formType = 1;
        this.$refs.tableForm.clearForm();
      }, 100);
    },
    //#表单相关操作--------
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
        this.reloadTable(); //重载表格
      }
    }
  },
  created() {
    //this.getTableData(); //获取列表
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
</style>

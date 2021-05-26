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
      :columns="table.columns"
      :dataSource="table.data"
      :pagination="table.pagination"
      @change="tableChange"
    >
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
    <a-modal
      title="表单"
      :visible="pop.form"
      @ok="submit"
      :confirmLoading="loading.form"
      @cancel="formClose"
    >
      <table-form ref="tableForm" :btnLoading="btnLoading" />
    </a-modal>
  </div>
</template>

<script>
//组件
import tableForm from "./components/_form";

//接口
import main from "~/api/form";
export default {
  components: {
    tableForm
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
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true, //是否可以改变 pageSize
          pageSizeOptions: ["10", "20", "30", "40"]
        },
        //表头,
        columns: [
          {
            title: "用户名",
            dataIndex: "username"
          },
          {
            title: "密码",
            dataIndex: "password"
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
      //   main
      //     .list({
      //       pagenum: this.table.pagination.current,
      //       pagesize: this.table.pagination.pageSize
      //     })
      //     .then(res => {
      //          this.table.data = res.data.list;
      //          this.table.pagination.total = res.data.total;
      //     })
      //     .catch(err => {
      //       this.$message.error(err);
      //     });
    },
    //页码改变触发
    tableChange({ current, pageSize }) {
      this.table.pagination.current = current;
      this.table.pagination.pageSize = pageSize;
      this.getTableData();
    },
    //重载表格
    reloadTable() {
      this.table.pagination.current = 1;
      //   this.table.pagination.pageSize = pageSize;
      this.getTableData();
    },
    //编辑数据
    edit(row) {
      // console.log(row);
      this.pop.form = true;
      this.$nextTick(() => {
        this.$refs.tableForm.formType = 2;
        this.$refs.tableForm.clearForm();
        this.$refs.tableForm.setForm(row);
      });
    },
    //新增表单
    addForm() {
      this.pop.form = true;
      this.$nextTick(() => {
        this.$refs.tableForm.formType = 1;
        this.$refs.tableForm.clearForm();
      });
    },
    //#表单相关操作--------
    //删除数据
    del(id, idx) {},
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
    }
  },
  created() {
    this.getTableData(); //获取列表
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

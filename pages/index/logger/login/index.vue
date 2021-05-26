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
      <!-- <a-form-model-item>
        <a-input v-model="table.select.idno" placeholder="证件号码" style="width:170px"></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="table.select.phone" placeholder="监护人手机号" style="width:120px"></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-select class="select" allowClear v-model="table.select.state" placeholder="状态">
          <a-select-option v-for="item in select.state" :key="item.v">{{item.n}}</a-select-option>
        </a-select>
      </a-form-model-item>-->
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
    </a-form-model>

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

      <!-- <template slot="tool" slot-scope="text,record,index">
        <a-button size="small" type="waring" @click="edit(record)">编辑</a-button>
        <a-button size="small" type="danger" @click="del(record.id,index)">删除</a-button>
      </template>-->
    </a-table>
  </div>
</template>

<script>
//接口
import main from "~/api/logger/login";

let uploadId;

export default {
  props: {
    //学生类型id
    // enrollId: {
    //   type: Number,
    //   default: 0
    // }
  },
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
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
      loading: {
        table: false
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
            title: "登录时间",
            dataIndex: "loginTime",
            width: 150
          },
          {
            title: "登录人",
            dataIndex: "name",
            width: 80
          },
          {
            title: "登录IP",
            dataIndex: "loginIp"
          }
          //   {
          //     title: "操作",
          //     scopedSlots: { customRender: "tool" }
          //   }
        ],
        //数据
        data: []
      }
    };
  },
  watch: {
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
    //获取数据
    getTableData() {
      //用户列表
      main
        .list({
          pagenum: this.table.pagination.current,
          pagesize: this.table.pagination.pageSize,
          //   schoolId: this.schoolId,
          //   enrollId: 1,
          schoolId: this.schoolId,
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
      // // console.log("selectedRowKeys changed: ", selectedRowKeys);
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
    }
  },
  created() {
    uploadId = this.enrollId;
    // this.upLoading();
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
.select {
  width: 200px !important;
}
</style>

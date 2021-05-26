<template>
  <div>
    <a-row :gutter="32">
      <a-col :span="9">
        <!-- <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange" /> -->
        <div class="right-border">
          <a-tree :treeData="treeData" @select="onSelect"></a-tree>
        </div>
      </a-col>
      <a-col :span="15">
        <a-form
          style="margin-bottom:10px"
          layout="inline"
          :model="table.select"
        >
          <a-form-item>
            <a-input
              v-model="table.select.name"
              placeholder="请输入要查找的姓名"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="reloadTable">查询</a-button>
          </a-form-item>
        </a-form>
        <a-table
          rowKey="id"
          :pagination="table.pagination"
          :scroll="{ y: 540 }"
          :rowSelection="{
            selectedRowKeys: table.selectedRowKeys,
            onChange: onSelectChange
          }"
          :columns="table.columns"
          :dataSource="table.data"
          @change="pageChange"
        >
          <template slot="idx" slot-scope="text, record, index">{{
            table.pagination.current * table.pagination.pageSize -
              table.pagination.pageSize +
              index +
              1
          }}</template>
          <template slot="avatar" slot-scope="text, record">
            <template v-if="text">
              <a-avatar class="avatarImg" :src="text" />
            </template>
            <template v-else>
              <a-avatar
                size="large"
                class="avatarImg"
                style="backgroundColor:#2983f7"
                >{{ record.name | lastName }}</a-avatar
              >
            </template>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import DD from "~/api/dingding";

export default {
  props: {
    //表格数据源类型
    dataType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      treeData: [],
      user: [],
      table: {
        select: {
          name: undefined
        },
        pagination: {
          current: 1,
          pageSize: 20,
          total: 0,
          size: "small",
          showTotal: total => `共有 ${total} 条数据`,
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true, //是否可以改变 pageSize
          pageSizeOptions: ["10", "20", "40", "60", "80", "100", "500", "3000"]
        },
        selectedRowKeys: [],
        columns: [
          {
            title: "序号",
            dataIndex: "idx",
            scopedSlots: { customRender: "idx" },
            width: 60
          },
          {
            title: "头像",
            dataIndex: "avatar",
            scopedSlots: { customRender: "avatar" }
          },
          {
            title: "姓名",
            dataIndex: "name"
          }
        ],
        data: []
      },
      departmentId: ""
    };
  },
  computed: {
    userList() {
      // // console.log(this.departmentId);

      return this.user.filter(
        item => item.departmentId.indexOf(this.departmentId) > -1
      );
    },
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    }
  },
  watch: {
    departmentId() {
      this.reloadTable();
    }
  },
  methods: {
    getDDuser(id) {
      DD.user({
        pagenum: this.table.pagination.current,
        pagesize: this.table.pagination.pageSize,
        departmentId: this.departmentId,
        ...this.table.select
      })
        .then(res => {
          this.table.data = res.data.list;
          this.table.pagination.total = res.data.total;
        })
        .catch(err => {});
    },
    //获取钉钉部门
    getDDdep() {
      DD.dep({ schoolId: this.schoolId })
        .then(res => {
          // // console.log("钉钉部门--23---", res);
          let firterList = res.data.filter(
            j => !(j.name.indexOf("家校通") > -1)
          );
          let tree = this.$deptTree(firterList, {});
          // // console.log("121212121-------", tree);
          this.treeData = tree;
        })
        .catch(err => {});
    },
    pageChange({ current, pageSize }) {
      this.table.pagination.current = current;
      this.table.pagination.pageSize = pageSize;
      this.getDDuser();
    },
    // 重载表格
    reloadTable() {
      this.table.pagination.current = 1;
      this.getDDuser();
    },
    onSelect(selectedKeys, info) {
      this.departmentId = selectedKeys[0];
      // // console.log("获取的部门id是-----", this.departmentId);
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      // // console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.table.selectedRowKeys = selectedRowKeys;
      this.$emit("getPeople", selectedRows);
    },
    setSelect(data) {
      // // console.log("传过来的数据-----", data);
      this.table.selectedRowKeys = data.map(item => {
        return item.id;
      });
    }
  },
  created() {
    this.getDDuser();
    this.getDDdep();
  }
};
</script>

<style lang="scss" scoped>
.right-border {
  height: 600px;
  overflow-y: auto;
  border-right: 1px solid gainsboro;
}
</style>

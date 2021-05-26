<template>
  <div>
    <div class="box">
      <a-row :gutter="32">
        <a-col :lg="24" :xl="6">
          <a-card title="部门列表" class="dep">
            <!-- <div slot="extra">
              <a-button
                size="small"
                :loading="loading.asyncDep"
                @click="asyncDDdep"
                type="primary"
              >
                <a-icon type="sync" :spin="loading.asyncDep" />部门同步
              </a-button>
            </div> -->
            <a-tree :treeData="treeData" @select="onSelect"></a-tree>
          </a-card>
        </a-col>
        <a-col :lg="24" :xl="17">
          <a-card title="用户列表" class="user">
            <div slot="extra">
              <!-- <a-button
                size="small"
                :loading="loading.asyncUser"
                @click="asyncDDUser"
                type="primary"
              >
                <a-icon type="sync" :spin="loading.asyncUser" />人员同步
              </a-button> -->
              <a-button size="small" @click="confirmed()" type="primary">
                确认
              </a-button>
            </div>

            <a-form-model
              style="margin-bottom:10px;"
              layout="inline"
              :model="table.select"
            >
              <a-form-model-item>
                <a-input
                  v-model="table.select.name"
                  placeholder="姓名"
                ></a-input>
              </a-form-model-item>
              <a-form-model-item>
                <a-button type="primary" @click="reloadData">查询</a-button>
              </a-form-model-item>
            </a-form-model>
            <a-table
              size="small"
              rowKey="id"
              :rowSelection="{
                type: 'radio',
                selectedRowKeys: table.selectedRowKeys,
                onChange: tableChange
              }"
              :customRow="customRow"
              :pagination="table.pagination"
              :columns="table.columns"
              :dataSource="table.data"
              :scroll="{ y: '55vh' }"
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
          </a-card>
        </a-col>
        <!-- <a-col :lg="24" :xl="5">
          <power-vue ref="power" :reload="reloadData"></power-vue>

        </a-col>-->
      </a-row>
      <!-- <a-drawer
        placement="right"
        width="400"
        @close="closePower"
        :visible="pop.power"
      >
        <power-vue ref="power" :reload="reloadData"></power-vue>
      </a-drawer> -->
    </div>
  </div>
</template>

<script>
//组件
import powerVue from "./components/power.vue";

import DD from "~/api/dingding";

export default {
  components: {
    // powerVue
  },
  props: {
    //表格数据源类型
    dataType: {
      type: Number,
      default: 1
    }
  },
  filters: {
    lastName(value) {
      let list = value.split("");
      let length = list.length;
      return list[length - 2] + list[length - 1];
    }
  },
  data() {
    return {
      pop: {
        power: false
      },
      loading: {
        asyncDep: false,
        asyncUser: false
      },
      treeData: [],
      user: [],
      table: {
        select: {
          name: ""
        },
        pagination: {
          current: 1,
          pageSize: 20,
          total: 0,
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
      departmentId: "",
      teacher: []
    };
  },
  watch: {
    // departmentId(newValue, oldValue) {
    //   this.reloadData();
    // }
  },
  computed: {
    userList() {
      // console.log(this.departmentId);
      return this.user.filter(
        item => item.departmentId.indexOf(this.departmentId) > -1
      );
    },
    port() {
      return this.$store.state.auth.port;
    },
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    }
  },
  methods: {
    // 获取任课老师
    confirmed() {
      this.$emit("teacherData", this.teacher);
    },
    //同步钉钉用户
    asyncDDUser() {
      this.loading.asyncUser = true;
      DD.asyncUser({ port: this.port, schoolId: this.schoolId })
        .then(res => {
          this.$message.success("人员同步成功");
          this.loading.asyncUser = false;
          //刷新人员
          this.reloadData();
        })
        .catch(err => {
          this.$message.error("人员同步失败");
          this.loading.asyncUser = false;
        });
    },
    //获取钉钉用户
    getDDuser() {
      DD.user({
        pagenum: this.table.pagination.current,
        pagesize: this.table.pagination.pageSize,
        departmentId: this.departmentId,
        ...this.table.select
      })
        .then(res => {
          // console.log("钉钉人员-----", res);

          this.table.data = res.data.list;
          this.table.pagination.total = res.data.total;
        })
        .catch(err => {});
    },
    //同步钉钉部门
    asyncDDdep() {
      this.loading.asyncDep = true;
      DD.asyncDep({ port: this.port })
        .then(res => {
          this.$message.success("部门同步成功");
          this.loading.asyncDep = false;
          //刷新部门
          this.getDDdep();
        })
        .catch(err => {
          this.$message.error("部门同步失败");
          this.loading.asyncDep = false;
        });
    },
    //获取钉钉部门
    getDDdep() {
      DD.dep()
        .then(res => {
          // console.log("钉钉部门--23---", res);
          let tree = this.$deptTree(res.data, {});
          // console.log("121212121-------", tree);
          this.treeData = tree;
        })
        .catch(err => {});
    },
    onSelect(selectedKeys, info) {
      this.departmentId = selectedKeys[0];
      // console.log("获取的部门id是-----", this.departmentId);
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      // console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.table.selectedRowKeys = selectedRowKeys;
      //   this.$emit("getPeople", selectedRows);
    },
    //重载数据
    reloadData() {
      this.getDDuser();
      this.closePower();
    },
    pageChange({ current, pageSize }) {
      this.table.pagination.current = current;
      this.table.pagination.pageSize = pageSize;
      this.getDDuser();
    },
    //表格操作
    customRow(record, index) {
      let _this = this;
      return {
        on: {
          click(event) {
            // console.log("表格行数据---------", record);
            _this.formChange(record);
          }
        }
      };
    },
    formChange(record) {
      this.table.selectedRowKeys = [record.id];

      this.teacher = { id: record.id, name: record.name };
      // console.log(" record-----", record);
      // console.log(
      //   " this.table.selectedRowKeys-----",
      //   this.table.selectedRowKeys
      // );
      // this.pop.power = true;
      // this.$nextTick(() => {
      //   // this.$refs.power.clearForm();
      //   // this.$refs.power.setForm(record);
      // });
    },
    closePower() {
      this.pop.power = false;
    },
    tableChange(keys, rows) {
      // console.log("keys-----", keys);
      // console.log("rows-----", rows);
      this.formChange(rows[0]);
    }
  },
  created() {
    this.getDDuser();
    this.getDDdep();
  }
};
</script>

<style lang="scss" scoped>
.el-dialog {
  margin-top: 4vh;
}
.right-border {
  height: 600px;
  overflow-y: auto;
  border-right: 1px solid gainsboro;
}

.dep {
  width: 100%;
}
.user {
  width: 100%;
}
.avatarImg {
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
</style>

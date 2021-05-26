<template>
  <div>
    <div class="contain">
      <el-card class="left">
        <el-tree
          v-loading="treeLoading"
          element-loading-text="数据加载中，请耐心等待"
          :data="treeData"
          :props="defaultProps"
          @node-click="clickTree"
          default-expand-all
          highlight-current
        ></el-tree>
      </el-card>
      <div class="right">
        <el-button type="primary" size="small" @click="save">保存</el-button>
        <el-table
          height="500"
          v-loading="tableLoading"
          element-loading-text="数据加载中，请耐心等待"
          size="small"
          border
          :data="tableData"
          style="width: 40%"
        >
          <el-table-column prop="classNumber" label="学号">
            <template slot-scope="scope">
              <div>
                <el-input
                  size="mini"
                  v-model="scope.row.classNumber"
                  @blur="edit(scope.row)"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              <el-select
                size="mini"
                @change="edit(scope.row)"
                v-model="scope.row.sex"
              >
                <el-option
                  v-for="item in sexOpt"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import main from "@/api/baoxiuCs.js";
import main1 from "@/api/studentStatus.js";
export default {
  computed: {
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
      treeLoading: false,
      tableLoading: false,
      classId: "",
      tableData: [],
      treeData: [],
      sexOpt: [
        {
          name: "男",
          id: 1,
        },
        {
          name: "女",
          id: 2,
        },
      ],
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  methods: {
    save() {
      main
        .reflushXh({})
        .then((res) => {
          this.$message.success("保存成功");
        })
        .catch((err) => {});
    },
    //!修改学号
    edit(row) {
      let val = {
        id: row.id,
        classNumber: row.classNumber,
        sex: row.sex,
      };
      main1
        .edit(val)
        .then((res) => {
          this.reData();
        })
        .catch((err) => {});
    },
    //!重新载入表格
    reData() {
      this.tableLoading = true;
      let val = {
        schoolId: this.schoolId,
        classId: this.classId,
        pagesize: 10000,
      };
      main1
        .list(val)
        .then((res) => {
          this.tableLoading = false;
          this.tableData = res.data.list;
        })
        .catch((err) => {});
    },
    //!获取树
    getTree() {
      this.treeLoading = true;
      let val = {
        schoolId: this.schoolId,
        unionid: this.unionid,
      };
      main
        .getNjBj(val)
        .then((res) => {
          this.treeLoading = false;
          this.treeData = res.data;
        })
        .catch((err) => {});
    },
    //!点击树查看表格数据
    clickTree(data, Node) {
      console.log(Node);
      if (Node.level == 2) {
        this.tableLoading = true;
        let val = {
          schoolId: this.schoolId,
          classId: Node.data.id,
          pagesize: 10000,
        };
        this.classId = Node.data.id;
        main1
          .list(val)
          .then((res) => {
            this.tableLoading = false;
            this.tableData = res.data.list;
          })
          .catch((err) => {});
      }
    },
  },
  created() {
    this.getTree();
  },
};
</script>

<style scoped>
.contain {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.left {
  width: 250px;
  min-width: 250px;
  min-height: 250px;
  border: 1px solid #eeeeee;
}
.right {
  width: 100%;
  padding-left: 15px;
}
</style>
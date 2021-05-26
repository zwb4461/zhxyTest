<template>
  <div class="contain">
    <el-card class="box-card" v-loading="loadingTable">
      <div slot="header" class="clearfix">
        <span>权限组</span>
      </div>
      <el-button icon="el-icon-plus" size="small" type="primary" @click="add"
        >新增</el-button
      >
      <el-table
        size="small"
        :data="tableData"
        style="width: 100%"
        highlight-current-row
        @row-click="clickRow"
      >
        <el-table-column type="index" label="序"> </el-table-column>
        <el-table-column prop="name" label="权限名"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="del(scope.row.id)"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix list">
        <span>权限列表</span>
        <span style="color:red;font-weight:bold" v-if="currentRow.name">{{currentRow.name}}</span>
        <el-button
          type="success"
          size="small"
          @click="save"
          :disabled="!currentRow.id"
          >保存</el-button
        >
      </div>

      <el-tree
        :check-strictly="true"
        node-key="key"
        ref="powerTrees"
        default-expand-all
        :props="props"
        show-checkbox
        @check-change="checkTree"
        :data="powerTree"
      >
      </el-tree>
    </el-card>
    <el-dialog
      title="新增权限组"
      :visible.sync="showAdd"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-input v-model="form.name" size="small" style="width: 90%"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAdd = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import main from "~/api/school";
export default {
  computed: {
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  watch: {
    schoolId(val) {
      this.getTableData();
    },
  },
  data() {
    return {
      //?表格加载
      loadingTable: false,
      //?新增dia绑定值
      showAdd: false,
      //?表单
      form: {
        name: "",
      },
      //?权限组列表
      tableData: [],
      //?当前选中行数据
      currentRow: {},
      //?权限列表
      powerTree: [
        {
          title: "社团选课",
          key: "m-8",
          children: [],
        },
        {
          title: "新生管理",
          key: "m-1",
          children: [
            {
              title: "新生报到",
              key: "m-1-1",
              children: [
                // {
                //   title: "新生类别(功能)",
                //   key: "p-1-t",
                //   children: [
                //     { title: "添加", key: "p-1-t-add" },
                //     { title: "修改", key: "p-1-t-edit" },
                //     { title: "删除", key: "p-1-t-del" },
                //   ],
                // },
                // {
                //   title: "计划新生",
                //   key: "p-1-l",
                //   children: [
                //     { title: "添加", key: "p-1-l-add" },
                //     { title: "修改", key: "p-1-l-edit" },
                //     { title: "删除", key: "p-1-l-del" },
                //     { title: "上传", key: "p-1-l-upload" },
                //   ],
                // },
                {
                  title: "报名新生",
                  key: "p-1-r",
                  children: [
                    { title: "添加", key: "p-1-r-add" },
                    { title: "修改", key: "p-1-r-edit" },
                    { title: "删除", key: "p-1-r-del" },
                  ],
                },
                // {
                //   title: "表单设置",
                //   key: "p-1-f",
                //   children: [
                //     { title: "添加", key: "p-1-f-add" },
                //     { title: "修改", key: "p-1-f-edit" },
                //     { title: "删除", key: "p-1-f-del" },
                //   ],
                // },
                {
                  title: "审核评定设置",
                  key: "p-1-s",
                  children: [],
                },
                {
                  title: "资料审核",
                  key: "p-1-h",
                  children: [],
                },
                {
                  title: "新生评定",
                  key: "p-1-x",
                  children: [],
                },

                {
                  title: "关闭报名（功能）",
                  key: "p-1-close",
                  children: [],
                },
              ],
            },
            {
              title: "智能分班",
              key: "m-1-2",
              children: [],
            },
          ],
        },
        {
          title: "素质管理",
          key: "m-18",
          children: [
            {
              title: "成绩管理",
              key: "m-18-1",
            },
            {
              title: "成绩统计",
              key: "m-18-5",
            },
            {
              title: "成绩单查看",
              key: "m-18-6",
            },
            {
              title: "成绩查询",
              key: "m-18-7",
            },
            {
              title: "奖惩管理",
              key: "m-18-2",
            },
            {
              title: "体卫管理",
              key: "m-18-3",
            },
          ],
        },

        {
          title: "代调课管理",
          key: "m-9",
        },
        {
          title: "报修管理",
          key: "m-10",
        },
        {
          title: "学籍管理",
          key: "m-4-4-4",
        },
        {
          title: "教师管理",
          key: "m-5",
          children: [
            {
              title: "基本信息",
              key: "m-5-5",
            },
            {
              title: "业务信息",
              key: "m-5-6",
            },
            {
              title: "荣誉信息",
              key: "m-5-7",
            },
            {
              title: "指导学生",
              key: "m-5-8",
            },
            {
              title: "岗位信息",
              key: "m-5-9",
            },
            {
              title: "交流信息",
              key: "m-5-10",
            },
          ],
        },
        {
          title: "智能排课",
          key: "m-6",
        },
        {
          title: "系统管理",
          key: "m-2",
          children: [
            {
              title: "组织架构",
              key: "m-2-2",
              children: [],
            },
            {
              title: "权限组",
              key: "m-2-6",
              children: [],
            },
            {
              title: "短信通道",
              key: "m-2-4",
              children: [],
            },
            {
              title: "基本设置",
              key: "m-2-5",
              children: [],
            },
          ],
        },

        {
          title: "日志管理",
          key: "m-3",
          children: [
            {
              title: "登录日志",
              key: "m-3-1",
              children: [],
            },
            {
              title: "操作日志",
              key: "m-3-2",
              children: [],
            },
          ],
        },
      ],
      //?tree的配置
      props: {
        label: "title",
        children: "children",
      },
    };
  },
  methods: {
    
    //?保存权限组
    save() {
      let arr = this.$refs.powerTrees.getCheckedKeys();
      console.log(arr, "当前权限列表");
      console.log(this.currentRow, "当前权限组名称");
      this.currentRow.role = arr.join(",");
      let val = {
        saveRole: [this.currentRow],
        schoolId: this.schoolId,
      };
      main
        .saveRole(val)
        .then((res) => {
          this.$message.success("保存成功!");
          this.currentRow = {};
           this.$refs.powerTrees.setCheckedKeys([]);
          this.getTableData();
        })
        .catch((err) => {});
    },
    //?删除当前权限组
    del(id) {
      this.$confirm({
        title: "该操作会永久删除该权限组,确定吗?",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .delRole({ id })
            .then((res) => {
              this.$message.success("删除成功");
              this.getTableData();
            })
            .catch((err) => {
              this.$message.error(err);
            });
        },
      });
    },
    //?点击新增按钮
    add() {
      this.form = {
        name: "",
      };
      this.showAdd = true;
    },
    //?提交新增权限组
    submitAdd() {
      this.loadingTable = true;
      let val = {
        saveRole: [
          {
            name: this.form.name,
          },
        ],
        schoolId: this.schoolId,
      };
      main
        .saveRole(val)
        .then((res) => {
          this.$message.success("提交成功!");
          this.showAdd = false;
          this.getTableData();
        })
        .catch((err) => {
          this.$message.error("提交失败!");
        });
    },
    //?获取表格数据
    getTableData() {
      this.loadingTable = true;
      main
        .seeRole({ schoolId: this.schoolId })
        .then((res) => {
          //?格式化role 如果是null会导致split报错
          this.tableData = res.data;
          this.loadingTable = false;
        })
        .catch((err) => {});
    },
    //?点击表格行
    clickRow(val) {
      console.log(val, "当前选中行");
      this.currentRow = val;
      if (val == null) {
        console.log("val空");
      } else if (val != null) {
        console.log("val不空");
        this.$refs.powerTrees.setCheckedKeys(val.role.split(","));
      }
    },
    //?选中树节点
    checkTree(data) {},
  },
  created() {
    this.getTableData();
  },
};
</script>

<style scoped>
.contain {
  padding: 15px 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.list {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="奖惩录入" name="first">
        <el-button
          type="info"
          size="small"
          @click="ifShow = !ifShow"
          style="margin-bottom: 10px"
          >显示/隐藏菜单</el-button
        >
        <div class="contain">
          <div class="left" v-show="ifShow">
            <el-tree
              :data="treeData"
              :props="defaultProps"
              @node-click="clickTree"
              highlight-current
              accordion
            >
            </el-tree>
          </div>
          <div class="right" style="width: 100%">
            <el-table
              :data="jcTable"
              size="small"
              border
              style="width: calc(100%-50px)"
            >
              <el-table-column prop="xh" label="学号"> </el-table-column>
              <el-table-column prop="name" label="姓名"> </el-table-column>
              <el-table-column prop="className" label="所在班级">
              </el-table-column>
              <el-table-column prop="djxq" label="学期">
                <template slot-scope="scope">
                  <el-select
                    size="mini"
                    v-model="scope.row.djxq"
                    placeholder="请选择"
                    @change="edit(scope.row)"
                  >
                    <el-option
                      v-for="item in djxqOpt"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="jc" label="奖励/惩罚">
                <template slot-scope="scope">
                  <el-select
                    size="mini"
                    v-model="scope.row.jc"
                    placeholder="请选择"
                    @change="edit(scope.row)"
                  >
                    <el-option
                      v-for="item in jcOpt"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="lrTime" label="日期">
                <template slot-scope="scope">
                  <el-date-picker
                    style="width: 100%"
                    size="mini"
                    v-model="scope.row.lrTime"
                    type="date"
                    placeholder="选择日期"
                    @change="edit(scope.row)"
                  >
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column prop="current" label="内容">
                <template slot-scope="scope">
                  <el-select
                    size="mini"
                    v-model="scope.row.current"
                    placeholder="请选择"
                    @change="edit(scope.row)"
                    @focus="setNrOpt(scope.row)"
                  >
                    <el-option
                      v-for="item in nrOpt"
                      :key="item.id"
                      :label="item.current"
                      :value="item.current"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注">
                <template slot-scope="scope">
                  <div>
                    <el-input
                      size="mini"
                      @blur="edit(scope.row)"
                      v-model="scope.row.remark"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div>
                    <el-button
                      type="danger"
                      @click="del(scope.row)"
                      size="small"
                      >删除</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="add">
              <el-button
                v-show="level == 3"
                size="small"
                style="width: 100%"
                @click="addTable"
                >+</el-button
              >
            </div>
          </div>
        </div></el-tab-pane
      >
      <el-tab-pane label="奖惩设置" name="second">
        <div class="optContain">
          <div class="leftOpt">
            <el-table size="small" :data="jTable" border style="width: 100%">
              <el-table-column label="奖励内容">
                <el-table-column type="index" label="序"> </el-table-column>
                <el-table-column prop="bh" label="编码" width="100">
                  <template slot-scope="scope">
                    <el-input
                      size="mini"
                      v-model="scope.row.bh"
                      @blur="editJ(scope.row)"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="current" label="内容">
                  <template slot-scope="scope">
                    <el-input
                      size="mini"
                      v-model="scope.row.current"
                      @blur="editJ(scope.row)"
                    ></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-button size="small" style="width: 100%" @click="addJ"
              >+</el-button
            >
          </div>
          <div class="rightOpt">
            <el-table size="small" :data="cTable" border style="width: 100%">
              <el-table-column label="惩罚内容">
                <el-table-column type="index" label="序"> </el-table-column>
                <el-table-column prop="bh" label="编码" width="100">
                  <template slot-scope="scope">
                    <el-input
                      size="mini"
                      v-model="scope.row.bh"
                      @blur="editC(scope.row)"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="current" label="内容">
                  <template slot-scope="scope">
                    <el-input
                      size="mini"
                      v-model="scope.row.current"
                      @blur="editC(scope.row)"
                    ></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-button size="small" style="width: 100%" @click="addC"
              >+</el-button
            >
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import main from "~/api/jcManage";
export default {
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  props: {
    cjlbId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      ifShow: true,
      activeName: "first",
      //当前选中的是班级还是学生.2--班级，3--学生
      level: 0,
      //当前选中的班级id
      classId: "",
      //当前选中的学生姓名
      name: "",
      //当前选中的学生id
      studentId: "",
      treeData: [],
      //奖励表格
      jTable: [],
      //惩罚表格
      cTable: [],
      //奖惩表格数据
      jcTable: [],
      //第几学期选项列表
      djxqOpt: [
        {
          name: "第一学期",
          id: 1,
        },
        {
          name: "第二学期",
          id: 2,
        },
      ],
      //奖惩选项列表
      jcOpt: [
        {
          name: "奖励",
          id: 0,
        },
        {
          name: "惩罚",
          id: 1,
        },
      ],
      //内容选项列表
      nrOpt: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  methods: {
    //!删除
    del(row) {
      console.log(row);
      this.$confirm({
        title: "确定删除吗?",
        cancelText: "取消",
        okText: "删除",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .deleteMoralPrize({ id: row.id })
            .then((res) => {
              this.$message.success("删除成功!");
              if (this.level == 2) {
                let val = {
                  classId: this.classId,
                  cjlbId: this.cjlbId,
                };
                this.getJcTable(val);
              } else if (this.level == 3) {
                let val = {
                  cjlbId: this.cjlbId,
                  classId: this.classId,
                  name: this.name,
                };
                this.getJcTable(val);
              }
            })
            .catch((err) => {});
        },
      });
    },
    //添加奖惩表格
    addTable() {
      let val = {
        cjlbId: this.cjlbId,
        studentId: this.studentId,
      };
      main
        .saveMoralPrize(val)
        .then((res) => {
          let val = {
            classId: this.classId,
            cjlbId: this.cjlbId,
            name: this.name,
          };
          this.getJcTable(val);
        })
        .catch((err) => {});
    },
    //赋值内容选项列表
    changeNrOpt(row) {
      if (row.jc == 0) {
        this.nrOpt = this.jTable;
      } else if (row.jc == 1) {
        this.nrOpt = this.cTable;
      }
    },
    //点击内容给内容选项列表赋值
    setNrOpt(row) {
      this.changeNrOpt(row);
    },
    edit(row) {
      //根据选择奖励还是惩罚赋值给内容选项列表
      this.changeNrOpt(row);
      //修改表格
      console.log(row);
      let val = row;
      val.cjlbId = this.cjlbId;
      main
        .saveMoralPrize(val)
        .then((res) => {
          if (this.level == 2) {
            let val = {
              classId: this.classId,
              cjlbId: this.cjlbId,
            };
            this.getJcTable(val);
          } else if (this.level == 3) {
            let val = {
              cjlbId: this.cjlbId,
              classId: this.classId,
              name: this.name,
            };
            this.getJcTable(val);
          }
        })
        .catch((err) => {});
    },
    //获取左侧树列表
    getTree() {
      let val = {
        jcId: this.cjlbId,
      };
      main
        .seeSanjiMeui(val)
        .then((res) => {
          this.treeData = res.data.map((item1) => {
            item1.children.map((item2) => {
              item2.children.map((item3) => {
                item3.nameData = item3.name;
                item3.name = item3.xh + "  " + item3.name;
              });
            });
            return item1;
          });
        })
        .catch((err) => {});
    },
    //获取奖惩表格
    getJcTable(val) {
      main
        .findJc(val)
        .then((res) => {
          this.jcTable = res.data;
        })
        .catch((err) => {});
    },
    test(node, data) {
      console.log("node", node);
      console.log("data", data);
    },
    //点击树
    clickTree(node, data) {
      this.nrOpt = [];
      //根据不同level获取表格数据
      if (data.level == 2) {
        this.level = 2;
        this.classId = data.data.id;
        let val = {
          classId: data.data.id,
          cjlbId: this.cjlbId,
        };
        this.getJcTable(val);
      } else if (data.level == 3) {
        this.level = 3;
        this.classId = data.parent.data.id;
        this.name = data.data.nameData;
        this.studentId = data.data.id;
        let val = {
          cjlbId: this.cjlbId,
          classId: data.parent.data.id,
          name: data.data.nameData,
        };
        this.getJcTable(val);
      }
    },
    //获取奖惩设置表格
    getJcOptTable() {
      main
        .seeJcsz({ isjc: 0, cjlbId: this.cjlbId, schoolId: this.schoolId })
        .then((res) => {
          this.jTable = res.data;
        })
        .catch((err) => {});
      main
        .seeJcsz({ isjc: 1, cjlbId: this.cjlbId, schoolId: this.schoolId })
        .then((res) => {
          this.cTable = res.data;
        })
        .catch((err) => {});
    },
    //编辑奖励表格
    editJ(row) {
      let val = {
        cjlbId: this.cjlbId,
        schoolId: this.schoolId,
        isjc: 0,
        id: row.id,
        current: row.current,
        bh: row.bh,
      };
      main
        .saveJcsz(val)
        .then((res) => {
          this.getJcOptTable();
        })
        .catch((err) => {});
    },
    //添加奖励表格
    addJ() {
      this.jTable.push({});
    },
    //编辑惩罚表格
    editC(row) {
      let val = {
        cjlbId: this.cjlbId,
        schoolId: this.schoolId,
        isjc: 1,
        id: row.id,
        current: row.current,
        bh: row.bh,
      };
      main
        .saveJcsz(val)
        .then((res) => {
          this.getJcOptTable();
        })
        .catch((err) => {});
    },
    //添加惩罚表格
    addC() {
      this.cTable.push({});
    },
  },
  created() {
    this.getTree();
    this.getJcOptTable();
  },
};
</script>

<style scoped>
.contain {
  display: flex;
  flex-direction: row;
  padding: 0;
}
.left {
  min-width: 250px;
  height: 500px;
  overflow: auto;
  border: 1px solid #eeeeee;
}
.right {
  width: 100%;
  min-height: 500px;
  margin-left: 15px;
}
.optContain {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.leftOpt {
  width: 49%;
  margin-right: 15px;
}
.rightOpt {
  width: 49%;
}
.add {
  width: 100%;
  height: 50px;
}
/deep/.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: #dcdcdc;
  color: #2f4f4f;
}
</style>
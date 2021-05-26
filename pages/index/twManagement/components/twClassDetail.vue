<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="体卫录入" name="first">
        <div class="btn_contain">
          <el-button size="small" style="width: 108px" @click="modelUpload"
            >模板下载</el-button
          >
          <el-upload
            style="margin-left: 10px"
            action="http://103.219.33.112:10010/importTwsz"
            :show-file-list="false"
            name="uploadFile"
            :on-success="fileInSuccess"
            :data="{
              classId: classId,
              djxq: djxq,
              cjlbId: cjlbId,
              schoolId: schoolId,
            }"
          >
            <el-button size="small" type="primary">体卫导入</el-button>
          </el-upload>
        </div>
        <div class="contain">
          <div class="left">
            <el-tree
              :data="treeData"
              :props="defaultProps"
              @node-click="clickTree"
              highlight-current
              accordion
            ></el-tree>
          </div>
          <div class="right">
            <el-table size="small" :data="twTable" border style="width: 100%">
              <el-table-column prop="xh" label="学号"> </el-table-column>
              <el-table-column prop="name" label="姓名"> </el-table-column>
              <el-table-column prop="tz" label="体重(千克)">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.tz"
                    @blur="edit(scope.row)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="sg" label="身高(厘米)">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.sg"
                    @blur="edit(scope.row)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="zsl" label="视力(左)">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.zsl"
                    @blur="edit(scope.row)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="ysl" label="视力(右)">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.ysl"
                    @blur="edit(scope.row)"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div></div
      ></el-tab-pane>
      <!-- <el-tab-pane label="体卫设置" name="second">
        <div class="optContain">
          <el-table
            :header-cell-style="{ 'text-align': 'center' }"
            size="small"
            :data="twTableOpt"
            border
            style="width: 100%"
          >
            <el-table-column label="体卫参考值">
              <el-table-column prop="gradeName" label="年级"> </el-table-column
            ></el-table-column>
            <el-table-column label="男">
              <el-table-column prop="nantz" label="体重(千克)">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.nantz"
                    @blur="editTw(scope.row)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="nansg" label="身高(厘米)">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.nansg"
                    @blur="editTw(scope.row)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="nansl" label="视力范围">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.nansl"
                    @blur="editTw(scope.row)"
                  ></el-input> </template
              ></el-table-column>
            </el-table-column>
            <el-table-column label="女">
              <el-table-column prop="nvtz" label="体重(千克)"
                ><template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.nvtz"
                    @blur="editTw(scope.row)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="nvsg" label="身高(厘米)">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.nvsg"
                    @blur="editTw(scope.row)"
                  ></el-input> </template
              ></el-table-column>
              <el-table-column prop="nvsl" label="视力范围">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.nvsl"
                    @blur="editTw(scope.row)"
                  ></el-input> </template></el-table-column
            ></el-table-column>
          </el-table>
        </div>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import main from "~/api/jcManage";
import main1 from "~/api/twManage";
export default {
  props: {
    cjlbId: {
      type: Number,
      default: 0,
    },
    djxq: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  data() {
    return {
      activeName: "first",
      //当前选中的是班级还是学生.2--班级，3--学生
      level: 0,
      //当前选中的班级id
      classId: "",
      //当前选中的学生姓名
      name: "",
      //当前选中的学生id
      studentId: "",
      //当前选中第几学期
      djxq: "",
      classId: "",
      treeData: [],
      //体卫表格
      twTable: [],
      //惩罚表格
      cTable: [],
      //奖惩表格数据
      twTableOpt: [],
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
    //导入
    fileInSuccess() {
      let val = {
        cjlbId: this.cjlbId,
        classId: this.classId,
        djxq: this.djxq,
      };
      this.gettwTable(val);
      this.$message.success("导入成功!");
    },
    //   模板下载
    modelUpload() {
      let val = {
        cjlbId: this.cjlbId,
        schoolId: this.schoolId,
        classId: this.classId,
      };
      if (this.classId) {
        main1
          .DownTwsz(val)
          .then((res) => {
            window.location.href = res.data;
          })
          .catch((err) => {});
      } else {
        this.$message.error("请选择班级!");
      }
    },
    edit(row) {
      //修改表格
      console.log(row);
      let val = row;
      val.cjlbId = this.cjlbId;
      val.djxq = this.djxq;
      main1
        .saveSport(val)
        .then((res) => {
          let val = {
            cjlbId: this.cjlbId,
            classId: this.classId,
            djxq: this.djxq,
          };
          this.gettwTable(val);
        })
        .catch((err) => {});
    },
    //获取左侧树列表
    getTree() {
      let val = {
        twId: this.cjlbId,
      };
      main
        .seeSanjiMeui(val)
        .then((res) => {
          console.log(this.djxq, "this.djxq");
          this.treeData = res.data.filter((item) => {
            return item.id == this.djxq;
          });
          console.log(this.treeData, "this.treeData");
          //   this.treeData = res.data;
        })
        .catch((err) => {});
    },
    //获取奖惩表格
    gettwTable(val) {
      main1
        .selectSport(val)
        .then((res) => {
          this.twTable = res.data;
        })
        .catch((err) => {});
    },
    //点击树
    clickTree(node, data) {
      this.nrOpt = [];
      if (data.level == 3) {
        console.log(data);
        this.level = 3;
        this.classId = data.data.id;
        this.djxq = data.parent.parent.data.id;
        let val = {
          cjlbId: this.cjlbId,
          classId: data.data.id,
          djxq: data.parent.parent.data.id,
        };
        this.djxq = data.parent.parent.data.id;
        this.classId = data.data.id;
        this.gettwTable(val);
      }
    },

    //获取奖惩设置表格
    getTwTable() {
      main1
        .seeTwsz({ cjlbId: this.cjlbId })
        .then((res) => {
          this.twTableOpt = res.data;
        })
        .catch((err) => {});
    },
    //编辑奖励表格
    editTw(row) {
      main1
        .saveTwsz(row)
        .then((res) => {
          this.getTwTable();
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
    this.getTwTable();
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
  width: 250px;
  min-height: 500px;
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
  height: 100vh;
  width: 50vw;
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
/deep/.el-table_46_column_336 {
  background-color: #e1e7ff;
}
/deep/.el-table_46_column_340 {
  background-color: #f5e4ff;
  /* #4F6FFF 10000% */
  /* #BE4FFF 10000% */
}
/deep/.el-table_46_column_336_column_337,
/deep/.el-table_46_column_336_column_338,
/deep/.el-table_46_column_336_column_339 {
  color: #4f6fff;
}
/deep/.el-table_46_column_340_column_341,
/deep/.el-table_46_column_340_column_342,
/deep/.el-table_46_column_340_column_343 {
  color: #be4fff;
}
.btn_contain {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
/deep/.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: #dcdcdc;
  color: #2f4f4f;
}
</style>
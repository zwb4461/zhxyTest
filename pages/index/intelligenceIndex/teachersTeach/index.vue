<template>
  <div>
    <div class="top">
      <a-button type="primary" @click="onPreservation" style="margin:15px 0">
        保存设置
      </a-button>
      <span
        >教师总数：{{ totalNumberClasses ? totalNumberClasses : 0 }}人
        任课总数：{{ totalNumberTeachers ? totalNumberTeachers : 0 }}节</span
      >
    </div>
    <aside class="tree-box">
      <el-table
        class="table-box"
        border
        style="width: 100%"
        :data="cols"
        ref="tablesRef"
        @cell-click="cellClick"
      >
        <el-table-column
          :prop="item"
          :label="item"
          v-for="(item, index) in campusList"
          :key="index"
        >
          <template slot-scope="scope">
            <div class="div_box_text">
              {{ cols[scope.$index][index].teacherName }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </aside>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="80%"
      height="50%"
      center
    >
      <my-form @teacherData="teacherData"></my-form>
    </el-dialog>
  </div>
</template>

<script>
import http from "../../../../api/intelligenceIndex";
import MyForm from "./components/_form";
export default {
  components: {
    MyForm
  },
  props: ["classweekId"],
  data() {
    return {
      centerDialogVisible: false,
      treeData: [],
      cols: [
        // '语文'
      ],
      campusList: [
        // {
        //   subjectName: "语文",
        //   sumval: 12
        // }
      ],
      dialogVisible: false,
      curriculum: "",
      departmentId: [],
      departmentIdVal: "",
      selectData1: "",
      selectData2: "",
      totalNumberClasses: "",
      totalNumberTeachers: ""
    };
  },
  methods: {
    teacherData(data) {
      this.centerDialogVisible = false;
      let a = this.cols;
      a.map(list => {
        list.map(item => {
          if (
            item.subjectName === this.selectData1 &&
            item.className === this.selectData2
          ) {
            item.teacherName = data.name;
            item.teacherUnionid = data.id;
          }
        });
      });
      this.cols = a;
      // console.log(this.cols);
    },
    cellClick(row, column) {
      // 行和列的关系
      this.selectData1 = column.label;
      this.selectData2 = row[0].teacherName;
      // console.log(row, column);
      this.centerDialogVisible = true;
    },

    onPreservation() {
      // console.log("提交");
      // console.log(JSON.stringify(this.cols));

      let a = this.cols;
      let obj = [];

      a.map(list => {
        // console.log(list);
        list.map(item => {
          if (
            item.className &&
            item.subjectName != null &&
            item.subjectName != ""
          ) {
            obj.push(item);
          }
        });
      });

      // console.log(JSON.stringify(obj));
      // this.cols = a;

      let params = {
        classWeekId: this.classweekId,
        setsubjTea: JSON.stringify(obj)
      };
      http
        .setSubject({ ...params })
        .then(res => {
          this.$message.success(res.data);
          this.$nextTick(() => {
            this.dataInit();
          });
        })
        .catch(err => {
          this.$message.console.error("设置失败！");
        });
    },
    dataInit() {
      http.seeSubject({ id: this.classweekId, isTea: 0 }).then(res => {
        this.totalNumberClasses = res.data2.rekeval;
        this.totalNumberTeachers = res.data2.teacherval;

        this.campusList = res.data.map(list => {
          return list;
        });
        // 当前所有的课程名称(去重后的)
        let ke_nameAll = Array.from(
          new Set(
            this.campusList.map(item => {
              return item.subjectName;
            })
          )
        );
        // 所有的排课班级(去重后的)
        let ke_classAll = Array.from(
          new Set(
            this.campusList.map(item => {
              return item.className;
            })
          )
        );

        // 按照去重后课程名称为表头、按照班级为行重构数据
        let alldatas = ke_classAll.map((item, index) => {
          let arr_nei = [];
          ke_nameAll.forEach((item_item, index_index) => {
            if (
              this.campusList.filter(
                item_fi =>
                  item_fi.className == item && item_fi.subjectName == item_item
              )
            ) {
              arr_nei.push(
                this.campusList.filter(
                  item_fi =>
                    item_fi.className == item &&
                    item_fi.subjectName == item_item
                )[0]
              );
            } else {
              //处理0的情况
              arr_nei.push({
                classId: this.campusList.filter(
                  item_fil => item_fil.className == item
                ).classId,
                className: this.campusList.filter(
                  item_fil => item_fil.className == item
                ).className,
                classweekId: this.campusList.filter(
                  item_fil => item_fil.className == item
                ).classweekId,
                deleted: "随便",
                id: "随便",
                subjectName: item_item,
                sumval: 0,
                teacherName: "",
                teacherUnionid: ""
              });
            }
          });
          return arr_nei;
        });
        this.cols = alldatas.map((item_map, index_map) => {
          item_map.unshift({
            teacherName: ke_classAll[index_map]
          });

          for (var i = 0; i < item_map.length; i++) {
            if (
              item_map[i] == "" ||
              item_map[i] == null ||
              typeof item_map[i] == undefined
            ) {
              item_map.splice(i, 1);
              i = i - 1;
            }
          }
          return item_map;
        });

        for (var i = 0; i < ke_nameAll.length; i++) {
          if (
            ke_nameAll[i] == "" ||
            ke_nameAll[i] == null ||
            typeof ke_nameAll[i] == undefined
          ) {
            ke_nameAll.splice(i, 1);
            i = i - 1;
          }
        }

        ke_nameAll.unshift("排课班级\\科目");
        this.campusList = ke_nameAll;

        console.log("this.cols-----", this.cols);
      });
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    this.dataInit();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>

<style lang="scss" scoped>
.div_box_text {
  width: 100%;
  height: 100%;
}

.tree-box {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.table-box {
  // margin-top: 15px;

  // /deep/td {
  //   text-align: center;
  // }

  /deep/th {
    background-color: #fafafa;
    // text-align: center;

    &:nth-child(1) {
      color: #298cf7;
      font-size: 14px;
      // text-align: center;
      font-family: Microsoft Yahei;
    }

    // .cell {
    //   text-align: center;
    // }
  }
}
.top {
  button {
    width: 100px;
    height: 32px;
    border-radius: 4px;
    color: rgba(252, 252, 252, 1);
    font-size: 14px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0);
    margin-right: 14px;
  }

  span {
    color: rgba(100, 100, 100, 1);
    font-size: 18px;
    text-align: left;
  }
}
</style>

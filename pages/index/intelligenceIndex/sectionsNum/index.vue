<template>
  <div>
    <div class="top">
      <a-button type="primary" @click="onPreservation">保存设置</a-button>
      <span
        >课时容量：{{ classCapacity == null ? 0 : classCapacity }}节 课程数：{{
          numberOfCourses == null ? 0 : numberOfCourses
        }}科</span
      >
    </div>

    <a-button type="primary" @click="dialogVisible = true" style="margin:15px 0"
      ><a-icon type="plus-circle" />添加一列</a-button
    >
    <!-- <a-button
      type="primary"
      @click="dialogVisible2 = true"
      style="margin:15px 0"
      ><a-icon type="setting" />课目条件设置</a-button
    > -->
    <aside class="tree-box">
      <el-table
        class="table-box"
        border
        style="width: 100%"
        :data="cols"
        ref="tablesRefs"
        @cell-click="cellClick"
      >
        <template v-for="(item, index) in campusList">
          <el-table-column
            :prop="item"
            :label="item"
            :key="index"
            :formatter="stateFormat"
            v-if="item !== ''"
          >
            <template slot-scope="scope">
              <!-- <div
              class="div_box_text bg"
              v-if="item === '节数合计'"
              :class="
                classCapacity == cols[scope.$index][index].sumval
                  ? 'green'
                  : classCapacity > cols[scope.$index][index].sumval
                  ? 'gules'
                  : 'blue'
              "
            >
              {{ cols[scope.$index][index].sumval }}
            </div> -->
              <div class="div_box_text">
                {{ cols[scope.$index][index].sumval }}
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </aside>

    <el-dialog
      title="请输入课程名称"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="curriculum"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCol">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="请输入课程节数"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="segments"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="segmentsAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible2"
      :lock-scroll="true"
      :close-on-click-modal="true"
      :show-close="false"
    >
      <my-form></my-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false"
          >确 定</el-button
        >
      </span> -->
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
      cols: [],
      campusList: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      curriculum: "",
      segments: "",
      selectData1: "",
      selectData2: "",
      classCapacity: "",
      numberOfCourses: "",
      switchVal: false
    };
  },
  methods: {
    stateFormat(row, column) {
      console.log(row, column, "-----row,column");
    },
    segmentsAdd() {
      let a = this.cols;
      a.forEach((list, index) => {
        list.forEach((item, index1) => {
          if (
            item.subjectName === this.selectData1 &&
            item.className === this.selectData2
          ) {
            item.sumval = this.segments;
          }
        });
      });

      this.$nextTick(() => {
        this.cols = a;
      });
      this.segments = "";
      this.dialogVisible1 = false;
    },
    cellClick(row, column) {
      // 行和列的关系
      this.selectData1 = column.label;
      this.selectData2 = row[0].sumval;
      this.dialogVisible1 = true;
    },
    addCol() {
      if (this.curriculum == "") {
        this.$message.warning("请输入课程名称");
        return;
      }
      if (this.switchVal === false) {
        this.campusList.push(this.curriculum);
        let new_cols = JSON.parse(JSON.stringify(this.cols));
        new_cols.forEach((item, index) => {
          item.push({
            classId: item[1].classId,
            className: item[1].className,
            subjectName: this.curriculum,
            sumval: 0
          });
        });
        this.cols = new_cols;
        this.curriculum = "";
        this.dialogVisible = false;
      } else {
        this.campusList.splice(-1, 0, this.curriculum);
        let new_cols = JSON.parse(JSON.stringify(this.cols));
        new_cols.forEach((item, index) => {
          item.splice(-1, 0, {
            classId: item[1].classId,
            className: item[1].className,
            subjectName: this.curriculum,
            sumval: 0
          });
        });
        this.cols = new_cols;
        this.curriculum = "";
        this.dialogVisible = false;
      }
      // console.log(this.cols);

      if (this.switchVal === false) {
        this.onPreservation();
        this.switchVal = true;
      }
    },
    onPreservation() {
      let a = this.cols;
      let obj = [];

      a.map(list => {
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

      let params = {
        classWeekId: this.classweekId,
        setsubjTea: JSON.stringify(obj)
      };

      http
        .setSubject({ ...params })
        .then(res => {
          if (this.switchVal !== false) {
            this.$message.success(res.data);
          }
          this.$nextTick(() => {
            this.dataInit();
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleClose(done) {
      this.dialogVisible = false;
      this.dialogVisible1 = false;
      this.dialogVisible2 = false;
    },
    dataInit() {
      http.seeSubject({ id: this.classweekId }).then(res => {
        this.classCapacity = res.data2.capacity;
        this.numberOfCourses = res.data2.courses;

        this.campusList = res.data;

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

        // this.campusList = this.campusList.map((item, index) => {
        //   if (item.subjectName !== "") {
        //     return item;
        //   } else {
        //     this.campusList.splice(index, 1);
        //   }
        // });

        // 按照去重后课程名称为表头、按照班级为行重构数据
        let alldatas = ke_classAll.map((item, index) => {
          let arr_nei = [];
          ke_nameAll.forEach((item_item, index_index) => {
            if (
              this.campusList.filter(
                item_fi =>
                  item_fi.className == item && item_fi.subjectName == item_item
              ).length!=0
            ) {
              arr_nei.push(
                this.campusList.filter(
                  item_fii =>
                    item_fii.className == item &&
                    item_fii.subjectName == item_item
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
                deleted: "",
                id: "",
                subjectName: "",
                sumval: 0,
                teacherName: "",
                teacherUnionid: ""
              });
            }
          });
          return arr_nei;
        });

        let val = alldatas.map((item_map, index_map) => {
          console.log(item_map,'item_map')
          item_map.unshift({
            sumval: ke_classAll[index_map]
          });

          item_map = item_map.filter(current => {
            return current != undefined && current != null;
          });

          return item_map;
        });

        ke_nameAll.unshift("排课班级\\科目");
        this.campusList = ke_nameAll;
        this.cols = val;
        console.log(this.cols, "-----this.cols");
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
/deep/.inputSeif {
  border: none;
  width: 100%;
}
/deep/.inputSeif:focus {
  border: 1px solid #c1c1c1;
}
.tree-box {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.table-box {
  // margin-top: 15px;

  .green {
    background-color: #55c52a;
    color: #fff;
  }
  .gules {
    background-color: #ff3232;
    color: #fff;
  }
  .blue {
    background-color: #298cf7;
    color: #fff;
  }

  /deep/ td {
    text-align: center;
    padding: 0;
    height: 48px;
    line-height: 48px;

    .cell {
      padding: 0;
      height: 100%;

      .div_box_text {
        width: 100%;
        height: 100%;
        line-height: 48px;
      }
    }
  }

  /deep/th {
    background-color: #fafafa;
    text-align: center;

    &:nth-child(1) {
      color: #298cf7;
      font-size: 14px;
      text-align: center;
      font-family: Microsoft Yahei;
    }

    // &:nth-last-child(2) {
    //   color: #298cf7;
    //   font-size: 14px;
    //   text-align: center;
    //   font-family: Microsoft Yahei;
    // }

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

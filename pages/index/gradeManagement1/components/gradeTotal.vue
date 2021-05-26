<template>
  <div>
    <el-button
      v-if="ifTj"
      @click="outTj"
      style="margin-bottom: 15px"
      type="primary"
      class="button"
      size="small"
      >导出总统计表</el-button
    >
    <div class="contain">
      <el-card class="left">
        <el-tree
          :data="Menu"
          :props="ClassProps"
          @node-click="clickTree"
          highlight-current
          accordion
        ></el-tree>
      </el-card>
      <div
        class="right"
        v-watermark="{
          text: authName,
        }"
      >
        <div v-show="TotalName == '总统计表'" style="width: 100%">
          <el-table
            id="out-tjPerson"
            v-loading="tjLoading"
            element-loading-text="数据加载中，请耐心等待"
            size="small"
            :data="totalTable"
            border
            style="width: calc(100% - 20px)"
          >
            <!-- <el-table-column prop="ranking" label="排名"> </el-table-column> -->
            <el-table-column prop="xh" label="学号"> </el-table-column>
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column prop="className" label="所在班级">
            </el-table-column>
            <el-table-column
              :label="item"
              v-for="(item, index) in totalColName"
              :key="index"
            >
              <template slot-scope="scope">
                <div>
                  {{ scope.row.scoreXkDedis[index] }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="总分"> </el-table-column>
          </el-table>
        </div>
        <div
          v-show="TotalName != '总统计表' && TotalName != '成绩分析'"
          style="width: 100%"
        >
          <el-table
            v-loading="tjLoading"
            style="width: calc(100% - 20px)"
            element-loading-text="数据加载中，请耐心等待"
            size="small"
            :render-header="labelHead"
            :data="tableData"
            border
            @header-click="headClick"
          >
            <el-table-column
              :label="item"
              v-for="(item, index) in colList"
              :key="index"
            >
              <template slot-scope="scope">
                <div>
                  {{ scope.row[index + 1] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="btn_contain" style="width: calc(100% - 20px)">
            <div
              v-for="(item, index) in colList"
              :key="index"
              class="btn"
              :style="{ width: 100 / colList.length + '%' }"
            >
              <el-button
                v-show="index != 0 && index != colList.length - 1"
                type="primary"
                size="mini"
                @click="detail(index)"
                >详细</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="统计" :visible.sync="showDetail" width="50%">
      <el-button
        @click="exportExcel"
        style="margin-bottom: 15px"
        type="primary"
        class="button"
        >导出</el-button
      >
      　<el-button v-print="'#printTest'">打印</el-button>
      <div id="printTest">
        <div class="table">
          <div class="tongji">
            <span>统计</span>
          </div>
          <div class="tableData">
            <div class="table1">任课老师</div>
            <div class="table1">{{ detailData.teacherName }}</div>
            <div class="table1">总分</div>
            <div class="table1">{{ detailData.sum }}</div>
          </div>
          <div class="tableData">
            <div class="table1">实考人数</div>
            <div class="table1">{{ detailData.skNum }}</div>
            <div class="table1">统计人数</div>
            <div class="table1">{{ detailData.tjNum }}</div>
          </div>
          <div class="tableData">
            <div class="table1">最高分</div>
            <div class="table1">{{ detailData.max }}</div>
            <div class="table1">最低分</div>
            <div class="table1">{{ detailData.min }}</div>
          </div>
          <div class="tableData">
            <div class="table1">平均分</div>
            <div class="table1">{{ detailData.average }}</div>
            <div class="table1">均分差</div>
            <div class="table1">{{ detailData.averDiff }}</div>
          </div>
          <div class="tableData">
            <div class="table1">后20%均分</div>
            <div class="table1">{{ detailData.laserAver }}</div>
            <div class="table1">后20%差值</div>
            <div class="table1">{{ detailData.laserDiff }}</div>
          </div>
        </div>
        <el-table
          id="out-table"
          size="mini"
          :data="DetailTable"
          border
          style="width: 100%"
        >
          <el-table-column prop="xh" label="学号"> </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column
            :label="item"
            v-for="(item, index) in detailDataCol"
            :key="index"
          >
            <template slot-scope="scope">
              <div>
                <span v-if="index == 0"> {{ scope.row.score }} </span>
                <span v-if="index != 0">
                  {{ scope.row.scores[index - 1] }}</span
                >
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="njPm" label="全年级排名"> </el-table-column> -->
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDetail = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import main from "~/api/gradeTotal";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    authName() {
      return this.$store.state.auth.userInfo.name;
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
      ifTj: false,
      tjLoading: false,
      showDetail: false,
      Menu: [],
      colList: [],
      tableData: [],
      detailData: [],
      DetailTable: [],
      detailDataCol: [],
      totalTable: [],
      totalColName: [],
      rowKey: [],
      classId: "",
      ksId: "",
      ksxkId: "",
      TotalName: "",
      ClassProps: {
        //树形的默认设置
        children: "children",
        label: "name",
      },
    };
  },
  methods: {
    exportExcel() {
      var xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#out-table"),
        xlsxParam
      );
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          this.paperName + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    outTj() {
      var xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#out-tjPerson"),
        xlsxParam
      );
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "总统计表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },

    detail(index) {
      let data = this.tableData[this.tableData.length - 1];
      let data1 = Object.keys(this.tableData[this.tableData.length - 1]);
      this.classId = data[data1[index]];
      let val = {
        schoolId: this.schoolId,
        ksId: this.ksId,
        ksxkId: this.ksxkId,
        classId: this.classId,
      };
      console.log(val);
      main
        .BjSeeScore(val)
        .then((res) => {
          this.detailData = res.data.data;
          this.DetailTable = res.data.data.seeScoreList;
          this.detailDataCol = res.data.data2;
          this.showDetail = true;
        })
        .catch((err) => {});
    },
    headClick(column, event) {
      console.log("column", column);
      console.log("event", event);
    },
    labelHead(h, { column, index }) {
      return h("span", { class: "table-head", style: { width: "100%" } }, [
        column.label,
      ]);
    },
    getMenu() {
      let val = { cjlbId: this.cjlbId, unionid: this.unionid };
      main
        .seeScore(val)
        .then((res) => {
          this.Menu = res.data;
        })
        .catch((err) => {});
    },
    //点击树
    clickTree(data, node) {
      if (node.level == 4) {
        console.log("node", node);
        //判断是否是总统计表
        this.TotalName = node.data.name;
        if (this.TotalName != "总统计表") {
          this.ifTj = false;
          this.tjLoading = true;
          let val = {
            schoolId: this.schoolId,
            ksxkId: node.data.id,
            gradeId: node.parent.parent.data.id,
            unionid: this.unionid,
          };
          console.log(val);
          this.ksxkId = node.data.id;
          this.ksId = node.parent.data.id;
          main
            .ksSeeScore(val)
            .then((res) => {
              this.tjLoading = false;
              this.colList = res.data.data2;
              this.tableData = res.data.data;
            })
            .catch((err) => {});
        } else {
          this.ifTj = true;
          this.tjLoading = true;
          let val = {
            schoolId: this.schoolId,
            ksxkId: node.data.id,
            gradeId: node.parent.parent.data.id,
            unionid: this.unionid,
          };
          console.log(val);
          this.ksxkId = node.data.id;
          this.ksId = node.parent.data.id;
          main
            .ztjSeeScore(val)
            .then((res) => {
              this.tjLoading = false;
              this.totalTable = res.data.data;
              this.totalColName = res.data.data2;
            })
            .catch((err) => {});
        }
      }
    },
  },
  created() {
    this.getMenu();
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
  min-width: 250px;
  width: 250px;
  border: 1px solid #eeeeee;
  min-height: 600px;
}
.right {
  width: 100%;
  padding-left: 15px;
}
.btn_contain {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.table {
  width: 95%;
  height: 240px;
  border: 1px solid #ededed;
  margin-bottom: 20px;
}
.tongji {
  width: 95%;
  height: 40px;
  border-bottom: 1px solid #ededed;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: #fafafa;
}
.tableData {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ededed;
  border-top: 1px solid #ededed;
  display: flex;
  flex-direction: row;
}
.table1 {
  width: 25%;
  height: 40px;
  border-right: 1px solid #ededed;
  display: flex;
  align-items: center;
  justify-content: center;
}
/deep/.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: #dcdcdc;
  color: #2f4f4f;
}
/*最外层透明*/
/deep/ .el-table,
/deep/ .el-table__expanded-cell {
  background-color: transparent;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent;
}
</style>
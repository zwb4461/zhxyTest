<template>
  <div>
    <el-button type="primary" size="mini" @click="perserve">保存设置</el-button>
    <el-button type="success" size="mini" @click="startClass" icon="el-icon-video-play">开始排课</el-button>
    <a-switch v-model="isclose" checkedChildren="排课已开启" unCheckedChildren="关闭" defaultChecked />
    <a-row :gutter="8">
      <a-col :span="4">
        <a-tree :treeData="treeData" checkable @check="onCheck"></a-tree>
      </a-col>
      <a-col :span="20">
        <el-table
          :data="table"
          border
          style="width:1231px"
          :row-style="{height:'60px'}"
          @cell-click="clickTable"
          v-loading="loading"
          element-loading-text="开始排课！"
        >
          <el-table-column prop="stanz" label="节数/课期" width="180"></el-table-column>
          <el-table-column prop="monday" label="星期一" width="150"></el-table-column>
          <el-table-column prop="tuesday" label="星期二" width="150"></el-table-column>
          <el-table-column prop="wednesday" label="星期三" width="150"></el-table-column>
          <el-table-column prop="thursday" label="星期四" width="150"></el-table-column>
          <el-table-column prop="friday" label="星期五" width="150"></el-table-column>
          <el-table-column prop="saturday" label="星期六" width="150"></el-table-column>
          <el-table-column prop="sunday" label="星期日" width="150"></el-table-column>
        </el-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import http from "@/api/intelligenceIndex";
import main from "@/api/courseManagement";
export default {
  props: ["classweekId"],

  data() {
    return {
      isclose: false,
      loading: false,
      clazz: undefined,
      classId: undefined,
      treeData: [],
      table: [],
      cellVal: [],
      index1: 0,
      col1: "",
      index2: 0,
      col2: "",
    };
  },
  methods: {
    perserve() {
      this.stanzaList = [];
      let week = ["一", "二", "三", "四", "五", "六", "日"];
      let weeks = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];

      console.log("当前的table:", this.table);
      this.table.map((item) => {
        for (let i = 1; i < 8; i++) {
          this.stanzaList.push({
            subjectName: item[weeks[i - 1]],
            sort: item.sort,
            stanz: item.stanz,
            time: "",
            type: item.type,
            weekName: "礼拜" + week[i - 1],
            position: item.position,
          });
        }
      });
      console.log("stanzaList", this.stanzaList);
      //调接口
      let classHour = {
        classweekId: this.classweekId,
        clazz: this.clazz,
        stanzaList: this.stanzaList,
      };
      main
        .setClassHour(classHour)
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    clickTable(row, column, cell, event) {
      this.cellVal.push(row[column.property]);

      if (this.cellVal.length == 1) {
        this.index1 = row.sort - 1;
        this.col1 = column.property;
      } else if (this.cellVal.length == 2) {
        this.index2 = row.sort - 1;
        this.col2 = column.property;
        this.table[this.index1][this.col1] = this.cellVal[1];
        this.table[this.index2][this.col2] = this.cellVal[0];
        this.cellVal = [];
      }
    },
    startClass() {
      this.loading = true;

      main
        .intelligenceCourse({ classId: this.classId, id: this.classweekId })
        .then((res) => {
          console.log("res", res);
          setTimeout(() => {
            this.loading = false;
          }, 3000);
        })
        .then((res) => {
          main
            .seeClassHour1({ classId: this.classId, id: this.classweekId })
            .then((res) => {
              this.table = res.data.classTeaLs;
              //   console.log("table", this.table);
            })
            .catch((err) => {
              console.log("err", err);
            });
        })
        .catch((err) => {
          this.loading = false;
          console.log("err", err);
        });
    },
    onCheck(checkedKeys, info) {
      this.clazz = checkedKeys.join(",");
      let len = checkedKeys.length;
      if (checkedKeys.length) {
        this.classId = checkedKeys[len - 1].toString();
      }
      main
        .seeClassHour1({ classId: this.classId, id: this.classweekId })
        .then((res) => {
          this.table = res.data.classTeaLs;
          //   console.log("table", this.table);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    getTree() {
      http.dep({ isYao: 1 }).then((res) => {
        let tree = this.$deptTree(res.data, {});
        this.treeData = tree;
      });
    },
  },
  created() {
    this.getTree();
  },
};
</script>

<style>
</style>
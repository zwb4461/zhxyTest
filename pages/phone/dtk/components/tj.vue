<template>
  <div>
    <div class="search">
      <div class="search_item">
        <span>开始日期:</span>
        <el-date-picker
          size="small"
          style="width: 180px"
          v-model="startDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div class="search_item">
        <span>结束日期:</span>
        <el-date-picker
          size="small"
          style="width: 180px"
          v-model="endDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div class="search_item">
        <span>教师姓名:</span>
        <el-input
          class="inp"
          style="width: 180px"
          size="small"
          v-model="name"
          placeholder="教师姓名"
        ></el-input>
      </div>
      <el-button
        size="small"
        icon="el-icon-setting"
        @click="tj"
        type="primary"
        style="width: 280px"
        >查询</el-button
      >
    </div>
    <div class="title">代调统计</div>
    <div class="table">
      <el-table border size="small" :data="tableData" style="width: 100%">
        <el-table-column prop="teaName" label="教师"></el-table-column>
        <el-table-column prop="takejs" label="代课节次"></el-table-column>
        <el-table-column prop="adjs" label="调课节次"></el-table-column>
        <el-table-column prop="zhjf" label="综合积分"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import main from "~/api/dtk";
import main1 from "~/api/baoxiuCs";
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      tableData: [],
      name: "",
      cjlbId: "",
    };
  },
  methods: {
    getTable() {
      main
        .seeTakeTJ({ cjlbId: this.cjlbId })
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {});
    },
    //详细
    see() {},
    //数据导出
    sjdc() {},
    //统计
    tj() {
      let createTime = [this.startDate, this.endDate];
      let val = {
        cjlbId: this.cjlbId,
        teaName: this.name,
        createTime: this.startDate && this.endDate ? createTime : [],
      };
      main
        .seeTakeTJ(val)
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {});
    },
    findCjlbId() {
      main1
        .seeMobileScore({})
        .then((res) => {
          this.cjlbId = res.data.id;
          this.getTable();
        })
        .catch((err) => {});
    },
  },
  created() {
    this.findCjlbId();
  },
};
</script>

<style scoped>
.search {
  min-height: 120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 0 0 50px;
}
.inp {
  margin-right: 15px;
}
.title {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #0064ff;
  margin-bottom: 10px;
}
.table {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
}
.search_item {
  margin-bottom: 10px;
}
</style>
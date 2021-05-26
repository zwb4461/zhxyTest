<template>
  <div>
    <div class="search">
      <el-date-picker
        class="inp"
        size="small"
        v-model="dataTime"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-input
        class="inp"
        style="width: 150px"
        size="small"
        v-model="name"
        placeholder="教师姓名"
      ></el-input>
      <el-button size="small" icon="el-icon-setting" @click="tj" type="primary"
        >统计</el-button
      >
      <el-button size="small" @click="sjdc">数据导出</el-button>
    </div>
    <el-table border size="small" :data="tableData" style="width: 50%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="teaName" label="教师"></el-table-column>
      <el-table-column prop="takejs" label="代课节次"></el-table-column>
      <el-table-column prop="adjs" label="调课"></el-table-column>
      <el-table-column prop="zhjf" label="综合积分"> </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <a-button size="small" type="waring" @click="see(scope.row)"
            >详细</a-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import main from "~/api/dtk";
export default {
  props: {
    dtkId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dataTime: [],
      tableData: [],
      name: "",
    };
  },
  methods: {
    getTable() {
      main
        .seeTakeTJ({ cjlbId: this.dtkId })
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
    tj() {},
  },
  created() {
    this.getTable();
  },
};
</script>

<style scoped>
.search {
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.inp {
  margin-right: 15px;
}
</style>
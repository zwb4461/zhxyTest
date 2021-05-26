<template>
  <div class="contain">
    <div>
      开始日期:<el-date-picker
        v-model="startTime"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="选择日期"
        size="small"
      >
      </el-date-picker>
    </div>
    <div style="margin-top: 10px">
      结束日期:<el-date-picker
        v-model="endTime"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="选择日期"
        size="small"
      >
      </el-date-picker>
      <el-button type="primary" size="small" @click="search">查询</el-button>
    </div>
    <div class="title">
      <span>报修统计</span>
    </div>
    <el-table
      :header-cell-style="{ 'text-align': 'center' }"
      size="small"
      :data="tableData_left"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="报修分类"> </el-table-column>
      <el-table-column prop="dcl" label="待处理" align="center" width="60">
        <template slot-scope="scope">
          <div style="font-size: 18px; color: #ff5151">
            {{ scope.row.dcl }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="clz" label="处理中" align="center" width="60">
        <template slot-scope="scope">
          <div style="font-size: 18px; color: #c4c400">
            {{ scope.row.clz }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ycl" label="已处理" align="center" width="60">
        <template slot-scope="scope">
          <div style="font-size: 18px; color: #73bf00">
            {{ scope.row.ycl }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="title">
      <span>配件统计</span>
    </div>
    <el-table
      :header-cell-style="{ 'text-align': 'center' }"
      size="small"
      :data="tableData_right"
      style="width: 100%"
      border
    >
      <el-table-column prop="name" label="配件"> </el-table-column>
      <el-table-column prop="sum" label="数量" align="center" width="60">
        <template slot-scope="scope">
          <div style="font-size: 18px">
            {{ scope.row.sum }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="dw" label="单位" align="center" width="60">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import main from "~/api/baoxiuCs";
export default {
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    power() {
      return this.$store.state.layout.power;
    },
  },
  data() {
    return {
      tableData_left: [],
      tableData_right: [],
      xfTime: undefined,
      startTime: undefined,
      endTime: undefined,
      showDate: false,
    };
  },
  methods: {
    search() {
      if (this.power.indexOf("m-10") != -1) {
        // ?存在
        var val = {
          schoolId: this.schoolId,
          xfTime: [this.startTime, this.endTime],
        };
      } else {
        var val = {
          schoolId: this.schoolId,
          unionid: this.unionid,
          xfTime: [this.startTime, this.endTime],
        };
      }
      main
        .repairTj(val)
        .then((res) => {
          this.tableData_left = res.data;
          this.tableData_right = res.data2;
        })
        .catch((err) => {});
    },
    getTj(data) {
      if (data) {
        var val = {
          schoolId: this.schoolId,
        };
      } else {
        var val = {
          schoolId: this.schoolId,
          unionid: this.unionid,
        };
      }
      main
        .repairTj(val)
        .then((res) => {
          this.tableData_left = res.data;
          this.tableData_right = res.data2;
        })
        .catch((err) => {});
    },
  },
  created() {
    if (this.power.indexOf("m-10") != -1) {
      // ?存在
      this.getTj(true);
    } else {
      this.getTj(false);
    }
  },
};
</script>

<style scoped>
.contain {
  padding: 15px;
}
.title {
  width: 100%;
  text-align: center;
  margin: 5px 0;
  color: #0064ff;
  font-size: 18px;
}
</style>
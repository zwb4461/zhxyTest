<template>
  <div class="contain">
    <div class="btn_contain">
      <el-button type="success" @click="toWeek(-1)" style="btn">上周</el-button>
      <el-button
        type="warning"
        style="background-color: #ff7100"
        @click="toWeek(0)"
        >本周</el-button
      >
      <el-button type="primary" @click="toWeek(1)">下周</el-button>
    </div>
    <div style="margin-top: 10px; padding: 10px">
      <span style="font-weight: bold"
        >执行课表:{{ classData[7] == 1 ? "单双周课表" : "单周课表" }}</span
      >
      <span
        v-if="classData[7] == 1"
        style="font-weight: bold; margin-left: 15px"
        >起始课表日期:{{ classData[8] }}</span
      >
    </div>
    <div class="table">
      <div style="width: 95%">
        <el-table
          :header-cell-style="{ 'background-color': '#e6e6e6' }"
          border
          size="mini"
          :data="item.showsjs"
          style="width: 100%; margin-top: 15px"
          v-for="(item, index) in tableData"
          :key="index"
        >
          <el-table-column prop="sxw" label="时段" width="50px">
            <template slot-scope="scope">
              <div v-if="scope.row">
                {{
                  scope.row.sxw == 0 ? "上午" : scope.row.sxw == 1 ? "下午" : ""
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="stanza" label="课次" width="80px">
          </el-table-column>
          <el-table-column
            prop="subjectName"
            :label="item.weekName + classData[index]"
          >
            <template slot-scope="scope">
              <div class="subjectName_contain">
                <span class="dk" v-if="scope.row.type == 0"> 代 </span>
                <span class="tk" v-else-if="scope.row.type == 1"> 调 </span>
                <span :class="scope.row.isbc == 1 ? 'bc' : ''">
                  {{ scope.row.subjectName }}
                </span>
                <div
                  v-show="scope.row.type != null"
                  :class="
                    scope.row.isbh == 1
                      ? 'teacherNameBh'
                      : scope.row.isbh == 0
                      ? 'teacherName'
                      : ''
                  "
                >
                  <span> {{ scope.row.teacherName }} </span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import main from "~/api/dtk";
export default {
  computed: {
    //用户id
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    userName() {
      return this.$store.state.auth.userInfo.name;
    },
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  watch: {
    schoolId(val) {
      console.log(val, "---");
      this.getTable(0);
    },
  },
  data() {
    return {
      tableData: [],
      classData: [],
      ind: 0,
    };
  },
  methods: {
    getTable(num) {
      let val = {
        schoolId: this.schoolId,
        unionid: this.unionid,
        index: num,
      };
      main
        .selectMobileStanza(val)
        .then((res) => {
          console.log(res.data, "res.data");
          this.tableData = res.data;
          this.classData = res.data2;
        })
        .catch((err) => {});
    },
    toWeek(num) {
      switch (num) {
        case -1:
          this.ind--;
          break;
        case 0:
          this.ind = 0;
          break;
        case 1:
          this.ind++;
          break;
      }
      this.getTable(this.ind);
    },
  },
  created() {
    this.getTable(0);
  },
};
</script>

<style scoped>
.teacherNameBh {
  width: 65px;
  height: 25px;
  margin-left: 5px;
  background-color: #c8c8c8;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-radius: 5px;
}
.teacherName {
  width: 65px;
  height: 25px;
  margin-left: 5px;
  background-color: #298cf7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-radius: 5px;
}
.subjectName_contain {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.dk {
  margin-right: 5px;
  width: 30px;
  height: 25px;
  background-color: #298cf7;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.tk {
  margin-right: 5px;
  width: 30px;
  height: 25px;
  background-color: #be4fff;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.contain {
  padding: 10px 0;
}
.table {
  width: 100%;
  display: flex;
  justify-content: center;
}
.btn_contain {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.bc {
  color: #ff8d39;
}
</style>
<template>
  <div>
    <div class="btn">
      <el-button icon="el-icon-caret-left" type="success" @click="switchKb(0)"
        >上周</el-button
      >
      <el-button type="info" @click="switchKb(2)">本周</el-button>
      <el-button type="primary" @click="switchKb(1)"
        >下周<i class="el-icon-caret-right el-icon--right"></i
      ></el-button>
      <span style="font-weight: bold; margin-left: 15px"
        >执行课表:{{ dataTime[7] == 1 ? "单双周课表" : "单周课表" }}</span
      >
      <span v-if="dataTime[7] == 1" style="font-weight: bold; margin-left: 15px"
        >起始课表日期:{{ dataTime[8] }}</span
      >
    </div>
    <el-table
      :data="tableData"
      border
      size="small"
      style="width: 100%; margin-top: 20px"
      :span-method="objectSpanMethod"
    >
      <!-- 1变灰 -->
      <el-table-column prop="time" width="100"></el-table-column>
      <el-table-column prop="px" width="100"></el-table-column>
      <el-table-column prop="one" :label="'星期一(' + dataTime[0] + ')'">
        <template slot-scope="scope">
          <div>
            <span :class="scope.row.one[4] == 1 ? 'cheng' : ''">
              {{ scope.row.one[0] }}</span
            >
            <div class="dis">
              <div
                style="margin-right: 10px"
                :class="
                  scope.row.one[1] == '代课'
                    ? 'dk'
                    : scope.row.one[1] == '调课'
                    ? 'tk'
                    : ''
                "
              >
                <span>{{ scope.row.one[1] }}</span>
              </div>
              <div
                :class="
                  scope.row.one[2] == '1'
                    ? 'bh'
                    : scope.row.one[2] == '0'
                    ? 'bl'
                    : ''
                "
              >
                {{ scope.row.one[3] }}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="two" :label="'星期二(' + dataTime[1] + ')'">
        <template slot-scope="scope">
          <div>
            <span :class="scope.row.two[4] == 1 ? 'cheng' : ''">
              {{ scope.row.two[0] }}</span
            >
            <div class="dis">
              <div
                style="margin-right: 10px"
                :class="
                  scope.row.two[1] == '代课'
                    ? 'dk'
                    : scope.row.two[1] == '调课'
                    ? 'tk'
                    : ''
                "
              >
                <span>{{ scope.row.two[1] }}</span>
              </div>
              <div
                :class="
                  scope.row.two[2] == '1'
                    ? 'bh'
                    : scope.row.two[2] == '0'
                    ? 'bl'
                    : ''
                "
              >
                {{ scope.row.two[3] }}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="three" :label="'星期三(' + dataTime[2] + ')'">
        <template slot-scope="scope">
          <div>
            <span :class="scope.row.three[4] == 1 ? 'cheng' : ''">
              {{ scope.row.three[0] }}</span
            >
            <div class="dis">
              <div
                style="margin-right: 10px"
                :class="
                  scope.row.three[1] == '代课'
                    ? 'dk'
                    : scope.row.three[1] == '调课'
                    ? 'tk'
                    : ''
                "
              >
                <span>{{ scope.row.three[1] }}</span>
              </div>
              <div
                :class="
                  scope.row.three[2] == '1'
                    ? 'bh'
                    : scope.row.three[2] == '0'
                    ? 'bl'
                    : ''
                "
              >
                {{ scope.row.three[3] }}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="four" :label="'星期四(' + dataTime[3] + ')'">
        <template slot-scope="scope">
          <div>
            <span :class="scope.row.four[4] == 1 ? 'cheng' : ''">
              {{ scope.row.four[0] }}</span
            >
            <div class="dis">
              <div
                style="margin-right: 10px"
                :class="
                  scope.row.four[1] == '代课'
                    ? 'dk'
                    : scope.row.four[1] == '调课'
                    ? 'tk'
                    : ''
                "
              >
                <span>{{ scope.row.four[1] }}</span>
              </div>
              <div
                :class="
                  scope.row.four[2] == '1'
                    ? 'bh'
                    : scope.row.four[2] == '0'
                    ? 'bl'
                    : ''
                "
              >
                {{ scope.row.four[3] }}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="five" :label="'星期五(' + dataTime[4] + ')'">
        <template slot-scope="scope">
          <div>
            <span :class="scope.row.five[4] == 1 ? 'cheng' : ''">
              {{ scope.row.five[0] }}</span
            >
            <div class="dis">
              <div
                style="margin-right: 10px"
                :class="
                  scope.row.five[1] == '代课'
                    ? 'dk'
                    : scope.row.five[1] == '调课'
                    ? 'tk'
                    : ''
                "
              >
                <span>{{ scope.row.five[1] }}</span>
              </div>
              <div
                :class="
                  scope.row.five[2] == '1'
                    ? 'bh'
                    : scope.row.five[2] == '0'
                    ? 'bl'
                    : ''
                "
              >
                {{ scope.row.five[3] }}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import main from "~/api/courseManagement";
import main1 from "~/api/dtk";
export default {
  props: {
    dtkId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
  },
  data() {
    return {
      dataTime: [],
      tableData: [
        { time: "上午", one: "", two: "", three: "", four: "", five: "" },
        { one: "", two: "", three: "", four: "", five: "" },
        { one: "", two: "", three: "", four: "", five: "" },
        { time: "下午", one: "", two: "", three: "", four: "", five: "" },
        { one: "", two: "", three: "", four: "", five: "" },
        { one: "", two: "", three: "", four: "", five: "" },
        { one: "", two: "", three: "", four: "", five: "" },
      ],
      ind: 0,
    };
  },
  methods: {
    //!查询自定义课程并拼接
    csOpt() {
      main1
        .selectSetTake({ cjlbId: this.dtkId })
        .then((res) => {
          let arr = [];
          arr = res.data.changeTakes.filter((item) => {
            return item.type == 0;
          });

          arr.map((item) => {
            this.tableData.push({
              ind: item.name,
              one: ["", "", "", ""],
              two: ["", "", "", ""],
              three: ["", "", "", ""],
              four: ["", "", "", ""],
              five: ["", "", "", ""],
            });
          });
        })
        .catch((err) => {});
    },
    //!切换周
    switchKb(val) {
      if (val == 0) {
        this.ind--;
      } else if (val == 2) {
        this.ind = 0;
      } else {
        this.ind++;
      }
      this.getTable();
    },
    //!合并表格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0 && rowIndex < 6) {
          return [3, 1];
        } else if (rowIndex < 6) {
          return [0, 0];
        }
      }
    },
    getTable() {
      main
        .seeOwnerHour({
          schoolId: this.schoolId,
          unionid: this.unionid,
          index: this.ind,
        })
        .then((res) => {
          this.tableData = res.data;
          this.dataTime = res.data2;
          this.tableData = this.tableData.map((item, index) => {
            item.ind = index + 1;
            return item;
          });
          //   this.csOpt();
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getTable();
  },
};
</script>

<style lang="scss" scoped>
.tk {
  width: 30px;
  height: 24px;
  background-color: #be4fff;
  text-align: center;
  line-height: 24px;
  color: #ffffff;
  border-radius: 5px;
}
.dk {
  width: 30px;
  height: 24px;
  background-color: #298cf7;
  text-align: center;
  line-height: 24px;
  color: #ffffff;
  border-radius: 5px;
}
.bh {
  width: 100px;
  height: 24px;
  background-color: #c8c8c8;
  text-align: center;
  line-height: 24px;
  border-radius: 5px;
  color: #ffffff;
}
.bl {
  width: 100px;
  height: 24px;
  background-color: #298cf7;
  text-align: center;
  line-height: 24px;
  border-radius: 5px;
  color: #ffffff;
}
.dis {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.btn {
  width: 55%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.cheng {
  color: #ff8b2f;
}
</style>

<template>
  <div class="contain">
    <div class="topBtn">
      <van-button
        size="small"
        type="info"
        style="width: 70%; height: 40px"
        @click="add"
        >+新增</van-button
      >
    </div>
    <div class="item_contain" v-for="(item, index) in tableData" :key="index">
      <div class="topTitle">
        <span :class="item.type == 1 ? 'tk1' : item.type == 0 ? 'dk1' : ''">
          {{ item.type == 1 ? "调课" : item.type == 0 ? "代课" : "" }}</span
        >
        <span class="marginL">{{ item.date }}</span>
        <span class="marginL">({{ item.weekName }})</span>
        <span class="marginL">{{ item.className }}</span>
        <span class="marginL">{{ item.stanza }}</span>
      </div>
      <div class="table">
        <!-- 0：申请中，1：待审核，2：审核通过，3：审核未通过，4：自动通过 -->

        <div style="width: 95%">
          <el-table
            border
            :data="[...item]"
            style="width: 100%"
            size="mini"
            @row-click="toEdit"
          >
            <el-table-column prop="oldxkname" label="原授学科">
            </el-table-column>
            <el-table-column prop="oldTeaname" label="原授课人">
            </el-table-column>
            <el-table-column prop="xkname" label="现授学科"> </el-table-column>
            <el-table-column prop="teaname" label="现授课人"> </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <div>
                  <el-tag v-show="scope.row.status == 0" type="warning"
                    >申请中</el-tag
                  >
                  <el-tag v-show="scope.row.status == 1">待审核</el-tag>
                  <el-tag type="success" v-show="scope.row.status == 2"
                    >审核通过</el-tag
                  >
                  <el-tag type="danger" v-show="scope.row.status == 3"
                    >审核未通过</el-tag
                  >
                  <el-tag type="success" v-show="scope.row.status == 4"
                    >自动通过</el-tag
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import main from "~/api/dtk";
import main1 from "~/api/scoreEntry";
import main2 from "~/api/baoxiuCs";
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
    schoolId() {
      this.getXq();
    },
  },
  data() {
    return {
      tableData: [],
      cjlbId: "",
    };
  },
  methods: {
    //!点击行跳转编辑
    toEdit(row, column, event) {
      console.log(row);
      row.have = 1; //?判断是跳转过去编辑
      this.$router.push({
        path: "/phone/dtk/components/addDtk",
        query: row,
      });
    },
    //!跳转新增代调课
    add() {
      this.$router.push("/phone/dtk/components/addDtk");
    },
    getTable() {
      let val = {
        cjlbId: this.cjlbId,
        pageNum: 1,
        pageSize: 10000,
        unionid: this.unionid,
        schoolId: this.schoolId,
        cjlbId: this.cjlbId,
        isowner: 1,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list;
        })
        .catch((err) => {});
    },
    //!获取当前学期
    getXq() {
      main2
        .seeMobileScore({ schoolId: this.schoolId })
        .then((res) => {
          //   this.xqName = res.data.name;
          this.cjlbId = res.data.id;
          this.getTable();
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getXq();
  },
};
</script>

<style scoped>
.topBtn {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item_contain {
  width: 100%;

  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.topTitle {
  width: 100%;
  padding-left: 2.5%;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
}
.tk1 {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 25px;
  color: #ffffff;
  background-color: #be4fff;
}
.dk1 {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 25px;
  color: #ffffff;
  background-color: #298cf7;
}
.marginL {
  margin-left: 5px;
}
.table {
  width: 100%;
  display: flex;
  justify-content: center;
}
.contain {
  padding: 10px 0;
}
</style>
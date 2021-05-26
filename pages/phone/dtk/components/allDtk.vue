<template>
  <div class="contain">
    <!-- <div class="btn">
      <van-button type="warning" size="normal">代调审核</van-button>
      <van-button type="primary" size="normal" @click="toTj"
        >代调课统计</van-button
      >
    </div> -->
    <!-- <div class="item_contain" v-for="(item, index) in tableData" :key="index">
      <div class="topTitle">
        <span class="marginL">{{ item.name }}</span>
      </div>
      <div class="table">
        <div style="width: 95%">
          <el-table border :data="item.data" style="width: 100%" size="mini">
            <el-table-column prop="className" label="班级"> </el-table-column>
            <el-table-column prop="stanza" label="课次"> </el-table-column>
            <el-table-column prop="oldxkname" label="原学科"> </el-table-column>
            <el-table-column prop="oldTeaname" label="原授课">
            </el-table-column>
            <el-table-column prop="oldTeaname" label="代调">
              <template slot-scope="scope">
                <div>
                  <el-tag effect="dark" v-if="scope.row.type == 0">代</el-tag>
                  <el-tag
                    effect="dark"
                    style="background-color: #be4fff; border: 1px solid #be4fff"
                    v-else-if="scope.row.type == 1"
                    >调</el-tag
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xkname" label="现授学科"> </el-table-column>
            <el-table-column prop="teaname" label="现授课人"> </el-table-column>
          </el-table>
        </div>
      </div>
    </div> -->
    <el-card
      class="item_contain"
      v-for="(item, index) in tableData"
      :key="index"
    >
      <div class="one_contain">
        <div class="one">
          <div class="one_span" style="width: 100%">
            <span style="margin-right: 10px"
              >{{ item.date }}({{ item.weekName }})</span
            >
            <span>{{ item.className }} {{ item.stanza }}</span>
          </div>
        </div>
        <div class="two">
          <div class="two_span">
            <span>{{ item.oldxkname }}</span>
            <span style="font-size: 18px; color: #0064ff">{{
              item.oldTeaname
            }}</span>
          </div>
          <div class="two_span" style="width: 20%">
            <img v-if="item.type == 0" src="../../../../assets/img/dk.png" />
            <img v-else src="../../../../assets/img/tk.png" />
          </div>
          <div class="two_span">
            <span v-show="item.teaname">{{ item.xkname }}</span>
            <span style="font-size: 18px; color: #0064ff">{{
              item.teaname
            }}</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import main from "~/api/dtk";
import main1 from "~/api/scoreEntry";
import main2 from "~/api/baoxiuCs";
export default {
  props: {
    ind: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    //用户id
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    toTj() {
      this.$router.push("/phone/dtk/components/tj");
    },
    getTable(ind) {
      let val = {
        cjlbId: this.cjlbId,
        unionid: this.unionid,
        isowner: 3,
        index: ind,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list;
        })
        .catch((err) => {});
    },
    //!获取当前学期
    getXq(ind) {
      main2
        .seeMobileScore({ schoolId: this.schoolId })
        .then((res) => {
          //   this.xqName = res.data.name;
          this.cjlbId = res.data.id;
          this.getTable(ind);
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getXq(this.ind);
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
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  padding-left: 2.5%;
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
.btn {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.contain {
  padding: 15px;
}
.item_contain {
  height: 120px;
  width: 100%;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.one_contain {
  width: 100%;
  height: 50px;
  padding: 10px;
}
.one {
  width: 100%;
  height: 100%;
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
/deep/.el-card__body {
  padding: 0;
}
.one_span {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.status {
  width: 70px;
  height: 30px;
  border-radius: 20px;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
}
.two {
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.two_span {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.bottomEdit {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 0.5px solid #bbbbbb;
}
.bottomEditLeft {
  width: 50%;
  text-align: center;
  font-size: 14px;
}
.line {
  height: 90%;
  border-left: 1px solid #bbbbbb;
  width: 1px;
}
/deep/.el-card.is-always-shadow,
/deep/.el-card.is-hover-shadow:focus,
/deep/.el-card.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 30%);
}
</style>
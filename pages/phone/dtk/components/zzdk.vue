<template>
  <div class="contain">
    <div v-show="isList">
      <el-card
        class="item_contain"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <div class="one_contain">
          <div class="one">
            <div class="one_span"></div>
            <div class="one_span" style="width: 50%">
              <span>{{ item.date }}({{ item.weekName }})</span>
              <span>{{ item.className }} {{ item.stanza }}</span>
            </div>
            <div class="one_span"></div>
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
            <div class="two_span" @click="toApply(item)">
              <div class="apply">申请</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <ApplyDetail v-show="!isList" :infoList="form" ref="applyDe" />
  </div>
</template>

<script>
import main from "~/api/dtk";
import main1 from "~/api/scoreEntry";
import main2 from "~/api/baoxiuCs";
import ApplyDetail from "./applyDetail";
export default {
  computed: {
    //用户id
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    username() {
      return this.$store.state.auth.userInfo.name;
    },
    schoolId() {
      return this.$store.state.auth.userInfo.schoolId;
    },
  },
  components: {
    ApplyDetail,
  },
  watch: {
    schoolId() {
      this.getXq();
    },
  },
  data() {
    return {
      tableData: [],
      isList: true,
      form: {},
    };
  },

  methods: {
    show() {
      this.isList = true;
    },
    toApply(item) {
      this.isList = false;
      console.log(item);
      this.form = item;
      this.form.teaname = this.username;
      setTimeout(this.$refs.applyDe.getHl("授课人", 2, item), 2000);
      //   this.$router.push({
      //     path: "/phone/dtk/components/applyDetail",
      //     query: item,
      //   });
    },
    getTable() {
      let val = {
        cjlbId: this.cjlbId,
        pageNum: 1,
        pageSize: 10000,
        unionid: this.unionid,
        isowner: 2,
        isowner: 2,
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
.contain {
  padding: 15px;
}
.item_contain {
  height: 140px;
  width: 100%;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.one_contain {
  width: 100%;
  height: 70px;
  padding: 10px;
}
.one {
  width: 100%;
  height: 100%;
  border: 2px solid #bbbbbb;
  background-color: #ececec;
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
  flex-direction: column;
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
.apply {
  width: 50px;
  height: 50px;
  background-color: #ff7100;
  color: #ffffff;
  border-radius: 10px;
  text-align: center;
  line-height: 50px;
}
/deep/.el-card.is-always-shadow,
/deep/.el-card.is-hover-shadow:focus,
/deep/.el-card.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 30%);
}
</style>
<template>
  <div class="contain">
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
          <div class="one_span">
            <div
              class="status"
              style="background-color: #ff7100"
              v-if="item.status == 0"
            >
              申请中
            </div>
            <div
              class="status"
              style="background-color: #1890ff"
              v-else-if="item.status == 1"
            >
              待审核
            </div>
            <div
              class="status"
              style="background-color: #28a600"
              v-else-if="item.status == 2"
            >
              审核通过
            </div>
            <div
              class="status"
              style="background-color: #28a600"
              v-else-if="item.status == 4"
            >
              自动通过
            </div>
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
        <!-- v-show="item.status == 0 || item.status == 1 || item.status == 3" -->
        <div class="bottomEdit">
          <div class="bottomEditLeft" @click="toEdit(item)">
            <span style="color: #0064ff">修改</span>
          </div>
          <div class="line"></div>
          <div class="bottomEditLeft" @click.stop="del(item)">
            <span style="color: #f00b0b">删除</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import main from "~/api/dtk";
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
  data() {
    return { tableData: [], cjlbId: "" };
  },
  methods: {
    toEdit(item) {
      if (item.status == 0 || item.status == 1 || item.status == 3) {
      } else {
        return;
      }
      console.log(item);
      this.$store.commit("auth/setEditContent", item);
      this.$store.commit("auth/setBxActiveOne", 2);
    },
    del(item) {
      if (item.status == 0 || item.status == 1 || item.status == 3) {
      } else {
        return;
      }
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .del({ id: item.id })
            .then((res) => {
              this.$message.success("删除成功!");
              this.getXq();
            })
            .catch((err) => {
              Message({
                message: err,
                type: "error",
                customClass: "mzindex",
              });
            });
        },
      });
    },
    //!获取当前学期
    getXq() {
      main2
        .seeMobileScore({ schoolId: this.schoolId })
        .then((res) => {
          this.cjlbId = res.data.id;
          this.getData();
        })
        .catch((err) => {});
    },
    getData() {
      let val = {
        unionid: this.unionid,
        isowner: 1,
        cjlbId: this.cjlbId,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list;
          console.log("this.tableData", this.tableData);
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
  height: 180px;
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
/deep/.el-card.is-always-shadow,
/deep/.el-card.is-hover-shadow:focus,
/deep/.el-card.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 30%);
}
</style>
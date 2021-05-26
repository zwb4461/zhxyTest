<template>
  <div>
    <div v-if="ifShow">
      <van-tabs v-model="bxFzrActive" @click="clickTab" :sticky="true">
        <van-tab title="待处理"><deal ref="one" :status="0"></deal></van-tab>
        <van-tab title="处理中"><deal :status="1"></deal></van-tab>
        <van-tab title="已处理"><deal :status="2"></deal></van-tab>
      </van-tabs>
    </div>
    <div v-else>
      <span>暂无权限</span>
    </div>
  </div>
</template>

<script>
import deal from "./deal";
import main from "~/api/baoxiuCs";
export default {
  head() {
    return {
      title: "报修管理",
      meta: [],
    };
  },
  computed: {
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    bxFzrActive: {
      get() {
        return this.$store.state.auth.bxFzrActive;
      },
      set(v) {
        this.$store.commit("auth/setBxFzrActive", v);
      },
    },
  },
  components: {
    deal,
  },
  data() {
    return {
      ifShow: false,
    };
  },
  methods: {
    clickTab(name, title) {
      console.log(name);
      console.log(title);
      this.$store.commit("auth/setBxFzrActive", name);
    },
    getTj() {
      let val = {
        schoolId: this.schoolId,
        unionid: this.unionid,
      };
      main
        .repairTj(val)
        .then((res) => {
          if (res.data.length > 0) {
            this.ifShow = true;
            console.log("显示-有权限");
          } else {
            this.ifShow = false;
            console.log("不显示-无权限");
          }
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getTj();
  },
};
</script>

<style lang="scss" scoped>
/deep/.van-tab,
/deep/.van-tab--active,
/deep/.van-ellipsis {
  font-size: 18px;
}
</style>

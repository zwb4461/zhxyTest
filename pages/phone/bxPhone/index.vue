<template>
  <div class="contain">
    <van-tabs
      v-model="bxActive"
      @click="clickTab"
      @change="refresh"
      animated
      class="order-tabs"
      :sticky="true"
    >
      <van-tab title="申请报修"><bxApply></bxApply></van-tab>
      <van-tab title="我的报修"><deal ref="one" :status="0"></deal></van-tab>
      <van-tab title="处理报修"><fzr></fzr></van-tab>
      <van-tab title="报修统计"><bxTj></bxTj></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import bxApply from "./components/bxApply";
import bxTj from "./components/bxTj";
import deal from "./components/deal";
import fzr from "./components/fzr";
export default {
  head() {
    return {
      title: "设备报修",
      meta: [
        {
          hid: "sbbx",
          name: "description",
          content: "My sbbx description",
        },
      ],
    };
  },
  computed: {
    //学校id
    bxActive: {
      get() {
        return this.$store.state.auth.bxActive;
      },
      set(v) {
        this.$store.commit("auth/setBxActive", v);
      },
    },
  },
  components: {
    bxApply,
    deal,
    bxTj,
    fzr,
  },
  data() {
    return {};
  },
  methods: {
    clickTab(name, title) {
      console.log(name);
      console.log(title);
      this.$store.commit("auth/setBxActive", name);
      if (name == 1) {
        this.refresh();
      }
    },
    refresh() {
      this.$refs.one.getTable();
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.contain {
}
/deep/.van-tab,
/deep/.van-tab--active,
/deep/.van-ellipsis {
  font-size: 18px;
}
/deep/.van-tabs__line {
  background-color: #3b87ff;
  width: 70px !important;
}
</style>

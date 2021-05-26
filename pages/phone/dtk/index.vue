<template>
  <div>
    <van-tabs v-model="bxActive" @click="clickTab" sticky>
      <van-tab title="我的代调"><IndexOne></IndexOne></van-tab>
      <van-tab title="自主代课"><zzdk></zzdk></van-tab>
      <van-tab title="所有代调"><IndexTwo></IndexTwo></van-tab>
      <van-tab title="代调统计"><tj></tj></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import kb from "./components/kb";
import IndexOne from "./components/IndexOne";
import allDtk from "./components/allDtk";
import zzdk from "./components/zzdk";
import tj from "./components/tj";
import IndexTwo from "./components/IndexTwo";
export default {
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
    kb,
    allDtk,
    zzdk,
    tj,
    IndexOne,
    IndexTwo,
  },
  data() {
    return {};
  },
  methods: {
    clickTab(name, title) {
      this.$store.commit("auth/setDtkActive", name);
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
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

<template>
  <div>
    <van-tabs
      v-model="bxActiveOne"
      @click="clickTab"
      @change="changeTab"
      :lazy-render="false"
    >
      <van-tab title="我的课表"><kb></kb></van-tab>
      <van-tab title="我的代调"><MyDt ref="myDt"></MyDt></van-tab>
      <van-tab title="申请代调"><AddDtk ref="addDtk"></AddDtk></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import kb from "./kb";
import dtk from "./dtk";
import zzdk from "./zzdk";
import allDtk from "./allDtk";
import MyDt from "./MyDt";
import AddDtk from "./AddDtk";
export default {
  computed: {
    bxActiveOne: {
      get() {
        return this.$store.state.auth.bxActiveOne;
      },
      set(v) {
        this.$store.commit("auth/setBxActiveOne", v);
      },
    },
  },
  components: {
    kb,
    dtk,
    zzdk,
    allDtk,
    MyDt,
    AddDtk,
  },
  data() {
    return {};
  },
  methods: {
    changeTab(name) {
      console.log(name);
      if (name == 2) {
        setTimeout(this.$refs.addDtk.setForm(), 500);
      } else if (name == 1) {
        setTimeout(this.$refs.myDt.getXq(), 500);
        this.$store.commit("auth/setEditContent", {});
      } else {
        this.$store.commit("auth/setEditContent", {});
      }
    },
    clickTab(name, title) {
      if (name == 2) {
        this.$refs.addDtk.clearForm();
      }
      this.$store.commit("auth/setDtkActive", name);
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <van-tabs v-model="active" @click="clickTab" sticky :lazy-render="false">
      <van-tab title="今日代调"><allDtk :ind="0"></allDtk></van-tab>
      <van-tab title="未来代调"><allDtk :ind="1"></allDtk></van-tab>
      <van-tab title="历史代调"><allDtk :ind="-1"></allDtk></van-tab>
      <van-tab title="代调审核" v-if="shPower"><dtsh ref="sh" /></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import allDtk from "./allDtk";
import dtsh from "./dtsh";
export default {
  computed: {
    power() {
      return this.$store.state.layout.power;
    },
  },
  components: {
    allDtk,
    dtsh,
  },
  data() {
    return {
      active: 0,
      shPower: false,
    };
  },
  methods: {
    clickTab(name) {
      if (name == 3) {
        // console.log(this.$refs.sh);
        this.$refs.sh.isList = true;
        this.$refs.sh.getXq();
      }
    },
    checkPower() {
      console.log(this.power, "power");
      if (this.power.indexOf("m-9") > -1) {
        console.log("有权限");
        this.shPower = true;
      } else {
        this.shPower = false;
        console.log("无权限");
      }
    },
  },
  created() {
    this.checkPower();
  },
};
</script>

<style scoped>
</style>
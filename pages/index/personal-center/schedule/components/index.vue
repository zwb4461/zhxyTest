<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane lazy label="我的课表" name="first"
        ><myClass :dtkId="dtkId"></myClass
      ></el-tab-pane>
      <el-tab-pane lazy label="代调课" name="second"
        ><dtk :dtkId="dtkId"></dtk
      ></el-tab-pane>
      <el-tab-pane lazy label="自主代课" name="third"
        ><zzdk :dtkId="dtkId"></zzdk
      ></el-tab-pane>
      <el-tab-pane lazy label="所有代调课" name="fourth"
        ><allDtk :dtkId="dtkId"></allDtk
      ></el-tab-pane>
      <el-tab-pane lazy v-if="seeTj == 1" label="代调课统计" name="five"
        ><tj :dtkId="dtkId"></tj
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import myClass from "./myClass";
import dtk from "./dtk";
import tj from "./tj";
import zzdk from "./zzdk";
import allDtk from "./allDtk";
import main from "~/api/dtk";
export default {
  props: {
    dtkId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  components: {
    myClass,
    dtk,
    tj,
    zzdk,
    allDtk,
  },
  data() {
    return { activeName: "first", seeTj: 0 };
  },
  methods: {
    ifTj() {
      let val = {
        cjlbId: this.dtkId,
        schoolId: this.schoolId,
      };
      main
        .selectSetTake(val)
        .then((res) => {
          this.seeTj = res.data.syjscktj;
          console.log(this.seeTj, "this.seeTj-------");
        })
        .catch((err) => {});
    },
  },
  created() {
    this.ifTj();
  },
};
</script>

<style scoped>
</style>
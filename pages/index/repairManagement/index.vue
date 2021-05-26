<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="报修管理" name="first"
        ><bxManage></bxManage
      ></el-tab-pane>
      <el-tab-pane label="报修统计" name="second"><bxTj></bxTj></el-tab-pane>
      <el-tab-pane label="参数设置" name="third"><csOpt></csOpt></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import bxManage from "./components/bxManage";
import bxTj from "./components/bxTj";
import csOpt from "./components/csOpt";
export default {
  components: {
    bxManage,
    bxTj,
    csOpt,
  },
  data() {
    return {
      activeName: "first",
    };
  },
};
</script>

<style scoped>
</style>
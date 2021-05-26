<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="1" :lazy="true"
        ><jbInfo :unionid1="unionid"></jbInfo>
      </el-tab-pane>
      <el-tab-pane label="荣誉信息" name="2" :lazy="true"
        ><ryInfo :unionid1="unionid"></ryInfo
      ></el-tab-pane>
      <el-tab-pane label="业务信息" name="3" :lazy="true"
        ><ywInfo :unionid1="unionid"></ywInfo
      ></el-tab-pane>
      <el-tab-pane label="指导学生" name="4" :lazy="true"
        ><zdInfo :unionid1="unionid"></zdInfo
      ></el-tab-pane>
      <el-tab-pane label="岗位信息" name="5" :lazy="true"
        ><gwInfo :unionid1="unionid"></gwInfo
      ></el-tab-pane>
      <el-tab-pane label="交流信息" name="6" :lazy="true"
        ><jlInfo :unionid1="unionid"></jlInfo
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import jbInfo from "../../baseInformation";
import ryInfo from "../../ryInformation";
import ywInfo from "../../ywInformation";
import zdInfo from "../../zdInformation";
import gwInfo from "../../gwInformation";
import jlInfo from "../../jlInformation";
export default {
  components: { jbInfo, ryInfo, ywInfo, zdInfo, gwInfo, jlInfo },
  props: {},

  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
  },
  data() {
    return {
      activeName: "1",
    };
  },
  methods: {},
  created() {},
};
</script>

<style scoped>
</style>
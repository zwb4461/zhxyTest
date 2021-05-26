<template>
  <div>
    <a-tabs size="small" @change="callback">
      <a-tab-pane tab="课时设置" key="1">
        <classHour :classweekId="classweekId" />
      </a-tab-pane>
      <a-tab-pane tab="科目节数" key="2">
        <sectionsNum :classweekId="classweekId" />
      </a-tab-pane>
      <a-tab-pane tab="教师任课" key="3">
        <teachersTeach :classweekId="classweekId" />
      </a-tab-pane>
      <a-tab-pane tab="条件设置" key="4">
        <conditionSetting :classweekId="classweekId" />
      </a-tab-pane>
      <a-tab-pane tab="智能排课" key="5">
        <intelligentCourse :classweekId="classweekId" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
//接口
import freshmenReport from "~/api/freshmenReport"; //学生类型

//组件
import classHour from "./classHour/"; //课时设置
import conditionSetting from "./conditionSetting/"; //条件设置
import intelligentCourse from "./intelligentCourse/"; //智能排课
import sectionsNum from "./sectionsNum/"; //科目节数
import teachersTeach from "./teachersTeach/"; //教师任课
export default {
  components: {
    classHour, //计划新生
    conditionSetting, //报名新生
    intelligentCourse, //审核设置
    sectionsNum, //表单设置
    teachersTeach,
  },
  props: ["classweekId"],
  computed: {},
  data() {
    return {
      active: "1",
    };
  },
  watch: {},
  methods: {
    setActiing() {},
    callback(key) {
      this.active = key;
    },
  },
  created() {
    console.log("排课的id:", this.classweekId);
  },
};
</script>

<style lang="scss" scoped></style>

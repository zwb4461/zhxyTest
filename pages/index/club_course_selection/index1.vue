<template>
  <div>
    <a-tabs size="small" defaultActiveKey="1">
      <a-tab-pane tab="课程管理" key="1">
        <course-management :cjlbId="cjlbId"/>
      </a-tab-pane>
      <a-tab-pane tab="报名设置" key="2">
        <registration :cjlbId="cjlbId"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
//组件
import courseManagement from "./courseManagement/"; //计划新生日志
import registration from "./registration/"; //报名新生日志

export default {
  components: {
    courseManagement, //计划新生
    registration //报名新生
  },
  props: {
    cjlbId: {
      type: Number,
      default: -1
    },
    title: String
  },
  data() {
    return {
      activeVal: 1
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.switch {
  width: 450px;
}
</style>

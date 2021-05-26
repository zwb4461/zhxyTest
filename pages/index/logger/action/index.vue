<template>
  <div>
    <a-tabs size="small" defaultActiveKey="2" @change="callback">
      <a-tab-pane tab="计划新生" key="1">
        <planStudent />
      </a-tab-pane>
      <a-tab-pane tab="报名新生" key="2" forceRender>
        <reportStudent />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
//组件
import planStudent from "./planStudent/"; //计划新生日志
import reportStudent from "./reportStudent/"; //报名新生日志

export default {
  components: {
    planStudent, //计划新生
    reportStudent //报名新生
  },
  props: {
    enrollId: {
      type: Number,
      default: -1
    },
    title: String
  },
  data() {
    return {};
  },
  methods: {
    callback(key) {
      this.$nextTick(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.switch {
  width: 450px;
}
</style>
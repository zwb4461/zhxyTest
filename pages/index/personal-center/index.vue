<template>
  <div>
    <a-tabs size="small" @click="callback">
      <a-tab-pane tab="我的信息" key="1" forceRender>
        <infoFile />
      </a-tab-pane>
      <a-tab-pane tab="我的班级" key="2" forceRender>
        <calssFile />
      </a-tab-pane>
      <a-tab-pane tab="我的排课" key="3" forceRender>
        <schedule />
      </a-tab-pane>
      <a-tab-pane tab="我的社团课" key="4" forceRender>
        <community />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import calssFile from "./class";
import infoFile from "./info";
import community from "./community";
import schedule from "./schedule";
export default {
  components: {
    calssFile,
    infoFile,
    community,
    schedule
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

<template>
  <a-layout-content :style="boxStyle">
    <div :style="{ padding: '10px', background: '#fff', minHeight: '88vh'}">
      <nuxt-child />
    </div>
  </a-layout-content>
</template>

<script>
import setting from "~/utils/settings";

export default {
  name: "mainContent",
  data() {
    return {
      setting: {
        style: ""
      }
    };
  },
  computed: {
    boxStyle() {
      return {
        marginTop: setting.isheard ? "90px" : "40px",
        // transition: this.$store.state.layout.transition,
        marginLeft: this.$store.state.layout.contentLeft
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
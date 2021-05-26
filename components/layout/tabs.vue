
<template>
  <div :style="boxStyle">
      <TagsView />
  </div>
</template>

<script>
import setting from "~/utils/settings";

import TagsView from './TagsView/index'
export default {
  name: "myTabs", //tab组件
  components: {
      TagsView,
  },
  computed: {
    boxStyle() {
      return {
        position: "fixed",
        zIndex: 1,
        top: setting.isheard?"50px":"0px",
        left: this.$store.state.layout.heardLeft,
        right: "0px",
        height:'30px',
        backgroundColor:'#fff',
        transition: this.$store.state.layout.transition,
        borderBottom: '1px solid rgb(230, 227, 227)'
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.test{
    border-bottom: 1px solid rgb(230, 227, 227);
}
</style>
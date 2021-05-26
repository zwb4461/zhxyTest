<template>
  <div>
    <a-layout-footer
      :style="boxStyle"
    >{{this.$store.state.FOOTER_NAME}}</a-layout-footer>
  </div>
</template>

<script>
export default {
  name: "mainFooter",
  computed: {
    boxStyle() {
      return {
        textAlign: 'center',
        // marginTop: "70px",
        transition: this.$store.state.layout.transition,
        marginLeft: this.$store.state.layout.heardLeft
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
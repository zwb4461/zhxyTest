<template>
  <a-result status="success" :title="title">
    <!-- <template v-slot:extra>
      <a-button type="primary" key="console">Go Console</a-button>
      <a-button key="buy">Buy Again</a-button>
    </template>-->
  </a-result>
</template>
<script>
export default {
  data() {
    return {
      title: "报名成功"
    };
  },
  created() {
    let type = this.$route.query.type;
    // console.log(type);
    if (type == 1) {
      this.title = "报名成功";
    } else if (type == 2) {
      this.title = "修改成功";
    }
  }
};
</script>

<template>
  <div><GradePrint :cjlbId="cjlbId"></GradePrint></div>
</template>

<script>
import GradePrint from "../../gradeManagement/components/cjdPrint";
export default {
  props: {
    cjlbId: {
      type: Number,
      default: 0,
    },
  },
  components: {
    GradePrint,
  },
};
</script>

<style scoped>
</style>
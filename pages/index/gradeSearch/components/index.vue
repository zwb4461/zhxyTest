<template>
  <div><GradeSearch :cjlbId="cjlbId"></GradeSearch></div>
</template>

<script>
import GradeSearch from "../../gradeManagement/components/gradeSearch";
export default {
  props: {
    cjlbId: {
      type: Number,
      default: 0,
    },
  },
  components: {
    GradeSearch,
  },
};
</script>

<style scoped>
</style>
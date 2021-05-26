<template>
  <div class="main">
    <a-layout id="components-layout-demo-responsive">
      <main-left />
      <a-layout>
        <main-heard />
        <main-content />
        <!-- <mainFooter /> -->
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import mainLeft from "~/components/layout/left";
import mainHeard from "~/components/layout/heard";
import mainContent from "~/components/layout/content";
import mainFooter from "~/components/layout/footer";
export default {
  components: {
    mainLeft,
    mainHeard,
    mainContent,
    mainFooter
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  width: 100%;
}
</style>

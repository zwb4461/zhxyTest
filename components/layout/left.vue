<template>
  <div>
    <a-layout-sider
      breakpoint="xs"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
      collapsible
      width="150"
      collapsedWidth="64"
      v-model="collapsed"
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        transition: this.$store.state.layout.transition,
      }"
    >
      <Logo />
      <my-menu class="menuText" />
    </a-layout-sider>
  </div>
</template>

<script>
import Logo from "./logo";
import myMenu from "./myMenu";
export default {
  name: "mainLeft",
  components: {
    Logo,
    myMenu,
  },
  data() {
    return {
      collapsedWidth: 10,
    };
  },
  computed: {
    collapsed: {
      get() {
        return this.$store.state.layout.collapsed;
      },
      set() {},
    },
  },
  methods: {
    onCollapse(collapsed, type) {
      // // console.log(collapsed, type);
      if (collapsed) {
        this.$store.dispatch("layout/close");
      } else {
        this.$store.dispatch("layout/open");
      }

      if (type === "responsive") {
        this.$store.dispatch("layout/changeAuthInfo", !collapsed);
      }
    },
    onBreakpoint(broken) {
      // // console.log(broken);
      if (broken) {
        this.$store.dispatch("layout/close");
      } else {
        this.$store.dispatch("layout/open");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.ant-layout-sider-zero-width-trigger {
  position: fixed;
  right: 0px;
  top: 20vh;
}

/deep/ .ant-menu-sub {
  .ant-menu-item {
    padding-left: 33px !important;
  }
}
/deep/ .ant-layout-sider-trigger,
.ant-layout-sider {
  //   overflow-x: hidden !important;
  //   overflow-y: hidden !important;
  background: #fafafa;
}
// /deep/.ant-menu-item{
//     padding-left: 6px !important;
// }
.menuText {
  text-align: center;
  position: relative;
  width: 150px !important;
  right: 10px;
}

/deep/ .ant-menu-item-selected {
  color: black;
  font-weight: bolder;
}
/deep/ .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background: none;
}
/deep/ .ant-menu {
  background: none;
}
</style>

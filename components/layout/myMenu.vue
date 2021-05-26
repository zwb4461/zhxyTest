<template>
  <div>
    <a-menu
      v-model="selectKey"
      mode="inline"
      theme="light"
      @select="toRouter"
      :style="{ transition: this.$store.state.layout.transition }"
    >
      <template v-for="item in list">
        <template v-if="!item.hide">
          <a-menu-item
            :style="meunItemStyle"
            v-if="!item.children"
            :key="item.key"
          >
            <template v-if="item.icon">
              <a-icon :type="item.icon" />
            </template>
            <span>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :menu-info="item" :key="item.key" />
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./mySubMenu";

export default {
  components: {
    "sub-menu": SubMenu,
  },
  computed: {
    list() {
      return this.$store.state.layout.menuList;
    },
    meunItemStyle() {
      if (this.$store.state.layout.collapsed) {
        return {
          paddingLeft: "0px",
        };
      } else {
        return {
          paddingLeft: "6px",
        };
      }
    },
  },
  data() {
    return {
      selectKey: [],
    };
  },
  watch: {
    $route() {
      // // console.log("this.$route-----------", this.$route);
      this.setSeleteKey();
    },
  },
  methods: {
    setSeleteKey() {
      let str = this.$route.path;
      let a = str.replace("/", "");
      this.selectKey = [a];
    },
    toggleCollapsed() {
      //   this.collapsed = !this.collapsed;
    },
    toRouter(info) {
      // // console.log(info);
      this.$router.push(`/${info.key}`);
    },
  },
  created() {
    this.setSeleteKey();
  },
};
</script>
<style lang="scss"></style>

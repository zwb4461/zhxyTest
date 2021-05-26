<template>
  <div>
    <a-layout-header v-if="isheard" :style="boxStyle">
      <span @click="toggleCollapsed">
        <a-icon
          style="color:black;"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        />
      </span>
      <div v-if="isAuth" class="heardLeft">
        <a-row :gutter="[8, 8]">
          <a-col :span="6"></a-col>
          <a-col :span="6">
            <a-avatar>USER</a-avatar>
          </a-col>
          <a-col :span="12">
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                {{ name }}
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay" @click="onClick">
                <a-menu-item key="0">退出登录</a-menu-item>
              </a-menu>
            </a-dropdown>
          </a-col>
        </a-row>
      </div>
    </a-layout-header>
    <my-tabs />
  </div>
</template>

<script>
import setting from "~/utils/settings";

import myTabs from "./tabs"; //导航tab组件
export default {
  name: "mainHeard",
  components: {
    myTabs
  },
  data() {
    return {
      //   name: "",
      isheard: setting.isheard,
      setting: {
        collapsed: false
      }
    };
  },
  computed: {
    isAuth() {
      return this.$store.state.layout.authInfo;
    },
    collapsed() {
      return this.$store.state.layout.collapsed;
    },
    name() {
      return this.$store.state.auth.userInfo.name;
    },
    boxStyle() {
      return {
        position: "fixed",
        zIndex: 2,
        top: "0px",
        left: this.$store.state.layout.heardLeft,
        right: "0px",
        boxShadow: "1px 1px 4px 1px rgb(240, 239, 239)",
        transition: this.$store.state.layout.transition
      };
    }
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch(
        "layout/changeCollapsed",
        (this.setting.collapsed = !this.setting.collapsed)
      );
    },
    loginOut() {
      this.$store.dispatch("auth/LoginOut").then(res => {
        this.$router.push("/Login");
      });
    },
    onClick({ key }) {
      // // console.log(key);
      if (key == 0) {
        this.loginOut();
      }
    }
  },
  mounted() {
    // this.name = sessionStorage.getItem("name");
  }
};
</script>

<style lang="scss" scoped>
/deep/ .ant-layout-header {
  height: 50px;
  padding: 0 30px;
  line-height: 50px;
  background: white;
}
.test {
  box-shadow: 1px 1px 1px rgb(240, 239, 239);
}
.heardLeft {
  // position: absolute;
  // right: 10px;
  // top:0px;
  //   text-align: center;
  float: right;
  display: inline-block;
  //   background: red;
  width: 165px;
  height: 100%;
}
</style>

<template>
  <div>
    <div class="logo" style="white-space: nowrap;">
      <template v-if="!isShowLogo">
        <template v-if="userInfo">
          <template v-if="isheard">{{this.$store.state.PROJECT_NAME}}</template>
          <template v-else>
            <template v-if="userInfo.avatar">
              <a-avatar class="avatarImg" :src="userInfo.avatar" />
            </template>
            <template v-else>
              <a-avatar
                size="large"
                class="avatarImg"
                style="backgroundColor:#2983f7"
              >{{userInfo.name | lastName}}</a-avatar>
            </template>
            {{userInfo.name}}
          </template>
        </template>
      </template>
      <template v-else>
        <img class="img" :src="logoImg" alt srcset />
      </template>
    </div>
  </div>
</template>

<script>
import setting from "~/utils/settings";

export default {
  data() {
    return {
      isheard: setting.isheard
    };
  },
  filters: {
    lastName(value) {
      let list = value.split("");
      let length = list.length;
      return list[length - 2] + list[length - 1];
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.auth.userInfo;
    },
    logoImg() {
      return require(`../../assets/img/logo.png`);
    },
    isShowLogo() {
      return this.$store.state.layout.logoShow;
    }
  }
};
</script>

<style lang='scss' scoped>
.logo {
  height: 40px;
  //   background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  line-height: 32px;
  text-align: center;
  color: black;
  font-size: 20px;
  transition: all 0.5s;
  .img {
    width: 20px;
  }
}
.avatarImg {
  position: relative;
  bottom: 3px;
  margin-right: 5px;
}
</style>
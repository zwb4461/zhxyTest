<template>
  <div class="contain">
    <van-radio-group v-model="form.type" direction="horizontal">
      <van-radio :name="0">代课</van-radio>
      <van-radio :name="1">调课</van-radio>
    </van-radio-group>
    <van-cell-group v-if="form.type == 0">
      <van-field
        readonly
        clickable
        label="学期年级:"
        :value="form.className"
        placeholder="选择学期年级"
        @click="doShow(1)"
      />
      <van-popup v-model="show.showXq" round position="bottom">
        <van-picker
          ref="picker"
          value-key="name"
          show-toolbar
          :columns="opt.XqOpt"
          @cancel="show.showXq = false"
          @confirm="confirmXq"
        />
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  computed: {
    //用户id
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    userName() {
      return this.$store.state.auth.userInfo.name;
    },
  },
  data() {
    return {
      form: {
        type: 0,
      },
      show: {
        showXq: false,
      },
      opt: {
        XqOpt: [],
      },
    };
  },
  methods: {
    doShow(num) {
      switch (num) {
        case 1:
          this.show.showXq = true;
          break;
      }
    },
    confirmXq() {},
  },
  created() {},
};
</script>

<style scoped>
.contain {
  height: 100vh;
}
</style>
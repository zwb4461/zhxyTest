<template>
  <div>
    <viewer :images="imgList" class="viewer" ref="viewer" @inited="inited">
      <img
        v-for="(item,index) in imgList"
        :src="urlName?item[urlName]:item"
        :key="index"
        class="image"
      />
    </viewer>
  </div>
</template>

<script>
export default {
  name: "imgPopView", //自定义图片预览(现阶段支持弹出层预览图片列表预览待开发)
  props: {
    imgList: Array, //图片数组
    urlName: String, //图片地址字段
    type: String
  },
  methods: {
    inited(viewer) {
      this.$viewer = viewer;
    },
    show(idx = 0) {
      this.$viewer.view(idx);
    }
  }
};
</script>

<style lang="scss" scoped>
.image {
  display: none;
}
</style>
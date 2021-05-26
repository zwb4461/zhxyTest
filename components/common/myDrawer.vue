<template>
  <!-- 抽屉组件 -->
  <div>
    <div v-if="visible">
      <a-drawer
        :mask="false"
        :width="width"
        wrapClassName="leftD"
        :wrapStyle="collapsed"
        @close="canel"
        :placement="placement"
        :visible="visible"
        :bodyStyle="{ paddingBottom: '80px' }"
        :btnShow="btnShow"
      >
        <div class="backsvg">
          <!-- <svg
            class="svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            :width="width+20"
            height="100"
          >
            <g fill="rgba(106,127,239,0.1)">
              <path
                d="M 0 70 Q 75 39, 150 70 T 300 70 T 450 70 T 600 70 T 750 70 T 900 70 T 1050 70 T 1200 70 T 1050 70  T 1200 70 T 1350 70 V 200 H 0 V 0"
              />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0"
                :to="-width"
                dur="30s"
                repeatCount="indefinite"
              />
            </g>
            <g fill="rgba(106,127,239,0.15)">
              <path
                d="M 0 70 Q 87.5 47, 175 70 T 350 70 T 525 70 T 700 70 T 875 70 T 1050 70 T 1225 70 T 1440 70 T 1575 70 T 1750 70 T 1925 70 V 200 H 0 V 0"
              />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0"
                :to="-(width+50)"
                dur="80s"
                repeatCount="indefinite"
              />
            </g>
            <g fill="rgba(106,127,239,0.18)" transform="translate(-903.868 0)">
              <path
                d="M 0 70 Q 135 36, 270 70 T 540 70 T 810 70 T 1080 70 T 1350 70 T 1620 70 T 1890 70 T 2160 70 T 2430 70 V 200 H 0 V 0"
                transform="translate(-38.232284367796474, 0)"
              />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0"
                :to="-(width+240)"
                dur="60s"
                repeatCount="indefinite"
              />
            </g>
          </svg>-->
        </div>

        <h4 class="title">{{ title }}</h4>
        <div class="contentInfo">
          <slot name="contentInfo"></slot>
        </div>
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'center',
            zIndex: 1
          }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="canel">{{
            closeText
          }}</a-button>
          <a-button
            v-if="btnShow2"
            @click="submit"
            type="primary"
            :loading="loading"
            >{{ okText }}</a-button
          >
        </div>
      </a-drawer>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    collapsed: {
      get() {
        if (!this.$store.state.layout.collapsed) {
          return { marginLeft: "150px" };
        } else {
          return { marginLeft: "63.5px" };
        }
      },
      set() {}
    }
  },
  props: {
    title: {
      type: String,
      default: "标题"
    },
    loading: {
      type: Boolean,
      default: false
    },
    btnShow: {
      type: Boolean,
      default: true
    },
    btnShow2: {
      type: Boolean,
      default: true
    },
    //出现位置
    placement: {
      type: String,
      default: "left"
    },
    //宽度
    width: {
      type: Number,
      default: 300
    },
    //显示隐藏
    visible: {
      type: Boolean,
      default: false
    },
    //确定按钮显示隐藏
    showOkbtn: {
      type: Boolean,
      default: true
    },
    //确定方法
    onOk: Function,
    //取消按钮文字
    closeText: {
      type: String,
      default: "取消"
    },
    //确定按钮文字
    okText: {
      type: String,
      default: "确定"
    }
  },
  watch: {
    visible(nv, ov) {
      this.show = nv;
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    submit() {
      this.onOk();
    },
    canel() {
      this.$emit("onClose");
    }
  }
};
</script>
<style lang="scss" scoped>
.backsvg {
  // height: 100%;
  width: 100%;
  height: 100px;
  position: absolute;
  top: 0;
  left: -20px;
  background: white;
  z-index: 5;
}
.title {
  // height: 100%;
  position: absolute;
  font-size: 25px;
  top: 10px;
  left: 15px;
  z-index: 6;
}
.contentInfo {
  //   height: 80vh;

  margin-top: 82px;
}
.svg {
  //   position: relative;
  //   right: 30px;
  transform: rotateX(180deg);
}
/deep/ .ant-drawer-body {
  // padding: ;
  background-color: rgba(0, 0, 0, 0) !important;
}
.leftD {
  margin-left: 150px;
}
// /deep/ .ant-drawer-content-wrapper{
//     margin-left: 150px;
// }
.sea {
  //   width: 300px;
  height: 120px;
  //   background-color: whitesmoke;
  //   background-image: linear-gradient(
  //     darkblue,
  //     rgba(255, 255, 255, 0) 80%,
  //     rgba(255, 255, 255, 0.5)
  //   );
  //   border-radius: 5px;
  //   box-shadow: 0 2px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.sea .title {
  color: white;
  font-size: 24px;
  font-family: serif;
  text-align: center;
  line-height: 252px;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  position: absolute;
  z-index: 1;
  width: 100%;
}

.sea .wave {
  position: absolute;
  top: -1420px;
  left: -500px;
  width: 1500px;
  height: 1500px;
  background: deepskyblue;
  border-radius: 43%;
  filter: opacity(0.4);
  animation: drift linear infinite;
  transform-origin: 50% 48%;
}

.sea .wave:nth-of-type(1) {
  animation-duration: 5s;
}

.sea .wave:nth-of-type(2) {
  animation-duration: 7s;
}

.sea .wave:nth-of-type(3) {
  animation-duration: 9s;
  background-color: orangered;
  filter: opacity(0.1);
}

@keyframes drift {
  from {
    transform: rotate(360deg);
  }
}
</style>

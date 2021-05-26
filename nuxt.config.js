const env = require("./env");
const theme = require("./utils/theme");

module.exports = {
  mode: "universal",
  env: {
    NODE_PORT: env[process.env.NODE_ENV].NODE_PORT, //端口
    QR_URL: env[process.env.NODE_ENV].QR_URL, //二维码链接地址
    MY_BASE_URL: env[process.env.NODE_ENV].MY_BASE_URL, //我的接口地址
    NODE_API_BASE: env[process.env.NODE_ENV].NODE_API_BASE, //我的api前缀
    BASE_URL: env[process.env.NODE_ENV].BASE_URL, //后端接口地址
    BASE_URL_DD: env[process.env.NODE_ENV].BASE_URL_DD //钉钉接口地址
  },
  //服务器设置
  server: {
    port: env[process.env.NODE_ENV].NODE_PORT, // default: 3000
    host: "0.0.0.0" // default: localhost,
  },
  /**
   * 中间件
   */
  router: {
    middleware: ["auth", "router"]
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#3385FF" },
  /*
   ** Global CSS
   */
  css: [
    "assets/css/main.css",
    "assets/css/print.css",
    "assets/css/hover.css", //鼠标移入移出效果css
    "element-ui/lib/theme-chalk/index.css",
    "ant-design-vue/dist/antd.less",
    "vant/lib/index.css",
    "viewerjs/dist/viewer.css",
    "nprogress/nprogress.css"
    // 'vue2-animate/dist/vue2-animate.min.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/element-ui",
    "~/plugins/antd-ui",
    "~/plugins/vant-ui",
    "~/plugins/v-viewer",
    "~/plugins/moment", //时间组件
    "~/plugins/pubsub", //组件传值
    "~/plugins/dept-tree", //解析部门树状图
    { src: "~/plugins/vue-editor", mode: "client" }, //编辑器
    { src: "~/plugins/vue-qr", mode: "client" }, //生成二维码
    { src: "~/plugins/vue-draggable-resizable", mode: "client" }, //ant拖拽列表(待研究)
    { src: "~/plugins/loading", mode: "client" }, //页面加载进度条
    { src: "~/plugins/vuex-persistedstate", mode: "client" }, // vuex状态持久化(1)
    { src: "~/plugins/vuex-persist", mode: "client" }, //vuex状态持久化(2)
    { src: "~/plugins/vue-clipboard2", mode: "client" }, //vue复制插件
    { src: "~/plugins/xlsx/index.js", mode: "client" }, //xlsx文件导入与导出
    { src: "~/plugins/print/index.js", mode: "client" }, //打印插件
    { src: "~/plugins/print/index.js", mode: "client" }, //打印插件
    { src: "~/plugins/tool.js", mode: "client" }, //我的工具类
    { src: "~/plugins/directive/power.js", mode: "client" } //权限指令
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   */
  build: {
    loaders: {
      less: {
        javascriptEnabled: true,
        modifyVars: theme
      }
    },
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // // console.log('webpack配置------', config);
    }
  }
};

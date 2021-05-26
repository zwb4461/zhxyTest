<template>
  <div>
    <a-tabs
      hideAdd
      v-model="activeKey"
      size="small"
      @change="callback"
      type="editable-card"
      @edit="onEdit"
    >
      <a-tab-pane tab="新生类别" :key="-1" :closable="false">
        <a-spin :spinning="loading" :tip="loadingText" size="large">
          <list-vue :addPans="addItem" :showLoading="showLoading" />
        </a-spin>
      </a-tab-pane>
      <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="true">
        <student-index :ref="'student' + pane.key" :title="pane.title" />
      </a-tab-pane>
    </a-tabs>

    <form-vue />
  </div>
</template>

<script>
import listVue from "./components/_list.vue";
import formVue from "./components/_form.vue";
import StudentIndex from "../studentIndex/index.vue";

export default {
  name: "index",
  components: {
    listVue, //列表
    formVue, //表单
    StudentIndex, //学生详情
  },
  data() {
    return {
      loading: true,
      loadingText: "新生类别加载中。。。",
      activeKey: -1,
      panes: [],
      newTabIndex: 0,
    };
  },
  created() {
    // setInterval(() => {
    //   // console.log($nuxt.$route);
    // }, 2000);
  },
  methods: {
    showLoading(type, text) {
      this.loading = type;
      if (text) {
        this.loadingText = text;
      }
    },
    callback(key) {
      // // console.log("改变了-----", key);
      this.$store
        .dispatch("auth/setEnrollId", key)
        .then((res) => {
          // console.error("成功------");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    onEdit(targetKey, action) {
      // console.log(targetKey, action);

      this[action](targetKey);
    },
    // add(info) {
    //   // console.log(info);
    //   //   this.panes.push({
    //   //     title: studenttype,
    //   //     key: activeKey
    //   //   });
    //   //   // console.log(this.panes);
    //   //   this.panes = panes;
    //   //   this.activeKey = id;
    // },
    addItem({ studenttype, id, isClose }) {
      // console.log(studenttype);
      let index = this.panes.findIndex((item) => item.key == id);
      // console.log(index);
      if (index === -1) {
        this.panes.push({
          title: studenttype,
          key: id,
        });
      }

      // console.log(this.panes);
      this.activeKey = id;
      this.$nextTick(() => {
        // console.log("88888888--------", this.$refs[`student${id}`]);
        this.$refs[`student${id}`][0].setActiing(isClose);
      });

      this.$store.dispatch("auth/setEnrollId", id);
    },
    remove(targetKey) {
      let activeKey = this.activeKey;
      let lastIndex;
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.panes.filter((pane) => pane.key !== targetKey);
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key;
        } else {
          activeKey = panes[0].key;
        }
      }

      if (panes.length > 0) {
        this.panes = panes;
        this.activeKey = activeKey;
      } else {
        this.panes = [];
        this.activeKey = -1;
      }

      this.$store.dispatch("auth/setEnrollId", this.activeKey);
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
}
</style>

<template>
  <div>
    <a-tabs hideAdd v-model="activeKey" size="small" type="editable-card">
      <a-tab-pane key="1" tab="学籍管理"><student-status /></a-tab-pane>
      <a-tab-pane key="2" tab="补充信息设置"><supplementary /></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import listVue from "./components/_list.vue";
import studentStatus from "./studentStatus/index.vue";
import supplementary from "../supplementary/index.vue";

export default {
  name: "index",
  components: {
    listVue, //列表
    studentStatus, //分班详情页面
    supplementary,
  },
  data() {
    return {
      activeKey: "1",
      panes: [],
      newTabIndex: 0,
    };
  },
  methods: {
    callback(key) {
      // console.log("改变了-----", key);
      if (key == -1) {
        this.$pubSub.publish("getList", this.panes);
      }
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
    addItem({ studenttype, id }) {
      let _this = this;
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

      setTimeout(() => {
        // this.panes.forEach(item => {
        this.$refs[`studentStatus${id}`][0].setInfo(id, studenttype);
        // });
      }, 100);
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
        this.$pubSub.publish("getList");
      }
      // this.$store.dispatch("auth/setEnrollId", this.activeKey);
    },
  },
};
</script>

<style lang="scss" scoped></style>

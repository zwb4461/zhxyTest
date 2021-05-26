<template>
  <div>
    <a-tabs
      v-if="false"
      hideAdd
      v-model="activeKey"
      size="small"
      @change="callback"
      type="editable-card"
      @edit="onEdit"
    >
      <a-tab-pane tab="学生类别" :key="-1" :closable="false">
        <list-vue :addPans="addItem" />
      </a-tab-pane>
      <a-tab-pane
        v-for="pane in panes"
        :tab="pane.title"
        :key="pane.key"
        :closable="true"
      >
        <student-status :ref="`studentStatus${pane.key}`" />
      </a-tab-pane>
    </a-tabs>
    <student-status />
  </div>
</template>

<script>
import listVue from "./components/_list.vue";
import studentStatus from "./studentStatus/index.vue";

export default {
  name: "index",
  components: {
    listVue, //列表
    studentStatus //分班详情页面
  },
  data() {
    return {
      activeKey: -1,
      panes: [],
      newTabIndex: 0
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
      let index = this.panes.findIndex(item => item.key == id);
      // console.log(index);
      if (index === -1) {
        this.panes.push({
          title: studenttype,
          key: id
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
      const panes = this.panes.filter(pane => pane.key !== targetKey);
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
    }
  }
};
</script>

<style lang="scss" scoped></style>

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
      <a-tab-pane tab="智能分班" :key="-1" :closable="false">
        <list-vue :addPans="addItem" />
      </a-tab-pane>
      <a-tab-pane
        v-for="pane in panes"
        :tab="pane.title"
        :key="pane.key"
        :closable="true"
      >
        <fen-ban :ref="`fenBan${pane.key}`" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import listVue from "./components/_list.vue";
import fenBan from "./components/fen-ban-index/index.vue";

export default {
  name: "index",
  components: {
    listVue, //列表
    fenBan //分班详情页面
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
      // // console.log("改变了-----", key);
      if (key == -1) {
        this.$pubSub.publish("getList", this.panes);
      }
    },
    onEdit(targetKey, action) {
      // // console.log(targetKey, action);

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
    addItem({ studenttype, id, deptclass, isconfirm }) {
      let _this = this;
      // // console.log(studenttype);
      let index = this.panes.findIndex(item => item.key == id);
      // // console.log(index);
      if (index === -1) {
        this.panes.push({
          title: studenttype,
          key: id
        });
      }

      // // console.log(this.panes);
      this.activeKey = id;

      setTimeout(() => {
        // this.panes.forEach(item => {
        this.$refs[`fenBan${id}`][0].setInfo(
          id,
          deptclass,
          studenttype,
          isconfirm
        );
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

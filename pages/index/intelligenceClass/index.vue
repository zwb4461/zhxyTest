<template>
  <div>
    <a-tabs hideAdd v-model="activeKey" size="small" @change="callback" type="editable-card">
      <a-tab-pane tab="排课管理" :key="-1" :closable="false">
        <list-vue :addPans="addItem" />
      </a-tab-pane>

      <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="false">
        <paike :ref="'paike' + pane.key" :classweekId="pane.key" />
      </a-tab-pane>
    </a-tabs>
    <form-vue />
  </div>
</template>

<script>
import listVue from "./components/_list.vue";
import formVue from "./components/_form.vue";
import paike from "../intelligenceIndex";
export default {
  data() {
    return {
      classweekId: undefined, //排课类别id
      panes: [],
      loading: true,
      loadingText: "排课管理加载中。。。",
      activeKey: -1,
    };
  },
  methods: {
    addItem(item) {
      // console.log("item-----", item);

      this.panes.push({
        title: item.name,
        key: item.id,
      });

      this.activeKey = item.id;
      this.$nextTick(() => {
        // for (var d in this.$refs) {
        //   var d; // 属性名name
        //   this.classweekId = d.replace(/[^0-9]/gi, "");
        //   console.log("88888888--------", num);
        // }
        // this.$refs[`paike${item.id}`][0].setActiing();
      });
    },
    callback(key) {
      if (key == -1) {
        this.$pubSub.publish("getPList");
      }
    },
    showLoading(type, text) {
      this.loading = type;
      if (text) {
        this.loadingText = text;
      }
    },
  },
  components: {
    listVue,
    formVue,
    paike,
  },
};
</script>

<style scoped></style>

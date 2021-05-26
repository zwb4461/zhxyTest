<template>
  <div>
    <a-tabs size="small" defaultActiveKey="2" @change="callback">
      <!-- <a-tab-pane v-if="$power('p-1-l')" tab="计划新生" key="1">
        <planStudent :activing="activing" />
      </a-tab-pane>-->
      <a-tab-pane v-if="$power('p-1-r')" tab="报名新生" key="2" forceRender>
        <reportStudent :activing="activing" :tableType="1" />
      </a-tab-pane>

      <!-- <a-tab-pane v-if="$power('p-1-f')" tab="表单设置" key="3">
        <formSetting :activing="activing" />
      </a-tab-pane>-->

      <a-tab-pane v-if="$power('p-1-s')" tab="审核评定设置" key="4">
        <examineSetting :activing="activing" ref="examineSetting" />
      </a-tab-pane>
      <a-tab-pane v-if="$power('p-1-h')" tab="资料审核" key="5">
        <reportStudent :activing="activing" ref="check" :tableType="2" :title="title" />
      </a-tab-pane>
      <a-tab-pane v-if="$power('p-1-x')" tab="新生评定" key="6">
        <reportStudent :activing="activing" ref="mark" :tableType="3" />
      </a-tab-pane>
      <a-tab-pane v-if="$power('p-1-close')" key="7" disabled>
        <div slot="tab">
          <a-switch
            :disabled="!activing"
            v-model="isclose"
            checkedChildren="报名进行中"
            unCheckedChildren="报名已关闭"
            defaultChecked
          />
        </div>
      </a-tab-pane>
    </a-tabs>

    <!-- 确认信息提示框 -->
    <a-modal
      title="提示"
      style="top: 20px;"
      okText="确定终结"
      centered
      :visible="pop.info"
      @ok="closeOk"
      @cancel="cancel"
    >
      <div class="info">
        确认要对“{{ title }}”进行终结操作吗？点击确定终结系统会将对“{{
        title
        }}”数据进行锁定，将不能再开启，只能进行数据查看
      </div>
    </a-modal>
  </div>
</template>

<script>
//接口
import freshmenReport from "~/api/freshmenReport"; //学生类型

//组件
import planStudent from "./planStudent/"; //计划新生
import reportStudent from "./reportStudent/"; //报名新生列表
import examineSetting from "./examineSetting/"; //审核设置
import formSetting from "./formSetting/"; //表单设置
export default {
  components: {
    planStudent, //计划新生
    reportStudent, //报名新生
    examineSetting, //审核设置
    formSetting, //表单设置
  },
  props: {
    title: String,
  },
  computed: {
    enrollId() {
      return this.$store.state.auth.enrollId;
    },
  },
  data() {
    return {
      pop: {
        info: false,
      },
      isclose: true,
      activing: true,
    };
  },
  watch: {
    isclose(nv) {
      // // console.log(nv);
      if (!nv && this.activing) {
        // // console.log("跳出报名信息修改的提示框");
        this.pop.info = true;
      }
    },
  },
  methods: {
    setActiing(val) {
      this.activing = val === 1 ? false : true;
      this.isclose = val === 1 ? false : true;
    },
    callback(key) {
      this.$nextTick(() => {
        // // console.log(key);
        if (key == 4) {
          //评分设置
          this.$refs["examineSetting"].getInfo();
        } else if (key == 5) {
          //评分页面
          this.$refs["check"].getExamineSetting();
        } else if (key == 6) {
          //评分页面
          this.$refs["mark"].getExamineSetting();
        }
      });
    },
    closeOk() {
      freshmenReport
        .close({ enrollId: this.enrollId })
        .then((res) => {
          this.$message.success("报名已关闭");
          this.pop.info = false;
          this.activing = false;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    cancel() {
      this.isclose = true;
      this.pop.info = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.switch {
  width: 450px;
}
.info {
  color: red;
  text-indent: 2em;
}
</style>

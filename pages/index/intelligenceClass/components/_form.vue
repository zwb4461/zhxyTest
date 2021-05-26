<template>
  <div>
    <my-drawer-vue
      title="排课名称"
      :width="300"
      :visible="visible"
      :onOk="onSubmit"
      @onClose="visible = false"
    >
      <template slot="contentInfo">
        <a-form-model
          ref="ruleForm"
          layout="vertical"
          :model="form"
          :rules="rules"
        >
          <a-form-model-item label="排课名称" prop="name">
            <a-input v-model="form.name" />
          </a-form-model-item>
        </a-form-model>
      </template>
    </my-drawer-vue>
    <!-- <a-modal title="添加类别" width="300px" :confirmLoading="loading" v-model="visible" @ok="onSubmit">

    </a-modal>-->
  </div>
</template>
<script>
import main from "@/api/courseManagement";
import myDrawerVue from "~/components/common/myDrawer.vue";
export default {
  components: {
    myDrawerVue
  },
  computed: {
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    }
  },
  data() {
    return {
      id: "",
      visible: false,
      formType: 1,
      form: {
        createUnionid: undefined,
        schoolId: undefined,
        name: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入排课名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //赋值表单
    setForm(data) {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = data[key];
        }
      }
    },
    //清空表单
    clearFrom() {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = undefined;
        }
      }
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.$refs.ruleForm.resetFields();
      this.visible = false;
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        // // console.log(valid);
        if (valid) {
          let formData = { ...this.form };

          if (this.formType === 1) {
            // console.log("新增");
            //赋值学校id
            formData.schoolId = this.$store.state.auth.schoolId;
            formData.createUnionid = this.unionid;
            //添加
            main
              .setLeiBie(formData)
              .then(res => {
                // console.log("添加成功", res);
                this.$message.success("添加成功");
                //刷新列表
                this.$pubSub.publish("getPList");
                this.visible = false;
              })
              .catch(err => {
                console.log("添加失败", err);
              });
          } else if (this.formType === 2) {
            //修改;
            main
              .setLeiBie({ ...formData, id: this.id }) //
              .then(res => {
                this.$message.success("修改成功");
                this.loading = false;
                //刷新列表;
                this.$pubSub.publish("getPList");
                this.visible = false;
              })
              .catch(err => {
                this.$message.error(err);
                this.loading = false;
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    //#订阅消息----------
    //打开表单
    this.$pubSub.subscribe("isShowform", (msg, { type, data }) => {
      this.clearFrom();
      if (type === 2) {
        this.id = data.id;

        this.setForm(data);
      }
      this.visible = true;
      this.formType = type;
    });
  }
};
</script>

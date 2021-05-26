<template>
  <div>
    <my-drawer-vue
      title="新生类别"
      :width="300"
      :loading="loading"
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
          <a-form-model-item label="新生类别" prop="studenttype">
            <a-input v-model="form.studenttype" />
          </a-form-model-item>
        </a-form-model>
      </template>
    </my-drawer-vue>
    <!-- <a-modal title="添加类别" width="300px" :confirmLoading="loading" v-model="visible" @ok="onSubmit">

    </a-modal>-->
  </div>
</template>
<script>
import main from "~/api/freshmenReport";
import myDrawerVue from "~/components/common/myDrawer.vue";
export default {
  components: {
    myDrawerVue
  },
  data() {
    return {
      visible: false,
      formType: 1,
      loading: false,
      dateFormat: "YYYY-MM-DD HH:mm:ss", //日期默认格式
      form: {
        id: undefined,
        schoolId: undefined,
        studenttype: undefined,
        createtime: undefined
      },
      rules: {
        studenttype: [
          {
            required: true,
            message: "请输入学生类别",
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
          this.loading = true;
          let formData = { ...this.form };

          if (this.formType === 1) {
            //赋值创建时间
            formData.createtime = this.$moment().format(this.dateFormat);
            //赋值学校id
            formData.schoolId = this.$store.state.auth.schoolId;

            //添加
            main
              .add(formData)
              .then(res => {
                this.$message.success("添加成功");
                this.loading = false;
                //刷新列表
                this.$pubSub.publish("getList");
                this.visible = false;
              })
              .catch(err => {
                this.$message.error(err);
                this.loading = false;
              });
          } else if (this.formType === 2) {
            //修改
            //添加
            main
              .edit(formData)
              .then(res => {
                this.$message.success("修改成功");
                this.loading = false;
                //刷新列表
                this.$pubSub.publish("getList");
                this.visible = false;
              })
              .catch(err => {
                this.$message.error(err);
                this.loading = false;
              });
          }
        } else {
          // // console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    //#订阅消息----------
    //打开表单
    this.$pubSub.subscribe("isShowform", (msg, { type, data }) => {
      // // console.log("表单类型-----", type);
      this.clearFrom();
      if (type === 2) {
        this.setForm(data);
      }
      this.visible = true;
      this.formType = type;
    });
  }
};
</script>

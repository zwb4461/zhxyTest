<template>
  <div>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="用户名">
        <a-input v-model="form.username" placeholder="请输入用户名"></a-input>
      </a-form-model-item>
      <a-form-model-item label="密码">
        <a-input v-model="form.password" placeholder="请输入密码"></a-input>
      </a-form-model-item>
      <a-form-model-item label="密码">
        <a-select v-model="form.aa" defaultValue="a1">
          <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{
            (i + 9).toString(36) + i
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <!-- <a-form-model-item :wrapper-col="{ span: 8, offset: 8 }">
        <a-button type="primary" @click="onSubmit">保存</a-button>
      </a-form-model-item>-->
    </a-form-model>
  </div>
</template>
<script>
//组件

export default {
  props: {
    btnLoading: Function //按钮加载与不加载
  },
  data() {
    return {
      //表单类型(1是新增 , 2是修改)
      formType: 1,
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      dateFormat: "YYYY-MM-DD HH:mm:ss", //日期默认格式
      setting: {},
      form: {
        id: undefined,
        username: undefined,
        password: undefined
      },
      rules: {
        username: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    setForm(data) {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = data[key];
        }
      }
    },
    clearForm() {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = "";
        }
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.btnLoading(true);

          if (this.formType === 1) {
            //新增

            setTimeout(() => {
              this.btnLoading(false);
            }, 2000);
          } else if (this.formType === 2) {
            //修改
            setTimeout(() => {
              this.btnLoading(false);
            }, 2000);
          }
        } else {
          // // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>
<style lang="scss" scoped></style>

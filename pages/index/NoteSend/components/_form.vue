<template>
  <div>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="用户名" prop="loginname">
        <a-input v-model="form.loginname" placeholder="请输入用户名"></a-input>
      </a-form-model-item>

      <a-form-model-item label="短信模板" prop="messagecontent">
        <a-input
          v-model="form.messagecontent"
          placeholder="请输入短信模板"
        ></a-input>
      </a-form-model-item>

      <a-form-model-item label="接口密匙" prop="password">
        <a-input v-model="form.password" placeholder="请输入接口密匙"></a-input>
      </a-form-model-item>

      <a-form-model-item label="短信地址" prop="sendurl">
        <a-input v-model="form.sendurl" placeholder="请输入短信地址"></a-input>
      </a-form-model-item>

      <a-form-model-item label="流水号" prop="serialnumber">
        <a-input
          v-model="form.serialnumber"
          placeholder="请输入流水号"
        ></a-input>
      </a-form-model-item>

      <a-form-model-item label="企业编号" prop="spcode">
        <a-input v-model="form.spcode" placeholder="请输入企业编号"></a-input>
      </a-form-model-item>

      <a-form-model-item label="空号处理" prop="f">
        <a-input v-model="form.f" placeholder="请输入空号处理"></a-input>
      </a-form-model-item>

      <a-form-model-item label="是否删除" prop="ifdelete">
        <a-input v-model="form.ifdelete" placeholder="请输入是否删除"></a-input>
      </a-form-model-item>

      <a-form-model-item label="学校" prop="schoolId">
        <a-select v-model="form.schoolId">
          <a-select-option
            v-for="item in setting.schoolId"
            :key="item.v"
            placeholder="请选择学校"
            >{{ item.n }}</a-select-option
          >
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

//接口
import main from "~/api/NoteSend";

export default {
  props: {
    btnLoading: Function //按钮加载与不加载
  },
  data() {
    return {
      //表单类型(1是新增 , 2是修改)
      formType: 1,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      dateFormat: "YYYY-MM-DD HH:mm:ss", //日期默认格式
      setting: {
        schoolId: [
          { n: "选项1", v: 1 },
          { n: "选项2", v: 2 },
          { n: "选项3", v: 3 }
        ]
      },
      form: {
        id: undefined,

        loginname: undefined,

        messagecontent: undefined,

        password: undefined,

        sendurl: undefined,

        serialnumber: undefined,

        spcode: undefined,

        f: undefined,

        ifdelete: undefined,

        schoolId: undefined
      },
      rules: {
        loginname: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],

        messagecontent: [
          {
            required: true,
            message: "请输入短信模板",
            trigger: "blur"
          }
        ],

        password: [
          {
            required: true,
            message: "请输入接口密匙",
            trigger: "blur"
          }
        ],

        sendurl: [
          {
            required: true,
            message: "请输入短信地址",
            trigger: "blur"
          }
        ],

        serialnumber: [
          {
            required: true,
            message: "请输入流水号",
            trigger: "blur"
          }
        ],

        spcode: [
          {
            required: true,
            message: "请输入企业编号",
            trigger: "blur"
          }
        ],

        f: [
          {
            required: true,
            message: "请输入空号处理",
            trigger: "blur"
          }
        ],

        ifdelete: [
          {
            required: true,
            message: "请输入是否删除",
            trigger: "blur"
          }
        ],

        schoolId: [
          {
            required: true,
            message: "请输入学校",
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

            main
              .add(this.form)
              .then(res => {
                this.btnLoading(false);
              })
              .catch(err => {
                this.$message.error(err);
              });
          } else if (this.formType === 2) {
            /// console.log
            setTimeout(() => {
              this.btnLoading(false);
            }, 2000);
          }
        } else {
          // console.log("error submit!!");
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

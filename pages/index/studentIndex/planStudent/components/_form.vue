<template>
  <div>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="证件号码">
        <a-input v-model="form.idno" placeholder="请输入证件号码"></a-input>
      </a-form-model-item>

      <a-form-model-item label="姓名" prop="name">
        <a-input v-model="form.name" placeholder="请输入姓名"></a-input>
      </a-form-model-item>

      <a-form-model-item label="监护人号码" prop="phone">
        <a-input v-model="form.phone" placeholder="请输入监护人号码"></a-input>
      </a-form-model-item>

      <!-- <a-form-model-item label="学校id" prop="schoolId">
        <a-input v-model="form.schoolId" placeholder="请输入学校id"></a-input>
      </a-form-model-item>-->

      <!-- <a-form-model-item label="导入状态" prop="state">
        <a-select v-model="form.state">
          <a-select-option
            v-for="item in setting.state"
            :key="item.v"
            placeholder="请选择导入状态"
          >{{item.n}}</a-select-option>
        </a-select>
      </a-form-model-item>-->

      <!-- <a-form-model-item label="学生类型" prop="studenttype">
        <a-input v-model="form.studenttype" placeholder="请输入学生类型"></a-input>
      </a-form-model-item>-->

      <!-- <a-form-model-item :wrapper-col="{ span: 8, offset: 8 }">
        <a-button type="primary" @click="onSubmit">保存</a-button>
      </a-form-model-item>-->
    </a-form-model>
  </div>
</template>
<script>
//组件

//接口
import main from "~/api/planStudent";

export default {
  props: {
    btnLoading: Function //按钮加载与不加载
    //学生类型id
    // enrollId: {
    //   type: Number,
    //   default: -1
    // }
  },
  computed: {
    //用户id
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    enrollId() {
      return this.$store.state.auth.enrollId;
    },
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    }
  },
  data() {
    return {
      //表单类型(1是新增 , 2是修改)
      formType: 1,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      dateFormat: "YYYY-MM-DD HH:mm:ss", //日期默认格式
      setting: {
        state: [
          { n: "选项1", v: 1 },
          { n: "选项2", v: 2 },
          { n: "选项3", v: 3 }
        ]
      },
      form: {
        id: undefined,

        idno: undefined,

        name: undefined,

        phone: undefined

        // schoolId: undefined,

        // state: undefined,

        // studenttype: undefined
      },
      rules: {
        idno: [
          {
            required: true,
            message: "请输入证件号码",
            trigger: "blur"
          }
        ],

        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],

        phone: [
          {
            required: true,
            message: "请输入监护人号码",
            trigger: "blur"
          }
        ],

        schoolId: [
          {
            required: true,
            message: "请输入学校id",
            trigger: "blur"
          }
        ],

        state: [
          {
            required: true,
            message: "请输入导入状态",
            trigger: "blur"
          }
        ],

        studenttype: [
          {
            required: true,
            message: "请输入学生类型",
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
          let formData = { ...this.form };
          formData.actionUnionid = this.unionid; //用户id
          formData.actiontime = this.$moment().format("YYYY-MM-DD HH:mm:ss"); //操作时间

          if (this.formType === 1) {
            formData.schoolId = this.schoolId; //学校id
            formData.enrollId = this.enrollId; //学生类别id
            formData.ifdelete = 0; //删除状态
            //新增
            main
              .add([formData])
              .then(res => {
                this.$message.success("添加成功");
                this.btnLoading(false);
              })
              .catch(err => {
                this.$message.error(err);
                this.btnLoading(false);
              });
          } else if (this.formType === 2) {
            //修改
            main
              .edit(formData)
              .then(res => {
                this.$message.success("修改成功");
                this.btnLoading(false);
              })
              .catch(err => {
                this.$message.error(err);
                this.btnLoading(false);
              });
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

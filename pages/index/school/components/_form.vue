<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" layout="vertical">
      <a-form-model-item label="学校名称" prop="name">
        <a-input v-model="form.name" placeholder="请输入学校名称"></a-input>
      </a-form-model-item>

      <a-form-model-item label="学校地址" prop="street">
        <a-input v-model="form.street" placeholder="请输入学校地址"></a-input>
      </a-form-model-item>

      <a-form-model-item label="管理员" prop="managerId">
        <!-- <a-input v-model="form.managerId" placeholder="请输入管理员"></a-input> -->
        <!-- <a-select
          show-search
          :filter-option="filterOption"
          v-model="form.managerId"
          placeholder="请选择管理员"
        >
          <a-select-option v-for="item in setting.user" :key="item.unionid">{{item.name}}</a-select-option>
        </a-select>-->
        <a-input v-model="form.managerId" placeholder="请输入学校管理员用户id"></a-input>
      </a-form-model-item>

      <a-form-model-item label="学校简介" prop="enproof">
        <a-input v-model="form.enproof" placeholder="请输入学校简介"></a-input>
      </a-form-model-item>

      <a-form-model-item label="学校图标" prop="icon">
        <a-input v-model="form.icon" placeholder="请输入学校图标"></a-input>
      </a-form-model-item>
      <a-form-model-item label="学校IP" prop="port">
        <a-input v-model="form.ip" placeholder="请输入学校IP"></a-input>
      </a-form-model-item>
      <a-form-model-item label="学校端口" prop="port">
        <a-input v-model="form.port" placeholder="请输入学校端口"></a-input>
      </a-form-model-item>
      <a-form-model-item label="学校CropId" prop="cropId">
        <a-input v-model="form.cropId" placeholder="请输入学校CropId"></a-input>
      </a-form-model-item>

      <a-form-model-item label="应用首页地址" prop="domainName">
        <a-input v-model="form.domainName" placeholder="请输入应用首页地址">
          <!-- <a-select slot="addonBefore" default-value="http://" style="width: 90px">
            <a-select-option value="http://">http://</a-select-option>
            <a-select-option value="https://">https://</a-select-option>
          </a-select>-->
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="是否禁用" prop="valid">
        <a-radio-group v-model="form.valid">
          <a-radio :value="0">启用</a-radio>
          <a-radio :value="1">禁用</a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
//组件

//接口
import main from "~/api/school";
import dd from "~/api/dingding";

export default {
  props: {
    btnLoading: Function, //按钮加载与不加载
  },
  data() {
    return {
      //表单类型(1是新增 , 2是修改)
      formType: 1,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      dateFormat: "YYYY-MM-DD HH:mm:ss", //日期默认格式
      setting: {
        user: [],
      },
      form: {
        id: undefined,

        name: undefined,

        street: undefined,

        managerId: undefined,

        enproof: undefined,

        icon: undefined,

        valid: undefined,

        unionid: undefined,
        port: undefined, //端口号
        cropId: undefined, //企业id
        domainName: undefined, //域名
        ip: undefined, //域名
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入学校名称",
            trigger: "blur",
          },
        ],

        street: [
          {
            required: true,
            message: "请输入学校地址",
            trigger: "blur",
          },
        ],

        managerId: [
          {
            required: true,
            message: "请输入管理员",
            trigger: "blur",
          },
        ],

        enproof: [
          {
            required: true,
            message: "请输入学校简介",
            trigger: "blur",
          },
        ],

        icon: [
          {
            required: true,
            message: "请输入学校图标",
            trigger: "blur",
          },
        ],

        valid: [
          {
            required: true,
            message: "请输入是否禁用",
            trigger: "blur",
          },
        ],

        unionid: [
          {
            required: true,
            message: "请输入操作人",
            trigger: "blur",
          },
        ],
        port: [
          {
            required: true,
            message: "请输入学校端口",
            trigger: "blur",
          },
        ],
        cropId: [
          {
            required: true,
            message: "请输入学校CropId",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {},
  created() {
    // this.getDDuser(); //获取钉钉用户
  },
  mounted() {},
  methods: {
    //下拉搜索
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    //获取钉钉用户
    getDDuser() {
      dd.user()
        .then((res) => {
          // // console.log("dd用户是------", res.data);
          this.setting.user = res.data;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
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
          this.form[key] = undefined;
        }
      }
      this.form.valid = 0;
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.btnLoading(true);

          if (this.formType === 1) {
            //新增
            let formData = { ...this.form };
            main
              .add(formData)
              .then((res) => {
                this.btnLoading(false);
              })
              .catch((err) => {
                this.$message.error(err);
              });
          } else if (this.formType === 2) {
            //修改
            let formData = { ...this.form };
            main
              .edit(formData)
              .then((res) => {
                this.btnLoading(false);
              })
              .catch((err) => {
                this.$message.error(err);
              });
          }
        } else {
          // // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped></style>

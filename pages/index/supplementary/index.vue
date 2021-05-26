<template>
  <div>
    <a-form-model
      class="formClass"
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-model-item
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 18 }"
            label="修改时间段选择"
            prop="adjStartTime"
          >
            <a-range-picker
              style="width:100%;"
              v-model="setting.val.checkTime"
              :showTime="{ format: 'YYYY-MM-DD HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['学籍补充开始时间', '学籍补充结束时间']"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-model-item
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 18 }"
            label="班级选择"
          >
            <a-select
              v-model="form.xjclassId"
              mode="multiple"
              style="width: 100%"
              placeholder="请选择班级"
              option-label-prop="label"
            >
              <a-select-option
                v-for="(list, index) in xjclassList"
                :key="index"
                :value="list.deptId"
                :label="list.name"
              >
                {{ list.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-form-model-item label="学籍设置">
        <a-switch
          v-model="form.xjkg"
          checkedChildren="开启"
          unCheckedChildren="关闭"
        />
      </a-form-model-item>

      <a-form-model-item style="text-align:right;" :wrapperCol="{ span: 3 }">
        <a-button type="primary" @click="onSubmit">保存设置</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import main from "~/api/studentStatus_copy";

export default {
  components: {},
  props: {
    activing: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 14 },
      setting: {
        val: {
          checkTime: [],
          examineTime: []
        }
      },
      form: {
        adjStartTime: "", //学籍补充开始时间
        adjEndTime: "", //学籍补充结束时间
        xjkg: true, //是否开启学籍
        xjclassId: [] // 班级
      },
      rules: {
        adjStartTime: [
          { required: true, message: "请选择时间", trigger: "blur" }
        ]
      },
      xjclassList: []
    };
  },
  watch: {
    "setting.val.checkTime"(nv) {
      if (nv.length > 0) {
        this.form.adjStartTime = this.$moment(nv[0]).format("YYYY-MM-DD HH:mm");
        this.form.adjEndTime = this.$moment(nv[1]).format("YYYY-MM-DD HH:mm");
      } else {
        this.form.adjStartTime = "";
        this.form.adjEndTime = "";
      }
    }
  },
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    }
  },
  methods: {
    onSubmit() {
      let params = {
        adjStartTime: this.form.adjStartTime,
        adjEndTime: this.form.adjEndTime,
        xjkg: this.form.xjkg,
        xjclassId: JSON.stringify(this.form.xjclassId),
        id: this.schoolId
      };

      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          main
            .updateSchool({ ...params })
            .then(res => {
              this.$message.success(res.msg);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    dataInit() {
      main
        .dd_department({ schoolId: this.schoolId })
        .then(res => {
          this.xjclassList = res.data;
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

      main
        .selectSchool({ schoolId: this.schoolId })
        .then(res => {
          let list = res.data.schools[0];
          list.xjclassId = JSON.parse(list.xjclassId);
          this.form = { ...list };
          // console.log(this.form, "-----");
          this.setting.val.checkTime = [
            this.$moment(this.form.adjStartTime),
            this.$moment(this.form.adjEndTime)
          ];
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.dataInit();
  }
};
</script>
<style lang="scss" scoped>
.formClass {
  width: 1200px;
  //   overflow-x: auto;
}
.textCenter {
  text-align: center;
}
.userItem {
  position: relative;
  display: inline-block;
  margin-right: 12px;
  .itemName {
    width: 60px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    // border: 1px solid black;
    left: -10px;
    bottom: -32px;
  }
  .close {
    position: absolute;
    right: -6px;
    top: -2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #cccccc;
    .item {
      position: relative;
      .icon {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 14px;
        height: 14px;
        color: white;
      }
    }
  }
}
</style>

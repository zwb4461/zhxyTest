<template>
  <div>
    <my-drawer-vue
      title="家长填报表单"
      :width="400"
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
          <div class="title-index">
            <div class="checkItem">
              <a-checkbox
                :indeterminate="indeterminate"
                :checked="checkAll"
                @change="onCheckAllChange"
                >全选</a-checkbox
              >
            </div>
            <div class="switchItem">
              <a-checkbox
                :indeterminate="indeterminate2"
                :checked="checkAll2"
                @change="onCheckAllChange2"
                >全必选</a-checkbox
              >
            </div>
          </div>
          <a-list bordered :dataSource="data">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <div class="checkItem">
                <a-checkbox
                  :checked="item.visible === 0 ? false : true"
                  :data-idx="index"
                  @change="checkChange($event, index)"
                  >{{ item.zwname }}</a-checkbox
                >
              </div>
              <div class="switchItem">
                <a-switch
                  :checked="item.required === 0 ? false : true"
                  @change="switchChange($event, index)"
                  checkedChildren="必填项"
                  unCheckedChildren="非必填"
                />
              </div>
            </a-list-item>
          </a-list>
          <a-form-item prop="point" style="margin-top:20px;">
            <a-textarea v-model="form.point" placeholder="提示语" :rows="4" />
          </a-form-item>
          <a-form-item
            label="报名时间：指在这个时间范围内家长可以报名"
            prop="datefrom"
          >
            <a-range-picker
              style="width:100%;"
              v-model="cdata.date"
              :showTime="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['报名开始时间', '报名结束时间']"
            />
          </a-form-item>
          <a-form-item
            label="修改时间：指在这个时间范围内可以对原先报名的内容进行修改"
            prop="updatestarttime"
          >
            <a-range-picker
              style="width:100%;"
              v-model="cdata.updata"
              :showTime="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['修改开始时间', '修改结束时间']"
            />
          </a-form-item>
        </a-form-model>
      </template>
    </my-drawer-vue>
    <!-- <a-modal title="添加类别" width="300px" :confirmLoading="loading" v-model="visible" @ok="onSubmit">
      
    </a-modal>-->
  </div>
</template>
<script>
//接口
import main from "~/api/formSetting";

//组件
import myDrawerVue from "~/components/common/myDrawer.vue";

export default {
  props: {
    reload: Function
  },
  components: {
    myDrawerVue
  },
  computed: {
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    enrollId() {
      return this.$store.state.auth.enrollId;
    },
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    //学校名称
    schoolName() {
      return this.$store.state.auth.schoolName;
    },
    //学校url
    schoolUrl() {
      return this.$store.state.auth.schoolUrl;
    }
  },
  watch: {
    "cdata.date"(nv) {
      if (nv) {
        this.form.datefrom = this.$moment(nv[0]).format("YYYY-MM-DD HH:mm:ss");
        this.form.dateto = this.$moment(nv[1]).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    "cdata.updata"(nv) {
      if (nv) {
        this.form.updatestarttime = this.$moment(nv[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.form.updateendtime = this.$moment(nv[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
    }
  },
  data() {
    return {
      formType: 1,
      checkAll: false,
      indeterminate: true,
      checkAll2: false,
      indeterminate2: true,
      data: [
        {
          enrollId: "",
          field: "name",
          id: "",
          point: "",
          zwname: "学生姓名",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "sex",
          id: "",
          point: "",
          zwname: "性别",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "idcardtype",
          id: "",
          point: "证件类型",
          zwname: "证件类型",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "foreigntype",
          id: "",
          point: "",
          zwname: "港澳台侨外",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "idno",
          id: "",
          point: "",
          zwname: "证件编号",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "birthday",
          id: "",
          point: "",
          zwname: "出生日期",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "country",
          id: "",
          point: "",
          zwname: "国籍",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "nation",
          id: "",
          point: "",
          zwname: "民族",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "hometown",
          id: "",
          point: "",
          zwname: "籍贯",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "province",
          id: "",
          point: "",
          zwname: "户籍地址",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "homeRemark",
          id: "",
          point: "",
          zwname: "户籍备注",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "address",
          id: "",
          point: "",
          zwname: "现居住地址",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "houseproof",
          id: "",
          point: "",
          zwname: "房产信息",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "carer",
          id: "",
          point: "",
          zwname: "监护人",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "carerphone",
          id: "",
          point: "",
          zwname: "监护人手机号",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "fathername",
          id: "",
          point: "",
          zwname: "联系人",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "sourcetype",
          id: "",
          point: "",
          zwname: "生源类型",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "childhood",
          id: "",
          point: "",
          zwname: "毕业幼儿园",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "immuneless",
          id: "",
          point: "",
          zwname: "免疫卡少几次",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "special",
          id: "",
          point: "",
          zwname: "特长",
          required: 0,
          visible: 0
        },
        {
          enrollId: "",
          field: "remark",
          id: "",
          point: "",
          zwname: "家长备注",
          required: 0,
          visible: 0
        }
      ],
      visible: false,
      loading: false,
      dateFormat: "YYYY-MM-DD HH:mm:ss", //日期默认格式
      cdata: {
        date: [],
        updata: []
      },
      form: {
        id: "",
        datefrom: "",
        dateto: "",
        updatestarttime: "",
        updateendtime: "",
        point: "" //提示语
      },
      rules: {
        point: [
          {
            required: true,
            message: "请输入提示语",
            trigger: "blur"
          }
        ],
        datefrom: [
          {
            required: true,
            message: "请选择报名时间",
            trigger: "blur"
          }
        ],
        updatestarttime: [
          {
            required: true,
            message: "请选择修改时间",
            trigger: "blur"
          }
        ]
      },
      qrUrl: ""
    };
  },
  methods: {
    //多选框改变状态
    checkChange(e, idx) {
      // // console.log(e);
      // // console.log(idx);
      this.data[idx].visible = e.target.checked ? 1 : 0;
      let i = 0;
      this.data.forEach(element => {
        if (element.visible === 1) {
          i++;
        }
      });
      this.indeterminate = this.data.length <= i ? false : true;
      this.checkAll = this.data.length === i;
    },
    //多选框全选
    onCheckAllChange(e) {
      this.data.forEach(element => {
        element.visible = e.target.checked ? 1 : 0;
      });
      this.indeterminate = false;
      this.checkAll = e.target.checked;
    },
    //开关状态改变
    switchChange(e, idx) {
      // // console.log(e);
      // // console.log(idx);
      this.data[idx].required = e ? 1 : 0;

      let i = 0;
      this.data.forEach(element => {
        if (element.required === 1) {
          i++;
        }
      });
      this.indeterminate2 = this.data.length <= i ? false : true;
      this.checkAll2 = this.data.length === i;
    },
    //开关全选
    onCheckAllChange2(e) {
      this.data.forEach(element => {
        element.required = e.target.checked ? 1 : 0;
      });
      this.indeterminate2 = false;
      this.checkAll2 = e.target.checked;
    },
    //赋值表单
    async setForm(data) {
      let { data: item } = await main.find({ id: data.id });

      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = data[key];
        }
      }

      //   this.data = [...item]; //赋值表单的item
      for (const key of item) {
        for (const key2 of this.data) {
          if (key.field === key2.field) {
            key2.enrollId = key.enrollId;
            key2.id = key.id;
            key2.point = key.point;
            key2.required = key.required;
            key2.visible = key.visible;
          }
        }
      }
      if (data.datefrom) {
        this.cdata.date = [
          this.$moment(data.datefrom),
          this.$moment(data.dateto)
        ];
      }
      if (data.updatestarttime) {
        this.cdata.updata = [
          this.$moment(data.updatestarttime),
          this.$moment(data.updateendtime)
        ];
      }
    },
    //清空表单
    clearFrom() {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = undefined;
        }
      }
      // // console.log("数据是-----", this.data);
      this.data = this.data.map(item => {
        let obj = { ...item };
        obj.enrollId = "";
        obj.point = "";
        obj.id = "";
        obj.required = 0;
        obj.visible = 0;
        return obj;
      });
    },
    showDrawer(type, data) {
      this.formType = type;
      this.clearFrom();
      if (type === 2) {
        this.setForm(data).catch(err => {
          this.$message.error(err);
        });
      }
      this.visible = true;
    },
    onClose() {
      this.$refs.ruleForm.resetFields();
      this.visible = false;
    },
    //设置短地址
    setShortAddress(id) {},
    onSubmit() {
      // // console.log(JSON.stringify(this.data));
      this.$refs.ruleForm.validate(valid => {
        // // console.log(valid);
        if (valid) {
          this.loading = true;

          let enrollId = this.enrollId;
          let enrollTable = this.data.map(item => {
            let obj = { ...item };
            obj.enrollId = this.enrollId;
            obj.point = this.form.prompt;
            return obj;
          });
          let enrollTableParent = { ...this.form };
          enrollTableParent.createtime = this.$moment().format(
            "YYYY-MM-DD HH:mm:ss"
          );

          // // console.log({
          //   enrollId,
          //   enrollTable,
          //   enrollTableParent
          // });

          if (this.formType === 1) {
            // //赋值创建时间
            // formData.createtime = this.$moment().format(this.dateFormat);
            // //赋值学校id
            // formData.schoolId = this.$store.state.auth.schoolId;

            //添加
            main
              .add({
                enrollId,
                enrollTable,
                enrollTableParent
              })

              .then(res => {
                let id = res.data;
                main
                  .url({
                    id,
                    signupurl: `${this.schoolUrl}/phone/reportStudent/${this.enrollId}/1-0-0/${id}?schoolName=${this.schoolName}`,
                    updateurl: `${this.schoolUrl}/phone/reportStudent/${this.enrollId}/2-0-0/${id}?schoolName=${this.schoolName}`
                  })
                  .catch(err => {
                    this.$message.error("短地址添加失败");
                  });
                this.$message.success("表单设置添加成功");
                this.loading = false;
                //刷新列表
                this.reload();
                this.visible = false;
              })
              .catch(err => {
                this.$message.error(err);
                this.loading = false;
                if (err.indexOf("短地址") > -1) {
                  this.$message.success("添加成功");
                  this.loading = false;
                  //刷新列表
                  this.reload();
                  this.visible = false;
                }
              });
          } else if (this.formType === 2) {
            //修改
            main
              .edit({
                enrollId,
                enrollTable,
                enrollTableParent
              })
              .then(res => {
                this.$message.success("修改成功");
                this.loading = false;

                this.visible = false;
                //刷新列表
                this.reload();
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
    let url = process.env.QR_URL;
    //赋值二维码地址
    this.qrUrl = url;
    //#订阅消息----------
    //打开表单
  }
};
</script>
<style lang="scss" scoped>
.checkItem {
  float: left;
}
.switchItem {
  float: right;
}
.title-index {
  width: 85%;
  margin: 0 auto;
  height: 40px;
}
</style>

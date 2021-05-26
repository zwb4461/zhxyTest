<template>
  <div>
    <a-row>
      <a-col :span="19">
        <a-row>
          <a-col :span="6">
            <strong class="label">学生姓名:</strong>
            <span>{{ form.name }}</span>
          </a-col>
          <a-col :span="8">
            <strong class="label">出生日期:</strong>
            <span>{{ form.birthday }}</span>
          </a-col>
          <a-col :span="6">
            <strong class="label">性别:</strong>
            <span>{{ form.sex }}</span>
          </a-col>
          <a-col :span="4">
            <span class="type" v-if="form.tag">{{ form.tag }}</span>
          </a-col>
        </a-row>
        <hr class="hr" />
        <a-row>
          <a-col :span="6">
            <strong class="label">证件类型:</strong>
            <span>{{ form.idcardtype == 1 ? "居民身份证" : "其它" }}</span>
          </a-col>
          <a-col :span="18">
            <strong class="label">证件编号:</strong>
            <span>{{ form.idno }}</span>
          </a-col>
        </a-row>
        <hr class="hr" />
        <a-row>
          <a-col :span="6">
            <strong class="label">港澳台侨外:</strong>
            <span>{{ form.foreigntype }}</span>
          </a-col>
          <a-col :span="8">
            <strong class="label">民族:</strong>
            <span>{{ form.nation }}</span>
          </a-col>
          <a-col :span="6">
            <strong class="label">监护人:</strong>
            <span>{{ form.carer }}</span>
          </a-col>
        </a-row>
        <hr class="hr" />
        <a-row>
          <a-col :span="6">
            <strong class="label">国籍:</strong>
            <span>{{ form.country }}</span>
          </a-col>
          <a-col :span="8">
            <strong class="label">籍贯:</strong>
            <span>{{ form.hometown }}</span>
          </a-col>
          <a-col :span="6">
            <strong class="label">手机号:</strong>
            <span>{{ form.carerphone }}</span>
          </a-col>
        </a-row>
        <hr class="hr" />
        <a-row>
          <a-col :span="14">
            <strong class="label">特长:</strong>
            <span>{{ form.special }}</span>
          </a-col>
          <a-col :span="6">
            <strong class="label">免疫卡少几次:</strong>
            <span>{{ form.immuneless }}</span>
          </a-col>
        </a-row>
        <hr class="hr" />
        <a-row>
          <a-col :span="24">
            <strong class="label">毕业幼儿园:</strong>
            <span>{{ form.childhood }}</span>
          </a-col>
        </a-row>
        <hr class="hr" />
        <!-- <a-row>
          <a-col :span="24">
            <strong class="label">户籍所在地:</strong>
            <span>{{form.cityAll}}</span>
          </a-col>
        </a-row>-->
        <a-row>
          <a-col :span="24">
            <strong class="label">户籍详细地址:</strong>
            <span>{{ form.detailedAddress }}</span>
          </a-col>
        </a-row>
        <hr class="hr" />
        <a-row>
          <a-col :span="24">
            <strong class="label">户籍备注:</strong>
            <span>{{ form.homeRemark }}</span>
          </a-col>
        </a-row>
        <hr class="hr" />
        <a-row>
          <a-col :span="24">
            <strong class="label">现居住地址:</strong>
            <span>{{ form.address }}</span>
          </a-col>
        </a-row>
        <hr class="hr" />
        <a-row>
          <a-col :span="24">
            <strong class="label">产权证类型:</strong>
            <span>{{ form.housetype }}</span>
          </a-col>
        </a-row>
        <hr class="hr" />
        <a-row>
          <a-col :span="24">
            <strong class="label">房产证书:</strong>
            <span>{{ form.houseproof }}</span>
          </a-col>
        </a-row>
        <hr class="hr" />
        <a-row>
          <a-col :span="24">
            <strong class="label">产权地址:</strong>
            <span>{{ form.propertyAddress }}</span>
          </a-col>
        </a-row>
        <hr class="hr" />
        <a-row>
          <a-col :span="9">
            <strong class="label">产权获得日期:</strong>
            <span>{{ form.housedeadline }}</span>
          </a-col>
          <a-col :span="9">
            <strong class="label">所有权人(权利人):</strong>
            <span>{{ form.owner }}</span>
          </a-col>
          <a-col :span="6">
            <strong class="label">是否有房</strong>
            <span>{{ form.havehouse }}</span>
          </a-col>
        </a-row>
        <a-row style="margin-top:20px;">
          <a-col :span="2">
            <strong class="label">称谓</strong>
          </a-col>
          <a-col :span="3">
            <strong class="label">姓名</strong>
          </a-col>
          <a-col :span="5">
            <strong class="label">证件号</strong>
          </a-col>
          <a-col :span="4">
            <strong class="label">文化程度</strong>
          </a-col>
          <a-col :span="6">
            <strong class="label">工作单位</strong>
          </a-col>
          <a-col :span="4">
            <strong class="label">手机号码</strong>
          </a-col>
        </a-row>
        <hr class="hr" />
        <a-row>
          <a-col :span="2">
            <span>父</span>
          </a-col>
          <a-col :span="3">
            <span>{{ form.fathername }}</span>
          </a-col>
          <a-col :span="5">
            <span>{{ form.fatheridno }}</span>
          </a-col>
          <a-col :span="4">
            <span>{{ form.fatherdegree }}</span>
          </a-col>
          <a-col :span="6">
            <span>{{ form.fatherworkplace }}</span>
          </a-col>
          <a-col :span="4">
            <span>{{ form.fatherphone }}</span>
          </a-col>
        </a-row>
        <hr class="hr" />
        <a-row>
          <a-col :span="2">
            <span>母</span>
          </a-col>
          <a-col :span="3">
            <span>{{ form.mothername }}</span>
          </a-col>
          <a-col :span="5">
            <span>{{ form.motheridno }}</span>
          </a-col>
          <a-col :span="4">
            <span>{{ form.motherdegree }}</span>
          </a-col>
          <a-col :span="6">
            <span>{{ form.motherworkplace }}</span>
          </a-col>
          <a-col :span="4">
            <span>{{ form.motherphone }}</span>
          </a-col>
        </a-row>
        <hr class="hr" />
        <a-row>
          <a-col :span="2">
            <span>其他</span>
          </a-col>
          <a-col :span="3">
            <span>{{ form.othername }}</span>
          </a-col>
          <a-col :span="5">
            <span>{{ form.otheridno }}</span>
          </a-col>
          <a-col :span="4">
            <span>{{ form.otherdegree }}</span>
          </a-col>
          <a-col :span="6">
            <span>{{ form.otherworkplace }}</span>
          </a-col>
          <a-col :span="4">
            <span>{{ form.otherphone }}</span>
          </a-col>
        </a-row>
        <hr class="hr" />
        <a-row>
          <a-col :span="24">
            <strong class="label">家长备注:</strong>
            <span>{{ form.remark }}</span>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="5">
        <div class="leftItem">
          <vue-hover-mask @click="downloadQr(`add_0`)">
            <!-- 默认插槽 -->
            <div>
              <VueQr
                class="qr"
                :ref="`add_0`"
                :margin="10"
                :size="700"
                :text="
                  `${schoolUrl}dd-login?type=1&enrollId=${form.enrollId}&formType=3-${form.name}-${form.idno}&id=${form.id}&schoolId=${schoolId}`
                "
              />
            </div>

            <!-- action插槽 -->
            <template v-slot:action>下载</template>
          </vue-hover-mask>
        </div>
        <div class="leftItem">
          <el-button
            size="mini"
            class="btnClass"
            icon="el-icon-printer"
            @click="printForm"
            >打印</el-button
          >
        </div>
        <div class="leftItem">
          <template v-if="form.status === 1">
            <el-button
              class="btnClass"
              type="success"
              size="mini"
              icon="check-circle"
              theme="filled"
              @click="pop.form = true"
              >审核通过</el-button
            >
          </template>
          <template v-else-if="form.status === 2">
            <el-button
              class="btnClass"
              size="mini"
              type="danger"
              theme="filled"
              @click="pop.form = true"
              >审核未通</el-button
            >
          </template>
          <template v-else>
            <el-button
              class="btnClass"
              type="primary"
              size="mini"
              icon="el-icon-circle-check"
              theme="filled"
              @click="pop.form = true"
              >审核</el-button
            >
          </template>
        </div>
      </a-col>
    </a-row>

    <a-modal
      title="学生审核"
      :visible="pop.form"
      :confirmLoading="loading"
      @cancel="pop.form = false"
    >
      <a-textarea
        :rows="8"
        placeholder="备注"
        v-model="check.checkerRemark"
      ></a-textarea>
      <div slot="footer">
        <a-button @click="checkType(2)">审核不通过</a-button>
        <a-button type="primary" @click="checkType(1)">审核通过</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
//组件
import vueHoverMask from "~/components/common/vueHoverMask.vue";

//数据
import { foreigntype, nation, country, degree, houseType } from "~/utils/data";

//接口
import main from "~/api/check";

export default {
  components: {
    vueHoverMask
  },
  props: {
    toPrint: Function,
    btnLoading: Function
    // //学生类型id
    // enrollId: {
    //   type: Number,
    //   default: -1
    // }
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
  data() {
    return {
      qrUrl: "", //二维码链接地址
      //审核信息
      check: {
        id: "",
        checkerRemark: ""
      },
      pop: {
        form: false
      },
      loading: false,
      select: {
        houseType: [
          { text: "不动产权证书", v: "1" },
          { text: "房地产权证", v: "2" }
        ],
        special: ["唱歌", "跳舞", "音乐"],
        foreigntype,
        houseType,
        country: [],
        nation,
        degree,
        trueOrfalse: [
          { text: "是", v: true },
          { text: "否", v: false }
        ],
        idcardtype: [
          { text: "居民身份证", v: "1" },
          { text: "其它", v: "2" }
        ]
      },
      houseType: 1,
      form: {
        id: undefined,

        name: undefined,

        address: undefined,

        birthday: undefined,

        carer: undefined,

        carerphone: undefined,

        childhood: undefined,

        country: undefined,

        enrollId: undefined,

        fatherdegree: undefined,

        fathername: undefined,

        fatherphone: undefined,

        fatheridno: undefined, //父亲证件编号

        fatherworkplace: undefined,

        foreigntype: undefined,

        homeRemark: undefined,

        hometown: undefined,

        housedeadline: undefined,

        houseproof: undefined,

        idcardtype: undefined,

        idno: undefined,

        immuneless: undefined,

        motherdegree: undefined,

        mothername: undefined,

        motheridno: undefined, //母亲证件号码

        motherphone: undefined,

        motherworkplace: undefined,

        nation: undefined,

        otherdegree: undefined,

        othername: undefined,

        otheridno: undefined, //其它证件号

        otherphone: undefined,

        otherworkplace: undefined,

        owner: undefined,

        province: undefined,

        rank: undefined,

        rankUnionid: undefined,

        remark: undefined,

        sex: undefined,

        special: undefined,

        street: undefined,

        tag: undefined,

        unmovabledeadline: undefined,

        unmovableproof: undefined,

        village: undefined,

        housetype: undefined,

        sourcetype: undefined, //生源类型
        // 新增字段
        detailedAddress: undefined, //户籍详细地址
        propertyAddress: undefined, //产权地址
        havehouse: undefined, //是否有房
        status: undefined //是否有房
      },
      printData: ""
    };
  },
  methods: {
    //下载二维码
    downloadQr(className) {
      const iconUrl = this.$refs[className].$el.src;
      let a = document.createElement("a");
      let event = new MouseEvent("click");
      a.download = "二维码";
      a.href = iconUrl;
      a.dispatchEvent(event);
    },
    setForm(data) {
      this.printData = data;
      this.check.checkerRemark = data.checkerRemark;
      this.check.id = data.id;
      //   this.check.id = data.id;
      // console.log("传过来的数据------", data);
      for (var key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = data[key];
        }
      }
      //生日
      this.form.birthday = this.$moment(data.birthday).format("YYYY-MM-DD");
      //性别
      this.form.sex = data.sex === 1 ? "男" : "女";
      //户籍地址
      //   this.form.cityAll = `${data.province}/${data.street}/${data.village}`;
      //使用期限
      if (data.housedeadline) {
        this.form.housedeadline = this.$moment(data.housedeadline).format(
          "YYYY-MM-DD"
        );
      }

      if (data.idcardtype) {
        this.form.idcardtype = this.select.idcardtype.find(
          item => item.v == data.idcardtype
        ).text;
      }

      if (data.foreigntype || data.foreigntype === 0) {
        this.form.foreigntype = this.select.foreigntype.find(
          item => item.v == data.foreigntype
        ).text;
      }
      if (data.housetype || data.housetype === 0) {
        // console.error(this.select.houseType);
        this.form.housetype = this.select.houseType.find(
          item => item.v == data.housetype
        ).text;
      }

      //   if (data.nation) {
      //     this.form.nation = this.select.nation.find(
      //       item => item.v == data.nation
      //     ).text;
      //   }
      //   debugger;

      if (data.havehouse) {
        this.form.havehouse = data.havehouse == 1 ? "是" : "否";
      }

      if (data.country) {
        // debugger;
        // this.form.country = this.select.country.find(
        //   item => item.v == data.country
        // ).text;
        this.form.country = data.country;
      }

      if (data.fatherdegree) {
        this.form.fatherdegree = this.select.degree.find(
          item => item.v == data.fatherdegree
        ).text;
      }

      if (data.motherdegree) {
        this.form.motherdegree = this.select.degree.find(
          item => item.v == data.motherdegree
        ).text;
      }

      if (data.otherdegree) {
        let info = this.select.degree.find(item => item.v == data.otherdegree);
        this.form.otherdegree = info ? info.text : "";
      }
      this.form.homeRemark = data.homeRemark;

      // console.log("改造后的数据--------", this.form);
    },
    checkType(type) {
      this.submit(type);
    },
    //提交审核信息
    submit(type) {
      this.loading = true;
      let formData = { ...this.check };
      formData.checkerUnionid = this.unionid;
      formData.status = type;
      main
        .edit(formData)
        .then(res => {
          if (type === 1) {
            this.$message.success("审核成功");
          }
          this.pop.form = false;
          this.form.status = type;
          this.btnLoading(false);
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //打印表单
    printForm() {
      this.toPrint([this.printData]);
    }
  },
  created() {
    let url = process.env.QR_URL;
    //赋值二维码地址
    this.qrUrl = url;
    // // console.log("二维码地址是------------", url);
    country()
      .then(res => {
        // // console.log("res--------------", res);
        this.select.country = res;
        // // console.log("gujiaosddhdhdhddhh--------------", this.setting.country);
      })
      .catch(err => {
        this.$message.error(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.label {
  font-weight: border;
  color: black;
}
.type {
  display: inline-block;
  background: #51b337;
  width: 70px;
  color: white;
  height: 20px;
  line-height: 19px;
  font-size: 12px;
  border-radius: 10px;
  text-align: center;
}
span {
  color: #565050;
  font-weight: 500;
}
.hr {
  margin-top: 12px;
  margin-bottom: 12px;
  border: 1px solid #918d8c;
}
.qr {
  width: 110px;
  height: 110px;
  margin: 0 auto;
}
.leftItem {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.btnClass {
  width: 110px;
  text-align: center;
}
</style>

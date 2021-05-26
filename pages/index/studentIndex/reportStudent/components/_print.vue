<template>
  <div>
    <div ref="prints" class="book">
      <div class="page" v-for="(form, idx) in printData" :key="idx">
        <div class="main-box">
          <h1 class="schoolTitle">{{ schoolName }}</h1>
          <h3 class="title">{{ title }}&nbsp;&nbsp;报名信息登记表</h3>
          <div class="box">
            <div class="box-idx">
              <div class="item">
                <strong class="label">学生姓名:</strong>
                <span>{{ form.name }}</span>
              </div>
              <div class="item">
                <strong class="label">出生日期:</strong>
                <span>{{ form.birthday }}</span>
              </div>
              <div class="item">
                <strong class="label">性别:</strong>
                <span>{{ form.sex }}</span>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
              <div class="item">
                <strong class="label">证件类型:</strong>
                <span>{{ form.idcardtype == 1 ? "居民身份证" : "其它" }}</span>
              </div>
              <div class="item2">
                <strong class="label">证件编号:</strong>
                <span>{{ form.idno }}</span>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
              <div class="item">
                <strong class="label">港澳台侨外:</strong>
                <span>{{ form.foreigntype }}</span>
              </div>
              <div class="item">
                <strong class="label">民族:</strong>
                <span>{{ form.nation }}</span>
              </div>
              <div class="item">
                <strong class="label">监护人:</strong>
                <span>{{ form.carer }}</span>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
              <div class="item">
                <strong class="label">国籍:</strong>
                <span>{{ form.country }}</span>
              </div>
              <div class="item">
                <strong class="label">籍贯:</strong>
                <span>{{ form.hometown }}</span>
              </div>
              <div class="item">
                <strong class="label">手机号:</strong>
                <span>{{ form.carerphone }}</span>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
              <div class="item">
                <strong class="label">特长:</strong>
                <span>{{ form.special }}</span>
              </div>
              <div class="item"></div>
              <div class="item">
                <strong class="label">免疫卡少几次:</strong>
                <span>{{ form.immuneless }}</span>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
              <div class="full">
                <strong class="label">毕业幼儿园:</strong>
                <span>{{ form.childhood }}</span>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
              <div class="full">
                <strong class="label">户籍所在地:</strong>
                <span>{{ form.cityAll }}</span>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
              <div class="full">
                <strong class="label">户籍备注:</strong>
                <span>{{ form.homeRemark }}</span>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
              <div class="full">
                <strong class="label">现居住地址:</strong>
                <span>{{ form.address }}</span>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
              <div class="full">
                <strong class="label">产权证类型:</strong>
                <span>{{ form.housetype }}</span>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
              <div class="full">
                <strong class="label">房产证书:</strong>
                <span>{{ form.houseproof }}</span>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
              <div class="full">
                <strong class="label">产权地址:</strong>
                <span>{{ form.propertyAddress }}</span>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
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
            </div>
            <div class="box-idx" style="margin-top:40px;">
              <hr class="hr" />

              <div class="ta1">
                <strong class="label">称谓</strong>
              </div>
              <div class="ta1">
                <strong class="label">姓名</strong>
              </div>
              <div class="ta2">
                <strong class="label">证件号</strong>
              </div>
              <div class="ta1">
                <strong class="label">文化程度</strong>
              </div>
              <div class="ta2">
                <strong class="label">工作单位</strong>
              </div>
              <div class="ta2">
                <strong class="label">手机号码</strong>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
              <div class="ta1">
                <span>父</span>
              </div>
              <div class="ta1">
                <span>{{ form.fathername }}</span>
              </div>
              <div class="ta2">
                <span>{{ form.fatheridno }}</span>
              </div>
              <div class="ta1">
                <span>{{ form.fatherdegree }}</span>
              </div>
              <div class="ta2">
                <span>{{ form.fatherworkplace }}</span>
              </div>
              <div class="ta2">
                <span>{{ form.fatherphone }}</span>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
              <div class="ta1">
                <span>母</span>
              </div>
              <div class="ta1">
                <span>{{ form.mothername }}</span>
              </div>
              <div class="ta2">
                <span>{{ form.motheridno }}</span>
              </div>
              <div class="ta1">
                <span>{{ form.motherdegree }}</span>
              </div>
              <div class="ta2">
                <span>{{ form.motherworkplace }}</span>
              </div>
              <div class="ta2">
                <span>{{ form.motherphone }}</span>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
              <div class="ta1">
                <span>其他</span>
              </div>
              <div class="ta1">
                <span>{{ form.othername }}</span>
              </div>
              <div class="ta2">
                <span>{{ form.otheridno }}</span>
              </div>
              <div class="ta1">
                <span>{{ form.otherdegree }}</span>
              </div>
              <div class="ta2">
                <span>{{ form.otherworkplace }}</span>
              </div>
              <div class="ta2">
                <span>{{ form.otherphone }}</span>
              </div>
            </div>
            <hr class="hr" />
            <div class="box-idx">
              <div class="full">
                <strong class="label">家长备注:</strong>
                <span>{{ form.remark }}</span>
              </div>
            </div>
            <div class="box-idx">
              <div class="box-foot1">
                <VueQr
                  class="qr"
                  :ref="`add_0`"
                  :margin="10"
                  :size="700"
                  :text="
                    `${schoolUrl}dd-login?type=1&enrollId=${form.enrollId}&formType=3-${form.name}-${form.idno}&id=${form.id}&schoolId=${schoolId}`
                  "
                />
                <!-- :text="`${qrUrl}/phone/reportStudent/${form.enrollId}/3-${form.name}-${form.idno}/${form.id}`" -->
              </div>
              <div class="box-foot2">
                {{ $moment().format("YYYY 年 MM 月 DD 日 HH : mm") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-modal
      title="学生审核"
      :visible="pop.form"
      :confirmLoading="loading"
      @cancel="pop.form = false"
    >
      <a-textarea :rows="8" v-model="check.checkRemark"></a-textarea>
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
    title: String
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
      qrUrl: "",
      //审核信息
      check: {
        id: "",
        checkRemark: ""
      },
      pop: {
        form: false
      },
      loading: false,
      select: {
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
      form: {},
      printData: []
    };
  },
  created() {
    let url = process.env.QR_URL;
    //赋值二维码地址
    this.qrUrl = url;

    country()
      .then(res => {
        // // console.log("res--------------", res);

        this.select.country = res;
        // // console.log("gujiaosddhdhdhddhh--------------", this.setting.country);
      })
      .catch(err => {
        this.$message.error(err);
      });
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
    printContext() {
      this.$print(this.$refs.prints);
    },
    setForm(list) {
      //   this.check.id = data.id;
      // console.log("传过来的数据------", list);

      this.printData = list.map(data => {
        let form = { ...data };
        //生日
        form.birthday = this.$moment(data.birthday).format("YYYY-MM-DD");
        //性别
        form.sex = data.sex === 1 ? "男" : "女";
        //户籍地址
        //   this.form.cityAll = `${data.province}/${data.street}/${data.village}`;
        //使用期限
        if (data.housedeadline) {
          form.housedeadline = this.$moment(data.housedeadline).format(
            "YYYY-MM-DD"
          );
        }

        if (data.idcardtype) {
          form.idcardtype = this.select.idcardtype.find(
            item => item.v == data.idcardtype
          ).text;
        }

        if (data.foreigntype || data.foreigntype === 0) {
          form.foreigntype = this.select.foreigntype.find(
            item => item.v == data.foreigntype
          ).text;
        }
        if (data.housetype || data.housetype === 0) {
          // console.error(this.select.houseType);
          form.housetype = this.select.houseType.find(
            item => item.v == data.housetype
          ).text;
        }

        if (data.nation) {
          form.nation = this.select.nation.find(
            item => item.v == data.nation
          ).text;
        }
        //   debugger;

        if (data.havehouse) {
          form.havehouse = data.havehouse == 1 ? "是" : "否";
        }

        if (data.country) {
          // debugger;
          // this.form.country = this.select.country.find(
          //   item => item.v == data.country
          // ).text;
          form.country = data.country;
        }

        if (data.fatherdegree) {
          form.fatherdegree = this.select.degree.find(
            item => item.v == data.fatherdegree
          ).text;
        }

        if (data.motherdegree) {
          form.motherdegree = this.select.degree.find(
            item => item.v == data.motherdegree
          ).text;
        }

        if (data.otherdegree) {
          let info = this.select.degree.find(
            item => item.v == data.otherdegree
          );
          form.otherdegree = info ? info.text : "";
        }
        form.homeRemark = data.homeRemark;

        return form;
      });

      setTimeout(() => {
        this.printContext();
      }, 2000);
    },
    checkType(type) {
      this.submit(type);
    },
    //提交审核信息
    submit(type) {
      if (this.check.checkRemark) {
        this.loading = true;
        let formData = { ...this.check };
        formData.checkerUnionid = this.unionid;
        formData.status = type;
        main
          .edit(formData)
          .then(res => {
            this.$message.success("审核成功");
          })
          .catch(err => {});
      } else {
        this.$message.error("请填写审核信息");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #fafafa;
  font: 12pt "Tahoma";
}
* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.book {
  display: none;
}
.page {
  position: relative;
  width: 21cm;
  min-height: 29.7cm;
  padding: 2cm;
  margin: 1cm auto;
  border: 1px #d3d3d3 solid;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.main-box {
  width: 100%;
  position: relative;
  left: 15px;
}
.subpage {
  padding: 1cm;
  border: 5px red solid;
  height: 256mm;
  outline: 2cm #ffeaea solid;
}

@page {
  size: A4;
  margin: 0;
}
@media print {
  .book {
    display: block;
  }
  .title {
    width: 100%;
    text-align: center;

    height: 50px;
    line-height: 50px;
  }

  .page {
    position: relative;
    margin: 0;
    border: initial;
    border-radius: initial;
    width: initial;
    min-height: initial;
    box-shadow: initial;
    background: initial;
    page-break-after: always;
  }
}

@media print {
}
.page {
  width: 210mm;
  height: 297mm;
}
.box {
  width: 100%;
  height: 100%;
  .box-idx {
    width: 100%;
    height: 25px;
    line-height: 25px;
    .item {
      width: 30%;
      display: inline-block;
    }
    .full {
      width: 100%;
      display: inline-block;
    }
    .item2 {
      width: 60%;
      display: inline-block;
    }
    .item3 {
      width: 30%;
      display: inline-block;
    }
    .ta1 {
      text-align: center;
      width: 10%;
      display: inline-block;
    }
    .ta2 {
      text-align: center;

      width: 20%;
      display: inline-block;
    }
    .ta3 {
      text-align: center;

      width: 30%;
      display: inline-block;
    }
    .foot {
      margin-top: 20px;
      width: 49%;
      display: inline-block;
      height: 112px;
      line-height: 112px;
      text-align: center;
    }
  }
}
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
  margin-top: 6px;
  margin-bottom: 6px;
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
}
.schoolTitle {
  text-align: center;
}
.box-foot1 {
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: -180px;
  left: 0px;
}
.box-foot2 {
  text-align: right;
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: -220px;
  right: 0px;
}
</style>

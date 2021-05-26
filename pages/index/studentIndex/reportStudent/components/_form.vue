<template>
  <div>
    <a-form-model
      ref="ruleForm"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :model="form"
      :rules="rules"
    >
      <a-divider orientation="left">学生信息填写</a-divider>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="学生姓名" prop="name">
            <a-input v-model="form.name" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="出生日期" prop="birthday">
            <a-date-picker v-model="data.birthday" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="性别" prop="sex">
            <a-radio-group name="sex" v-model="data.sex">
              <a-radio :value="true">男</a-radio>
              <a-radio :value="false">女</a-radio>
            </a-radio-group>
            <!-- <a-switch v-model="data.sex" checkedChildren="男" unCheckedChildren="女" defaultChecked /> -->
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="证件类型" prop="idcardtype">
            <a-select v-model="form.idcardtype" placeholder="请选择">
              <a-select-option v-for="item in setting.idcardtype" :key="item.v">{{ item.n }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="16">
          <a-form-model-item
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 18 }"
            label="证件编号"
            prop="idno"
          >
            <a-input v-model="form.idno" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="是否单亲" prop="isdq">
            <a-radio-group name="isdq" v-model="data.isdq">
              <a-radio :value="true">是</a-radio>
              <a-radio :value="false">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="港澳台侨外">
            <a-select v-model="form.foreigntype" placeholder="请选择">
              <a-select-option v-for="item in setting.foreigntype" :key="item.v">{{ item.text }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="民族">
            <a-select v-model="form.nation" placeholder="请选择">
              <a-select-option v-for="item in setting.nation" :key="item.text">{{ item.text }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="监护人" prop="carer">
            <a-input v-model="form.carer" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="国籍">
            <a-select
              show-search
              :filter-option="filterOption"
              option-filter-prop="children"
              v-model="form.country"
              placeholder="请选择"
            >
              <a-select-option v-for="item in setting.country" :key="item.v">
                {{
                item.text
                }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="籍贯">
            <a-input v-model="form.hometown" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="手机号码" prop="carerphone">
            <a-input v-model="form.carerphone" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="生源类型">
            <!-- <a-input v-model="form.sourcetype" placeholder="请选择"></a-input> -->
            <a-select v-model="form.sourcetype" placeholder="请选择">
              <a-select-option v-for="item in setting.sourcetype" :key="item.v">{{ item.text }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="毕业幼儿园">
            <a-input v-model="form.childhood" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="免疫卡少几次" prop="immuneless">
            <a-input-number
              style="width:100%"
              v-model="form.immuneless"
              :formatter="value => `${value}次`"
              :parser="value => value.replace('次', '')"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-model-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" label="特长">
            <a-select v-model="data.special" placeholder="请选择" mode="multiple">
              <a-select-option v-for="item in setting.special" :key="item">
                {{
                item
                }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <!-- <a-row>
        <a-col :span="24">
          <a-form-model-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" label="户籍地">
            <a-cascader v-model="setting.val.city" :options="setting.city" placeholder="选择省市区" />

          </a-form-model-item>
        </a-col>
      </a-row>-->
      <a-row>
        <a-col :span="24">
          <a-form-model-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" label="户籍详细地">
            <a-input v-model="form.detailedAddress" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-model-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" label="户籍备注">
            <a-textarea
              :autoSize="{ minRows: 2, maxRows: 10 }"
              v-model="form.homeRemark"
              placeholder="请输入"
            ></a-textarea>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-form-model-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" label="现居地址">
            <!-- <a-input-group compact>
              <a-cascader
                style="width: 40%"
                v-model="data.address"
                :options="setting.city"
                placeholder="选择省市区"
            />-->
            <a-input v-model="form.address" placeholder="请输入"></a-input>
            <!-- </a-input-group> -->
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="产权类型">
            <a-select v-model="form.housetype" placeholder="请选择">
              <a-select-option v-for="item in setting.houseType" :key="item.v">{{ item.text }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="16">
          <a-form-model-item :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" label="产权证号">
            <a-input v-model="form.houseproof" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="产权获得日期">
            <a-date-picker style="width:100%;" v-model="setting.val.housedeadline"></a-date-picker>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="所有人(权利人)">
            <a-input v-model="form.owner" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="是否有房">
            <!-- <a-input v-model="form.havehouse" placeholder="请输入"></a-input> -->
            <a-radio-group v-model="form.havehouse">
              <a-radio :value="'0'">否</a-radio>
              <a-radio :value="'1'">是</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="落户日期">
            <a-date-picker style="width:100%;" v-model="setting.val.lhrq"></a-date-picker>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="户主姓名">
            <a-input v-model="form.hzxm" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="户口类型">
            <a-input v-model="form.hklx" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="与户主关系">
            <a-input v-model="form.yhzgx" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="同街道内迁户记录">
            <a-input v-model="form.tjdnqhjl" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="房产拥有形式">
            <a-input v-model="form.fcyyxs" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="房产拥有人姓名">
            <a-input v-model="form.owner" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="房产拥有人身份证">
            <a-input v-model="form.owneridno" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="拥有比例">
            <a-input v-model="form.yybl" placeholder="请输入"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-model-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" label="产权地址">
            <a-textarea
              :autoSize="{ minRows: 2, maxRows: 10 }"
              v-model="form.propertyAddress"
              placeholder="请输入"
            ></a-textarea>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-divider orientation="left">联系人信息填写</a-divider>
      <a-row :gutter="8" style="text-align:center;">
        <a-col :span="4">称谓</a-col>
        <a-col :span="3">姓名</a-col>
        <a-col :span="3">文化程度</a-col>
        <a-col :span="4">证件号码</a-col>
        <a-col :span="5">工作单位</a-col>
        <a-col :span="5">手机号码</a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col
          :span="4"
          style="text-align:center;line-height:40px;color: black;font-weight: bolder;"
        >父</a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.fathername" placeholder="名字"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-select v-model="form.fatherdegree" placeholder="请选择">
              <a-select-option v-for="item in setting.degree" :key="item.v">
                {{
                item.text
                }}
              </a-select-option>
            </a-select>
            <!-- <a-input v-model="form.fatherdegree" placeholder="文化程度"></a-input> -->
          </a-form-model-item>
        </a-col>
        <a-col :span="4">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.fatheridno" placeholder="证件号码"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="5">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.fatherworkplace" placeholder="工作单位"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="5">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.fatherphone" placeholder="电话"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row :gutter="8">
        <a-col
          :span="4"
          style="text-align:center;line-height:40px;color: black;font-weight: bolder;"
        >母</a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.mothername" placeholder="名字"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-select v-model="form.motherdegree" placeholder="请选择">
              <a-select-option v-for="item in setting.degree" :key="item.v">
                {{
                item.text
                }}
              </a-select-option>
            </a-select>
            <!-- <a-input v-model="form.motherdegree" placeholder="文化程度"></a-input> -->
          </a-form-model-item>
        </a-col>
        <a-col :span="4">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.motheridno" placeholder="证件号码"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="5">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.motherworkplace" placeholder="工作单位"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="5">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.motherphone" placeholder="电话"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row :gutter="8">
        <a-col
          :span="4"
          style="text-align:center;line-height:40px;color: black;font-weight: bolder;"
        >其他</a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.othername" placeholder="名字"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-select v-model="form.otherdegree" placeholder="请选择">
              <a-select-option v-for="item in setting.degree" :key="item.v">
                {{
                item.text
                }}
              </a-select-option>
            </a-select>
            <!-- <a-input v-model="form.otherdegree" placeholder="文化程度"></a-input> -->
          </a-form-model-item>
        </a-col>
        <a-col :span="4">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.otheridno" placeholder="证件号码"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="5">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.otherworkplace" placeholder="工作单位"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="5">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.otherphone" placeholder="电话"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row :gutter="8">
        <a-col
          :span="4"
          style="text-align:center;line-height:40px;color: black;font-weight: bolder;"
        ></a-col>
        <a-col :span="10">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.withStudent" placeholder="请输入与学生关系"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.jhxcyy" placeholder="请输入监护形成原因"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-form-model-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" label="家长备注">
            <a-textarea
              :autoSize="{ minRows: 5, maxRows: 10 }"
              v-model="form.remark"
              placeholder="请输入"
            ></a-textarea>
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- <a-form-model-item :wrapper-col="{ span: 8, offset: 8 }">
        <a-button type="primary" @click="onSubmit">保存</a-button>
      </a-form-model-item>-->
    </a-form-model>
  </div>
</template>
<script>
//配置js
import city from "~/utils/area_city";
import {
  foreigntype,
  nation,
  country as getCountry,
  degree,
  special,
  sourcetype,
  houseType,
} from "~/utils/data";

//组件

//接口
import main from "~/api/reportStudent";

export default {
  props: {
    btnLoading: Function, //按钮加载与不加载
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
  },
  data() {
    return {
      lock: false, //是否锁住
      //表单类型(1是新增 , 2是修改)
      formType: 1,
      labelCol: { span: 12 },
      wrapperCol: { span: 12 },
      dateFormat: "YYYY-MM-DD HH:mm:ss", //日期默认格式
      setting: {
        val: {
          city: [], //户籍省市区
          address: [], //地址省市区
          houseType: 1, //房产证类型
          unmovabledeadline: [], //使用期限
          housedeadline: undefined, //产权获得日期
          lhrq: undefined,
        },
        city: city.options,
        houseType,
        special,
        foreigntype,
        country: [],
        nation,
        degree,
        sourcetype,
        trueOrfalse: [
          { n: "是", v: true },
          { n: "否", v: false },
        ],
        idcardtype: [
          { n: "居民身份证", v: "1" },
          { n: "其它", v: "2" },
        ],
        sex: [
          { n: "选项1", v: 1 },
          { n: "选项2", v: 2 },
          { n: "选项3", v: 3 },
        ],
      },
      //需要特殊处理的数据
      data: {
        birthday: undefined, //出生日期
        sex: true, //性别
        special: [], //特长
        address: [], //地址
        isdq: true,
      },
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
        lhrq: undefined,
        hzxm: "",
        hklx: "",
        yhzgx: "",
        tjdnqhjl: "",
        fcyyxs: "",
        owner: "",
        owneridno: "",
        yybl: "",
        isdq: undefined,
        withStudent: "",
        jhxcyy: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],

        address: [
          {
            required: true,
            message: "请输入现居住地",
            trigger: "blur",
          },
        ],

        birthday: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],

        carer: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],

        carerphone: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],

        childhood: [
          {
            required: true,
            message: "请输入毕业幼儿园",
            trigger: "blur",
          },
        ],

        country: [
          {
            required: true,
            message: "请输入国籍",
            trigger: "blur",
          },
        ],

        enrollId: [
          {
            required: true,
            message: "请输入对应enrollId",
            trigger: "blur",
          },
        ],

        fatherdegree: [
          {
            required: true,
            message: "请输入父亲文化程度",
            trigger: "blur",
          },
        ],

        fathername: [
          {
            required: true,
            message: "请输入父亲名字",
            trigger: "blur",
          },
        ],

        fatherphone: [
          {
            required: true,
            message: "请输入父亲电话",
            trigger: "blur",
          },
        ],

        fatherworkplace: [
          {
            required: true,
            message: "请输入父亲工作单位",
            trigger: "blur",
          },
        ],

        foreigntype: [
          {
            required: true,
            message: "请输入学生id",
            trigger: "blur",
          },
        ],

        homeRemark: [
          {
            required: true,
            message: "请输入户籍所在备注",
            trigger: "blur",
          },
        ],

        hometown: [
          {
            required: true,
            message: "请输入家乡",
            trigger: "blur",
          },
        ],

        housedeadline: [
          {
            required: true,
            message: "请输入产权获得日期",
            trigger: "blur",
          },
        ],

        lhrq: [
          {
            required: true,
            message: "请输入落户日期",
            trigger: "blur",
          },
        ],

        houseproof: [
          {
            required: true,
            message: "请输入房产证",
            trigger: "blur",
          },
        ],

        idcardtype: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],

        idno: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],

        immuneless: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],

        motherdegree: [
          {
            required: true,
            message: "请输入母亲文化程度",
            trigger: "blur",
          },
        ],

        mothername: [
          {
            required: true,
            message: "请输入母亲名字",
            trigger: "blur",
          },
        ],

        motherphone: [
          {
            required: true,
            message: "请输入母亲电话号码",
            trigger: "blur",
          },
        ],

        motherworkplace: [
          {
            required: true,
            message: "请输入母亲工作单位",
            trigger: "blur",
          },
        ],

        nation: [
          {
            required: true,
            message: "请输入民族",
            trigger: "blur",
          },
        ],

        otherdegree: [
          {
            required: true,
            message: "请输入其他联系人文化程度",
            trigger: "blur",
          },
        ],

        othername: [
          {
            required: true,
            message: "请输入其他联系人名字",
            trigger: "blur",
          },
        ],

        otherphone: [
          {
            required: true,
            message: "请输入其他联系人电话号码",
            trigger: "blur",
          },
        ],

        otherworkplace: [
          {
            required: true,
            message: "请输入其他联系人工作单位",
            trigger: "blur",
          },
        ],

        owner: [
          {
            required: true,
            message: "请输入所有权人",
            trigger: "blur",
          },
        ],

        province: [
          {
            required: true,
            message: "请输入省份",
            trigger: "blur",
          },
        ],

        rank: [
          {
            required: true,
            message: "请输入等级",
            trigger: "blur",
          },
        ],

        rankUnionid: [
          {
            required: true,
            message: "请输入对应enrollId",
            trigger: "blur",
          },
        ],

        remark: [
          {
            required: true,
            message: "请输入家长备注",
            trigger: "blur",
          },
        ],

        sex: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],

        isdq: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],

        special: [
          {
            required: true,
            message: "请输入特长",
            trigger: "blur",
          },
        ],

        street: [
          {
            required: true,
            message: "请输入乡镇",
            trigger: "blur",
          },
        ],

        tag: [
          {
            required: true,
            message: "请输入学生标签",
            trigger: "blur",
          },
        ],

        unmovabledeadline: [
          {
            required: true,
            message: "请输入使用期限",
            trigger: "blur",
          },
        ],

        unmovableproof: [
          {
            required: true,
            message: "请输入不动产权证书",
            trigger: "blur",
          },
        ],

        village: [
          {
            required: true,
            message: "请输入村",
            trigger: "blur",
          },
        ],
        city: [
          {
            required: true,
            message: "请输入省市区",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    "data.birthday"(nv) {
      if (nv) {
        this.form.birthday = this.$moment(nv).format("YYYY-MM-DD");
      } else {
        this.form.birthday = "";
      }
    },
    "data.sex"(nv) {
      if (nv) {
        this.form.sex = 1;
      } else {
        this.form.sex = 2;
      }
    },
    "data.isdq"(nv) {
      if (nv) {
        this.form.isdq = 1;
      } else {
        this.form.isdq = 0;
      }
    },
    "data.special"(nv) {
      if (nv.length > 0) {
        this.form.special = nv.join(",");
      } else {
        this.form.special = "";
      }
    },

    // //监听户籍选择
    // "setting.val.city"(nv) {
    //   //   // console.log(nv);

    //   this.data.address = [...nv];

    //   if (nv) {
    //     this.form.province = nv[0];
    //     this.form.street = nv[1];
    //     this.form.village = nv[2];
    //   } else {
    //     this.form.province = "";
    //     this.form.street = "";
    //     this.form.village = "";
    //   }
    // },
    // //监听使用期限
    // "setting.val.unmovabledeadline"(nv) {
    //   // console.log(nv);
    //   if (nv) {
    //     this.form.unmovabledeadline = `${this.$moment(nv[0]).format(
    //       "YYYY-MM-DD"
    //     )} ~ ${this.$moment(nv[1]).format("YYYY-MM-DD")}`;
    //   } else {
    //     this.form.unmovabledeadline = "";
    //   }
    // },
    "setting.val.housedeadline"(nv) {
      if (nv) {
        this.form.housedeadline = this.$moment(nv).format("YYYY-MM-DD");
      } else {
        this.form.housedeadline = "";
      }
    },

    "setting.val.lhrq"(nv) {
      if (nv) {
        this.form.lhrq = this.$moment(nv).format("YYYY-MM-DD");
      } else {
        this.form.lhrq = "";
      }
    },
  },
  created() {
    //   获取参数
    getCountry()
      .then((res) => {
        // // console.log("res--------------", res);
        this.setting.country = res;
        // // console.log("gujiaosddhdhdhddhh--------------", this.setting.country);
      })
      .catch((err) => {
        this.$message.error(err);
      });
  },
  mounted() {},
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    setForm(data) {
      this.lock = true;
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          if (key === "birthday") {
            if (data[key]) {
              let time = this.$moment(data[key]);
              this.data.birthday = time;
              this.form.birthday = time.format("YYYY-MM-DD");
            }
          } else if (key === "sex") {
            if (data[key]) {
              let sex = data[key];
              this.data.sex = sex === 1 ? true : false;
              this.form.sex = sex;
            }
          } else if (key === "special") {
            if (data[key]) {
              let special = data[key];
              this.data.special = special.split(",");
              this.form.special = special;
            }
          } else if (key === "isdq") {
            let isdq = data[key];
            this.data.isdq = isdq === 1 ? true : false;
            this.form.isdq = isdq;
          }
          //   else if (key === "province") {
          //     if (data[key]) {
          //       let province = data[key];
          //       this.setting.val.city = [
          //         data.province,
          //         data.street,
          //         data.village
          //       ];
          //       this.form.province = province;
          //     }
          //   }
          //   else if (key === "unmovabledeadline") {
          //     if (data.unmovabledeadline) {
          //       let unmovabledeadline = data.unmovabledeadline.split(" ~ ");
          //       this.setting.val.unmovabledeadline = [
          //         this.$moment(unmovabledeadline[0]),
          //         this.$moment(unmovabledeadline[1])
          //       ];
          //       this.form.unmovabledeadline = data.unmovabledeadline;
          //     }
          //   }
          else {
            this.form[key] = data[key];
          }
        }
      }

      //   setTimeout(() => {
      //     if (data.address) {
      //       if (data.address) {
      //         let address = data.address.split(" ");
      //         this.data.address = address[0].split("/");
      //         this.form.address = address[1];
      //       }
      //     }
      //   }, 100);

      //   if (data.unmovableproof) {
      //     this.setting.val.houseType = 1;
      //   } else {
      //     this.setting.val.houseType = 2;
      //   }

      if (data.housedeadline) {
        this.setting.val.housedeadline = this.$moment(data.housedeadline);
        this.form.housedeadline = this.$moment(data.housedeadline).format(
          "YYYY-MM-DD"
        );
      }

      if (data.lhrq) {
        this.setting.val.lhrq = this.$moment(data.lhrq);
        this.form.lhrq = this.$moment(data.lhrq).format("YYYY-MM-DD");
      }

      if (!data.housetype) {
        this.form.housetype = 1;
      }

      this.form.homeRemark = data.homeRemark;

      this.lock = false;
    },
    clearForm() {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = undefined;
        }
      }

      this.form.sex = 1;
      this.form.isdq = 1;
      this.form.immuneless = 0;
      this.form.housetype = 1; //房产证类型
      this.form.fatherdegree = "3";
      this.form.motherdegree = "3";
      this.form.otherdegree = "3";

      this.data.birthday = undefined;
      this.data.sex = true;
      this.data.isdq = true;
      this.data.special = [];
      this.data.address = [];
      this.data.address = [];
      this.setting.val.city = []; //户籍省市区
      this.setting.val.address = []; //地址省市区

      this.setting.val.unmovabledeadline = []; //使用期限
      this.setting.val.housedeadline = undefined; //产权获得日期
      this.setting.val.lhrq = undefined; //产权获得日期
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        // console.log(valid);
        if (valid) {
          let formData = { ...this.form };
          // console.log(formData);
          //   if (formData.address) {
          //     formData.address =
          //       this.data.address.join("/") + " " + formData.address;
          //   }

          formData.actionUnionid = this.unionid; //用户id
          //   formData.actiontime = this.$moment().format("YYYY-MM-DD HH:mm:ss"); //操作时间

          if (this.formType === 1) {
            //新增
            formData.enrollId = this.enrollId;
            // console.log("formData数据是-----", formData);
            main
              .add(formData)
              .then((res) => {
                this.$message.success("添加成功");
                this.btnLoading(false);
              })
              .catch((err) => {
                this.$message.error(err);
              });
          } else if (this.formType === 2) {
            //修改
            main
              .edit(formData)
              .then((res) => {
                this.$message.success("修改成功");
                this.btnLoading(false);
              })
              .catch((err) => {
                this.$message.error(err);
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
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .ant-form-item {
  margin-bottom: 0px;
}
/deep/ .ant-form-item label {
  color: black;
  font-weight: bolder;
}
</style>

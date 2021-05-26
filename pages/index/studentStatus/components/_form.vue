<template>
  <div>
    <a-form-model
      ref="ruleForm"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :model="form"
      :rules="rules"
    >
      <a-divider orientation="left">学生信息</a-divider>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="所在班级" prop="classId">
            <a-input
              v-model="form.classId"
              placeholder="请选择所在班级"
              disabled
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="16">
          <a-form-model-item
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 18 }"
            label="班内编号"
          >
            <a-input
              v-model="form.classNumber"
              placeholder="请输入班内编号"
              disabled
            ></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="学生姓名" prop="name">
            <a-input
              v-model="form.name"
              placeholder="请输入学生姓名"
              disabled
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="出生日期" prop="birthday">
            <a-date-picker v-model="data.birthday" disabled />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="性别" prop="sex">
            <a-radio-group name="sex" v-model="data.sex" disabled>
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
            <a-select
              v-model="form.idcardtype"
              placeholder="请选择类型"
              disabled
            >
              <a-select-option
                v-for="item in setting.idcardtype"
                :key="item.v"
                >{{ item.n }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="证件编号" prop="idno">
            <a-input
              v-model="form.idno"
              placeholder="请输入证件编号"
              disabled
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="证件有效期">
            <a-date-picker
              valueFormat="YYYY-MM-DD"
              v-model="data.idnoEffective"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="港澳台侨外" @change="sss">
            <a-select v-model="form.foreigntype" placeholder="请选择">
              <a-select-option
                v-for="item in setting.foreigntype"
                :key="item.v"
                >{{ item.text }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="民族">
            <a-select v-model="form.nation" placeholder="请选择">
              <a-select-option v-for="item in setting.nation" :key="item.v">
                {{ item.text }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="监护人" prop="carer">
            <a-input v-model="form.carer" placeholder="请输入监护人"></a-input>
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
                {{ item.text }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="籍贯">
            <a-input v-model="form.hometown" placeholder="请输入籍贯"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="手机号码" prop="carerphone">
            <a-input
              v-model="form.carerphone"
              placeholder="请输入监护人手机号"
            ></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="户口类别" prop="residenceType">
            <a-select
              show-search
              :filter-option="filterOption"
              option-filter-prop="children"
              v-model="form.residenceType"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in setting.residenceType"
                :key="item.v"
                >{{ item.text }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="免疫卡少几次" prop="immuneless">
            <a-input-number
              v-model="form.immuneless"
              :formatter="value => `${value}次`"
              :parser="value => value.replace('次', '')"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="与学生关系" prop="withStudent">
            <a-select
              show-search
              :filter-option="filterOption"
              option-filter-prop="children"
              placeholder="请选择"
              v-model="form.withStudent"
            >
              <a-select-option
                v-for="item in setting.withStudent"
                :key="item.v"
                >{{ item.text }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row v-if="form.withStudent == 5">
        <a-col :span="24">
          <a-form-model-item
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
            label="关系说明"
            prop="withExplain"
          >
            <a-input
              v-model="form.withExplain"
              placeholder="请输入关系说明"
            ></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-model-item
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
            label="户籍地"
          >
            <a-cascader
              v-model="setting.val.city"
              :options="setting.city"
              placeholder="选择省市区"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-model-item
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
            label="户籍备注"
          >
            <a-textarea
              :autoSize="{ minRows: 2, maxRows: 10 }"
              v-model="form.homeRemark"
              placeholder="请输入户籍所在备注"
            ></a-textarea>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-form-model-item
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
            label="现居地址"
          >
            <a-input-group compact>
              <a-cascader
                style="width: 40%"
                v-model="data.address"
                :options="setting.city"
                placeholder="选择省市区"
              />
              <a-input
                style="width: 60%"
                v-model="form.address"
                placeholder="请输入具体地址"
              ></a-input>
            </a-input-group>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="政治面貌">
            <a-select
              show-search
              :filter-option="filterOption"
              option-filter-prop="children"
              placeholder="请选择"
              v-model="form.politicalOutlook"
            >
              <a-select-option
                v-for="item in setting.politicalOutlook"
                :key="item.v"
                >{{ item.text }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="学生类别" prop="studenType">
            <a-select v-model="form.studenType" placeholder="请选择">
              <a-select-option
                v-for="item in setting.studenType"
                :key="item.v"
                >{{ item.text }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="曾用名">
            <a-input
              v-model="form.nameUsed"
              placeholder="请输入曾用名"
            ></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="入学方式" prop="goMode">
            <a-select v-model="form.goMode" placeholder="请选择">
              <a-select-option v-for="item in setting.goMode" :key="item.v">
                {{ item.text }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="入学年月">
            <a-month-picker
              valueFormat="YYYY-MM"
              format="YYYY-MM"
              v-model="data.goTime"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="入学总分">
            <a-input v-model="form.rank" placeholder="请输入入学总分"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="家庭邮编" prop="homeCode">
            <a-input
              v-model="form.homeCode"
              placeholder="请输入家庭邮编"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="家庭镇街">
            <a-input
              v-model="form.homeStreet"
              placeholder="请输入家庭镇街"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="家庭社区/村">
            <a-input
              v-model="form.homeCommunity"
              placeholder="请输入家庭社区/村"
            ></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="家庭电话" prop="homeCode">
            <a-input
              v-model="form.homePhone"
              placeholder="请输入家庭电话"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="原毕业学校">
            <a-input
              v-model="form.childhood"
              placeholder="请输入原毕业学校"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="特长">
            <a-input v-model="form.special" placeholder="请输入特长"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="中考报名序号">
            <a-input
              v-model="form.registerNo"
              placeholder="请输入中考报名序号"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="电子信箱">
            <a-input
              v-model="form.email"
              placeholder="请输入电子信箱"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="主页地址">
            <a-input
              v-model="form.indexAddress"
              placeholder="请输入主页地址"
            ></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="出生地">
            <a-input
              v-model="form.registerNo"
              placeholder="请输入出生地"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="家庭地址" prop="homeAddress">
            <a-input
              v-model="form.homeAddress"
              placeholder="请输入家庭地址"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="通讯地址">
            <a-input
              v-model="form.postalAddress"
              placeholder="请输入通讯地址"
            ></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="住宿生">
            <a-radio-group v-model="form.isLivein">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="学前教育" prop="isbeforeEducation">
            <a-radio-group v-model="form.isbeforeEducation">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="血型">
            <a-select v-model="form.bloodType" placeholder="请选择">
              <a-select-option
                v-for="item in setting.bloodType"
                :key="item.v"
                >{{ item.text }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="健康状况" prop="healthStatus">
            <a-select v-model="form.healthStatus" placeholder="请选择">
              <a-select-option
                v-for="item in setting.healthStatus"
                :key="item.v"
                >{{ item.text }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="学生来源">
            <a-select v-model="form.studentSources" placeholder="请选择">
              <a-select-option
                v-for="item in setting.studentSources"
                :key="item.v"
                >{{ item.text }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="独生子女" prop="isOne">
            <a-radio-group v-model="form.isOne">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="政府购买学位">
            <a-radio-group v-model="form.isBygovernment">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="是否孤儿" prop="isOrphan">
            <a-radio-group v-model="form.isOrphan">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="烈士或优抚子女" prop="isMartyr">
            <a-radio-group v-model="form.isMartyr">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="需要申请资助" prop="isApply">
            <a-radio-group v-model="form.isApply">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="享受一补" prop="isSupplement">
            <a-radio-group v-model="form.isSupplement">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="享受营养餐" prop="isNutrition">
            <a-radio-group v-model="form.isNutrition">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="残疾类型" prop="disability">
            <a-select v-model="form.disability" placeholder="请选择">
              <a-select-option
                v-for="item in setting.disability"
                :key="item.v"
                >{{ item.text }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="随班就读" prop="attend">
            <a-select v-model="form.attend" placeholder="请选择">
              <a-select-option v-for="item in setting.attend" :key="item.v">
                {{ item.text }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="是否农村留守儿童" prop="isStayBehind">
            <a-select v-model="form.isStayBehind" placeholder="请选择">
              <a-select-option
                v-for="item in setting.isStayBehind"
                :key="item.v"
                >{{ item.text }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="随迁子女" prop="isMovechild">
            <a-radio-group v-model="form.isMovechild">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="进城务工随迁子女" prop="migrantchild">
            <a-radio-group v-model="form.migrantchild">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="就读方式" prop="studyType">
            <a-select v-model="form.studyType" placeholder="请选择">
              <a-select-option
                v-for="item in setting.studyType"
                :key="item.v"
                >{{ item.text }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="乘坐校车" prop="takeSchbus">
            <a-radio-group v-model="form.takeSchbus">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="上下学交通方式" prop="trafficType">
            <a-select v-model="form.trafficType" placeholder="请选择">
              <a-select-option
                v-for="item in setting.trafficType"
                :key="item.v"
                >{{ item.text }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="上下学距离（公里）" prop="distance">
            <a-input-number
              v-model.number="form.distance"
              placeholder="请输入上下学距离（数字）"
            ></a-input-number>
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- <a-row>
        <a-col :span="24">
          <a-form-model-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" label="房产信息">
            <a-input-group compact>
              <a-select style="width: 40%" v-model="form.housetype">
                <a-select-option v-for="item in setting.houseType" :key="item.v">{{ item.n }}</a-select-option>
              </a-select>
              <template v-if="form.housetype === 1">
                <a-input
                  style="width: 60%"
                  v-model="form.unmovableproof"
                  placeholder="例：甬（2016）宁波市 不动产权第 158545 号"
                ></a-input>
              </template>
              <template v-else-if="form.housetype === 2">
                <a-input
                  style="width: 60%"
                  v-model="form.houseproof"
                  placeholder="例：甬 房地权证 鄞州区 字第 15644561 号"
                ></a-input>
              </template>
            </a-input-group>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <template v-if="form.housetype === 1">
            <a-form-model-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }" label="使用期限">
              <a-range-picker
                :placeholder="['使用期限起', '使用期限止']"
                v-model="setting.val.unmovabledeadline"
              />
            </a-form-model-item>
          </template>
          <template v-else-if="form.housetype === 2">
            <a-form-model-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }" label="产权获得日期">
              <a-date-picker style="width:100%;" v-model="setting.val.housedeadline"></a-date-picker>
            </a-form-model-item>
          </template>
        </a-col>
        <a-col :span="12">
          <a-form-model-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }" label="所有人(权利人)">
            <a-input v-model="form.owner" placeholder="请输入所有人(权利人)"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>-->

      <a-row>
        <a-col :span="24">
          <a-form-model-item
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
            label="家长备注"
          >
            <a-textarea
              :autoSize="{ minRows: 5, maxRows: 10 }"
              v-model="form.remark"
              placeholder="请输入"
            ></a-textarea>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-model-item
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
            label="导入错误原因"
          >
            <a-textarea
              :autoSize="{ minRows: 5, maxRows: 10 }"
              v-model="form.reason"
              placeholder="请输入"
            ></a-textarea>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-divider orientation="left">联系人信息填写</a-divider>
      <a-row :gutter="8" style="text-align:center;">
        <a-col :offset="3" :span="2">称谓</a-col>
        <a-col :span="3">姓名</a-col>
        <a-col :span="3">文化程度</a-col>
        <a-col :span="3">工作单位</a-col>
        <a-col :span="3">职务</a-col>
        <a-col :span="3">手机号码</a-col>
        <a-col :span="4">身份证</a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col
          :offset="3"
          :span="2"
          style="text-align:center;line-height:40px;color: black;font-weight: bolder;"
          >父</a-col
        >
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.fathername" placeholder="名字"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-select v-model="form.fatherdegree" placeholder="请选择">
              <a-select-option v-for="item in setting.degree" :key="item.v">
                {{ item.text }}
              </a-select-option>
            </a-select>
            <!-- <a-input v-model="form.fatherdegree" placeholder="文化程度"></a-input> -->
          </a-form-model-item>
        </a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input
              v-model="form.fatherworkplace"
              placeholder="工作单位"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.fatherduty" placeholder="职务"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.fatherphone" placeholder="电话"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="4">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.fatheridno" placeholder="身份证"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row :gutter="8">
        <a-col
          :offset="3"
          :span="2"
          style="text-align:center;line-height:40px;color: black;font-weight: bolder;"
          >母</a-col
        >
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.mothername" placeholder="名字"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-select v-model="form.motherdegree" placeholder="请选择">
              <a-select-option v-for="item in setting.degree" :key="item.v">
                {{ item.text }}
              </a-select-option>
            </a-select>
            <!-- <a-input v-model="form.motherdegree" placeholder="文化程度"></a-input> -->
          </a-form-model-item>
        </a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input
              v-model="form.motherworkplace"
              placeholder="工作单位"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.motherduty" placeholder="职务"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.motherphone" placeholder="电话"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="4">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.motheridno" placeholder="身份证"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row :gutter="8">
        <a-col
          :offset="3"
          :span="2"
          style="text-align:center;line-height:40px;color: black;font-weight: bolder;"
          >其他</a-col
        >
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.othername" placeholder="名字"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-select v-model="form.otherdegree" placeholder="请选择">
              <a-select-option v-for="item in setting.degree" :key="item.v">
                {{ item.text }}
              </a-select-option>
            </a-select>
            <!-- <a-input v-model="form.otherdegree" placeholder="文化程度"></a-input> -->
          </a-form-model-item>
        </a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input
              v-model="form.otherworkplace"
              placeholder="工作单位"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.otherduty" placeholder="职务"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="3">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.otherphone" placeholder="电话"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="4">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-input v-model="form.otheridno" placeholder="身份证"></a-input>
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
  residenceType,
  withStudent,
  goMode,
  politicalOutlook,
  studenType,
  bloodType,
  healthStatus,
  studentSources,
  disability, //
  attend, //
  isStayBehind, //
  studyType, //
  trafficType, //
  studentStatus //
} from "~/utils/data";

//组件

//接口
import main from "~/api/studentStatus";

export default {
  props: {
    btnLoading: Function //按钮加载与不加载
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
    }
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
          housedeadline: undefined //产权获得日期
        },
        city: city.options,
        special,
        foreigntype,
        nation,
        degree,
        residenceType, //户口类别
        withStudent, //与学生关系
        goMode, //入学方式
        politicalOutlook, //政治面貌
        studenType, //学生类别
        bloodType, //血型
        healthStatus, //血型
        studentSources, //学生来源
        disability, //残疾类型
        attend, //随班就读类型
        isStayBehind, //是否农村留守儿童
        studyType, //就读方式
        trafficType, //上下学交通方式
        studentStatus, //学籍状态
        houseType: [
          { n: "不动产权证书", v: 1 },
          { n: "房地产权证", v: 2 }
        ],
        country: [],
        trueOrfalse: [
          { n: "是", v: true },
          { n: "否", v: false }
        ],
        idcardtype: [
          { n: "居民身份证", v: "1" },
          { n: "其它", v: "2" }
        ],
        sex: [
          { n: "选项1", v: 1 },
          { n: "选项2", v: 2 },
          { n: "选项3", v: 3 }
        ]
      },
      //需要特殊处理的数据
      data: {
        birthday: undefined, //出生日期
        idnoEffective: undefined, //证件有效期
        goTime: undefined, //入学年月
        sex: true, //性别
        special: [], //特长
        address: [] //地址
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
        //父亲职务
        fatherduty: undefined,

        fathername: undefined,

        fatherphone: undefined,

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

        motherduty: undefined,

        mothername: undefined,

        motherphone: undefined,

        motherworkplace: undefined,

        nation: undefined,

        otherdegree: undefined,

        othername: undefined,

        otherduty: undefined,

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

        //所在班级
        classId: undefined,
        //("班内编号",
        classNumber: undefined,
        //("证件有效期":,fatherduty
        idnoEffective: undefined,
        //("与学生关系":,
        withStudent: undefined,
        //("与学生关系说明":,
        withExplain: undefined,
        //("政治面貌":,
        politicalOutlook: undefined,
        //("入学方式":,
        goMode: undefined,
        //("入学年月":,
        goTime: undefined,
        //("入学总分":,
        rank: undefined,
        //("学生类别":,
        studenType: undefined,
        //("户口类型":,
        residenceType: undefined,
        //("曾用名":,
        nameUsed: undefined,
        //("家庭住址":,
        homeAddress: undefined,
        //("家庭邮编":,
        homeCode: undefined,
        //("家庭镇街":,
        homeStreet: undefined,
        //("家庭社区":,
        homeCommunity: undefined,
        //("家庭电话":,
        homePhone: undefined,
        //("是否住宿生":,
        isLivein: undefined,
        //("是否受过学前教育":,
        isbeforeEducation: undefined,
        //("中考报名序号":,
        registerNo: undefined,
        //("电子信箱":,
        email: undefined,
        //("主页地址":,
        indexAddress: undefined,
        //("血型":,
        bloodType: undefined,
        //("健康状态":,
        healthStatus: undefined,
        //("学生来源":,
        studentSources: undefined,
        //("是否独生子女":,
        isOne: undefined,
        //("是否由政府购买学位":,
        isBygovernment: undefined,
        //("是否孤儿":,
        isOrphan: undefined,
        //("烈士或优抚子女":,
        isMartyr: undefined,
        //("是否需要申请资助":,
        isApply: undefined,
        //("是否享受一补":,
        isSupplement: undefined,
        //("是否享受营养餐":,
        isNutrition: undefined,
        //("残疾类型":,
        disability: undefined,
        //("是否农村留守儿童":,
        isStayBehind: undefined,
        //("随班就读":,
        attend: undefined,
        //("是否随迁子女":,
        isMovechild: undefined,
        //("进城务工随迁子女":,
        migrantchild: undefined,
        //("就读方式":,
        studyType: undefined,
        //("是否乘坐校车":,
        takeSchbus: undefined,
        //("上下学交通方式":,
        trafficType: undefined,
        //("通讯地址":,
        postalAddress: undefined,
        //("上下学距离":,
        distance: undefined,
        //("导入错误原因":,
        reason: undefined
        // //("学籍状态：转入1、正常2、休学3、复学4、删除5,")
        // studentStatus: undefined,
        // //("对应报名表的id":,
        // tableId: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        address: [
          {
            required: true,
            message: "请输入现居住地",
            trigger: "blur"
          }
        ],

        birthday: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        carer: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        carerphone: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        childhood: [
          {
            required: true,
            message: "请输入毕业幼儿园",
            trigger: "blur"
          }
        ],

        country: [
          {
            required: true,
            message: "请输入国籍",
            trigger: "blur"
          }
        ],

        enrollId: [
          {
            required: true,
            message: "请输入对应enrollId",
            trigger: "blur"
          }
        ],

        fatherdegree: [
          {
            required: true,
            message: "请输入父亲文化程度",
            trigger: "blur"
          }
        ],

        fathername: [
          {
            required: true,
            message: "请输入父亲名字",
            trigger: "blur"
          }
        ],

        fatherphone: [
          {
            required: true,
            message: "请输入父亲电话",
            trigger: "blur"
          }
        ],

        fatherworkplace: [
          {
            required: true,
            message: "请输入父亲工作单位",
            trigger: "blur"
          }
        ],

        foreigntype: [
          {
            required: true,
            message: "请输入学生id",
            trigger: "blur"
          }
        ],

        homeRemark: [
          {
            required: true,
            message: "请输入户籍所在备注",
            trigger: "blur"
          }
        ],

        hometown: [
          {
            required: true,
            message: "请输入家乡",
            trigger: "blur"
          }
        ],

        housedeadline: [
          {
            required: true,
            message: "请输入产权获得日期",
            trigger: "blur"
          }
        ],

        houseproof: [
          {
            required: true,
            message: "请输入房产证",
            trigger: "blur"
          }
        ],

        idcardtype: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        idno: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        immuneless: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        motherdegree: [
          {
            required: true,
            message: "请输入母亲文化程度",
            trigger: "blur"
          }
        ],

        mothername: [
          {
            required: true,
            message: "请输入母亲名字",
            trigger: "blur"
          }
        ],

        motherphone: [
          {
            required: true,
            message: "请输入母亲电话号码",
            trigger: "blur"
          }
        ],

        motherworkplace: [
          {
            required: true,
            message: "请输入母亲工作单位",
            trigger: "blur"
          }
        ],

        nation: [
          {
            required: true,
            message: "请输入民族",
            trigger: "blur"
          }
        ],

        otherdegree: [
          {
            required: true,
            message: "请输入其他联系人文化程度",
            trigger: "blur"
          }
        ],

        othername: [
          {
            required: true,
            message: "请输入其他联系人名字",
            trigger: "blur"
          }
        ],

        otherphone: [
          {
            required: true,
            message: "请输入其他联系人电话号码",
            trigger: "blur"
          }
        ],

        otherworkplace: [
          {
            required: true,
            message: "请输入其他联系人工作单位",
            trigger: "blur"
          }
        ],

        owner: [
          {
            required: true,
            message: "请输入所有权人",
            trigger: "blur"
          }
        ],

        province: [
          {
            required: true,
            message: "请输入省份",
            trigger: "blur"
          }
        ],

        rank: [
          {
            required: true,
            message: "请输入等级",
            trigger: "blur"
          }
        ],

        rankUnionid: [
          {
            required: true,
            message: "请输入对应enrollId",
            trigger: "blur"
          }
        ],

        remark: [
          {
            required: true,
            message: "请输入家长备注",
            trigger: "blur"
          }
        ],

        sex: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        special: [
          {
            required: true,
            message: "请输入特长",
            trigger: "blur"
          }
        ],

        street: [
          {
            required: true,
            message: "请输入乡镇",
            trigger: "blur"
          }
        ],

        tag: [
          {
            required: true,
            message: "请输入学生标签",
            trigger: "blur"
          }
        ],

        unmovabledeadline: [
          {
            required: true,
            message: "请输入使用期限",
            trigger: "blur"
          }
        ],

        unmovableproof: [
          {
            required: true,
            message: "请输入不动产权证书",
            trigger: "blur"
          }
        ],

        village: [
          {
            required: true,
            message: "请输入村",
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            message: "请输入省市区",
            trigger: "blur"
          }
        ],
        classId: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        residenceType: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        withStudent: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        studenType: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        goMode: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        homeCode: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        homeAddress: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        isbeforeEducation: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        healthStatus: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        isOne: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        isOrphan: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        isMartyr: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        isApply: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        isSupplement: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        disability: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        isStayBehind: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        isMovechild: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        migrantchild: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        studyType: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        takeSchbus: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        trafficType: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        distance: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    //出生日期
    "data.birthday"(nv) {
      if (nv) {
        this.form.birthday = this.$moment(nv).format("YYYY-MM-DD");
      } else {
        this.form.birthday = "";
      }
    },
    //证件有效期
    "data.idnoEffective"(nv) {
      if (nv) {
        this.form.idnoEffective = this.$moment(nv).format("YYYY-MM-DD");
      } else {
        this.form.idnoEffective = "";
      }
    },
    //入学年份
    "data.goTime"(nv) {
      if (nv) {
        this.form.goTime = this.$moment(nv).format("YYYY-MM");
      } else {
        this.form.goTime = "";
      }
    },
    "data.sex"(nv) {
      if (nv) {
        this.form.sex = 1;
      } else {
        this.form.sex = 2;
      }
    },
    "data.special"(nv) {
      if (nv.length > 0) {
        this.form.special = nv.join(",");
      } else {
        this.form.special = "";
      }
    },
    //监听房产证书的请选择
    "form.housetype"(nv) {
      if (nv === 1) {
        // this.form.houseproof = "";
        // this.setting.val.housedeadline = undefined;
      } else if (nv === 2) {
        // this.form.unmovableproof = "";
        // this.setting.val.unmovabledeadline = [];
      }
    },
    //监听户籍选择
    "setting.val.city"(nv) {
      //   // console.log(nv);

      this.data.address = [...nv];

      if (nv) {
        this.form.province = nv[0];
        this.form.street = nv[1];
        this.form.village = nv[2];
      } else {
        this.form.province = "";
        this.form.street = "";
        this.form.village = "";
      }
    },
    //监听使用期限
    "setting.val.unmovabledeadline"(nv) {
      // console.log(nv);
      if (nv) {
        this.form.unmovabledeadline = `${this.$moment(nv[0]).format(
          "YYYY-MM-DD"
        )} ~ ${this.$moment(nv[1]).format("YYYY-MM-DD")}`;
      } else {
        this.form.unmovabledeadline = "";
      }
    },
    "setting.val.housedeadline"(nv) {
      if (nv) {
        this.form.housedeadline = this.$moment(nv).format("YYYY-MM-DD");
      } else {
        this.form.housedeadline = "";
      }
    }
  },
  created() {
    //   获取参数
    getCountry()
      .then(res => {
        // console.log("res--------------", this.setting.nation);
        this.setting.country = res;
        // // console.log("gujiaosddhdhdhddhh--------------", this.setting.country);
      })
      .catch(err => {
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
    sss(val) {
      console.log("sss", val);
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
          }
          //    else if (key === "special") {
          //     if (data[key]) {
          //       let special = data[key];
          //       this.data.special = special.split(",");
          //       this.form.special = special;
          //     }
          //   }
          else if (key === "province") {
            if (data[key]) {
              let province = data[key];
              this.setting.val.city = [
                data.province,
                data.street,
                data.village
              ];
              this.form.province = province;
            }
          } else if (key === "unmovabledeadline") {
            if (data.unmovabledeadline) {
              let unmovabledeadline = data.unmovabledeadline.split(" ~ ");
              this.setting.val.unmovabledeadline = [
                this.$moment(unmovabledeadline[0]),
                this.$moment(unmovabledeadline[1])
              ];
              this.form.unmovabledeadline = data.unmovabledeadline;
            }
          } else {
            this.form[key] = data[key];
          }
        }
      }

      setTimeout(() => {
        if (data.address) {
          if (data.address) {
            let address = data.address.split(" ");
            this.data.address = address[0].split("/");
            this.form.address = address[1];
          }
        }
      }, 100);

      if (data.goTime) {
        let time = this.$moment(data.goTime);
        this.data.goTime = time;
        this.form.goTime = time.format("YYYY-MM-DD");
      }
      if (data.idnoEffective) {
        let time = this.$moment(data.idnoEffective);
        this.data.idnoEffective = time;
        this.form.idnoEffective = time.format("YYYY-MM-DD");
      }

      if (data.housedeadline) {
        this.setting.val.housedeadline = this.$moment(data.housedeadline);
        this.form.housedeadline = this.$moment(data.housedeadline).format(
          "YYYY-MM-DD"
        );
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
      this.form.immuneless = 0;
      this.form.housetype = 1; //房产证类型
      this.form.fatherdegree = "3";
      this.form.motherdegree = "3";
      this.form.otherdegree = "3";

      this.data.birthday = undefined;
      this.data.sex = true;
      this.data.special = [];
      this.data.address = [];
      this.data.address = [];
      this.setting.val.city = []; //户籍省市区
      this.setting.val.address = []; //地址省市区

      this.setting.val.unmovabledeadline = []; //使用期限
      this.setting.val.housedeadline = undefined; //产权获得日期
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        // console.log(valid);
        if (valid) {
          let formData = { ...this.form };
          // console.log(formData);
          if (formData.address) {
            formData.address =
              this.data.address.join("/") + " " + formData.address;
          }

          formData.actionUnionid = this.unionid; //用户id
          //   formData.actiontime = this.$moment().format("YYYY-MM-DD HH:mm:ss"); //操作时间

          if (this.formType === 1) {
            //新增
            formData.enrollId = this.enrollId;
            // console.log("formData数据是-----", formData);
            main
              .add(formData)
              .then(res => {
                this.$message.success("添加成功");
                this.btnLoading(false);
              })
              .catch(err => {
                this.$message.error(err);
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
<style lang="scss" scoped>
/deep/ .ant-form-item {
  margin-bottom: 0px;
}
/deep/ .ant-form-item label {
  color: black;
  font-weight: bolder;
}
/deep/ .ant-input-number {
  width: 100%;
}
</style>

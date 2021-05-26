<template>
  <div style="padding:5px;">
    <template v-if="!isOpen">
      <!-- 新生评定时显示 -->
      <template v-if="formType == 3">
        <h2 class="type-title">新生评定</h2>
      </template>
      <template v-if="!editShow">
        <h2 class="form-title">{{ schoolTitle }}</h2>
        <h3 class="form-title">{{ title }}</h3>
      </template>
      <template v-if="formType == 3">
        <a-form-model
          style="margin-bottom:10px;"
          layout="inline"
          :model="table.select"
        >
          <a-row>
            <a-col :span="24">
              <a-form-model-item style="width:100%">
                <a-input
                  v-model="table.select.idno"
                  placeholder="证件编号"
                ></a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-model-item style="width:100%">
                <a-input
                  v-model="table.select.name"
                  placeholder="姓名"
                ></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item style="width:100%;">
                <a-button
                  style="width:100%;"
                  type="danger"
                  @click="clearSelectForm"
                  >清空</a-button
                >
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item style="width:100%;">
                <a-button
                  style="width:100%;"
                  type="primary"
                  @click="reloadTable"
                  >查询</a-button
                >
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
        <a-table
          class="table-data"
          size="small"
          bordered
          rowKey="id"
          :columns="table.columns"
          :dataSource="table.data"
          :pagination="table.pagination"
          @change="tableChange"
        >
          <template slot="idx" slot-scope="text, record, index">{{
            table.pagination.current * table.pagination.pageSize -
              table.pagination.pageSize +
              index +
              1
          }}</template>

          <template slot="name" slot-scope="text, record">
            <span
              v-if="record.sex"
              :class="['sex', record.sex === 1 ? 'nan' : 'nv']"
              >{{ record.sex === 1 ? "男" : "女" }}</span
            >
            {{ text }}
            <span v-if="record.tag" class="type">{{ record.tag }}</span>
          </template>

          <template slot="rankShow" slot-scope="text">
            <template v-if="text">
              <!-- <a-rate style="font-size:12px" disabled :value="text" :count="4" /> -->
              <span class="star-text">{{ desc[text - 1] }}</span>
            </template>
          </template>
          <!-- <template slot="address" slot-scope="text">{{text | address}}</template>
        <template slot="status" slot-scope="text">
          <template v-if="text==1">
            <a-tag color="green">审核通过</a-tag>
          </template>
          <template v-else-if="text==2">
            <a-tag color="red">审核未通</a-tag>
          </template>
          <template v-else>
            <a-tag color="blue">待审核</a-tag>
          </template>
          </template>-->
          <template slot="rankInfo" slot-scope="text">{{
            mark.type == 2 ? text : ""
          }}</template>
          <template slot="tool" slot-scope="text, record">
            <a @click="toMark(record)">评定</a>
            <!-- <a-button size="small" type="primary" :disabled="!mark.power" @click="toMark(record)">评定</a-button> -->
          </template>
        </a-table>
      </template>

      <!-- 评分 -->
      <mark-form
        ref="markForm"
        :showType="2"
        :reload="reloadTable"
        :markType="mark.type"
        :modeItem="mark.modeItem"
        :scorings="mark.scorings"
      />

      <template v-if="formShow">
        <template v-if="point && formType != 3 && !errShow">
          <van-notice-bar left-icon="volume-o">{{ point }}</van-notice-bar>
        </template>
        <van-form class="form" @submit="onSubmit" @failed="submitFail">
          <!-- 学生姓名 -->
          <van-field
            v-model="form.name"
            v-if="show.name"
            :rules="rules.name"
            :required="rules.name[0].required"
            name="name"
            label="学生姓名"
            :readonly="formType == 3"
            placeholder="请输入学生姓名"
          />
          <!-- 生源类型 -->
          <van-field
            readonly
            clickable
            label="生源类型"
            placeholder="请选择"
            v-if="show.sourcetype"
            :value="name.sourcetype"
            :rules="rules.sourcetype"
            :required="rules.sourcetype[0].required"
            @click="pop.sourcetype = true"
          />
          <template v-if="formType != 3">
            <van-popup v-model="pop.sourcetype" position="bottom">
              <van-picker
                show-toolbar
                :columns="selected.sourcetype"
                @cancel="pop.sourcetype = false"
                @confirm="sourcetype"
              />
            </van-popup>
          </template>
          <!-- 出生日期 -->
          <van-field
            v-model="form.birthday"
            v-if="show.birthday"
            :rules="rules.birthday"
            :required="rules.birthday[0].required"
            name="birthday"
            label="出生日期"
            readonly
            placeholder="请选择出生日期"
            @click="pop.birthday = true"
          />
          <template v-if="formType != 3">
            <van-popup
              v-model="pop.birthday"
              position="bottom"
              :style="{ height: '300px' }"
            >
              <van-datetime-picker
                v-model="data.birthday"
                @confirm="birthday"
                @cancel="pop.birthday = false"
                type="date"
              />
            </van-popup>
          </template>
          <!-- 性别 -->
          <van-field
            name="sex"
            label="性别"
            :required="rules.sex[0].required"
            v-if="show.sex"
            :rules="rules.sex"
          >
            <template #input>
              <van-radio-group
                :disabled="formType == 3"
                v-model="form.sex"
                direction="horizontal"
              >
                <van-radio :name="1">男</van-radio>
                <van-radio :name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <!-- 证件类型 -->
          <van-field
            readonly
            clickable
            label="证件类型"
            placeholder="选择证件类型"
            v-if="show.idcardtype"
            :value="name.idcardtype"
            :rules="rules.idcardtype"
            :required="rules.idcardtype[0].required"
            @click="pop.idcardtype = true"
          />
          <template v-if="formType != 3">
            <van-popup v-model="pop.idcardtype" position="bottom">
              <van-picker
                show-toolbar
                :columns="selected.idcardtype"
                @cancel="pop.idcardtype = false"
                @confirm="idcardtype"
              />
            </van-popup>
          </template>
          <!-- 证件编号 -->
          <van-field
            v-model="form.idno"
            v-if="show.idno"
            :rules="rules.idno[0].required ? rules.idno : [{ required: false }]"
            :required="rules.idno[0].required"
            name="idno"
            label="证件编号"
            :readonly="formType == 3"
            placeholder="请输入证件编号"
          />

          <!-- 港澳台侨外 -->
          <van-field
            readonly
            clickable
            name="foreigntype"
            label="港澳台侨外"
            placeholder="请选择"
            v-if="show.foreigntype"
            :value="name.foreigntype"
            :rules="rules.foreigntype"
            :required="rules.foreigntype[0].required"
            @click="pop.foreigntype = true"
          />
          <template v-if="formType != 3">
            <van-popup v-model="pop.foreigntype" position="bottom">
              <van-picker
                show-toolbar
                :columns="selected.foreigntype"
                @cancel="pop.foreigntype = false"
                @confirm="foreigntype"
              />
            </van-popup>
          </template>
          <!-- 国籍 -->
          <van-field
            readonly
            clickable
            name="nation"
            label="国籍"
            placeholder="请选择国籍"
            v-if="show.country"
            :value="name.country"
            :rules="rules.country"
            :required="rules.country[0].required"
            @click="pop.country = true"
          />
          <template v-if="formType != 3">
            <van-popup v-model="pop.country" position="bottom">
              <van-picker
                show-toolbar
                :columns="selected.country"
                @cancel="pop.country = false"
                @confirm="country"
              />
            </van-popup>
          </template>
          <!-- 民族 -->
          <van-field
            readonly
            clickable
            name="nation"
            label="民族"
            placeholder="请选择民族"
            v-if="show.nation"
            :value="name.nation"
            :rules="rules.nation"
            :required="rules.nation[0].required"
            @click="pop.nation = true"
          />
          <template v-if="formType != 3">
            <van-popup v-model="pop.nation" position="bottom">
              <van-picker
                show-toolbar
                :columns="selected.nation"
                @cancel="pop.nation = false"
                @confirm="nation"
              />
            </van-popup>
          </template>
          <!-- 籍贯 -->
          <van-field
            v-model="form.hometown"
            v-if="show.hometown"
            :rules="rules.hometown"
            :required="rules.hometown[0].required"
            :readonly="formType == 3"
            name="hometown"
            label="籍贯"
            placeholder="请输入籍贯"
          />

          <!-- 监护人 -->
          <van-field
            v-model="form.carer"
            v-if="show.carer"
            :rules="rules.carer"
            :required="rules.carer[0].required"
            :readonly="formType == 3"
            name="carer"
            label="监护人"
            placeholder="请输入监护人"
          />

          <!-- 监护人手机号码 -->
          <van-field
            v-model="form.carerphone"
            v-if="show.carerphone"
            :rules="
              rules.carerphone[0].required
                ? rules.carerphone
                : [{ required: false }]
            "
            :required="rules.carerphone[0].required"
            :readonly="formType == 3"
            name="carer"
            label="手机号码"
            placeholder="请输入监护人"
          />

          <!-- 特长 -->
          <van-field
            name="special"
            label="特长"
            v-if="show.special"
            :required="rules.special[0].required"
            :rules="rules.special"
          >
            <template #input>
              <van-checkbox-group
                :disabled="formType == 3"
                v-model="data.special"
                direction="horizontal"
              >
                <van-checkbox
                  style="margin-bottom:10px;"
                  v-for="(item, idx) in selected.special"
                  :key="idx"
                  :name="item"
                  shape="square"
                  >{{ item }}</van-checkbox
                >
              </van-checkbox-group>
            </template>
          </van-field>

          <!-- 免疫卡少几次 -->
          <!-- :rules="rules.immuneless" -->
          <van-field
            v-if="show.immuneless"
            :required="rules.immuneless[0].required"
            name="immuneless"
            :readonly="formType == 3"
            label="免疫卡少几次"
          >
            <template #input>
              <van-stepper v-model="form.immuneless" :min="0" />
            </template>
          </van-field>

          <!-- 毕业幼儿园 -->
          <van-field
            v-model="form.childhood"
            v-if="show.childhood"
            :rules="rules.childhood"
            :required="rules.childhood[0].required"
            :readonly="formType == 3"
            name="name"
            label="毕业幼儿园"
            placeholder="请输入毕业幼儿园"
            type="textarea"
          />

          <!-- 户籍地址 -->
          <van-field
            readonly
            clickable
            name="province"
            v-if="show.province"
            :value="name.areaList"
            :rules="rules.province"
            :required="rules.province[0].required"
            label="户籍地址"
            placeholder="点击选择户籍地址"
            @click="pop.areaList = true"
          />
          <template v-if="formType != 3">
            <van-popup v-model="pop.areaList" position="bottom">
              <van-area
                :area-list="selected.areaList"
                @confirm="areaList"
                @cancel="pop.areaList = false"
              />
            </van-popup>
          </template>
          <!--户籍备注 -->
          <van-field
            v-model="form.homeRemark"
            v-if="show.homeRemark"
            :rules="rules.homeRemark"
            :required="rules.homeRemark[0].required"
            :readonly="formType == 3"
            name="homeRemark"
            label="户籍备注"
            placeholder="请输入"
            type="textarea"
          />

          <!-- 现居住地址 -->
          <van-field
            readonly
            clickable
            name="province"
            v-if="show.address"
            :value="name.address"
            :rules="rules.address"
            :required="rules.address[0].required"
            label="现居（省市区）"
            placeholder="点击选择省市区"
            @click="pop.address = true"
          />
          <template v-if="formType != 3">
            <van-popup v-model="pop.address" position="bottom">
              <van-area
                :area-list="selected.areaList"
                @confirm="addressList"
                @cancel="pop.address = false"
              />
            </van-popup>
          </template>
          <van-field
            v-model="form.address"
            v-if="show.address"
            :rules="rules.address"
            :required="rules.address[0].required"
            :readonly="formType == 3"
            name="address"
            label="现居详细地址"
            placeholder="请输入现居详细地址"
          />

          <!-- 房产信息 -->
          <template v-if="show.houseproof">
            <van-field
              readonly
              clickable
              name="nation"
              label="房产信息"
              placeholder="请选择房产类型"
              :value="name.houseType"
              :rules="rules.houseType"
              :required="rules.houseType[0].required"
              @click="pop.houseType = true"
            />
            <template v-if="formType != 3">
              <van-popup v-model="pop.houseType" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="selected.houseType"
                  @cancel="pop.houseType = false"
                  @confirm="houseType"
                />
              </van-popup>
            </template>
            <!-- 不动产权证书 -->
            <template v-if="form.housetype === 1">
              <van-field
                v-model="form.unmovableproof"
                :rules="rules.unmovableproof"
                :required="rules.unmovableproof[0].required"
                :readonly="formType == 3"
                name="unmovableproof"
                label="不动产证书"
                placeholder="例：甬（2016）宁波市 不动产权第 158545 号"
                type="textarea"
              />
              <!-- 使用期限起 -->
              <van-field
                v-model="form.unmovBegin"
                name="unmovBegin"
                label="使用期限起"
                readonly
                :rules="rules.unmovBegin"
                :required="rules.unmovBegin[0].required"
                placeholder="请选择使用起始时间"
                @click="pop.unmovBegin = true"
              />
              <template v-if="formType != 3">
                <van-popup v-model="pop.unmovBegin" position="bottom">
                  <van-datetime-picker
                    v-model="data.unmovBegin"
                    @confirm="unmovBegin"
                    @cancel="pop.unmovBegin = false"
                    :min-date="minDate"
                    :max-date="maxDate"
                    type="date"
                  />
                </van-popup>
              </template>
              <!-- 使用期限止 -->
              <van-field
                v-model="form.unmovEnd"
                name="unmovBegin"
                label="使用期限止"
                readonly
                :rules="rules.unmovEnd"
                :required="rules.unmovEnd[0].required"
                placeholder="请选择使用结束时间"
                @click="pop.unmovEnd = true"
              />
              <template v-if="formType != 3">
                <van-popup v-model="pop.unmovEnd" position="bottom">
                  <van-datetime-picker
                    v-model="data.unmovEnd"
                    @confirm="unmovEnd"
                    @cancel="pop.unmovEnd = false"
                    :min-date="minDate"
                    :max-date="maxDate"
                    type="date"
                  />
                </van-popup>
              </template>
            </template>
            <!-- 房地产权证 -->
            <template v-else-if="form.housetype === 2">
              <van-field
                v-model="form.houseproof"
                :readonly="formType == 3"
                :rules="rules.houseproof"
                :required="rules.houseproof[0].required"
                name="houseproof"
                label="房产证书"
                placeholder="例：甬 房地权证 鄞州区 字第 15644561 号"
                type="textarea"
              />

              <!-- 产权获得日期 -->
              <van-field
                v-model="form.housedeadline"
                name="unmovBegin"
                label="产权获得日期"
                :rules="rules.housedeadline"
                :required="rules.housedeadline[0].required"
                readonly
                placeholder="请选择产权获得日期"
                @click="pop.housedeadline = true"
              />
              <template v-if="formType != 3">
                <van-popup v-model="pop.housedeadline" position="bottom">
                  <van-datetime-picker
                    v-model="data.housedeadline"
                    @confirm="housedeadline"
                    @cancel="pop.housedeadline = false"
                    :min-date="minDate"
                    :max-date="maxDate"
                    type="date"
                  />
                </van-popup>
              </template>
            </template>
            <van-field
              v-model="form.owner"
              :rules="rules.owner"
              :required="rules.owner[0].required"
              :readonly="formType == 3"
              name="owner"
              label="所有权人"
              placeholder="请输入所有权人"
            />
          </template>

          <template v-if="show.fathername">
            <van-divider
              :style="{
                color: '#1989fa',
                borderColor: '#1989fa',
                padding: '0 16px'
              }"
              >联系人信息</van-divider
            >
            <!-- 父亲信息 -->
            <div style="margin:10px;">父亲信息:</div>
            <van-field
              v-model="form.fathername"
              :readonly="formType == 3"
              name="fathername"
              label="姓名"
              placeholder="请输入姓名"
            />
            <van-field
              v-model="form.fatheridno"
              :readonly="formType == 3"
              name="fatheridno"
              label="证件号码"
              placeholder="请输入"
            />
            <van-field
              readonly
              clickable
              name="fatherdegree"
              label="文化程度"
              placeholder="请选择文化程度"
              :value="name.fatherdegree"
              @click="pop.fatherdegree = true"
            />
            <template v-if="formType != 3">
              <van-popup v-model="pop.fatherdegree" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="selected.degree"
                  @cancel="pop.fatherdegree = false"
                  @confirm="fatherdegree"
                />
              </van-popup>
            </template>
            <van-field
              v-model="form.fatherworkplace"
              :readonly="formType == 3"
              name="fatherworkplace"
              label="工作单位"
              placeholder="请输入工作单位"
            />
            <!-- :required="rules.fatherphone[0].required" -->
            <van-field
              v-model="form.fatherphone"
              name="fatherphone"
              label="手机号码"
              placeholder="请输入手机号码"
            />

            <!-- 母亲信息 -->
            <div style="margin:10px;">母亲信息:</div>
            <van-field
              v-model="form.mothername"
              :readonly="formType == 3"
              name="mothername"
              label="姓名"
              placeholder="请输入姓名"
            />
            <van-field
              v-model="form.motheridno"
              :readonly="formType == 3"
              name="motheridno"
              label="证件号码"
              placeholder="请输入"
            />
            <van-field
              readonly
              clickable
              name="motherdegree"
              label="文化程度"
              placeholder="请选择文化程度"
              :value="name.motherdegree"
              @click="pop.motherdegree = true"
            />
            <template v-if="formType != 3">
              <van-popup v-model="pop.motherdegree" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="selected.degree"
                  @cancel="pop.motherdegree = false"
                  @confirm="motherdegree"
                />
              </van-popup>
            </template>
            <van-field
              v-model="form.motherworkplace"
              :readonly="formType == 3"
              name="motherworkplace"
              label="工作单位"
              placeholder="请输入工作单位"
            />
            <van-field
              v-model="form.motherphone"
              :readonly="formType == 3"
              name="motherphone"
              label="手机号码"
              placeholder="请输入手机号码"
            />

            <!-- 其他人员信息 -->
            <div style="margin:10px;">其他人员信息:</div>
            <van-field
              v-model="form.othername"
              :readonly="formType == 3"
              name="othername"
              label="姓名"
              placeholder="请输入姓名"
            />
            <van-field
              v-model="form.otheridno"
              :readonly="formType == 3"
              name="otheridno"
              label="证件号码"
              placeholder="请输入"
            />
            <van-field
              readonly
              clickable
              name="nation"
              label="文化程度"
              placeholder="请选择文化程度"
              :value="name.otherdegree"
              @click="pop.otherdegree = true"
            />
            <template v-if="formType != 3">
              <van-popup v-model="pop.otherdegree" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="selected.degree"
                  @cancel="pop.otherdegree = false"
                  @confirm="otherdegree"
                />
              </van-popup>
            </template>
            <van-field
              v-model="form.otherworkplace"
              :readonly="formType == 3"
              name="otherworkplace"
              label="工作单位"
              placeholder="请输入工作单位"
            />
            <van-field
              v-model="form.otherphone"
              :readonly="formType == 3"
              name="otherphone"
              label="手机号码"
              placeholder="请输入手机号码"
            />

            <!-- <van-divider
          :style="{
            color: '#1989fa',
            borderColor: '#1989fa',
            padding: '0 16px'
          }"
          content-position="left"
        >
          父亲
            </van-divider>-->
          </template>
          <div style="margin-top:20px;"></div>
          <!-- 家长备注 -->
          <van-field
            v-model="form.remark"
            v-if="show.remark"
            :rules="rules.remark"
            :required="rules.remark[0].required"
            :readonly="formType == 3"
            name="remark"
            label="家长备注"
            placeholder="请输入家长备注"
            type="textarea"
          />

          <div style="margin: 16px;">
            <template v-if="formType != 3">
              <van-button
                block
                type="info"
                native-type="submit"
                :loading="loading"
                loading-text="提交中..."
                >提交</van-button
              >
            </template>
          </div>
        </van-form>
      </template>

      <!-- 家长报名修改表单 -->
      <van-popup
        :close-on-click-overlay="false"
        v-model="editShow"
        :style="{ width: '90%', minHeight: '190px', padding: '10px' }"
      >
        <h4 class="pmTitle">报名修改</h4>
        <van-form @submit="selectStudent">
          <van-field
            v-model="sForm.name"
            name="name"
            label="学生姓名"
            placeholder="请输入学生姓名"
            :rules="[{ required: true, message: '请输入学生姓名' }]"
          />
          <van-field
            v-model="sForm.idno"
            name="idno"
            label="证件编号"
            placeholder="请输入证件编号"
            :rules="[{ required: true, message: '请输入证件编号' }]"
          />
          <div style="margin: 16px;">
            <van-button block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </van-popup>
    </template>

    <van-popup
      :close-on-click-overlay="false"
      v-model="errShow"
      :style="{ width: '90%', minHeight: '190px', padding: '10px' }"
    >
      <div class="err">
        {{ err.msg }}
        <br />
        <template v-if="err.type === 1">
          <van-count-down :time="err.time" format="DD 天 HH 时 mm 分 ss 秒">
            <template v-slot="timeData">
              <span>距离开始还有:</span>
              <br />
              <span class="item">{{ timeData.days }}天</span>
              <span class="item">{{ timeData.hours }}小时</span>
              <span class="item">{{ timeData.minutes }}分</span>
              <span class="item">{{ timeData.seconds }}秒</span>
            </template>
          </van-count-down>
        </template>
      </div>
    </van-popup>
  </div>
</template>

<script>
//下拉数据
import {
  foreigntype,
  nation,
  country,
  degree,
  special,
  sourcetype
} from "~/utils/data";
import areaList from "~/utils/area";

//接口
import main from "~/api/reportStudent"; //报名
import setting from "~/api/formSetting"; //表单设置
import enrollInfo from "~/api/freshmenReport"; //类别信息
import examineSetting from "~/api/examineSetting"; //类别设置
import reportStudent from "~/api/reportStudent"; //报名学生列表

//组件
import markForm from "~/pages/index/studentIndex/reportStudent/components/_mark.vue"; //评分表单

export default {
  components: {
    markForm
  },
  computed: {
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    // //学生类型id
    // enrollId() {
    //   return this.$store.state.auth.enrollId;
    // },
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    }
  },
  data() {
    return {
      isOpen: false,
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(3000, 0, 1),
      schoolTitle: "",
      title: "新生报名",
      point: "", //通知内容
      testData: {},
      formShow: false, //表单提交
      editShow: false, //表单修改
      markShow: false, //评分展示
      errShow: false, //活动错误展示
      err: {
        type: 1, //1:未开始  2:已结束
        time: 0,
        msg: ""
      },
      id: "", //数据id
      enrollId: "", //学生类别id
      formType: 1, //表单类型(1是报名,2是修改,3是评分,4是审核)
      loading: false,
      //弹出层配置
      pop: {
        birthday: false,
        idcardtype: false,
        foreigntype: false,
        nation: false,
        country: false,
        areaList: false,
        houseType: false,
        fatherdegree: false, //父亲文化程度
        motherdegree: false, //母亲文化程度
        otherdegree: false, //父亲文化程度
        unmovBegin: false, //使用期限起
        unmovEnd: false, //使用期限止
        housedeadline: false, //产权获得日期
        address: false //现居省市区地址
      },
      //要展示的数据
      name: {
        idcardtype: "",
        foreigntype: "",
        nation: "",
        country: "",
        fatherdegree: "本科",
        motherdegree: "本科",
        otherdegree: "本科",
        areaList: "", //省市区
        houseType: "", //房产证类型
        unmovBegin: "", //使用期限起
        unmovEnd: "", //使用期限止
        housedeadline: "", //产权获得日期
        address: "" //现居省市区
      },
      //要处理的数据
      data: {
        address: "", //现居省市区
        birthday: "",
        sex: "", //性别
        areaList: "",
        houseType: "",
        unmovBegin: "", //使用期限起
        unmovEnd: "", //使用期限止
        housedeadline: "", //产权获得日期
        special: [] //特长
      },
      //下拉选择配置
      selected: {
        idcardtype: [
          { text: "居民身份证", v: 1 },
          { text: "其它", v: 2 }
        ],
        houseType: [
          { text: "不动产权证书", v: 1 },
          { text: "房地产权证", v: 2 }
        ],
        special, //特长
        sourcetype, //生源类型
        foreigntype, //港澳台侨外
        nation, //民族
        country: [], //国家
        degree, //文化程度
        areaList //省市区
      },
      //表单显示隐藏
      show: {
        name: false,
        address: false,
        birthday: false,
        carer: false,
        carerphone: false,
        childhood: false,
        country: false,
        enrollId: false,
        fatherdegree: false,
        fathername: false,
        fatherphone: false,
        fatherworkplace: false,
        foreigntype: false,
        homeRemark: false,
        hometown: false,
        housedeadline: false,
        houseproof: false,
        idcardtype: false,
        idno: false,
        immuneless: false,
        motherdegree: false,
        mothername: false,
        motherphone: false,
        motherworkplace: false,
        nation: false,
        otherdegree: false,
        othername: false,
        otherphone: false,
        otherworkplace: false,
        owner: false,
        province: false,
        rank: false,
        rankUnionid: false,
        remark: false,
        sex: false,
        special: false,
        street: false,
        tag: false,
        unmovabledeadline: false,
        unmovableproof: false,
        village: false,
        sourcetype: false //生源类型
      },
      sForm: {
        name: "", //学生姓名
        idno: "" //证件号码
      },
      //表单字段
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
        fatherdegree: "3",
        fathername: undefined,
        fatheridno: undefined, //爸爸证件号
        fatherphone: undefined,
        fatherworkplace: undefined,
        foreigntype: undefined,
        homeRemark: undefined,
        hometown: undefined,
        housedeadline: undefined,
        houseproof: undefined,
        idcardtype: undefined,
        idno: undefined,
        immuneless: 0,
        motherdegree: "3",
        mothername: undefined,
        motheridno: undefined, //妈妈证件号
        motherphone: undefined,
        motherworkplace: undefined,
        nation: undefined,
        otherdegree: "3",
        othername: undefined,
        otheridno: undefined, // 其它证件号
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
        unmovBegin: undefined,
        unmovEnd: undefined,
        housetype: undefined,
        sourcetype: undefined //生源类型
      },
      //变淡验证规则
      rules: {
        name: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        unmovBegin: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        unmovEnd: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        houseType: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        address: [
          {
            required: true,
            message: " ",
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
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: "手机号格式有误",
            trigger: "blur"
          }
        ],

        childhood: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        country: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        enrollId: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        fatherdegree: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        fathername: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        fatheridno: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        fatherphone: [
          {
            required: true,
            message: "手机号格式有误",
            pattern: "",
            trigger: "blur"
          }
        ],

        fatherworkplace: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        foreigntype: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        homeRemark: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        hometown: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        housedeadline: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        houseproof: [
          {
            required: true,
            message: " ",
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
            message: "身份证格式有误",
            trigger: "blur",
            validator: value => {
              var num = value.toUpperCase();
              // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
              var reg = /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/;
              if (!reg.test(num)) {
                return false;
              }
              // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
              // 下面分别分析出生日期和校验位
              var len, re;
              len = num.length;
              if (len == 15) {
                re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
                var arrSplit = num.match(re);
                // 检查生日日期是否正确
                var dtmBirth = new Date(
                  "19" + arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]
                );
                var bGoodDay;
                bGoodDay =
                  dtmBirth.getYear() == Number(arrSplit[2]) &&
                  dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
                  dtmBirth.getDate() == Number(arrSplit[4]);
                if (!bGoodDay) {
                  return false;
                }
              }
              if (len == 18) {
                re = new RegExp(
                  /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
                );
                var arrSplit = num.match(re);
                // 检查生日日期是否正确
                var dtmBirth = new Date(
                  arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]
                );
                var bGoodDay;
                bGoodDay =
                  dtmBirth.getFullYear() == Number(arrSplit[2]) &&
                  dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
                  dtmBirth.getDate() == Number(arrSplit[4]);
                if (!bGoodDay) {
                  return false;
                } else {
                  // 检验18位身份证的校验码是否正确。
                  // 校验位按照ISO 7064:1983.MOD
                  // 11-2的规定生成，X可以认为是数字10。
                  var valnum;
                  var arrInt = new Array(
                    7,
                    9,
                    10,
                    5,
                    8,
                    4,
                    2,
                    1,
                    6,
                    3,
                    7,
                    9,
                    10,
                    5,
                    8,
                    4,
                    2
                  );
                  var arrCh = new Array(
                    "1",
                    "0",
                    "X",
                    "9",
                    "8",
                    "7",
                    "6",
                    "5",
                    "4",
                    "3",
                    "2"
                  );
                  var nTemp = 0,
                    i;
                  for (var i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                  }
                  valnum = arrCh[nTemp % 11];
                  if (valnum != num.substr(17, 1)) {
                    return false;
                  }
                }
              }
              return true;
            }
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
            message: " ",
            trigger: "blur"
          }
        ],

        mothername: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        motheridno: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        motherphone: [
          {
            required: true,
            message: "手机号格式有误",
            pattern: "",
            trigger: "blur"
          }
        ],

        motherworkplace: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        nation: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        otherdegree: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        othername: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        otheridno: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        otherphone: [
          {
            required: true,
            message: "手机号格式有误",
            pattern: "",
            trigger: "blur"
          }
        ],

        otherworkplace: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        owner: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        province: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        rank: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        rankUnionid: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        remark: [
          {
            required: true,
            message: " ",
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
            message: " ",
            trigger: "blur"
          }
        ],

        street: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        tag: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        unmovabledeadline: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        unmovableproof: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],

        village: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        sourcetype: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ]
      },

      //评分设置
      mark: {
        power: false, //权限
        type: 1, //评分类型(1.等第,2是分数)
        modeItem: [], //评分项
        scorings: [], //评分规则
        user: [] //有评分权限的人
      },
      desc: ["F", "E", "D", "C", "B", "A"],
      data: {
        rank: 0
      },
      table: {
        time: [],
        select: {
          name: undefined,
          idno: undefined,
          carerphone: undefined,
          signupstarttime: undefined,
          signupendtime: undefined
        },
        selectedRowKeys: [], //选中的数据的id
        selectedRows: [], //选中的数据
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true, //是否可以改变 pageSize
          pageSizeOptions: ["20", "40", "60", "80", "100", "500", "3000"]
        },
        //表头,
        columns: [
          {
            title: "序号",
            dataIndex: "idx",
            scopedSlots: { customRender: "idx" },
            width: 50
          },
          {
            title: "姓名",
            dataIndex: "name",
            width: 145,
            scopedSlots: { customRender: "name" }
          },
          {
            title: "评定结果",
            dataIndex: "rankShow",
            width: 80,
            scopedSlots: { customRender: "rankShow" }
          },
          {
            title: "操作",

            scopedSlots: { customRender: "tool" }
          }
        ],
        //数据
        data: []
      }
    };
  },
  head() {
    return {
      title: this.title
    };
  },
  watch: {
    "data.special"(nv) {
      if (nv) {
        this.form.special = nv.join(",");
      } else {
        this.form.special = "";
      }
    }
    // "data.sex"(nv) {
    //   if (nv === 1) {
    //     this.form.sex = "男";
    //   } else {
    //     this.form.sex = "女";
    //   }
    // }
  },
  mounted() {
    this.schoolTitle = this.$route.query.schoolName;
  },
  created() {
    country()
      .then(res => {
        // // console.log("res--------------", res);
        this.selected.country = res;
        // // console.log("gujiaosddhdhdhddhh--------------", this.setting.country);
      })
      .catch(err => {
        this.$message.error(err);
      });

    // // console.log(this.$route);
    //获取id
    this.id = this.$route.params.id;
    //获取表单类型
    let userinfo = this.$route.params.formType.split("-");
    this.formType = userinfo[0];
    //获取学生的类型
    this.enrollId = this.$route.params.enrollId;

    // console.log("表单的id是-------", this.id);
    // console.log("表单类型是-------", this.formType);
    // console.log("学生类型是-------", this.enrollId);
    //获取类别信息
    this.getEnrollInfo();

    if (this.formType != 3) {
      //获取表单设置
      this.getSetting(this.id);

      setting
        .list({ enrollId: this.enrollId, tableid: this.id })
        .then(res => {
          let info = res.data[0];
          this.point = info.point;
          if (this.formType == 1) {
            //报名

            //比较是否在报名时间内
            let from = this.$moment(info.datefrom).isBefore(this.$moment());
            let to = this.$moment().isBefore(info.dateto);
            // console.log("from-----", from);
            // console.log("to-----", to);
            if (!from) {
              this.err.type = 1;
              this.err.msg = "报名暂未开始";
              this.err.time = this.$moment(info.datefrom).diff(this.$moment());
              this.errShow = true;
            } else if (!to) {
              this.err.type = 2;
              this.err.msg = "报名已结束";
              this.errShow = true;
            } else {
              this.formShow = true;
            }
          } else if (this.formType == 2) {
            //家长修改表单
            let from = this.$moment(info.updatestarttime).isBefore(
              this.$moment()
            );
            let to = this.$moment().isBefore(info.updateendtime);
            // console.log("from-----", from);
            // console.log("to-----", to);
            if (!from) {
              this.err.type = 1;
              this.err.msg = "报名信息修改暂未开始";
              this.err.time = this.$moment(info.updatestarttime).diff(
                this.$moment()
              );
              this.errShow = true;
            } else if (!to) {
              this.err.type = 2;
              this.err.msg = "报名信息修改已结束";
              this.errShow = true;
            } else {
              this.editShow = true;
            }
          }
        })
        .catch(err => {
          console.error("错误", err);
          this.$message.error(err);
        });
    } else {
      //获取类别设置
      this.getExamineSetting();
      //评分
      //表单项全开
      //   for (const key in this.show) {
      //     if (this.show.hasOwnProperty(key)) {
      //       this.show[key] = true;
      //     }
      //   }
      //老师评分
      //   // console.log(info[1]);
      //   // console.log(info[2]);
      //   this.sForm.name = userinfo[1];
      //   this.sForm.idno = userinfo[2];
      //   this.selectStudent();
      this.table.select.name = userinfo[1];
      this.table.select.idno = userinfo[2];
      this.getTableData();
    }
  },
  methods: {
    clearSelectForm() {
      this.table.select.name = undefined;
      this.table.select.idno = undefined;
    },
    validator(value) {
      var num = value.toUpperCase();
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
      var reg = /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/;
      if (!reg.test(num)) {
        return false;
      }
      // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      // 下面分别分析出生日期和校验位
      var len, re;
      len = num.length;
      if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);
        // 检查生日日期是否正确
        var dtmBirth = new Date(
          "19" + arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]
        );
        var bGoodDay;
        bGoodDay =
          dtmBirth.getYear() == Number(arrSplit[2]) &&
          dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
          dtmBirth.getDate() == Number(arrSplit[4]);
        if (!bGoodDay) {
          return false;
        }
      }
      if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);
        // 检查生日日期是否正确
        var dtmBirth = new Date(
          arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]
        );
        var bGoodDay;
        bGoodDay =
          dtmBirth.getFullYear() == Number(arrSplit[2]) &&
          dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
          dtmBirth.getDate() == Number(arrSplit[4]);
        if (!bGoodDay) {
          return false;
        } else {
          // 检验18位身份证的校验码是否正确。
          // 校验位按照ISO 7064:1983.MOD
          // 11-2的规定生成，X可以认为是数字10。
          var valnum;
          var arrInt = new Array(
            7,
            9,
            10,
            5,
            8,
            4,
            2,
            1,
            6,
            3,
            7,
            9,
            10,
            5,
            8,
            4,
            2
          );
          var arrCh = new Array(
            "1",
            "0",
            "X",
            "9",
            "8",
            "7",
            "6",
            "5",
            "4",
            "3",
            "2"
          );
          var nTemp = 0,
            i;
          for (var i = 0; i < 17; i++) {
            nTemp += num.substr(i, 1) * arrInt[i];
          }
          valnum = arrCh[nTemp % 11];
          if (valnum != num.substr(17, 1)) {
            return false;
          }
        }
      }
      return true;
    },
    //获得类别信息
    getEnrollInfo() {
      enrollInfo
        .find({ enrollId: this.enrollId })
        .then(res => {
          // console.log("类别信息为------", res);
          this.title = res.data[0].studenttype;
          if (res.data[0].isClose == 1) {
            //说明报名已经关闭
            this.isOpen = true;
            this.errShow = true;
            this.err.msg = "报名已关闭";
            this.err.type = 2;
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //设置表单的显示与隐藏
    getSetting(id) {
      setting
        .find({ id })
        .then(res => {
          // console.log("获取的表单数据是--------", res.data);
          let list = res.data;
          for (const key in this.show) {
            if (this.show.hasOwnProperty(key)) {
              this.show[key];
              let info = list.find(item => item.field == key);
              if (info) {
                this.show[key] = info.visible === 1 ? true : false;
                this.rules[key][0].required =
                  info.required === 1 ? true : false;

                if (info.field === "houseproof") {
                  this.rules.houseType[0].required =
                    info.required === 1 ? true : false;
                  this.rules.unmovableproof[0].required =
                    info.required === 1 ? true : false;
                  this.rules.houseproof[0].required =
                    info.required === 1 ? true : false;
                  this.rules.housedeadline[0].required =
                    info.required === 1 ? true : false;
                  this.rules.owner[0].required =
                    info.required === 1 ? true : false;
                  this.rules.unmovBegin[0].required =
                    info.required === 1 ? true : false;
                  this.rules.unmovEnd[0].required =
                    info.required === 1 ? true : false;
                }
              }
            }
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //#### form表单数据处理赋值
    birthday(value) {
      this.form.birthday = this.$moment(value).format("YYYY-MM-DD");
      this.pop.birthday = false;
    },
    housedeadline(value) {
      this.form.housedeadline = this.$moment(value).format("YYYY-MM-DD");
      this.pop.housedeadline = false;
    },
    unmovBegin(value) {
      this.form.unmovBegin = this.$moment(value).format("YYYY-MM-DD");
      this.pop.unmovBegin = false;
    },
    unmovEnd(value) {
      this.form.unmovEnd = this.$moment(value).format("YYYY-MM-DD");
      this.pop.unmovEnd = false;
    },
    idcardtype(value) {
      // console.log("选择的证件类型---", value);
      this.form.idcardtype = value.v;
      this.name.idcardtype = value.text;
      this.pop.idcardtype = false;

      if (value.v === 1) {
        // this.rules.idno[0].required = true;
        this.rules.idno[0].validator = this.validator;
      } else if (value.v === 2) {
        // this.rules.idno[0].required = false;
        this.rules.idno[0].validator = "";
      }
    },
    sourcetype(value) {
      // console.log("选择的证件类型---", value);
      this.form.sourcetype = value.v;
      this.name.sourcetype = value.text;
      this.pop.sourcetype = false;
    },

    foreigntype(value) {
      // console.log("选择的类型---", value);
      this.form.foreigntype = value.v;
      this.name.foreigntype = value.text;
      this.pop.foreigntype = false;
    },
    nation(value) {
      // console.log("选择的类型---", value);
      this.form.nation = value.v;
      this.name.nation = value.text;
      this.pop.nation = false;
    },
    country(value) {
      // console.log("选择的类型---", value);
      this.form.country = value.v;
      this.name.country = value.text;
      this.pop.country = false;
    },
    fatherdegree(value) {
      // console.log("选择的类型---", value);
      this.form.fatherdegree = value.v;
      this.name.fatherdegree = value.text;
      this.pop.fatherdegree = false;
    },
    motherdegree(value) {
      // console.log("选择的类型---", value);
      this.form.motherdegree = value.v;
      this.name.motherdegree = value.text;
      this.pop.motherdegree = false;
    },
    otherdegree(value) {
      // console.log("选择的类型---", value);
      this.form.otherdegree = value.v;
      this.name.otherdegree = value.text;
      this.pop.otherdegree = false;
    },
    houseType(value) {
      // console.log("选择的类型---", value);
      this.form.housetype = value.v;
      this.name.houseType = value.text;
      this.pop.houseType = false;
    },
    areaList(value) {
      // console.log("选择的数据------", value);
      let list = value.map(item => item.name);
      this.name.areaList = list.join("/");
      if (this.show.address) {
        this.name.address = list.join("/");
      }
      this.form.province = list[0];
      this.form.street = list[1];
      this.form.village = list[2];
      this.pop.areaList = false;
    },
    addressList(value) {
      // console.log("选择的数据------", value);
      let list = value.map(item => item.name);
      this.name.address = list.join("/");
      this.pop.address = false;
    },
    selectStudent() {
      main
        .find(this.sForm)
        .then(res => {
          this.setForm(res.data);
          this.editShow = false;
          this.formShow = true;
        })
        .catch(err => {
          console.error("错误", err);
          this.$message.error(err);
        });
    },
    setForm(data) {
      this.testData = data;
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = data[key];
        }
      }

      if (data.idcardtype) {
        let typeInfo = this.selected.idcardtype.find(
          item => item.v == data.idcardtype
        );
        this.name.idcardtype = typeInfo ? typeInfo.text : "";
      }

      if (data.foreigntype || data.foreigntype === 0) {
        let typeInfo = this.selected.foreigntype.find(
          item => item.v == data.foreigntype
        );
        this.name.foreigntype = typeInfo ? typeInfo.text : "";
      }
      if (data.country) {
        let typeInfo = this.selected.country.find(
          item => item.v == data.country
        );
        this.name.country = typeInfo ? typeInfo.text : "";
      }

      if (data.nation) {
        let typeInfo = this.selected.nation.find(item => item.v == data.nation);
        this.name.nation = typeInfo ? typeInfo.text : "";
      }

      if (data.special) {
        this.data.special = data.special.split(",");
      }

      if (data.province) {
        this.name.areaList = `${data.province}/${data.street}/${data.village}`;
      }

      if (!data.housetype) {
        this.form.housetype = 1;
        this.name.houseType = "不动产权证书";
        data.housetype = 1;
      }

      if (data.housetype === 1) {
        this.form.housetype = 1;
        this.name.houseType = "不动产权证书";
      } else {
        this.form.housetype = 2;
        this.name.houseType = "房地产权证";
      }
      //   if (data.unmovableproof) {
      //     this.form.housetype = 1;
      //     this.name.houseType = "不动产权证书";
      //   } else {
      //     this.form.housetype = 2;
      //     this.name.houseType = "房地产权证";
      //   }

      if (data.unmovabledeadline) {
        let time = data.unmovabledeadline.split(" ~ ");
        this.form.unmovBegin = time[0];
        this.form.unmovEnd = time[1];
      }

      if (data.fatherdegree) {
        this.name.fatherdegree = this.selected.degree.find(
          item => item.v == data.fatherdegree
        ).text;
      }
      if (data.motherdegree) {
        this.name.motherdegree = this.selected.degree.find(
          item => item.v == data.motherdegree
        ).text;
      }
      if (data.otherdegree) {
        this.name.otherdegree = this.selected.degree.find(
          item => item.v == data.otherdegree
        ).text;
      }

      if (data.birthday) {
        this.form.birthday = this.$moment(data.birthday).format("YYYY-MM-DD");
      }
      if (data.housedeadline) {
        this.form.housedeadline = this.$moment(data.housedeadline).format(
          "YYYY-MM-DD"
        );
      }

      if (data.address) {
        let address = data.address.split(" ");
        this.name.address = address[0];
        this.form.address = address[1];
      }

      this.form.enrollId = data.enrollId;
      this.form.homeRemark = data.homeRemark;
    },
    itemPanduan() {
      let type = false;
      let phone = false;
      if (
        this.form.fathername &&
        this.form.fatherdegree &&
        this.form.fatherworkplace &&
        this.form.fatherphone
      ) {
        type = true;
        phone = /^[1][3,4,5,7,8][0-9]{9}$/.test(this.form.fatherphone);
      }
      if (
        this.form.mothername &&
        this.form.motherdegree &&
        this.form.motherworkplace &&
        this.form.motherphone
      ) {
        phone = /^[1][3,4,5,7,8][0-9]{9}$/.test(this.form.fatherphone);
        type = true;
      }

      if (
        this.form.othername &&
        this.form.otherdegree &&
        this.form.otherworkplace &&
        this.form.otherphone
      ) {
        phone = /^[1][3,4,5,7,8][0-9]{9}$/.test(this.form.fatherphone);
        type = true;
      }
      if (type) {
        return true;
      } else if (!type) {
        this.$message.error("联系人必选填写完整的一组");
        return false;
      } else {
        this.$message.error("联系人手机号格式有误");
        return false;
      }
    },
    submitFail() {
      this.$message.error("您有未填写的信息");
    },
    onSubmit(values) {
      let submitInfo = false;
      if (this.rules.fathername[0].required) {
        submitInfo = this.itemPanduan();
      } else {
        submitInfo = true;
      }
      if (submitInfo) {
        // this.$message.success("提交成功");
        // console.log("submit", values);
        let formData = { ...this.form };
        // console.log(formData);
        //   formData.actionUnionid = this.unionid; //用户id
        // formData.actiontime = this.$moment().format("YYYY-MM-DD HH:mm:ss"); //操作时间

        // console.log(formData);
        if (this.show.address) {
          formData.address = this.name.address + " " + formData.address;
        }

        if (this.form.unmovBegin && this.form.unmovEnd) {
          formData.unmovabledeadline = `${this.form.unmovBegin} ~ ${this.form.unmovEnd}`;
        }
        //   debugger;
        if (this.formType == 1) {
          formData.enrollId = this.enrollId;

          main
            .add(formData)
            .then(res => {
              this.$router.replace({
                path: "/phone/result/success",
                query: {
                  type: 1
                }
              });
            })
            .catch(err => {
              this.$message.error(err);
            });
        } else if (this.formType == 2) {
          main
            .edit(formData)
            .then(res => {
              this.$router.replace({
                path: "/phone/result/success",
                query: {
                  type: 2
                }
              });
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      }
    },
    //#####评分操作
    //获取设置
    getExamineSetting() {
      examineSetting
        .list({ enrollId: this.enrollId })
        .then(res => {
          // console.log("传过来");
          let {
            enroll,
            enrollItems,
            scorings,
            userChecks,
            userItems
          } = res.data;
          //   //评分设置
          this.mark.type = enroll.scoringtype;
          this.mark.modeItem = enrollItems;
          this.mark.scorings = scorings;
          this.mark.user = userItems;
          this.getPower("mark");
          //比较是否在报名时间内
          let from = this.$moment(enroll.evaluatedatefrom).isBefore(
            this.$moment()
          );
          let to = this.$moment().isBefore(enroll.evaluatedateto);

          if (enroll.isopen === 0) {
            this.err.type = 2;
            this.err.msg = "评分已关闭";
            this.errShow = true;
          } else if (!from) {
            this.err.type = 1;
            this.err.msg = "评分暂未开始";
            this.err.time = this.$moment(enroll.evaluatedatefrom).diff(
              this.$moment()
            );
            this.errShow = true;
          } else if (!to) {
            this.err.type = 2;
            this.err.msg = "评分已结束";
            this.errShow = true;
          } else if (!this.mark.power) {
            this.err.type = 2;
            this.err.msg = "您没有评分权限";
            this.errShow = true;
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //获取评分或审核权限
    getPower(type) {
      //   debugger;
      let power = this[type].user.findIndex(
        item => item.unionid === this.unionid
      );
      this[type].power = power > -1 ? true : false;
    },
    toMark(record) {
      //   this.markShow = true;
      this.$refs.markForm.show(this.mark.modeItem, record);
    },
    //评分表格操作
    //获取数据
    getTableData() {
      //用户列表
      reportStudent
        .list({
          pagenum: this.table.pagination.current,
          pagesize: this.table.pagination.pageSize,
          enrollId: this.enrollId,
          ...this.table.select
        })
        .then(res => {
          let rdata = res.data;
          // console.log(rdata.list);
          this.table.data = rdata.list.map(item => {
            let obj = { ...item };
            if (item.rank) {
              obj.rankShow = this.desc.findIndex(j => j === item.rank) + 1;
            }

            if (item.items) {
              let info = item.items.map(el => {
                return `${el.item} ${el.branch}分`;
              });
              obj.rankInfo = info.join(",");
            }

            return obj;
          });
          this.table.pagination.total = rdata.total;
        });
      // .catch(err => {
      //   this.$message.error(err);
      // });
    },
    //页码改变触发
    tableChange({ current, pageSize }) {
      this.table.pagination.current = current;
      this.table.pagination.pageSize = pageSize;
      this.getTableData();
    },
    //获取表格选中的数据
    onSelectChange(selectedRowKeys, selectedRows) {
      // console.log("selectedRowKeys changed: ", selectedRowKeys);
      // console.log("selectedRows changed: ", selectedRows);
      this.table.selectedRowKeys = selectedRowKeys;
      this.table.selectedRows = selectedRows;
    },
    //重载表格
    reloadTable() {
      this.table.pagination.current = 1;
      //   this.table.pagination.pageSize = pageSize;
      this.getTableData();
    }
  }
};
</script>

<style lang="scss" scoped>
.pmTitle {
  text-align: center;
  margin-bottom: 10px;
}
.form {
  padding: 10px;
}
.main {
  width: 70%;
}
.mark {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  text-align: right;
}
.err {
  color: red;
  font-size: 25px;
  text-align: center;
  line-height: 190px;
}
.item {
  display: inline-block;
  width: 40px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #1989fa;
}
.form-title {
  margin-top: 10px;
  width: 100%;
  text-align: center;
}
.type-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid gray;
}

.sex {
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  border-radius: 50%;
  text-align: center;
  // border: 1px solid black;
  font-size: 13px;
  color: white;
}
.nan {
  background: #4f6fff;
}
.nv {
  background: #be4fff;
}
.type {
  display: inline-block;
  background: #51b337;
  width: 50px;
  color: white;
  height: 20px;
  line-height: 19px;
  font-size: 12px;
  border-radius: 10px;
  text-align: center;
  position: relative;
}
.star-text {
  font-size: 12px;
  position: relative;
  top: 1px;
}
/deep/ .ant-form-inline .ant-form-item {
  margin-right: 1px !important;
}
/deep/ .ant-form-item-children {
  font-size: 12px !important;
}
</style>

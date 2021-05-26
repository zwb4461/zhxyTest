<template>
  <div>
    <!-- --------------------------------------- -->
    <!-- <a-form-model ref="ruleForm" :model="form" :rules="rules"></a-form-model> -->
    <a-form-model
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      ref="ruleForm"
      :wrapper-col="wrapperCol"
    >
      <a-row type="flex" justify="center">
        <a-col :span="8">
          <div class="ppBtn">
            <a-form-model-item label="姓名:" prop="name">
              <a-input
                v-model="form.name"
                placeholder="请输入姓名"
                class="inp_default"
                style="width:165px"
              ></a-input>
            </a-form-model-item>
            <a-button
              size="small"
              style="margin-left:30px;margin-top:10px"
              @click="ddpp"
              >匹配</a-button
            >
          </div>
          <a-form-model-item label="曾用名:" prop="named">
            <a-input
              v-model="form.named"
              placeholder="请输入曾用名"
              class="inp_default"
            ></a-input>
          </a-form-model-item>
          <a-form-model-item label="国籍:" prop="gjdq">
            <a-select
              class="inp_default"
              show-search
              :filter-option="filterOption"
              option-filter-prop="children"
              v-model="form.gjdq"
              placeholder="请选择"
            >
              <a-select-option v-for="item in setting.country" :key="item.v">
                {{ item.text }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="证件类型:" prop="sfzjlx">
            <a-select v-model="form.sfzjlx" class="inp_default">
              <a-select-option value="居民身份证">居民身份证</a-select-option>
              <a-select-option value="其它">其它</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="档案出生:" prop="dacsny">
            <a-date-picker
              @change="onChange2"
              class="inp_default"
              v-model="data.dacsny"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <!-- --------------------------------------------------------------------------------- -->
          <a-form-model-item label="性别:" prop="sex">
            <a-radio-group
              name="radioGroup"
              v-model="form.sex"
              default-value="男"
            >
              <a-radio value="男">男</a-radio>
              <a-radio value="女">女</a-radio>
            </a-radio-group>
          </a-form-model-item>

          <a-form-model-item label="出生日期:" prop="csny">
            <a-date-picker
              @change="onChange1"
              class="inp_default"
              v-model="data.csny"
            />
          </a-form-model-item>

          <a-form-model-item label="港澳台侨外">
            <a-select v-model="form.gatwjrs" placeholder="请选择" @change="sss">
              <a-select-option
                v-for="item in setting.foreigntypes"
                :key="item.v"
                >{{ item.text }}</a-select-option
              >
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="证件号码:" prop="zjhm">
            <a-input
              v-model="form.zjhm"
              placeholder="请输入证件号码"
              class="inp_default"
            ></a-input>
          </a-form-model-item>

          <a-form-model-item label="民族:" prop="mz">
            <a-select
              v-model="form.mz"
              placeholder="请选择"
              class="inp_default"
            >
              <a-select-option v-for="item in setting.nation" :key="item.v">
                {{ item.text }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <!-- ------------------------------------------------------------------------------------------start图片------------------------------ -->
          <!-- action:上传的地址//listType:上传列表的内建样式// -->
          <!-- fileList:已经上传的文件列表// -->
          <!-- preview	点击文件链接或预览图标时的回调 -->
          <!-- change	上传文件改变时的状态 -->
          <a-upload
            action="http://103.219.33.112:10010/upload"
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
            name="imgFile"
          >
            <img class="img" v-if="pictrue" :src="pictrue" alt="avatar" />

            <!-- v-if="fileList.length < 1" -->
            <div v-else>
              <a-icon type="plus" />
              <div class="ant-upload-text">证照上传</div>
            </div>
          </a-upload>
          <!--  previewVisible:对话框是否可见//footer:不需要底部内容//cancel:取消按钮事件-->
          <a-modal
            v-if="pictrue"
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img
              alt="example"
              style="width: 100%"
              :src="pictrue"
              class="ant-upload-text"
            />
          </a-modal>
          <!-- ------------------------------------------------------------------------------------------end图片------------------------------ -->
        </a-col>
      </a-row>

      <!-- <a-row>
        <a-col :span="8">col-8</a-col>
        <a-col :span="16">col-8</a-col>
      </a-row>-->
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="籍贯:" prop="jg">
            <a-cascader
              v-model="form.jg"
              :options="setting.city"
              placeholder="选择省市区"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="16">
          <a-form-model-item label="籍贯描述:" prop="jgms">
            <a-textarea
              v-model="form.jgms"
              placeholder="请输入籍贯文字描述"
              :auto-size="{ minRows: 2, maxRows: 5 }"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="出生地:" prop="csd">
            <a-cascader
              v-model="form.csd"
              :options="setting.city"
              placeholder="选择省市区"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="16">
          <a-form-model-item label="出生地文字描述:" prop="csdms">
            <a-textarea
              v-model="form.csdms"
              placeholder="请输入出生地文字描述"
              :auto-size="{ minRows: 2, maxRows: 5 }"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="出生地代码:" prop="csdxzqhdm">
            <p>{{ form.csdxzqhdm }}</p>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="户籍所在地" prop="hjszd">
            <a-cascader
              v-model="form.hjszd"
              :options="setting.city"
              placeholder="选择省市区"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="户籍管理" prop="hjgldw">
            <a-input
              class="inp_default"
              v-model="form.hjgldw"
              placeholder="请输入户籍管理单位"
            ></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="户口性质" prop="hkxz">
            <a-select v-model="form.hkxz" class="inp_default">
              <a-select-option value="农业户口">农业户口</a-select-option>
              <a-select-option value="非农业户口">非农业户口</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="婚姻状况" prop="hyzk">
            <a-select v-model="form.hyzk" class="inp_default">
              <a-select-option value="已婚">已婚</a-select-option>
              <a-select-option value="未婚">未婚</a-select-option>
              <a-select-option value="离婚">离婚</a-select-option>
              <a-select-option value="丧偶">丧偶</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="计划生育:" prop="jhsyqk">
            <a-select v-model="form.jhsyqk" class="inp_default">
              <a-select-option value="未超生">未超生</a-select-option>
              <a-select-option value="超生1胎">超生1胎</a-select-option>
              <a-select-option value="超生2胎">超生2胎</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="健康与伤残:" prop="jkyscqk">
            <a-select v-model="form.jkyscqk" class="inp_default">
              <a-select-option value="健康或良好">健康或良好</a-select-option>
              <a-select-option value="一般或较弱">一般或较弱</a-select-option>
              <a-select-option value="有慢性病（一）"
                >有慢性病（一）</a-select-option
              >
              <a-select-option value="有慢性病（二）"
                >有慢性病（二）</a-select-option
              >
              <a-select-option value="残疾">残疾</a-select-option>
              <a-select-option value="军残">军残</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="专长" prop="zc">
            <a-input
              v-model="form.zc"
              placeholder="请输入专长"
              class="inp_default"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="爱好" prop="ah">
            <a-input
              v-model="form.ah"
              placeholder="请输入爱好"
              class="inp_default"
            ></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="电话号码" prop="dhhm">
            <a-input
              v-model="form.dhhm"
              placeholder="请输入电话号码"
              class="inp_default"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="移动电话" prop="yddh">
            <a-input
              v-model="form.yddh"
              placeholder="请输入移动电话"
              class="inp_default"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="驾照类型" prop="jzlx">
            <a-select v-model="form.jzlx" class="inp_default">
              <a-select-option value="大型客车">大型客车</a-select-option>
              <a-select-option value="牵引车">牵引车</a-select-option>
              <a-select-option value="城市公交车">城市公交车</a-select-option>
              <a-select-option value="中型客车">中型客车</a-select-option>
              <a-select-option value="大型货车">大型货车</a-select-option>
              <a-select-option value="小型汽车">小型汽车</a-select-option>
              <a-select-option value="小型自动挡汽车"
                >小型自动挡汽车</a-select-option
              >
              <a-select-option value="低速载货汽车"
                >低速载货汽车</a-select-option
              >
              <a-select-option value="三轮汽车">三轮汽车</a-select-option>
              <a-select-option value="普通三轮摩托车"
                >普通三轮摩托车</a-select-option
              >
              <a-select-option value="普通二轮摩托车"
                >普通二轮摩托车</a-select-option
              >
              <a-select-option value="畸变摩托车">畸变摩托车</a-select-option>
              <a-select-option value="无轨电车">无轨电车</a-select-option>
              <a-select-option value="有轨电车">有轨电车</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="通讯地址" prop="txdz">
            <a-input
              v-model="form.txdz"
              placeholder="请输入通讯地址"
              class="inp_default"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="家庭住址" prop="jtzz">
            <a-input
              v-model="form.jtzz"
              placeholder="请输入家庭住址"
              class="inp_default"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="政治面貌" prop="zzmm">
            <a-select
              class="inp_default"
              show-search
              :filter-option="filterOption"
              option-filter-prop="children"
              placeholder="请选择"
              v-model="form.zzmm"
            >
              <a-select-option
                v-for="item in setting.politicalOutlook"
                :key="item.v"
                >{{ item.text }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="党内职务" prop="dnzw">
            <a-select
              v-model="form.dnzw"
              placeholder="请选择"
              class="inp_default"
            >
              <a-select-option v-for="item in setting.zhiwu" :key="item.v">
                {{ item.text }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="入党时间" prop="rdsj">
            <a-date-picker
              @change="onChange3"
              class="inp_default"
              v-model="data.rdsj"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="军转干标识" prop="jzdbs">
            <a-select v-model="form.jzdbs" class="inp_default">
              <a-select-option value="是">是</a-select-option>
              <a-select-option value="否">否</a-select-option>
              <a-select-option value="转业文职干部"
                >转业文职干部</a-select-option
              >
              <a-select-option value="复员军官、警官"
                >复员军官、警官</a-select-option
              >
              <a-select-option value="复员文职干部"
                >复员文职干部</a-select-option
              >
              <a-select-option value="转业士官">转业士官</a-select-option>
              <a-select-option value="复员士官">复员士官</a-select-option>
              <a-select-option value="退伍士兵">退伍士兵</a-select-option>
              <a-select-option value="转业军官、警官"
                >转业军官、警官</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="军队职务:" prop="jdzwjb">
            <a-select v-model="form.jdzwjb" class="inp_default">
              <a-select-option value="军官专技七级"
                >军官专技七级</a-select-option
              >
              <a-select-option value="军官专技八级"
                >军官专技八级</a-select-option
              >
              <a-select-option value="军官专技九级"
                >军官专技九级</a-select-option
              >
              <a-select-option value="正师">正师</a-select-option>
              <a-select-option value="副师">副师</a-select-option>
              <a-select-option value="正团">正团</a-select-option>
              <a-select-option value="副团">副团</a-select-option>
              <a-select-option value="正营">正营</a-select-option>
              <a-select-option value="副营">副营</a-select-option>
              <a-select-option value="正连">正连</a-select-option>
              <a-select-option value="副连">副连</a-select-option>
              <a-select-option value="正排">正排</a-select-option>
              <a-select-option value="军官专技六级"
                >军官专技六级</a-select-option
              >
              <a-select-option value="军官专技十级"
                >军官专技十级</a-select-option
              >
              <a-select-option value="军官专技十一级"
                >军官专技十一级</a-select-option
              >
              <a-select-option value="军官专技十二级"
                >军官专技十二级</a-select-option
              >
              <a-select-option value="军官专技十三级"
                >军官专技十三级</a-select-option
              >
              <a-select-option value="军官专技十四级"
                >军官专技十四级</a-select-option
              >
              <a-select-option value="文职专技十四级"
                >文职专技十四级</a-select-option
              >
              <a-select-option value="正局级">正局级</a-select-option>
              <a-select-option value="副局级">副局级</a-select-option>
              <a-select-option value="正处级">正处级</a-select-option>
              <a-select-option value="副处级">副处级</a-select-option>
              <a-select-option value="正科级">正科级</a-select-option>
              <a-select-option value="副科级">副科级</a-select-option>
              <a-select-option value="一级科员">一级科员</a-select-option>
              <a-select-option value="文职专技六级"
                >文职专技六级</a-select-option
              >
              <a-select-option value="文职专技七级"
                >文职专技七级</a-select-option
              >
              <a-select-option value="文职专技八级"
                >文职专技八级</a-select-option
              >
              <a-select-option value="文职专技九级"
                >文职专技九级</a-select-option
              >
              <a-select-option value="文职专技十级"
                >文职专技十级</a-select-option
              >
              <a-select-option value="文职专技十一级"
                >文职专技十一级</a-select-option
              >
              <a-select-option value="文职专技十二级"
                >文职专技十二级</a-select-option
              >
              <a-select-option value="文职专技十三级"
                >文职专技十三级</a-select-option
              >
              <a-select-option value="二级科员">二级科员</a-select-option>
              <a-select-option value="办事员">办事员</a-select-option>
              <a-select-option value="无">无</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="参工时间:" prop="cjgzsj">
            <a-date-picker
              @change="onChange5"
              class="inp_default"
              v-model="data.cjgzsj"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="离岗退养:" prop="lgty">
            <a-switch
              default-checked
              @change="onChange4"
              checked-children="开启"
              un-checked-children="关闭"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="聘用日期:" prop="pyrq">
            <a-date-picker
              @change="onChange6"
              class="inp_default"
              v-model="data.pyrq"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="教职工来源" prop="jzgly">
            <a-select v-model="form.jzgly" class="inp_default">
              <a-select-option value="招聘">招聘</a-select-option>
              <a-select-option value="应届毕业生">应届毕业生</a-select-option>
              <a-select-option value="往届毕业生">往届毕业生</a-select-option>
              <a-select-option value="民办教师转正"
                >民办教师转正</a-select-option
              >
              <a-select-option value="代课教师考录"
                >代课教师考录</a-select-option
              >
              <a-select-option value="其他招聘">其他招聘</a-select-option>
              <a-select-option value="军队转业、复员"
                >军队转业、复员</a-select-option
              >
              <a-select-option value="调入">调入</a-select-option>
              <a-select-option value="引进人才">引进人才</a-select-option>
              <a-select-option value="其他">其他</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="是否在编" prop="sfzb">
            <a-select v-model="form.sfzb" class="inp_default">
              <a-select-option value="是">是</a-select-option>
              <a-select-option value="否">否</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="入编时间" prop="rbsj">
            <a-date-picker
              @change="onChange7"
              class="inp_default"
              v-model="data.rbsj"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="教职工类别" prop="jzglb">
            <a-select v-model="form.jzglb" class="inp_default">
              <a-select-option value="校本部教职工"
                >校本部教职工</a-select-option
              >
              <a-select-option value="专任教师">专任教师</a-select-option>
              <a-select-option value="行政人员">行政人员</a-select-option>
              <a-select-option value="教辅人员">教辅人员</a-select-option>
              <a-select-option value="工勤人员">工勤人员</a-select-option>
              <a-select-option value="聘请校外教师"
                >聘请校外教师</a-select-option
              >
              <a-select-option value="专职辅导员">专职辅导员</a-select-option>
              <a-select-option value="校办企业职工"
                >校办企业职工</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="用人形式" prop="yrxs">
            <a-select v-model="form.yrxs" class="inp_default">
              <a-select-option value="人事代理">人事代理</a-select-option>
              <a-select-option value="劳务派遣">劳务派遣</a-select-option>
              <a-select-option value="其他">其他</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-model-item label="签订合同:" prop="qdhtqk">
            <a-select v-model="form.qdhtqk" class="inp_default">
              <a-select-option value="未签合同">未签合同</a-select-option>
              <a-select-option value="聘用合同">聘用合同</a-select-option>
              <a-select-option value="劳动合同">劳动合同</a-select-option>
              <a-select-option value="其他合同">其他合同</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="教职工号" prop="jzgh">
            <a-input
              v-model="form.jzgh"
              placeholder="请输入教职工号"
              class="inp_default"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="所属科室" prop="ssks">
            <a-input
              v-model="form.ssks"
              placeholder="请输入所属科室"
              class="inp_default"
            ></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="现工作单位职务" prop="xgzdwzw">
            <a-input
              v-model="form.xgzdwzw"
              placeholder="请输入现工作单位职务"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="信息技术应用能力" prop="xxjsnl">
            <a-select v-model="form.xxjsnl" class="inp_default">
              <a-select-option value="精通">精通</a-select-option>
              <a-select-option value="熟练">熟练</a-select-option>
              <a-select-option value="良好">良好</a-select-option>
              <a-select-option value="一般">一般</a-select-option>
              <a-select-option value="较弱">较弱</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-divider />
      <a-row type="flex" justify="space-between">
        <a-col :span="12">
          <a-form-model-item label="心理健康教育教师" prop="sfxljkjs">
            <a-select v-model="form.sfxljkjs" class="inp_default">
              <a-select-option value="否">否</a-select-option>
              <a-select-option value="专职心理健康教育教师"
                >专职心理健康教育教师</a-select-option
              >
              <a-select-option value="兼职心理健康教育教师"
                >兼职心理健康教育教师</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="全日制师范毕业" prop="sfqrzsfby">
            <a-switch
              default-checked
              @change="onChange10"
              checked-children="是"
              un-checked-children="否"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="属于免费师范生" prop="sfmfsfs">
            <a-select v-model="form.sfmfsfs" class="inp_default">
              <a-select-option value="否">否</a-select-option>
              <a-select-option value="不属师大免费师范生"
                >不属师大免费师范生</a-select-option
              >
              <a-select-option value="地方免费(公费)师范生"
                >地方免费(公费)师范生</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="特教专业培养培训" prop="sfpx">
            <a-switch
              default-checked
              @change="onChange11"
              checked-children="是"
              un-checked-children="否"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="参加基层服务项目" prop="sfcjjcxm">
            <a-select v-model="form.sfcjjcxm" class="inp_default">
              <a-select-option value="农村义务教育阶段学校教师特设岗位计划"
                >农村义务教育阶段学校教师特设岗位计划</a-select-option
              >
              <a-select-option value="中央特岗教师"
                >中央特岗教师</a-select-option
              >
              <a-select-option value="地方特岗教师"
                >地方特岗教师</a-select-option
              >
              <a-select-option value="新疆双语特岗"
                >新疆双语特岗</a-select-option
              >
              <a-select-option value="大学生村官">大学生村官</a-select-option>
              <a-select-option value="高校毕业生三支一扶计划"
                >高校毕业生三支一扶计划</a-select-option
              >
              <a-select-option value="大学生志愿服务西部计划"
                >大学生志愿服务西部计划</a-select-option
              >
              <a-select-option value="不属师大免费师范生"
                >不属师大免费师范生</a-select-option
              >
              <a-select-option value="否">否</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="特殊教育从业证书" prop="sfyzs">
            <a-switch
              default-checked
              @change="onChange12"
              checked-children="是"
              un-checked-children="否"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="基层服务项目起始" prop="cjxmkssj">
            <a-date-picker
              @change="onChange8"
              style="width:280px"
              v-model="data.cjxmkssj"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="2年以上基层经验" prop="shlngzjy">
            <a-switch
              default-checked
              @change="onChange13"
              checked-children="是"
              un-checked-children="否"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="基层服务结束年月：" prop="cjxmjssj">
            <a-date-picker
              @change="onChange9"
              style="width:280px"
              v-model="data.cjxmjssj"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="特级教师" prop="sftjjs">
            <a-switch
              default-checked
              @change="onChange14"
              checked-children="是"
              un-checked-children="否"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="人员状态" prop="ryzt">
            <a-select v-model="form.ryzt" style="width:280px">
              <a-select-option value="在本单位任职"
                >在本单位任职</a-select-option
              >
              <a-select-option value="暂未在本单位任职-借出到机关"
                >暂未在本单位任职-借出到机关</a-select-option
              >
              <a-select-option value="暂未在本单位任职-借出到事业单位"
                >暂未在本单位任职-借出到事业单位</a-select-option
              >
              <a-select-option value="暂未在本单位任职-长病假"
                >暂未在本单位任职-长病假</a-select-option
              >
              <a-select-option value="暂未在本单位任职-进修"
                >暂未在本单位任职-进修</a-select-option
              >
              <a-select-option value="暂未在本单位任职-交流轮岗"
                >暂未在本单位任职-交流轮岗</a-select-option
              >
              <a-select-option value="暂未在本单位任职-企业实践"
                >暂未在本单位任职-企业实践</a-select-option
              >
              <a-select-option value="暂未在本单位任职-因公出国"
                >暂未在本单位任职-因公出国</a-select-option
              >
              <a-select-option value="暂未在本单位任职-离岗创业"
                >暂未在本单位任职-离岗创业</a-select-option
              >
              <a-select-option value="暂未在本单位任职-待退休"
                >暂未在本单位任职-待退休</a-select-option
              >
              <a-select-option value="暂未在本单位任职-待岗"
                >暂未在本单位任职-待岗</a-select-option
              >
              <a-select-option value="暂未在本单位任职-下落不明"
                >暂未在本单位任职-下落不明</a-select-option
              >
              <a-select-option value="暂未在本单位任职-其他"
                >暂未在本单位任职-其他</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="县级及以上骨干教师" prop="sfggjs">
            <a-switch
              default-checked
              @change="onChange15"
              checked-children="是"
              un-checked-children="否"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <!-- --------------------------------------- -->
  </div>
</template>
<script>
//组件

//接口
import main from "~/api/teacherInfo";
import city from "~/utils/area_city";
import {
  zhiwu,
  foreigntype,
  foreigntypes,
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
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  props: {
    btnLoading: Function //按钮加载与不加载
  },
  created() {
    getCountry()
      .then(res => {
        this.setting.country = res;
        // // console.log("gujiaosddhdhdhddhh--------------", this.setting.country);
      })
      .catch(err => {
        this.$message.error(err);
      });
  },
  data() {
    return {
      jg: "",
      csd: "",
      hjszd: "",
      pictrue: "",
      wrapperCol: { span: 10 },
      labelCol: { span: 7 },

      previewVisible: false,
      previewImage: "",
      fileList: [],
      //表单类型(1是新增 , 2是修改)
      formType: 1,
      wrapperCol: { span: 16 },
      dateFormat: "YYYY-MM-DD HH:mm:ss", //日期默认格式
      setting: {
        zhiwu,
        foreigntypes,
        country: "",
        nation: nation,
        city: city.options,
        politicalOutlook,
        user: []
      },
      data: {
        csny: undefined,
        dacsny: undefined,
        cjgzsj: undefined,
        rdsj: undefined,
        pyrq: undefined,
        rbsj: undefined,
        cjxmkssj: undefined,
        cjxmjssj: undefined
      },
      form: {
        pictrue: "",
        txjtdz: "",
        jtjtzz: "",
        name: "",
        sex: "",
        named: "",
        csny: undefined,
        gjdq: "",
        gatwjrs: "",
        sfzjlx: "",
        zjhm: "",
        dacsny: undefined,
        mz: "",
        jg: undefined,
        jgms: "",
        csd: undefined,
        csdms: "",
        csdxzqhdm: "1111",
        hjszd: undefined,
        hjgldw: "",
        hkxz: "",
        hyzk: "",
        jhsyqk: "",
        jkyscqk: "",
        zc: "",
        ah: "",
        dhhm: "",
        yddh: "",
        jzlx: "",
        txdz: "",
        jtzz: "",
        zzmm: "",
        dnzw: "",
        rdsj: undefined,
        jzdbs: "",
        jdzwjb: "",
        lgty: "",
        cjgzsj: undefined,
        pyrq: "",
        jzgly: "",
        sfzb: "",
        rbsj: undefined,
        jzglb: "",
        yrxs: "",
        qdhtqk: "",
        jzgh: "",
        ssks: "",
        xgzdwzw: "",
        xxjsnl: "",
        sfxljkjs: "",
        sfqrzsfby: "",
        sfmfsfs: "",
        sfpx: "",
        sfcjjcxm: "",
        sfyzs: "",
        cjxmkssj: undefined,
        shlngzjy: "",
        cjxmjssj: undefined,
        sftjjs: "",
        ryzt: "",
        sfggjs: "",
        id: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入学校名称",
            trigger: "blur"
          }
        ],

        unionid: [
          {
            required: true,
            message: "请输入操作人",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    "data.csny"(nv) {
      if (nv) {
        this.form.csny = this.$moment(nv).format("YYYY-MM-DD");
      } else {
        this.form.csny = undefined;
      }
    },
    "data.dacsny"(nv) {
      if (nv) {
        this.form.dacsny = this.$moment(nv).format("YYYY-MM-DD");
      } else {
        this.form.dacsny = undefined;
      }
    },
    "data.cjgzsj"(nv) {
      if (nv) {
        this.form.cjgzsj = this.$moment(nv).format("YYYY-MM-DD");
      } else {
        this.form.cjgzsj = undefined;
      }
    },
    "data.rdsj"(nv) {
      if (nv) {
        this.form.rdsj = this.$moment(nv).format("YYYY-MM-DD");
      } else {
        this.form.rdsj = undefined;
      }
    },
    "data.pyrq"(nv) {
      if (nv) {
        this.form.pyrq = this.$moment(nv).format("YYYY-MM-DD");
      } else {
        this.form.pyrq = undefined;
      }
    },
    "data.rbsj"(nv) {
      if (nv) {
        this.form.rbsj = this.$moment(nv).format("YYYY-MM-DD");
      } else {
        this.form.rbsj = undefined;
      }
    },
    "data.cjxmkssj"(nv) {
      if (nv) {
        this.form.cjxmkssj = this.$moment(nv).format("YYYY-MM-DD");
      } else {
        this.form.cjxmkssj = undefined;
      }
    },
    "data.cjxmjssj"(nv) {
      if (nv) {
        this.form.cjxmjssj = this.$moment(nv).format("YYYY-MM-DD");
      } else {
        this.form.cjxmjssj = undefined;
      }
    },
    "form.csd"(nv) {
      if (nv) {
        if (this.form.csd) {
          this.csd =
            this.form.csd[0] +
            "省" +
            this.form.csd[1] +
            "市" +
            this.form.csd[2];
          // console.log("this.csd", this.csd);

          main
            .code({ ssq: this.csd })
            .then(res => {
              this.form.csdxzqhdm = res.data.parentRegionCode;
            })
            .catch(err => {
              console.log("err", err);
            });
        }
      }
    }
  },
  methods: {
    ddpp() {
      main
        .ppTwo({
          schoolId: sessionStorage.getItem("schoolId"),
          id: this.form.id
        })
        .then(res => {
          sessionStorage.removeItem("schoolId");
          // console.log("二次匹配", res, this.id);
        })
        .catch(err => {
          console.log("二次匹配err", err);
        });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleCancel() {
      // console.log("取消了");
      this.previewVisible = false;
    },
    async handlePreview(file) {
      // console.log("点击了预览-file：", file);
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList, event }) {
      this.fileList = fileList;
      if (typeof fileList[0] === "undefined") {
        // console.log("11111");
        return;
      } else if (fileList[0].status == "done") {
        this.form.pictrue = fileList[0].response.data;
      }
    },

    onChange1(date, dateString) {
      this.form.csny = dateString;
      // console.log("date", this.form.csny);
    },
    onChange2(date, dateString) {
      this.form.dacsny = dateString;
      //   console.log("date", this.form.csny);
    },
    onChange3(date, dateString) {
      this.form.rdsj = dateString;
      // console.log("date", this.form.csny);
    },
    onChange4(val) {
      val == true ? (this.form.lgty = 1) : (this.form.lgty = 0);
      //   console.log("val", this.form.lgty);
    },

    onChange5(date, dateString) {
      this.form.cjgzsj = dateString;
      //   console.log("date", this.form.cjgzsj);
    },
    onChange6(date, dateString) {
      this.form.pyrq = dateString;
      //   console.log("date", this.form.cjgzsj);
    },
    onChange7(date, dateString) {
      this.form.rbsj = dateString;
      //   console.log("date", this.form.cjgzsj);
    },
    onChange8(date, dateString) {
      this.form.cjxmkssj = dateString;
      //   console.log("date", this.form.cjgzsj);
    },
    onChange9(date, dateString) {
      this.form.cjxmjssj = dateString;
      //   console.log("date", this.form.cjgzsj);
    },
    onChange10(val) {
      val == true ? (this.form.sfqrzsfby = 1) : (this.form.sfqrzsfby = 0);
      //   console.log("val", this.form.lgty);
    },
    onChange11(val) {
      val == true ? (this.form.sfpx = 1) : (this.form.sfpx = 0);
      //   console.log("val", this.form.lgty);
    },
    onChange12(val) {
      val == true ? (this.form.sfyzs = 1) : (this.form.sfyzs = 0);
      //   console.log("val", this.form.lgty);
    },
    onChange13(val) {
      val == true ? (this.form.shlngzjy = 1) : (this.form.shlngzjy = 0);
      //   console.log("val", this.form.lgty);
    },
    onChange14(val) {
      val == true ? (this.form.sftjjs = 1) : (this.form.sftjjs = 0);
      //   console.log("val", this.form.lgty);
    },
    onChange15(val) {
      val == true ? (this.form.sfggjs = 1) : (this.form.sfggjs = 0);
      //   console.log("val", this.form.lgty);
    },

    setForm(data) {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          if (key === "csny") {
            if (data[key]) {
              let time = this.$moment(data[key]);
              this.data.csny = time;
              this.form.csny = time.format("YYYY-MM-DD");
            }
          } else if (key === "dacsny") {
            if (data[key]) {
              let time = this.$moment(data[key]);
              this.data.dacsny = time;
              this.form.dacsny = time.format("YYYY-MM-DD");
            }
          } else if (key === "cjgzsj") {
            if (data[key]) {
              let time = this.$moment(data[key]);
              this.data.cjgzsj = time;
              this.form.cjgzsj = time.format("YYYY-MM-DD");
            }
          } else if (key === "rdsj") {
            if (data[key]) {
              let time = this.$moment(data[key]);
              this.data.rdsj = time;
              this.form.rdsj = time.format("YYYY-MM-DD");
            }
          } else if (key === "pyrq") {
            if (data[key]) {
              let time = this.$moment(data[key]);
              this.data.pyrq = time;
              this.form.pyrq = time.format("YYYY-MM-DD");
            }
          } else if (key === "rbsj") {
            if (data[key]) {
              let time = this.$moment(data[key]);
              this.data.rbsj = time;
              this.form.rbsj = time.format("YYYY-MM-DD");
            }
          } else if (key === "cjxmkssj") {
            if (data[key]) {
              let time = this.$moment(data[key]);
              this.data.cjxmkssj = time;
              this.form.cjxmkssj = time.format("YYYY-MM-DD");
            }
          } else if (key === "cjxmjssj") {
            if (data[key]) {
              let time = this.$moment(data[key]);
              this.data.cjxmjssj = time;
              this.form.cjxmjssj = time.format("YYYY-MM-DD");
            }
          } else if (key === "csd") {
            if (data[key]) {
              this.form.csd = (data[key] || "").replace(/省/, ",");
              this.form.csd = (this.form.csd || "").replace(/市/, ",");
              this.form.csd = this.form.csd.split(",");
            }
          } else if (key === "hjszd") {
            if (data[key]) {
              this.form.hjszd = (data[key] || "").replace(/省/, ",");
              this.form.hjszd = (this.form.hjszd || "").replace(/市/, ",");
              this.form.hjszd = this.form.hjszd.split(",");
            }
          } else if (key === "jg") {
            if (data[key]) {
              this.form.jg = (data[key] || "").replace(/省/, ",");
              this.form.jg = (this.form.jg || "").replace(/市/, ",");
              this.form.jg = this.form.jg.split(",");
            }
          } else if (key === "csdxzqhdm") {
            if (this.form.csd) {
              this.csd =
                this.form.csd[0] +
                "省" +
                this.form.csd[1] +
                "市" +
                this.form.csd[2];
              main
                .code({ ssq: this.csd })
                .then(res => {
                  this.form.csdxzqhdm = res.data.parentRegionCode;
                })
                .catch(err => {
                  console.log("err", err);
                });
            }
          } else {
            this.form[key] = data[key];
          }
        }
      }
      this.pictrue = this.form.pictrue;
    },
    clearForm() {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = undefined;
        }
      }
      this.data.dacsny = undefined;
      this.data.cjgzsj = undefined;
      this.data.rdsj = undefined;
      this.data.pyrq = undefined;
      this.data.rbsj = undefined;
      this.data.cjxmkssj = undefined;
      this.data.cjxmjssj = undefined;
      this.data.csny = undefined;
      this.form.valid = 0;
    },
    sss(val) {
      // console.log("sss", val);
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.btnLoading(true);

          if (this.formType === 1) {
            //新增
            if (this.form.csd) {
              this.csd =
                this.form.csd[0] +
                "省" +
                this.form.csd[1] +
                "市" +
                this.form.csd[2];
            }
            if (this.form.jg) {
              this.jg =
                this.form.jg[0] +
                "省" +
                this.form.jg[1] +
                "市" +
                this.form.jg[2];
            }
            if (this.form.hjszd) {
              this.hjszd =
                this.form.hjszd[0] +
                "省" +
                this.form.hjszd[1] +
                "市" +
                this.form.hjszd[2];
            }
            let formData = {
              ...this.form,
              schoolId: sessionStorage.getItem("schoolId"),
              csd: this.csd,
              jg: this.jg,
              hjszd: this.hjszd
            };
            main
              .add(formData)
              .then(res => {
                this.btnLoading(false);
                // console.log("新增");
                sessionStorage.removeItem("schoolId");
              })
              .catch(err => {
                this.$message.error(err);
              });
          } else if (this.formType === 2) {
            //修改
            if (this.form.csd) {
              this.csd =
                this.form.csd[0] +
                "省" +
                this.form.csd[1] +
                "市" +
                this.form.csd[2];
            }
            if (this.form.jg) {
              this.jg =
                this.form.jg[0] +
                "省" +
                this.form.jg[1] +
                "市" +
                this.form.jg[2];
            }
            if (this.form.hjszd) {
              this.hjszd =
                this.form.hjszd[0] +
                "省" +
                this.form.hjszd[1] +
                "市" +
                this.form.hjszd[2];
            }
            let formData = {
              ...this.form,
              csd: this.csd,
              jg: this.jg,
              hjszd: this.hjszd
            };
            main
              .edit(formData)
              .then(res => {
                this.btnLoading(false);
              })
              .catch(err => {
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
    }
  }
};
</script>
<style lang="scss" scoped>
.avatar-uploader > .ant-upload {
}
/deep/.ant-upload.ant-upload-select-picture-card {
  width: 200px;
  height: 300px;
}
/deep/.ant-upload-list-picture-card .ant-upload-list-item {
  width: 200px;
  height: 300px;
}
.inp {
  width: 150px;
}
/deep/.ant-form-item-label > label {
  font-size: 13px;
}
.inp_default {
  width: 180px;
}
/deep/.ant-form-item-control {
  text-align: center;
}
/deep/.ant-upload-picture-card-wrapper {
  margin-left: 40px;
}
.img {
  width: 200px;
  height: 300px;
}
/deep/.ant-form-item-control {
  text-align: left;
}
.ppBtn {
  display: flex;
  flex-direction: row;
  // justify-content: middle;
  align-items: middle;
}
</style>

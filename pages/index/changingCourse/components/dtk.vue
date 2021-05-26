<template>
  <div>
    <div class="search">
      <el-cascader
        clearable
        size="small"
        class="input"
        :show-all-levels="false"
        :props="{ children: 'children', label: 'name', value: 'id' }"
        @focus="getXqNj"
        v-model="search.classId"
        :options="xqNjOpt"
      ></el-cascader>
      <el-date-picker
        class="input"
        style="width: 365px"
        size="small"
        v-model="search.createTime"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-input
        size="small"
        class="input"
        v-model="search.oldTeaname"
        placeholder="原授课人"
      ></el-input>
      <el-select
        clearable
        size="small"
        v-model="search.status"
        placeholder="审核状态"
        class="input"
      >
        <el-option
          v-for="item in statusOpt"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button size="small" type="primary" @click="searchTable"
        >查询</el-button
      >
      <el-button size="small" icon="el-icon-setting" @click="csOpt"
        >参数设置</el-button
      >
      <el-button size="small" type="primary" icon="el-icon-plus" @click="add"
        >新增</el-button
      >
    </div>
    <el-table size="small" border :data="tableData" style="width: 100%">
      <el-table-column
        type="index"
        label="序"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column prop="date" label="日期" align="center">
      </el-table-column>
      <el-table-column prop="className" label="班级" align="center">
      </el-table-column>
      <el-table-column prop="stanza" label="课次" align="center">
      </el-table-column>
      <el-table-column prop="oldxkname" label="原授学科" align="center">
      </el-table-column>
      <el-table-column prop="oldTeaname" label="原授课人" align="center">
        <template slot-scope="scope">
          <div style="color: #298cf7">
            {{ scope.row.oldTeaname }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="代课/调课" align="center">
        <template slot-scope="scope">
          <div class="dk2">
            <div
              :class="
                scope.row.type == 1 ? 'tk1' : scope.row.type == 0 ? 'dk1' : ''
              "
            >
              {{
                scope.row.type == 1 ? "调课" : scope.row.type == 0 ? "代课" : ""
              }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="xkname" label="现授学科" align="center">
      </el-table-column>
      <el-table-column prop="teaname" label="现授课人" align="center">
        <template slot-scope="scope">
          <div style="color: #298cf7">
            {{ scope.row.teaname }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <!-- 0：申请中，1：待审核，2：审核通过，3：审核未通过，4：自动通过 -->
          <div>
            <el-tag v-show="scope.row.status == 0" type="warning"
              >申请中</el-tag
            >
            <el-tag v-show="scope.row.status == 1">待审核</el-tag>
            <el-tag type="success" v-show="scope.row.status == 2"
              >审核通过</el-tag
            >
            <el-tag type="danger" v-show="scope.row.status == 3"
              >审核未通过</el-tag
            >
            <el-tag type="success" v-show="scope.row.status == 4"
              >自动通过</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <a-button
            :disabled="
              scope.row.status == 0 ||
              scope.row.status == 2 ||
              scope.row.status == 4 ||
              scope.row.id == null
            "
            size="small"
            type="waring"
            style="color: #fff; background-color: #ffba00"
            @click="pz(scope.row)"
            >批准</a-button
          >
          <a-button
            size="small"
            type="waring"
            @click="edit(scope.row)"
            :disabled="scope.row.id == null"
            >编辑</a-button
          >
          <a-button
            size="small"
            type="waring"
            style="color: #fff; background-color: #ff4d4f"
            :disabled="scope.row.id == null"
            @click="del(scope.row)"
            >删除</a-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="changePageSize"
      @current-change="changePageNum"
      :current-page="pageNum"
      :page-sizes="[20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalDataNum"
    >
    </el-pagination>
    <el-dialog
      title="代调课"
      :visible.sync="showDiaData.showDia"
      width="30%"
      :close-on-click-modal="false"
    >
      <div class="dkOrTk">
        <el-radio-group v-model="showDiaData.form.type">
          <el-radio-button
            v-show="
              (showDiaData.form.type == 0 && showRadio == 0) || showRadio == 1
            "
            :label="0"
            style="margin-right: 20px"
            >代课</el-radio-button
          >
          <el-radio-button
            v-show="
              (showDiaData.form.type == 1 && showRadio == 0) || showRadio == 1
            "
            :label="1"
            >调课</el-radio-button
          >
        </el-radio-group>
      </div>
      <!-- 代课 -->
      <div class="dk" v-show="showDiaData.form.type == 0">
        <el-form
          label-width="90px"
          :model="showDiaData.form"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item label="代课日期:" prop="classId">
            <el-date-picker
              size="small"
              class="inp"
              v-model="showDiaData.form.date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            {{ zj }}
          </el-form-item>
          <el-form-item label="学期年级:" prop="classId">
            <el-cascader
              size="small"
              class="inp"
              :props="{ children: 'children', label: 'name', value: 'id' }"
              @focus="getXqNj"
              v-model="showDiaData.form.classId"
              :options="xqNjOpt"
              @change="getOpt(2, 1)"
            ></el-cascader>
          </el-form-item>

          <!--   prop="oldTeaId"-->
          <el-form-item label="原授课人:">
            <el-select
              filterable
              clearable
              @focus="getOpt(2)"
              size="small"
              class="inp"
              v-model="showDiaData.form.oldTeaId"
            >
              <!-- showDiaData.form.oldTeaId -->
              <el-option
                v-for="item in oldTeanameOpt"
                :key="item.id"
                :label="item.teacherName"
                :value="item.teacherUnionid"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代课课次:" prop="stanza">
            <el-select
              clearable
              size="small"
              class="inp"
              v-model="showDiaData.form.stanza"
              @focus="getOpt(4)"
              @change="setClass_Teacher"
            >
              <el-option
                v-for="item in stanzaOpt"
                :key="item.id"
                :label="item.stanz"
                :value="item.stanz"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代课学科:" prop="xkname">
            <el-select
              clearable
              @focus="getOpt(6)"
              size="small"
              class="inp"
              v-model="showDiaData.form.xkname"
            >
              <el-option
                v-for="item in xkOpt"
                :key="item.id"
                :label="item.subjectName"
                :value="item.subjectName"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="现授课人:">
            <el-select
              filterable
              clearable
              @focus="getOpt(5)"
              size="small"
              class="inp"
              v-model="showDiaData.form.teaId"
              @change="getHl('授课人', 3)"
            >
              <el-option
                v-for="item in teanameOpt"
                :key="item.id"
                :label="item.teacherName"
                :value="item.teacherUnionid"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="授课要求:">
            <el-input
              size="small"
              class="inp"
              v-model="showDiaData.form.must"
            ></el-input>
          </el-form-item>
          <el-form-item label="代课原因:">
            <el-input
              size="small"
              class="inp"
              v-model="showDiaData.form.reason"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="状态:" v-show="!showDiaData.form.teaId">
            <el-select
              clearable
              size="small"
              class="inp"
              v-model="showDiaData.form.status"
            >
              <el-option
                v-for="item in statusOpt"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
      </div>
      <!-- 调课 -->
      <div class="dk" v-show="showDiaData.form.type == 1">
        <el-form
          label-width="90px"
          :model="showDiaData.form"
          :rules="rules1"
          ref="ruleForm1"
        >
          <el-form-item label="调课日期:" prop="date">
            <el-date-picker
              size="small"
              class="inp"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="showDiaData.form.date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            {{ zj }}
          </el-form-item>
          <el-form-item label="学期年级:" prop="classId">
            <el-cascader
              size="small"
              class="inp"
              :props="{ children: 'children', label: 'name', value: 'id' }"
              @focus="getXqNj"
              @change="getOpt(2, 1)"
              v-model="showDiaData.form.classId"
              :options="xqNjOpt"
            ></el-cascader>
          </el-form-item>

          <!--  -->
          <el-form-item label="原授课人:" prop="oldTeaId">
            <el-select
              clearable
              @focus="getOpt(2, 1)"
              size="small"
              class="inp"
              v-model="showDiaData.form.oldTeaId"
            >
              <el-option
                v-for="item in oldTeanameOpt"
                :key="item.id"
                :label="item.teacherName"
                :value="item.teacherUnionid"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调课课次:" prop="stanza">
            <el-select
              clearable
              size="small"
              class="inp"
              @focus="getOpt(4, 1)"
              @change="setClass_Teacher"
              v-model="showDiaData.form.stanza"
            >
              <el-option
                v-for="item in stanzaOpt"
                :key="item.id"
                :label="item.stanz"
                :value="item.stanz"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调课学科:" prop="xkname">
            <el-select
              clearable
              @focus="getOpt(6)"
              size="small"
              class="inp"
              v-model="showDiaData.form.xkname"
            >
              <el-option
                v-for="item in xkOpt"
                :key="item.id"
                :label="item.subjectName"
                :value="item.subjectName"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="现授课人:" prop="teaId">
            <el-select
              clearable
              @focus="getOpt(5)"
              @change="changeXskr"
              size="small"
              class="inp"
              v-model="showDiaData.form.teaId"
            >
              <el-option
                v-for="item in teanameOpt"
                :key="item.id"
                :label="item.teacherName"
                :value="item.teacherUnionid"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="互调年级:" prop="oldclassId">
            <el-cascader
              size="small"
              class="inp"
              :props="{ children: 'children', label: 'name', value: 'id' }"
              @focus="getXqNjHt"
              v-model="showDiaData.form.oldclassId"
              :options="xqNjOptHt"
              @change="getHl('班级', 4)"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="互调日期:" prop="olddate">
            <el-date-picker
              size="small"
              class="inp"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="showDiaData.form.olddate"
              type="date"
              placeholder="选择日期"
              @change="setJc_Xk"
            >
            </el-date-picker>
            {{ zjHt }}
          </el-form-item>
          <el-form-item label="互调课次:" prop="oldStanza">
            <el-select
              clearable
              size="small"
              class="inp"
              v-model="showDiaData.form.oldStanza"
              @change="confirmXk"
              @focus="getOpt(4)"
            >
              <el-option
                v-for="item in stanzaOptHt"
                :key="item.id"
                :label="item.stanz"
                :value="item.stanz"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <!--     @focus="getOpt(1)"-->
          <el-form-item label="互调学科:" prop="oldxkname">
            <el-select
              clearable
              size="small"
              class="inp"
              v-model="showDiaData.form.oldxkname"
              @focus="getOpt(6)"
            >
              <el-option
                v-for="item in xkOptHt"
                :key="item.id"
                :label="item.subjectName"
                :value="item.subjectName"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="调课原因:">
            <el-input
              size="small"
              class="inp"
              v-model="showDiaData.form.reason"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="状态:">
            <el-select
              clearable
              size="small"
              class="inp"
              v-model="showDiaData.form.status"
            >
              <el-option
                v-for="item in statusOpt"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDiaData.showDia = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="参数设置"
      :visible.sync="showCsOptData.showCsOpt"
      width="70%"
      :close-on-click-modal="false"
    >
      <el-row style="margin-bottom: 20px">
        <el-col :span="6">
          <div class="csTop">
            <span>代课自动审核:</span>
            <el-switch
              style="margin-left: 10px"
              v-model="csData.dkzdsh"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="csTop">
            <span>调课自动审核:</span>
            <el-switch
              style="margin-left: 10px"
              v-model="csData.tkzdsh"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch></div
        ></el-col>
        <el-col :span="6">
          <div class="csTop">
            <span>所有教师查看统计:</span>
            <el-switch
              style="margin-left: 10px"
              v-model="csData.syjscktj"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch></div
        ></el-col>
        <el-col :span="6">
          <div class="csTop">
            <span>调课算积分:</span>
            <el-switch
              style="margin-left: 10px"
              v-model="csData.tksjf"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch></div
        ></el-col>
      </el-row>
      <el-row class="csTop" style="justify-content: space-between">
        <el-col :span="11" style="text-align: center">
          <span>课次自定义</span>
        </el-col>
        <el-col :span="11" style="text-align: center">
          <span>代课节次转积分</span>
        </el-col>
      </el-row>
      <el-row class="csTop" style="justify-content: space-between">
        <el-col :span="11">
          <el-table size="mini" border :data="kcTable" style="width: 100%">
            <el-table-column label="序" type="index"> </el-table-column>
            <el-table-column prop="name" label="自定义课次">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="节数">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.value"></el-input>
              </template>
            </el-table-column>
          </el-table>
          <el-button style="width: 100%" size="mini" @click="addKcRow"
            >+</el-button
          >
        </el-col>
        <el-col :span="11">
          <el-table size="mini" border :data="dkTable" style="width: 100%">
            <el-table-column label="序" type="index"> </el-table-column>
            <el-table-column prop="节数" label="节数">
              <template slot-scope="scope">
                <div class="csTop">
                  <el-input size="mini" v-model="scope.row.bescore"></el-input>
                  <span>~</span>
                  <el-input
                    size="mini"
                    v-model="scope.row.afterscore"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="每节积分">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.score"></el-input>
              </template>
            </el-table-column>
          </el-table>
          <el-button style="width: 100%" size="mini" @click="addDkRow"
            >+</el-button
          >
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showCsOptData.showCsOpt = false">取 消</el-button>
        <el-button type="primary" @click="submitCs">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import main from "~/api/dtk";
import main1 from "~/api/scoreEntry";
import { Message } from "element-ui";
export default {
  computed: {
    zj() {
      let data = new Date(this.showDiaData.form.date).getDay();
      return this.getZj(data);
    },
    zjHt() {
      let data = new Date(this.showDiaData.form.olddate).getDay();
      return this.getZj(data);
    },
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    unionid() {
      return this.$store.state.auth.unionid;
    },
  },
  props: {
    dtkId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      testName: "",
      isResouceShow: 1,
      stanzaOptHt: [],
      xkOptHt: [],
      rules: {
        classId: [
          { required: true, message: "请选择学期年级", trigger: "blur" },
        ],
        date: [{ required: true, message: "请选择代课日期", trigger: "blur" }],
        stanza: [
          { required: true, message: "请选择代课课次", trigger: "blur" },
        ],
        xkname: [
          { required: true, message: "请选择代课学科", trigger: "blur" },
        ],
        oldTeaId: [
          { required: true, message: "请选择原授课人", trigger: "blur" },
        ],
      },
      rules1: {
        classId: [
          { required: true, message: "请选择学期年级", trigger: "blur" },
        ],
        date: [{ required: true, message: "请选择代课日期", trigger: "blur" }],
        stanza: [
          { required: true, message: "请选择代课课次", trigger: "blur" },
        ],
        xkname: [
          { required: true, message: "请选择代课学科", trigger: "blur" },
        ],
        oldTeaId: [
          { required: true, message: "请选择原授课人", trigger: "blur" },
        ],
        teaId: [{ required: true, message: "请选择现授课人", trigger: "blur" }],
        oldclassId: [
          { required: true, message: "请选择互调年级", trigger: "blur" },
        ],
        olddate: [
          { required: true, message: "请选择互调日期", trigger: "blur" },
        ],
        oldStanza: [
          { required: true, message: "请选择互调课次", trigger: "blur" },
        ],
        oldxkname: [
          { required: true, message: "请选择互调学科", trigger: "blur" },
        ],
        oldTeaId: [
          { required: true, message: "请选择原授课人", trigger: "blur" },
        ],
      },
      // 分页相关
      pageNum: 1,
      totalDataNum: 0,
      pageSize: 20,
      //搜索相关
      search: {
        classId: [],
        createTime: [],
        oldTeaname: "",
        status: undefined,
      },
      //
      tableData: [],
      xqNjOpt: [],
      xqNjOptHt: [],
      teanameOpt: [],
      oldTeanameOpt: [],
      stanzaOpt: [
        { name: "第1节", id: 1 },
        { name: "第2节", id: 2 },
        { name: "第3节", id: 3 },
        { name: "第4节", id: 4 },
        { name: "第5节", id: 5 },
        { name: "第6节", id: 6 },
        { name: "第7节", id: 7 },
        { name: "第8节", id: 8 },
      ],
      xkOpt: [
        { name: "语文", id: 1 },
        { name: "数学", id: 2 },
      ],
      statusOpt: [
        { name: "申请中", id: 0, disabled: true },
        { name: "待审核", id: 1 },
        { name: "审核通过", id: 2 },
        { name: "审核未通过", id: 3 },
        { name: "自动通过", id: 4, disabled: true },
      ],
      showCsOptData: {
        showCsOpt: false,
      },
      showRadio: 0,
      kcTable: [],
      dkTable: [],
      //编辑删除dia
      showDiaData: {
        showDia: false,
        formType: 1, //1新增--2编辑
        form: {
          type: 0,
          classId: [],
          date: "",
          stanza: "",
          xkname: "",
          status: "",
          reason: "",
          must: "",
          oldTeaId: "",
          teaId: "",
          oldclassId: [],
          olddate: "",
          oldStanza: "",
          oldxkname: "",
        },
      },
      //参数设置字段
      csData: {
        changeTakes: [],
        cjlbId: 0,
        id: 0,
        dkzdsh: 0, //
        syjscktj: 0, //
        tksjf: 0, //
        tkzdsh: 0, //
      },
    };
  },
  methods: {
    //!是否合理效验
    ifHl(res, data) {
      switch (res) {
        case 1:
          Message({
            message: data + "不合理",
            type: "warning",
            customClass: "new_z_index",
          });

          break;
        case 2:
          Message({
            message: data + "冲突",
            type: "error",
            customClass: "new_z_index",
          });

          break;
      }
    },
    //!调接口获取是否合理
    getHl(val, status) {
      this.showDiaData.form.schoolId = this.schoolId;
      this.showDiaData.form.ckzt = status;
      //   this.showDiaData.form.oldTeaId = this.unionid;
      main
        .takeHl(this.showDiaData.form)
        .then((res) => {
          console.log(res.data, "是否冲突");
          this.ifHl(res.data, val);
        })
        .catch((err) => {});
    },

    //!设置课程和老师
    setClass_Teacher() {
      let val = {
        schoolId: this.schoolId,
        classId: this.showDiaData.form.classId
          ? this.showDiaData.form.classId[2]
          : "",
        stanz: this.showDiaData.form.stanza,
        weekName: this.zj,
        type: 4,
      };
      main
        .selectTakeStanza(val)
        .then((res) => {
          let data = {};
          data = res.data;
          console.log(data, "获得的数据-------");
          this.showDiaData.form.xkname = data[0].subjectName;
          this.testName = data[0].teacherUnionid;
        })
        .catch((err) => {});
      this.getHl("课次", 2);
    },

    setJc_Xk() {
      let val = {
        schoolId: this.schoolId,
        classId: this.showDiaData.form.oldclassId
          ? this.showDiaData.form.oldclassId[2]
          : "",
        unionid: this.showDiaData.form.teaId,
        weekName: this.zjHt,
        type: 4,
        isdk: 1,
      };
      main
        .selectTakeStanza(val)
        .then((res) => {
          console.log(res.data, "获得的数据-------");
          this.stanzaOptHt = res.data;
          this.xkOptHt = res.data;
        })
        .catch((err) => {});
    },
    confirmXk() {
      let data = {};
      data = this.stanzaOptHt.filter((item) => {
        return item.stanz == this.showDiaData.form.oldStanza;
      });
      console.log(data, "data");
      this.showDiaData.form.oldxkname = data[0].subjectName;
      this.getHl("课次", 5);
    },
    //!通用-调课打开必填项
    setRequire() {
      this.rules1.teaId[0].required = true;
      this.rules1.oldclassId[0].required = true;
      this.rules1.olddate[0].required = true;
      this.rules1.oldStanza[0].required = true;
      this.rules1.oldxkname[0].required = true;
      //   this.rules1.oldTeaId[0].required = true;
    },
    //!通用-调课关闭必填项
    breakRequire() {
      this.rules1.teaId[0].required = false;
      this.rules1.oldclassId[0].required = false;
      this.rules1.olddate[0].required = false;
      this.rules1.oldStanza[0].required = false;
      this.rules1.oldxkname[0].required = false;
      //   this.rules1.oldTeaId[0].required = false;
    },
    //!调课-选择现授课人-打开必填项
    changeXskr(val) {
      console.log(11111111);
      if (val) {
        this.setRequire();
      }
    },
    searchTable() {
      let val = {
        cjlbId: this.dtkId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      let data = this.search;
      data.classId = this.search.classId ? this.search.classId[2] : "";
      let obj = Object.assign(val, data);
      main
        .find(obj)
        .then((res) => {
          this.tableData = res.data.list;
          this.totalDataNum = res.data.total;
        })
        .catch((err) => {});
    },
    changePageSize(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTable(this.pageNum, val);
    },
    changePageNum(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getTable(val, this.pageSize);
    },
    //提交参数设置
    submitCs() {
      let data = this.csData;
      let arr = this.kcTable.concat(this.dkTable);
      data.changeTakes = arr;
      data.cjlbId = this.dtkId;
      main
        .saveSetTake(data)
        .then((res) => {
          this.$message.success("设置成功!");
          this.showCsOptData.showCsOpt = false;
          this.getTable(this.pageNum, this.pageSize);
        })
        .catch((err) => {});
    },
    //!提交新增和编辑
    submit() {
      //! 0：申请中，1：待审核，2：审核通过，3：审核不通过，4：自动通过
      let data = this.showDiaData.form;
      console.log(data, "data----");
      data.cjlbId = this.dtkId;
      //?不选状态就是申请中
      if (!data.status) {
        data.status = undefined;
      }
      //?如果删除了原/现授课人，同时删除name
      if (!data.oldTeaId) {
        data.oldTeaname = "";
      }
      if (!data.teaId) {
        data.teaname = "";
      }
      data.oldTeaId = this.showDiaData.form.oldTeaId;
      //?如果选了现授课人则审核通过(针对管理员的提交)
      //?否则就待审核
      if (data.teaId) {
        data.status = 2;
      } else {
        // data.status = 1;
      }
      if (this.showDiaData.form.type == 0) {
        //   ?代课
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            if (this.showDiaData.formType == 1) {
              main
                .add(data)
                .then((res) => {
                  this.getTable(this.pageNum, this.pageSize);
                  this.clearForm();
                  this.showDiaData.showDia = false;
                  this.$message.success("提交成功!");
                })
                .catch((err) => {
                  Message({
                    message: err,
                    type: "error",
                    customClass: "mzindex",
                  });
                });
            } else if (this.showDiaData.formType == 2) {
              //?编辑代课时--删了现授课人-则变成申请中
              if (!data.teaId) {
                data.status = 0;
              }
              main
                .edit(data)
                .then((res) => {
                  this.getTable(this.pageNum, this.pageSize);
                  this.clearForm();
                  this.showDiaData.showDia = false;
                  this.$message.success("编辑成功!");
                })
                .catch((err) => {
                  Message({
                    message: err,
                    type: "error",
                    customClass: "mzindex",
                  });
                });
            }
          } else {
            return false;
          }
        });
      } else {
        //!调课
        this.$refs["ruleForm1"].validate((valid) => {
          if (valid) {
            if (this.showDiaData.formType == 1) {
              main
                .add(data)
                .then((res) => {
                  this.getTable(this.pageNum, this.pageSize);
                  this.clearForm();
                  this.showDiaData.showDia = false;
                  this.$message.success("提交成功!");
                })
                .catch((err) => {
                  Message({
                    message: err,
                    type: "error",
                    customClass: "mzindex",
                  });
                });
            } else if (this.showDiaData.formType == 2) {
              main
                .edit(data)
                .then((res) => {
                  this.getTable(this.pageNum, this.pageSize);
                  this.clearForm();
                  this.showDiaData.showDia = false;
                  this.$message.success("编辑成功!");
                })
                .catch((err) => {
                  Message({
                    message: err,
                    type: "error",
                    customClass: "mzindex",
                  });
                });
            }
          } else {
            return false;
          }
        });
      }
    },
    getOpt(data, data2) {
      if (data == 1) {
        //?代课学科opt
        let val = {
          //   classId: this.showDiaData.form.classId[2],
          type: 1,
        };
        console.log(val);
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.xkOpt = res.data;
          })
          .catch((err) => {});
      } else if (data == 2) {
        if (data2 == 1) {
          this.getHl("班级", 1);
        }
        //?原授课人opt
        let val = {
          //   classId: this.showDiaData.form.classId[2],
          type: 2,
          isdk: this.showDiaData.form.type == 1 ? 1 : null,
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.oldTeanameOpt = res.data;
          })
          .catch((err) => {});
      } else if (data == 3) {
        //?现授课人opt
        let val = {
          //   classId: this.showDiaData.form.classId[2],
          type: 5,
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.teanameOpt = res.data;
          })
          .catch((err) => {});
      } else if (data == 4) {
        //?节次opt
        let val = {
          //   classId: this.showDiaData.form.classId[2],
          //   weekName: this.zj,
          type: 4,
          //   data: this.showDiaData.form.date,
          isdk: this.showDiaData.form.type == 1 ? 1 : null,
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.stanzaOpt = res.data;
            this.stanzaOptHt = res.data;
            this.getKcZdy();
          })
          .catch((err) => {});
      } else if (data == 5) {
        //?现授课人opt
        let val = {
          type: 5,
          //   weekName: this.zj,
          //   stanz: this.showDiaData.form.stanza,
          isdk: this.showDiaData.form.type == 1 ? 1 : null,
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.teanameOpt = res.data;
            console.log(this.teanameOpt, "现授课人选项-------");
          })
          .catch((err) => {});
      } else if (data == 6) {
        //?代课学科opt
        let val = {
          //   classId: this.showDiaData.form.classId[2],
          type: 1,
          //   stanz: this.showDiaData.form.stanza,
          //   weekName: this.zj,
          isdk: this.showDiaData.form.type == 1 ? 1 : null,
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.xkOpt = res.data;
            this.xkOptHt = res.data;
          })
          .catch((err) => {});
      }
    },

    //dia-点击下拉-获取三级菜单
    getXqNj() {
      let val = {
        cjlbId: this.dtkId,
        type: 1,
      };
      main1
        .seeSiji(val)
        .then((res) => {
          this.xqNjOpt = res.data;
        })
        .catch((err) => {});
    },
    getXqNjHt() {
      let val = {
        cjlbId: this.dtkId,
        // unionid: this.showDiaData.form.teaId,
        type: 1,
      };
      main1
        .seeSiji(val)
        .then((res) => {
          this.xqNjOptHt = res.data;
        })
        .catch((err) => {});
    },
    getTable(pageNum, pageSize) {
      let val = {
        cjlbId: this.dtkId,
        pageNum: pageNum,
        pageSize: pageSize,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list;
          this.totalDataNum = res.data.total;
        })
        .catch((err) => {});
    },
    clearForm() {
      this.showDiaData.form = {
        type: 0,
        classId: [],
        date: "",
        stanza: "",
        xkname: "",
        status: "",
        reason: "",
        must: "",
        oldTeaId: "",
        teaId: "",
        oldclassId: [],
        olddate: "",
        oldStanza: "",
        oldxkname: "",
      };
    },
    setFrom(row) {
      this.showDiaData.form = row;
    },
    add() {
      this.showRadio = 1;
      this.showDiaData.formType = 1;
      this.clearForm();
      this.getXqNj();
      this.getOpt(2);
      this.getOpt(3);
      this.getOpt(5);
      this.showDiaData.showDia = true;
    },
    pz(row) {
      let data = {};
      main
        .selectTakeTranById({ id: row.id })
        .then((res) => {
          data = res.data;
        })
        .catch((err) => {});
      this.$confirm({
        title: "确认批准吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          data.cjlbId = this.dtkId;
          data.status = 2;
          main
            .edit(data)
            .then((res) => {
              this.$message.success("批准成功!");
              this.getTable(this.pageNum, this.pageSize);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },

    edit(row) {
      this.showRadio = 0;
      //   let data = JSON.parse(JSON.stringify(row));
      //   this.setFrom(data);
      main
        .selectTakeTranById({ id: row.id })
        .then((res) => {
          console.log(res.data, "获得的数据-----------");
          this.showDiaData.form = res.data;
          console.log("已赋值----------");
        })
        .catch((err) => {});
      this.getXqNj();
      this.getXqNjHt();
      this.getOpt(2);
      this.getOpt(3);
      this.getOpt(5);
      this.showDiaData.formType = 2;
      this.showDiaData.showDia = true;
    },
    //删除数据
    del(row) {
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .del({ id: row.id })
            .then((res) => {
              this.$message.success("删除成功!");
              this.getTable(this.pageNum, this.pageSize);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },
    csOpt() {
      main
        .selectSetTake({ cjlbId: this.dtkId })
        .then((res) => {
          let arr = {
            changeTakes: [],
            cjlbId: 0,
            id: 0,
            dkzdsh: 0, //
            syjscktj: 0, //
            tksjf: 0, //
            tkzdsh: 0, //
          };
          this.csData = res.data ? res.data : arr;
          this.showCsOptData.showCsOpt = true;
          this.dkTable = res.data.changeTakes.filter((item) => {
            return item.type == 1;
          });
          this.kcTable = res.data.changeTakes.filter((item) => {
            return item.type == 0;
          });
          console.log(this.dkTable, "this.dkTable");
          console.log(this.kcTable, "this.kcTable");
        })
        .catch((err) => {});
    },
    addKcRow() {
      this.kcTable.push({ type: 0 });
    },
    addDkRow() {
      this.dkTable.push({ type: 1 });
    },
    //获取日期是周几
    getZj(data) {
      switch (data) {
        case 1:
          return "星期一";
          break;
        case 2:
          return "星期二";
        case 3:
          return "星期三";
        case 4:
          return "星期四";
        case 5:
          return "星期五";
        case 6:
          return "星期六";
        case 0:
          return "星期日";
        default:
          return "";
      }
    },
    //!获取课次自定义参数
    getKcZdy() {
      main
        .selectSetTake({ cjlbId: this.dtkId })
        .then((res) => {
          let arr = res.data.changeTakes.filter((item) => {
            return item.type == 0;
          });
          arr = arr.map((item) => {
            item.stanz = item.name;
            return item;
          });
          this.stanzaOpt = this.stanzaOpt.concat(arr);
          this.stanzaOptHt = this.stanzaOptHt.concat(arr);
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getTable(1, 20);
    this.getKcZdy();
  },
};
</script>

<style scoped>
.search {
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.dkOrTk {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
/deep/.el-radio-button__inner {
  border-left: 1px solid #dcdfe6;
}
.dk {
}
.inp {
  width: 80%;
}
.tk1 {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 25px;
  color: #ffffff;
  background-color: #be4fff;
}
.dk1 {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 25px;
  color: #ffffff;
  background-color: #298cf7;
}
.dk2 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.csTop {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.input {
  width: 180px;
  margin-right: 15px;
}
/* .new_z_index {
  z-index: 9000 !important;
} */
</style>
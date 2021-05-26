<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="clickTab">
      <el-tab-pane label="成绩录入" name="3">
        <div class="condition">
          <el-button
            size="small"
            style="background-color: #fafafa; width: 108px"
            @click="plDeal"
            >批量处理</el-button
          >
          <el-button
            size="small"
            type="primary"
            style="width: 108px"
            @click="modelUpload"
            >模板下载</el-button
          >
          <el-button
            size="small"
            type="primary"
            style="width: 108px"
            @click="cjdr"
            >成绩导入</el-button
          >
          <el-button
            v-show="twBtn"
            size="small"
            style="width: 108px"
            @click="twmodelUpload"
            >体卫模板下载</el-button
          >
          <el-upload
            v-show="twBtn"
            style="margin-left: 10px"
            action="http://103.219.33.112:10010/importTwsz"
            :show-file-list="false"
            name="uploadFile"
            :on-success="fileInSuccessTw"
            :data="{
              classId: classId,
              djxq: djxq,
              cjlbId: cjlbId,
              schoolId: schoolId,
            }"
          >
            <el-button size="small" type="primary">体卫导入</el-button>
          </el-upload>
          <el-button
            @click="outTj"
            style="margin-left: 10px"
            type="warning"
            class="button"
            size="small"
            >成绩导出</el-button
          >
          <el-button
            size="small"
            type="info"
            style="width: 108px; margin-left: 15px"
            @click="ifTree = !ifTree"
            >显示/隐藏菜单</el-button
          >
        </div>
        <div class="contain">
          <el-card class="left" v-show="ifTree">
            <el-tree
              v-loading="treeLoading"
              element-loading-text="数据加载中，请耐心等待"
              :data="ClassData"
              :props="ClassProps"
              @node-click="clickTree"
              highlight-current
              accordion
            ></el-tree>
          </el-card>
          <div class="right" v-show="isqm == 1" style="width: 100%">
            <div style="width: 100%; height: 120px">
              <el-table
                border
                size="mini"
                :data="tableData2"
                style="width: 40%"
              >
                <el-table-column>
                  <template slot-scope="scope">
                    <div>
                      <span v-show="scope.row['sk']">
                        {{ scope.row["sk"] }}
                      </span>
                      <span v-show="scope.row['qk']">
                        {{ scope.row["qk"] }}
                      </span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="prop"
                  :label="item"
                  v-for="(item, index) in tableDataCol"
                  :key="index"
                >
                  <template slot-scope="scope">
                    <div>
                      {{ scope.row[index] }}
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-table
              :data="tableData"
              border
              style="width: calc(100% - 20px)"
              max-height="600px"
              size="large"
              @cell-click="clickCell"
              :row-class-name="tableRowClassName"
              v-loading="tableLoading"
              element-loading-text="数据加载中，请耐心等待"
            >
              <el-table-column prop="xh" label="学号" width="80">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="80">
              </el-table-column>

              <template v-for="(item, index) in DynamicColumn">
                <el-table-column
                  :key="index"
                  :label="item.name"
                  :prop="item.name"
                  :width="item.name == '缺考' ? 60 : 120"
                >
                  <template slot-scope="scope">
                    <div v-show="scope.row.showExam[index].name == '缺考'">
                      <el-checkbox
                        :disabled="
                          scope.row.showExam[index].lrqx == '账号密码登录' ||
                          scope.row.showExam[index].havelr != 1
                        "
                        :true-label="1"
                        :false-label="0"
                        v-model="scope.row.showExam[index].isqk"
                        @change="inputBlur(scope.row, index)"
                      ></el-checkbox>
                    </div>
                    <div
                      v-show="
                        scope.row.showExam[index].lrfs == 0 &&
                        scope.row.showExam[index].name != '缺考'
                      "
                    >
                      <el-input
                        :disabled="
                          scope.row.showExam[index].islock ||
                          scope.row.showExam[index].lrqx == '账号密码登录' ||
                          scope.row.showExam[index].havelr != 1 ||
                          scope.row.showExam[index].isqk == 1
                        "
                        v-model="scope.row.showExam[index].score"
                        max-length="300"
                        size="mini"
                        @blur="inputBlur(scope.row, index)"
                      />
                    </div>
                    <div
                      v-show="
                        scope.row.showExam[index].lrfs == 1 &&
                        scope.row.showExam[index].name != '缺考'
                      "
                    >
                      <el-select
                        :disabled="
                          scope.row.showExam[index].islock ||
                          scope.row.showExam[index].lrqx == '账号密码登录' ||
                          scope.row.showExam[index].havelr != 1 ||
                          scope.row.showExam[index].isqk == 1
                        "
                        max-length="300"
                        size="mini"
                        v-model="scope.row.showExam[index].score"
                        @change="inputBlur1(scope.row)"
                      >
                        <el-option
                          v-for="item in scope.row.showExam[index].showdedi"
                          :key="item.rank"
                          :label="item.rank"
                          :value="item.rank"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </template>
                </el-table-column>
                <template v-for="(subItem, subIndex) in item.scoreChange">
                  <el-table-column
                    :key="subIndex + item.name"
                    :label="subItem.name"
                  >
                    <template
                      slot-scope="scope"
                      v-if="scope.row.showExam[index].scoreChange"
                    >
                      <div>
                        {{
                          scope.row.showExam[index].scoreChange[subIndex]
                            ? scope.row.showExam[index].scoreChange[subIndex]
                                .score
                            : ""
                        }}
                      </div>
                    </template>
                  </el-table-column>
                </template>
              </template>
            </el-table>
            <!-- 模板定位(只用于导出) -->
            <el-table
              :data="tableData"
              border
              style="width: calc(100% - 20px)"
              max-height="600px"
              size="large"
              id="out-tj"
              v-show="false"
            >
              <el-table-column prop="xh" label="学号" width="80">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="80">
              </el-table-column>

              <template v-for="(item, index) in DynamicColumn">
                <el-table-column
                  :key="index"
                  :label="item.name"
                  :prop="item.name"
                  width="100"
                >
                  <template slot-scope="scope">
                    <div v-if="scope.row.showExam[index].name == '缺考'">
                      <span>{{
                        scope.row.showExam[index].isqk == 1 ? "缺考" : "未缺考"
                      }}</span>
                    </div>
                    <div
                      v-show="
                        scope.row.showExam[index].lrfs == 0 &&
                        scope.row.showExam[index].name != '缺考'
                      "
                    >
                      <span>{{ scope.row.showExam[index].score }}</span>
                    </div>
                  </template>
                </el-table-column>
                <template v-for="(subItem, subIndex) in item.scoreChange">
                  <el-table-column
                    :key="subIndex + item.name"
                    :label="subItem.name"
                  >
                    <template
                      slot-scope="scope"
                      v-if="scope.row.showExam[index].scoreChange"
                    >
                      <div>
                        {{
                          scope.row.showExam[index].scoreChange[subIndex]
                            ? scope.row.showExam[index].scoreChange[subIndex]
                                .score
                            : ""
                        }}
                      </div>
                    </template>
                  </el-table-column>
                </template>
              </template>
            </el-table>
            <!-- 末班定位end -->
          </div>
          <div class="right" v-show="isqm == 2" style="width: 100%">
            <el-table
              @cell-click="clickCell1"
              size="large"
              :data="qmpyData"
              border
              max-height="600px"
              style="width: calc(100% - 20px)"
              v-loading="tableLoading"
              element-loading-text="数据加载中，请耐心等待"
            >
              <el-table-column prop="xh" label="学号" width="80">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="80">
              </el-table-column>
              <el-table-column prop="illness" label="病事假天数" width="100">
                <template slot-scope="scope">
                  <el-input
                    @blur="editQmpy(scope.row)"
                    v-model="scope.row.illness"
                    size="mini"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="comment" label="期末评语">
                <template slot-scope="scope">
                  <div>
                    <el-popover trigger="hover" placement="top">
                      <div style="width: 100%">
                        <p>{{ scope.row.comment }}</p>
                      </div>
                      <div
                        slot="reference"
                        style="
                          display: inline-block;
                          white-space: nowrap;
                          width: 100%;
                          overflow: hidden;
                          text-overflow: ellipsis;
                        "
                      >
                        <span size="medium">{{ scope.row.comment }}</span>
                      </div>
                    </el-popover>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="hobby" label="课外兴趣、爱好和特长">
                <template slot-scope="scope">
                  <el-input
                    @blur="editQmpy(scope.row)"
                    v-model="scope.row.hobby"
                    size="mini"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="right" v-show="isqm == 3" style="width: 100%">
            <el-table
              :data="jcTable"
              size="large"
              border
              max-height="600px"
              style="width: calc(100% - 20px)"
              v-loading="tableLoading"
              element-loading-text="数据加载中，请耐心等待"
            >
              <el-table-column prop="xh" label="学号"> </el-table-column>
              <el-table-column prop="name" label="姓名"> </el-table-column>
              <el-table-column prop="className" label="所在班级">
              </el-table-column>
              <el-table-column prop="djxq" label="学期">
                <template slot-scope="scope">
                  <el-select
                    size="mini"
                    v-model="scope.row.djxq"
                    placeholder="请选择"
                    @change="edit(scope.row)"
                  >
                    <el-option
                      v-for="item in djxqOpt"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="jc" label="奖励/惩罚">
                <template slot-scope="scope">
                  <el-select
                    size="mini"
                    v-model="scope.row.jc"
                    placeholder="请选择"
                    @change="edit(scope.row)"
                  >
                    <el-option
                      v-for="item in jcOpt"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="lrTime" label="日期">
                <template slot-scope="scope">
                  <el-date-picker
                    style="width: 100%"
                    size="mini"
                    v-model="scope.row.lrTime"
                    type="date"
                    placeholder="选择日期"
                    @change="edit(scope.row)"
                  >
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column prop="current" label="内容">
                <template slot-scope="scope">
                  <el-select
                    size="mini"
                    v-model="scope.row.current"
                    placeholder="请选择"
                    @change="edit(scope.row)"
                    @focus="setNrOpt(scope.row)"
                  >
                    <el-option
                      v-for="item in nrOpt"
                      :key="item.id"
                      :label="item.current"
                      :value="item.current"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注">
                <template slot-scope="scope">
                  <div>
                    <el-input
                      size="mini"
                      @blur="edit(scope.row)"
                      v-model="scope.row.remark"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div>
                    <el-button
                      type="danger"
                      @click="del(scope.row)"
                      size="small"
                      >删除</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="add">
              <el-button size="small" style="width: 100%" @click="addTable"
                >+</el-button
              >
            </div>
          </div>
          <div class="right" v-show="isqm == 4" style="width: 100%">
            <el-table
              size="large"
              :data="twTable"
              border
              max-height="600px"
              style="width: calc(100% - 20px)"
              v-loading="tableLoading"
              element-loading-text="数据加载中，请耐心等待"
            >
              <el-table-column prop="xh" label="学号"> </el-table-column>
              <el-table-column prop="name" label="姓名"> </el-table-column>
              <el-table-column prop="tz" label="体重(千克)">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.tz"
                    @blur="edit1(scope.row)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="sg" label="身高(厘米)">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.sg"
                    @blur="edit1(scope.row)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="zsl" label="视力(左)">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.zsl"
                    @blur="edit1(scope.row)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="ysl" label="视力(右)">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.ysl"
                    @blur="edit1(scope.row)"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div></div
      ></el-tab-pane>
      <el-tab-pane label="成绩统计" name="4"
        ><gradeTotal :cjlbId="cjlbId"></gradeTotal
      ></el-tab-pane>
      <el-tab-pane v-if="ifBzr == 1" label="成绩查询" name="5"
        ><gradeSearch :cjlbId="cjlbId"></gradeSearch
      ></el-tab-pane>
      <el-tab-pane v-if="ifBzr == 1" label="成绩单查看" name="6"
        ><cjdPrint :cjlbId="cjlbId"></cjdPrint
      ></el-tab-pane>
    </el-tabs>
    <qmpy
      ref="qmpyComponent"
      :commentRow="commentRow"
      :getTable="reData"
      :reloadQmpyTable="reloadQmpyTable"
    ></qmpy>
    <el-dialog
      title="批量处理"
      :visible.sync="showPlcl"
      width="30%"
      :before-close="closePlcl"
    >
      <el-radio-group v-model="plclRadio">
        <el-radio :label="0">清空</el-radio>
        <el-radio :label="1">批量</el-radio>
      </el-radio-group>
      <div v-show="plclRadio == 0" class="sel">
        <el-select
          style="width: 200px; margin-top: 15px"
          size="small"
          v-model="ksLabel"
          placeholder="请选择"
          @change="ksLabelChange"
        >
          <el-option
            v-for="item in ksOpt"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div v-show="plclRadio == 1" class="sel">
        <el-select
          style="width: 200px; margin-top: 15px"
          size="small"
          v-model="ksLabel"
          placeholder="请选择"
          @change="ksLabelChange"
        >
          <el-option
            v-for="item in ksOpt"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-input
          v-model="plfz"
          style="width: 200px; margin-top: 15px"
          size="small"
          v-show="lrfs == 0"
        ></el-input>
        <el-select
          style="width: 200px; margin-top: 15px"
          v-show="lrfs == 1"
          size="small"
          v-model="ddName"
          placeholder="请选择"
        >
          <el-option
            v-for="item in ddOpt"
            :key="item.rank"
            :label="item.rank"
            :value="item.rank"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePlcl">取 消</el-button>
        <el-button type="primary" @click="submitPlcl">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="成绩导入" :visible.sync="showCjdr" width="30%">
      <div v-loading="loading">
        <el-cascader
          @change="handleChange"
          size="small"
          style="width: 95%"
          :props="cascaderProp"
          v-model="cjdrData"
          :options="TreeData"
        ></el-cascader>
        <div class="cjdrBtn">
          <el-upload
            style="width: 100%"
            action="http://103.219.33.112:10010/importStuScore"
            :show-file-list="false"
            name="file"
            :on-success="fileInSuccess"
            :before-upload="befUp"
            :data="cjdrValue"
            :on-progress="process"
          >
            <el-button size="small" style="width: 95%" type="primary"
              >成绩导入</el-button
            >
          </el-upload>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showCjdr = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import main from "~/api/scoreEntry";
import main1 from "~/api/examManage";
import main2 from "~/api/jcManage";
import main3 from "~/api/twManage";
import gradeTotal from "./components/gradeTotal";
import gradeSearch from "./components/gradeSearch";
import cjdPrint from "./components/cjdPrint";
import qmpy from "~/pages/index/gradeManagement/components/qmpy";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  components: {
    qmpy,
    gradeTotal,
    gradeSearch,
    cjdPrint,
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    ifBzr: {
      type: Number,
      default: 0,
    },
    isLock: {
      type: Number,
      default: 0,
    },
    xueqiId: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    DynamicColumn: function () {
      //   debugger;
      if (this.tableData.length > 0) return this.tableData[0].showExam;
      return [];
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
  },
  data() {
    return {
      tableData2: [],
      tableDataCol: [],
      ifTree: true,
      twBtn: false,
      studentId: undefined,
      jcName: "",
      loading: false,
      treeLoading: false,
      tableLoading: false,
      twTable: [],
      // ===========
      //奖惩表格数据
      jcTable: [],
      jTable: [],
      cTable: [],
      nrOpt: [],
      djxqOpt: [
        {
          name: "第一学期",
          id: 1,
        },
        {
          name: "第二学期",
          id: 2,
        },
      ],
      //奖惩选项列表
      jcOpt: [
        {
          name: "奖励",
          id: 0,
        },
        {
          name: "惩罚",
          id: 1,
        },
      ],
      //   ========
      cascaderProp: { value: "id", label: "name", children: "children" },
      cjdrData: [],
      qmpyData: [],
      isqm: 1, //1--普通，2--期末评语，3--奖惩，4--体卫
      showCjdr: false,
      ddScoreOpt: [{ name: "11" }, { name: "22" }],
      tabClickIndex: null, // 点击的单元格
      tabClickLabel: "", // 当前点击的列名
      activeName: "3", //顶部tabs
      cjlbId: 0, //当前课程类别id
      classId: "", //当前选择的班级id
      xueqi: 1, //下拉框-学期-绑定值
      xueqiOpt: [
        //下拉框-学期-选项
        { label: "第一学期", value: 1 },
        { label: "第二学期", value: 2 },
      ],
      xkName: "", //下拉框-学科-绑定值
      xuekeOpt: [
        //下拉框-学科-选项
      ],
      tableData: [], //表格数据
      ClassData: [], //班级树形数据
      TreeData: [], //班级树形数据
      ClassProps: {
        //班级-树形的默认设置
        children: "children",
        label: "name",
      },
      commentRow: {}, //当前评语行数据
      showPlcl: false,
      plclRadio: 0,
      ksOpt: [],
      ksLabel: "",
      lrfs: -1,
      plfz: 0,
      ddName: "",
      ddOpt: [],
      ksId: 0,
      djxq: undefined,
      xkName: undefined,
      cjdrValue: {
        cjlbId: "",
        classId: "",
        djxq: "",
        schoolId: "",
        xkName: "",
        unionid: "",
      },
    };
  },
  methods: {
    //!删除奖惩
    del(row) {
      console.log(row);
      this.$confirm({
        title: "确定删除吗?",
        cancelText: "取消",
        okText: "删除",
        okType: "danger",
        centered: true,
        onOk: () => {
          main2
            .deleteMoralPrize({ id: row.id })
            .then((res) => {
              this.$message.success("删除成功!");
              let val = {
                classId: this.classId,
                cjlbId: this.cjlbId,
                djxq: this.djxq,
                name: this.jcName,
              };
              this.getJcTable(val);
            })
            .catch((err) => {});
        },
      });
    },
    //!成绩导出
    outTj() {
      var xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#out-tj"),
        xlsxParam
      );
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "总统计表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    //!   体卫模板下载
    twmodelUpload() {
      let val = {
        cjlbId: this.cjlbId,
        schoolId: this.schoolId,
        classId: this.classId,
      };
      if (this.classId) {
        main3
          .DownTwsz(val)
          .then((res) => {
            window.location.href = res.data;
          })
          .catch((err) => {});
      } else {
        this.$message.error("请选择班级!");
      }
    },
    process() {
      this.loading = true;
    },
    //获取奖惩设置表格
    getJcOptTable() {
      main2
        .seeJcsz({ isjc: 0, cjlbId: this.cjlbId })
        .then((res) => {
          this.jTable = res.data;
        })
        .catch((err) => {});
      main2
        .seeJcsz({ isjc: 1, cjlbId: this.cjlbId })
        .then((res) => {
          this.cTable = res.data;
        })
        .catch((err) => {});
    },
    //点击内容给内容选项列表赋值
    setNrOpt(row) {
      console.log("1313212");
      this.changeNrOpt(row);
    },
    //赋值内容选项列表
    changeNrOpt(row) {
      if (row.jc == 0) {
        this.nrOpt = this.jTable;
      } else if (row.jc == 1) {
        this.nrOpt = this.cTable;
      }
    },
    edit(row) {
      //根据选择奖励还是惩罚赋值给内容选项列表
      this.changeNrOpt(row);
      //修改表格
      let val = row;
      val.cjlbId = this.cjlbId;
      main2
        .saveMoralPrize(val)
        .then((res) => {
          let val = {
            classId: this.classId,
            cjlbId: this.cjlbId,
            djxq: this.djxq,
            name: this.jcName,
          };
          this.getJcTable(val);
        })
        .catch((err) => {});
    },
    befUp(file) {
      this.cjdrValue.unionid = this.unionid;
      if (this.cjdrData.length == 0) {
        this.$message.error("请选择导入学科!");
        return false;
      }
    },
    handleChange(value) {
      this.cjdrValue = {
        cjlbId: this.cjlbId,
        classId: value[2],
        djxq: value[0],
        schoolId: this.schoolId,
      };
      this.ClassData.map((item) => {
        if (item.id && item.id == value[0]) {
          item.children.map((item1) => {
            if (item1.id && item1.id == value[1]) {
              item1.children.map((item2) => {
                if (item2.id && item2.id == value[2]) {
                  item2.children.map((item3) => {
                    if (item3.id && item3.id == value[3]) {
                      this.cjdrValue.xkName = item3.name;
                    }
                  });
                }
              });
            }
          });
        }
      });
    },
    cjdr() {
      this.showCjdr = true;
    },
    reloadQmpyTable() {
      let val = {
        djxq: this.djxq,
        cjlbId: this.cjlbId,
        classId: this.classId,
        schoolId: this.schoolId,
      };
      main1
        .selectFinalEvaluate(val)
        .then((res) => {
          this.qmpyData = res.data;
        })
        .catch((err) => {});
    },
    editQmpy(row) {
      row.schoolId = this.schoolId;
      main1
        .saveFinalEvaluate(row)
        .then((res) => {
          this.reloadQmpyTable();
        })
        .catch((err) => {});
    },
    //导入
    fileInSuccess() {
      this.$message.success("导入成功!");
      this.showCjdr = false;
      this.loading = false;
      this.reData();
    },
    //   模板下载
    modelUpload() {
      let val = {
        cjlbId: this.cjlbId,
        djxq: this.djxq,
        classId: this.classId,
      };
      if (this.djxq) {
        main
          .testStuScore(val)
          .then((res) => {
            window.location.href = res.data;
          })
          .catch((err) => {});
      } else {
        this.$message.error("请选择班级!");
      }
    },
    ksLabelChange(val) {
      this.ksId = val;
      let data = {
        classId: this.classId,
        name: this.xkName,
        ksId: val,
      };
      main1
        .sel(data)
        .then((res) => {
          this.lrfs = res.data[0].lrfs;
          console.log("this.lrfs", res);
          this.ddOpt = res.data[0].showdedi;
        })
        .catch((err) => {});
    },
    closePlcl() {
      this.showPlcl = false;
    },
    submitPlcl() {
      if (this.plclRadio == 0) {
        //   清空
        let val = {
          classId: this.classId,
          ksId: this.ksId,
          schoolId: this.schoolId,
          xkName: this.xkName,
        };
        main1
          .batchQc(val)
          .then((res) => {
            this.reData();
            this.showPlcl = false;
            this.$message.success(res.data);
            this.plclRadio = 0;
            this.ksId = 0;
            this.ksLabel = "";
            this.plfz = "";
            this.ddName = "";
          })
          .catch((err) => {});
      } else if (this.plclRadio == 1) {
        //复制
        let val = {
          classId: this.classId,
          ksId: this.ksId,
          schoolId: this.schoolId,
          score: this.ddName ? this.ddName : this.plfz,
          xkName: this.xkName,
        };
        main1
          .batchHandle(val)
          .then((res) => {
            this.reData();
            this.showPlcl = false;
            this.$message.success(res.data);
            this.plclRadio = 0;
            this.ksId = 0;
            this.ksLabel = "";
            this.plfz = "";
            this.ddName = "";
          })
          .catch((err) => {});
      }
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
    },
    ddChange() {},
    // 失去焦点初始化
    inputBlur(row, index) {
      let val = row;
      delete val.comment;
      delete val.createTime;
      delete val.ifdelete;
      delete val.index;
      delete val.ksName;
      delete val.ksTime;
      delete val.ksdata;
      delete val.rank;
      delete val.score;
      delete val.xh;
      val.schoolId = this.schoolId;
      val.createUser = this.unionid;
      if (val.showExam[index].score > val.showExam[index].maxScore) {
        val.showExam[index].score = val.showExam[index].maxScore.toString();
        row.showExam[index].score = row.showExam[index].maxScore.toString();
      } else if (val.showExam[index].score < val.showExam[index].minScore) {
        val.showExam[index].score = val.showExam[index].minScore.toString();
        row.showExam[index].score = row.showExam[index].minScore.toString();
      }
      if (!val.id) {
        val.xkName = this.xkName;
        val.djxq = this.djxq;
        val.cjlbId = this.cjlbId;
      }
      //!改变缺考同时改变对应的考试缺考状态
      val.showExam[index + 1].isqk = val.showExam[index].isqk;
      main
        .addEdit(val)
        .then((res) => {
          this.reData();
        })
        .catch((err) => {});
      this.tabClickIndex = null;
      this.tabClickLabel = "";
    },
    inputBlur1(row) {
      let val = row;
      delete val.comment;
      delete val.createTime;
      delete val.ifdelete;
      delete val.index;
      delete val.ksName;
      delete val.ksTime;
      delete val.ksdata;
      delete val.rank;
      delete val.score;
      delete val.xh;
      val.schoolId = this.schoolId;
      val.createUser = this.unionid;
      if (!val.id) {
        val.xkName = this.xkName;
        val.djxq = this.djxq;
        val.cjlbId = this.cjlbId;
      }
      console.log(this.xkName);

      main
        .addEdit(val)
        .then((res) => {
          this.reData();
        })
        .catch((err) => {});
      this.tabClickIndex = null;
      this.tabClickLabel = "";
    },
    //单击单元格
    clickCell(row, column, cell, event) {
      console.log("rowrowrow", row);

      this.tabClickIndex = row.index;
      this.tabClickLabel = column.label;

      if (column.label == "期末评语") {
        this.commentRow = row;
        this.$refs.qmpyComponent.showPy(row.comment);
        this.$refs.qmpyComponent.showQmpyDia = true;
      }
    },
    clickCell1(row, column, cell, event) {
      this.tabClickIndex = row.index;
      this.tabClickLabel = column.label;
      if (column.label == "期末评语") {
        this.commentRow = row;
        this.$refs.qmpyComponent.showPy(row.comment);
        this.$refs.qmpyComponent.showQmpyDia = true;
      }
    },
    //下拉框--学期
    changeXq(data) {
      console.log("data", data);
      let val = {
        cjlbId: this.cjlbId,
        schoolId: this.schoolId,
        classId: this.classId,
        xkName: this.xkName,
        djxq: this.xueqi ? this.xueqi : data,
      };
      console.log("val11111", val);
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list;
        })
        .catch((err) => {});
    },
    //下拉框--学科
    changeXk() {
      let val = {
        cjlbId: this.cjlbId,
        schoolId: this.schoolId,
        classId: this.classId,
        xkName: this.xkName,
        djxq: this.xueqi,
        unionid: this.unionid,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list;
        })
        .catch((err) => {});
    },
    reData() {
      let val = {
        schoolId: this.schoolId,
        xkName: this.xkName,
        djxq: this.djxq,
        classId: this.classId,
        cjlbId: this.cjlbId,
        unionid: this.unionid,
      };

      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list;
          res.data2.xuekes.map((item) => {
            this.xuekeOpt.push({
              label: item.name,
              value: item.name,
            });
          });
          this.ksOpt = [];
          this.DynamicColumn.map((item) => {
            this.ksOpt.push({ name: item.name, id: item.id });
          });
        })
        .catch((err) => {});
    },
    //添加奖惩表格
    addTable() {
      let val = {
        cjlbId: this.cjlbId,
        studentId: this.studentId,
        djxq: this.djxq,
      };
      main2
        .saveMoralPrize(val)
        .then((res) => {
          let val = {
            classId: this.classId,
            cjlbId: this.cjlbId,
            name: this.jcName,
            djxq: this.djxq,
          };
          console.log(val);
          this.getJcTable(val);
        })
        .catch((err) => {});
    },
    //   点击树
    clickTree(data, node, obj) {
      console.log(node);
      if (
        node.level == 4 &&
        node.data.name !== "期末评语" &&
        node.data.name !== "奖惩信息" &&
        node.data.name !== "体卫信息"
      ) {
        this.twBtn = false;
        this.isqm = 1;
        this.tableLoading = true;
        let val = {
          schoolId: this.schoolId,
          xkName: node.data.name,
          djxq: node.parent.parent.parent.data.id,
          classId: node.parent.data.id,
          cjlbId: this.cjlbId,
          unionid: this.unionid,
        };
        this.classId = node.parent.data.id;
        this.djxq = node.parent.parent.parent.data.id;
        this.xkName = node.data.name;
        console.log(val);
        main
          .find(val)
          .then((res) => {
            this.tableData = res.data.list;
            this.tableDataCol = [];
            this.tableData2 = [{}, {}];
            res.data2.map((item) => {
              this.tableDataCol.push(item.name);
            });
            res.data2.map((item, index) => {
              this.tableData2[0]["sk"] = "实考人数";
              this.tableData2[0][index] = item.skrs;
              this.tableData2[1]["qk"] = "缺考人数";
              this.tableData2[1][index] = item.qkrs;
            });
            this.tableLoading = false;
            this.ksOpt = [];
            console.log(this.DynamicColumn);
            this.DynamicColumn.map((item) => {
              if (item.lrqx == "任课老师" && item.havelr == 1) {
                this.ksOpt.push({ name: item.name, id: item.id });
              }
            });
          })
          .catch((err) => {});
      } else if (node.level == 4 && node.data.name == "期末评语") {
        this.twBtn = false;
        this.tableLoading = true;
        this.isqm = 2;
        let val = {
          djxq: node.parent.parent.parent.data.id,
          cjlbId: this.cjlbId,
          classId: node.parent.data.id,
          schoolId: this.schoolId,
        };
        this.djxq = node.parent.parent.parent.data.id;
        this.classId = node.parent.data.id;
        main1
          .selectFinalEvaluate(val)
          .then((res) => {
            this.tableLoading = false;
            this.qmpyData = res.data;
          })
          .catch((err) => {});
      } else if (node.level == 5) {
        this.twBtn = false;
        this.tableLoading = true;
        this.isqm = 3;
        this.nrOpt = [];
        this.classId = node.parent.data.id;
        let val = {
          classId: node.parent.parent.data.id,
          cjlbId: this.cjlbId,
          djxq: node.parent.parent.parent.parent.data.id,
          name: node.data.nameData,
        };
        this.djxq = node.parent.parent.parent.parent.data.id;
        this.classId = node.parent.parent.data.id;
        this.jcName = node.data.nameData;
        this.studentId = node.data.id;
        this.getJcTable(val);
      } else if (node.level == 4 && node.data.name == "体卫信息") {
        this.tableLoading = true;
        this.twBtn = true;
        console.log("体卫信息");
        this.isqm = 4;
        this.classId = node.parent.data.id;
        this.djxq = node.parent.parent.parent.data.id;
        let val = {
          cjlbId: this.cjlbId,
          classId: node.parent.data.id,
          djxq: node.parent.parent.parent.data.id,
        };
        this.gettwTable(val);
      }
    },
    fileInSuccessTw() {
      let val = {
        cjlbId: this.cjlbId,
        classId: this.classId,
        djxq: this.djxq,
      };
      this.$message.success("导入成功!");
      this.gettwTable(val);
    },
    //获取奖惩表格
    gettwTable(val) {
      main3
        .selectSport(val)
        .then((res) => {
          this.tableLoading = false;
          this.twTable = res.data;
        })
        .catch((err) => {});
    },
    edit1(row) {
      //修改表格
      console.log("edit1");
      let val = row;
      val.cjlbId = this.cjlbId;
      val.djxq = this.djxq;
      main3
        .saveSport(val)
        .then((res) => {
          let val = {
            cjlbId: this.cjlbId,
            classId: this.classId,
            djxq: this.djxq,
          };
          this.gettwTable(val);
        })
        .catch((err) => {});
    },
    //获取奖惩表格
    getJcTable(val) {
      main2
        .findJc(val)
        .then((res) => {
          this.jcTable = res.data;
          this.tableLoading = false;
        })
        .catch((err) => {});
    },
    //获取树
    getClass() {
      this.treeLoading = true;
      let val = {
        cjlbId: this.cjlbId,
        unionid: this.unionid,
      };
      main
        .seeSiji(val)
        .then((res) => {
          this.treeLoading = false;
          this.ClassData = res.data.map((item1) => {
            item1.children.map((item2) => {
              item2.children.map((item3) => {
                item3.children.map((item4) => {
                  if (item4.children) {
                    item4.children.map((item5) => {
                      item5.nameData = item5.name;
                      item5.name = item5.xh + "  " + item5.name;
                    });
                  }
                });
              });
            });
            return item1;
          });
        })
        .catch((err) => {});
    },
    //获取导入菜单
    getTree() {
      let val = {
        cjlbId: this.cjlbId,
        unionid: this.unionid,
        type: 2,
      };
      main
        .seeSiji(val)
        .then((res) => {
          this.TreeData = res.data;
        })
        .catch((err) => {});
    },
    // 批量处理
    plDeal() {
      this.showPlcl = true;
    },
    //点击顶部tabs
    clickTab(tab, event) {
      //   console.log(tab, event);
    },
  },
  created() {
    this.cjlbId = this.id;
    console.log("cjlbId", this.cjlbId);
    this.getClass();
    this.getJcOptTable();
    this.getTree();
  },
};
</script>

<style scoped>
.condition {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  flex-direction: row;
}
.contain {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.left {
  min-width: 250px;
  width: 250px;
  border: 1px solid #eeeeee;
  height: 600px;
  overflow: auto;
}
.right {
  width: 100%;
  padding-left: 15px;
}
.cjdrBtn {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
}
/deep/.el-upload,
/deep/.el-upload--text {
  width: 100%;
  text-align: left;
}
/deep/.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: #dcdcdc;
  color: #2f4f4f;
}
.add {
  width: 100%;
  height: 50px;
}
::v-deep .cell {
  color: black;
}
::v-deep .el-input__inner {
  border: 1px solid black;
}
::v-deep .el-checkbox__inner {
  border: 1px solid black;
}
::v-deep .el-tree-node__label {
  color: black;
}
</style>
<template>
  <div>
    <div class="top">
      <el-button
        size="small"
        type="primary"
        style="width: 218px"
        @click="addExam"
        :disabled="isLock == 1"
        >新增考试</el-button
      >
      <el-button
        size="small"
        type="success"
        style="width: 150px"
        @click="delExam"
        :disabled="isLock == 1"
        >编辑考试</el-button
      >
      <el-button
        size="small"
        style="width: 108px"
        @click="lrsz"
        :disabled="isLock == 1"
        >录入账号</el-button
      >
      <el-button
        size="small"
        style="width: 108px"
        :disabled="isLock == 1"
        @click="copy"
        >批量复制</el-button
      >
      <el-button
        size="small"
        type="info"
        style="width: 108px"
        @click="ifTree = !ifTree"
        >显示/隐藏菜单</el-button
      >
    </div>
    <div class="contain">
      <el-card class="left" v-show="ifTree">
        <el-tree
          v-loading="treeLoading"
          element-loading-text="数据加载中，请耐心等待"
          :data="treeData"
          :props="defaultProps"
          @node-click="clickTree"
          default-expand-all
          highlight-current
        ></el-tree>
      </el-card>
      <div class="right" style="width: 100%">
        <el-table
          v-loading="tableLoading"
          element-loading-text="数据加载中，请耐心等待"
          :data="tableData"
          border
          style="width: calc(100%-20px)"
          size="large"
          @cell-click="clickCell"
          @header-click="addColumn"
          :header-cell-style="{ 'text-align': 'center' }"
        >
          >
          <el-table-column prop="name" label="学科/设置" width="120">
            <template slot-scope="scope">
              <el-select
                :disabled="isLock == 1"
                @change="xkChange(scope)"
                size="small"
                v-model="scope.row.name"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in xkList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="islock"
            label="录入锁定"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-checkbox
                @change="lrsdChange(scope)"
                v-model="scope.row.islock"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="kssj" label="考试时间" width="160">
            <template slot-scope="scope">
              <el-date-picker
                :disabled="isLock == 1"
                @change="kssjChange(scope)"
                style="width: 100%"
                size="small"
                v-model="scope.row.kssj"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="ksfs" label="考试方式" width="120">
            <template slot-scope="scope">
              <el-input
                :disabled="isLock == 1"
                size="small"
                @change="ksfsChange(scope)"
                v-model="scope.row.ksfs"
                placeholder="请输入考试方式"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="lrqx" label="录入权限" width="100">
            <template slot-scope="scope">
              <div>
                {{ scope.row.lrqx }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="lrfs" label="录入方式" width="80">
            <template slot-scope="scope">
              {{
                scope.row.lrfs == 0 ? "分值" : scope.row.lrfs == 1 ? "等第" : ""
              }}
            </template>
          </el-table-column>
          <template v-for="(item, index) in tableColumns">
            <el-table-column :key="index" :label="item.name" width="100">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.sfsz ? scope.row.sfsz[index] : "" }}
                </div>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="+" width="120">
            <template slot="header">
              <div class="jia">
                <i class="el-icon-circle-plus-outline"></i>
                <span style="font-size: 16px">转换</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="del(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="addRow">
          <el-button
            :disabled="isLock == 1"
            @click="addRow"
            style="width: 95%; margin-top: 10px"
            size="small"
            >+添加学科</el-button
          >
        </div>
      </div>
    </div>
    <el-dialog
      title="录入权限"
      :visible.sync="showLrqx"
      width="30%"
      :before-close="closeLrqx"
    >
      <div class="lrqx">
        <el-radio v-model="lrqxRadio" label="1" :disabled="isLock == 1"
          >任课老师</el-radio
        >
        <div class="lrqx1">
          <el-radio v-model="lrqxRadio" label="2" :disabled="isLock == 1"
            >账号密码登录</el-radio
          >
          <!-- <el-select
            multiple
            :disabled="isLock == 1"
            size="small"
            v-model="zdjs"
            placeholder="请选择"
          >
            <el-option
              v-for="item in zdjsOpt"
              :key="item.teacherUnionid"
              :label="item.teacherName"
              :value="item.teacherUnionid"
            >
            </el-option>
          </el-select> -->
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeLrqx">取 消</el-button>
        <el-button type="primary" @click="submitLrqx">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="考试管理"
      :visible.sync="showAddExam"
      width="25%"
      :before-close="closeAddExam"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="考试名称">
          <el-input
            size="small"
            style="width: 300px"
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="对应年级">
          <el-select
            style="width: 300px"
            size="small"
            v-model="form.dynj"
            multiple
            placeholder="请选择对应年级"
          >
            <el-option
              v-for="item in dynjOpt"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddExam">取 消</el-button>
        <el-button type="primary" @click="submitAddExam">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="录入方式"
      :visible.sync="showLrfs"
      width="30%"
      :before-close="closeLrfs"
    >
      <el-radio v-model="llfsRadio" :disabled="isLock == 1" label="0"
        >数值</el-radio
      >
      <el-radio v-model="llfsRadio" :disabled="isLock == 1" label="1"
        >等第</el-radio
      >
      <div v-if="llfsRadio == '0'" style="margin-top: 15px">
        <el-form ref="form2" label-width="80px">
          <el-form-item label="最低值:">
            <el-input
              :disabled="isLock == 1"
              size="small"
              style="width: 80%"
              v-model="minScore"
            ></el-input>
          </el-form-item>
          <el-form-item label="最高值:">
            <el-input
              :disabled="isLock == 1"
              size="small"
              style="width: 80%"
              v-model="maxScore"
            ></el-input>
          </el-form-item>
          <el-form-item label="单位:">
            <el-select
              :disabled="isLock == 1"
              size="small"
              style="width: 80%"
              v-model="ksdw"
              placeholder="请选择单位"
            >
              <el-option
                v-for="item in dwOpt"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div v-else class="tableLrfs" style="margin-top: 15px">
        <el-table
          :data="cjlrfsTableData"
          size="small"
          border
          style="width: 300px"
        >
          <el-table-column prop="bh" label="编码" width="100">
            <template slot-scope="scope">
              <el-input
                size="small"
                :disabled="isLock == 1"
                v-model="scope.row.bh"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="rank" label="等第名称" width="198">
            <template slot-scope="scope">
              <el-input
                size="small"
                :disabled="isLock == 1"
                v-model="scope.row.rank"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          size="small"
          style="width: 300px; margin-top: 5px"
          @click="addCjlrfsRow"
          :disabled="isLock == 1"
          >+</el-button
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeLrfs">取 消</el-button>
        <el-button type="primary" @click="submitLrfs">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="录入账号"
      :visible.sync="showLrsz"
      width="40%"
      :before-close="closeLrsz"
    >
      <el-table size="mini" :data="passwordTable" border style="width: 100%">
        <el-table-column prop="njname" label="年级" width="180">
        </el-table-column>
        <el-table-column prop="username" label="账号">
          <template slot-scope="scope">
            <div>
              <el-input size="mini" v-model="scope.row.username"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="password" label="密码">
          <template slot-scope="scope">
            <div>
              <el-input size="mini" v-model="scope.row.password"></el-input>
            </div> </template
        ></el-table-column>
      </el-table>
      <el-table
        size="mini"
        :data="twPasswordTable"
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="username" label="体卫账号" width="180">
          <template slot-scope="scope">
            <div>
              <el-input size="mini" v-model="scope.row.username"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="password" label="体卫密码">
          <template slot-scope="scope">
            <div>
              <el-input size="mini" v-model="scope.row.password"></el-input>
            </div> </template
        ></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeLrsz">关闭</el-button>
        <el-button type="primary" @click="submitLrsz">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加等第转换"
      :visible.sync="showAddDDzh"
      width="30%"
      :before-close="closeAddDdzh"
    >
      <el-form ref="form4" label-width="80px">
        <el-form-item label="名称:">
          <el-input
            :disabled="isLock == 1"
            size="small"
            v-model="columnsName"
            placeholder="请输入等第转换名"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddDdzh">取消</el-button>
        <el-button @click="submitAddDdzh" :disabled="isLock == 1"
          >添加</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :title="zhName"
      :visible.sync="showDDzh"
      width="40%"
      :before-close="closeDdzh"
    >
      <el-radio-group v-model="needZh" @change="zhChang">
        <el-radio label="无需转换" :disabled="isLock == 1">无需转换</el-radio>
        <el-radio label="已设置" :disabled="isLock == 1">需要转换</el-radio>
      </el-radio-group>
      <div class="sjly" v-show="needZh == '已设置'">
        <span>数据来源:</span>
        <el-select
          :disabled="isLock == 1"
          size="small"
          @change="changSjly"
          v-model="sjly"
          placeholder="请选择数据来源"
        >
          <el-option
            v-for="item in sjlyOpt"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <div v-show="lrfsRow == 0 && sjly == -1">
          <el-table
            size="small"
            :data="ddzhtableData"
            border
            style="width: 100%; margin-top: 10px"
          >
            <el-table-column type="index" label="序" width="50">
            </el-table-column>
            <el-table-column prop="yscj" label="原始成绩">
              <template slot-scope="scope">
                <div style="display: flex; flex-direction: row">
                  <el-input
                    size="mini"
                    style="width: 40%"
                    v-model="scope.row.yscj[0]"
                    @blur="inpBlur"
                  ></el-input>
                  <span>~</span>
                  <el-input
                    size="mini"
                    style="width: 40%"
                    v-model="scope.row.yscj[1]"
                    @blur="inpBlur"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="bh" label="编码" width="100">
              <template slot-scope="scope">
                <el-input
                  :disabled="isLock == 1"
                  size="small"
                  v-model="scope.row.bh"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="zhhmc" label="转换后等第名称" width="160px">
              <template slot-scope="scope">
                <el-input
                  :disabled="isLock == 1"
                  size="small"
                  v-model="scope.row.zhhmc"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            :disabled="isLock == 1"
            size="mini"
            style="width: 100%"
            @click="addDdRow"
            >+</el-button
          >
        </div>

        <!-- 等第 -->
        <div v-show="lrfsRow == 1 || (lrfsRow == 0 && sjly !== -1)">
          <el-table
            size="large"
            :data="ddzhtableDataSecond"
            border
            style="width: 100%; margin-top: 10px"
          >
            <el-table-column type="index" label="序" width="50">
            </el-table-column>
            <el-table-column prop="yscj" label="原始成绩1" width="180">
            </el-table-column>
            <el-table-column prop="bm" label="编码" width="100">
              <template slot-scope="scope">
                <el-input
                  :disabled="isLock == 1"
                  size="small"
                  v-model="scope.row.bm"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="zhhmc" label="转换后等第名称">
              <template slot-scope="scope">
                <el-input
                  :disabled="isLock == 1"
                  size="small"
                  v-model="scope.row.zhhmc"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDdzh">取消</el-button>
        <el-button :disabled="isLock == 1" @click="submitDdzh">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="批量复制"
      :visible.sync="showPlfz"
      width="30%"
      :before-close="closePlfz"
    >
      <el-radio-group @change="plfzChange" v-model="plfzRadio">
        <el-radio :label="0">学科复制</el-radio>
        <el-radio :label="1">年级复制</el-radio>
        <el-radio :label="2">考试复制</el-radio>
      </el-radio-group>
      <!-- 学科复制 -->
      <div style="margin-top: 15px">
        <el-form ref="form" :model="form7" label-width="80px">
          <el-form-item label="数据源">
            <el-cascader
              size="small"
              :key="cascaderKey"
              v-model="xkfz"
              :options="xkfzOpt"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="复制到">
            <el-cascader
              size="small"
              :key="cascaderKey"
              v-model="xkfzTo"
              :options="xkfzOpt"
              :props="{ multiple: true }"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePlfz">取 消</el-button>
        <el-button type="primary" @click="submitPlfz">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      title="编辑考试"
      :visible.sync="showDelExam"
      width="30%"
    >
      <div style="margin-top: 15px">
        <el-table :data="treeData" style="width: 100%">
          <el-table-column size="mini" prop="name" label="考试名">
            <template slot-scope="scope">
              <el-input
                size="mini"
                @blur="editExam(scope.row)"
                v-model="scope.row.name"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="submitDelExam(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-form label-width="80px">
          <el-form-item label="考试">
            <el-select size="small" v-model="examId">
              <el-option
                v-for="item in treeData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDelExam = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import main from "~/api/examManage";
import main1 from "~/api/termManage";
import main2 from "~/api/cjdw";
import main3 from "~/api/addGradeClass";
export default {
  props: ["djxq", "cjlbId", "isLock", "xueqiId"],
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  data() {
    return {
      ifTree: true,
      treeLoading: false,
      tableLoading: false,
      showDelExam: false,
      examId: undefined,
      examIdOpt: [],
      //
      passwordTable: [],
      form7: {},
      xkfzOpt: [],
      xkfz: [],
      xkfzTo: [],
      plfzRadio: 0,
      ksId: 0, //点击树获取考试id
      gradeId: 0, //点击树获取年级id
      // 右侧表格数据
      tableData: [],
      //新增考试字段
      form: {
        name: "",
        dynj: [],
      },
      dynjOpt: [], //对应年级列表
      xkList: [], //所有学科列表
      defaultProps: {
        children: "showNj",
        label: "name",
      },
      treeData: [],
      lrszList: [],
      cjlrfsTableData: [], //录入方式表格
      //   新增考试dia
      showAddExam: false,
      //录入方式dia
      showLrfs: false,
      //录入设置dia
      showLrsz: false,
      //添加等第转换-列dia
      showAddDDzh: false,
      //等第转换-列dia
      showDDzh: false,
      //录入方式单选绑定值
      llfsRadio: "0",
      //是否需要转换绑定值
      needZh: "无需转换",
      maxScore: undefined, //最高值
      minScore: undefined, //最低值
      ksdw: "", //单位
      rowId: 0, //当前行id
      tableColumns: [], //表格动态列
      columnsName: "", //动态列名
      ddzhtableData: [], //设置等第转换表格
      ddzhtableDataSecond: [], //设置等第转换表格
      zhName: "", //点击的列名
      sjly: "", //数据来源
      sjlyOpt: [{ name: "原始成绩", id: -1 }], //数据来源选项
      lrfsRow: 0, //当前行的录入方式 ,0--分值，1--等第
      maxScoreRow: 0,
      minScoreRow: 0,
      showLrqx: false, //录入权限dia
      lrqxRadio: "1", //录入权限单选框
      zdjs: [], //指定教师绑定值
      zdjsOpt: [], //指定教师选项
      dwOpt: [], //成绩单位选项
      showPlfz: false,
      plfzType: 0, //0--学科复制,1--年级复制,2--考试复制
      cascaderKey: 1,
      twPasswordTable: [],
    };
  },
  methods: {
    editExam(row) {
      let val = {
        id: row.id,
        name: row.name,
      };
      main
        .edit(val)
        .then((res) => {
          this.getTreeData();
        })
        .catch((err) => {});
    },
    //删除考试
    delExam() {
      this.showDelExam = true;
    },
    submitDelExam(row) {
      main
        .del({ id: row.id })
        .then((res) => {
          this.getTreeData();
          this.examId = undefined;
        })
        .catch((err) => {});
    },
    //删除数据
    del(record) {
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .deleteKsXueke({ id: record.id })
            .then((res) => {
              this.hxTabel();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },
    //提交账号密码
    submitLrsz() {
      let val = {
        id: this.cjlbId,
        setNjList: this.passwordTable,
        setTwsOne: this.twPasswordTable[0],
      };
      main3
        .edit(val)
        .then((res) => {
          this.$message.success("设置成功!");
          this.showLrsz = false;
        })
        .catch((err) => {});
    },
    //获取账号密码表格
    getPassWordTable() {
      let val = {
        schoolId: this.schoolId,
      };
      main3
        .find(val)
        .then((res) => {
          let obj = [];
          res.data.map((item) => {
            if (item.id == this.cjlbId) {
              obj = item.setNjList;
              this.twPasswordTable = [item.setTwsOne];
            }
          });
          console.log(this.twPasswordTable);
          this.passwordTable = obj.filter((item) => {
            return item.djxq == 1;
          });
        })
        .catch((err) => {});
    },
    //   批量复制radio改变值
    plfzChange(val) {
      ++this.cascaderKey;
      this.xkfz = [];
      this.xkfzTo = [];
      if (val == 0) {
        this.plfzType = 0;
        this.seeCopy();
      } else if (val == 1) {
        this.plfzType = 1;
        let val = {
          cjlbId: this.cjlbId,
          search: 1,
        };
        main
          .seeCopy(val)
          .then((res) => {
            this.xkfzOpt = res.data;
          })
          .catch((err) => {});
      } else if (val == 2) {
        this.plfzType = 2;
        let val = {
          cjlbId: this.cjlbId,
          search: 2,
        };
        main
          .seeCopy(val)
          .then((res) => {
            this.xkfzOpt = res.data;
          })
          .catch((err) => {});
      }
    },
    //   获取批量复制数据源
    seeCopy() {
      let val = {
        cjlbId: this.cjlbId,
      };
      main
        .seeCopy(val)
        .then((res) => {
          this.xkfzOpt = res.data;
        })
        .catch((err) => {});
    },
    //关闭批量复制
    closePlfz() {
      this.showPlfz = false;
    },
    //提交批量复制
    submitPlfz() {
      console.log("plfzType", this.plfzType);
      if (this.plfzType == 0) {
        let arr = [];
        this.xkfzTo.map((item) => {
          arr.push(item[3]);
        });
        let val = { id: this.xkfz[3], ids: arr };
        console.log("val", val);
        main
          .copyXueke(val)
          .then((res) => {
            this.showPlfz = false;
            this.$message.success(res.data);
            this.plfzRadio = 0;
            this.xkfz = [];
            this.xkfzTo = [];
            this.hxTabel();
          })
          .catch((err) => {});
      } else if (this.plfzType == 1) {
        let arr = [];
        this.xkfzTo.map((item) => {
          arr.push({
            gradeId: item[2],
            ksId: item[1],
          });
        });
        let val = {
          fuzhiNjs: arr,
          gradeId: this.xkfz[2],
          ksId: this.xkfz[1],
        };
        console.log("val", val);
        main
          .copyNj(val)
          .then((res) => {
            this.showPlfz = false;
            this.$message.success(res.data);
            this.plfzRadio = 0;
            this.xkfz = [];
            this.xkfzTo = [];
            this.hxTabel();
          })
          .catch((err) => {});
      } else if (this.plfzType == 2) {
        let arr = [];
        this.xkfzTo.map((item) => {
          arr.push(item[1]);
        });
        let val = { id: this.xkfz[1], ids: arr };
        console.log("val", val);
        main
          .copyKs(val)
          .then((res) => {
            this.showPlfz = false;
            this.$message.success(res.data);
            this.plfzRadio = 0;
            this.xkfz = [];
            this.xkfzTo = [];
            this.hxTabel();
          })
          .catch((err) => {});
      }
    },
    //批量复制
    copy() {
      this.showPlfz = true;
      this.seeCopy();
    },
    //   获取所有单位
    getDw() {
      main2
        .find({ schoolId: this.schoolId })
        .then((res) => {
          this.dwOpt = res.data;
        })
        .catch((err) => {});
    },
    //   关闭录入权限dia
    closeLrqx() {
      this.showLrqx = false;
    },
    //   提交录入权限
    submitLrqx() {
      this.showLrqx = false;
      if (this.lrqxRadio == "2") {
        var val = {
          id: this.rowId,
          gradeId: this.gradeId,
          ksId: this.ksId,
          lrqx: "账号密码登录",
        };
      } else {
        var val = {
          id: this.rowId,
          gradeId: this.gradeId,
          ksId: this.ksId,
          lrqx: "任课老师",
        };
      }
      main
        .editXk(val)
        .then((res) => {
          this.hxTabel();
        })
        .catch((err) => {});
    },
    // 添加成绩录入方式行
    addCjlrfsRow() {
      this.cjlrfsTableData.push({ bm: "", ddmc: "" });
    },
    //   提交等第转化--列
    submitAddDdzh() {
      let val = {
        gradeId: this.gradeId,
        ksId: this.ksId,
        name: this.columnsName,
      };
      main
        .addDd(val)
        .then((res) => {
          this.hxTabel();
          this.showAddDDzh = false;
          this.$message.success(res.data);
          this.columnsName = "";
        })
        .catch((err) => {});
    },
    //关闭添加等地转换-列
    closeAddDdzh() {
      this.showAddDDzh = false;
      this.columnsName = "";
    },
    addDdRow() {
      this.ddzhtableData.push({
        yscj: [],
        bm: "",
        zhhmc: "",
      });
    },
    inpBlur(e) {
      console.log("this.ddzhtableData", this.ddzhtableData);
      if (e.target.value > this.maxScoreRow) {
        e.target.value = null;
        this.$message.error("填入值不能大于设置的范围!");
      } else if (e.target.value < this.minScoreRow) {
        e.target.value = null;
        this.$message.error("填入值不能小于设置的范围!");
      }
      this.ddzhtableData.map((item) => {
        if (e.target.value > item.yscj[0] && e.target.value < item.yscj[1]) {
          e.target.value = null;
          this.$message.error("填入值区间重叠!");
        }
      });
    },
    //关闭等地转换dia
    closeDdzh() {
      this.showDDzh = false;
      this.ddzhtableData = [];
      this.ddzhtableDataSecond = [];
    },
    //提交等第转换
    submitDdzh() {
      //原始成绩--分值
      if (this.lrfsRow == 0 && this.sjly == -1) {
        let arr = [];
        let typeName = "";
        this.sjlyOpt.map((item) => {
          if (item.id == this.sjly) {
            typeName = item.name;
          }
        });
        this.ddzhtableData.map((item) => {
          arr.push({
            bh: item.bh,
            maxScore: item.yscj[1],
            minScore: item.yscj[0],
            typeName: typeName,
            flag: "已设置",
            name: this.zhName,
            rank: item.zhhmc,
            type: "1",
          });
        });
        let val = {
          id: this.rowId,
          xkdedi: arr,
        };
        main
          .editXk(val)
          .then((res) => {
            this.showDDzh = false;
            this.$message.success(res.data);
            this.hxTabel();
          })
          .catch((err) => {});
      } else {
        let arr = [];
        let typeName = "";
        this.sjlyOpt.map((item) => {
          if (item.id == this.sjly) {
            typeName = item.name;
          }
        });
        this.ddzhtableDataSecond.map((item) => {
          arr.push({
            bh: item.bm,
            typeName: typeName,
            flag: "已设置",
            name: this.zhName,
            rank: item.zhhmc,
            beRank: item.yscj,
            type: "1",
          });
        });
        let val = {
          id: this.rowId,
          xkdedi: arr,
        };
        main.editXk(val).then((res) => {
          this.showDDzh = false;
          this.$message.success(res.data);
          this.hxTabel();
        });
      }
    },
    // 录入账号
    lrsz() {
      this.showLrsz = true;
      this.getPassWordTable();
    },
    //添加行
    addRow() {
      if (this.gradeId == 0) {
        this.$message.error("请选择年级!");
      } else {
        this.tableData.push({});
      }
    },
    //添加列
    addColumn(column, event) {
      if (column.label == "+") {
        if (this.gradeId == 0) {
          this.$message.error("请选择年级!");
        } else {
          this.showAddDDzh = true;
        }
      }
    },
    //   点击单元格
    clickCell(row, column, cell, event) {
      this.ddzhtableDataSecond = [];
      this.ddzhtableData = [];
      this.rowId = row.id;
      this.maxScore = row.maxScore;
      this.minScore = row.minScore;
      if (column.label == "录入方式") {
        this.showLrfs = true;

        this.ksdw = row.ksdw;
        this.llfsRadio = row.lrfs ? row.lrfs.toString() : "0";
        console.log("1212", this.llfsRadio);
      } else if (column.label == "录入权限") {
        this.zdjs = [];
        this.lrqxRadio = "1";
        this.showLrqx = true;
        if (row.lrqx == "任课老师") {
          this.lrqxRadio = "1";
        } else if (!row.lrqx) {
          this.lrqxRadio = "1";
        } else {
          this.lrqxRadio = "2";
          this.zdjs = row.lrqx ? row.lrqx.split(",") : [];
        }
      }
      this.sjlyOpt = [{ name: "原始成绩", id: -1 }];
      this.tableColumns.map((item) => {
        if (column.label == item.name) {
          this.showDDzh = true;
          this.zhName = column.label; //点击的列名
        }

        this.sjlyOpt.push({ name: item.name, id: item.id });
      });
      console.log("row", row);
      this.needZh = "无需转换"; //清空是否需要转换
      this.sjly = ""; //原始数据下拉框
      this.lrfsRow = row.lrfs; //获取点击的单元的录入方式0--数值，1--等第
      this.maxScoreRow = row.maxScore;
      this.minScoreRow = row.minScore;
      if (row.lrfs == 1) {
        this.cjlrfsTableData = row.showdedi;
        if (row.xkdedi[0] ? row.xkdedi[0].flag == "已设置" : false) {
          this.needZh = "已设置";
          //   this.sjlyOpt.map((item) => {
          //     if (item.name == row.xkdedi[0].typeName) {
          //       this.sjly = item.id;
          //       console.log("111111", this.sjly);
          //     }
          //   });
          //   row.xkdedi.map((item) => {
          //     this.ddzhtableDataSecond.push({
          //       yscj: item.beRank,
          //       bm: item.bh,
          //       zhhmc: item.rank,
          //     });
          //   });
          row.zhdedi.map((item) => {
            if (Object.keys(item)[0] == column.label) {
              console.log("item", item);
              item[Object.keys(item)[0]].map((subItem) => {
                this.ddzhtableDataSecond.push({
                  yscj: subItem.beRank,
                  bm: subItem.bh,
                  zhhmc: subItem.rank,
                });
                this.sjlyOpt.map((sonItem) => {
                  if (sonItem.name == subItem.typeName) {
                    this.sjly = sonItem.id;
                  }
                });
              });
            }
          });
        }
      } else if (row.lrfs == 0) {
        if (row.xkdedi[0] ? row.xkdedi[0].flag == "已设置" : false) {
          this.ddzhtableData = [];
          this.needZh = "已设置";

          row.zhdedi.map((item) => {
            if (Object.keys(item)[0] == column.label) {
              console.log("item", item);
              item[Object.keys(item)[0]].map((subItem) => {
                this.sjlyOpt.map((sonItem) => {
                  if (sonItem.name == subItem.typeName) {
                    this.sjly = sonItem.id;
                  }
                });
                if (this.sjly == -1) {
                  this.ddzhtableData.push({
                    yscj: [subItem.minScore, subItem.maxScore],
                    bh: subItem.bh,
                    zhhmc: subItem.rank,
                  });
                } else {
                  this.ddzhtableDataSecond.push({
                    yscj: subItem.beRank,
                    bm: subItem.bh,
                    zhhmc: subItem.rank,
                  });
                }
              });
            }
          });
        }
      }
      console.log("lrfsRow", this.lrfsRow);
      console.log("sjly", this.sjly);
    },
    // 是否需要转换
    zhChang(val) {
      console.log(val);
    },
    //改变数据来源
    changSjly(val) {
      console.log("val", val);
      let name = "";
      this.sjlyOpt.map((item) => {
        if (item.id == val) {
          name = item.name;
        }
      });
      let obj = {
        gradeId: this.gradeId,
        ksId: this.ksId,
        name: name,
        xkksId: this.rowId,
      };

      main
        .findsjly(obj)
        .then((res) => {
          console.log("res", res.data);
          let arr = [];
          res.data.map((item) => {
            if (item.rank) {
              arr.push({
                yscj: item.rank,
                bm: "",
                zhhmc: "",
              });
            }
          });
          this.ddzhtableDataSecond = arr;
        })
        .catch((err) => {});
    },
    //   学科值改变
    xkChange(scope) {
      if (scope.row.id) {
        let val = {
          id: scope.row.id,
          gradeId: this.gradeId,
          ksId: this.ksId,
          name: scope.row.name,
        };
        console.log("1111", scope.row);
        main
          .editXk(val)
          .then((res) => {
            this.hxTabel();
          })
          .catch((err) => {});
      } else {
        let val = {
          gradeId: this.gradeId,
          ksId: this.ksId,
          name: scope.row.name,
        };
        console.log("2222", val);
        main
          .addXk(val)
          .then((res) => {
            this.hxTabel();
          })
          .catch((err) => {});
      }
    },
    //  录入设置改变
    lrszChange(item) {
      let val = {
        endTime: item.date[1],
        startTime: item.date[0],
        id: item.id,
      };
      main
        .edit(val)
        .then((res) => {
          this.$message.success(res.data);
        })
        .catch((err) => {});
    },
    //  考试时间改变
    kssjChange(scope) {
      let val = {
        id: scope.row.id,
        gradeId: this.gradeId,
        ksId: this.ksId,
        kssj: scope.row.kssj,
      };
      main
        .editXk(val)
        .then((res) => {
          this.hxTabel();
        })
        .catch((err) => {});
    },
    lrsdChange(scope) {
      let val = {
        id: scope.row.id,
        gradeId: this.gradeId,
        ksId: this.ksId,
        islock: scope.row.islock,
      };
      main
        .editXk(val)
        .then((res) => {
          this.hxTabel();
        })
        .catch((err) => {});
    },
    //  考试方式改变
    ksfsChange(scope) {
      let val = {
        id: scope.row.id,
        gradeId: this.gradeId,
        ksId: this.ksId,
        ksfs: scope.row.ksfs,
      };
      main
        .editXk(val)
        .then((res) => {
          this.hxTabel();
        })
        .catch((err) => {});
    },
    // 提交录入方式
    submitLrfs() {
      if (this.llfsRadio == "0") {
        let val = {
          id: this.rowId,
          gradeId: this.gradeId,
          ksId: this.ksId,
          maxScore: parseInt(this.maxScore),
          minScore: parseInt(this.minScore),
          ksdw: this.ksdw,
          lrfs: 0,
        };
        main
          .editXk(val)
          .then((res) => {
            this.showLrfs = false;
            this.$message.success(res.data);
            this.maxScore = undefined;
            this.minScore = undefined;
            this.ksdw = "";
            this.llfsRadio = "0";
            this.hxTabel();
          })
          .catch((err) => {});
      } else {
        let arr = [];
        this.cjlrfsTableData.map((item) => {
          arr.push({
            bh: item.bh,
            name: "原始成绩",
            rank: item.rank,
            type: "-1",
          });
        });
        let val = {
          id: this.rowId,
          lrfs: 1,
          showdedi: arr,
        };
        // console.log("val", val);
        main
          .editXk(val)
          .then((res) => {
            this.showLrfs = false;
            this.$message.success(res.data);
            this.llfsRadio = "0";
            this.cjlrfsTableData = [];
            this.hxTabel();
          })
          .catch((err) => {});
      }
    },

    //获取所有学科
    getAllXk() {
      main
        .findXk({ schoolId: this.schoolId })
        .then((res) => {
          this.xkList = res.data;
          console.log(" this.xkList", this.xkList);
        })
        .catch((err) => {});
    },
    //   获取新增考试中年级列表
    getDynj() {
      let val = {
        schoolId: this.schoolId,
        xueqiId: this.xueqiId,
      };
      main1
        .find(val)
        .then((res) => {
          console.log("对应年级", res.data);
          this.dynjOpt = res.data.list[0].showNj;
        })
        .catch((err) => {});
    },
    //获取左侧树形列表
    getTreeData() {
      this.treeLoading = true;
      let val = {
        cjlbId: this.cjlbId,
        djxq: parseInt(this.djxq),
      };
      main
        .find(val)
        .then((res) => {
          this.treeLoading = false;
          this.treeData = res.data.list;
          let arr = [];
          res.data.list.map((item) => {
            arr.push({
              name: item.name,
              id: item.id,
              date: ["2020-01-01", "2020-01-01"],
            });
          });
          this.lrszList = arr;
          console.log("this.lrszList", this.lrszList);
        })
        .catch((err) => {});
    },
    //点击左侧树
    clickTree(data, Node) {
      this.tableLoading = true;
      this.ksId = Node.parent.data.id;
      this.gradeId = data.id;
      let val = {
        cjlbId: this.cjlbId,
        djxq: parseInt(this.djxq),
        ksId: Node.parent.data.id,
        gradeId: data.id,
      };
      main
        .find(val)
        .then((res) => {
          this.tableLoading = false;
          this.tableData = res.data.list[0].xuekes;
          res.data.list[0].showNj.map((item) => {
            if (item.id == this.gradeId) {
              this.tableColumns = item.scoreRankChanges;
            }
          });
          //   console.log("this.tableColumns", this.tableColumns);
        })
        .catch((err) => {});
    },
    //回显右侧表格
    hxTabel() {
      let val = {
        cjlbId: this.cjlbId,
        djxq: parseInt(this.djxq),
        ksId: this.ksId,
        gradeId: this.gradeId,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list[0].xuekes;
          res.data.list[0].showNj.map((item) => {
            if (item.id == this.gradeId) {
              this.tableColumns = item.scoreRankChanges;
            }
          });
        })
        .catch((err) => {});
    },
    //添加考试
    addExam() {
      this.showAddExam = true;
    },

    // 关闭新增考试dia
    closeAddExam() {
      this.showAddExam = false;
      this.clearAddExam();
    },
    // 关闭录入设置dia
    closeLrsz() {
      this.showLrsz = false;
    },
    // 关闭录入方式dia
    closeLrfs() {
      this.showLrfs = false;
      this.maxScore = undefined;
      this.minScore = undefined;
      this.ksdw = "";
      this.llfsRadio = "1";
    },

    // 清除新增考试字段
    clearAddExam() {
      this.form = {
        name: "",
        dynj: [],
      };
    },
    //提交新增考试
    submitAddExam() {
      let showNj = [];
      this.form.dynj.map((item) => {
        showNj.push({
          id: item,
        });
      });
      let val = {
        cjlbId: this.cjlbId,
        djxq: this.djxq,
        name: this.form.name,
        showNj: showNj,
      };
      main
        .add(val)
        .then((res) => {
          this.getTreeData();
          this.showAddExam = false;
          this.$message.success(res.data);
          this.clearAddExam();
        })
        .catch((err) => {});
    },
    findTeacher() {
      main
        .findTeacher({ schoolId: this.schoolId })
        .then((res) => {
          this.zdjsOpt = res.data;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getTreeData();
    this.getDynj();
    this.getAllXk();
    this.findTeacher();
    this.getDw();
    this.seeCopy();
  },
};
</script>

<style scoped>
.top {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
}
.contain {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.left {
  width: 250px;
  min-width: 250px;
  min-height: 250px;
  border: 1px solid #eeeeee;
}
.right {
  width: 100%;
  padding-left: 15px;
}
.addRow {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sjly {
  margin-top: 15px;
}
/deep/.el-slider__button {
  height: 10px;
  width: 10px;
}
.lrqx {
  display: flex;
  flex-direction: column;
}
.lrqx1 {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.jia {
  font-size: 25px;
  display: flex;

  flex-direction: row;
  align-items: center;
}
.tableLrfs {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/deep/.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: #dcdcdc;
  color: #2f4f4f;
}
</style>
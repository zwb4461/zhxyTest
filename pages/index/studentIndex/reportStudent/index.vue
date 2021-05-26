<template>
  <div>
    <!-- 查询条件 -->
    <a-form-model
      style="margin-bottom:10px;"
      layout="inline"
      :model="table.select"
    >
      <a-form-model-item>
        <a-input v-model="table.select.name" placeholder="姓名"></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="table.select.idno" placeholder="证件编号"></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input
          v-model="table.select.carerphone"
          placeholder="监护人手机号"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <!-- <a-input v-model="table.select.sourcetype" placeholder="生源类型"></a-input> -->
        <a-select
          style="width:120px"
          v-model="table.select.sourcetype"
          placeholder="生源类型"
        >
          <a-select-option v-for="item in select.sourcetype" :key="item.v">{{
            item.text
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-select
          style="width:120px"
          v-model="table.select.status"
          placeholder="审核状态"
        >
          <a-select-option v-for="item in select.shzt" :key="item.v">{{
            item.text
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <!-- <a-form-model-item>
        <a-range-picker
          v-model="table.time"
          format="YYYY-MM-DD HH:mm"
          :placeholder="['报名起始日期', '报名截止日期']"
        />
      </a-form-model-item> -->
      <a-form-model-item v-if="tableType === 1">
        <a-button-group>
          <a-button
            type="primary"
            :loading="loading.upload"
            @click="toChooseFiles"
          >
            <template v-if="!loading.upload">
              <a-icon type="plus" />
            </template>
            导入名单
          </a-button>
          <!-- <a-button type="primary">
            <a href="/报名新生导入模板（非户籍）.xlsx">
              模板下载
              <a-icon type="cloud-download" />
            </a>
          </a-button> -->
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a href="/报名新生导入模板.xlsx">
                 模板下载
                  <a-icon type="cloud-download" />
                </a>
              </a-menu-item>
              <!-- <a-menu-item key="2">
                <a href="/报名审核记录导出(户籍生).xlsx">
                  （户籍生）模板下载
                  <a-icon type="cloud-download" />
                </a>
              </a-menu-item> -->
            </a-menu>
            <a-button type="primary">
              模板下载 <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </a-button-group>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="reloadTable">查询</a-button>
      </a-form-model-item>
      <template v-if="activing">
        <template v-if="tableType === 1">
          <a-form-model-item v-if="$power('p-1-f-add')">
            <a-button @click="addForm">新增</a-button>
          </a-form-model-item>
          <a-form-model-item v-if="$power('p-1-f-del')">
            <a-button
              :disabled="table.selectedRowKeys.length === 0"
              type="danger"
              @click="delAll"
              >删除</a-button
            >
          </a-form-model-item>
        </template>
        <template v-if="tableType === 2">
          <a-form-model-item>
            <a-button
              type="primary"
              @click="toPrint"
              icon="printer"
              :disabled="table.selectedRowKeys.length === 0"
              >批量打印</a-button
            >
          </a-form-model-item>
        </template>
      </template>
    </a-form-model>

    <a-upload
      v-show="false"
      name="file"
      :multiple="false"
      :beforeUpload="beforeUpload"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    >
      <a-button id="xlsx" type="primary">
        <a-icon type="plus" />导入名单
      </a-button>
    </a-upload>

    <!-- 表格 -->
    <a-table
      class="table-data"
      size="middle"
      bordered
      rowKey="id"
      :scroll="{ x: 1500, y: '60vh' }"
      :rowSelection="{
        selectedRowKeys: table.selectedRowKeys,
        onChange: onSelectChange
      }"
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

      <template slot="sourcetype" slot-scope="text">
        <template v-for="(item, idx) in select.sourcetype">
          <template v-if="item.v === text">
            <a-tag :key="idx" :color="item.type">{{ item.text }}</a-tag>
          </template>
        </template>
      </template>
      <template slot="name" slot-scope="text, record">
        <span
          v-if="record.sex"
          :class="['sex', record.sex === 1 ? 'nan' : 'nv']"
          >{{ record.sex === 1 ? "男" : "女" }}</span
        >
        {{ text }}
        <span v-if="record.tag" class="type">{{ record.tag }}</span>
      </template>
      <template slot="birthday" slot-scope="text">{{
        text ? $moment(text).format("YYYY-MM-DD") : ""
      }}</template>
      <template slot="idcardtype" slot-scope="text">{{
        getSelectName("idcardtype", text)
      }}</template>
      <template slot="rankShow" slot-scope="text">
        <template v-if="text">
          <!-- <a-rate style="font-size:20px" disabled :value="text" :count="4" /> -->
          <span class="text">{{ desc[text - 1] }}</span>
        </template>
      </template>
      <!-- <template slot="address" slot-scope="text">{{text | address}}</template> -->
      <template slot="status" slot-scope="text">
        <template v-if="text == 1">
          <a-tag color="green">审核通过</a-tag>
        </template>
        <template v-else-if="text == 2">
          <a-tag color="red">审核未通</a-tag>
        </template>
        <template v-else>
          <a-tag color="blue">待审核</a-tag>
        </template>
      </template>
      <template slot="state" slot-scope="text">
        <template v-if="text == 1">
          <a-tag color="green">用户正常</a-tag>
        </template>
        <template v-else-if="text == 2">
          <a-tag color="red"> 姓名+手机号 重复</a-tag>
        </template>
        <template v-else-if="3">
          <a-tag color="blue"> 姓名+证件号码+手机号 重复</a-tag>
        </template>
        <template v-else-if="4">
          <a-tag color="blue"> 姓名+证件号 重复</a-tag>
        </template>
        <template v-else-if="5">
          <a-tag color="blue"> 用户名为空</a-tag>
        </template>
        <template v-else-if="6">
          <a-tag color="blue"> 监护人号码为空</a-tag>
        </template>
      </template>
      <template slot="rankInfo" slot-scope="text">
        <!-- {{mark.type==2?text:''}} -->
        {{ text }}
      </template>
      <template slot="tool" slot-scope="text, record, index">
        <template v-if="tableType === 1">
          <a-button
            v-if="$power('p-1-f-edit')"
            size="small"
            type="waring"
            @click="edit(record)"
            >{{ activing ? "编辑" : "查看" }}</a-button
          >
          <template v-if="activing">
            <a-button
              v-if="$power('p-1-f-del')"
              size="small"
              type="danger"
              @click="delOne(record.id, index)"
              >删除</a-button
            >
          </template>
        </template>
        <template v-else-if="tableType === 2">
          <!-- :disabled="!check.power||!activing"  -->
          <a-button
            size="small"
            :disabled="!check.power || !activing"
            @click="toCheck(record)"
            >审核</a-button
          >
          <!-- <a-button size="small" @click="toCheck(record)">审核</a-button> -->
        </template>
        <template v-else-if="tableType === 3">
          <!-- :disabled="!mark.power||!activing" -->

          <a-button
            size="small"
            :disabled="!mark.power || !activing"
            type="primary"
            @click="toMark(record)"
            >评定</a-button
          >
          <a-button size="small" @click="toGetOldMark(record)"
            >评定历史</a-button
          >
        </template>
      </template>
    </a-table>

    <!-- 新增和编辑表单 -->
    <my-drawer-vue
      title="新生报名"
      :showOkbtn="activing"
      :btnShow2="false"
      :width="800"
      :loading="loading.form"
      :visible="pop.form"
      :onOk="submit"
      @onClose="formClose"
    >
      <template slot="contentInfo">
        <table-form ref="tableForm" :btnLoading="btnLoading" />
      </template>
    </my-drawer-vue>

    <!-- 审核弹出框 -->
    <my-drawer-vue
      title="学生审核"
      :width="800"
      :btnShow="false"
      :loading="loading.check"
      :visible="pop.check"
      @onClose="checkClose"
    >
      <template slot="contentInfo">
        <check-form
          ref="checkItem"
          :btnLoading="btnLoading"
          :toPrint="printView"
        />
      </template>
    </my-drawer-vue>

    <!-- 评分弹出框 -->
    <mark-form
      ref="markForm"
      :reload="reloadTable"
      :markType="mark.type"
      :modeItem="mark.modeItem"
      :scorings="mark.scorings"
    />

    <!-- 表单打印 -->
    <template v-if="tableType === 2">
      <print-form ref="printForm" :title="title" />
    </template>

    <a-modal v-model="pop.oldMark" width="800px" title="评分历史">
      <a-table
        class="table-data"
        size="middle"
        bordered
        rowKey="id"
        :columns="oldMarkTable.columns"
        :dataSource="oldMarkTable.data"
      />
    </a-modal>

    <a-modal
      v-model="loading.upload"
      :maskClosable="false"
      :keyboard="false"
      title="报名新生导入中"
      :footer="null"
      :closable="false"
      centered
    >
      <a-progress :percent="this.loadingTime.upload" status="active" />
    </a-modal>
  </div>
</template>

<script>
//组件
import myDrawerVue from "~/components/common/myDrawer.vue"; //自定义弹出层
import tableForm from "./components/_form"; //新增编辑表单
import markForm from "./components/_mark.vue"; //评分表单
import checkForm from "./components/_check.vue"; //审核表单
import printForm from "./components/_print.vue"; //打印表格

//接口
import main from "~/api/reportStudent";
import examineSetting from "~/api/examineSetting";
import markApi from "~/api/mark";
//数据
import tableHeard from "./components/tableHeard";
//类型数据
import {
  foreigntype,
  nation,
  country,
  degree,
  sourcetype,
  houseType,
  goMode,
  withStudent,
  residenceType,
  ismb,
  havehouse,
  isdq,
  shzt
} from "~/utils/data";

export default {
  components: {
    myDrawerVue,
    tableForm,
    markForm,
    checkForm,
    printForm
  },
  props: {
    tableType: {
      //1:报名表单 , 2:审核表单 3:评分表单
      type: Number,
      default: 1
    },
    activing: Boolean, //是否关闭
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
    }
  },
  filters: {
    address(value) {
      let info = "";
      if (value) {
        info = value.replace(/\//g, " ");
      }
      return info;
    }
  },
  data() {
    return {
      pop: {
        oldMark: false,
        form: false,
        check: false
      },
      loadingTime: {
        upload: 0
      },
      loading: {
        modal: "",
        table: false,
        form: false,
        check: false,
        del: false,
        upload: false
      },

      select: {
        special: ["唱歌", "跳舞", "音乐"],
        foreigntype,
        sourcetype,
        country,
        nation,
        degree,
        houseType,
        goMode,
        withStudent,
        residenceType,
        shzt,
        trueOrfalse: [
          { text: "是", v: true },
          { text: "否", v: false }
        ],
        idcardtype: [
          { text: "居民身份证", v: "1" },
          { text: "其它", v: "2" }
        ],
        sex: [
          { text: "男", v: 1 },
          { text: "女", v: 2 }
        ],
        ismb: [
          { text: "是", v: 1 },
          { text: "否", v: 0 }
        ],
        havehouse: [
          { text: "是", v: "1" },
          { text: "否", v: "0" }
        ],
        isdq: [
          { text: "是", v: 1 },
          { text: "否", v: 0 }
        ],
        status: [
          { text: "审核通过", v: 1 },
          { text: "待审核", v: 0 },
          { text: "审核未通过", v: 2 }
        ]
      },
      excelHeard: [
        { c: "房产拥有人身份证号", e: "owneridno" },
        { c: "学生姓名", e: "name" },
        { c: "报名编号", e: "appNo" },
        { c: "生源类型", e: "sourcetype" },
        { c: "学生标签", e: "tag" },
        { c: "入学方式", e: "rxfs" },
        { c: "审核状态", e: "status" },
        { c: "证件号码", e: "idno" },
        { c: "身份证号", e: "idno" },
        { c: "性别", e: "sex" },
        { c: "出生日期", e: "birthday" },
        { c: "申报人", e: "sbr" },
        { c: "联系电话", e: "sbrlxdh" },
        { c: "是否报民办", e: "ismb" },
        { c: "户籍详细地址", e: "detailedAddress" },
        { c: "户口类型", e: "hklx" },
        { c: "落户日期", e: "lhrq" },
        { c: "户主姓名", e: "hzxm" },
        { c: "与户主关系", e: "yhzgx" },
        { c: "同街道内迁户记录", e: "tjdnqhjl" },
        { c: "是否有房", e: "havehouse" },
        { c: "产权类型", e: "housetype" },
        { c: "房产拥有形式", e: "fcyyxs" },
        { c: "拥有形式", e: "fcyyxs" },
        { c: "房产拥有人姓名", e: "owner" },
        { c: "拥有比例", e: "yybl" },
        { c: "产权获得日期", e: "housedeadline" },
        { c: "产权证号", e: "houseproof" },
        { c: "房产地址", e: "propertyAddress" },
        { c: "民族", e: "nation" },
        { c: "现居住地", e: "address" },
        { c: "是否单亲", e: "isdq" },
        { c: "父亲姓名", e: "fathername" },
        { c: "父亲证件号", e: "fatheridno" },
        { c: "父亲工作单位", e: "fatherworkplace" },
        { c: "父亲手机", e: "fatherphone" },
        { c: "母亲姓名", e: "mothername" },
        { c: "母亲证件号", e: "motheridno" },
        { c: "母亲工作单位", e: "motherworkplace" },
        { c: "母亲手机", e: "motherphone" },
        { c: "其他监护人", e: "othername" },
        { c: "证件号", e: "otheridno" },
        { c: "监护人手机号", e: "otherphone" },
        { c: "手机号", e: "otherphone" },
        { c: "与学生关系", e: "withStudent" },
        { c: "监护形成原因", e: "jhxcyy" },
        { c: "审核时间", e: "checktime" },
        { c: "审核人", e: "checkerUnionid" },
        { c: "审核备注", e: "checkerRemark" },
        { c: "毕业幼儿园", e: "childhood" },
        { c: "毕业学校", e: "childhood" },
        { c: "对口学校", e: "dkxx" },
        { c: "社保参保人", e: "sbcbr" },
        { c: "参保地", e: "cbd" },
        { c: "参保月数", e: "cbys" },
        { c: "缴保单位", e: "jbdw" },
        { c: "积分参与人", e: "jfcyr" },
        { c: "积分地", e: "jfd" },
        { c: "积分", e: "jf" },
        { c: "父亲居住证", e: "fqjzd" },
        { c: "母亲居住证", e: "mqjzd" },
        { c: "营业执照名称", e: "yyzzmz" },
        { c: "法人代表", e: "frdb" },
        { c: "营业场所", e: "yycs" },
        { c: "有效起日", e: "yxqr" },
        { c: "有效止日", e: "yxzr" },
        { c: "社会信用代码", e: "shxydm" }
      ],
      oldMarkTable: {
        columns: [
          {
            title: "评分项",
            dataIndex: "item",
            width: 160
          },
          {
            title: "分数",
            dataIndex: "branch",
            width: 100
          },
          {
            title: "评定结果",
            dataIndex: "rank",
            width: 100
          },
          {
            title: "时间",
            dataIndex: "ranktime",
            width: 100
          },
          {
            title: "备注",
            dataIndex: "scoringRemark",
            width: 100
          }
        ],
        data: []
      },
      table: {
        time: [],
        select: {
          name: undefined,
          idno: undefined,
          carerphone: undefined,
          signupstarttime: undefined,
          signupendtime: undefined,
          sourcetype: undefined,
          status: undefined
        },
        selectedRowKeys: [], //选中的数据的id
        selectedRows: [], //选中的数据
        pagination: {
          current: 1,
          pageSize: 20,
          total: 0,
          showTotal: total => `共有 ${total} 条数据`,
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true, //是否可以改变 pageSize
          pageSizeOptions: ["10", "40", "60", "80", "100", "500", "3000"]
        },
        //表头,
        columns: [],
        //数据
        data: []
      },
      //评分设置
      mark: {
        power: false, //权限
        type: 1, //评分类型(1.等第,2是分数)
        modeItem: [], //评分项
        scorings: [], //评分规则
        user: [] //有评分权限的人
      },
      //审核设置
      check: {
        power: false, //权限
        user: [] //有审核权限的人
      },
      desc: ["F", "E", "D", "C", "B", "A"],
      data: {
        rank: 0
      }
    };
  },
  watch: {
    "table.time"(nv) {
      if (nv) {
        this.table.select.signupstarttime = this.$moment(nv[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.table.select.signupendtime = this.$moment(nv[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        this.table.select.signupstarttime = "";
        this.table.select.signupendtime = "";
      }
    }
  },
  methods: {
    upLoading(secondsToGo = 20, close = true) {
      if (close) {
        this.loadingTime.upload = 0;
        let aa = 0;
        this.loading.modal = setInterval(() => {
          aa += 1;
          let num = Number(((aa / secondsToGo) * 100).toFixed(2));
          this.loadingTime.upload = num;
        }, 300);
        setTimeout(() => {
          clearInterval(this.loading.modal);
        }, secondsToGo * 300);
      } else {
        clearInterval(this.loading.modal);
        this.loadingTime.upload = 100;
      }
    },
    //唤起隐藏的上传按钮
    toChooseFiles() {
      //   // console.log("uploadId--1111-------", this.enrollId);
      document.getElementById("xlsx").click();
    },
    beforeUpload(file) {
      //   // console.log("uploadId--3333-------", uploadId);
      //   // console.log("uploadId--3333-------", this.uploadId);
      this.setData(file);
      return false;
    },
    getVal(val, type) {
      let info = this.select[type].find(item => item.text == val);
      return info ? info.v : "";
    },
    setData(file) {
      let _this = this;
      this.loading.upload = true;
      //   this.upLoading(100, false);
      this.$importExcel(file, this.excelHeard)
        .then(({ change }) => {
          // console.log("获取的数据为---------", change);
          this.upLoading(change.length);

          let list = change.map(item => {
            let obj = { ...item };

            if (obj.nation == "少数民族") {
              obj.nation = "少数民族";
            }

            obj.sourcetype = this.getVal(obj.sourcetype, "sourcetype");
            obj.housetype = this.getVal(obj.housetype, "houseType");
            obj.rxfs = this.getVal(obj.rxfs, "goMode");
            // obj.hklx = this.getVal(obj.hklx, "residenceType");
            // obj.withStudent = this.getVal(obj.withStudent, "withStudent");
            obj.sex = this.getVal(obj.sex, "sex");
            obj.ismb = this.getVal(obj.ismb, "ismb");
            obj.havehouse = this.getVal(obj.havehouse, "havehouse");
            obj.isdq = this.getVal(obj.isdq, "isdq");

            // obj.status = this.getVal(obj.status, "status");

            return obj;
          });
          // console.log("转换后的值为-----------------------", list);
          return main.addTable({
            actionUnionid: this.unionid,
            enrollId: this.enrollId,
            studentEnrolls: list
          });
        })
        .then(res => {
          this.upLoading(0, false);
          setTimeout(() => {
            this.loading.upload = false;
          }, 1000);
          this.$message.success("导入成功!!!");
          // console.log(res);
          // 重载表格
          this.reloadTable();
        })
        .catch(err => {
          this.loading.upload = false;
          this.upLoading(0, false);
          this.$message.error(err);
          // console.log(err, "xxxxxxxxxxxxxxxx");
        });
    },
    //获取下拉的名称
    getSelectName(name, val, type = 1) {
      let info;
      if (type === 1) {
        info = this.select[name].find(item => item.v == val);
      } else {
        info = this.select[name].find(item => item.text == val);
      }
      if (type === 1) {
        return info ? info.text : "";
      } else {
        return info ? info.v : "";
      }
    },
    //获取数据
    getTableData() {
      //用户列表
      main
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
          // console.log(this.table.data, "xxxxxxxxxxx");
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
    },
    //表单操作 ####-----
    //批量删除数据
    delAll(id, idx) {
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          this.loading.del = true;
          let list = this.table.selectedRows.map(item => {
            return main.del({
              id: item.id,
              actionUnionid: this.unionid, //用户id
              actiontime: this.$moment().format("YYYY-MM-DD HH:mm:ss") //操作时间
            });
          });

          Promise.all(list)
            .then(res => {
              this.loading.del = false;
              this.$message.success("删除成功");
              this.reloadTable();
            })
            .catch(err => {
              this.loading.del = false;
              this.$message.error(err);
            });
        }
      });
    },
    //单个删除数据
    delOne(id, idx) {
      //   // console.log("122222222");
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .del({
              id,
              actionUnionid: this.unionid, //用户id
              actiontime: this.$moment().format("YYYY-MM-DD HH:mm:ss") //操作时间
            })
            .then(res => {
              this.$message.success("删除成功");
              this.reloadTable();
            })
            .catch(err => {
              // console.log("接收到的东西--=-=-=-==", err);
              this.$message.error(err);
            });
        }
      });
    },

    //编辑数据
    edit(row) {
      // console.log(row);
      this.pop.form = true;
      setTimeout(() => {
        this.$refs.tableForm.formType = 2;
        this.$refs.tableForm.clearForm();
        this.$refs.tableForm.setForm(row);
      }, 200);
      //   this.$nextTick(() => {
      //     this.$refs.tableForm.formType = 2;
      //     this.$refs.tableForm.clearForm();
      //     this.$refs.tableForm.setForm(row);
      //   });
    },
    //新增表单
    addForm() {
      this.pop.form = true;

      setTimeout(() => {
        this.$refs.tableForm.formType = 1;
        this.$refs.tableForm.clearForm();
      }, 200);
      //   this.$nextTick(() => {
      //     this.$refs.tableForm.formType = 1;
      //     this.$refs.tableForm.clearForm();
      //   });
    },
    //#表单相关操作--------

    //提交表单
    submit() {
      this.$refs.tableForm.onSubmit();
    },
    //关闭表单弹窗
    formClose() {
      this.pop.form = false;
    },
    //按钮加载与不加载
    btnLoading(type) {
      this.loading.form = type;
      if (type === false) {
        this.formClose(); //关闭表单
        this.reloadTable(); //重载表格
      }
    },
    //##################---评分与审核---###########
    //获取设置
    getExamineSetting() {
      examineSetting.list({ enrollId: this.enrollId }).then(res => {
        // console.log("传过来");
        let { enroll, enrollItems, scorings, userChecks, userItems } = res.data;
        //   //评分设置
        // debugger;
        this.mark.type = enroll.scoringtype;
        this.mark.modeItem = enrollItems;
        console.error(enrollItems);
        this.mark.scorings = scorings;
        //   //审核设置
        this.check.user = userChecks;
        this.mark.user = userItems;
        //   // console.log(this.mark);
        //   // console.log(this.check);
        this.getPower("mark");
        this.getPower("check");

        //比较是否在评分时间内
        let from = this.$moment(enroll.evaluatedatefrom).isBefore(
          this.$moment()
        );
        let to = this.$moment().isBefore(enroll.evaluatedateto);

        // debugger;
        //比较是否在评分时间内
        let from2 = this.$moment(enroll.checkdatefrom).isBefore(this.$moment());
        let to2 = this.$moment().isBefore(enroll.checkdateto);

        if (enroll.isopen === 0) {
          this.mark.power = false;
        } else if (!from) {
          this.mark.power = false;
        } else if (!to) {
          this.mark.power = false;
        }

        if (!from2) {
          this.check.power = false;
        } else if (!to2) {
          this.check.power = false;
        }
      });
      // .catch(err => {
      //   this.$message.error(err);
      // });
    },
    //获取评分或审核权限
    getPower(type) {
      //   debugger;
      let power = this[type].user.findIndex(
        item => item.unionid === this.unionid
      );
      this[type].power = power > -1 ? true : false;
    },
    //评分设置#####-----------
    //打开评分弹窗
    toMark(row) {
      this.$refs.markForm.show(this.mark.modeItem, row);
    },

    //## 审核相关-------------###########

    toCheck(row) {
      this.pop.check = true;
      setTimeout(() => {
        this.$refs.checkItem.setForm(row);
      }, 200);
    },
    checkClose() {
      this.pop.check = false;
    },

    //### 打印相关
    toPrint() {
      this.printView(this.table.selectedRows);
    },
    printView(data) {
      this.$nextTick(() => {
        this.$refs.printForm.setForm(data);
      });
    },
    toGetOldMark(row) {
      markApi
        .getOld({ studentId: row.id })
        .then(res => {
          // console.log("历史评分内容是----------", res.data);
          this.pop.oldMark = true;
          this.oldMarkTable.data = res.data.map(j => {
            return {
              ...j,
              rankTime: j.rankTime
                ? this.$moment(j.rankTime).format("YYYY-MM-DD HH:mm:ss")
                : ""
            };
          });
        })
        .catch(err => {});
    }
  },
  created() {
    //获取表头
    let { heard1, heard2 } = tableHeard;
    //   // console.log('tableHeard-----',heard1);
    if (this.tableType === 3) {
      this.table.columns = heard2;
    } else {
      this.table.columns = heard1;
    }
    //this.getTableData(); //获取列表
  },
  mounted() {
    if (this.enrollId === -1) {
      window.onNuxtReady(() => {
        this.getTableData(); //获取列表
      });
    } else {
      this.getTableData(); //获取列表
    }
  }
};
</script>

<style lang="scss" scoped>
.resize-table-th {
  position: relative;
}
.table-draggable-handle {
  /* width: 10px !important; */
  height: 100% !important;
  left: auto !important;
  right: -5px;
  cursor: col-resize;
  touch-action: none;
  border: none;
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

.table-data::-webkit-scrollbar {
  width: 0 !important;
}
</style>

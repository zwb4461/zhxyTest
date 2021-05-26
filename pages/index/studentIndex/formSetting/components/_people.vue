
<template>
  <div>
    <!-- 查询条件 -->
    <a-form-model style="margin-bottom:10px;" layout="inline" :model="table.select">
      <template v-if="peopleType===1">
        <a-form-model-item>
          <a-input size="small" v-model="table.select.name" placeholder="姓名"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input size="small" v-model="table.select.idno" placeholder="证件编号"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input size="small" v-model="table.select.carerphone" placeholder="监护人手机号"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-range-picker
            size="small"
            v-model="table.time"
            format="YYYY-MM-DD HH:mm"
            :placeholder="['报名起始日期', '报名截止日期']"
          />
        </a-form-model-item>
      </template>
      <template v-else-if="peopleType===2">
        <a-form-model-item>
          <a-input size="small" v-model="table.select.name" placeholder="姓名" style="width:120px"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input size="small" v-model="table.select.idno" placeholder="证件号码" style="width:170px"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            size="small"
            v-model="table.select.phone"
            placeholder="监护人手机号"
            style="width:120px"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-select
            size="small"
            class="select"
            style="width:220px"
            allowClear
            v-model="table.select.state"
            placeholder="状态"
          >
            <a-select-option v-for="item in select.state" :key="item.v">{{item.n}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-range-picker
            size="small"
            style="width:220px"
            v-model="table.time"
            :format="`YYYY-MM-DD`"
            :placeholder="['开始时间', '结束时间']"
          />
        </a-form-model-item>
      </template>
      <a-form-model-item>
        <a-button size="small" type="primary" @click="reloadTable">查询</a-button>
      </a-form-model-item>
    </a-form-model>

    <!-- 表格 -->
    <a-table
      class="table-data"
      size="small"
      bordered
      rowKey="id"
      :scroll="{x:1200, y: '60vh' }"
      :rowSelection="{ selectedRowKeys: table.selectedRowKeys, onChange: onSelectChange }"
      :columns="peopleType===1?table.columns:table.columns2"
      :dataSource="table.data"
      :pagination="table.pagination"
      @change="tableChange"
    >
      <template
        slot="idx"
        slot-scope="text,record,index"
      >{{table.pagination.current*table.pagination.pageSize-table.pagination.pageSize+index+1}}</template>

      <template slot="name" slot-scope="text,record">
        <span
          v-if="record.sex"
          :class="['sex',record.sex===1?'nan':'nv']"
        >{{record.sex===1?'男':'女'}}</span>
        {{text}}
        <span v-if="record.tag" class="type">{{record.tag}}</span>
      </template>
      <template slot="birthday" slot-scope="text">{{text?$moment(text).format("YYYY-MM-DD"):''}}</template>
      <template slot="idcardtype" slot-scope="text">{{getSelectName('idcardtype',text)}}</template>
      <template slot="rankShow" slot-scope="text">
        <template v-if="text">
          <a-rate style="font-size:20px" disabled :value="text" :count="4" />
          <span class="text">{{ desc[text - 1] }}</span>
        </template>
      </template>
      <!-- <template slot="address" slot-scope="text">{{text | address}}</template> -->
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
      </template>
      <template slot="rankInfo" slot-scope="text">{{mark.type==2?text:''}}</template>

      <template slot="state" slot-scope="text">
        <template v-for="(item, idx) in select.state">
          <template v-if="item.v===text">
            <a-tag :key="idx" :color="item.t">{{item.n}}</a-tag>
          </template>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
//接口
import reportStudent from "~/api/reportStudent";
import planStudent from "~/api/planStudent";

import examineSetting from "~/api/examineSetting";

//类型数据
import { foreigntype, nation, country, degree } from "~/utils/data";

export default {
  components: {},
  props: {
    getSendIds: Function, //获取发送短信的人员
    peopleType: {
      type: Function,
      default: 1
    }
    //获取发送短信的人员
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
        form: false,
        check: false
      },
      loading: {
        table: false,
        form: false,
        check: false
      },
      select: {
        houseType: [
          { text: "不动产权证书", v: "1" },
          { text: "房地产权证", v: "2" }
        ],
        special: ["唱歌", "跳舞", "音乐"],
        foreigntype,
        country,
        nation,
        degree,
        trueOrfalse: [
          { text: "是", v: true },
          { text: "否", v: false }
        ],
        idcardtype: [
          { text: "居民身份证", v: "1" },
          { text: "其它", v: "2" }
        ],
        state: [
          { n: "用户正常", v: 1, t: "#87d068" },
          //   { n: "手机号码不正确", v: 2, t: "" },
          { n: "姓名+手机号码重复", v: 2, t: "orange" },
          { n: "姓名+证件号码+手机号重复", v: 3, t: "red" },
          { n: "姓名+证件号码重复", v: 4, t: "purple" },
          { n: "姓名未填写", v: 5, t: "pink" },
          { n: "手机号未填写", v: 6, t: "cyan" }
        ]
      },
      table: {
        time: [],
        select: {
          name: undefined,
          idno: undefined,
          carerphone: undefined,
          signupstarttime: undefined,
          signupendtime: undefined,
          phone: undefined, //监护人手机号
          state: undefined, //状态
          importstarttime: undefined, //创建时间起
          importendtime: undefined //创建时间止
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
        columns: [
          {
            title: "序号",
            dataIndex: "idx",
            scopedSlots: { customRender: "idx" },
            width: 60
          },
          {
            title: "姓名",
            dataIndex: "name",
            width: 160,
            scopedSlots: { customRender: "name" }
          },
          {
            title: "出生日期",
            dataIndex: "birthday",
            width: 100,
            scopedSlots: { customRender: "birthday" }
          },
          {
            title: "证件类型",
            dataIndex: "idcardtype",
            width: 100,
            scopedSlots: { customRender: "idcardtype" }
          },
          {
            title: "证件编号",
            dataIndex: "idno",
            width: 165
          },
          {
            title: "监护人",
            dataIndex: "carer",
            width: 80
          },
          {
            title: "监护人手机号",
            dataIndex: "carerphone",
            width: 120
          }
        ],
        columns2: [
          {
            title: "序号",
            dataIndex: "idx",
            scopedSlots: { customRender: "idx" },
            width: 60
          },
          {
            title: "姓名",
            dataIndex: "name"
          },
          {
            title: "证件号码",
            dataIndex: "idno"
          },
          {
            title: "监护人手机号码",
            dataIndex: "phone"
          },
          {
            title: "状态",
            dataIndex: "state",
            scopedSlots: { customRender: "state" }
          },

          {
            title: "创建日期",
            dataIndex: "actiontime"
          }
        ],
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
      desc: ["D", "C", "B", "A"],
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
        this.table.select.importstarttime = this.$moment(nv[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.table.select.importendtime = this.$moment(nv[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        this.table.select.signupstarttime = "";
        this.table.select.signupendtime = "";
        this.table.select.importstarttime = "";
        this.table.select.importendtime = "";
      }
    }
  },
  methods: {
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
      let listPeople =
        this.peopleType === 1
          ? reportStudent.list({
              pagenum: this.table.pagination.current,
              pagesize: this.table.pagination.pageSize,
              enrollId: this.enrollId,
              ...this.table.select
            })
          : planStudent.list({
              pagenum: this.table.pagination.current,
              pagesize: this.table.pagination.pageSize,
              enrollId: this.enrollId,
              ...this.table.select
            });

      listPeople.then(res => {
        let rdata = res.data;
        // // console.log(rdata.list);
        this.table.data = rdata.list;
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
      // // console.log("selectedRowKeys changed: ", selectedRowKeys);
      // // console.log("selectedRows changed: ", selectedRows);
      this.table.selectedRowKeys = selectedRowKeys;
      this.table.selectedRows = selectedRows;

      this.getSendIds(selectedRowKeys);
    },
    //重载表格
    reloadTable() {
      this.table.pagination.current = 1;
      //   this.table.pagination.pageSize = pageSize;
      this.getTableData();
    }
  },
  created() {},
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

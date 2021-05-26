<template>
  <div>
    <div class="search">
      <el-date-picker
        class="inp"
        style="width: 400px"
        size="small"
        v-model="dataTime"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-input
        class="inp"
        style="width: 150px"
        size="small"
        v-model="name"
        placeholder="原授课人"
      ></el-input>
      <el-button
        size="small"
        icon="el-icon-setting"
        @click="search"
        type="primary"
        >查询</el-button
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
        <el-radio-group size="small" v-model="showDiaData.form.type">
          <el-radio-button :label="0" style="margin-right: 20px"
            >代课</el-radio-button
          >
          <el-radio-button :label="1">调课</el-radio-button>
        </el-radio-group>
      </div>
      <!-- 代课 -->
      <div class="dk" v-show="showDiaData.form.type == 0">
        <el-form label-width="80px">
          <el-form-item label="学期年级:">
            <el-cascader
              size="small"
              class="inp"
              :props="{ children: 'children', label: 'name', value: 'id' }"
              @focus="getXqNj"
              v-model="showDiaData.form.classId"
              :options="xqNjOpt"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="代课日期:">
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
          <el-form-item label="代课课次:">
            <el-select
              size="small"
              class="inp"
              v-model="showDiaData.form.stanza"
            >
              <el-option
                v-for="item in stanzaOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代课学科:">
            <el-select
              @focus="getOpt(1)"
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
          <el-form-item label="原授课人:">
            <el-select
              disabled
              @focus="getOpt(2)"
              size="small"
              class="inp"
              v-model="showDiaData.form.oldTeaname"
            >
              <el-option
                v-for="item in oldTeanameOpt"
                :key="item.id"
                :label="item.teacherName"
                :value="item.teacherName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="现授课人:">
            <el-select
              @focus="getOpt(3)"
              size="small"
              class="inp"
              v-model="showDiaData.form.teaname"
            >
              <el-option
                v-for="item in teanameOpt"
                :key="item.id"
                :label="item.teacherName"
                :value="item.teacherName"
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
          <!-- <el-form-item label="状态:">
            <el-select
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
        <el-form label-width="80px">
          <el-form-item label="学期年级:">
            <el-cascader
              size="small"
              class="inp"
              :props="{ children: 'children', label: 'name', value: 'id' }"
              @focus="getXqNj"
              v-model="showDiaData.form.classId"
              :options="xqNjOpt"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="调课日期:">
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
          <el-form-item label="调课课次:">
            <el-select
              size="small"
              class="inp"
              v-model="showDiaData.form.stanza"
            >
              <el-option
                v-for="item in stanzaOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调课学科:">
            <el-select
              @focus="getOpt(1)"
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
          <el-form-item label="原授课人:">
            <el-select
              @focus="getOpt(2)"
              size="small"
              class="inp"
              v-model="showDiaData.form.oldTeaname"
            >
              <el-option
                v-for="item in oldTeanameOpt"
                :key="item.id"
                :label="item.teacherName"
                :value="item.teacherName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="互调年级:">
            <el-cascader
              size="small"
              class="inp"
              :props="{ children: 'children', label: 'name', value: 'id' }"
              @focus="getXqNj"
              v-model="showDiaData.form.oldclassId"
              :options="xqNjOpt"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="互调日期:">
            <el-date-picker
              size="small"
              class="inp"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="showDiaData.form.olddate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            {{ zjHt }}
          </el-form-item>
          <el-form-item label="互调课次:">
            <el-select
              size="small"
              class="inp"
              v-model="showDiaData.form.oldStanza"
            >
              <el-option
                v-for="item in stanzaOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="互调学科:">
            <el-select
              @focus="getOpt(1)"
              size="small"
              class="inp"
              v-model="showDiaData.form.oldxkname"
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
              @focus="getOpt(3)"
              size="small"
              class="inp"
              v-model="showDiaData.form.teaname"
            >
              <el-option
                v-for="item in teanameOpt"
                :key="item.id"
                :label="item.teacherName"
                :value="item.teacherName"
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
  </div>
</template>

<script>
import main from "~/api/dtk";
import main1 from "~/api/scoreEntry";
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
    //用户id
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    userName() {
      return this.$store.state.auth.userInfo.name;
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
      // 分页相关
      pageNum: 1,
      totalDataNum: 0,
      pageSize: 20,
      //搜索字段
      name: "",
      dataTime: "",
      //
      tableData: [],
      xqNjOpt: [],
      teanameOpt: [],
      oldTeanameOpt: [],
      stanzaOpt: [
        { name: "第一节", id: 1 },
        { name: "第二节", id: 2 },
        { name: "第三节", id: 3 },
        { name: "第四节", id: 4 },
        { name: "第五节", id: 5 },
        { name: "第六节", id: 6 },
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
          oldTeaname: "",
          teaname: "",
          oldclassId: "",
          olddate: "",
          oldStanza: "",
          oldxkname: "",
        },
      },
    };
  },
  methods: {
    search() {},
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

    //提交新增和编辑
    submit() {
      let data = this.showDiaData.form;
      data.cjlbId = this.dtkId;
      data.status = undefined;
      if (this.showDiaData.formType == 1) {
        main
          .add(data)
          .then((res) => {
            this.getTable(this.pageNum, this.pageSize);
            this.clearForm();
            this.showDiaData.showDia = false;
            this.$message.success("提交成功!");
          })
          .catch((err) => {});
      } else if (this.showDiaData.formType == 2) {
        main
          .edit(data)
          .then((res) => {
            this.getTable(this.pageNum, this.pageSize);
            this.clearForm();
            this.showDiaData.showDia = false;
            this.$message.success("编辑成功!");
          })
          .catch((err) => {});
      }
    },
    getOpt(data) {
      if (data == 1) {
        //?代课学科opt
        let val = {
          classId: this.showDiaData.form.classId[2],
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
        //?原授课人opt
        let val = {
          classId: this.showDiaData.form.classId[2],
          type: 2,
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
          classId: this.showDiaData.form.classId[2],
          type: 3,
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.teanameOpt = res.data;
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
    getTable(pageNum, pageSize) {
      let val = {
        cjlbId: this.dtkId,
        pageNum: pageNum,
        pageSize: pageSize,
        unionid: this.unionid,
        isowner: 3,
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
      };
    },
    setFrom(row) {
      this.showDiaData.form = JSON.parse(JSON.stringify(row));
    },
    add() {
      this.showDiaData.formType = 1;
      this.clearForm();
      this.showDiaData.showDia = true;
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
          return "周一";
          break;
        case 2:
          return "周二";
        case 3:
          return "周三";
        case 4:
          return "周四";
        case 5:
          return "周五";
        case 6:
          return "周六";
        case 0:
          return "周日";
        default:
          return "";
      }
    },
  },
  created() {
    this.getTable(1, 20);
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
.inp {
  margin-right: 15px;
}
</style>
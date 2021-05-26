<template>
  <div>
    <div class="search"></div>
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
      <el-table-column prop="must" label="代课要求" align="center">
      </el-table-column>
      <el-table-column prop="reason" label="代课原因" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <a-button
            size="small"
            type="primary"
            style="background-color: #ff7100; border: 1px solid #ff7100"
            @click="apply(scope.row)"
            >申请</a-button
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
      title="自主代课"
      :visible.sync="showDiaData.showDia"
      width="30%"
      :close-on-click-modal="false"
    >
      <!-- <div class="dkOrTk">
        <el-radio-group size="small" v-model="showDiaData.form.type">
          <el-radio-button :label="0" style="margin-right: 20px"
            >代课</el-radio-button
          >
          <el-radio-button :label="1">调课</el-radio-button>
        </el-radio-group>
      </div> -->
      <!-- 代课 -->
      <div class="dk" v-show="showDiaData.form.type == 0">
        <el-form label-width="80px">
          <el-form-item label="学期年级:">
            <el-cascader
              disabled
              size="small"
              class="inp"
              :props="{ children: 'children', label: 'name', value: 'id' }"
              v-model="showDiaData.form.classId"
              :options="xqNjOpt"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="代课日期:">
            <el-date-picker
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
              size="small"
              class="inp"
              v-model="showDiaData.form.must"
            ></el-input>
          </el-form-item>
          <el-form-item label="代课原因:">
            <el-input
              disabled
              size="small"
              class="inp"
              v-model="showDiaData.form.reason"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select
              disabled
              size="small"
              class="inp"
              v-model="showDiaData.form.status"
            >
              <el-option
                v-for="item in statusOpt"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!-- 调课 -->
      <div class="dk" v-show="showDiaData.form.type == 1">
        <el-form label-width="80px">
          <el-form-item label="学期年级:">
            <el-cascader
              disabled
              size="small"
              class="inp"
              :props="{ children: 'children', label: 'name', value: 'id' }"
              v-model="showDiaData.form.classId"
              :options="xqNjOpt"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="调课日期:">
            <el-date-picker
              disabled
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
              disabled
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
              disabled
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
              disabled
              size="small"
              class="inp"
              :props="{ children: 'children', label: 'name', value: 'id' }"
              v-model="showDiaData.form.oldclassId"
              :options="xqNjOpt"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="互调日期:">
            <el-date-picker
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
              size="small"
              class="inp"
              v-model="showDiaData.form.reason"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select
              disabled
              size="small"
              class="inp"
              v-model="showDiaData.form.status"
            >
              <el-option
                v-for="item in statusOpt"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDiaData.showDia = false">取 消</el-button>
        <el-button type="primary" :disabled="canApply" @click="submitApply"
          >申请</el-button
        >
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
    name() {
      return this.$store.state.auth.userInfo.name;
    },
    schoolId() {
      return this.$store.state.auth.schoolId;
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
      canApply: false,
      // 分页相关
      pageNum: 1,
      totalDataNum: 0,
      pageSize: 20,
      //
      id: 0, //当前行id
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
        { name: "申请中", id: 0 },
        { name: "待审核", id: 1 },
        { name: "审核通过", id: 2 },
        { name: "审核未通过", id: 3 },
      ],
      showCsOptData: {
        showCsOpt: false,
      },
      kcTable: [],
      dkTable: [],
      //编辑删除dia
      showDiaData: {
        showDia: false,
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
    submitApply() {
      let val = {
        teaId: this.unionid,
        id: this.id,
      };
      main
        .edit(val)
        .then((res) => {
          this.$message.success("申请成功!");
          this.getTable(1, 20);
          this.showDiaData.showDia = false;
        })
        .catch((err) => {});
    },
    apply(row) {
      let data = new Date(row.date).getDay();
      let zjz = this.getZj(data);
      this.canApply = false;
      let val = {
        schoolId: this.schoolId,
        stanz: row.stanza,
        unionid: this.unionid,
        weekName: zjz,
        type: 4,
      };
      main
        .selectTakeStanza(val)
        .then((res) => {
          if (res.data.length > 0) {
            this.canApply = true;
          } else {
            this.showDiaData.form.teaname = this.name;
          }
        })
        .catch((err) => {});
      this.id = row.id;
      this.getXqNj();
      this.setFrom(row);
      this.showDiaData.showDia = true;
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
    //dia-点击下拉-获取学期三级菜单
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
        isowner: 2,
      };
      main
        .find(val)
        .then((res) => {
          console.log(res.data.list, "---------11111");
          this.tableData = res.data.list;
          this.totalDataNum = res.data.total;
        })
        .catch((err) => {});
    },

    setFrom(row) {
      this.showDiaData.form = row;
    },

    edit(row) {
      console.log(row);
      this.getXqNj();
      this.setFrom(row);
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
        })
        .catch((err) => {});
    },
    //获取日期是周几
    getZj(data) {
      switch (data) {
        case 1:
          return "星期一";
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
/deep/.el-input.is-disabled .el-input__inner {
  color: #000000;
}
</style>
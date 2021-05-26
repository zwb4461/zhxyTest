<template>
  <div>
    <div class="search">
      <el-cascader
        class="inp"
        style="width: 300px"
        size="small"
        v-model="search.classId"
        :options="opt.classOpt"
        clearable
        :props="{ label: 'name', value: 'id' }"
        @change="changeTree"
      ></el-cascader>
      <el-input
        class="inp"
        size="small"
        v-model="search.name"
        placeholder="姓名"
      ></el-input>
      <el-button size="small" type="primary" @click="searchData"
        >查询</el-button
      >
      <el-button size="small">批量导入后查询</el-button>
      <el-button size="small" type="primary" @click="exportExcel"
        >导出数据</el-button
      >
    </div>
    <el-table
      id="out-table"
      v-loading="loading"
      element-loading-text="数据加载中...请稍后"
      border
      size="large"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column prop="className" label="班级"> </el-table-column>
      <el-table-column prop="xh" label="学号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="ksName" label="考试"> </el-table-column>
      <el-table-column
        :label="item"
        v-for="(item, index) in tableDataCol"
        :key="index"
      >
        <template slot-scope="scope">
          <div>
            {{ scope.row.dedis[index] }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import main from "~/api/cjdsz";
import main1 from "~/api/jcManage";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  props: {
    cjlbId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
  },
  data() {
    return {
      loading: false,
      tableData: [],
      tableDataCol: [],
      opt: {
        classOpt: [],
      },
      search: {
        classId: [],
        name: "",
      },
    };
  },
  methods: {
    //!导出
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
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
          "成绩查询.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    //!查询
    searchData() {
      this.loading = true;
      let val = {
        schoolId: this.schoolId,
        cjlbId: this.cjlbId,
        name: this.search.name,
        classId: this.search.classId[2],
        djxq: this.search.classId[0] ? this.search.classId[0] : 1,
      };
      main
        .finalSeeScore(val)
        .then((res) => {
          this.loading = false;
          console.log(res.data, "成绩查询");
          this.tableData = res.data.data;
          this.tableDataCol = res.data.data2;
        })
        .catch((err) => {});
    },
    changeTree(val) {
      console.log(val);
    },
    //!获取三级菜单
    getTree() {
      let val = {
        schoolId: this.schoolId,
        twId: this.cjlbId,
        unionid: this.unionid,
      };
      main1
        .seeSanjiMeui(val)
        .then((res) => {
          console.log(res.data, "菜单......");
          this.opt.classOpt = res.data;
        })
        .catch((err) => {});
    },
    //!获取数据
    getTable() {
      this.loading = true;
      let val = {
        schoolId: this.schoolId,
        cjlbId: this.cjlbId,
        djxq: 1,
      };
      main
        .finalSeeScore(val)
        .then((res) => {
          this.loading = false;
          console.log(res.data, "成绩查询");
          this.tableData = res.data.data;
          this.tableDataCol = res.data.data2;
        })
        .catch((err) => {});
    },
  },
  created() {
    // this.getTable();
    this.getTree();
  },
};
</script>

<style scoped>
.search {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.inp {
  width: 180px;
  margin-right: 15px;
}
.searchBtn {
  margin-right: 15px;
}
</style>
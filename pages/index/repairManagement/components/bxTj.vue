<template>
  <div>
    <div class="search">
      <el-select
        size="small"
        v-model="search.djxq"
        placeholder="学期"
        class="inp"
        clearable
      >
        <el-option
          v-for="item in xqlOpt"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-select
        size="small"
        v-model="search.maxCate"
        placeholder="报修大类"
        class="inp"
        clearable
        @change="changeBxxlOpt"
      >
        <el-option
          v-for="item in bxdlOpt"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <el-select
        clearable
        size="small"
        v-model="search.minCate"
        placeholder="报修子类"
        class="inp"
      >
        <el-option
          v-for="item in bxzlOpt"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
    </div>
    <div class="search">
      <el-date-picker
        class="inp"
        style="width: 365px"
        size="small"
        v-model="search.xfTime"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="发起开始日期"
        end-placeholder="发起结束日期"
      >
      </el-date-picker>
      <el-select
        clearable
        size="small"
        v-model="search.address"
        placeholder="报修地点"
        class="inp"
      >
        <el-option
          v-for="item in addressOpt"
          :key="item.id"
          :label="item.address"
          :value="item.address"
        >
        </el-option>
      </el-select>

      <el-input
        size="small"
        class="inp"
        v-model="search.bxTeaname"
        placeholder="报修人"
      ></el-input>
      <el-select
        clearable
        size="small"
        v-model="search.status"
        placeholder="报修状态"
        class="inp"
      >
        <el-option
          v-for="item in statusOpt"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button size="small" type="primary" @click="searchTj">查询</el-button>
      <el-button size="small" style="margin-right: 15px" @click="outTj"
        >数据导出</el-button
      >
    </div>
    <div class="contain">
      <div class="left">
        <el-table
          :header-cell-style="{ 'text-align': 'center' }"
          size="small"
          :data="tableData_left"
          style="width: 100%"
          row-key="id"
          border
          id="out-tj"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="name" label="报修分类"> </el-table-column>
          <el-table-column prop="dcl" label="待处理" align="center">
            <template slot-scope="scope">
              <div style="font-size: 18px; color: #ff5151">
                {{ scope.row.dcl }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="clz" label="处理中" align="center">
            <template slot-scope="scope">
              <div style="font-size: 18px; color: #c4c400">
                {{ scope.row.clz }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ycl" label="已处理" align="center">
            <template slot-scope="scope">
              <div style="font-size: 18px; color: #73bf00">
                {{ scope.row.ycl }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="right">
        <el-table
          :header-cell-style="{ 'text-align': 'center' }"
          size="small"
          :data="tableData_right"
          style="width: 100%"
          border
        >
          <el-table-column prop="name" label="配件"> </el-table-column>
          <el-table-column prop="sum" label="数量"> </el-table-column>
          <el-table-column prop="dw" label="单位"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import main from "~/api/baoxiuCs";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  computed: {
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  data() {
    return {
      tableData_left: [],

      
      tableData_right: [],
      xqlOpt: [
        {
          name: "第一学期",
          id: 1,
        },
        {
          name: "第二学期",
          id: 2,
        },
      ],
      bxdlOpt: [],
      bxzlOpt: [],
      statusOpt: [
        {
          name: "待处理",
          id: 0,
        },
        {
          name: "处理中",
          id: 1,
        },
        {
          name: "已处理",
          id: 2,
        },
      ],
      addressOpt: [],
      search: {
        djxq: "",
        maxCate: "",
        minCate: "",
        dataTime: "",
        address: "",
        bxTeaname: "",
        status: "",
      },
    };
  },
  methods: {
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
    searchTj() {
      let val = this.search;
      val.schoolId = this.schoolId;
      main
        .repairTj(val)
        .then((res) => {
          console.log(res.data, "res.data");
          this.tableData_left = res.data;
          this.tableData_right = res.data2;
        })
        .catch((err) => {});
    },
    changeBxxlOpt(val) {
      this.search.minCate = "";
      this.bxdlOpt.map((item) => {
        if (item.name == val) {
          this.bxzlOpt = item.children;
        }
      });
    },
    getOpt() {
      main
        .findCs({})
        .then((res) => {
          this.addressOpt = res.data.setAddrs;
          this.bxdlOpt = res.data.setRepcates;
        })
        .catch((err) => {});
    },
    getTable() {
      console.log(this.schoolId, "this.schoolId11111");
      main
        .repairTj({ schoolId: this.schoolId })
        .then((res) => {
          console.log(res.data, "res.data");
          this.tableData_left = res.data;
          this.tableData_right = res.data2;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getTable();
    this.getOpt();
  },
};
</script>

<style scoped>
.search {
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.inp {
  width: 180px;
  margin-right: 15px;
}
.contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.left {
  width: 49%;
}
.right {
  width: 49%;
}
</style>
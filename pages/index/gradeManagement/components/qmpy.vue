<template>
  <div>
    <el-dialog
      :visible.sync="showQmpyDia"
      width="50%"
      :close-on-click-modal="false"
      :before-close="closeQmpyDia"
    >
      <div slot="title">
        <p style="font-size: 20px; color: #323232">期末评语</p>
        <el-divider></el-divider>
      </div>
      <div class="diaContain">
        <div class="text">
          <el-input
            type="textarea"
            :autosize="{ minRows: 20, maxRows: 40 }"
            placeholder="请输入评语"
            v-model="pyText"
            @blur="getPosition"
          >
          </el-input>
          <div
            style="display: flex; justify-content: flex-end; margin-top: 10px"
          >
            <el-button
              type="primary"
              size="mini"
              style="width: 80px"
              @click="submit"
              >保存</el-button
            >
          </div>
        </div>
        <div class="py">
          <div style="width: 100%; height: 60px">
            <span style="color: #298cf7; font-size: 20px">评语词库</span>
            <el-select
              v-model="nj"
              size="small"
              style="width: 120px; margin-left: 15px"
              placeholder="请选择年级"
              @change="changeNj"
            >
              <el-option
                v-for="item in njOpt"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <el-table
            :data="tableData"
            @cell-dblclick="clickTable"
            border
            style="width: 100%"
            size="large"
            :header-cell-style="{
              'text-align': 'center',
              background: '#f5f7fa',
            }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="评语词条">
              <template slot-scope="scope">
                <el-input
                  @blur="edit(scope.row)"
                  size="mini"
                  type="textarea"
                  autosize
                  style="width: 100%"
                  v-model="scope.row.name"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  circle
                  @click="del(scope.row)"
                ></el-button>
                <!-- <el-button size="mini" type="danger" @click="del(scope.row)"
                  >删除</el-button
                > -->
              </template>
            </el-table-column>
          </el-table>
          <el-button size="mini" style="width: 100%" v-show="nj" @click="addRow"
            >+</el-button
          >
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeQmpyDia" size="mini" style="width: 80px"
          >关闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import main from "~/api/scoreEntry";
import main1 from "~/api/examManage";
export default {
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
  },
  props: {
    commentRow: {
      type: Object,
      default: {},
    },
    getTable: {
      type: Function,
    },
    reloadQmpyTable: {
      type: Function,
    },
  },
  data() {
    return {
      showQmpyDia: false,
      pyText: "", //输入的评语内容
      nj: "", //下拉框年级的绑定值
      njOpt: ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"], //年级下拉框选项
      tableData: [], //表格数据
      position: 0, //评语插入的位置
    };
  },
  methods: {
    //删除数据
    del(record) {
      main
        .deleteComment({ id: record.id })
        .then((res) => {
          this.getPy();
          this.$message.success("删除评语成功!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //   字符串指定位置插入方法
    insertStr(soure, start, newStr) {
      console.log("soure", soure);
      if (soure == null) {
        return newStr;
      } else {
        return soure.slice(0, start) + newStr + soure.slice(start);
      }
    },
    //双击表格
    clickTable(row) {
      console.log("row", row.name);
      this.pyText = this.insertStr(this.pyText, this.position, row.name);
    },
    //   鼠标失焦获取光标位置
    getPosition(e) {
      console.log("e", e.srcElement.selectionStart);
      this.position = e.srcElement.selectionStart;
    },
    //   选择年级下拉框改变
    changeNj() {
      this.getPy();
    },
    //获取评语库
    getPy() {
      main
        .findPy({ schoolId: this.schoolId, grade: this.nj })
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {});
    },
    addRow() {
      this.tableData.push({});
    },
    edit(row) {
      console.log("row", row);
      if (row.id) {
        let val = {
          name: row.name,
          id: row.id,
          grade: this.nj,
          schoolId: this.schoolId,
        };
        main
          .updateComment(val)
          .then((res) => {
            this.getPy();
          })
          .catch((err) => {});
      } else {
        let val = {
          grade: this.nj,
          name: row.name,
          schoolId: this.schoolId,
        };
        main
          .insertComment(val)
          .then((res) => {
            this.getPy();
          })
          .catch((err) => {});
      }
    },
    //   提交
    submit() {
      console.log("this.commentRow", this.commentRow);
      //   let val = {
      //     id: this.commentRow.id,
      //     classId: this.commentRow.classId,
      //     comment: this.pyText,
      //     createUser: this.unionid,
      //   };
      this.commentRow.schoolId = this.schoolId;
      this.commentRow.comment = this.pyText;
      main1
        .saveFinalEvaluate(this.commentRow)
        .then((res) => {
          this.$message.success(res.data);
          this.clearOy();
          this.reloadQmpyTable();
          this.showQmpyDia = false;
        })
        .catch((err) => {
          this.$message.error(res.data);
        });
    },
    //回显评语
    showPy(py) {
      this.pyText = py;
    },
    //清除评语
    clearOy() {
      this.pyText = "";
      this.nj = "";
      this.position = 0;
      this.tableData = [];
    },
    //   关闭dia
    closeQmpyDia() {
      this.showQmpyDia = false;
      this.clearOy();
    },
  },
};
</script>

<style scoped>
.diaContain {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.text {
  width: 50%;
  min-height: 500px;
  padding: 20px 20px 0 20px;
  border-right: 1px solid #59a5f8;
}
.py {
  width: 50%;
  min-height: 500px;
  padding: 20px 20px 0 20px;
}
/deep/.el-divider--horizontal {
  margin: 0;
  background: #a2cdfc;
  border-top: 1px solid #a2cdfc;
  height: 2px;
}
</style>
<template>
  <div>
    <div class="contain">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="学期成绩名称:" label-width="100px">
          <el-input class="inp" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="对应学期:" label-width="100px">
          <el-select class="inp" v-model="form.term" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 接口api
import main from "~/api/termManage";

export default {
  props: {},
  data() {
    return {
      form: { name: "", term: "" },
      options: [],
    };
  },
  methods: {
    getTermList() {
      main
        .find({ schoolId: sessionStorage.getItem("schoolId") })
        .then((res) => {
          this.options = [];
          res.data.list.map((item) => {
            this.options.push({
              value: item.id,
              label: item.year,
            });
          });
        })
        .catch((err) => {});
    },
    // 回显表单内容
    setForm(item) {
      //   this.$refs.tableForm.form.name = item.name;
      this.form.name = item.name;
      this.form.term = item.xueqiId;
    },
  },
  created() {
    this.getTermList();
  },
};
</script>

<style scoped>
.contain {
  padding-left: 15px;
}
.inp {
  width: 300px;
}
/deep/ :focus {
  outline: 0;
}
</style>
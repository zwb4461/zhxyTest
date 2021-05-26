<template>
  <div>
    <!-- 顶部标签页 -->
    <el-tabs v-model="gradeClass" type="card">
      <el-tab-pane label="成绩分类" name="cjfl">
        <div class="contain">
          <!-- 列表 -->
          <div
            class="gradeClass_contain_list"
            v-for="(item, index) in gradeList"
            :key="index"
            @click="toGradeClass(item)"
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-bottom: 20px;
                cursor: pointer;
              "
            >
              <span style="font-size: 28px; color: #646464">{{
                item.name
              }}</span>
              <!-- <span style="font-size: 16px; color: #c8c8c8"
                >对应学期:{{ item.xueqiname }}</span
              > -->
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        v-for="(item, index) in tabList"
        :key="index"
        :label="item"
        :name="item"
        ><gradeClass
          :isLock="isLock"
          :xueqiId="xueqiId"
          :id="id"
          :njId="njId"
          :xq="form.djxq"
        ></gradeClass
      ></el-tab-pane>
    </el-tabs>
    <el-dialog
      :close-on-click-modal="false"
      title="登录"
      :visible.sync="showLogin"
      width="30%"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="账号:">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="学期:">
          <el-select v-model="form.djxq" placeholder="请选择">
            <el-option
              v-for="item in djxqOpt"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showLogin = false">取 消</el-button>
        <el-button type="primary" @click="login">登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import main from "~/api/addGradeClass";
import gradeClass from "./components/gradeClass";
export default {
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  components: { gradeClass },
  data() {
    return {
      form: {
        username: "",
        password: "",
        djxq: 1,
      },
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
      showLogin: false,
      xueqiId: 0,
      isLock: 0,
      tabList: [], //tab列表
      gradeList: [], //成绩类别列表
      gradeClass: "cjfl", //选中的tab名
      gradeClass1: "", //选中的tab名
      showAddClassDia: false, //控制显示添加成绩分类dia
      formType: 1, //1--新增,2--编辑
      id: 0, //当前编辑的id
      njId: 0,
    };
  },
  methods: {
    login() {
      let val = {
        cjlbId: this.id,
        djxq: this.form.djxq,
        username: this.form.username,
        password: this.form.password,
      };
      console.log(val, "val");
      main
        .loginScore(val)
        .then((res) => {
          if (res.code == 200) {
            this.showLogin = false;
            this.njId = res.data;
            this.$message.success("登入成功");
            if (!this.tabList.includes(this.gradeClass1)) {
              this.tabList.push(this.gradeClass1);
            }
            this.gradeClass = this.gradeClass1;
          }
        })
        .catch((err) => {
          this.$message.error("账号或密码错误！");
        });
    },
    //跳转特定类别tab
    toGradeClass(item) {
      this.form = {
        username: "",
        password: "",
        djxq: 1,
      };
      this.showLogin = true;
      this.id = item.id;
      this.isLock = item.isLock;
      this.xueqiId = item.xueqiId;
      this.gradeClass1 = item.name;
    },
    getGradeClass() {
      main
        .find({
          schoolId: this.schoolId,
        })
        .then((res) => {
          this.gradeList = res.data;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getGradeClass();
  },
};
</script>

<style scoped>
.contain {
  padding: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.gradeClass_contain {
  width: 300px;
  height: 200px;
  border: 1px solid #c8c8c8;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 30px;
  position: relative;
}
.gradeClass_contain_list {
  width: 300px;
  height: 200px;
  border: 1px solid #c8c8c8;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 20px;
  margin-bottom: 30px;
  position: relative;
}
.jia {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #c8c8c8;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #c8c8c8;
  margin-top: 10px;
}
.item_bottom_btn {
  border-top: 1px solid #e6e6e6;
  border-radius: 0 0 20px 20px;
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  background-color: #fafafa;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
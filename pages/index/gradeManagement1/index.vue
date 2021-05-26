<template>
  <div>
    <!-- 顶部标签页 -->
    <el-tabs v-model="gradeClass" type="card" @tab-click="handleClick">
      <el-tab-pane label="成绩分类" name="cjfl">
        <div class="contain">
          <!-- 创建分类contain -->

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
            <div class="item_bottom_btn">
              <img src="../../../assets/img/lock.svg" style="cursor: pointer" />
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        v-for="(item, index) in tabList"
        :key="index"
        :label="item"
        :name="item"
        ><gradeClass :id="id" :ifBzr="ifBzr"></gradeClass
      ></el-tab-pane>
    </el-tabs>
    <!-- 添加成绩分类dia -->
    <my-drawer-vue
      title="学期成绩"
      :width="500"
      :visible="showAddClassDia"
      :onOk="submit"
      @onClose="formClose"
    >
      <template slot="contentInfo">
        <addGradeClass ref="tableForm" />
      </template>
    </my-drawer-vue>
  </div>
</template>

<script>
import addGradeClass from "./components/addGradeClass";
import myDrawerVue from "~/components/common/myDrawer.vue";
import main from "~/api/addGradeClass";

import gradeClass from "./gradeClass";
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
  components: {
    addGradeClass,
    myDrawerVue,
    gradeClass,
  },
  data() {
    return {
      tabList: [], //tab列表
      gradeList: [], //成绩类别列表
      gradeClass: "cjfl", //选中的tab名
      showAddClassDia: false, //控制显示添加成绩分类dia
      formType: 1, //1--新增,2--编辑
      id: 0, //当前编辑的id
      ifBzr: 0, //0不是--1是班主任
    };
  },
  methods: {
    //跳转特定类别tab
    toGradeClass(item) {
      this.id = item.id;
      if (!this.tabList.includes(item.name)) {
        this.tabList.push(item.name);
      }
      this.gradeClass = item.name;
    },
    getGradeClass() {
      main
        .find({
          schoolId: this.schoolId,
          unionid: this.unionid,
        })
        .then((res) => {
          this.gradeList = res.data;
          this.ifBzr = res.data2; //0不是--1是班主任
        })
        .catch((err) => {});
    },
    //   切换tab
    handleClick(tab, event) {
      //   console.log(tab, event);
    },
    // 点击添加成绩分类
    addClass() {
      this.showAddClassDia = true;
      this.formType = 1;
    },
    //关闭添加分类的dia
    formClose() {
      this.showAddClassDia = false;
    },
    // 编辑
    edit(item) {
      this.showAddClassDia = true;
      this.formType = 2;
      this.id = item.id;
      console.log("item", item);
      setTimeout(() => {
        this.$refs.tableForm.setForm(item);
      }, 100);
    },

    // 删除
    del(item) {
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .del({ id: item.id })
            .then((res) => {
              console.log("res", res);
              this.$message.success(res.data);
              this.getGradeClass();
            })
            .catch((err) => {
              this.$message.error(err);
            });
        },
      });
    },
    // 提交
    submit() {
      if (this.formType == 1) {
        let val = {
          name: this.$refs.tableForm.form.name,
          xueqiId: this.$refs.tableForm.form.term,
          schoolId: this.schoolId,
        };
        console.log("val", val);
        main
          .add(val)
          .then((res) => {
            this.$message.success(res.data);
            this.showAddClassDia = false;
            this.getGradeClass();
          })
          .catch((err) => {
            this.$message.error(err);
            this.showAddClassDia = false;
          });
      } else if (this.formType == 2) {
        let val = {
          id: this.id,
          name: this.$refs.tableForm.form.name,
          xueqiId: this.$refs.tableForm.form.term,
          schoolId: this.schoolId,
        };
        main
          .edit(val)
          .then((res) => {
            this.$message.success(res.data);
            this.showAddClassDia = false;
            this.getGradeClass();
          })
          .catch((err) => {
            this.$message.error(err);
            this.showAddClassDia = false;
          });
      }
    },
  },
  created() {
    this.getGradeClass();
    console.log("schoolId", this.schoolId);
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
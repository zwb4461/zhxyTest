<template>
  <div>
    <!-- 顶部标签页 -->
    <el-tabs v-model="gradeClass" type="card">
      <el-tab-pane label="成绩分类" name="cjfl" :lazy="true">
        <div class="contain">
          <!-- 创建分类contain -->
          <!-- <div class="gradeClass_contain" @click="addClass">
            <div>
              <span style="font-size: 28px; color: #c8c8c8"
                >创建一个成绩类别</span
              >
            </div>
            <div class="jia"><span>+</span></div>
          </div> -->
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
            <div class="item_bottom_btn" v-show="item.isLock == 0">
              <!-- <img
                src="../../../assets/img/del.svg"
                style="cursor: pointer"
                @click.stop="del(item)"
              /> -->
              <img
                src="../../../assets/img/lock.svg"
                @click.stop="lock(item)"
                style="cursor: pointer"
              />
              <!-- <img
                src="../../../assets/img/edit.svg"
                style="cursor: pointer"
                @click.stop="edit(item)"
              /> -->
            </div>
            <div class="item_bottom_btn" v-show="item.isLock == 1">
              <img
                src="../../../assets/img/delOn.svg"
                style="cursor: pointer"
              />
              <img
                src="../../../assets/img/lockOn.svg"
                style="cursor: pointer"
              />
              <img
                src="../../../assets/img/editOn.svg"
                style="cursor: pointer"
                @click.stop="edit(item)"
              />
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        v-for="(item, index) in tabList"
        :key="index"
        :label="item"
        :name="item"
        :lazy="true"
        ><gradeClass :isLock="isLock" :xueqiId="xueqiId" :id="id"></gradeClass
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
        <addGradeClass ref="tableForm" :isLock="isLock" />
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
  },
  components: {
    addGradeClass,
    myDrawerVue,
    gradeClass,
  },
  data() {
    return {
      xueqiId: 0,
      isLock: 0,
      tabList: [], //tab列表
      gradeList: [], //成绩类别列表
      gradeClass: "cjfl", //选中的tab名
      showAddClassDia: false, //控制显示添加成绩分类dia
      formType: 1, //1--新增,2--编辑
      id: 0, //当前编辑的id
    };
  },
  methods: {
    //跳转特定类别tab
    toGradeClass(item) {
      this.isLock = item.isLock;
      this.xueqiId = item.xueqiId;
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
        })
        .then((res) => {
          this.gradeList = res.data;
        })
        .catch((err) => {});
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
      this.isLock = item.isLock;
      console.log("1111", this.isLock);
      this.showAddClassDia = true;
      this.formType = 2;
      this.id = item.id;
      console.log("item", item);
      setTimeout(() => {
        this.$refs.tableForm.setForm(item);
      }, 100);
    },
    lock(item) {
      this.$confirm({
        title: "确定需要锁定吗?",
        content: "锁定后将不能修改，只可以查看了哦",
        cancelText: "取消",
        okText: "锁定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .edit({ id: item.id, isLock: 1 })
            .then((res) => {
              this.getGradeClass();
              this.$message.success(res.data);
            })
            .catch((err) => {});
        },
      });
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
        if (this.isLock == 0) {
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
        } else {
          this.showAddClassDia = false;
          this.getGradeClass();
        }
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
<template>
  <div>
    <!-- 顶部标签页 -->
    <el-tabs v-model="gradeClass" type="card">
      <el-tab-pane label="体卫分类" name="hjfl">
        <div class="contain">
          <!-- 列表 -->
          <div
            class="gradeClass_contain_list"
            v-for="(item, index) in jcList"
            :key="index"
            @click="toJcClass(item)"
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
            <div
              class="item_bottom_btn"
              v-show="item.locked == 0 || item.locked == null"
            >
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
            <div class="item_bottom_btn" v-show="item.locked == 1">
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
        ><twDetail :cjlbId="id" :djxq="form1.djxq"></twDetail
      ></el-tab-pane>
    </el-tabs>
    <my-drawer-vue
      title="体卫类别"
      :width="500"
      :visible="showAddClassDia"
      :onOk="submit"
      @onClose="formClose"
    >
      <template slot="contentInfo">
        <el-form ref="form" label-width="80px">
          <el-form-item label="类别名称:" label-width="100px">
            <el-input
              :disabled="locked == 1"
              class="inp"
              v-model="form.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="对应学期:" label-width="100px">
            <el-select
              :disabled="locked == 1"
              class="inp"
              v-model="form.term"
              placeholder="请选择"
            >
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
      </template>
    </my-drawer-vue>
    <el-dialog
      :close-on-click-modal="false"
      title="登录"
      :visible.sync="showLogin"
      width="30%"
    >
      <el-form label-width="80px">
        <el-form-item label="账号:">
          <el-input v-model="form1.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input type="password" v-model="form1.password"></el-input>
        </el-form-item>
        <el-form-item label="学期:">
          <el-select v-model="form1.djxq" placeholder="请选择">
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
//Api
import main from "~/api/termManage";
import main1 from "~/api/addGradeClass";
//组件
import myDrawerVue from "~/components/common/myDrawer.vue";
import twDetail from "./components/twClassDetail.vue";

export default {
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  components: {
    //弹出表单组件
    myDrawerVue,
    twDetail,
  },
  data() {
    return {
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
      form1: {
        username: "",
        password: "",
        djxq: "",
      },
      //当前活动的tab
      gradeClass: "hjfl",
      //控制表单的显示隐藏
      showAddClassDia: false,
      showLogin: false,
      //0--新增，1--编辑
      formType: 0,
      //体卫列表
      jcList: [],
      //tab列表
      tabList: [],
      //是否锁定。0--未锁定，1--锁定
      locked: 0,
      //表单字段
      form: {
        name: "",
        term: "",
      },
      //表单中学期的选项列表
      options: [],
      //当前类别的id
      id: 0,
      gradeClass1: "",
    };
  },
  methods: {
    //!登录
    login() {
      let val = {
        cjlbId: this.id,
        djxq: this.form1.djxq,
        username: this.form1.username,
        password: this.form1.password,
        type: 1,
      };
      main1
        .loginScore(val)
        .then((res) => {
          if (res.code == 200) {
            this.showLogin = false;
            this.$message.success("登录成功");
            if (!this.tabList.includes(this.gradeClass1)) {
              this.tabList.push(this.gradeClass1);
            }
            this.gradeClass = this.gradeClass1;
          }
        })
        .catch((err) => {
          this.$message.error("账号密码错误!");
        });
    },
    //!点击体卫分类跳转该分类
    toJcClass(item) {
      this.showLogin = true;
      this.locked = item.locked;
      this.id = item.id;
      this.gradeClass1 = item.name;
    },
    //!删除体卫分类
    del(item) {
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main1
            .del({ id: item.id })
            .then((res) => {
              this.$message.success("删除该体卫分类成功!");
              this.getJcList();
            })
            .catch((err) => {
              this.$message.error(res.data);
            });
        },
      });
    },
    //!添加体卫分类
    addClass() {
      this.showAddClassDia = true;
      this.formType = 0;
    },
    //!编辑体卫分类
    edit(item) {
      this.showAddClassDia = true;
      this.formType = 1;
      //回显
      this.form.name = item.name;
      this.form.term = item.xueqiId;
      //赋值
      this.locked = item.locked ? item.locked : 0;
      this.id = item.id;
    },
    //!锁定体卫分类
    lock(item) {
      this.$confirm({
        title: "确定需要锁定吗?",
        content: "锁定后将不能修改，只可以查看了哦",
        cancelText: "取消",
        okText: "锁定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main1
            .add({ id: item.id, locked: 1 })
            .then((res) => {
              this.getJcList();
              this.$message.success(res.data);
            })
            .catch((err) => {});
        },
      });
    },

    //!获取体卫分类列表
    getJcList() {
      main1
        .find({ schoolId: this.schoolId })
        .then((res) => {
          this.jcList = res.data;
        })
        .catch((err) => {});
    },

    //!新增修改体卫分类
    submit() {
      if (this.formType == 0) {
        //   新增
        let val = {
          name: this.form.name,
          xueqiId: this.form.term,
          schoolId: this.schoolId,
        };
        main1
          .add(val)
          .then((res) => {
            this.$message.success(res.data);
            this.showAddClassDia = false;
            this.clearForm();
            this.getJcList();
          })
          .catch((err) => {
            this.$message.error(err);
            this.showAddClassDia = false;
            this.clearForm();
            this.getJcList();
          });
      } else {
        //编辑
        let val = {
          name: this.form.name,
          xueqiId: this.form.term,
          schoolId: this.schoolId,
          id: this.id,
        };
        if (this.locked == 0) {
          main1
            .add(val)
            .then((res) => {
              this.$message.success(res.data);
              this.showAddClassDia = false;
              this.clearForm();
              this.getJcList();
            })
            .catch((err) => {
              this.$message.error(err);
              this.showAddClassDia = false;
              this.clearForm();
              this.getJcList();
            });
        } else if (this.locked == 1) {
          this.$message.error("已锁定,不可修改!");
          this.showAddClassDia = false;
        }
      }
    },
    //!关闭表单
    formClose() {
      this.showAddClassDia = false;
      this.clearForm();
    },
    //!清空表单
    clearForm() {
      this.form = {
        name: "",
        term: "",
      };
      this.locked = 0;
    },
    //!获取表单中学期列表
    getTermList() {
      main
        .find({ schoolId: this.schoolId })
        .then((res) => {
          this.options = [];
          res.data.list.map((item) => {
            if (item.islock !== 1) {
              this.options.push({
                value: item.id,
                label: item.year,
              });
            }
          });
        })
        .catch((err) => {});
    },
  },
  created() {
    //初始化表单中学期列表
    this.getTermList();
    //初始化体卫列表
    this.getJcList();
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
.inp {
  width: 300px;
}
.createOneClassify {
  font-size: 28px;
  color: #c8c8c8;
}
</style>
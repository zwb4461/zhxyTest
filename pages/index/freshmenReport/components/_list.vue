<template>
  <div class="box">
    <!-- <div
      v-if="typeof $power === 'function' ? $power('p-1-t-add') : true"
      @click="add()"
      class="card"
    >
      <a-card hoverable style="width: 300px" size="small">
        <div id="add">
          <div id="item">
            创建一个新生类别
            <br />
            <a-icon style="font-size:30px;" type="plus-circle" />
          </div>
        </div>
      </a-card>
    </div> -->
    <div class="card" v-for="(item, index) in this.list" :key="index" @click="toInfo(item)">
      <a-card hoverable style="width: 300px" size="small">
        <div class="card-title" slot="title">
          <a-icon type="team" />
          {{ item.studenttype }}
        </div>
        <template class="ant-card-actions" slot="actions">
          <span>
            {{
            item.createtime ? $moment(item.createtime).format("YYYY-MM-DD") : ""
            }}
          </span>
          <a-icon
            v-if="typeof $power === 'function' ? $power('p-1-t-del') : true"
            type="delete"
            @click.stop="del(item, index, studentTotal[index], imports[index])"
          />
          <a-icon
            v-if="typeof $power === 'function' ? $power('p-1-t-edit') : true"
            type="edit"
            @click.stop="edit(item)"
          />
        </template>
        <div class="content">
          <div>计划新生：{{ imports[index] }}人</div>
          <div>报名新生： {{ studentTotal[index] }}人</div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import main from "~/api/freshmenReport";

export default {
  name: "list", //列表组件
  props: {
    addPans: Function,
    showLoading: Function,
  },
  data() {
    return {
      list: [],
      studentTotal: [], //报名新生数量
      imports: [], //计划新生数量
    };
  },
  computed: {
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    enrollId() {
      return this.$store.state.auth.enrollId;
    },
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  watch: {},
  methods: {
    //添加表单
    add() {
      this.$pubSub.publish("isShowform", { type: 1 });
    },
    //修改
    edit(item) {
      // // console.log("点击了-----", item);
      this.$pubSub.publish("isShowform", { type: 2, data: item });
    },
    //删除
    del({ id }, idx, number, number2) {
      if (!number > 0 && !number2 > 0) {
        this.$confirm({
          title: "确认删除吗",
          cancelText: "不了",
          okText: "确定",
          okType: "danger",
          centered: true,
          onOk: () => {
            main
              .del({ id })
              .then((res) => {
                this.$message.success("删除成功");
                this.list.splice(idx, 1);
                //   this.getList();
              })
              .catch((err) => {
                this.$message.error(err);
              });
          },
        });
      } else {
        this.$message.error("该分类下还有人员,无法删除");
      }
    },
    //获取学生类别
    getList() {
      this.showLoading(true);
      main
        .list({ schoolId: this.schoolId })
        .then((res) => {
          let { enrollList, students, imports } = res.data;
          this.list = enrollList; //本校学生类别
          this.studentTotal = students; //学生总数数组
          this.imports = imports; //计划新生总数
          this.showLoading(false);
        })
        .catch((err) => {
          this.$message.error(err);
          this.showLoading(false);
        });
    },
    //跳转到该类别下的学生详情
    toInfo({ studenttype, id, isClose }) {
      // console.log("学生类型", studenttype);
      //   console.log("学生id", id);
      this.$store
        .dispatch("layout/changeStudentIndexTitle", studenttype)
        .then((res) => {
          //   this.$message.success("成功!");
          return this.$store.dispatch("auth/setEnrollId", id);
        })
        .then((res) => {
          // console.log("object");
          //   this.$router.push("/studentIndex");
          this.addPans({ studenttype, id, isClose });
        })
        .catch((err) => {
          this.$message.error("跳转失败!");
        });
    },
  },
  created() {
    //获取学校id
  },
  mounted() {
    if (this.schoolId === -1) {
      window.onNuxtReady(() => {
        this.getList(); //获取列表
      });
    } else {
      this.getList(); //获取列表
    }

    // this.getList();
    let time = this.$moment().format("YYYY-MM-DD");
    // // console.log(time);

    //#订阅消息----------
    //刷新列表
    this.$pubSub.subscribe("getList", (msg, data) => {
      this.getList();
    });
  },
};
</script>

<style lang="scss" scoped>
/deep/.ant-card {
  border-radius: 15px;
  .ant-card-actions {
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }
}

.card-title {
  text-align: center;
  font-size: 20px;
}
.content {
  position: relative;
  top: 10px;
  height: 100px;
  width: 260px;
  margin: 0 auto;
  font-size: 22px;
  text-align: left;
  text-indent: 2em;
}
.card {
  position: relative;
  float: left;
  margin: 10px;
  #add {
    height: 194px;
    text-align: center;
    font-size: 25px;
    #item {
      position: absolute;
      width: 100%;
      top: 65px;
      left: 5px;
    }
  }
}
</style>

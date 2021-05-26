<template>
  <div class="box">
    <!-- ------------------------------1.创建卡片（排课类别）--------------------------------- -->
    <!-- <div @click="add()" class="card">
      <a-card hoverable style="width: 300px" size="small">
        <div id="add">
          <div id="item">
            创建一个新的排课
            <br />
            <a-icon style="font-size:30px;" type="plus-circle" />
          </div>
        </div>
      </a-card>
    </div> -->
    <!-- ----------------------------------------2.卡片---------------------------------------- -->
    <div class="card" v-for="(item, index) in this.list" :key="index" @click="toInfo(item)">
      <a-card hoverable style="width: 300px;height:257px" size="small">
        <!-- ------------------------------------2.1卡片标题---------------------------------------- -->

        <div class="card-title" slot="title">
          <a-icon type="book" />
          {{ item.name }}
        </div>
        <!-- -----------------------------2.2卡片底部-----创建时间、编辑、删除 ------------------------------->
        <template class="ant-card-actions" slot="actions">
          <span>
            {{
            item.createTime
            ? $moment(item.createtime).format("YYYY-MM-DD")
            : ""
            }}
          </span>
          <a-icon type="delete" @click.stop="del(item)" />
          <a-icon type="edit" @click.stop="edit(item)" />
        </template>
        <!-- -------------------------2.3卡片中部文字-------------------------------------- -->
        <div class="content">
          <div>
            总课时数:{{ item.weekId }}天*{{ item.dayCount }}节={{
            item.weekId * item.dayCount
            }}节
          </div>
          <a-divider />
          <div>
            每天节数:上午:{{ item.sxwcount0 }}节 下午:{{ item.sxwcount1 }}节
            晚上:{{ item.sxwcount2 }}节
          </div>
          <a-divider />
          <div>班数:{{ item.classCount }}</div>
          <a-divider />
          <div>课程数:{{ item.keshiCount }}</div>
          <a-divider />
          <div>老师总数:{{ item.teacherCount }}</div>
          <a-divider />
          <div>任课总数:{{ item.rekeCount }}</div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import main from "~/api/courseManagement";

export default {
  name: "list", //列表组件
  props: {
    addPans: Function,
    showLoading: Function,
  },
  data() {
    return {
      // 卡片列表list
      list: [
        // {
        //   name: "测试1",
        // },
        // {
        //   name: "测试2",
        // },
      ],
    };
  },
  computed: {
    //创建人id
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },

    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  methods: {
    toInfo(item) {
      console.log("item", item);
      this.addPans(item);
    },
    getPList() {
      main
        .seeCurriculumCount({ id: this.schoolId })
        .then((res) => {
          //   console.log("查询排课", res);
          this.list = res.data;
        })
        .catch((err) => {
          console.log("err1", err);
        });
    },
    //添加表单
    add() {
      this.$pubSub.publish("isShowform", { type: 1 });
    },
    //修改
    edit(item) {
      // console.log("点击了-----", item);
      this.$pubSub.publish("isShowform", { type: 2, data: item });
    },
    //删除
    del(item) {
      // console.log("item", item);
      this.$confirm({
        title: "确认删除吗",
        cancelText: "不了",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .deleteLeiBie({ id: item.id })
            .then((res) => {
              // console.log("删除成功", res);
              this.$message.success("删除成功");
              this.getPList();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },
  },
  created() {},
  mounted() {
    if (this.schoolId === -1) {
      window.onNuxtReady(() => {
        this.getPList(); //获取列表
      });
    } else {
      this.getPList(); //获取列表
    }

    this.$pubSub.subscribe("getPList", (msg) => {
      this.getPList();
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
  top: 5px;
  height: 135px;
  width: 260px;
  margin: 0 auto;
  font-size: 13px;
  text-align: left;
  text-indent: 2em;
}
.card {
  position: relative;
  float: left;
  margin: 10px;
  #add {
    height: 230px;
    text-align: center;
    font-size: 25px;
    #item {
      position: absolute;
      width: 100%;
      top: 80px;
      left: 5px;
    }
  }
}
/deep/.ant-divider-horizontal {
  margin: 0;
}
</style>

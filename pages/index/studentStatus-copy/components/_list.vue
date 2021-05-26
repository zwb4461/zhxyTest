<template>
  <a-spin size="large" tip="数据刷新中" :spinning="loading.spinning">
    <div class="box">
      <!-- @click="toInfo(item)" -->
      <div class="card" v-for="(item, index) in this.list" :key="index">
        <a-card
          hoverable
          style="width: 300px"
          @click="toInfo(item)"
          size="small"
        >
          <div class="card-title" slot="title">{{ item.studenttype }}</div>
          <!-- <template class="ant-card-actions" slot="actions">
            <span class="footer">
              <template
                v-if="item.finishtime"
              >分班时间：{{item.createtime?$moment(item.createtime).format("YYYY-MM-DD"):''}}</template>
              <template v-else>
                <span class="not-ok">待分班</span>
              </template>
            </span>
          </template>-->
          <div class="content">{{ intoperpson[index] }}</div>
        </a-card>
      </div>
    </div>
  </a-spin>
</template>

<script>
import main from "~/api/freshmenReport";

export default {
  name: "list", //列表组件
  props: {
    addPans: Function
  },
  data() {
    return {
      loading: {
        spinning: false
      },
      list: [],
      intoperpson: [],
      noperson: []
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
    }
  },
  watch: {},
  methods: {
    //获取学生类别
    getList(type = 1) {
      main
        .list({ schoolId: this.schoolId })
        .then(res => {
          let { enrollList, intoperpson, noperson } = res.data;
          this.list = enrollList.map(item => {
            return { ...item, loading: false };
          }); //本校学生类别

          this.intoperpson = intoperpson; //已分班学生数量
          this.noperson = noperson; //未分班学生数量
          //   for (const item of this.list) {
          //     if (item.deptclass) {
          //       item.deptclass = item.deptclass.split(",").map(i => i.trim());
          //     } else {
          //       item.deptclass = [];
          //     }
          //   }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //跳转到该类别下的学生详情
    toInfo({ studenttype, id }) {
      this.addPans({ studenttype, id });
    }
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
    let time = this.$moment().format("YYYY-MM-DD");
    // console.log(time);
    //#订阅消息----------
    //刷新列表
    this.$pubSub.subscribe("getList", (msg, data) => {
      if (!data) {
        for (const j of this.list) {
          j.loading = true;
        }
      } else {
        for (const j of data) {
          this.list.find(i => i.id === j.key).loading = true;
        }
      }
      this.getList(2);
    });
  }
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
  height: 100px;
  font-size: 22px;
  text-align: center;
}
.footer {
  display: inline-block;
  width: 100%;
  text-align: left;
  text-indent: 1em;
  .not-ok {
    color: rgb(0, 132, 255);
  }
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
.box {
  min-height: 60vh;
}
</style>

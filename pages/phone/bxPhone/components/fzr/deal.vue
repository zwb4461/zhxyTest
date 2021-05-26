<template>
  <div class="contain">
    <div
      class="item_contain"
      v-for="(item, index) in tableData"
      :key="index"
      @click="toEdit(item)"
    >
      <div class="topTitleContain">
        <div class="topTitle">
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="img_text_contain">
        <div class="left_img">
          <img
            v-if="item.bxImg[0]"
            style="
              width: 80px;
              height: 80px;
              border-radius: 10px;
              border: 1px solid #bbbbbb;
            "
            :src="item.bxImg[0].url"
          />
          <img
            v-else
            src="../../../../../assets/img/noImg.jpg"
            style="
              width: 80px;
              height: 80px;
              border-radius: 10px;
              border: 1px solid #bbbbbb;
            "
          />
        </div>
        <div class="right_text">
          <span
            style="
              overflow: hidden;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              display: -webkit-box;
            "
            >{{ item.explaion }}</span
          >
        </div>
      </div>
      <div class="address_contain">
        <img
          src="../../../../../assets/img/address.svg"
          style="width: 24px; height: 24px"
        />
        <span style="color: #0165ff">{{ item.address }}</span>
      </div>
      <van-divider
        :style="{ margin: '3px 0', 'border-color': '#bbbbbb' }"
      ></van-divider>
      <div class="bottom_contain">
        <span>报修教师:{{ item.bxTeaname }}</span>
        <span>{{ item.bxTime }}</span>
      </div>
      <div class="bottom_contain">
        <span>处理教师:{{ item.clTeaname }}</span>
        <el-tag
          size="small"
          type="danger"
          effect="dark"
          class="tags"
          style="background-color: #ff7100"
          v-if="item.status == 0"
        >
          待处理
        </el-tag>
        <el-tag size="small" effect="dark" class="tags" v-if="item.status == 1">
          处理中
        </el-tag>
        <el-tag
          size="small"
          type="success"
          effect="dark"
          class="tags"
          v-if="item.status == 2"
        >
          已处理（{{ item.history }}）
        </el-tag>
      </div>
    </div>
    <!-- <div
      class="item_contain"
      v-for="(item, index) in tableData"
      :key="index"
      @click="toEdit(item)"
    >
      <div class="time_contain">
        <span>{{ item.bxTime }}</span>
      </div>
      <div class="lei_contain">
        <span>{{ item.name }}</span>
      </div>
      <div class="address_contain">
        <img
          src="../../../../../assets/img/address.svg"
          style="width: 24px; height: 24px"
        />
        <span>{{ item.address }}</span>
      </div>
      <div class="teacher_contain">
        <span>报修教师:{{ item.bxTeaname }}</span>
        <span>处理教师:{{ item.clTeaname }}</span>
      </div>
    </div> -->
  </div>
</template>

<script>
import main from "~/api/baoxiu";
export default {
  head() {
    return {
      title: "报修管理",
      meta: [],
    };
  },
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    userName() {
      return this.$store.state.auth.userInfo.name;
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
  },
  props: {
    status: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    //!跳转编辑-负责人
    toEdit(item) {
      this.$router.push({
        path: "/Phone/bxPhone/components/fzr/dealEdit",
        query: {
          data: item,
        },
      });
    },
    getTable() {
      let val = {
        status: this.status,
        unionid: this.unionid,
        schoolId: this.schoolId,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.records;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getTable();
  },
};
</script>

<style lang="scss" scoped>
.topTitleContain {
  width: 100%;
  min-height: 30px;
  padding: 10px;
}
.topTitle {
  width: 100%;
  height: 100%;
  background-color: #0064ff;
  color: #f5f5f5;
  border-radius: 15px;
  text-align: center;
  font-size: 23px;
}
.img_text_contain {
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.left_img {
  width: 28%;
  height: 80px;
}
.right_text {
  width: 68%;
  height: 80px;
}
.contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}
.item_contain {
  width: 90%;
  min-height: 130px;
  border-radius: 10px;
  border: 1px solid #dbdbdb;
  background-color: #f5f5f5;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19);
  display: inline-block;
  vertical-align: top;
  margin-bottom: 20px;
}
.time_contain {
  width: 100%;
  height: 30px;
  padding-left: 15px;
  display: flex;
  align-items: center;
}
.lei_contain {
  width: 100%;
  height: 35px;
  padding-left: 15px;
  font-size: 20px;
}
.address_contain {
  width: 100%;
  height: 30px;
  padding-left: 15px;
  font-size: 18px;
}
.teacher_contain {
  width: 50%;
  min-height: 35px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
}
.rightInfo {
  width: 50%;
  min-height: 35px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
}
.bottom_contain {
  width: 100%;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 8px;
}
.tags {
  min-width: 100px;
  height: 30px;
  border-radius: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

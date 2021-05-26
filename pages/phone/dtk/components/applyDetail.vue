<template>
  <div>
    <div class="topTitle">
      <span class="one">自主代课</span>
      <span>2020/2021学年 第二学期</span>
    </div>
    <van-cell-group>
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 17px">学期年级:</span>
      </div>
      <div class="inp_contain">
        <div class="inp_contain_inner">
          <van-field
            readonly
            clickable
            :value="infoList.className"
            placeholder="学期年级"
          />
        </div>
      </div>
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 17px">代课日期:</span>
      </div>
      <div class="inp_contain">
        <div class="inp_contain_inner">
          <van-field
            readonly
            clickable
            :value="infoList.date"
            placeholder="代课日期"
          />
        </div>
      </div>
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 17px">代课课次:</span>
      </div>
      <div class="inp_contain">
        <div class="inp_contain_inner">
          <van-field
            readonly
            clickable
            :value="infoList.stanza"
            placeholder="代课课次"
          />
        </div>
      </div>
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 17px">代课学科:</span>
      </div>
      <div class="inp_contain">
        <div class="inp_contain_inner">
          <van-field
            readonly
            clickable
            :value="infoList.xkname"
            placeholder="代课学科"
          />
        </div>
      </div>
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 17px">原授课人:</span>
      </div>
      <div class="inp_contain">
        <div class="inp_contain_inner">
          <van-field
            readonly
            clickable
            :value="infoList.oldTeaname"
            placeholder="原授课人"
          />
        </div>
      </div>
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 17px">现授课人:</span>
      </div>
      <div class="inp_contain">
        <div class="inp_contain_inner">
          <van-field
            readonly
            clickable
            :value="infoList.teaname"
            placeholder="现授课人"
          />
        </div>
      </div>
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 17px">授课要求:</span>
      </div>
      <div class="inp_contain">
        <div class="inp_contain_inner">
          <van-field
            readonly
            clickable
            :value="infoList.must"
            placeholder="授课要求"
          />
        </div>
      </div>
      <div class="moni"></div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 17px">代课原因:</span>
      </div>
      <div class="inp_contain">
        <div class="inp_contain_inner">
          <van-field
            readonly
            clickable
            :value="infoList.reason"
            placeholder="代课原因"
          />
        </div>
      </div>
      <div class="moni"></div>
    </van-cell-group>
    <div
      class="topBtn"
      style="
        position: sticky;
        bottom: 0;
        background-color: #ffffff;
        padding: 15px 10px;
      "
    >
      <van-button style="width: 45%" @click="back">取消</van-button>
      <!-- :disabled="canApply" -->
      <van-button type="warning" style="width: 45%" @click="submit"
        >申请</van-button
      >
    </div>
  </div>
</template>

<script>
import main from "~/api/dtk";
import main1 from "~/api/scoreEntry";
import { Toast } from "vant";
export default {
  props: {
    infoList: {
      type: Object,
      default: {},
    },
  },
  computed: {
    //用户id
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    userName() {
      return this.$store.state.auth.userInfo.name;
    },
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  watch: {
    schoolId(val) {
      this.check();
    },
  },
  data() {
    return {
      canApply: true,
    };
  },
  methods: {
    //!是否合理效验
    ifHl(res, data) {
      switch (res) {
        case 1:
          Toast.fail(data + "不合理");
          break;
        case 2:
          Toast.fail(data + "冲突");
          break;
      }
    },

    //!调接口获取是否合理
    getHl(val, status, myData) {
      myData.schoolId = this.schoolId;
      myData.ckzt = status;
      console.log(myData, "myData");
      //   this.form.oldTeaId = this.unionid;
      main
        .takeHl(myData)
        .then((res) => {
          console.log(res.data, "是否冲突");
          this.ifHl(res.data, val);
        })
        .catch((err) => {});
    },
    submit() {
      let val = {
        teaId: this.unionid,
        id: this.infoList.id,
      };
      main
        .edit(val)
        .then((res) => {
          Toast.success("申请成功!");
          this.$parent.getXq();
          this.$parent.show();
        })
        .catch((err) => {
          Toast.fail("申请成功!");
        });
    },
    back() {
      //   this.$router.back(-1);
      this.$parent.show();
    },
    //!获取日期是周几
    getZj(data) {
      switch (data) {
        case 1:
          return "星期一";
        case 2:
          return "星期二";
        case 3:
          return "星期三";
        case 4:
          return "星期四";
        case 5:
          return "星期五";
        case 6:
          return "星期六";
        case 0:
          return "星期日";
        default:
          return "";
      }
    },
    check() {
      let data = new Date(this.infoList.date).getDay();
      let zjz = this.getZj(data);
      this.canApply = false;
      let val = {
        schoolId: this.schoolId,
        stanz: this.infoList.stanza,
        unionid: this.unionid,
        weekName: zjz,
        type: 4,
      };
      main
        .selectTakeStanza(val)
        .then((res) => {
          if (res.data.length > 0) {
            console.log(1);
            this.canApply = true;
          } else {
            console.log(2);
            this.infoList.teaname = this.userName;
          }
        })
        .catch((err) => {});
      //   this.id = data.id;
      //   this.getXqNj();
      //   this.setFrom(data);
      //   this.showDiaData.showDia = true;
    },
  },
  created() {
    // this.infoList = this.$route.query;
    console.log("this.infoList", this.infoList);
    // this.check();
  },
};
</script>

<style scoped>
.topBtn {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.topTitle {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.one {
  color: #0064ff;
  font-size: 18px;
  margin-bottom: 5px;
}
.inp_contain {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inp_contain_inner {
  width: 100%;
  margin: 10px;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
}
.moni {
  background-color: #ebedf0;
  width: 100%;
  height: 20px;
}
.font-bold {
  font-weight: bold;
  padding-top: 10px;
}
</style>
<template>
  <div class="contain">
    <el-card class="left">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        @node-click="clickTree"
        highlight-current
        accordion
      ></el-tree>
    </el-card>
    <div style="margin-left: 15px">
      <el-button v-if="cjd" type="primary" size="small" v-print="'#printTest'"
        >打印</el-button
      >
    </div>

    <div
      class="grade_contain"
      v-loading="loading"
      element-loading-text="数据加载中，请耐心等待"
      id="printTest"
    >
      <div class="right" v-for="(XkItem, index) in tableData" :key="index">
        <div
          class="info1"
          style="height: 100px; font-weight: none; font-size: 18px"
        >
          <span>{{ XkItem.title }}</span>
        </div>
        <div class="info11">
          <span>小 学 生 全 面 素 质 报 告 单</span>
        </div>
        <div class="info">
          <span>姓名：{{ XkItem.name }}</span>
          <span>性别：{{ XkItem.sex == 1 ? "男" : "女" }}</span>
          <span>班级：{{ XkItem.className }}</span>
          <span>学号：{{ XkItem.xh }}</span>
        </div>
        <div class="topTitle"><span>一、学科基础知识和能力</span></div>
        <div class="kaoshi_contain">
          <div
            class="kaoshi"
            :style="{ width: xkWid + '%', 'font-weight': 'bold' }"
            v-for="(item, index) in xkNum"
            :key="index"
          >
            <span>{{ XkItem.names[index] }}</span>
          </div>
          <div
            class="kaoshi"
            :style="{ width: xkWid + '%', 'font-weight': 'bold' }"
            v-for="(item, index) in xkNum"
            :key="index"
          >
            <span>{{ XkItem.names[index] }}</span>
          </div>
          <div
            class="kaoshi"
            :style="{ width: xkWid + '%', 'font-weight': 'bold' }"
            v-for="(item, index) in xkNum"
            :key="index"
          >
            <span>{{ XkItem.names[index] }}</span>
          </div>
        </div>
        <!-- 第三行 -->
        <div class="kaoshi_contain">
          <div
            class="kaoshi"
            :style="{ width: xkWid + '%', 'font-size': '12px' }"
            v-for="(item, index) in xkNum"
            :key="index"
          >
            <span v-if="XkItem.xkMap[0]">{{ XkItem.xkMap[0][index] }}</span>
          </div>
          <div
            class="kaoshi"
            :style="{ width: xkWid + '%', 'font-size': '12px' }"
            v-for="(item, index) in xkNum"
            :key="index"
          >
            <span v-if="XkItem.xkMap[4]">{{ XkItem.xkMap[4][index] }}</span>
          </div>
          <div
            class="kaoshi"
            :style="{ width: xkWid + '%', 'font-size': '12px' }"
            v-for="(item, index) in xkNum"
            :key="index"
          >
            <span v-if="XkItem.xkMap[8]">{{ XkItem.xkMap[8][index] }}</span>
          </div>
        </div>
        <div class="kaoshi_contain">
          <div
            class="kaoshi"
            :style="{ width: xkWid + '%', 'font-size': '12px' }"
            v-for="(item, index) in xkNum"
            :key="index"
          >
            <span v-if="XkItem.xkMap[1]">{{ XkItem.xkMap[1][index] }}</span>
          </div>
          <div
            class="kaoshi"
            :style="{ width: xkWid + '%', 'font-size': '12px' }"
            v-for="(item, index) in xkNum"
            :key="index"
          >
            <span v-if="XkItem.xkMap[5]">{{ XkItem.xkMap[5][index] }}</span>
          </div>
          <div
            class="kaoshi"
            :style="{ width: xkWid + '%', 'font-size': '12px' }"
            v-for="(item, index) in xkNum"
            :key="index"
          >
            <span v-if="XkItem.xkMap[9]">{{ XkItem.xkMap[9][index] }}</span>
          </div>
        </div>
        <div class="kaoshi_contain">
          <div
            class="kaoshi"
            :style="{ width: xkWid + '%', 'font-size': '12px' }"
            v-for="(item, index) in xkNum"
            :key="index"
          >
            <span v-if="XkItem.xkMap[2]">{{ XkItem.xkMap[2][index] }}</span>
          </div>
          <div
            class="kaoshi"
            :style="{ width: xkWid + '%', 'font-size': '12px' }"
            v-for="(item, index) in xkNum"
            :key="index"
          >
            <span v-if="XkItem.xkMap[6]">{{ XkItem.xkMap[6][index] }}</span>
          </div>
          <div
            class="kaoshi"
            :style="{ width: xkWid + '%', 'font-size': '12px' }"
            v-for="(item, index) in xkNum"
            :key="index"
          >
            <span v-if="XkItem.xkMap[10]">{{ XkItem.xkMap[10][index] }}</span>
          </div>
        </div>
        <div class="kaoshi_contain">
          <div
            class="kaoshi"
            :style="{ width: xkWid + '%', 'font-size': '12px' }"
            v-for="(item, index) in xkNum"
            :key="index"
          >
            <span v-if="XkItem.xkMap[3]">{{ XkItem.xkMap[3][index] }}</span>
          </div>
          <div
            class="kaoshi"
            :style="{ width: xkWid + '%', 'font-size': '12px' }"
            v-for="(item, index) in xkNum"
            :key="index"
          >
            <span v-if="XkItem.xkMap[7]">{{ XkItem.xkMap[7][index] }}</span>
          </div>
          <div
            class="kaoshi"
            :style="{ width: xkWid + '%', 'font-size': '12px' }"
            v-for="(item, index) in xkNum"
            :key="index"
          >
            <span v-if="XkItem.xkMap[11]">{{ XkItem.xkMap[11][index] }}</span>
          </div>
        </div>
        <div class="jccq">
          <div class="jcText" :style="{ width: xkWid + '%' }">
            <span>奖惩</span>
          </div>
          <div
            class="jc"
            :style="{
              width: 4 * xkWid + '%',
              'flex-direction': 'column',
              height: '105px',
            }"
          >
            <span v-for="(item, index) in XkItem.prizes" :key="index">
              {{ item.current }}
            </span>
          </div>
          <div class="jcText" :style="{ width: xkWid + '%' }">
            <span>出勤</span>
          </div>
          <div class="jcText1" :style="{ width: (100 - 6 * xkWid) / 2 + '%' }">
            <div class="one"><span>应出席（天）</span></div>
            <div class="two">
              <span>{{ XkItem.ycx }}</span>
            </div>
          </div>
          <div class="jcText1" :style="{ width: (100 - 6 * xkWid) / 2 + '%' }">
            <div class="one"><span>病事假（天）</span></div>
            <div class="two">
              <span>{{ XkItem.illness }}</span>
            </div>
          </div>
        </div>
        <div class="pdpy_contain">
          <div class="pdpy" :style="{ width: xkWid + '%' }">
            <span style="width: 15px">品德评语</span>
          </div>
          <div class="jc" :style="{ width: 100 - xkWid + '%' }">
            <span>{{ XkItem.comment }}</span>
          </div>
        </div>
        <div class="bottom">
          <div class="bottom_one">
            <span>二、课外兴趣、爱好和特长</span>
          </div>
          <div class="bottom_two">
            <span>三、身体形态、机能、素质</span>
          </div>
        </div>
        <div class="final">
          <div class="finalLeft">{{ XkItem.hobby }}</div>
          <div class="finalRight">
            <div class="finalRightTop">
              <div class="xb">
                <span>项别</span>
              </div>
              <div class="xb">
                <span>体重（千克）</span>
              </div>
              <div class="xb">
                <span>身高（厘米）</span>
              </div>
              <div class="xb11">
                <div class="slt1"><span>视力</span></div>
                <div class="slt">
                  <div class="slTop"><span>左</span></div>
                  <div class="slTop"><span>右</span></div>
                </div>
              </div>
            </div>
            <div class="finalRightBottom">
              <div class="ckz">
                <span>参考值</span>
              </div>
              <div class="ckz">
                <span v-if="XkItem.twszs">{{ XkItem.twszs[1].tz }}</span>
              </div>
              <div class="ckz">
                <span v-if="XkItem.twszs">{{ XkItem.twszs[1].sg }}</span>
              </div>
              <div class="ckz">
                <span v-if="XkItem.twszs">{{ XkItem.twszs[1].zsl }}</span>
              </div>
            </div>
            <div class="finalRightBottom">
              <div class="ckz">
                <span>数值</span>
              </div>
              <div class="ckz">
                <span v-if="XkItem.twszs">{{ XkItem.twszs[0].tz }}</span>
              </div>
              <div class="ckz">
                <span v-if="XkItem.twszs">{{ XkItem.twszs[0].sg }}</span>
              </div>
              <div class="ckz">
                <div class="slTop">
                  <span v-if="XkItem.twszs">{{ XkItem.twszs[0].zsl }}</span>
                </div>
                <div class="slTop">
                  <span v-if="XkItem.twszs">{{ XkItem.twszs[0].ysl }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="info2">
          <span>下学期报到时间:{{ XkItem.nextxsarrive2 }}</span>
        </div>
        <div class="info5">
          <span>校长： {{ XkItem.principal }}</span>
          <span>教导主任： {{ XkItem.director }}</span>
          <span>班主任： {{ XkItem.headmaster }}</span>
        </div>
        <div style="page-break-after: always"></div>
      </div>
    </div>
  </div>
</template>

<script>
import main from "~/api/cjdsz";
import main1 from "~/api/jcManage";

import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  props: {
    cjlbId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
  },
  data() {
    return {
      ifshow: true,
      loading: false,
      cjd: false,
      xkWid: "",
      treeData: [],
      tableData: {},
      xkNum: 0,
      gradeRowNum: 0,
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  methods: {
    getTree() {
      main1
        .seeSanjiMeui({ cjlbId: this.cjlbId, unionid: this.unionid })
        .then((res) => {
          this.treeData = res.data.map((item1) => {
            item1.children.map((item2) => {
              item2.children.map((item3) => {
                item3.children.map((item4) => {
                  item4.nameData = item4.name;
                  item4.name = item4.xh + "  " + item4.name;
                });
              });
            });
            return item1;
          });
          console.log(this.treeData, "this.treeData");
        })
        .catch((err) => {});
    },
    setGradeRowNum(val) {
      let chu = 0;
      let yu = 0;
      chu = parseInt(val / 3);
      yu = val % 3;
      if (yu > 0) {
        this.gradeRowNum = chu + 1;
      } else if (yu > 0) {
        this.gradeRowNum = chu;
      }
    },
    clickTree(data, Node) {
      if (Node.level == 4) {
        this.loading = true;
        let val = {
          cjlbId: this.cjlbId,
          schoolId: this.schoolId,
          name: Node.data.nameData,
          classId: Node.parent.data.id,
          djxq: Node.parent.parent.parent.data.id,
        };
        main
          .seeAchimodule(val)
          .then((res) => {
            this.loading = false;
            this.tableData = res.data;
            //学科div循环次数
            this.xkNum = res.data[0].names.length;
            //学科div宽度
            this.xkWid = 100 / res.data[0].names.length / 3;
            this.setGradeRowNum(res.data[0].xkMap.length);
            if (res.code == 200) {
              this.cjd = true;
            } else {
              this.cjd = false;
            }
          })
          .catch((err) => {});
      }
    },
  },
  created() {
    this.getTree();
  },
};
</script>

<style scoped>
.contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.left {
  width: 250px;
  height: 500px;
  border: 1px solid #eeeeee;
  overflow: auto;
}

.info5 {
  width: 85%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.info {
  width: 85%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.info2 {
  width: 85%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.info1 {
  width: 85%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
}
.info11 {
  width: 85%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
}
.topTitle {
  width: 85%;
  height: 50px;
  border: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.kaoshi_contain {
  width: 85%;
  height: 37px;
  border: 1px solid #000000;
  border-top: none;
  display: flex;
  flex-direction: row;
}
.kaoshi {
  height: 37px;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.jccq {
  height: 105px;
  width: 85%;
  border: 1px solid #000000;
  border-top: none;
  display: flex;
  flex-direction: row;
}
.jcText {
  height: 105px;
  border: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: none;
  border-left: none;
}
.jcText1 {
  height: 105px;
  border: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-top: none;
  border-left: none;
}
.jc {
  height: 155px;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.one {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.two {
  width: 100%;
  height: 65px;
  border-top: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pdpy_contain {
  height: 155px;
  width: 85%;
  border: 1px solid #000000;
  border-top: none;
  display: flex;
  flex-direction: row;
}
.pdpy {
  height: 155px;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom {
  height: 50px;
  width: 85%;
  border: 1px solid #000000;
  border-top: none;
  display: flex;
  flex-direction: row;
}
.bottom_one {
  height: 50px;
  width: 40%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom_two {
  height: 50px;
  width: 60%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.final {
  height: 200px;
  width: 85%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.finalLeft {
  height: 200px;
  width: 40%;
  border: 1px solid #000000;
  border-top: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.finalRight {
  height: 200px;
  width: 60%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  border-right: none;
  display: flex;
  flex-direction: column;
}
.finalRightTop {
  height: 100px;
  width: 100%;
  border: 1px solid #000000;
  border-top: none;
  border-bottom: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.xb {
  height: 100px;
  width: 25%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.xb11 {
  height: 100px;
  width: 25%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  border-right: none;
  display: flex;
  flex-direction: column;
}
.slt {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.slt1 {
  display: flex;
  justify-content: center;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  align-items: center;
  height: 50%;
}
.slTop {
  height: 50px;
  width: 100%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  border-bottom: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.finalRightBottom {
  height: 50px;
  width: 100%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  border-right: none;
  display: flex;
  flex-direction: row;
}
.ckz {
  height: 50px;
  width: 25%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.grade_contain {
  width: 100%;
  /* display: flex;
  flex-direction: column; */
}
.right {
  width: 100%;
  min-height: 500px;
  margin-left: 50px;
  margin-top: 20px;
}
.one {
  display: flex;
  flex-direction: column;
  height: 100px;
}
@media print {
  .printTest {
    page-break-after: always;
  }
}
</style>
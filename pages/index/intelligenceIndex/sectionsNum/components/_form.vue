<template>
  <div class="app_box">
    <div class="left">
      <div class="top">排课班级</div>
      <div class="btm">
        <template v-for="(list, index) in classNameList">
          <article :key="index" :class="list.isCheck ? 'yes' : 'no'">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
              list.className
            }}
          </article>
        </template>
      </div>
    </div>
    <div class="right">
      <div class="box">
        <div class="left">
          <img
            src="../../../../../assets/img/fas fa-chevron-circle-left.png"
            alt=""
            @click="reducedValue()"
          />
          <template v-for="(list, index) in campusList">
            <span v-if="num === index" :key="index"> {{ list }}</span>
          </template>

          <img
            src="../../../../../assets/img/fas fa-chevron-circle-right.png"
            alt=""
            @click="plus()"
          />
        </div>
        <div class="right">
          <el-button type="primary" size="mini" @click="preservation"
            >保存</el-button
          >
          <el-button size="mini" @click="notempty">清空</el-button>
        </div>
      </div>
      <div class="btm">
        <el-table
          class="table-box"
          border
          style="width: 100%"
          :data="daysList"
          ref="tablesRef"
          @cell-click="cellClick"
        >
          <el-table-column
            :prop="item"
            :label="item"
            v-for="(item, index) in segmentsList"
            :key="index"
          >
            <template slot-scope="scope">
              <div class="div_box_text">
                {{ segmentsList[scope.$index][index].segmentsVal }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="请选择排课类型"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <el-select v-model="valueType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="determines">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../../../../api/intelligenceIndex";
export default {
  components: {},
  props: {},
  data() {
    return {
      campusList: ["语文", "书徐"], // 课程
      num: 1,
      classNameList: ["一年级1班", "一年级二班"], //班级名称
      segmentsList: [], // 节数
      daysList: [], //星期几
      dialogVisible: false,
      valueType: "",
      options: [
        {
          value: 1,
          label: "一定排"
        },
        {
          value: 2,
          label: "尽量排"
        },
        {
          value: 3,
          label: "不排"
        }
      ]
    };
  },
  methods: {
    reducedValue() {
      if (this.num == 0) return;
      this.num--;
    },
    plus() {
      let a = this.campusList.length;
      if (this.num + 1 == a) return;
      this.num++;
    },
    preservation() {
      console.log("保存");
    },
    notempty() {
      console.log("清空");
    },
    cellClick(row, column) {
      console.log(row, column);
    },
    handleClose() {
      this.dialogVisible = false;
    },
    determines() {
      console.log("add");
    },
    databases(dataVal) {
      let data = dataVal.map(list => {
        list.segmentsVal = "";
        return list;
      });
      // 当前所有的天数名称(去重后的)
      let ke_nameAll = Array.from(
        new Set(
          data.map(item => {
            return item.weekName;
          })
        )
      );
      // 所有的节数(去重后的)
      let ke_classAll = Array.from(
        new Set(
          data.map(item => {
            return item.stanz;
          })
        )
      );
      // 当前所有的课程名称(去重后的)
      // this.campusList = Array.from(
      //   new Set(
      //     data.map(item => {
      //       return item.subjectName;
      //     })
      //   )
      // );

      // console.log(" this.campusList----", this.campusList);
      // 所有的年级(去重后的)
      // this.classNameList = Array.from(
      //   new Set(
      //     data.map(item => {
      //       return item.className;
      //     })
      //   )
      // );
      // console.log(" this.classNameList----", this.classNameList);

      // 按照去重后节数名称为表头、按照天数为行重构数据
      let alldatas = ke_classAll.map((item, index) => {
        let arr_nei = [];
        ke_nameAll.forEach((item_item, index_index) => {
          if (
            data.filter(
              item_fi => item_fi.stanz == item && item_fi.weekName == item_item
            )
          ) {
            arr_nei.push(
              data.filter(
                item_fi =>
                  item_fi.stanz == item && item_fi.weekName == item_item
              )[0]
            );
          } else {
            //处理0的情况
            arr_nei.push({
              classId: data.filter(item_fil => item_fil.stanz == item).classId,
              className: data.filter(item_fil => item_fil.className == item)
                .className,
              classweekId: data.filter(item_fil => item_fil.stanz == item)
                .classweekId,
              deleted: "",
              id: "",
              weekName: item_item,
              sumval: 0,
              teacherName: "",
              teacherUnionid: "",
              time: "",
              sort: "",
              type: "",
              position: "",
              sxw: "",
              subjectName: "",
              stanz: data.filter(item_fil => item_fil.stanz == item).stanz,
              segmentsVal: data.filter(item_fil => item_fil.stanz == item).stanz
            });
          }
        });
        return arr_nei;
      });
      this.segmentsList = alldatas.map((item_map, index_map) => {
        item_map.unshift({
          segmentsVal: ke_classAll[index_map]
        });
        item_map.map((list, index) => {
          if (item_map[index] === undefined) {
            console.log(item_map[index]);
            item_map.splice(index, 1);
          }
        });
        return item_map;
      });
      ke_nameAll.unshift("节数\\课期");
      this.daysList = ke_nameAll;

      console.log(" this.daysList-----", this.daysList);

      console.log(" this.segmentsList-----", this.segmentsList);
    },
    dataInit() {
      http
        .seeClassHour({ id: 31 })
        .then(res => {
          this.classNameList = res.data.classes;
          this.campusList = Array.from(new Set(res.data.subjects));
          this.databases(res.data.stanzas);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    this.dataInit();
  },
  beforeMount() {},
  mounted() {
    this.dataInit();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>

<style lang="scss" scoped>
.app_box {
  display: flex;
  // justify-content: space-between;
  align-items: flex-start;
  // padding: 9px 18px;
  box-sizing: border-box;
  // background-color: #ddd;
  margin-top: -40px;

  .right {
    width: 100%;
    height: 456px;
    overflow: hidden;
    // background-color: #fafafa;
    margin-left: 16px;

    .box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        width: 100px;
        display: flex;
        justify-content: space-between;

        img {
          width: 24px;
          height: 24px;
        }

        span {
          width: 32px;
          height: 18px;
          color: rgba(16, 16, 16, 1);
          font-size: 16px;
          text-align: left;
          font-family: 方正兰亭黑-标准;
        }
      }

      .right {
        width: 130px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        // button {
        //   width: 48px;
        //   height: 24px;
        //   border-radius: 4px;
        //   color: rgba(252, 252, 252, 1);
        //   font-size: 14px;
        //   text-align: center;
        //   font-family: Microsoft Yahei;
        //   border: 1px solid rgba(255, 255, 255, 0);
        // }
      }
    }
  }

  .left {
    width: 218px;
    height: 456px;
    overflow: hidden;
    background-color: #fafafa;

    .top {
      width: 218px;
      height: 30px;
      line-height: 30px;
      background-color: rgba(250, 250, 250, 1);
      color: rgba(100, 100, 100, 1);
      font-size: 14px;
      text-align: center;
      font-family: Microsoft Yahei;
    }
    .btm {
      height: 100%;
      width: 100%;

      article {
        width: 218px;
        height: 30px;
        line-height: 30px;
        color: rgba(100, 100, 100, 1);
        font-size: 14px;
        text-align: left;
        font-family: Microsoft Yahei;
        // border: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        cursor: pointer;

        &:nth-child(1) {
          border-top: 1px solid #ddd;
        }

        &.yes {
          background-color: #edf6ff;
        }

        &.no {
          background-color: rgba(250, 250, 250, 1);
        }
      }
    }
  }
}
</style>

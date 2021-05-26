<template>
  <div id="registration">
    <a-form-model
      :form="form"
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="报名总开关"
        ><a-switch
          v-model="tableData2.isOpen"
          checked-children="开启"
          un-checked-children="关闭"
          default-checked
        />
      </a-form-model-item>

      <section v-for="(list, index) in tableData" :key="index">
        <a-row :gutter="10">
          <a-col :span="8">
            <a-divider class="hr">{{ list.className }}</a-divider>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-model-item label="报名课数设置">
              <a-input
                v-model="list.nianji"
                addon-after="课"
                style="width: 100px"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-model-item
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 18 }"
              label="报名时间段"
            >
              <a-date-picker
                :showTime="{ format: 'YYYY-MM-DD' }"
                format="YYYY-MM-DD"
                v-model="list.startTime"
              />
              <el-time-picker
                style="margin-left: 15px"
                size="small"
                is-range
                v-model="list.endTime"
                range-separator="~"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                value-format="HH:mm"
                format="HH:mm"
              >
              </el-time-picker>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-model-item
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 18 }"
              label="允许报名课程"
            >
              <a-select
                mode="multiple"
                show-search
                option-filter-prop="children"
                style="width: 600px"
                :filter-option="filterOption"
                v-model="list.eleCouId"
              >
                <a-select-option
                  v-for="list in options"
                  :key="list.id"
                  :value="list.id"
                >
                  {{ list.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-model-item
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 18 }"
              label="观看报名情况"
            >
              <a-button
                size="small"
                @click="handleGuankan(list.className)"
                type="primary"
              >
                观看
              </a-button>
            </a-form-model-item>
          </a-col>
        </a-row>
      </section>
      <a-button class="baocun" type="primary" @click="onSubmit">
        保 存
      </a-button>
    </a-form-model>

    <a-drawer
      :title="a_drawer.title"
      :placement="a_drawer.placement"
      :closable="true"
      :maskClosable="false"
      :mask="false"
      width="400"
      :visible="a_drawer.visible"
      @close="onClose"
    >
      <div class="drawer_box">
        <div
          class="box_containrt"
          v-for="(list, index) in a_drawer.data"
          :key="index"
        >
          <div
            class="con_left"
            :class="
              list.colorId === 0 || list.colorId === 5
                ? 'one'
                : list.colorId === 1 || list.colorId === 6
                ? 'two'
                : list.colorId === 2 || list.colorId === 7
                ? 'therr'
                : list.colorId === 3 || list.colorId === 8
                ? 'four'
                : list.colorId === 4 || list.colorId === 9
                ? 'five'
                : ''
            "
          >
            <span>{{ list.name }}</span>
            <p>( {{ list.bmPerson + "/" + list.sum }} )</p>
          </div>
          <!-- <div class="con_right"></div> -->
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import http from "~/api/personalCenter";
import moment from "moment";
export default {
  components: {},
  props: {
    cjlbId: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      a_drawer: {
        visible: false,
        placement: "right",
        title: "",
        data: [],
      },
      form: {
        id: null,
        isOpen: null,
        startTime: null,
        endTime_val: null,
        eleCouId_val: [],
      },
      options: [],
      tableData: [],
      tableData2: [],
      dataForm: [
        { classId: "一年级2020级", classNum: "" },
        { classId: "二年级2019级", classNum: "" },
        { classId: "三年级2018级", classNum: "" },
        { classId: "四年级2017级", classNum: "" },
        { classId: "五年级2016级", classNum: "" },
        { classId: "六年级2015级", classNum: "" },
      ],
      moment: moment,
    };
  },
  methods: {
    handleGuankan(str) {
      this.a_drawer.visible = true;
      this.a_drawer.title = str + "——报名情况";

      http
        .teacherSeeCou({
          className: str,
          unionid: this.unionid,
          schoolId: this.schoolId,
          eleSchoolId: this.cjlbId,
        })
        .then((result) => {
          this.a_drawer.data = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onClose() {
      this.a_drawer.visible = false;
    },
    onSubmit() {
      let array = JSON.parse(JSON.stringify(this.tableData));
      array.forEach((element) => {
        element.startTime = this.moment(element.startTime).format("YYYY-MM-DD");
        element.endTime = element.endTime ? element.endTime.join(",") : null;
        element.eleCouId = JSON.stringify(element.eleCouId);
      });
      let array2 = JSON.parse(JSON.stringify(this.tableData2));
      array2.isOpen = array2.isOpen === true ? 1 : 0;

      let query = {
        categoryList: array,
        eleSchool: array2,
      };
      http
        .setEleSchool(query)
        .then((result) => {
          this.dataInit();
          this.$message.success(result.msg);
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    dataInit() {
      http
        .selectEleCou({ status: 2, eleSchoolId: this.cjlbId })
        .then((result) => {
          this.options = result.data.list;
        })
        .catch((err) => {
          console.log(err);
        });

      http
        .selectEleSchool({ eleSchoolId: this.cjlbId })
        .then((res) => {
          console.log(res, " res");
          let arr = res.data.categoryList;
          console.log(arr, " arr");
          let arr2 = res.data.eleSchool;
          console.log(arr2, " arr2");
          arr.forEach((element) => {
            element.startTime = this.moment(element.startTime);
            element.endTime = element.endTime ? element.endTime.split(",") : [];
            element.eleCouId = JSON.parse(element.eleCouId);
          });
          arr2.isOpen = arr2.isOpen === 1 ? true : false;

          this.tableData = arr;
          this.tableData2 = arr2;
          console.log(this.tableData, " this.tableData");
          console.log(this.tableData2, " this.tableData2");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  watch: {},
  beforeCreate() {},
  created() {
    this.dataInit();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped>
.drawer_box {
  overflow-y: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;

  .box_containrt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    .con_left {
      width: 150px;
      height: 150px;
      color: #fff;
      padding: 20px;
      box-sizing: border-box;

      &.one {
        background-color: #0096ff;
      }

      &.two {
        background-color: #ff8c00;
      }

      &.therr {
        background-color: #9800ff;
      }

      &.four {
        background-color: #0038ff;
      }

      &.five {
        background-color: #f00;
      }

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      span {
        text-align: center;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }

      p {
        margin-top: 15px;
      }
    }

    // .con_right {
    //   width: 150px;
    //   height: 150px;
    //   line-height: 150px;
    //   text-align: center;
    //   color: #000;
    //   border: 1px solid #ddd;
    // }
  }
}
.class_box {
  padding-left: 115px;
  width: 45%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  // .box_two {
  //   display: flex;
  //   justify-content: space-evenly;
  //   align-items: center;
  //   margin-bottom: 12px;

  //   span {
  //     overflow: hidden;
  //     text-overflow: ellipsis;
  //     white-space: nowrap;
  //     width: 100px;
  //   }

  //   input {
  //     width: 100px;
  //   }
  // }
}

.baocun {
  width: 120px;
  margin-left: 12%;
  margin-top: 25px;
}

.hr {
  margin-left: 12%;
  &::before {
    border-top: 1px solid #40b1ff;
  }

  &::after {
    border-top: 1px solid #40b1ff;
  }
}
</style>

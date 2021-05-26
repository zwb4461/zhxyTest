<template>
  <div>
    <a-modal
      :visible="visible"
      centered
      wrapClassName="box-bottom"
      :confirmLoading="loading"
      :maskClosable="false"
      :keyboard="false"
      @cancel="handleCancel"
    >
      <div
        :class="['myTitle', showType == 2 ? 'myheight2' : 'myheight1']"
        slot="title"
      >
        <span :class="['sex', info.sex === 1 ? 'nan' : 'nv']">{{
          info.sex === 1 ? "男" : "女"
        }}</span>
        <span>{{ info.name }}</span>
        <span class="age">{{ info.age }}岁</span>
        <span class="other">{{ info.birthday }}</span>
        <template v-if="showType == 2">
          <br />
        </template>
        <span class="other-phone">{{ info.idno }}</span>
      </div>

      <template v-if="markType === 0">
        <div class="stars">
          <a-radio-group size="large" v-model="data.rank" button-style="solid">
            <a-radio-button :value="6">A</a-radio-button>
            <a-radio-button :value="5">B</a-radio-button>
            <a-radio-button :value="4">C</a-radio-button>
            <a-radio-button :value="3">D</a-radio-button>
            <a-radio-button :value="2">E</a-radio-button>
            <!-- <a-radio-button :value="1">F</a-radio-button> -->
          </a-radio-group>
          <!-- <a-rate style="font-size:40px" :tooltips="desc" v-model="data.rank" :count="4" />
          <span class="text">{{ desc[data.rank - 1] }}</span>-->
        </div>
      </template>
      <template v-else-if="markType === 1">
        <a-form-item
          v-for="(item, index) in liststudentItems"
          :key="index"
          :label="item.item"
        >
          <a-row>
            <a-col :span="18">
              <a-slider v-model="item.branch" :max="modeItem[index].rank" />
            </a-col>
            <a-col :span="4" class="number">
              <!-- {{item.branch}} -->
              <a-input-number
                style="margin-left:10px;"
                v-model.number="item.branch"
              ></a-input-number>
            </a-col>
          </a-row>
        </a-form-item>
        <div class="total">等级:{{ rank }}</div>
      </template>

      <a-form-item label="备注">
        <a-textarea
          v-model="scoringRemark"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        ></a-textarea>
      </a-form-item>

      <div class="foot-btn" slot="footer">
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleOk">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
//接口
import main from "~/api/mark";

export default {
  props: {
    modeItem: {
      type: Array,
      default: []
    },
    scorings: {
      type: Array,
      default: []
    },
    markType: {
      type: Number,
      default: 0
    },
    reload: {
      type: Function
    },
    showType: {
      type: Number,
      default: 1
    }
    // //学生类型id
    // enrollId: {
    //   type: Number,
    //   default: -1
    // }
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
  watch: {
    liststudentItems: {
      handler(nv, ov) {
        // // console.log(nv);
        let val = 0;
        nv.forEach(item => {
          val += item.branch;
        });
        this.rank = this.getRan(val);
        // // console.log(this.rank);
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      visible: false,
      loading: false,
      desc: ["F", "E", "D", "C", "B", "A"],
      item: [],
      data: {
        rank: 0
      },
      form: {
        id: undefined,
        rank: undefined,
        rankUnionid: undefined
      },
      liststudentItems: [],
      rank: "", //分项评分的总分
      scoringRemark: "",
      info: {
        name: "",
        birthday: "",
        sex: "",
        idno: "",
        age: ""
      }
    };
  },
  methods: {
    //获取评分等级
    getRan(val) {
      //   debugger;
      let rank = "F";
      if (this.scorings.length > 0) {
        let A = this.scorings.filter(item => item.grade === "A")[0];
        let B = this.scorings.filter(item => item.grade === "B")[0];
        let C = this.scorings.filter(item => item.grade === "C")[0];
        let D = this.scorings.filter(item => item.grade === "D")[0];
        let E = this.scorings.filter(item => item.grade === "E")[0];
        let F = this.scorings.filter(item => item.grade === "F")[0];
        if (val >= A.minimum) {
          rank = "A";
        } else if (val >= B.minimum && val <= B.highest) {
          rank = "B";
        } else if (val >= C.minimum && val <= C.highest) {
          rank = "C";
        } else if (val >= D.minimum && val <= D.highest) {
          rank = "D";
        } else if (val >= E.minimum && val <= E.highest) {
          rank = "E";
        } else if (val >= F.minimum && val <= F.highest) {
          rank = "F";
        }
      }

      return rank;
    },
    //展示标题的信息
    show(item, { id, rank, rankUnionid, name, birthday, sex, idno, items }) {
      this.clearForm();
      this.item = item;
      this.form.id = id;
      this.info.name = name;
      this.info.birthday = this.$moment(birthday).format("YYYY-MM-DD");
      this.info.sex = sex;
      this.info.idno = idno;
      this.info.age = this.getAge(this.info.birthday);
      //   debugger;
      // console.log("数据是-------rank----", rank);
      if (rank) {
        this.data.rank = this.desc.findIndex(item => item === rank) + 1;
        this.setForm({ id, rank, rankUnionid });
      }

      if (this.markType === 1) {
        // debugger;
        if (items.length > 0) {
          this.liststudentItems = items;
        } else {
          this.liststudentItems = this.modeItem.map(i => {
            return {
              id: "",
              item: i.item,
              branch: 0,
              studentEnrollId: id
            };
          });
        }
      }

      this.visible = true;
    },
    setForm(data) {
      //   debugger;

      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = data[key];
        }
      }
    },
    clearForm() {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = undefined;
        }
      }
    },
    handleOk() {
      let formData = { ...this.form };
      if (!formData.rankUnionid) {
        formData.rankUnionid = this.unionid;
      }
      if (this.markType === 0) {
        formData.rank = this.desc[this.data.rank - 1];
        if (formData.rank) {
          this.loading = true;
          formData.scoringRemark = this.scoringRemark;
          main
            .dd(formData)
            .then(res => {
              this.$message.success("评分成功");
              this.reload();
              this.visible = false;
              this.loading = false;
            })
            .catch(err => {
              this.loading = false;
              this.$message.error(err);
            });
        } else {
          this.$message.error("您未评分，无法提交");
        }
      } else if (this.markType === 1) {
        formData.rank = this.rank;
        formData.liststudentItems = this.liststudentItems;
        formData.scoringRemark = this.scoringRemark;
        // // console.log(formData);
        if (formData.rank) {
          this.loading = true;
          main
            .item(formData)
            .then(res => {
              this.$message.success("评分成功");
              this.reload();
              this.visible = false;
              this.loading = false;
            })
            .catch(err => {
              this.loading = false;
              this.$message.error(err);
            });
        } else {
          this.$message.error("您未评分，无法提交");
        }
      }
    },
    handleCancel() {
      this.visible = false;
    },
    getAge(birthday) {
      let duration = this.$moment.duration(this.$moment().diff(birthday));
      let years = duration.years();
      let months = duration.months();
      let days = duration.days();
      let result = "";
      if (years === 1) {
        result += "";
      } else if (years > 1) {
        result += years;
      }
      //   if (months === 1) {
      //     result += "one month ";
      //   } else if (months > 1) {
      //     result += months + " months ";
      //   }
      //   if (days === 1) {
      //     result += "one day ";
      //   } else if (days > 1) {
      //     result += days + " days ";
      //   }
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
.myheight1 {
  height: 30px;
}
.myheight2 {
  height: 50px;
}
.myTitle {
  text-align: center;
  font-size: 19px;

  line-height: 30px;
  .sex {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    // border: 1px solid black;
    font-size: 13px;
    color: white;
  }
  .nan {
    background: #4f6fff;
  }
  .nv {
    background: #be4fff;
  }

  .age {
    font-size: 17px;
    color: #99a4ff;
    letter-spacing: 1px;
  }
  .other {
    font-size: 10px;
    color: gray;
  }
  .other-phone {
    font-size: 20px;
    color: gray;
  }
}

.stars {
  text-align: center;
  .text {
    font-size: 40px;
    position: relative;
    top: 4px;
    margin-left: 20px;
    font-weight: bolder;
    color: #99a4ff;
  }
}
.number {
  font-size: 18px;
  text-align: center;
}
.total {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 25px;
  font-weight: bolder;
  letter-spacing: 2px;
}
.box-bottom {
  position: fixed;
  bottom: 0px !important;
}
.foot-btn {
  width: 100%;
  text-align: center;
}
</style>

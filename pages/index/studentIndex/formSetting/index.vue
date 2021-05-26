<template>
  <div>
    <div>
      <a-row>
        <template v-if="activing">
          <a-col v-if="$power('p-1-f-add')" :span="2">
            <a-avatar @click="addForm" :size="50" icon="plus" />
          </a-col>
        </template>
        <a-col :span="22">
          <template v-if="loading">
            <a-spin :spinning="loading" tip="表单信息加载中">
              <div class="spin-content"></div>
            </a-spin>
          </template>
          <template v-else>
            <div class="card" v-for="(item, idx) in list" :key="idx">
              <a-card :key="idx" hoverable style="width: 360px" size="small">
                <div class="card-title" slot="title">
                  家长填报表单({{ idx + 1 }})
                </div>
                <div class="content">
                  <div class="itemList">
                    <div class="it-img">
                      <vue-hover-mask @click="downloadQr(`add_${idx}`)">
                        <!-- 默认插槽 -->
                        <div>
                          <VueQr
                            :class="[`qr`, `add_${idx}`]"
                            :margin="10"
                            :size="700"
                            :text="
                              `${qrUrl}/phone/reportStudent/${enrollId}/1-0-0/${item.id}`
                            "
                          />
                        </div>

                        <!-- action插槽 -->
                        <template v-slot:action>下载</template>
                      </vue-hover-mask>
                    </div>
                    <div class="it-con">
                      <div class="it-icon-it text">
                        报名时间:
                        <template v-if="item.datefrom"
                          >{{ item.datefrom.split(" ")[0] + " " }}到{{
                            " " + item.dateto.split(" ")[0]
                          }}</template
                        >
                      </div>
                      <vue-hover-mask @click="copy(item.addUrl, 1, idx)">
                        <div class="it-icon-it input">
                          <!-- 默认插槽 -->
                          <div class="item-url">{{ item.addUrl }}</div>
                          <!-- action插槽 -->
                        </div>
                        <template v-slot:action>{{
                          item.copyAdd ? "已复制" : "复制"
                        }}</template>
                      </vue-hover-mask>
                    </div>
                  </div>
                  <div class="itemList">
                    <div class="it-img">
                      <vue-hover-mask @click="downloadQr(`edit_${idx}`)">
                        <!-- 默认插槽 -->
                        <div>
                          <VueQr
                            :class="[`qr`, `add_${idx}`]"
                            :margin="10"
                            :size="700"
                            :text="
                              `${qrUrl}/phone/reportStudent/${enrollId}/2-0-0/${item.id}`
                            "
                          />
                        </div>
                        <!-- action插槽 -->
                        <template v-slot:action>下载</template>
                      </vue-hover-mask>
                    </div>
                    <div class="it-con">
                      <div class="it-icon-it text">
                        修改时间:
                        <template v-if="item.updatestarttime"
                          >{{ item.updatestarttime.split(" ")[0] + " " }}到{{
                            " " + item.updateendtime.split(" ")[0]
                          }}</template
                        >
                      </div>
                      <vue-hover-mask @click="copy(item.editUrl, 2, idx)">
                        <div class="it-icon-it input">
                          <!-- 默认插槽 -->
                          <div class="item-url">{{ item.editUrl }}</div>
                          <!-- action插槽 -->
                        </div>
                        <template v-slot:action>{{
                          item.copyEdit ? "已复制" : "复制"
                        }}</template>
                      </vue-hover-mask>
                    </div>
                  </div>

                  <div class="foot">
                    <a-row>
                      <a-col :span="14"
                        >创建时间：{{ item.createtime.split(" ")[0] }}</a-col
                      >
                      <a-col v-if="activing" class="itemLeft" :span="10">
                        <a-icon
                          v-if="$power('p-1-f-del')"
                          class="itemIcon"
                          type="delete"
                          @click.stop="del(item, idx)"
                        />
                        <a-icon
                          v-if="$power('p-1-f-edit')"
                          class="itemIcon"
                          type="edit"
                          @click.stop="edit(item)"
                        />
                        <a-dropdown>
                          <a-icon class="itemIcon" type="mail" />

                          <!-- <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                      Hover me
                      <a-icon type="down" />
                          </a>-->
                          <a-menu slot="overlay">
                            <a-menu-item key="0" @click="toShowPeople(2)"
                              >发送报名短信</a-menu-item
                            >
                            <a-menu-item key="1" @click="toShowPeople(1)"
                              >发送修改短信</a-menu-item
                            >
                          </a-menu>
                        </a-dropdown>
                      </a-col>
                    </a-row>
                  </div>
                </div>
              </a-card>
            </div>
          </template>
        </a-col>
      </a-row>
    </div>

    <!-- 表单组件 -->
    <form-vue ref="formVue" :reload="reload" />

    <!-- 选择发送短信人员 -->
    <a-modal
      v-model="pop.people"
      title="选择发送短信人员"
      :closable="false"
      :keyboard="false"
      :maskClosable="false"
      centered
      destroyOnClose
      width="1200px"
    >
      <people-vue
        :getSendIds="getSendIds"
        :peopleType="peopleType"
      ></people-vue>
      <div slot="footer">
        <a-button @click="canlePeople">取消</a-button>
        <a-button type="primary" @click="toSend"
          >确定{{
            sendList.length > 0 ? `（${sendList.length}）` : ""
          }}</a-button
        >
      </div>
    </a-modal>
  </div>
</template>

<script>
//组件
import vueHoverMask from "~/components/common/vueHoverMask.vue"; //移入遮罩
import formVue from "./components/_form.vue"; //设置表单
import peopleVue from "./components/_people.vue"; //选择人员

//接口
import main from "~/api/formSetting";
import tcn from "~/api/tcn";
import NoteSend from "~/api/NoteSend"; //短信接口

export default {
  components: {
    vueHoverMask,
    formVue,
    peopleVue
  },
  props: {
    activing: {
      type: Boolean,
      default: true
    }
    // enrollId: {
    //   type: Number,
    //   default: -1
    // }
  },
  data() {
    return {
      peopleType: 1,
      pop: {
        people: false
      },
      loading: false,
      list: [],
      qrUrl: "",
      sendList: []
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
    //学校名称
    schoolName() {
      return this.$store.state.auth.schoolName;
    },
    //学校url
    schoolUrl() {
      return this.$store.state.auth.schoolUrl;
    }
  },
  watch: {
    "form.idcardtype"(nv) {
      // // console.log("assaddd-----", nv);
    }
  },
  methods: {
    validator(value) {
      var num = value.toUpperCase();
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
      var reg = /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/;
      if (!reg.test(num)) {
        return false;
      }
      // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      // 下面分别分析出生日期和校验位
      var len, re;
      len = num.length;
      if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);
        // 检查生日日期是否正确
        var dtmBirth = new Date(
          "19" + arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]
        );
        var bGoodDay;
        bGoodDay =
          dtmBirth.getYear() == Number(arrSplit[2]) &&
          dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
          dtmBirth.getDate() == Number(arrSplit[4]);
        if (!bGoodDay) {
          return false;
        }
      }
      if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);
        // 检查生日日期是否正确
        var dtmBirth = new Date(
          arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]
        );
        var bGoodDay;
        bGoodDay =
          dtmBirth.getFullYear() == Number(arrSplit[2]) &&
          dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
          dtmBirth.getDate() == Number(arrSplit[4]);
        if (!bGoodDay) {
          return false;
        } else {
          // 检验18位身份证的校验码是否正确。
          // 校验位按照ISO 7064:1983.MOD
          // 11-2的规定生成，X可以认为是数字10。
          var valnum;
          var arrInt = new Array(
            7,
            9,
            10,
            5,
            8,
            4,
            2,
            1,
            6,
            3,
            7,
            9,
            10,
            5,
            8,
            4,
            2
          );
          var arrCh = new Array(
            "1",
            "0",
            "X",
            "9",
            "8",
            "7",
            "6",
            "5",
            "4",
            "3",
            "2"
          );
          var nTemp = 0,
            i;
          for (var i = 0; i < 17; i++) {
            nTemp += num.substr(i, 1) * arrInt[i];
          }
          valnum = arrCh[nTemp % 11];
          if (valnum != num.substr(17, 1)) {
            return false;
          }
        }
      }
      return true;
    },
    //下载二维码
    downloadQr(className) {
      //   debugger;
      const iconUrl = document.querySelector(`.${className}`).src;
      let a = document.createElement("a");
      let event = new MouseEvent("click");
      a.download = "二维码";
      a.href = iconUrl;
      a.dispatchEvent(event);
    },
    async getList() {
      this.loading = true;
      let res = await main.list({ enrollId: this.enrollId });
      let list = [];
      if (res.data.length > 0) {
        for (const item of res.data) {
          // // console.log(item);
          let obj = { ...item };

          obj.copyAdd = false;
          obj.copyEdit = false;
          //   let addUrl = await tcn.get({
          //     url: `${this.qrUrl}/phone/reportStudent/${this.enrollId}/1-0-0/${item.id}`
          //   });
          //   let editUrl = await tcn.get({
          //     url: `${this.qrUrl}/phone/reportStudent/${this.enrollId}/2-0-0/${item.id}`
          //   });

          obj.addUrl = item.signupurl
            ? item.signupurl
            : `${this.schoolUrl}phone/reportStudent/${this.enrollId}/1-0-0/${item.id}?schoolName=${this.schoolName}`;
          obj.editUrl = item.updateurl
            ? item.updateurl
            : `${this.schoolUrl}phone/reportStudent/${this.enrollId}/2-0-0/${item.id}schoolName=${this.schoolName}`;
          list.push(obj);
        }
      }

      this.list = list;

      //   this.list.forEach((item, idx) => {
      //     this.getTcn(item.id, idx, 1);
      //     this.getTcn(item.id, idx, 2);
      //   });

      this.loading = false;
    },
    getTcn(id, idx, type) {
      if (type === 1) {
        tcn
          .get({
            url: `${this.qrUrl}/phone/reportStudent/${this.enrollId}/1-0-0/${id}`
          })
          .then(res => {
            // this.list[idx].addUrl = res.url;
            this.list[
              idx
            ].addUrl = `${this.qrUrl}/phone/reportStudent/${this.enrollId}/1-0-0/${id}`;
          });
      } else if (type === 2) {
        tcn
          .get({
            url: `${this.qrUrl}/phone/reportStudent/${this.enrollId}/2-0-0/${id}`
          })
          .then(res => {
            // this.list[idx].editUrl = res.url;
            this.list[
              idx
            ].editUrl = `${this.qrUrl}/phone/reportStudent/${this.enrollId}/2-0-0/${id}`;
          });
      }
    },
    reload() {
      this.getList();
      // // console.log("‘调用了’");
    },
    //复制方法
    copy(msg, type, idx) {
      this.$copyText(msg).then(
        res => {
          this.list[idx][type === 1 ? "copyAdd" : "copyEdit"] = true;
          //   // console.log(e);
        },
        err => {
          alert("Can not copy");
          //   // console.log(e);
        }
      );
    },
    //添加
    addForm() {
      this.$refs.formVue.showDrawer(1); //显示弹窗
    },
    //删除
    //删除
    del({ id }, idx) {
      this.$confirm({
        title: "确认删除吗",
        cancelText: "不了",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .del({ id })
            .then(res => {
              this.$message.success("删除成功");
              this.list.splice(idx, 1);
              //   this.getList();
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      });
    },
    //修改
    edit(item) {
      setTimeout(() => {
        this.$refs.formVue.showDrawer(2, item); //显示弹窗
      }, 200);
    },
    //##########  发送短信相关接口  ##########
    //显示人员选择弹窗
    toShowPeople(type) {
      this.peopleType = type;
      this.pop.people = true;
    },
    //关闭人员选择弹窗
    canlePeople() {
      this.pop.people = false;
      this.sendList = [];
    },
    //获取人员ids
    getSendIds(ids) {
      this.sendList = [...ids];
      // // console.log("发送短信的人员的id是-------", this.sendList);
    },
    //发送短信
    toSend(type) {
      this.$confirm({
        title: "发送确认",
        content: "确定发送吗",
        onOk: () => {
          let send =
            this.peopleType === 2
              ? NoteSend.sendAdd({
                  enrollId: this.enrollId,
                  listIds: this.sendList
                })
              : NoteSend.sendEdit({
                  enrollId: this.enrollId,
                  listIds: this.sendList
                });

          send
            .then(res => {
              this.$message.success("已成功发送短信");
              this.canlePeople();
            })
            .catch(err => {
              this.$message.error(err);
            });
        },
        onCancel() {}
      });
    }
  },
  created() {
    let url = process.env.QR_URL;
    //赋值二维码地址
    this.qrUrl = url;
  },
  mounted() {
    if (this.enrollId === -1) {
      window.onNuxtReady(() => {
        this.getList().catch(err => {
          this.$message.error(err);
        }); //获取列表
      });
    } else {
      this.getList().catch(err => {
        this.$message.error(err);
      }); //获取列表
    }
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
  position: relative;
  height: 180px;
  //   line-height: 100px;
  font-size: 30px;
  text-align: center;
  .itemList {
    //   background: black;
    // border: 1px solid black;
    height: 68px;
    margin-bottom: 5px;
    .it-img {
      float: left;
      width: 27%;
      height: 100%;
      //   background: rgb(114, 114, 117);
    }
    .it-con {
      float: left;
      height: 100%;
      width: 73%;
      //   background: red;
      .it-icon-it {
        width: 100%;

        // background: blue;
        font-size: 13px;
        letter-spacing: 0.5px;
        font-weight: 400;
      }
      .text {
        height: 30%;
        line-height: 20px;
        font-size: 9px;
        font-weight: bolder;
      }
      .input {
        height: 70%;
        padding: 5px;
        width: 250px;
        .item-url {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 100%;
          width: 100%;
          background: #f6f6f6;
          border-radius: 5px;
          line-height: 30px;
          font-size: 10px;
          border: 1px solid gainsboro;
        }
      }
    }
  }
  .foot {
    position: absolute;
    bottom: 0px;
    width: 100%;
    font-size: 15px;
  }
}
.itemLeft {
  text-align: right;
  .itemIcon {
    margin-right: 10px;
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
.qr {
  width: 60px;
  height: 60px;
}
.card {
  position: relative;
  float: left;
  margin-top: 10px;
  margin-right: 10px;
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
.spin-content {
  width: 100%;
  height: 50vh;
}
</style>

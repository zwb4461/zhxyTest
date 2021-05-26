<template>
  <div>
    <a-card hoverable class="students-box" @click="clickCard">
      <a-row :gutter="16">
        <a-col :span="5">
          <div class="mark-title">A</div>
          <a-row>
            <a-col :span="12">
              <div
                :class="[
                  'name-item',
                  'hvr-grow-rotate',
                  'border-nan',
                  item.isClick ? 'click-nan' : '',
                ]"
                v-for="(item, index) in classInfo.A1"
                :key="index"
                @click="changeClick(item)"
              >
                {{ item.name }}
              </div>
            </a-col>
            <a-col :span="12">
              <div
                :class="[
                  'name-item',
                  'hvr-grow-rotate',
                  'border-nv',
                  item.isClick ? 'click-nv' : '',
                ]"
                v-for="(item, index) in classInfo.A2"
                :key="index"
                @click="changeClick(item)"
              >
                {{ item.name }}
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="5">
          <div class="mark-title">B</div>
          <a-row>
            <a-col :span="12">
              <div
                :class="[
                  'name-item',
                  'hvr-grow-rotate',
                  'border-nan',
                  item.isClick ? 'click-nan' : '',
                ]"
                v-for="(item, index) in classInfo.B1"
                :key="index"
                @click="changeClick(item)"
              >
                {{ item.name }}
              </div>
            </a-col>
            <a-col :span="12">
              <div
                :class="[
                  'name-item',
                  'hvr-grow-rotate',
                  'border-nv',
                  item.isClick ? 'click-nv' : '',
                ]"
                v-for="(item, index) in classInfo.B2"
                :key="index"
                @click="changeClick(item)"
              >
                {{ item.name }}
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="5">
          <div class="mark-title">C</div>
          <a-row>
            <a-col :span="12">
              <div
                :class="[
                  'name-item',
                  'hvr-grow-rotate',
                  'border-nan',
                  item.isClick ? 'click-nan' : '',
                ]"
                v-for="(item, index) in classInfo.C1"
                :key="index"
                @click="changeClick(item)"
              >
                {{ item.name }}
              </div>
            </a-col>
            <a-col :span="12">
              <div
                :class="[
                  'name-item',
                  'hvr-grow-rotate',
                  'border-nv',
                  item.isClick ? 'click-nv' : '',
                ]"
                v-for="(item, index) in classInfo.C2"
                :key="index"
                @click="changeClick(item)"
              >
                {{ item.name }}
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="5">
          <div class="mark-title">D</div>
          <a-row>
            <a-col :span="12">
              <div
                :class="[
                  'name-item',
                  'hvr-grow-rotate',
                  'border-nan',
                  item.isClick ? 'click-nan' : '',
                ]"
                v-for="(item, index) in classInfo.D1"
                :key="index"
                @click="changeClick(item)"
              >
                {{ item.name }}
              </div>
            </a-col>
            <a-col :span="12">
              <div
                :class="[
                  'name-item',
                  'hvr-grow-rotate',
                  'border-nv',
                  item.isClick ? 'click-nv' : '',
                ]"
                v-for="(item, index) in classInfo.D2"
                :key="index"
                @click="changeClick(item)"
              >
                {{ item.name }}
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="5">
          <div class="mark-title">E</div>
          <a-row>
            <a-col :span="12">
              <div
                :class="[
                  'name-item',
                  'hvr-grow-rotate',
                  'border-nan',
                  item.isClick ? 'click-nan' : '',
                ]"
                v-for="(item, index) in classInfo.E1"
                :key="index"
                @click="changeClick(item)"
              >
                {{ item.name }}
              </div>
            </a-col>
            <a-col :span="12">
              <div
                :class="[
                  'name-item',
                  'hvr-grow-rotate',
                  'border-nv',
                  item.isClick ? 'click-nv' : '',
                ]"
                v-for="(item, index) in classInfo.E2"
                :key="index"
                @click="changeClick(item)"
              >
                {{ item.name }}
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="5">
          <div class="mark-title">F</div>
          <a-row>
            <a-col :span="12">
              <div
                :class="[
                  'name-item',
                  'hvr-grow-rotate',
                  'border-nan',
                  item.isClick ? 'click-nan' : '',
                ]"
                v-for="(item, index) in classInfo.F1"
                :key="index"
                @click="changeClick(item)"
              >
                {{ item.name }}
              </div>
            </a-col>
            <a-col :span="12">
              <div
                :class="[
                  'name-item',
                  'hvr-grow-rotate',
                  'border-nv',
                  item.isClick ? 'click-nv' : '',
                ]"
                v-for="(item, index) in classInfo.F2"
                :key="index"
                @click="changeClick(item)"
              >
                {{ item.name }}
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="4">
          <div class="mark-title">未评定</div>
          <a-row>
            <a-col :span="12">
              <div
                :class="[
                  'name-item',
                  'hvr-grow-rotate',
                  'border-nan',
                  item.isClick ? 'click-nan' : '',
                ]"
                v-for="(item, index) in classInfo.H1"
                :key="index"
                @click="changeClick(item)"
              >
                {{ item.name }}
              </div>
            </a-col>
            <a-col :span="12">
              <div
                :class="[
                  'name-item',
                  'hvr-grow-rotate',
                  'border-nv',
                  item.isClick ? 'click-nv' : '',
                ]"
                v-for="(item, index) in classInfo.H2"
                :key="index"
                @click="changeClick(item)"
              >
                {{ item.name }}
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
  props: {
    classInfo: Object,
  },
  methods: {
    clickCard() {
      console.log(this.classInfo, "classInfo");
    },
    changeClick(item) {
      item.isClick = !item.isClick;
    },
  },
};
</script>

<style lang="scss" scoped>
.students-box {
  width: 100%;
  border-radius: 5px;
  .mark-title {
    height: 30px;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid lightgray;
  }
  .name-item {
    color: black;
    float: left;
    border-radius: 5px;
    margin: 5px;
    font-size: 12px;
    text-align: center;
    min-width: 55px;
    height: 25px;
  }
  .border-nan {
    border: 1px solid #4f6fff;
  }
  .border-nv {
    border: 1px solid #be4fff;
  }
  .click-nan {
    color: white;
    background: #4f6fff;
  }
  .click-nv {
    color: white;
    background: #be4fff;
  }
}
</style>

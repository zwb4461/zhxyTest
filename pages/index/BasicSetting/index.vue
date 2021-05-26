<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="学期设置" name="first">
        <div class="contain">
          <div class="gradeClass_contain" @click="addClass">
            <div>
              <span style="font-size: 28px; color: #c8c8c8"
                >创建一个新的学期</span
              >
            </div>
            <div class="jia"><span>+</span></div>
          </div>
          <!-- 列表 -->
          <div
            class="gradeClass_contain_list"
            v-for="(item, index) in gradeList"
            :key="index"
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-bottom: 20px;
                cursor: pointer;
              "
            >
              <span style="font-size: 28px; color: #646464">{{
                item.year
              }}</span>
              <span style="font-size: 16px; color: #c8c8c8"></span>
            </div>
            <div class="item_bottom_btn" v-show="item.islock == 0">
              <!-- <img
                src="../../../assets/img/del.svg"
                style="cursor: pointer"
                @click.stop="del(item)"
              /> -->
              <img
                src="../../../assets/img/lock.svg"
                style="cursor: pointer"
                @click="lock(item)"
              />
              <img
                src="../../../assets/img/edit.svg"
                style="cursor: pointer"
                @click.stop="edit(item)"
              />
            </div>
            <div class="item_bottom_btn" v-show="item.islock == 1">
              <img
                src="../../../assets/img/delOn.svg"
                style="cursor: pointer"
              />
              <img
                src="../../../assets/img/lockOn.svg"
                style="cursor: pointer"
              />
              <img
                src="../../../assets/img/editOn.svg"
                style="cursor: pointer"
                @click.stop="edit(item)"
              />
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="学科设置" name="second">
        <div class="xksz_contain">
          <p>学科设置</p>
          <el-table :data="xksztableData" border style="width: 100%">
            <el-table-column size="small" prop="bh" label="编码" width="100">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  @change="bhChange(scope)"
                  v-model="scope.row.bh"
                  placeholder="请输入编码"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="学科名称" width="156">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  @change="nameChange(scope)"
                  v-model="scope.row.name"
                  placeholder="请输入学科名称"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
          <el-button size="small" style="width: 100%" @click="addXkszRow"
            >+</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="成绩单位设置" name="third">
        <div class="xksz_contain1">
          <p>成绩单位设置</p>
          <el-table :data="cjdwtableData" border style="width: 100%">
            <el-table-column size="small" prop="bh" label="编码" width="100">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  @change="cjbhChange(scope)"
                  v-model="scope.row.bh"
                  placeholder="请输入编码"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="单位" width="156">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  @change="dwChange(scope)"
                  v-model="scope.row.name"
                  placeholder="请输入单位"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
          <el-button size="small" style="width: 100%" @click="addcjdwRow"
            >+</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="体卫参考值" name="four">
        <el-table
          :header-cell-style="{ 'text-align': 'center' }"
          size="small"
          :data="twTableOpt"
          border
          style="width: 100%"
        >
          <el-table-column label="体卫参考值">
            <el-table-column prop="gradeName" label="年级"> </el-table-column
          ></el-table-column>
          <el-table-column label="男">
            <el-table-column prop="nantz" label="体重(千克)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  v-model="scope.row.nantz"
                  @blur="editTw(scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="nansg" label="身高(厘米)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  v-model="scope.row.nansg"
                  @blur="editTw(scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="nansl" label="视力范围">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  v-model="scope.row.nansl"
                  @blur="editTw(scope.row)"
                ></el-input> </template
            ></el-table-column>
          </el-table-column>
          <el-table-column label="女">
            <el-table-column prop="nvtz" label="体重(千克)"
              ><template slot-scope="scope">
                <el-input
                  size="mini"
                  v-model="scope.row.nvtz"
                  @blur="editTw(scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="nvsg" label="身高(厘米)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  v-model="scope.row.nvsg"
                  @blur="editTw(scope.row)"
                ></el-input> </template
            ></el-table-column>
            <el-table-column prop="nvsl" label="视力范围">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  v-model="scope.row.nvsl"
                  @blur="editTw(scope.row)"
                ></el-input> </template></el-table-column
          ></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="成绩单背景" name="five"
        ><BackgroundSeting></BackgroundSeting
      ></el-tab-pane>
    </el-tabs>
    <my-drawer-vue
      title="学期设置"
      :width="600"
      :visible="showAddClassDia"
      :onOk="submitXq"
      @onClose="closeXq"
    >
      <template slot="contentInfo">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="本学期年份:" label-width="100px">
            <el-select
              :disabled="isLock == 1"
              size="small"
              class="inp wid"
              v-model="form.term"
              placeholder="请选择"
            >
              <el-option
                v-for="item in termOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-divider content-position="center">第一学期</el-divider>
          <el-form-item label="学生报到时间:" label-width="100px">
            <el-date-picker
              :disabled="isLock == 1"
              v-model="form.xsbdsj"
              value-format="yyyy-MM-dd HH-mm"
              size="small"
              class="wid"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="开学起止日期:" label-width="100px">
            <el-date-picker
              :disabled="isLock == 1"
              v-model="form.kxqzrq"
              value-format="yyyy-MM-dd"
              size="small"
              class="wid"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="工作起止日期:" label-width="100px">
            <el-date-picker
              :disabled="isLock == 1"
              v-model="form.gzqzrq"
              value-format="yyyy-MM-dd"
              size="small"
              class="wid"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="周教学日设置:" label-width="100px">
            <el-select
              :disabled="isLock == 1"
              v-model="form.zjxrsz"
              multiple
              placeholder="请选择"
              size="small"
              class="wid"
            >
              <el-option
                v-for="item in zjxrszOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课数设置:" label-width="100px">
            <div class="ks_contain">
              <div class="ks_top">
                <span>上午</span>
                <span>下午</span>
                <span>晚上</span>
              </div>
              <div class="ks_bottom">
                <el-select
                  :disabled="isLock == 1"
                  style="width: 90px"
                  v-model="form.swks"
                  placeholder="请选择"
                  size="small"
                  class="wid"
                >
                  <el-option
                    v-for="item in ksOpt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select
                  :disabled="isLock == 1"
                  style="width: 90px"
                  v-model="form.xwks"
                  placeholder="请选择"
                  size="small"
                  class="wid"
                >
                  <el-option
                    v-for="item in ksOpt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select
                  :disabled="isLock == 1"
                  style="width: 90px"
                  v-model="form.wsks"
                  placeholder="请选择"
                  size="small"
                  class="wid"
                >
                  <el-option
                    v-for="item in ksOpt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="每节课时长:" label-width="100px">
            <div class="ks_contain">
              <div class="ks_top">
                <el-input
                  :disabled="isLock == 1"
                  v-model="form.swsc"
                  style="width: 90px"
                  placeholder="上午"
                  size="small"
                >
                  <template slot="suffix"> 分钟 </template></el-input
                >
                <el-input
                  :disabled="isLock == 1"
                  v-model="form.xwsc"
                  style="width: 90px"
                  placeholder="下午"
                  size="small"
                  ><template slot="suffix"> 分钟 </template></el-input
                >
                <el-input
                  :disabled="isLock == 1"
                  v-model="form.wssc"
                  style="width: 90px"
                  placeholder="晚午"
                  size="small"
                  ><template slot="suffix"> 分钟 </template></el-input
                >
              </div>
            </div>
          </el-form-item>

          <el-form-item label="执行课表:" label-width="100px">
            <!-- 0:单周，1:单双周 -->
            <el-select size="small" v-model="form.stanza1">
              <el-option
                v-for="item in stanzaOpt"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="form.stanza1 == 1"
            label="起始课表日期:"
            label-width="100px"
          >
            <!-- 选择单双周时显示 -->
            <el-date-picker
              size="small"
              value-format="yyyy-MM-dd"
              v-model="form.stanzaDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-divider content-position="center">第二学期</el-divider>
          <el-form-item label="学生报到时间:" label-width="100px">
            <el-date-picker
              :disabled="isLock == 1"
              v-model="form.xsbdsj_two"
              value-format="yyyy-MM-dd HH:mm"
              size="small"
              class="wid"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="开学起止日期:" label-width="100px">
            <el-date-picker
              :disabled="isLock == 1"
              v-model="form.kxqzrq_two"
              value-format="yyyy-MM-dd"
              size="small"
              class="wid"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="工作起止日期:" label-width="100px">
            <el-date-picker
              :disabled="isLock == 1"
              v-model="form.gzqzrq_two"
              value-format="yyyy-MM-dd"
              size="small"
              class="wid"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="下学期报到时间:" label-width="100px">
            <el-date-picker
              :disabled="isLock == 1"
              v-model="form.xxqbdsj"
              value-format="yyyy-MM-dd HH:mm"
              size="small"
              class="wid"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="周教学日设置:" label-width="100px">
            <el-select
              :disabled="isLock == 1"
              v-model="form.zjxrsz_two"
              multiple
              placeholder="请选择"
              size="small"
              class="wid"
            >
              <el-option
                v-for="item in zjxrszOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课数设置:" label-width="100px">
            <div class="ks_contain">
              <div class="ks_top">
                <span>上午</span>
                <span>下午</span>
                <span>晚上</span>
              </div>
              <div class="ks_bottom">
                <el-select
                  :disabled="isLock == 1"
                  style="width: 90px"
                  v-model="form.swks_two"
                  placeholder="请选择"
                  size="small"
                  class="wid"
                >
                  <el-option
                    v-for="item in ksOpt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select
                  :disabled="isLock == 1"
                  style="width: 90px"
                  v-model="form.xwks_two"
                  placeholder="请选择"
                  size="small"
                  class="wid"
                >
                  <el-option
                    v-for="item in ksOpt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select
                  :disabled="isLock == 1"
                  style="width: 90px"
                  v-model="form.wsks_two"
                  placeholder="请选择"
                  size="small"
                  class="wid"
                >
                  <el-option
                    v-for="item in ksOpt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="每节课时长:" label-width="100px">
            <div class="ks_contain">
              <div class="ks_top">
                <el-input
                  :disabled="isLock == 1"
                  v-model="form.swsc_two"
                  style="width: 90px"
                  placeholder="上午"
                  size="small"
                >
                  <template slot="suffix"> 分钟 </template></el-input
                >
                <el-input
                  :disabled="isLock == 1"
                  v-model="form.xwsc_two"
                  style="width: 90px"
                  placeholder="下午"
                  size="small"
                  ><template slot="suffix"> 分钟 </template></el-input
                >
                <el-input
                  :disabled="isLock == 1"
                  v-model="form.wssc_two"
                  style="width: 90px"
                  placeholder="晚午"
                  size="small"
                  ><template slot="suffix"> 分钟 </template></el-input
                >
              </div>
            </div>
          </el-form-item>
          <el-form-item label="执行课表:" label-width="100px">
            <!-- 0:单周，1:单双周 -->
            <el-select size="small" v-model="form.stanza2">
              <el-option
                v-for="item in stanzaOpt"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="form.stanza2 == 1"
            label="起始课表日期:"
            label-width="100px"
          >
            <!-- 选择单双周时显示 -->
            <el-date-picker
              size="small"
              value-format="yyyy-MM-dd"
              v-model="form.stanzaDate2"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-divider content-position="center">钉钉年级绑定</el-divider>
          <div class="njbd">
            <span>本学期系统年级</span>
            <span>本学期钉钉年级</span>
            <span>钉钉年级ID</span>
          </div>
          <div class="njbd">
            <el-select
              :disabled="isLock == 1"
              style="width: 130px"
              v-model="form.xtnj_one"
              placeholder="请选择"
              size="small"
              class="wid"
            >
              <el-option
                v-for="item in xtnj_oneOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              :disabled="isLock == 1"
              @change="change_one"
              style="width: 130px"
              v-model="form.ddnj_one"
              placeholder="请选择"
              size="small"
              class="wid"
            >
              <el-option
                v-for="item in xtdd_Opt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
            <el-input
              style="width: 130px"
              size="small"
              v-model="form.ddnjId_one"
              disabled
            ></el-input>
          </div>
          <div class="njbd">
            <el-select
              :disabled="isLock == 1"
              style="width: 130px"
              v-model="form.xtnj_two"
              placeholder="请选择"
              size="small"
              class="wid"
            >
              <el-option
                v-for="item in xtnj_twoOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              :disabled="isLock == 1"
              style="width: 130px"
              @change="change_two"
              v-model="form.ddnj_two"
              placeholder="请选择"
              size="small"
              class="wid"
            >
              <el-option
                v-for="item in xtdd_Opt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
            <el-input
              style="width: 130px"
              size="small"
              v-model="form.ddnjId_two"
              disabled
            ></el-input>
          </div>
          <div class="njbd">
            <el-select
              :disabled="isLock == 1"
              style="width: 130px"
              v-model="form.xtnj_three"
              placeholder="请选择"
              size="small"
              class="wid"
            >
              <el-option
                v-for="item in xtnj_threeOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              :disabled="isLock == 1"
              style="width: 130px"
              v-model="form.ddnj_three"
              @change="change_three"
              placeholder="请选择"
              size="small"
              class="wid"
            >
              <el-option
                v-for="item in xtdd_Opt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
            <el-input
              style="width: 130px"
              size="small"
              v-model="form.ddnjId_three"
              disabled
            ></el-input>
          </div>
          <div class="njbd">
            <el-select
              :disabled="isLock == 1"
              style="width: 130px"
              v-model="form.xtnj_four"
              placeholder="请选择"
              size="small"
              class="wid"
            >
              <el-option
                v-for="item in xtnj_fourOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              :disabled="isLock == 1"
              style="width: 130px"
              @change="change_four"
              v-model="form.ddnj_four"
              placeholder="请选择"
              size="small"
              class="wid"
            >
              <el-option
                v-for="item in xtdd_Opt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
            <el-input
              style="width: 130px"
              size="small"
              v-model="form.ddnjId_four"
              disabled
            ></el-input>
          </div>
          <div class="njbd">
            <el-select
              :disabled="isLock == 1"
              style="width: 130px"
              v-model="form.xtnj_five"
              placeholder="请选择"
              size="small"
              class="wid"
            >
              <el-option
                v-for="item in xtnj_fiveOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              :disabled="isLock == 1"
              style="width: 130px"
              @change="change_five"
              v-model="form.ddnj_five"
              placeholder="请选择"
              size="small"
              class="wid"
            >
              <el-option
                v-for="item in xtdd_Opt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
            <el-input
              style="width: 130px"
              size="small"
              v-model="form.ddnjId_five"
              disabled
            ></el-input>
          </div>
          <div class="njbd">
            <el-select
              :disabled="isLock == 1"
              style="width: 130px"
              v-model="form.xtnj_six"
              placeholder="请选择"
              size="small"
              class="wid"
            >
              <el-option
                v-for="item in xtnj_sixOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              :disabled="isLock == 1"
              style="width: 130px"
              @change="change_six"
              v-model="form.ddnj_six"
              placeholder="请选择"
              size="small"
              class="wid"
            >
              <el-option
                v-for="item in xtdd_Opt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
            <el-input
              style="width: 130px"
              size="small"
              v-model="form.ddnjId_six"
              disabled
            ></el-input>
          </div>
        </el-form>
      </template>
    </my-drawer-vue>
  </div>
</template>

<script>
import main from "~/api/termManage";
import main1 from "~/api/personalCenter";
import main2 from "~/api/xkhz";
import main3 from "~/api/cjdw";
import main5 from "~/api/twManage";
import myDrawerVue from "~/components/common/myDrawer.vue";
import BackgroundSeting from "./components/backgroundSeting";
export default {
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
      //  .unionid
    },
  },
  components: {
    myDrawerVue,
    BackgroundSeting,
  },
  data() {
    return {
      //奖惩表格数据
      twTableOpt: [],
      itemId: 0, //当前item的id
      isLock: 0,
      formType: 0, //0--新增，1--编辑
      activeName: "first",
      gradeList: [],
      showAddClassDia: false,
      stanzaOpt: [
        {
          name: "单周课表",
          id: 0,
        },
        {
          name: "单双周课表",
          id: 1,
        },
      ],
      //添加学期字段
      form: {
        stanza1: 0,
        stanzaDate: "",
        stanza2: 0,
        stanzaDate2: "",
        term: "",

        xsbdsj: "",
        kxqzrq: "",
        gzqzrq: "",
        zjxrsz: ["星期一", "星期二", "星期三", "星期四", "星期五"],
        swks: "3节",
        xwks: "3节",
        wsks: "0节",
        swsc: "40",
        xwsc: "45",
        wssc: "0",
        xsbdsj_two: "",
        kxqzrq_two: "",
        gzqzrq_two: "",
        zjxrsz_two: ["星期一", "星期二", "星期三", "星期四", "星期五"],
        swks_two: "3节",
        xwks_two: "3节",
        wsks_two: "0节",
        swsc_two: "40",
        xwsc_two: "45",
        wssc_two: "0",
        xtnj_one: "一年级",
        xtnj_two: "二年级",
        xtnj_three: "三年级",
        xtnj_four: "四年级",
        xtnj_five: "五年级",
        xtnj_six: "六年级",
        ddnj_one: "",
        ddnj_two: "",
        ddnj_three: "",
        ddnj_four: "",
        ddnj_five: "",
        ddnj_six: "",
        ddnjId_one: "",
        ddnjId_two: "",
        ddnjId_three: "",
        ddnjId_four: "",
        ddnjId_five: "",
        ddnjId_six: "",
        xxqbdsj: "",
      },
      termOpt: [
        {
          label: "2020/2021",
          value: "2020/2021",
        },
        {
          label: "2021/2022",
          value: "2021/2022",
        },
        {
          label: "2022/2023",
          value: "2022/2023",
        },
        {
          label: "2023/2024",
          value: "2023/2024",
        },
        {
          label: "2024/2025",
          value: "2024/2025",
        },
      ], //学期列表
      zjxrszOpt: [
        { label: "星期一", value: "星期一" },
        { label: "星期二", value: "星期二" },
        { label: "星期三", value: "星期三" },
        { label: "星期四", value: "星期四" },
        { label: "星期五", value: "星期五" },
        { label: "星期六", value: "星期六" },
        { label: "星期日", value: "星期日" },
      ], //周教学日设置-选项列表
      //   课数设置-周教学日设置-选项列表
      ksOpt: [
        { label: "0节", value: "0节" },
        { label: "1节", value: "1节" },
        { label: "2节", value: "2节" },
        { label: "3节", value: "3节" },
        { label: "4节", value: "4节" },
        { label: "5节", value: "5节" },
        { label: "6节", value: "6节" },
        { label: "7节", value: "7节" },
        { label: "8节", value: "8节" },
      ],
      xtnj_oneOpt: [{ label: "一年级", value: "一年级" }],
      xtnj_twoOpt: [{ label: "二年级", value: "二年级" }],
      xtnj_threeOpt: [{ label: "三年级", value: "三年级" }],
      xtnj_fourOpt: [{ label: "四年级", value: "四年级" }],
      xtnj_fiveOpt: [{ label: "五年级", value: "五年级" }],
      xtnj_sixOpt: [{ label: "六年级", value: "六年级" }],
      xtdd_Opt: [],
      //   学科设置
      xksztableData: [],
      //   成绩单位设置
      cjdwtableData: [],
    };
  },
  methods: {
    //编辑奖励表格
    editTw(row) {
      row.schoolId = this.schoolId;
      main5
        .saveTwsz(row)
        .then((res) => {
          this.getTwTable();
        })
        .catch((err) => {});
    },
    //获取奖惩设置表格
    getTwTable() {
      console.log("体卫");
      main5
        .seeTwsz({ schoolId: this.schoolId })
        .then((res) => {
          this.twTableOpt = res.data;
        })
        .catch((err) => {});
    },
    //   增加学科设置行
    addXkszRow() {
      this.xksztableData.push({});
    },
    addcjdwRow() {
      this.cjdwtableData.push({});
    },
    //   成绩单位编码改变值
    cjbhChange(scope) {
      if (scope.row.id) {
        let val = {
          schoolId: this.schoolId,
          id: scope.row.id,
          bh: scope.row.bh,
        };
        main3
          .edit(val)
          .then((res) => {
            this.getAllcjdw();
          })
          .catch((err) => {});
      } else {
        let val = {
          schoolId: this.schoolId,
          bh: scope.row.bh,
        };
        main3
          .add(val)
          .then((res) => {
            this.getAllcjdw();
          })
          .catch((err) => {});
      }
    },
    //   成绩单位改变值
    dwChange(scope) {
      if (scope.row.id) {
        let val = {
          schoolId: this.schoolId,
          id: scope.row.id,
          name: scope.row.name,
        };
        main3
          .edit(val)
          .then((res) => {
            this.getAllcjdw();
          })
          .catch((err) => {});
      } else {
        let val = {
          schoolId: this.schoolId,
          name: scope.row.name,
        };
        main3
          .add(val)
          .then((res) => {
            this.getAllcjdw();
          })
          .catch((err) => {});
      }
    },
    //   编码改变值
    bhChange(scope) {
      if (scope.row.id) {
        let val = {
          schoolId: this.schoolId,
          id: scope.row.id,
          bh: scope.row.bh,
        };
        main2
          .edit(val)
          .then((res) => {
            this.getAllXk();
          })
          .catch((err) => {});
      } else {
        let val = {
          schoolId: this.schoolId,
          bh: scope.row.bh,
        };
        main2
          .add(val)
          .then((res) => {
            this.getAllXk();
          })
          .catch((err) => {});
      }
    },
    //   学科名称改变值
    nameChange(scope) {
      if (scope.row.id) {
        let val = {
          schoolId: this.schoolId,
          id: scope.row.id,
          name: scope.row.name,
        };
        main2
          .edit(val)
          .then((res) => {
            this.getAllXk();
          })
          .catch((err) => {});
      } else {
        let val = {
          schoolId: this.schoolId,
          name: scope.row.name,
        };
        main2
          .add(val)
          .then((res) => {
            this.getAllXk();
          })
          .catch((err) => {});
      }
    },
    // 获取所有成绩单位
    getAllcjdw() {
      main3
        .find({ schoolId: this.schoolId })
        .then((res) => {
          this.cjdwtableData = res.data;
        })
        .catch((err) => {});
    },
    // 获取所有学科
    getAllXk() {
      main2
        .find({ schoolId: this.schoolId })
        .then((res) => {
          this.xksztableData = res.data;
        })
        .catch((err) => {});
    },
    //   获取所有年级
    getAllNj() {
      main1
        .getClass({ getnj: 1, schoolId: this.schoolId })
        .then((res) => {
          this.xtdd_Opt = res.data;
        })
        .catch((err) => {});
    },
    //   获取所有卡片列表
    getAllTerm() {
      main
        .find({ schoolId: this.schoolId })
        .then((res) => {
          console.log(res.data, "--------");
          this.gradeList = res.data.list;
        })
        .catch((err) => {});
    },
    //提交学期表单
    submitXq() {
      console.log(this.unionid, "unionId");
      if (this.formType == 0) {
        let val = {
          createUnionid: this.unionid,
          gzqztime1: this.form.gzqzrq[0] + "," + this.form.gzqzrq[1],
          gzqztime2: this.form.gzqzrq_two[0] + "," + this.form.gzqzrq_two[1],
          kssz1: this.form.swks + "," + this.form.xwks + "," + this.form.wsks,
          kssz2:
            this.form.swks_two +
            "," +
            this.form.xwks_two +
            "," +
            this.form.wsks_two,
          kxqztime1: this.form.kxqzrq[0] + "," + this.form.kxqzrq[1],
          kxqztime2: this.form.kxqzrq_two[0] + "," + this.form.kxqzrq_two[1],
          nextxsarrive2: this.form.xxqbdsj,
          schoolId: this.schoolId,
          showNj: [
            {
              bindname: this.form.xtnj_one,
              id: this.form.ddnjId_one,
              name: this.form.ddnj_one,
            },
            {
              bindname: this.form.xtnj_two,
              id: this.form.ddnjId_two,
              name: this.form.ddnj_two,
            },
            {
              bindname: this.form.xtnj_three,
              id: this.form.ddnjId_three,
              name: this.form.ddnj_three,
            },
            {
              bindname: this.form.xtnj_four,
              id: this.form.ddnjId_four,
              name: this.form.ddnj_four,
            },
            {
              bindname: this.form.xtnj_five,
              id: this.form.ddnjId_five,
              name: this.form.ddnj_five,
            },
            {
              bindname: this.form.xtnj_six,
              id: this.form.ddnjId_six,
              name: this.form.ddnj_six,
            },
          ],
          sksc1: this.form.swsc + "," + this.form.xwsc + "," + this.form.wssc,
          sksc2:
            this.form.swsc_two +
            "," +
            this.form.xwsc_two +
            "," +
            this.form.wssc_two,
          xjday1: this.form.zjxrsz.join(","),
          xjday2: this.form.zjxrsz_two.join(","),
          xsarrive1: this.form.xsbdsj,
          xsarrive2: this.form.xsbdsj_two,
          year: this.form.term,
          stanza1: this.form.stanza1,
          stanzaDate: this.form.stanzaDate,
          stanza2: this.form.stanza2,
          stanzaDate2: this.form.stanzaDate2,
        };
        main
          .add(val)
          .then((res) => {
            this.$message.success(res.data);
            this.getAllTerm();
            this.showAddClassDia = false;
          })
          .catch((err) => {
            this.$message.error(res.data);
          });
        console.log("val", val);
      } else {
        let val = {
          createUnionid: this.unionid,
          id: this.itemId,
          gzqztime1: this.form.gzqzrq[0] + "," + this.form.gzqzrq[1],
          gzqztime2: this.form.gzqzrq_two[0] + "," + this.form.gzqzrq_two[1],
          kssz1: this.form.swks + "," + this.form.xwks + "," + this.form.wsks,
          kssz2:
            this.form.swks_two +
            "," +
            this.form.xwks_two +
            "," +
            this.form.wsks_two,
          kxqztime1: this.form.kxqzrq[0] + "," + this.form.kxqzrq[1],
          kxqztime2: this.form.kxqzrq_two[0] + "," + this.form.kxqzrq_two[1],
          nextxsarrive2: this.form.xxqbdsj,
          schoolId: this.schoolId,
          showNj: [
            {
              bindname: this.form.xtnj_one,
              id: this.form.ddnjId_one,
              name: this.form.ddnj_one,
            },
            {
              bindname: this.form.xtnj_two,
              id: this.form.ddnjId_two,
              name: this.form.ddnj_two,
            },
            {
              bindname: this.form.xtnj_three,
              id: this.form.ddnjId_three,
              name: this.form.ddnj_three,
            },
            {
              bindname: this.form.xtnj_four,
              id: this.form.ddnjId_four,
              name: this.form.ddnj_four,
            },
            {
              bindname: this.form.xtnj_five,
              id: this.form.ddnjId_five,
              name: this.form.ddnj_five,
            },
            {
              bindname: this.form.xtnj_six,
              id: this.form.ddnjId_six,
              name: this.form.ddnj_six,
            },
          ],
          sksc1: this.form.swsc + "," + this.form.xwsc + "," + this.form.wssc,
          sksc2:
            this.form.swsc_two +
            "," +
            this.form.xwsc_two +
            "," +
            this.form.wssc_two,
          xjday1: this.form.zjxrsz.join(","),
          xjday2: this.form.zjxrsz_two.join(","),
          xsarrive1: this.form.xsbdsj,
          xsarrive2: this.form.xsbdsj_two,
          year: this.form.term,
          stanza1: this.form.stanza1,
          stanzaDate: this.form.stanzaDate,
          stanza2: this.form.stanza2,
          stanzaDate2: this.form.stanzaDate2,
        };
        if (this.isLock == 0) {
          main
            .edit(val)
            .then((res) => {
              this.$message.success(res.data);
              this.getAllTerm();
              this.showAddClassDia = false;
            })
            .catch((err) => {
              this.$message.error(res.data);
            });
        } else {
          this.getAllTerm();
          this.showAddClassDia = false;
        }
      }
    },
    //关闭学期表单
    closeXq() {
      this.showAddClassDia = false;
    },
    //点击添加学期
    addClass() {
      this.clearFrom();
      this.showAddClassDia = true;
      this.formType = 0;
    },
    handleClick() {},
    lock(item) {
      this.$confirm({
        title: "确定需要锁定吗?",
        content: "锁定后将不能修改，只可以查看了哦",
        cancelText: "取消",
        okText: "锁定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .edit({ id: item.id, islock: 1 })
            .then((res) => {
              this.getAllTerm();
              this.$message.success(res.data);
            })
            .catch((err) => {});
        },
      });
    },
    del(item) {
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .del({ id: item.id })
            .then((res) => {
              this.getAllTerm();
              this.$message.success(res.data);
            })
            .catch((err) => {});
        },
      });
    },
    clearFrom() {
      this.showAddClassDia = true;
      this.form.gzqzrq = "";
      this.form.stanza1 = 0;
      this.form.stanzaDate = "";
      this.form.stanza2 = 0;
      this.form.stanzaDate2 = "";
      this.form.gzqzrq_two = "";
      this.form.swks = "3节";
      this.form.xwks = "3节";
      this.form.wsks = "0节";
      this.form.swks_two = "3节";
      this.form.xwks_two = "3节";
      this.form.wsks_two = "0节";
      this.form.kxqzrq = "";
      this.form.kxqzrq_two = "";
      this.form.xxqbdsj = "";
      this.form.swsc = "40";
      this.form.xwsc = "45";
      this.form.wssc = "0";
      this.form.swsc_two = "40";
      this.form.xwsc_two = "45";
      this.form.wssc_two = "0";
      this.form.zjxrsz = ["星期一", "星期二", "星期三", "星期四", "星期五"];
      this.form.zjxrsz_two = ["星期一", "星期二", "星期三", "星期四", "星期五"];
      this.form.xsbdsj = "";
      this.form.xsbdsj_two = "";
      this.form.term = "";
      this.form.xtnj_one = "一年级";
      this.form.ddnjId_one = "";
      this.form.ddnj_one = "";
      this.form.xtnj_two = "二年级";
      this.form.ddnjId_two = "";
      this.form.ddnj_two = "";
      this.form.xtnj_three = "三年级";
      this.form.ddnjId_three = "";
      this.form.ddnj_three = "";
      this.form.xtnj_four = "四年级";
      this.form.ddnjId_four = "";
      this.form.ddnj_four = "";
      this.form.xtnj_five = "五年级";
      this.form.ddnjId_five = "";
      this.form.ddnj_five = "";
      this.form.xtnj_six = "六年级";
      this.form.ddnjId_six = "";
      this.form.ddnj_six = "";
    },
    edit(item) {
      this.isLock = item.islock;
      this.form.stanza1 = item.stanza1;
      this.form.stanzaDate = item.stanzaDate;
      this.form.stanza2 = item.stanza2;
      this.form.stanzaDate2 = item.stanzaDate2;
      this.itemId = item.id;
      this.formType = 1;
      console.log("item", item);
      this.showAddClassDia = true;
      this.form.gzqzrq = item.gzqztime1.split(",");
      this.form.gzqzrq_two = item.gzqztime2.split(",");
      this.form.swks = item.kssz1.split(",")[0];
      this.form.xwks = item.kssz1.split(",")[1];
      this.form.wsks = item.kssz1.split(",")[2];
      this.form.swks_two = item.kssz2.split(",")[0];
      this.form.xwks_two = item.kssz2.split(",")[1];
      this.form.wsks_two = item.kssz2.split(",")[2];
      this.form.kxqzrq = item.kxqztime1.split(",");
      this.form.kxqzrq_two = item.kxqztime2.split(",");
      this.form.xxqbdsj = item.nextxsarrive2;
      this.form.swsc = item.sksc1.split(",")[0];
      this.form.xwsc = item.sksc1.split(",")[1];
      this.form.wssc = item.sksc1.split(",")[2];
      this.form.swsc_two = item.sksc2.split(",")[0];
      this.form.xwsc_two = item.sksc2.split(",")[1];
      this.form.wssc_two = item.sksc2.split(",")[2];
      this.form.zjxrsz = item.xjday1.split(",");
      this.form.zjxrsz_two = item.xjday2.split(",");
      this.form.xsbdsj = item.xsarrive1;
      this.form.xsbdsj_two = item.xsarrive2;
      this.form.term = item.year;
      this.form.xtnj_one = item.showNj[0].bindname;
      this.form.ddnjId_one = item.showNj[0].id;
      this.form.ddnj_one = item.showNj[0].name;
      this.form.xtnj_two = item.showNj[1].bindname;
      this.form.ddnjId_two = item.showNj[1].id;
      this.form.ddnj_two = item.showNj[1].name;
      this.form.xtnj_three = item.showNj[2].bindname;
      this.form.ddnjId_three = item.showNj[2].id;
      this.form.ddnj_three = item.showNj[2].name;
      this.form.xtnj_four = item.showNj[3].bindname;
      this.form.ddnjId_four = item.showNj[3].id;
      this.form.ddnj_four = item.showNj[3].name;
      this.form.xtnj_five = item.showNj[4].bindname;
      this.form.ddnjId_five = item.showNj[4].id;
      this.form.ddnj_five = item.showNj[4].name;
      this.form.xtnj_six = item.showNj[5].bindname;
      this.form.ddnjId_six = item.showNj[5].id;
      this.form.ddnj_six = item.showNj[5].name;
    },
    change_one() {
      this.xtdd_Opt.map((item) => {
        if (item.name == this.form.ddnj_one) {
          this.form.ddnjId_one = item.id;
        }
      });
    },
    change_two() {
      this.xtdd_Opt.map((item) => {
        if (item.name == this.form.ddnj_two) {
          this.form.ddnjId_two = item.id;
        }
      });
    },
    change_three() {
      this.xtdd_Opt.map((item) => {
        if (item.name == this.form.ddnj_three) {
          this.form.ddnjId_three = item.id;
        }
      });
    },
    change_four() {
      this.xtdd_Opt.map((item) => {
        if (item.name == this.form.ddnj_four) {
          this.form.ddnjId_four = item.id;
        }
      });
    },
    change_five() {
      this.xtdd_Opt.map((item) => {
        if (item.name == this.form.ddnj_five) {
          this.form.ddnjId_five = item.id;
        }
      });
    },
    change_six() {
      this.xtdd_Opt.map((item) => {
        if (item.name == this.form.ddnj_six) {
          this.form.ddnjId_six = item.id;
        }
      });
    },
  },
  created() {
    this.getTwTable();
    this.getAllTerm();
    // this.getTermList();
    this.getAllNj();
    this.getAllXk();
    this.getAllcjdw();
  },
};
</script>

<style scoped>
.contain {
  padding: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.gradeClass_contain {
  width: 300px;
  height: 200px;
  border: 1px solid #c8c8c8;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 30px;
  position: relative;
}
.jia {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #c8c8c8;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #c8c8c8;
  margin-top: 10px;
}
.gradeClass_contain_list {
  width: 300px;
  height: 200px;
  border: 1px solid #c8c8c8;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 20px;
  margin-bottom: 30px;
  position: relative;
}
.item_bottom_btn {
  border-top: 1px solid #e6e6e6;
  border-radius: 0 0 20px 20px;
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  background-color: #fafafa;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.inp {
  width: 300px;
}
/deep/.el-divider {
  background-color: #8aceff;
}
.wid {
  width: 400px;
}
.ks_contain {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.ks_top {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.ks_bottom {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.njbd {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 15px;
}
.xksz_contain {
  width: 300px;
  min-height: 645px;
  padding: 20px;
  border: 1px solid #c8c8c8;
}
.xksz_contain1 {
  width: 300px;
  min-height: 645px;
  padding: 20px;
  border: 1px solid #c8c8c8;
}
</style>
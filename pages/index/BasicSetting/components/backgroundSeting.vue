<template>
  <div class="contain">
    <div class="left">
      <img
        style="width: 400px; height: 800px; z-index: 2"
        src="../../../../assets/img/phone.jpg"
      />
      <img
        class="grade"
        style="width: 290px; height: 540px; z-index: 8"
        src="../../../../assets/img/grade.jpg"
      />
      <img
        v-show="url"
        class="bgk"
        style="width: 353px; height: 730px; z-index: 3"
        :src="url"
      />
    </div>
    <div class="right">
      <span>背景图片上传:</span>
      <el-upload
        style="margin-left: 20px"
        action="http://103.219.33.112:10010/upload"
        name="imgFile"
        :on-success="upSuccess"
        :show-file-list="false"
      >
        <el-button size="small" type="primary">上传图片</el-button>
        <div slot="tip" class="el-upload__tip">
          建议上传图片尺寸为：600x1300px
        </div>
      </el-upload>
      <el-button type="warning" size="small" style="height: 30px" @click="clear"
        >清空</el-button
      >
    </div>
  </div>
</template>

<script>
import main from "@/api/school";
export default {
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  data() {
    return { fileList: [], urlData: "", url: "" };
  },
  methods: {
    //!清空

    clear() {
      main
        .edit({
          groundFile:
            " http://103.219.33.112:10010/uploadpic/b6dd5fd0-c91d-4107-8908-d88ba8408c9a.jpg",
          id: this.schoolId,
        })
        .then((res) => {
          this.$message.success("清空图片成功!");
          this.getBgk();
        })
        .catch((err) => {});
    },
    //!上传成功后回调
    upSuccess(res, file, fileList) {
      this.urlData = res.data;
      main
        .edit({ groundFile: this.urlData, id: this.schoolId })
        .then((res) => {
          this.$message.success("上传图片成功!");
          this.getBgk();
        })
        .catch((err) => {});
    },
    getBgk() {
      main
        .list({ schoolId: this.schoolId })
        .then((res) => {
          this.fileList = [];
          this.url = res.data.schools[0].groundFile;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getBgk();
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
  width: 420px;
}
.right {
  width: 600px;
  display: flex;
  flex-direction: row;
}

.grade {
  position: absolute;
  top: 140px;
  left: 70px;
}
.bgk {
  position: absolute;
  border-radius: 15px;
  top: 72px;
  left: 37px;
}
</style>
<template>
  <div>
    <Pomodoro> </Pomodoro>
    <el-popover placement="top" width="600px" trigger="click" title="创建">
      <el-form>
        <el-form-item label="时长">
          <el-input type="number" v-model="inputValue.workDuration"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select label="重复次数" v-model="inputValue.totalPomodoro">
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            label="休息时长"
            type="number"
            v-model="inputValue.restDuration"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="createTomato">创建</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
      <el-button slot="reference">创建番茄钟</el-button>
    </el-popover>
    <el-popover placement="top" width="400" trigger="click" title="设置">
      <el-form>
        <el-form-item label="颜色起点">
          <el-input v-model="startColor"></el-input>
        </el-form-item>
        <el-form-item label="颜色终点">
          <el-input v-model="stopColor"></el-input>
        </el-form-item>
        <el-form-item label="背景色">
          <el-input v-model="innerStrokeColor"></el-input>
        </el-form-item>
        <el-form-item label="番茄钟宽度">
          <el-select v-model="strokeWidth"> </el-select>
        </el-form-item>
        <el-form-item label="文字颜色">
          <el-input v-model="innerTextColor"> </el-input>
        </el-form-item>
      </el-form>
      <el-button slot="reference">设置</el-button>
    </el-popover>
    <el-popover placement="top" width="400" trigger="click" title="总结">
      <el-form>
        <el-form-item>
          <el-input type="textarea" v-model="summary"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
      <el-button slot="reference">写总结</el-button>
    </el-popover>
  </div>
</template>

<script>
import Pomodoro from "@/components/tomatoClock";
export default {
  data() {
    return {
      userId: Number,
      token: String,
      diameter: 300,
      totalPomodoro: 4,
      startColor: "#CCFFFF",
      stopColor: "#99CCCC",
      innerStrokeColor: "#0099CC",
      strokeWidth: 10,
      innerTextColor: "	#FF6666",
      inputValue: {
        totalPomodoro: Number,
        workDuration: Number,
        restDuration: Number
      },
      summary: String
    };
  },
  components: {
    Pomodoro
  },
  created() {
    this.userId = this.$cookies.get("userId");
    this.token = this.$cookies.get("token");
  },
  methods: {
    createPomodoro() {
      let tomatoData = {
        userId: this.userId,
        tomatoClockId: 0,
        todoId: 0,
        type: 0,
        singelDuration: this.workDuration,
        singelRestDuration: this.restDuration,
        beginTime: new Date().getTime(),
        repeatTimes: this.totalPomodoro,
        summary: null,
        bgmUrl: null
      };
      this.axios({
        method: "post",
        url: "/api/tomatoes",
        data: JSON.stringify(tomatoData),
        headers: {
          "Content-Type": "application/json",
          authorization: this.userId + "_" + this.token
        }
      })
        .then(response => {
          if (response.data.code == 0) {
            this.totalPomodoro = this.inputValue.totalPomodoro;
            this.workDuration = this.inputValue.workDuration;
            this.restDuration = this.inputValue.restDuration;
          } else {
            this.$message.error("似乎出问题了");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    submit() {
      console.log("comit");
    }
  }
};
</script>

<style scoped></style>

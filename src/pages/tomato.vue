<template>
  <div>
    <div class="clock">
      <el-progress type="circle" :percentage="100" :width="250"> </el-progress>
    </div>
    <div class="left-time">
      <el-form :inline="true" :model="time">
        <el-form-item label="时："></el-form-item>
        <el-form-item label="分：" v-model="time.hour"></el-form-item>
        <el-form-item label="秒：" v-model="time.minite"></el-form-item>
        <el-form-item v-model="time.second"></el-form-item>
      </el-form>
      <div class="hours">{{ tomato.singleDuration }}时</div>
      <div class="minute">{{ tomato.singleDuration }}分</div>
      <div class="second">{{ tomato.singleDuration }}秒</div>
    </div>
    <div class="buttons">
      <el-popconfirm title="确定暂停吗？">
        <el-button slot="reference">暂停</el-button>
      </el-popconfirm>
      <el-popconfirm title="确定停止吗？">
        <el-button slot="reference">停止</el-button>
      </el-popconfirm>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: "",
      tomato: {
        userId: 0,
        tomatoClockId: 0,
        todoId: 0,
        theme: "",
        type: 0,
        singleDuration: 5,
        singleRestDuration: 5,
        beginTime: null,
        repeatTimes: 0,
        summary: null,
        bgmUrl: ""
      },
      addTomato: false,
      time: {
        hour: 10,
        minute: 10,
        second: 10
      },
      durations: [
        {
          value: 1,
          label: "1min"
        },
        {
          value: 5,
          label: "5min"
        },
        {
          value: 10,
          label: "10min"
        },
        {
          value: 20,
          label: "30min"
        },
        {
          value: 30,
          label: "30min"
        },
        {
          value: 45,
          label: "45min"
        },
        {
          value: 60,
          label: "60min"
        },
        {
          value: 120,
          label: "120min"
        }
      ]
    };
  },
  created() {
    this.tomato.userId = this.$cookies.get("userId");
    this.token = this.$cookies.get("token");
  },
  methods: {}
};
</script>

<style scoped>
.clock {
  height: 250px;
  background-color: aqua;
}
.left-time {
  height: 80px;
  background-color: blueviolet;
}
.buttons {
  height: 80px;
  background-color: bisque;
}
</style>

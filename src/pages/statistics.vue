<template>
  <div class="echarts-box" :id="id"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: ["options", "id"],
  mounted: function() {
    var myChart = echarts.init(document.getElementById(this.id));
    myChart.setOption(this.options);
  }
};
</script>

<style scoped>
.echarts-box {
  width: 100%;
  height: 100%;
}
</style>

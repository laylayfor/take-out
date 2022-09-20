<template>
  <div class="echarts" ref="echartsRef"></div>
</template>

<script>
// import * as echarts from "echarts";
export default {
  props: {
    echartsData: {
      type: Object,
      default: {},
    },
  },

  methods: {
    echartsFun() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$refs.echartsRef);
      //   console.log("this.echartsData", this.echartsData);
      let option = {
        title: {
          text: this.echartsData.title,
          left: 15,
          top: 15,
        },
        tooltip: {
          trigger: "axis",
          top: 15,
        },
        legend: {
          data: this.echartsData.legend,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.echartsData.xdata,
        },
        yAxis: {
          type: "value",
        },
        series: this.echartsData.series,
      };

      // 绘制图表
      this.myChart.setOption(option);
      window.addEventListener("resize", this.myChart.resize);
    },
  },
  mounted() {
    this.echartsFun();
    // console.log("mounted", this.echartsData);
  },
  destroyed() {
    window.removeEventListener("resize", this.myChart.resize);
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  margin-top: 30px;
  width: 100%;
  height: 300px;
  background-color: $white;
}
</style>

<template>
	<div>
		<el-card>
			<div class="header" slot="header">
				<span>商品统计</span>
			</div>
			<!-- 搜索表单 -->
			<div class="search">
				时间范围
				<el-date-picker
					size="mini"
					v-model="date"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					format="yyyy-MM-dd HH:mm:ss"
					value-format="yyyy-MM-dd HH:mm:ss"
				>
				</el-date-picker>
				<el-button @click="getData()" size="mini" type="primary"
					>查询</el-button
				>
			</div>
			<!-- 图表 -->
			<div class="theEcharts" ref="chartRef"></div>
		</el-card>
	</div>
</template>

<script>
import { totalDataReq } from '@/api/order'
import { formatDate } from '@/filters'
// import * as echarts from "echarts";
export default {
	data() {
		return {
			date: [],
		}
	},
	// 方法
	methods: {
		async getData() {
			let date = JSON.stringify(this.date)
			let res = await totalDataReq({ date })
			//   console.log(res);
			let { data } = res.data
			let xData = data.map((v) => formatDate(v.orderTime))
			//   console.log(xData);
			let yData = data.map((v) => v.orderAmount)
			// 绘图
			this.renderChart(xData, yData)
		},
		// 绘图函数
		renderChart(xData, yData) {
			this.myCahrt = echarts.init(this.$refs.chartRef)
			let option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999',
						},
					},
				},
				toolbox: {
					feature: {
						dataView: { show: true, readOnly: false },
						magicType: { show: true, type: ['line', 'bar'] },
						restore: { show: true },
						saveAsImage: { show: true },
					},
				},
				legend: {
					//   data: ["Evaporation", "Precipitation", "Temperature"],
				},
				xAxis: [
					{
						type: 'category',
						data: xData,
						axisPointer: {
							type: 'shadow',
						},
					},
				],
				yAxis: [
					{
						type: 'value',
					},
				],
				series: [
					{
						// name: "Precipitation",
						type: 'bar',
						tooltip: {
							valueFormatter: function (value) {
								return value + ' ml'
							},
						},
						data: yData,
					},
				],
			}
			this.myCahrt.setOption(option)
			// 适配
			window.addEventListener('resize', this.myCahrt.resize)
		},
	},
	created() {
		this.getData()
	},
	destroyed() {
		window.removeEventListener('resize', this.myCahrt.resize)
	},
}
</script>

<style lang="scss" scoped>
.el-date-editor {
	margin: 0 10px;
}
.search {
	min-width: 548px;
}
.theEcharts {
	width: 100%;
	height: 300px;
	margin-top: 30px;
}
</style>

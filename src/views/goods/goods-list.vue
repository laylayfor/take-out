<template>
	<div>
		<el-card>
			<div class="header" slot="header">
				<span>商品列表</span>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form
							label-position="left"
							inline
							class="demo-table-expand"
						>
							<el-form-item label="商品ID">
								<span>{{ props.row.id }}</span>
							</el-form-item>
							<el-form-item label="商品名称">
								<span>{{ props.row.name }}</span>
							</el-form-item>
							<el-form-item label="所属分类">
								<span>{{ props.row.category }}</span>
							</el-form-item>
							<el-form-item label="商品价格">
								<span>{{ props.row.price }}</span>
							</el-form-item>
							<el-form-item label="商品图片">
								<span>{{ props.row.price }}</span>
							</el-form-item>
							<el-form-item label="创建时间">
								<span>{{
									props.row.ctime | formatDate()
								}}</span>
							</el-form-item>
							<el-form-item label="商品评价">
								<span>{{ props.row.rating }}</span>
							</el-form-item>
							<el-form-item label="商品销量">
								<span>{{ props.row.sellCount }}</span>
							</el-form-item>
							<el-form-item label="商品描述">
								<span>{{ props.row.goodsDesc }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>

				<el-table-column label="商品名称" prop="name">
				</el-table-column>
				<el-table-column label="所属分类" prop="category">
				</el-table-column>
				<el-table-column label="商品价格" prop="price">
				</el-table-column>
				<el-table-column label="商品图片">
					<template slot-scope="scope">
						<el-image :src="scope.row.imgUrl"></el-image>
					</template>
				</el-table-column>
				<el-table-column label="商品描述" prop="goodsDesc">
				</el-table-column>
			</el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="pageSize"
				layout="total,  prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
import { getGoodsListReq } from '@/api/goods';
import { formatDate } from '@/filters/index';
import { color } from 'echarts';
export default {
	data() {
		return {
			tableData: [],
			currentPage: 1,
			pageSize: 5,
			total: '',
			API: 'http://localhost:5000//upload/imgs/goods_img/',
		};
	},
	methods: {
		// 获取数据
		async getData() {
			let currentPage = this.currentPage;
			let pageSize = this.pageSize;
			// 发送请求
			let res = await getGoodsListReq({ currentPage, pageSize });
			// 解构数据
			let { data, total } = res.data;
			let data1 = data.map((v) => {
				// console.log('v.imgUrl.substr(23) :>> ', v.imgUrl.substr(23));
				// let imgUrl = v.imgUrl.substr(23);
				let imgUrl =
					this.API + v.imgUrl.substr(v.imgUrl.lastIndexOf('/') + 1);
				return { ...v, imgUrl };
			});

			// 数据赋值
			this.tableData = data1;
			this.total = total;
			// console.log('res :>> ', res);
		},
		// 改变页面
		handleCurrentChange(val) {
			// console.log('改变页面');
			// 将页码重新赋值
			this.currentPage = val;
			// 重新拉取数据

			this.getData(this.tableData);
		},
	},
	created() {
		this.getData();
	},
};
</script>

<style lang="scss" scoped>
.demo-table-expand {
	font-size: 0;
}
.demo-table-expand label {
	width: 90px;
	color: #99a9bf;
}
.demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 50%;
}
:deep(.el-form-item) {
	width: 50%;
}
img {
	width: 100px;
	height: 100px;
}
</style>

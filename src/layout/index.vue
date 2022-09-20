<template>
	<div class="layout">
		<!-- 左侧导航栏 -->
		<left-menu></left-menu>
		<!-- 中心内容 -->
		<div class="right-main">
			<right-header></right-header>
			<div class="content">
				<!-- 二级路由出口 -->
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import LeftMenu from './LeftMenu.vue'
import RightHeader from './RightHeader.vue'
export default {
	components: {
		LeftMenu,
		RightHeader,
	},
}
</script>

<style lang="scss" scoped>
.layout {
	display: flex;
	height: 100%;

	.right-main {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-width: 530px;

		.content {
			flex: 1;
			padding: 15px;
			overflow-y: scroll;
		}
	}
}
</style>

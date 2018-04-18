<template>
	<div>
		<nav-header></nav-header>
		<nav-bread>
			<span>GoodsDetail</span>
		</nav-bread>
		<el-row :gutter='20'>
			 <el-col :span="8" :offset="offset">
				<div class="productImgWrapper">
					<img src="../../build/logo.png" style="width: 100%;height: 100%;"/>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="productEditWrapper"></div>
			</el-col>
		</el-row>
		<nav-footer></nav-footer>
	</div>
</template>

<script>
	import NavHeader from '@/components/NavHeader'
	import NavFooter from '@/components/NavFooter'
	import NavBread from '@/components/NavBread'
	export default{
		data(){
			return {
				offset:2,
				id:''
			}
		},
		mounted(){
			this.id = this.$route.query.id;
		},
		components:{
			NavHeader,
			NavFooter,
			NavBread
		}
	}
</script>

<style>
.productImgWrapper{
	background-color: lightpink;
	height: 400px;
}
.productEditWrapper{
	height: 400px;
	background-color: red;
}
</style>
<template>
	<div>
		<nav-header></nav-header>
		<nav-bread>
			<span>GoodsDetail</span>
		</nav-bread>
		<el-row :gutter='20'>
			 <el-col :span="8" :offset="offset">
				<div class="productImgWrapper">
					<img v-lazy="'../../static/'+goodsData.productImage" style="width: 100%;height: 100%;"/>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="productEditWrapper"></div>
			</el-col>
		</el-row>
		<div class="nav-breadcrumb-wrap" style="margin: 40px 0;">
		  <div class="container" style="margin: 0 8%;">
		    <nav class="nav-breadcrumb">
		      <a href="javascript:void(0);">Detail</a>
		      <slot></slot>
		    </nav>
		  </div>
		</div>
		<el-row :gutter='20'>
			 <el-col :span="16" :offset="offset2">
				<div class="detail-wrap">
					{{goodsData.productDetail}}
				</div>
			</el-col>
		</el-row>
		<el-row :gutter='20'>
			 <el-col :span="16" :offset="offset2">
				<div>
					<img v-for="item in goodsData.productDetailImg" v-lazy="'../../static/productImg/'+item.url" style="width: 100%;height: 100%;"/>
				</div>
			</el-col>
		</el-row>
		<nav-footer></nav-footer>
	</div>
</template>

<script>
	import NavHeader from '@/components/NavHeader'
	import NavFooter from '@/components/NavFooter'
	import NavBread from '@/components/NavBread'
	import axios from 'axios'
	export default{
		data(){
			return {
				goodsData:{},
				offset:2,
				offset2:4
			}
		},
		mounted(){
			axios.get('/goods/getProductDetail',{
				params:{
					id:this.$route.query.id
				}
			}).then((resp) =>{
				let res = resp.data.result;
				this.goodsData = res;
				console.log(res);
			})
		},
		components:{
			NavHeader,
			NavFooter,
			NavBread
		}
	}
</script>

<style scoped>
.productImgWrapper{
	box-shadow: 0 0 5px;
	height: 400px;
}
.productEditWrapper{
	height: 400px;
	background-color: red;
}
.detail-wrap{
	font-size: 20px;
	word-break:break-all;
	
}
</style>
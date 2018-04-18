<template>
  <el-carousel :interval="3000" type="card" height="500px" >
    <el-carousel-item v-for="item in img" :key="item._id">
      <img :src="'./../../static/banner/'+item.url" style="width: 100%;height: 100%;"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			return {
				img:[]
			}
		},
		mounted(){
			axios.get('/bannerList/getList')
			.then((resp)=>{
				let res = resp.data.result;
				this.img = res;
			})
		}
	}
</script>

<style>
</style>
<template>
	<div>
		<el-container :style="{'height': innerHeight,'border': '1px solid #eee'}">
		   <transition name="el-zoom-in-center">
				<el-aside width="200px" style="background-color: #0D1206;" v-show="show">
			     	<el-menu
			     	  @select="select"
					  default-active="adminData"
					  class="el-menu-vertical-demo"
					  @open="handleOpen" 
					  @close="handleClose"
					  background-color="#0D1206"
					  text-color="#fff"
					  active-text-color="#ffd04b">
					  <el-menu-item index="adminData">
				        <i class="el-icon-menu"></i>
				        <span slot="title">数据统计</span>
				      </el-menu-item>
				      <el-menu-item index="goodsManage">
				        <i class="el-icon-goods"></i>
				        <span slot="title">商品管理</span>
				      </el-menu-item>
				      <el-menu-item index="goodsDetailManage">
				        <i class="el-icon-info"></i>
				        <span slot="title">商品详情管理</span>
				      </el-menu-item>
				      <el-menu-item index="usersManage">
				        <i class="el-icon-edit"></i>
				        <span slot="title">用户管理</span>
				      </el-menu-item>
				      <el-menu-item index="orderManage">
				        <i class="el-icon-tickets"></i>
				        <span slot="title">订单管理</span>
				      </el-menu-item>
				      <el-menu-item index="bannerManage">
				        <i class="el-icon-setting"></i>
				        <span slot="title">广告管理</span>
				      </el-menu-item>
				      <el-menu-item index="shippingMethodsManage">
				        <i class="el-icon-d-arrow-right"></i>
				        <span slot="title">配送管理</span>
				      </el-menu-item>
				    </el-menu>
				</el-aside>
     	   </transition>
		  
		  
		  <el-container>
		    <el-header style="text-align: right; font-size: 18px">
		    	  <i :class="{'el-icon-back':show}" style="float: left;margin-top: 20px; cursor: pointer;line-height: 20px;" v-text="text" @click="asideDisplay"></i>
			      <span style="margin-right: 8px;">
			      	{{userName}}
			      </span>
			      <el-dropdown @command="handleCommand">
			        <i class="el-icon-setting" style="margin-right: 15px"></i>
			        <el-dropdown-menu slot="dropdown">
			          <el-dropdown-item command='logout'>Log out</el-dropdown-item>
			        </el-dropdown-menu>
			      </el-dropdown>
		    </el-header>
			<data-statistics :init="dataInit"></data-statistics>
			<goods-manage :init="dataInit"></goods-manage>
			<users-manage :init="dataInit"></users-manage>
			<order-manage :init="dataInit"></order-manage>
			<banner-manage :init="dataInit"></banner-manage>
			<shipping-methods-manage :init="dataInit"></shipping-methods-manage>
			<goods-detail-manage :init="dataInit"></goods-detail-manage>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
	import './../../assets/css/base.css'
	import DataStatistics from '@/components/admin/DataStatistics'
	import GoodsManage from '@/components/admin/GoodsManage'
	import UsersManage from '@/components/admin/UsersManage'
	import OrderManage from '@/components/admin/OrderManage'
	import BannerManage from '@/components/admin/BannerManage'
	import ShippingMethodsManage from '@/components/admin/ShippingMethodsManage'
	import GoodsDetailManage from '@/components/admin/GoodsDetailManage'
	import axios from 'axios'
	export default{
	    data() {
	      return {
	        innerHeight:'',
	        userName:'',
	        dataInit:'',
	        show:true,
	        text:''
	      }
	    },
	    mounted(){
	    	this.innerHeight = document.documentElement.clientHeight+'px';
	    	console.log(this.innerHeight)
	    	this.login();
	    	this.select('adminData','adminData');
	    },
	    methods:{
	    	login(){
	    		if(!this.getCookie('adminId')){
	    			this.$router.push('/adminLogin');
	    			
	    		}else{
	    			axios.post('/admin/login',{
		    			userId:this.getCookie('adminId')
			    	}).then((resp)=>{
			    		let res = resp.data;
			    		this.userName = res.result.userName;
			    	})
	    		}
	    		
	    	},
	    	handleCommand(command){
	    		axios.post('/admin/logout').then((res)=>{
	    			console.log(res.data.msg);
	    			if(res.data.status == 0){
	    				this.login();
	    			}
	    		})
	    	},
	    	getCookie(name){
				let arr;
		        let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		        if (arr = document.cookie.match(reg)){
		        	return unescape(arr[2]);
		        }else{
		        	return null;
		        }
		         
			},
			handleOpen(key, keyPath) {
		        console.log(key, keyPath);
		    },
		    handleClose(key, keyPath) {
		        console.log(key, keyPath);
		    },
		    select(index,indexPath){
		    	this.dataInit = index;
		    },
		    asideDisplay(){
		    	this.show = !this.show;
		    	if(this.text == ''){
		    		this.text = '三';
		    	}else{
		    		this.text = ''
		    	}
		    }
	    },
	    components:{
	    	DataStatistics,
	    	GoodsManage,
	    	UsersManage,
	    	OrderManage,
	    	BannerManage,
	    	ShippingMethodsManage,
	    	GoodsDetailManage
	    }
	}
</script>

<style scoped>
  .el-header {
    background-color: white;
    box-shadow: 0 0 8px;
    z-index: 1000;
    color: #333;
    line-height: 60px;
  }
    .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-menu{
  	border: 0;
  }

</style>
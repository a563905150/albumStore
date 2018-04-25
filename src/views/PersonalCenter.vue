<template>
	<div>
		<nav-header></nav-header>
		<nav-bread>
			<span>个人中心</span>
		</nav-bread>
		<el-row>
			<el-col :span="20" :offset="offset">
				<div class="centerWrapper">
					<el-container>
						<el-aside width="200px">
							<el-menu
						      default-active="resetPwd"
						      class="el-menu-vertical-demo"
						      @select="select">
						      <el-menu-item index="resetPwd">
						        <i class="el-icon-menu"></i>
						        <span slot="title">修改密码</span>
						      </el-menu-item>
						      <el-menu-item index="myOrder">
						        <i class="el-icon-document"></i>
						        <span slot="title">查看订单</span>
						      </el-menu-item>
						      <el-menu-item index="addrManage">
						        <i class="el-icon-setting"></i>
						        <span slot="title">地址管理</span>
						      </el-menu-item>
						    </el-menu>
						</el-aside>
						<reset-pwd :init="initDate"></reset-pwd>
						<addr-manage :init="initDate"></addr-manage>
						<my-order :init="initDate"></my-order>
					</el-container>
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
	import ResetPwd from '@/components/personalCenter/ResetPwd'
	import AddrManage from '@/components/personalCenter/AddrManage'
	import MyOrder from '@/components/personalCenter/MyOrder'
	import axios from 'axios'
	export default{
		data(){
			return {
				offset:2,
				initDate:''
			}
		},
		mounted(){
			this.select('resetPwd','resetPwd');
		},
		methods:{
			select(index){
				this.initDate = index;
			}
		},
		components:{
			NavHeader,
			NavFooter,
			NavBread,
			ResetPwd,
			AddrManage,
			MyOrder
		}
	}
</script>

<style>
.centerWrapper{
	box-shadow: 0 0 8px;
	margin-top: 25px;
	height: 500px;
}
.el-container{
	background-color: #fff;
	height: 100%;
}
.el-aside{
	border-right: solid 1px #e6e6e6;
	background-color: #fff;
	height: 100%;
}
.el-menu{
	border: 0;
}
</style>
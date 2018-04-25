<template>
	<div>
		<nav-header></nav-header>
		<nav-bread>
			<span>下单成功</span>
		</nav-bread>
		<div class="container">
		    <div class="page-title-normal">
		      <h2 class="page-title-h2"><span>check out</span></h2>
		    </div>
		    <!-- 进度条 -->
		    <div class="check-step">
		      <ul>
		        <li class="cur"><span>选&nbsp;择</span> 地&nbsp;址</li>
		        <li class="cur"><span>查&nbsp;看</span> 订&nbsp;单</li>
		        <li class="cur"><span>确&nbsp;认</span> 付&nbsp;款</li>
		        <li class="cur"><span>订&nbsp;单</span> 确&nbsp;认</li>
		      </ul>
		    </div>
		
		    <div class="order-create">
		      <div class="order-create-pic"><img src="../../static/ok-2.png" alt=""></div>
		      <div class="order-create-main">
		        <h3>感谢您的惠顾！ <br>您的订单正在处理中！</h3>
		        <p>
		          <span>订单号：{{orderId}}</span>
		          <span>订单总额：{{orderTotal}}</span>
		        </p>
		        <div class="order-create-btn-wrap">
		          <div class="btn-l-wrap">
		            <router-link class="btn btn--m" to="/cart">返回购物车列表</router-link>
		          </div>
		          <div class="btn-r-wrap">
		            <router-link  class="btn btn--m" to="/">返回商品列表</router-link>
		          </div>
		        </div>
		      </div>
		    </div>
  		</div>
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
				orderId:'',
				orderTotal:''
			}
		},
		mounted(){
			axios.get('/users/orderDetail',{
				params:{
					orderId:this.$route.query.orderId
				}
			}).then((resp)=>{
				let res = resp.data.result;
				console.log(res);
				this.orderId = res.orderId;
				this.orderTotal = res.orderTotal;
			})
		},
		components:{
			NavHeader,
			NavFooter,
			NavBread
		}
	}
</script>

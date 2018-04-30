<template>
  <div>
  	<nav-header></nav-header>
  	<nav-bread>
  		<router-link to="/cart">购物车</router-link>
			<router-link to="/address">选择地址</router-link>
  		<span>查看订单</span>
  	</nav-bread>
		<div>
		  <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		    <defs>
		      <symbol id="icon-add" viewBox="0 0 32 32">
		        <title>add2</title>
		        <path class="path1" d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"></path>
		      </symbol>
		      <symbol id="icon-ok" viewBox="0 0 39 32">
		        <title>ok</title>
		        <path class="path1" d="M14.084 20.656l-7.845-9.282c-1.288-1.482-3.534-1.639-5.016-0.351s-1.639 3.534-0.351 5.016l10.697 12.306c1.451 1.669 4.057 1.623 5.448-0.096l18.168-22.456c1.235-1.527 0.999-3.765-0.528-5.001s-3.765-0.999-5.001 0.528l-15.573 19.337z"></path>
		      </symbol>
		      <symbol id="icon-edit" viewBox="0 0 32 32">
		        <title>edit</title>
		        <path class="path1" d="M25.599 11.292l-4.892-4.892 3.825-3.825 4.892 4.892-3.825 3.825zM4.732 23.308l3.959 3.959-5.939 1.98 1.98-5.939zM10.666 26.225l-4.892-4.892 13.425-13.425 4.892 4.892-13.425 13.425zM31.687 6.713l-6.4-6.4c-0.417-0.417-1.091-0.417-1.508 0l-20.267 20.267c-0.114 0.115-0.191 0.25-0.242 0.393-0.003 0.009-0.012 0.015-0.015 0.025l-3.2 9.6c-0.128 0.383-0.029 0.806 0.257 1.091 0.203 0.204 0.476 0.313 0.754 0.313 0.112 0 0.227-0.017 0.337-0.054l9.6-3.2c0.011-0.003 0.017-0.013 0.027-0.016 0.142-0.052 0.276-0.128 0.39-0.242l20.267-20.267c0.417-0.416 0.417-1.091 0-1.508v0z"></path>
		      </symbol>
		      <symbol id="icon-delete" viewBox="0 0 26 32">
		        <title>delete</title>
		        <path class="path1" d="M17.723 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM7.877 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM12.8 28c0.543 0 0.985-0.448 0.985-1v-12c0-0.552-0.441-1-0.985-1s-0.984 0.448-0.984 1v12c0 0.552 0.441 1 0.984 1v0zM23.631 4h-5.908v-2c0-1.104-0.882-2-1.969-2h-5.908c-1.087 0-1.969 0.896-1.969 2v2h-5.908c-1.087 0-1.969 0.896-1.969 2v2c0 1.104 0.882 2 1.969 2v18c0 2.208 1.765 4 3.939 4h13.784c2.174 0 3.938-1.792 3.938-4v-18c1.087 0 1.969-0.896 1.969-2v-2c0-1.104-0.882-2-1.969-2v0zM9.846 3c0-0.552 0.441-1 0.984-1h3.938c0.544 0 0.985 0.448 0.985 1v1h-5.908v-1zM21.662 28c0 1.104-0.882 2-1.969 2h-13.784c-1.087 0-1.97-0.896-1.97-2v-18h17.723v18zM22.646 8h-19.692c-0.543 0-0.985-0.448-0.985-1s0.441-1 0.985-1h19.692c0.543 0 0.984 0.448 0.984 1s-0.441 1-0.984 1v0z"></path>
		      </symbol>
		      <symbol id="icon-clock" viewBox="0 0 32 32">
		        <title>clock</title>
		        <path class="path1" d="M29.333 16c0-7.364-5.97-13.333-13.333-13.333s-13.333 5.97-13.333 13.333c0 7.364 5.97 13.333 13.333 13.333s13.333-5.97 13.333-13.333v0 0 0 0 0 0zM0 16c0-8.837 7.163-16 16-16s16 7.163 16 16c0 8.837-7.163 16-16 16s-16-7.163-16-16zM14.667 14.667v1.333h2.667v-10.667h-2.667v9.333zM24 18.667h1.333v-2.667h-10.667v2.667h9.333z"></path>
		      </symbol>
		    </defs>
		  </svg>
		  <div class="container" v-loading="loading">
		    <div class="checkout-order">
		      <div class="page-title-normal">
		        <h2 class="page-title-h2"><span>check out</span></h2>
		      </div>
		      <!-- process step -->
		      <div class="check-step">
		        <ul>
		          <li class="cur"><span>选&nbsp;择</span> 地&nbsp;址</li>
		          <li class="cur"><span>查&nbsp;看</span> 订&nbsp;单</li>
		          <li><span>确&nbsp;认</span> 付&nbsp;款</li>
		          <li><span>订&nbsp;单</span> 确&nbsp;认</li>
		        </ul>
		      </div>
		
		      <!-- order list -->
		      <div class="page-title-normal checkout-title">
		        <h2><span>订&nbsp;单&nbsp;详&nbsp;情</span></h2>
		      </div>
		      <div class="item-list-wrap confirm-item-list-wrap">
		        <div class="cart-item order-item">
		          <div class="cart-item-head">
		            <ul>
		              <li>订&nbsp;单&nbsp;内&nbsp;容</li>
		              <li>价&nbsp;格</li>
		              <li>数&nbsp;量</li>
		              <li>总&nbsp;价</li>
		            </ul>
		          </div>
		          <ul class="cart-item-list">
		            <li v-for="item in cartList" v-if="item.checked==1">
		              <div class="cart-tab-1">
		                <div class="cart-item-pic">
		                  <img :src="'./../../static/'+item.productImage" alt="">
		                </div>
		                <div class="cart-item-title">
		                  <div class="item-name">{{item.productName}}</div>
		
		                </div>
		              </div>
		              <div class="cart-tab-2">
		                <div class="item-price">{{item.salePrice|currency("$")}}</div>
		              </div>
		              <div class="cart-tab-3">
		                <div class="item-quantity">
		                  <div class="select-self">
		                    <div class="select-self-area">
		                      <span class="select-ipt">×{{item.productNum}}</span>
		                    </div>
		                  </div>
		                  <div class="item-stock item-stock-no">In Stock</div>
		                </div>
		              </div>
		              <div class="cart-tab-4">
		                <div class="item-price-total">{{(item.salePrice*item.productNum)|currency("$")}}</div>
		              </div>
		            </li>
		          </ul>
		        </div>
		      </div>
		
		      <!-- Price count -->
		      <div class="price-count-wrap">
		        <div class="price-count">
		          <ul>
		            <li>
		              <span>商&nbsp;品&nbsp;总&nbsp;价:</span>
		              <span>{{subTotal|currency("$")}}</span>
		            </li>
		            <li>
		              <span>运&nbsp;&nbsp;费:</span>
		              <span>{{shipping|currency("$")}}</span>
		            </li>
		            <!--<li>
		              <span>Discount:</span>
		              <span>{{discount|currency("$")}}</span>
		            </li>
		            <li>
		              <span>Tax:</span>
		              <span>{{tax|currency("$")}}</span>
		            </li>-->
		            <li class="order-total-price">
		              <span>订&nbsp;单&nbsp;总&nbsp;价:</span>
		              <span>{{orderTotal|currency("$")}}</span>
		            </li>
		          </ul>
		        </div>
		      </div>
		
		      <div class="order-foot-wrap">
		        <div class="prev-btn-wrap">
		          <!--<button class="btn btn--m">Previous</button>-->
		          <router-link class="btn btn--m" to="/address">&nbsp;返&nbsp;回&nbsp;上&nbsp;一&nbsp;步&nbsp;</router-link>
		        </div>
		        <div class="next-btn-wrap">
		          <button class="btn btn--m btn--red" @click="payMent"> 确 认 付 款 </button>
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
export default {
		data(){
			return {
				cartList:[],
				subTotal:0,
				shipping:0,
//				discount:10,
//				tax:10,
				orderTotal:0,
				loading:false
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				this.loading = true;
				axios.get('/users/cartList').then((resp)=>{
					let res = resp.data.result;
					this.cartList = res;
					res.forEach((item)=>{
						if(item.checked == 1){
							this.subTotal += item.productNum*item.salePrice;
						}
					})
					this.shipping = parseInt(this.$route.query.shippingPrice);
					this.orderTotal = this.subTotal+this.shipping;
					setTimeout(()=>{
						this.loading = false;
					},500);
				})
			},
			payMent(){
				axios.post('/users/payMent',{
					orderTotal:this.orderTotal,
					addressId:this.$route.query.addressId,
					shippingMethodId:this.$route.query.shippingMethodId
				}).then((resp)=>{
					let res = resp.data;
					console.log(res.result);
					if(res.status==0){
						this.$router.push({
							path:'/orderSuccess?orderId='+res.result.orderId
						})
					}
				})
			}
		},
		components:{
			NavHeader,
			NavFooter,
			NavBread
		}
		
}
</script>


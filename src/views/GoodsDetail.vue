<template>
	<div>
		<nav-header></nav-header>
		<nav-bread>
			<span>GoodsDetail</span>
		</nav-bread>
		<el-row :gutter='20'>
			 <el-col :span="6" :offset="offset">
				<div class="productImgWrapper">
					<img v-lazy="'../../static/'+goodsData.productImage" style="width: 100%;height: 100%;"/>
				</div>
			</el-col>
			<el-col :span="14">
		        <div class="item-list-wrap" style="margin-top: 25px;">
		          <div class="cart-item">
		            <div class="cart-item-head">
		              <ul>
		                <li>Name</li>
		                <li>Price</li>
		                <li>Quantity</li>
		              </ul>
		            </div>
		            <ul class="cart-item-list">
		              <li>
		                <div class="cart-tab-1">
		                  <div class="cart-item-title">
		                    <div class="item-name" style="text-align: center;">{{goodsData.productName}}</div>
		                  </div>
		                </div>
		                <div class="cart-tab-2">
		                  <div class="item-price">{{goodsData.salePrice | currency('$')}}</div>
		                </div>
		                <div class="cart-tab-3">
		                  <div class="item-quantity">
		                    <div class="select-self select-self-open">
		                      <div class="select-self-area" style="position: relative;">
		                        <a class="input-sub" @click="decre" style="position: absolute;left: -15px;top: 0px;">-</a>
		                        <span class="select-ipt" style="position: absolute;left: 10px;top: 0px;">{{goodsData.productNum}}</span>
		                        <a class="input-add" @click="incre" style="position: absolute;right: -15px;top: 0px;">+</a>
		                      </div>
		                    </div>
		                  </div>
		                </div>
		              </li>
		            </ul>
		          </div>
		        </div>
		        <div class="cart-foot-wrap">
		          <div class="cart-foot-inner">
		            <div class="cart-foot-r">
		              <div class="item-total">
		                Item total: <span class="total-price">{{(goodsData.salePrice*goodsData.productNum) | currency('$')}}</span>
		              </div>
		              <div class="btn-wrap">
		                <a class="btn btn--red" @click="addCart">AddCart</a>
		              </div>
		            </div>
		          </div>
		        </div>
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
		<modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
	        <p slot="message">
	          <svg class="icon-status-ok">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
	          </svg>
	          <span>加入购物车成功!</span>
	        </p>
	        <div slot="btnGroup">
	          <router-link class="btn btn--m" href="javascript:;" to="/">返回商品列表</router-link>
	          <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
	        </div>
	      </modal>
	</div>
</template>

<script>
	import './../assets/css/checkout.css'
	import NavHeader from '@/components/NavHeader'
	import NavFooter from '@/components/NavFooter'
	import NavBread from '@/components/NavBread'
	import modal from '@/components/Modal'
	import axios from 'axios'
	export default{
		data(){
			return {
				goodsData:{},
				offset:2,
				offset2:4,
				mdShowCart:false
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
		methods:{
			decre(){
				if(this.goodsData.productNum == 1){
					return ;
				}else{
					this.goodsData.productNum--;
				}
			},
			incre(){
				this.goodsData.productNum++;
			},
			addCart(){
				axios.post('/goods/addCart',{
					_id:this.$route.query.id,
					productNum:this.goodsData.productNum
				}).then((resp) =>{
					let res = resp.data;
					if(res.status == 0){
						this.mdShowCart = true;
					}
				})
			},
			closeModal(){
				this.mdShowCart = false;
			}
		},
		components:{
			NavHeader,
			NavFooter,
			NavBread,
			modal
		}
	}
</script>

<style scoped>
.productImgWrapper{
	box-shadow: 0 0 5px;
	height: 300px;
}
.detail-wrap{
	font-size: 20px;
	word-break:break-all;
	
}
</style>
<template>
	<div>
		<nav-header :checkChange="checkChange"></nav-header>
		<nav-bread></nav-bread>
		<nav-banner></nav-banner>
		  <el-input placeholder="请输入要查询的商品信息" v-model="searchValue" clearable @change="toSearch">
		    <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
		  </el-input>
		<div class="accessory-result-page accessory-page">
		  <div class="container">
		    <div class="filter-nav">
		      <span class="sortby">排序方式:</span>
		      <a href="javascript:void(0)" class="default" :class="{'cur':defaultCur}" @click="toDefaultCur">默认</a>
		      <a href="javascript:void(0)" class="price" :class="{'cur':priceCur}" @click="sortGoods">价格 <img src="../assets/cc-arrow-down.svg" alt=""v-if="!sortFlag" /><img src="../assets/cc-arrow-up.svg" alt="" v-if="sortFlag"/></a>
		      <a href="javascript:void(0)" class="price" :class="{'cur':timeCur}" @click="TimeSort">最新 <img src="../assets/cc-arrow-down.svg" alt=""v-if="!timeSortFlag" /><img src="../assets/cc-arrow-up.svg" alt="" v-if="timeSortFlag"/></a>
		      <a href="javascript:void(0)" class="price" :class="{'cur':numCur}" @click="numSort">销量 <img src="../assets/cc-arrow-down.svg" alt=""v-if="!numSortFlag" /><img src="../assets/cc-arrow-up.svg" alt="" v-if="numSortFlag"/></a>
		      <a href="javascript:void(0)" class="filterby stopPop" @click="showFilter">筛 选</a>
		    </div>
		    <div class="accessory-result">
		      <!-- filter -->
		      <div class="filter stopPop" :class="{'filterby-show':filterBy}" id="filter">
		        <dl class="filter-price">
		          <dt>价格:</dt>
		          <dd><a href="javascript:void(0)":class="{cur:priceChecked=='all'}" @click="priceCheckedAndFilterHidden('all')">全部</a></dd>
		          <dd v-for="(value,index) in priceFilter">
		            <a href="javascript:void(0)" :class="{cur:priceChecked==index}" @click="priceCheckedAndFilterHidden(index)">{{value.startPrice|currency("$")}}—{{value.endPrice|currency("$")}}</a>
		          </dd>
		        </dl>
		        <dl class="filter-price">
		          <dt>主题:</dt>
		          <dd><a href="javascript:void(0)":class="{cur:themeChecked=='all'}" @click="themeCheckedAndFilterHidden('all')">全部</a></dd>
		          <dd v-for="(value,index) in productType">
		            <a href="javascript:void(0)" :class="{cur:themeChecked==index}" @click="themeCheckedAndFilterHidden(index)">{{value}}</a>
		          </dd>
		        </dl>
		      </div>
			  
		      <!-- search result accessories list -->
		      <div class="accessory-list-wrap">
		        <div class="accessory-list col-4">
		          <ul>
		            <li v-for="value in goodsList">
		              <div class="pic" @click="toGoodsDetail(value._id)">
		                <a href="javascript:void(0);"><img v-lazy="'../../static/product/'+value.productImage" alt=""></a>
		              </div>
		              <div class="main">
		                <div class="name">{{value.productName}}</div>
		                <div class="price">{{value.salePrice|currency("$")}}<span style="margin-left: 70px;">销量{{value.saleNum}}</span></div>
		                <div class="btn-area">
		                  <a href="javascript:void(0);" class="btn btn--m" @click="addCart(value._id)">加入购物车</a>
		                </div>
		              </div>
		            </li>
		          </ul>
		          	<div style="margin-left: 40%; margin-top: 20%;" v-if="noGoods">暂 无 商 品....</div>
					<el-pagination
					  v-show="!loading&&!noGoods"
					  background
					  :current-page="page"
					  @current-change="currentChange"
					  layout="prev, pager, next,total,jumper"
					  :page-size="pageSize"
					  :total="total"
					  style="display: inline-block;margin-left: 25%;">
					</el-pagination>
					<img src="../assets/loading-spinning-bubbles.svg" v-show="loading" style="margin-left: 40%;margin-top: 20%;"/>
		          <!--<div style="text-align: center;" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
  						<img src="../assets/loading-spinning-bubbles.svg" v-show="loading"/>
				  </div>-->
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
	      <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
	          <p slot="message">
	             	请先登录,否则无法加入到购物车中!
	          </p>
	          <div slot="btnGroup">
	              <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
	          </div>
	      </modal>
	      <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
	        <p slot="message">
	          <svg class="icon-status-ok">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
	          </svg>
	          <span>加入购物车成功!</span>
	        </p>
	        <div slot="btnGroup">
	          <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
	          <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
	        </div>
	      </modal>
		<div class="md-overlay" v-show="overLayFlag" @click="hiddenFilter"></div>
		<nav-footer></nav-footer>
	</div>
</template>

<script>
	import './../assets/css/base.css'
	import './../assets/css/product.css'
	import NavHeader from '@/components/NavHeader'
	import NavFooter from '@/components/NavFooter'
	import NavBread from '@/components/NavBread'
	import NavBanner from '@/components/NavBanner'
	import axios from 'axios'
	import modal from '@/components/Modal'
	export default{
		data(){
			return {
				goodsList:[],
				priceFilter:[
					{
						'startPrice':0.00,
						'endPrice':100.00
					},
					{
						'startPrice':100.00,
						'endPrice':200.00
					},
					{
						'startPrice':200.00,
						'endPrice':300.00
					},
					{
						'startPrice':300.00,
						'endPrice':500.00
					}
				],
				productType:[
					"爱 情 主 题",
					"儿 童 主 题",
					"家 庭 主 题",
					"婚 礼 主 题"
				],
				priceChecked: 'all',
				themeChecked:'all',
				filterBy: false,
				overLayFlag: false,
				sortFlag: true,
				timeSortFlag:true,
				numSortFlag:true,
				page: 1,
				pageSize: 8,
				defaultCur: true,
				priceCur: false,
				timeCur:false,
				numCur:false,
				busy: false,
				flag: false,
				loading: false,
				mdShow:false,
				mdShowCart:false,
				checkChange:'',
				searchValue:'',
				total:0,
				noGoods:false,
				sortPage:1
			}
		},
		components: {
			NavHeader,
			NavFooter,
			NavBread,
			modal,
			NavBanner
		},
		mounted:function (){
			this.getGoodsList();
		},
		methods: {
			getGoodsList(sort){
				this.noGoods = false;
				let params = {
					page: this.page,
					pageSize: this.pageSize,
					sort: sort || {'default':1},
					priceLevel: this.priceChecked,
					productType:this.themeChecked,
					searchValue:this.searchValue
				}
				this.goodsList = [];
				this.loading = true;
				setTimeout(()=>{
					axios.get('/goods/list',{
						params: params
					}).then((result)=>{
						this.total = result.data.result.total;
						this.loading = false;
						if(result.data.status == 0){
							var res = result.data.result;
//							if(this.flag){
//								this.goodsList = this.goodsList.concat(res.list);
//								if(res.count<this.pageSize){
//									this.busy = true;
//								}
//							}else{
//								this.goodsList = res.list;
//								this.flag = true;
//								this.busy = false;
//								 if(res.count<this.pageSize){
//									this.busy = true;
//								}
//							}
							this.goodsList = res.list;
							if(this.goodsList.length == 0){
								this.noGoods = true;
							}else{
								this.noGoods = false;
							}
						}else{
							console.log(result.msg);
						}
						
					})
				},600);
				
			},
			showFilter(){
				this.filterBy = true;
				this.overLayFlag = true;
			},
			hiddenFilter(){
				this.filterBy = false;
				this.overLayFlag = false;
			},
			priceCheckedAndFilterHidden(index){
				this.priceChecked=index;
				this.hiddenFilter();
				this.searchValue = '';
				this.flag = false;
				this.page = 1;
				this.getGoodsList();
			},
			themeCheckedAndFilterHidden(index){
				this.themeChecked=index;
				this.hiddenFilter();
				this.searchValue = '';
				this.page = 1;
				this.getGoodsList();
			},
			sortGoods(){
				this.sortFlag  = !this.sortFlag;
				this.searchValue = '';
				this.page = 1;
				this.getGoodsList({'priceSort':this.sortFlag});
				this.priceCur = true;
				this.defaultCur = false;
				this.timeCur = false;
				this.numCur = false;
				this.timeSortFlag = true;
				this.numSortFlag = true;
				this.sortPage = 2;
				this.flag = false;
			},
			TimeSort(){
				this.timeSortFlag = !this.timeSortFlag;
				this.searchValue = '';
				this.page = 1;
				this.getGoodsList({'timeSort':this.timeSortFlag});
				this.timeCur = true;
				this.defaultCur = false;
				this.priceCur = false;
				this.numCur = false;
				this.sortFlag = true;
				this.numSortFlag = true;
				this.sortPage = 3;
			},
			numSort(){
				this.numSortFlag = !this.numSortFlag;
				this.searchValue = '';
				this.page = 1;
				this.getGoodsList({'numSort':this.numSortFlag});
				this.numCur = true;
				this.timeCur = false;
				this.defaultCur = false;
				this.priceCur = false;
				this.sortFlag = true;
				this.timeSortFlag = true;
				this.sortPage = 4;
			},
			toDefaultCur(){
				this.searchValue = '';
				this.page = 1;
				this.getGoodsList();
				this.defaultCur = true;
				this.priceCur = false;
				this.timeCur = false;
				this.numCur = false;
				this.sortFlag = true;
				this.timeSortFlag = true;
				this.numSortFlag = true;
				this.sortPage = 1;
			},
			loadMore(){
				this.flag = true;
				setTimeout(()=>{
					this.page++;
					this.getGoodsList();
				},500);
			},
			addCart(productId){
				axios.post('/goods/addCart', {
				    _id: productId
				}).then((res) =>{
				    if(res.data.status == 1){
				    	this.mdShow = true;
				    }else{
				    	this.checkChange = productId;
				    	this.mdShowCart = true;
				    }
				 }).catch((error) =>{
				    console.log(error);
			  });
			},
			closeModal(){
				this.mdShow = false;
				this.mdShowCart = false;
			},
			toSearch(){
				if(!this.searchValue){
					return;
				}
				this.page = 1;
				this.flag = false;
				this.priceChecked = 'all';
				this.getGoodsList();
				
			},
			currentChange(val){
				this.page = val;
				if(this.sortPage == 1){
					this.getGoodsList();
				}else if(this.sortPage == 2){
					this.getGoodsList({'priceSort':this.sortFlag});
				}else if(this.sortPage == 3){
					this.getGoodsList({'timeSort':this.timeSortFlag});
				}else if(this.sortPage == 4){
					this.getGoodsList({'numSort':this.numSortFlag});
				}
			},
			toGoodsDetail(id){
				this.$router.push({
					path:'goodsDetail',
					query:{
						'id':id
					}
				})
			}
		}
	}
</script>
<style scoped>
.el-input {
	margin-left: 23%;
	margin-top: 20px;
    width: 750px;
 }
</style>
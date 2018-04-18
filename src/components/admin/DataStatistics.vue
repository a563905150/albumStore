<template>
	<el-main v-if="init=='adminData'">
		<el-row :gutter="20" v-loading="tableLoading">
		  <el-col :span="8">
		  	<div class="grid-content">
	  			<img src="../../assets/price.svg" alt="" class="img" style="left: 30%;"/>
	  			<p class="img" style="bottom: 0;left: 15%;">{{priceTotal|currency('$')}}</p>
		  	</div>
		  </el-col>
		  <el-col :span="8">
		  	<div class="grid-content">
		  		<img src="../../assets/register.svg" class="img" style="left: 30%;"/>
		  		<p class="img" style="bottom: 0;left: 40%;">{{registerNum}}人</p>
		  	</div>
		  </el-col>
		  <el-col :span="8">
		  	<div class="grid-content">
		  		<img src="../../assets/order.svg" style="width: 30%;margin-left: 10px;margin-top: 2px;left: 30%;" class="img"/>
	  			<p class="img" style="bottom: 0;left: 35%;">{{orderTotal}}个</p>
		  	</div>
		  </el-col>
		</el-row>
    </el-main>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			return {
				priceTotal:'',
		        registerNum:'',
		        orderTotal:'',
		        tableLoading:false
			}
		},
		props:['init'],
		watch:{
			init(val,oldVal){
				if(val=='adminData'){
					this.getOrderTotal();
				}
			}
		},
		mounted(){
			this.getOrderTotal();
		},
		methods:{
			getOrderTotal(){
				this.tableLoading = true;
	    		axios.get('/admin/orderTotal').then((resp)=>{
	    			setTimeout(()=>{
	    				this.tableLoading = false
	    			},500)
	    			let res = resp.data;
	    			this.priceTotal = res.result.total;
	    			this.orderTotal = res.result.orderTotal;
	    			this.registerNum = res.result.registerNum;
	    			
	    		})
	    	}
		}
	}
</script>

<style scoped>
 .grid-content {
  	position: relative;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 5px;
    height: 180px;
    font-size: 50px;
  }
  .img{
  	position: absolute;
  }
</style>
<template>
	<el-main v-if="init=='myOrder'">
		<el-table
			v-loading="tableLoading"
		    :data="tableData"
		    stripe
		    border
		    style="width: 100%"
		    height="428">
		    <el-table-column
		      fixed
		      type="index">
		    </el-table-column>
		    <el-table-column
		      type="expand">
		      <template slot-scope="props">
		      	 <el-form label-position="left" inline class="demo-table-expand">
		          <el-form-item label="收件人名称">
		            <span>{{ props.row.addressInfo.userName }}</span>
		          </el-form-item>
		          <el-form-item label="配送方式">
		            <span>{{ props.row.shippingMethodInfo.shippingName }}</span>
		          </el-form-item>
		          <el-form-item label="商品数量">
		            <span>{{ props.row.goodsList.length }}</span>
		          </el-form-item>
		          <el-form-item v-for="item in props.row.goodsList" :key="item._id" :label="item.productName">
		            <span> x{{ item.productNum }}</span>
		          </el-form-item>
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column
		      align="center"
		      prop="orderId"
		      label="订单号"
		      width="202">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="orderTotal"
		      label="订单总额"
		      width="100">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="orderStatus"
		      label="订单状态"
		      width="120">
		      <template slot-scope="props">
		      	<span v-if="props.row.orderStatus==1">待发货</span>
		      	<span v-if="props.row.orderStatus==2">已发货</span>
		      	<span v-if="props.row.orderStatus==3">已收货</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="createDate"
		      label="订单创建时间"
		      width="235">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      min-width
		      label="操作">
		      <template slot-scope="scope">
		        <el-button type="primary" size="small" @click="takeDelivery(scope.row)">收货</el-button>
		      </template>
		    </el-table-column>
		    <!--<el-table-column
		    	align="center"
		      prop="productImage"
		      label="商品图片"
		      width="250">
		      <template slot-scope="scope">
		        <img style="width: 140px;height: 80px;" v-lazy="'../../../static/'+scope.row.productImage" />
		      </template>
		    </el-table-column>-->
		</el-table>
		<el-pagination
		  background
		  @current-change="currentChange"
		  layout="prev, pager, next,total"
		  :page-size="5"
		  :total="total"
		  style="display: inline-block;margin-left: 25%;">
		</el-pagination>
	</el-main>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			return {
				tableData:[],
				currentPage:1,
				total:0,
				tableLoading:false
			}
		},
		props:['init'],
		watch:{
			init(val,oldVal){
				if(val == 'myOrder'){
					this.initTable()
				}
			}
		},
		mounted(){
			
		},
		methods:{
			initTable(currentPage){
				this.tableLoading = true;
				axios.get('/admin/getUserOrderList',{
					params:{
						page:currentPage||1,
						pageSize:5,
					}
				}).then((resp)=>{
					let res = resp.data.result;
					this.tableData = res.orderList;
					this.total = res.total;
					setTimeout(()=>{
						this.tableLoading = false;
					},500);
				})
			},
			currentChange(val){
				this.currentPage = val;
				this.initTable(val);
			},
			takeDelivery(row){
				if(row.orderStatus == 1){
					this.$alert('商家还未发货，无法收货！', '错误！', {
			          confirmButtonText: '确定'
			        });
				}else if(row.orderStatus == 3){
					this.$alert('您已收货，请勿重复收货！', '错误！', {
			          confirmButtonText: '确定'
			        });
				}else{
					axios.post('/admin/takeDelivery',{
						userId:row.userId,
						orderId:row._id
					}).then((resp) =>{
						let res = resp.data;
						if(res.status == 0){
							this.initTable(this.currentPage);
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
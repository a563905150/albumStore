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
		      width="200">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="orderStatus"
		      label="订单状态"
		      width="150">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="createDate"
		      label="订单创建时间"
		      width="235">
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
		  :page-size="6"
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
				axios.get('/admin/getOrderList',{
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
			}
		}
	}
</script>

<style>
</style>
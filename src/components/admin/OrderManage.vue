<template>
	<el-main v-if="init=='orderManage'">
		<el-table
			v-loading="tableLoading"
		    :data="tableData"
		    stripe
		    border
		    style="width: 100%"
		    height="509">
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
		      width="250">
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
		    <el-table-column
		    	align="center"
		      min-width
		      label="操作">
		      <template slot-scope="scope">
		        <el-button type="primary" size="small" @click="">编辑</el-button>
		        <el-button @click="" type="warning" size="small">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
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
				if(val=='orderManage'){
					this.initTable();
				}
			}
		},
		mounted(){

		},
		methods:{
			initTable(){
				this.tableLoading = true;
				axios.get('/admin/getOrderList',{
					params:{
						page:this.currentPage,
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
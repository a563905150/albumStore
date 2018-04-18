<template>
	<el-main v-if="init=='shippingMethodsManage'">
		<el-button type="primary" size="small" @click="dialogFormVisible=true">新增配送方式</el-button>
		<el-table
			v-loading="loading"
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
		      align="center"
		      prop="_id"
		      label="配送方式ID"
		      width="202">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="shippingName"
		      label="配送名称"
		      width="200">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="shippingPrice"
		      sortable
		      label="配送价格"
		      width="250">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="shippingDate"
		      sortable
		      label="配送时长"
		      width="250">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      min-width
		      label="操作">
		      <template slot-scope="scope">
		        <el-button type="primary" size="small" @click="editShippingMethod(scope.row)">编辑</el-button>
		        <el-button @click="delShippingMethod(scope.row._id)" type="warning" size="small">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<el-dialog :visible.sync="dialogFormVisible" center title="添加配送方式">
		    <el-form :model="shippingMethods"label-width="80px">
			  <el-form-item label="配送名称" prop="shippingName">
			    <el-input type="text" v-model="shippingMethods.shippingName"></el-input>
			  </el-form-item>
			  <el-form-item label="配送价格" prop="shippingPrice">
			    <el-input type="text" v-model="shippingMethods.shippingPrice"></el-input>
			  </el-form-item>
			  <el-form-item label="配送时长" prop="shippingDate">
			    <el-input type="text" v-model="shippingMethods.shippingDate"></el-input>
			  </el-form-item>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="addShippingMethodConfirm">确 定</el-button>
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		  </div>
		</el-dialog>
		<el-dialog :visible.sync="dialogEditVisible" center title="编辑配送方式">
		    <el-form :model="editShippingMethodItem"label-width="80px">
			  <el-form-item label="配送名称" prop="shippingName">
			    <el-input type="text" v-model="editShippingMethodItem.shippingName"></el-input>
			  </el-form-item>
			  <el-form-item label="配送价格" prop="shippingPrice">
			    <el-input type="text" v-model="editShippingMethodItem.shippingPrice"></el-input>
			  </el-form-item>
			  <el-form-item label="配送时长" prop="shippingDate">
			    <el-input type="text" v-model="editShippingMethodItem.shippingDate"></el-input>
			  </el-form-item>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="editShippingMethodConfirm">确 定</el-button>
		    <el-button @click="dialogEditVisible = false">取 消</el-button>
		  </div>
		</el-dialog>
    </el-main>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			return {
				tableData:[],
				dialogFormVisible:false,
				shippingMethods:{
					shippingName:'',
					shippingPrice:'',
					shippingDate:''
				},
				editShippingMethodItem:{
					_id:'',
					shippingName:'',
					shippingPrice:'',
					shippingDate:''
				},
				dialogEditVisible:false,
				loading:false
			}
		},
		props:['init'],
		watch:{
			init(val,oldVal){
				if(val=='shippingMethodsManage'){
					this.initTable();
				}
			}
		},
		mounted(){

		},
		methods:{
			initTable(){
				this.loading =true;
				axios.get('/users/getShippingMethods').then((resp)=>{
					let res = resp.data;
					this.tableData = res.result;
					setTimeout(()=>{
						this.loading = false;
					},500);
				})
			},
			addShippingMethodConfirm(){
				if(!this.shippingMethods.shippingName||!this.shippingMethods.shippingPrice||!this.shippingMethods.shippingDate){
					this.$alert('请填写正确的配送方式信息', '错误！', {
			          confirmButtonText: '确定'
			        });
			        return ;
				}
				axios.post('/admin/addShippingMethods',this.shippingMethods).then((resp)=>{
					if(resp.data.status == 0){
						this.dialogFormVisible = false;
						this.$message({
				            type: 'success',
				            message: '添加配送方式成功!'
				        });
				        this.initTable();
					}
				})
			},
			editShippingMethod(row){
				this.editShippingMethodItem._id = row._id;
				this.editShippingMethodItem.shippingName = row.shippingName;
				this.editShippingMethodItem.shippingPrice = row.shippingPrice;
				this.editShippingMethodItem.shippingDate = row.shippingDate;
				this.dialogEditVisible = true;
			},
			editShippingMethodConfirm(){
				if(!this.editShippingMethodItem.shippingName||!this.editShippingMethodItem.shippingPrice||!this.editShippingMethodItem.shippingDate){
					this.$alert('请填写正确的配送方式信息', '错误！', {
			          confirmButtonText: '确定'
			        });
			        return ;
				}
				axios.post('/admin/editShippingMethods',this.editShippingMethodItem).then((resp)=>{
					if(resp.data.status == 0){
						this.dialogEditVisible = false;
						this.$message({
				            type: 'success',
				            message: '编辑配送方式成功!'
				        });
				        this.initTable();
					}
				})
			},
			delShippingMethod(_id){
				this.$confirm('此操作将永久删除该配送方式, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	axios.post('/admin/delShippingMethod',{
		        		_id:_id
		        	}).then((resp)=>{
		        		let res = resp.data.msg;
		        		this.initTable();
		        		console.log(res);
		        	})
		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
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
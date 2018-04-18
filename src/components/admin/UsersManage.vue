<template>
	<el-main v-if="init=='usersManage'">
		<el-button type="primary" size="small" @click="dialogAddVisible=true">新增用户</el-button>
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
		      align="center"
		      prop="_id"
		      label="用户ID"
		      width="150">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="userName"
		      label="用户名称"
		      width="150">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="userPwd"
		      label="用户密码"
		      width="150">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      sortable
		      prop="orderList.length"
		      label="订单数量"
		      width="150">
		    </el-table-column>
		    <el-table-column
		      align="center"
		      sortable
		      prop="cartList.length"
		      label="购物车商品数"
		      width="150">
		    </el-table-column>
		    <el-table-column
		      align="center"
		      sortable
		      prop="addressList.length"
		      label="地址数量"
		      width="150">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      min-width
		      label="操作">
		      <template slot-scope="scope">
		        <el-button type="primary" size="small" @click="editUser(scope.row)">编辑</el-button>
		        <el-button @click="delUser(scope.row._id)" type="warning" size="small">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<el-pagination
		  background
		  @current-change="currentChange"
		  layout="prev, pager, next,total"
		  :page-size="pageSize"
		  :total="total"
		  style="display: inline-block;margin-left: 25%;">
		</el-pagination>
		<el-dialog :visible.sync="dialogFormVisible" center title="编辑用户">
		    <el-form :model="userItem"label-width="80px">
			  <el-form-item label="用户名" prop="userName">
			    <el-input type="text" v-model="userItem.userName"></el-input>
			  </el-form-item>
			  <el-form-item label="用户密码" prop="userPwd">
			    <el-input type="text" v-model="userItem.userPwd"></el-input>
			  </el-form-item>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="editUserConfirm">确 定</el-button>
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		  </div>
		</el-dialog>
		<el-dialog :visible.sync="dialogAddVisible" center title="添加用户">
		    <el-form :model="addUserItem"label-width="80px">
			  <el-form-item label="用户名" prop="userName">
			    <el-input type="text" v-model="addUserItem.userName"></el-input>
			  </el-form-item>
			  <el-form-item label="用户密码" prop="userPwd">
			    <el-input type="text" v-model="addUserItem.userPwd"></el-input>
			  </el-form-item>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="addUserConfirm">确 定</el-button>
		    <el-button @click="dialogAddVisible = false">取 消</el-button>
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
				page:1,
				pageSize:10,
				currentPage:1,
				total:0,
				dialogFormVisible:false,
				userItem:{
					_id:'',
					userName:'',
					userPwd:''
				},
				dialogAddVisible:false,
				addUserItem:{
					userName:'',
					userPwd:''
				},
				tableLoading:false
			}
		},
		props:['init'],
		watch:{
			init(val,oldVal){
				if(val=='usersManage'){
					this.getUsersList();
				}
			}
		},
		mounted(){

		},
		methods:{
			getUsersList(currentPage){
				this.tableLoading = true;
				axios.get('/users/usersList',{
					params:{
						page:currentPage||this.page,
						pageSize:this.pageSize
					}
				}).then((resp)=>{
					let res = resp.data.result;
					this.tableData = res.usersList;
					this.total = res.total;
					setTimeout(()=>{
						this.tableLoading = false;
					},500)
					
				})
			},
			currentChange(page){
				this.currentPage = page;
				this.getUsersList(page);
			},
			delUser(_id){
		        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	axios.post('/users/delUser',{
		        		_id:_id
		        	}).then((resp)=>{
		        		let res = resp.data.msg;
		        		this.getUsersList(this.currentPage);
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
			},
			editUser(row){
				this.userItem.userName = row.userName;
				this.userItem.userPwd = row.userPwd;
				this.userItem._id = row._id;
				this.dialogFormVisible = true;
			},
			editUserConfirm(){
				axios.post('/users/editUser',this.userItem).then((resp)=>{
					let res = resp.data;
					if(res.status == 0){
						this.dialogFormVisible = false;
						this.$message({
				            type: 'success',
				            message: '编辑成功!'
				        });
				        this.getUsersList(this.currentPage);
					}
				})
			},
			addUserConfirm(){
				if(!this.addUserItem.userName||!this.addUserItem.userPwd){
					this.$alert('请填写正确的用户名或密码', '错误！', {
			          confirmButtonText: '确定'
			        });
			        return ;
				}
				axios.post('/admin/addUser',this.addUserItem)
				.then((resp)=>{
					let res = resp.data;
					if(res.status == 0){
						this.dialogAddVisible = false;
						this.$message({
				            type: 'success',
				            message: '添加用户成功!'
				        });
				        this.getUsersList(this.currentPage);
					}
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
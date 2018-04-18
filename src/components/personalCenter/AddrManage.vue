<template>
	<el-main v-if="init=='addrManage'">
		<el-button type="primary" size="small" @click="dialogAddVisible=true">新增地址</el-button>
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
		      align="center"
		      prop="userName"
		      label="姓名"
		      width="130">
		    </el-table-column>
		    <el-table-column
		      align="center"
		      prop="tel"
		      label="手机号码"
		      width="130">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="postCode"
		      label="邮编"
		      width="130">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="streetName"
		      label="地址"
		      width="230">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      min-width
		      label="操作">
		      <template slot-scope="scope">
		        <el-button type="primary" size="small" @click="editAddr(scope.row)">编辑</el-button>
		        <el-button @click="delAddr(scope.row._id)" type="warning" size="small">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<el-dialog :visible.sync="dialogEditVisible" center title="编辑地址">
		    <el-form :model="editAddrItem"label-width="80px">
			  <el-form-item label="姓名" prop="userName" :required='required'>
			    <el-input type="text" v-model="editAddrItem.userName"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号码" prop="tel" :required='required'>
			    <el-input type="text" v-model="editAddrItem.tel"></el-input>
			  </el-form-item>
			  <el-form-item label="邮编" prop="postCode" :required='required'>
			    <el-input type="text" v-model="editAddrItem.postCode"></el-input>
			  </el-form-item>
			  <el-form-item label="地址" prop="streetName" :required='required'>
			    <el-input type="text" v-model="editAddrItem.streetName"></el-input>
			  </el-form-item>
			</el-form>
			  <div slot="footer" class="dialog-footer">
			  	<el-button type="primary" @click="editAddrConfirm">确 定</el-button>
			    <el-button @click="dialogEditVisible = false">取 消</el-button>
			  </div>
		</el-dialog>
		<el-dialog :visible.sync="dialogAddVisible" center title="添加地址">
		    <el-form :model="addAddrItem"label-width="80px">
			  <el-form-item label="姓名" prop="userName" :required="required">
			    <el-input type="text" v-model="addAddrItem.userName"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号码" prop="tel" :required="required">
			    <el-input type="text" v-model="addAddrItem.tel"></el-input>
			  </el-form-item>
			  <el-form-item label="邮编" prop="postCode" :required="required">
			    <el-input type="text" v-model="addAddrItem.postCode"></el-input>
			  </el-form-item>
			  <el-form-item label="地址" prop="streetName" :required="required">
			    <el-input type="text" v-model="addAddrItem.streetName"></el-input>
			  </el-form-item>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="addAddrConfirm">确 定</el-button>
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
				required:true,
				dialogEditVisible:false,
				dialogAddVisible:false,
				tableLoading:false,
				tableData:[],
				editAddrItem:{
					_id:'',
					userName:'',
					tel:'',
					postCode:'',
					streetName:''
				},
				addAddrItem:{
					userName:'',
					tel:'',
					postCode:'',
					streetName:''
				}
			}
		},
		props:['init'],
		watch:{
			init(val,oldVal){
				if(val == 'addrManage'){
					this.initData();
				}
			}
		},
		methods:{
			initData(){
				this.tableLoading = true;
				axios.get('/users/addressList').then((resp)=>{
					let res = resp.data;
					this.tableData = res.result;
					setTimeout(()=>{
						this.tableLoading = false;
					},500);
				})
			},
			editAddr(row){
				this.dialogEditVisible = true;
				this.editAddrItem._id = row._id;
				this.editAddrItem.userName = row.userName;
				this.editAddrItem.tel = row.tel;
				this.editAddrItem.postCode = row.postCode;
				this.editAddrItem.streetName = row.streetName;
				
			},
			editAddrConfirm(){
				if(!this.editAddrItem.userName||!this.editAddrItem.tel||!this.editAddrItem.postCode||!this.editAddrItem.streetName){
					this.$alert('请输入完整信息', '错误！', {
			          confirmButtonText: '确定'
			        });
			        return ;
				}
				axios.post("/users/editAddress",this.editAddrItem).then((resp) =>{
					let res = resp.data;
					if(res.status == 0){
						this.dialogEditVisible = false;
						this.initData();
						this.$message({
				            type: 'success',
				            message: '修改成功!'
				        });
					}
				})
			},
			delAddr(id){
				this.$confirm('此操作将删除该地址, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	axios.post('/users/delAddress',{
		        		_id:id
		        	}).then((resp)=>{
		        		let res = resp.data.msg;
		        		this.initData();
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
			addAddrConfirm(){
				if(!this.addAddrItem.userName||!this.addAddrItem.tel||!this.addAddrItem.postCode||!this.addAddrItem.streetName){
					this.$alert('请填写完整的信息', '错误！', {
			          confirmButtonText: '确定'
			        });
			        return ;
				}
				axios.post('/users/addAddress',this.addAddrItem)
				.then((resp)=>{
					let res = resp.data;
					if(res.status == 0){
						this.dialogAddVisible = false;
						this.$message({
				            type: 'success',
				            message: '添加地址成功!'
				        });
				        this.initData();
					}
				})
			}
		}
	}
</script>

<style>
</style>
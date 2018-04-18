<template>
	<el-main v-if="init=='resetPwd'">
		<el-form :model="resetPwdForm" label-width="80px" class="demo-ruleForm">
		  <el-form-item label="原始密码" prop="oldPwd" :required='required'>
		    <el-input type="password" v-model="resetPwdForm.oldPwd"></el-input>
		  </el-form-item>
		  <el-form-item label="新密码" prop="pwd" :required='required'>
		    <el-input type="password" v-model="resetPwdForm.pwd"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码" prop="rePwd" :required='required'>
		    <el-input type="password" v-model="resetPwdForm.rePwd"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="confirm">确认修改</el-button>
		    <el-button @click="reset">重置</el-button>
		  </el-form-item>
		</el-form>
	</el-main>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			return {
				resetPwdForm:{
					oldPwd:'',
					pwd:'',
					rePwd:'',
				},
				required:true
			}
		},
		props:['init'],
		watch:{
			init(val,oldVal){
				if(val == 'resetPwd'){
					this.resetPwdForm.oldPwd='';
				    this.resetPwdForm.pwd='';
				    this.resetPwdForm.rePwd=''
				}
			}
		},
		methods:{
			confirm(){
				if(!this.resetPwdForm.oldPwd||!this.resetPwdForm.pwd||!this.resetPwdForm.rePwd){
					this.$alert('请输入完整信息！', '错误！', {
			          confirmButtonText: '确定'
			        });
			        return ;
				}
				if(this.resetPwdForm.pwd!=this.resetPwdForm.rePwd){
					this.$alert('两次密码不一致，请重新输入', '错误！', {
			          confirmButtonText: '确定'
			        });
			        return ;
				}else{
					axios.post('/users/resetPwd',{
						oldPwd:this.resetPwdForm.oldPwd,
						newPwd:this.resetPwdForm.pwd
					}).then((resp)=>{
						let res = resp.data;
						if(res.result == '原始密码不正确'){
							this.$alert('原始密码不正确，请重新输入', '错误！', {
					          confirmButtonText: '确定'
					        });
						}else if(res.status == 0){
							this.$message({
					            type: 'success',
					            message: '密码修改成功!'
					        });
					        this.resetPwdForm.oldPwd='';
						    this.resetPwdForm.pwd='';
						    this.resetPwdForm.rePwd=''
						}
					})
				}
			},
			reset(){
				this.resetPwdForm.oldPwd='';
			    this.resetPwdForm.pwd='';
			    this.resetPwdForm.rePwd=''
			}
		}
	}
</script>

<style scoped>
	.el-input{
		width:400px;
	}
</style>
<template>
	<el-main v-if="init=='bannerManage'">
		<el-button type="primary" size="small" @click="dialogAddVisible=true">添加广告</el-button>
		<el-row :gutter="20" v-loading="loading">
		  <el-col :span="8" v-for="item in bannerList" :key="item._id">
		    <el-card :body-style="{ padding: '0px' }">
		      <img v-lazy="'../../../static/banner/'+item.url" class="image">
		      <div style="padding: 14px;">
		        <div class="bottom clearfix">
		          <el-button type="warning" size="small" class="button" @click="delBanner(item._id)">
		          	<i class="el-icon-delete"></i>
		          	删除</el-button>
		        </div>
		      </div>
		    </el-card>
		  </el-col>
		</el-row>
		<el-dialog :visible.sync="dialogAddVisible" center title="添加广告">
			请选择图片
		    <el-upload
			  ref="upload"
			  :auto-upload="false"
			  class="avatar-uploader"
			  action="/bannerList/addList"
			  :show-file-list="false"
			  :on-success="handleSuccess"
			  :on-change="handleChange">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  <div slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="addBannerConfirm">确 定</el-button>
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
				bannerList:[],
				dialogAddVisible:false,
				imageUrl:'',
				loading:false
			}
		},
		props:['init'],
		watch:{
			init(val,oldVal){
				if(val=='bannerManage'){
					this.getBannerList();
				}
			}
		},
		mounted(){

		},
		methods:{
			getBannerList(){
				this.loading = true;
				axios.get('/bannerList/getList').then((resp)=>{
					let res = resp.data;
					this.bannerList = res.result;
					setTimeout(()=>{
						this.loading = false;
					},500)
				})
			},
			delBanner(_id){
				this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	axios.post('/bannerList/delList',{
						_id:_id
					}).then((resp)=>{
						if(resp.data.status == 0){
							this.$message({
				            type: 'success',
				            message: '删除成功!'
				          });
				          this.getBannerList();
						}
					})
		          
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
			},
			handleSuccess(){
				this.dialogAddVisible = false;
		    	this.getBannerList();
		    	this.$message({
		            type: 'success',
		            message: '添加成功!'
		          });
			},
			handleChange(file){
				this.imageUrl = file.url;
			},
			addBannerConfirm(){
				if(this.$refs.upload._data.uploadFiles.length == 0){
					this.$alert('请填加照片！', '错误！', {
			          confirmButtonText: '确定'
			        });
			        return ;
				}
				this.$refs.upload.submit();
			}
		}
	}
</script>

<style scoped>
  .el-col {
    margin-bottom: 20px;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
 .img{
  	position: absolute;
  }
  
  .button {

    float: right;
  }

  .image {
    width: 354px;
    height: 354px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    margin-left: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 10px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    margin-left: 100px;
  }
</style>
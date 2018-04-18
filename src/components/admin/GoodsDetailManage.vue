<template>
	<el-main v-if="init=='goodsDetailManage'">
		<el-table
			v-loading="tableLoading"
		    :data="tableData"
		    stripe
		    border
		    style="width: 100%"
		    height="541">
		    <el-table-column
		      fixed
		      type="index"
		      width="30">
		    </el-table-column>
		    <el-table-column
		      align="center"
		      prop="productName"
		      label="商品名称"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      align="center"
		      prop="productDetail"
		      label="商品介绍"
		      width="300">
		    </el-table-column>
		    <el-table-column
		      align="center"
		      prop="productDetailImg"
		      label="商品详情图片"
		      width="500">
		      <template slot-scope="scope">
		        <img v-for="item in scope.row.productDetailImg" style="width: 140px;height: 80px;" v-lazy="'../../../static/productImg/'+item.url" />
		      </template>
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      min-width
		      label="操作">
		      <template slot-scope="scope">
		        <el-button type="primary" size="small" @click="editProductDetail(scope.row)">编辑</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<el-pagination
		  background
		  @current-change="currentChange"
		  layout="prev, pager, next,total"
		  :page-size="6"
		  :total="total"
		  style="display: inline-block;margin-left: 25%;">
		</el-pagination>
		<el-dialog :visible.sync="dialogEditVisible" center title="编辑商品详情">
		    <el-form :model="productDetailItem"label-width="80px">
			  <el-form-item label="商品介绍" prop="productDetail">
			    <el-input type="textarea" autosize v-model="productDetailItem.productDetail"></el-input>
			  </el-form-item>
			  &nbsp;&nbsp;&nbsp;详情图片
			</el-form>
			<el-upload
				multiple
			  :data="productId"
			  ref="editUpload"
			  :file-list="fileList"
			  :auto-upload="false"
			  class="avatar-uploader"
			  action="/goods/editProductDetailImg"
			  list-type="picture-card"
			  :on-success="handleEditSuccess"
			  :on-change="handleEditChange"
			  :on-remove="handleRemove">
			  <img v-if="editImageUrl" :src="editImageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  <div slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="editConfirm">确 定</el-button>
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
				dialogEditVisible:false,
				tableLoading:false,
				tableData:[],
				total:1,
				page:1,
				currentPage:1,
				productDetailItem:{
					productDetail:''
				},
				fileList:[],
				editImageUrl:'',
				productId:{
					id:''
				}
			}
		},
		props:['init'],
		watch:{
			init(val,oldVal){
				if(val=='goodsDetailManage'){
					this.getGoodsList();
				}
			}
		},
		mounted(){
			
		},
		methods:{
			getGoodsList(currentPage){
		    	this.tableLoading = true;
	    		axios.get('/goods/list',{
		    		params:{
		    			page:currentPage||this.page,
		    			pageSize:6,
		    			sort:{'defalut':1},
		    			addTimeSort:1,
		    			priceLevel:'all',
		    			productType:'all'
		    		}
		    	}).then((resp)=>{
		    		let res = resp.data.result;
		    		this.tableData = res.list;
		    		this.total = res.total;
		    		setTimeout(()=>{
		    			this.tableLoading = false;
		    		},500);
		    		
		    	})
	    	
		    	
		    },
			currentChange(val){
				this.currentPage = val;
		    	this.getGoodsList(val);
			},
			editProductDetail(row){
				this.productId.id = row._id;
				this.dialogEditVisible = true;
				this.productDetailItem.productDetail = row.productDetail;
				row.productDetailImg.forEach((item) =>{
					if(!item.name){
		    			item.name = item.url;
		    			item.url = './../../static/productImg/'+item.url;
		    		}
				})
				this.fileList = row.productDetailImg;
			},
			handleEditSuccess(resp, file, fileList){
		    	let res = resp.result;
		      	file._id = res._id;
		    	this.getGoodsList(this.currentPage);
		    	if(res.count == fileList.length){
		    		this.dialogEditVisible = false;
		    		this.$alert('商品详情编辑成功！', '完成！', {
					          confirmButtonText: '确定'
					  });
		    	}
				console.log(res.count);
			},
			handleEditChange(){
				
			},
			handleRemove(file, fileList){
				console.log(file);
				if(file.status == 'success'){
					axios.post('/goods/delProductDetailImg',{
						id:this.productId.id,
						imgId:file._id,
					}).then((resp)=>{
						let res = resp.data;
						console.log(res.result);
						this.getGoodsList(this.currentPage);
					})
				}
        		this.fileListCount = fileList.length;
			},
			editConfirm(){
				axios.post('/goods/editProductDetail',{
					id:this.productId.id,
					detail:this.productDetailItem.productDetail
				}).then((resp) =>{
					console.log(resp.data.msg);
				})
				this.$refs.editUpload.submit();
			}
		}
	}
</script>

<style scoped>
  .img{
  	position: absolute;
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
  /*.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    margin-left: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 10px;
  }*/
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    margin-left: 100px;
  }
</style>
<template>
	<el-main v-if="init=='goodsManage'">
		<el-button type="primary" size="small" @click="dialogFormVisible=true">新增商品</el-button>
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
		      label="商品ID"
		      width="130">
		    </el-table-column>
		    <el-table-column
		      align="center"
		      prop="productName"
		      label="商品名称"
		      width="120">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="salePrice"
		      sortable
		      label="商品价格"
		      width="110">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="productType"
		      label="商品类型"
		      width="100">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="saleNum"
		      label="已售数量"
		      width="100">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="addDate"
		      sortable
		      label="添加时间"
		      width="120">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="productImage"
		      label="商品图片"
		      width="200">
		      <template slot-scope="scope">
		        <img style="width: 140px;height: 80px;" v-lazy="'../../../static/'+scope.row.productImage" />
		      </template>
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      min-width
		      label="操作">
		      <template slot-scope="scope">
		        <el-button type="primary" size="small" @click="editGoods(scope.row)">编辑</el-button>
		        <el-button @click="delGoods(scope.row._id)" type="warning" size="small">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<el-pagination
		  background
		  @current-change="currentChange"
		  layout="prev, pager, next,total,jumper"
		  :page-size="6"
		  :total="total"
		  style="display: inline-block;margin-left: 25%;">
		</el-pagination>
		<el-dialog :visible.sync="dialogFormVisible" center title="添加商品">
		    <el-form :model="goodsItem"label-width="80px">
			  <el-form-item label="商品名称" prop="productName">
			    <el-input type="text" v-model="goodsItem.productName"></el-input>
			  </el-form-item>
			  <el-form-item label="商品价格" prop="salePrice">
			    <el-input type="text" v-model="goodsItem.salePrice"></el-input>
			  </el-form-item>
			  <el-form-item label="商品类型" prop="productType">
			    <el-input type="text" v-model="goodsItem.productType"></el-input>
			  </el-form-item>
			  &nbsp;&nbsp;&nbsp;商品图片

			</el-form>
			<el-upload
			  :data="goodsItem"
			  ref="upload"
			  :auto-upload="false"
			  class="avatar-uploader"
			  action="/goods/addProduct"
			  :show-file-list="false"
			  :on-success="handleSuccess"
			  :on-change="handleChange">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  <div slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="addGoodsComfirm">确 定</el-button>
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		  </div>
		</el-dialog>
		<el-dialog :visible.sync="dialogEditVisible" center title="编辑商品">
		    <el-form :model="editGoodsItem"label-width="80px">
			  <el-form-item label="商品名称" prop="productName">
			    <el-input type="text" v-model="editGoodsItem.productName"></el-input>
			  </el-form-item>
			  <el-form-item label="商品价格" prop="salePrice">
			    <el-input type="text" v-model="editGoodsItem.salePrice"></el-input>
			  </el-form-item>
			  <el-form-item label="商品类型" prop="productType">
			    <el-input type="text" v-model="editGoodsItem.productType"></el-input>
			  </el-form-item>
			  &nbsp;&nbsp;&nbsp;商品图片

			</el-form>
			<el-upload
			  :data="editGoodsItem"
			  ref="editUpload"
			  :auto-upload="false"
			  class="avatar-uploader"
			  action="/goods/editProduct"
			  :show-file-list="false"
			  :on-success="handleEditSuccess"
			  :on-change="handleEditChange">
			  <img v-if="editImageUrl" :src="editImageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  <div slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="editGoodsConfirm">确 定</el-button>
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
				tableData: [],
				page:1,
				total:1,
				currentPage:1,
				dialogFormVisible:false,
				goodsItem:{
					productName:'',
					salePrice:'',
					productType:''
				},
				imageUrl:'',
				dialogEditVisible:false,
				editGoodsItem:{
					productName:'',
					salePrice:'',
					productType:'',
					_id:''
				},
				editImageUrl:'',
				tableLoading:false
			}
		},
		props:['init'],
		watch:{
			init(val,oldVal){
				if(val=='goodsManage'){
					
					this.getGoodsList();
				}
			}
		},
		mounted(){
			
		},
		methods:{
			delGoods(_id) {
		        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	axios.post('/goods/delGoods',{
		        		_id:_id
		        	}).then((resp)=>{
		        		let res = resp.data.msg;
		        		this.getGoodsList(this.currentPage);
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
		    addGoodsComfirm(){
		    	if(!this.goodsItem.productName||!this.goodsItem.salePrice||!this.imageUrl||!this.goodsItem.productType){
		    		this.$alert('请填写正确的信息', '错误！', {
			          confirmButtonText: '确定'
			        });
			        return ;
		    	}
		    	this.$refs.upload.submit();
		    },
		    handleSuccess(res,file,fileList){
//				fileList = [];
//				this.imageUrl = '';
				this.goodsItem.productName = '';
				this.goodsItem.salePrice = '';
//				this.imageUrl = false;
				this.goodsItem.productType = '';
		    	this.dialogFormVisible = false;
		    	this.getGoodsList();
		    	this.$message({
		            type: 'success',
		            message: '添加成功!'
		          });
		    },
		    handleChange(file){

		    	this.imageUrl = file.url;
		    },
		    editGoods(row){
		    	this.dialogEditVisible = true;
		    	this.editGoodsItem.productName = row.productName;
		    	this.editGoodsItem.salePrice = row.salePrice;
		    	this.editGoodsItem.productType = row.productType;
		    	this.editGoodsItem._id = row._id;
		    	this.editImageUrl = `./../../../static/${row.productImage}`;
		    },
		    handleEditSuccess(){
		    	this.dialogEditVisible = false;
		    	this.getGoodsList();
		    	this.$message({
		            type: 'success',
		            message: '修改成功!'
		          });
		    },
		    handleEditChange(file){
		    	this.editImageUrl = file.url;
		    },
		    editGoodsConfirm(){
		    	if(!this.editGoodsItem.productName||!this.editGoodsItem.salePrice||!this.editImageUrl||!this.editGoodsItem.productType){
		    		this.$alert('请编辑完整信息', '错误！', {
			          confirmButtonText: '确定'
			        });
			        return ;
		    	}
		    	console.log(this.$refs.editUpload._data.uploadFiles);
		    	this.$refs.editUpload.submit();
//		    	if(this.$refs.editUpload._data.uploadFiles.length == 0){
//		    		axios.post('/goods/editProduct',this.editGoodsItem)
//		    		.then((resp)=>{
//		    			let res = resp.data;
//		    			console.log(res);
//		    			if(res.status == 0){
//		    				this.handleEditSuccess();
//		    			}
//		    		})
//		    	}
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
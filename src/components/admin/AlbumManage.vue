<template>
	<el-main v-if="init=='albumManage'">
		<el-table
			v-loading="tableLoading"
		    :data="tableData"
		    stripe
		    border
		    style="width: 100%"
		    height="541">
		    <el-table-column
		      fixed
		      type="index">
		    </el-table-column>
		    <el-table-column
		      type="expand">
		      <template slot-scope="props">
		      	 <el-form label-position="left" inline v-for="item in props.row.goodsList" :key="item._id">
		      	  <el-form-item :label="item.productName">
		            <span> x{{ item.productNum }}</span>
		          </el-form-item>
		          <el-form-item v-for="(item1,index) in item.album" :key="item1._id" :label="(index+1).toString()">
		            <span @click="editAlbum(item,props.row)">
		            	<img style="width: 150px;height: 80px;" v-lazy="'../../../static/album/'+item1.url" />
		            </span>
		          </el-form-item>
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column
		      align="center"
		      prop="orderId"
		      label="订单号"
		      min-width>
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="orderTotal"
		      label="订单总额"
		      min-width>
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="orderStatus"
		      label="订单状态"
		      min-width>
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
		      min-width>
		    </el-table-column>
		</el-table>
		<el-pagination
		  background
		  @current-change="currentChange"
		  layout="prev, pager, next,total,jumper"
		  :page-size="8"
		  :total="total"
		  style="display: inline-block;margin-left: 25%;">
		</el-pagination>
    	<el-dialog :visible.sync="dialogAddPhotoVisible" center :title="'选择相片    '+allPhotoCount+'/25'"  width="85%">
		  <el-upload
		  	multiple
		  	:on-success="albumLoadSuc"
		  	:on-exceed="limitAlert"
		  	:limit="uploadLimitCount"
		  	:file-list="fileList"
		  	:data= "orderItemId"
		  	ref="upload"
		  	:auto-upload="false"
			  action="/admin/addOrderAlbum"
			  list-type="picture-card"
			  :on-change="photoChange"
			  :on-preview="handlePictureCardPreview"
			  :on-remove="handleRemove">
			  <i class="el-icon-plus"></i>
			</el-upload>

		  <div slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="addPhotoConfirm">上传</el-button>
		    <el-button @click="dialogAddPhotoVisible = false">取 消</el-button>
		  </div>
		</el-dialog>
		<el-dialog :visible.sync="dialogVisible">
			<span class="arrow arrow-left" @click="prePhoto">&lt;</span>
			<img width="100%" :src="dialogImageUrl" alt="">
			<span class="arrow arrow-right" @click="nextPhoto">&gt;</span>
		</el-dialog>
    </el-main>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			return {
				tableLoading:false,
				tableData:[],
				currentPage:1,
				total:0,
				dialogAddPhotoVisible:false,
				fileListCount:0,
				uploadLimitCount:25,
				fileList:[],
				orderItemId:{
					_id:'',
					userId:'',
					goodsId:''
				},
				currentPhoto:'',
				dialogImageUrl:'',
				dialogVisible:false,
				userId:'',
				goodsItemId:''
			}
		},
		props:['init'],
		watch:{
			init(val,oldVal){
				if(val=='albumManage'){
					this.initTable();
				}
			}
		},
		mounted(){
			
		},
		computed:{
			allPhotoCount(){
				return this.fileListCount;
			}
		},
		methods:{
			initTable(currentPage){
				this.tableLoading = true;
				axios.get('/admin/getOrderList',{
					params:{
						page:currentPage||1,
						pageSize:8,
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
			editAlbum(item,row){
				this.dialogAddPhotoVisible = true;
		    	this.orderItemId._id = row._id;
		    	this.orderItemId.userId = row.userId;
		    	this.orderItemId.goodsId = item._id;
		    	this.userId = row.userId;
		    	this.goodsItemId = item._id;
		    	this.fileListCount = item.album.length;
		    	item.album.forEach((item,index)=>{
		    		if(!item.name){
		    			item.name = item.url;
		    			item.url = './../../static/album/'+item.url;
		    		}
		    		
		    	})
		    	this.fileList = item.album;
			},
			albumLoadSuc(resp, file, fileList){
		    	let res = resp.result;
		      	file._id = res._id;
		    	this.initTable();
		    	if(res.count == 25){
		    		this.dialogAddPhotoVisible = false;
		    		this.$alert('相片已添加完毕！', '完成！', {
					          confirmButtonText: '确定'
					});
		    	}
				console.log(res.count);
		    },
		    limitAlert(file,fileList){
    			this.$alert('相片数量已到达最大数量，无法继续添加！', '错误！', {
			          confirmButtonText: '确定'
			  	});
	    	},
	    	photoChange(file,fileList){
	    		this.fileList = fileList;
		    	this.fileListCount = fileList.length;
		    },
		    handlePictureCardPreview(file) {
	    		this.currentPhoto = file.url;
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },
		    handleRemove(file, fileList) {
			
				console.log(file);
				if(file.status == 'success'){
					axios.post('/admin/delOrderAlbum',{
						userId:this.userId,
						orderId:this.orderItemId._id,
						goodsId:this.goodsItemId,
						photoId:file._id,
					}).then((resp)=>{
						let res = resp.data;
						console.log(res);
						this.initTable();
					})
				}
				this.fileList = fileList;
		        this.fileListCount = fileList.length;
		    },
		    addPhotoConfirm(){
		    	this.$refs.upload.submit();
		    },
		    prePhoto(){
		    	let index = '';
		    	this.fileList.forEach((item)=>{
		    		if(item.url == this.currentPhoto){
		    			index = this.fileList.indexOf(item);
		    			console.log(index);
		    		}
		    		
		    	})
		    	if(index == 0){
			    		this.$alert('目前已是第一张照片！', '错误！', {
						          confirmButtonText: '确定'
						  });
						  return ;
		    		}
		    	this.dialogImageUrl = this.fileList[index-1].url;
		    	this.currentPhoto = this.dialogImageUrl;
		    },
		    nextPhoto(){
		    	let index = '';
		    	this.fileList.forEach((item)=>{
		    		if(item.url == this.currentPhoto){
		    			index = this.fileList.indexOf(item);
		    			console.log(index);
		    		}
		    		
		    	})
		    	if(index == this.fileList.length-1){
			    		this.$alert('目前已是最后一张照片！', '错误！', {
						          confirmButtonText: '确定'
						  });
						  return ;
		    		}
		    	this.dialogImageUrl = this.fileList[index+1].url;
		    	this.currentPhoto = this.dialogImageUrl;
		    },
		}
	}
</script>

<style scoped>
.arrow{
  	border-radius: 10px;
  	color: black;
  	cursor: pointer;
  	position: absolute;
  	display: inline-block;
  	height: 100px;
  	width: 100px;
  	text-align: center;
  	line-height: 100px;
  	font-size: 100px;
   	opacity: 0.3;
   	background-color: gray;
  }
  .arrow:hover{
  	opacity: .5;
  }
  .arrow-left{
  	top: 35%;
  	left: 0%;
  }
  .arrow-right{
  	right: 0%;
		top:35%
  }
</style>
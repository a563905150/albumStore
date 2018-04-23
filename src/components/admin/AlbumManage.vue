<template>
	<el-main v-if="init=='albumManage'">
		{{init}}
    </el-main>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			return {
				
			}
		},
		props:['init'],
		watch:{
			init(val,oldVal){
				if(val=='albumManage'){
					
				}
			}
		},
		mounted(){
			
		},
		methods:{
			
		}
	}
</script>

<style scoped>

</style>
<template>
	<el-main v-if="init=='myOrder'">
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
				if(val == 'myOrder'){
					
				}
			}
		},
	}
</script>

<style>
</style>
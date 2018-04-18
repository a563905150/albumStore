<template>
		<div class="nav-breadcrumb-wrap">
		  <div class="container">
		    <nav class="nav-breadcrumb">
		      <a href="javascript:void(0);" @click="toHome">Home</a>
		      <slot></slot>
		    </nav>
		  </div>
		</div>
</template>

<script>
export default {
	data(){
		return {
			
		}
	},
	methods:{
		toHome(){
			this.$router.push('/');
		}
	}
}
</script>

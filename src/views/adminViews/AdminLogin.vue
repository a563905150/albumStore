<template>
	<div>
		<div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginModalFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">Login in</div>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="errorTip" v-text="tip"></span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" @keydown.enter="login">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="text" tabindex="2"  name="yzm" v-model="yzm" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="validationCode" @keydown.enter="login">
                  </li>
                  <span v-html="validate" @click="getCaptcha"></span>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="login">登  录</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-if="loginModalFlag"></div>
	</div>
</template>

<script>
	import './../../assets/css/base.css'
	import './../../assets/css/login.css'
	import axios from 'axios'
	export default{
		data(){
			return {
				loginModalFlag:true,
				errorTip:false,
				userName:'',
				userPwd:'',
				yzm:'',
				validate:'',
				tip:''
			}
		},
		mounted(){
			this.getCaptcha();
		},
		methods:{
			login(){
				if(!this.userName||!this.userPwd){
					this.errorTip = true;
					this.tip = '用户名或者密码错误';
					return ;
				}else if(!this.yzm){
					this.errorTip = true;
					this.tip = '请输入验证码';
					return ;
				}else if(this.yzm.toLowerCase() != this.getCookie('captcha')){
					this.errorTip = true;
					this.tip = '验证码输入错误';
					return ;
				}
				axios.post('/admin/login',{
					userName:this.userName,
					userPwd:this.userPwd
				}).then((resp)=>{
					let res = resp.data;
					console.log(res.msg);
					if(res.status == 1){
						this.errorTip = true;
					}else{
						this.errorTip = false;
						this.$router.push({path:'/admin'});
					}
				})
			},
			getCaptcha(){
				axios.get('/captcha').then((resp) =>{
					let res = resp.data;
					this.validate = res;
				})
			},
			getCookie(name){
				let arr;
	        	let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	       		if (arr = document.cookie.match(reg)){
		        	return unescape(arr[2]);
		        }else{
		        	return null;
		        }
	         
			}
		}
	}
</script>

<style>
</style>
<template>
	<header class="header">
	  <symbol id="icon-cart" viewBox="0 0 38 32">
	    <title>cart</title>
	    <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
	    <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
	    <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
	    <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
	  </symbol>
	  <div class="navbar">
		    <div class="navbar-left-container">
		      <a href="/">
		        <!--<img class="navbar-brand-logo" src="../../static/logo.png">-->
		      </a>
		    </div>
		    <div class="navbar-right-container" style="display: flex;">
			      <div class="navbar-menu-container">
				        <!--<a href="/" class="navbar-link">我的账户</a>-->
				        <a class="navbar-link" v-text="user" v-if="user" @click="toCenter"></a>
				        <a href="javascript:void(0)" class="navbar-link" @click="login" v-if="!user">Login</a>
				        <a href="javascript:void(0)" class="navbar-link" @click="register" v-if="!user">Register</a>
				        <a href="javascript:void(0)" class="navbar-link" v-if="user" @click="logOut">Logout</a>
				        <div class="navbar-cart-container">
					          <span class="navbar-cart-count"></span>
					          <el-badge :value="cartNum">
					          	<a class="navbar-link navbar-cart-link" href="javascript:void(0);" @click="toCart">
						            <svg class="navbar-cart-logo">
						              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
						            </svg>
					          </a>
					          </el-badge>
					          
					          
				        </div>
			      </div>
		    </div>
	  </div>
	  <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginModalFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">Login in</div>
              <button class="md-close" @click="loginModalFlag=false">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="errorTip" v-text="loginTip"></span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="text" tabindex="2"  name="yzm" v-model="yzm" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="validationCode" @keyup.enter="toLogin('')">
                  </li>
                  <span v-html="validate" @click="getCaptcha"></span>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="toLogin('')">登  录</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag=false"></div>
	  <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':registerModalFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">Register</div>
              <button class="md-close" @click="registerModalFlag=false">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="registerErrorTip" v-text="tip"></span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="loginname" v-model="registerUserName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2"  name="password" v-model="registerUserPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="3"  name="password" v-model="registerUserRePwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="RePassword" @keyup.enter="toRegister">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="text" tabindex="4"  name="mail" v-model="mail" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Email" @keyup.enter="toRegister">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="text" tabindex="5"  name="mailYzm" v-model="mailYzm" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="EmailValidationCode" @keyup.enter="toRegister">
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
              	<a href="javascript:;" class="btn-login" @click="sendMail" v-text="mailTip"></a>
                <a href="javascript:;" class="btn-login" @click="toRegister" style="margin-top: 10px;">注册</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-if="registerModalFlag" @click="registerModalFlag=false"></div>
        <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
        	<p slot='message'>
        		请先登录！
        	</p>
        	<div slot='btnGroup'>
        		<a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
        	</div>
        </modal>
	</header>
</template>

<script>
	import './../assets/css/login.css'
	import Modal from '@/components/Modal'
	import axios from 'axios'
export default {
 	data(){
 		return {
 			mail:'',
 			mailYzm:'',
 			loginTip:'',
 			userName:'',
 			userPwd:'',
 			errorTip:false,
 			loginModalFlag:false,
 			user:'',
 			mdShow:false,
 			registerUserName:'',
 			registerUserPwd:'',
 			registerUserRePwd:'',
 			registerModalFlag:false,
 			registerErrorTip:false,
 			cartNum:0,
 			tip:'',
 			yzm:'',
 			validate:'',
 			time:'点击发送验证码'
 		}
 	},
 	props:['checkChange'],
 	watch:{
 		checkChange(val,oldVal){
 			if(this.getCookie('userId')){
 				this.toLogin(this.getCookie('userId'));
 			}
 		}
 	},
 	computed:{
 		mailTip(){
 			return this.time;
 		}
 	},
 	mounted(){
 		if(this.$route.query.isLogin == 'no'){
				this.loginModalFlag = true;
		}
 		if(this.getCookie('userId')){
 			this.toLogin(this.getCookie('userId'));
 		}
 	},
	methods:{
		login(){
			this.getCaptcha();
			this.loginModalFlag = true;
   				
		},
		sendMail(){
			axios.post('/users/mailValidation',{
				mail:this.mail
			}).then((resp) =>{
				let res = resp.data.status;
				if(res == 0){
					this.time = 60;
					let interval = setInterval(() =>{
						this.time--;
						if(this.time == 0){
							clearInterval(interval);
							this.time = '点击发送验证码';
						}
					},1000)
				}
			})
		},
		getCaptcha(){
			axios.get('/captcha').then((resp) =>{
				let res = resp.data;
				this.validate = res;
			})
		},
		toLogin(param){
			if(param){
				axios.post('/users/login',{
   					userId:param
   				}).then((res)=>{
   					this.user = res.data.result.userName;
   					this.cartNum = res.data.result.cartNum;
   				})
			}else{
				if(!this.userName || !this.userPwd){
					this.errorTip = true;
					this.loginTip = "请填写用户名、密码";
					return;
				}else if(!this.yzm){
					this.errorTip = true;
					this.loginTip = "请输入验证码";
					return ;
				}else if(this.yzm.toLowerCase() != this.getCookie("captcha")){
					this.errorTip = true;
					this.loginTip = "验证码错误，请重新输入";
					this.getCaptcha();
					return ;
				}
				axios.post('/users/login',{
   					userName:this.userName,
   					userPwd:this.userPwd
   				}).then((res)=>{
   					if(res.data.status == 1){
   						this.errorTip = true;
   						this.loginTip = "用户名或密码错误，请重新输入";
   					}else{
   						this.user = res.data.result.userName;
   						this.cartNum = res.data.result.cartNum;
   						this.loginModalFlag = false;
   					}
   				})
			}
			
		},
		logOut(){
			axios.post('/users/logOut').then((res)=>{
				if(res.data.status == 0){
					this.user = '';
					this.cartNum = 0;
				}
				console.log(res.data.msg);
				this.$router.push('/')
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
	         
		},
		toCart(){
			this.$router.push('cart');
		},
		closeModal(){
			this.mdShow = false;
		},
		register(){
			this.registerModalFlag = true;
		},
		toRegister(){
			if(!this.registerUserName||!this.registerUserPwd||!this.registerUserRePwd){
				this.registerErrorTip = true;
				this.tip = '请填写正确的用户名和密码！';
				return ;
			}else if(this.registerUserPwd != this.registerUserRePwd){
				this.registerErrorTip = true;
				this.tip = '二次密码不一致，请重新输入！';
				return ;
			}else if(!this.mailYzm){
				this.registerErrorTip = true;
				this.tip = '请输入邮箱验证码！';
				return ;
			}else if(this.mailYzm != this.getCookie('mail')){
				this.registerErrorTip = true;
				this.tip = '邮箱验证码不正确,请重新发送！';
				return ;
			}
			axios.post('/users/register',{
				userName:this.registerUserName,
				userPwd:this.registerUserPwd
			}).then((resp)=>{
				let res = resp.data;
				if(res.msg == 'userNameExist'){
					this.registerErrorTip = true;
					this.tip = '该用户名已被注册，请重新输入！';
					return ;
				}else if(res.status == 1){
					this.registerErrorTip = true;
					this.tip = '请填写正确的用户名和密码！';	
					return ;
				}else if(res.status == 0){
					this.registerModalFlag = false;
					this.$message({
			            type: 'success',
			            message: '注册成功!'
			          });
			        this.registerUserName = '';
			        this.registerUserPwd = '';
			        this.registerUserRePwd = '';
					this.user = res.result;
				}
			})
		},
		toCenter(){
			this.$router.push({
				path:'personalCenter',
				query:{
					'userId':this.getCookie('userId')
				}
			})
		}
	},
	components:{
		Modal
	}
}
</script>
<style>
  .header {
    width: 100%;
    background-color: white;
    font-family: "moderat",sans-serif;
    font-size: 16px;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 70px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 5px 20px 10px 20px;
  }
  .navbar-left-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: -20px;
  }
  .navbar-brand-logo {
    /*width: 120px;*/
  }
  .header a, .footer a {
    color: #666;
    text-decoration: none;
  }
  a {
    -webkit-transition: color .3s ease-out;
    transition: color .3s ease-out;
  }
  .navbar-right-container {
    display: none;
    justify-content: flex-start;
    align-items: center;
  }
  .navbar-menu-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
  }
  .navbar-link {
    padding-left: 15px;
  }
  .navbar-cart-container {
    position: relative;
  }
  .navbar-cart-count {
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -9px;
    right: -11px;
    width: 20px;
    border-radius: 10px;
    color: white;
    background-color: #eb767d;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  .navbar-cart-logo {
    width: 25px;
    height: 25px;
    transform: scaleX(-1);
  }
</style>
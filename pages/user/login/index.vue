<template>
	<div> 
		<mt-header :title="'登录'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
			<div slot="right">
				<mt-button @click="zhuce" style="color: #FF0000;">注册</mt-button>
			</div>
		</mt-header>
		<div class="lk_m_index">
			<!-- <top/> -->
			<div class="lk-login">
				<div class="lk-login-bj">
					<img src="../../../static/images/login-testing-bj.jpg" />
				</div>
				<div class="lk-login-from">
					<div class="lk-login-from-input"><i><img src="../../../static/images/phone.jpg" /> </i><input placeholder="请输入您的手机号码" v-model="ruleForm.tel" /> </div>
					<div class="lk-login-from-input"><i><img src="../../../static/images/pwd.jpg" /></i><input placeholder="输入登录 密码" v-model="ruleForm.pass" type="password" /><a href="/user/forget" class="lk-login-from-input-retrieve">忘记密码</a> </div>
					<!-- <div class="lk-login-from-input lk-login-from-input-i">
						<i><img src="../../../static/images/testing.jpg" /></i>
						<input placeholder="请输入验证码" v-model="ruleForm.code" />
						<div class="lk-login-from-input-testing" v-show="show" @click="getCode">获取验证码</div> 
						<div class="lk-login-from-input-testing" v-show="!show">倒计时:{{count}} s</div> 
					</div> -->
					<div class="lk-login-from-radio">
						<div class="lk_login-btn" @click="checkActive">
							<input type="checkbox" />
							<i :class="active?'active':''"></i>
							<span class="lk-login-from-radio-span">自动登录</span> 
						</div>
					</div>
					<div class="lk-login-from-btn"><input type="submit" value="登录" @click="submitForm" /> </div> 
				</div>
			</div>
			<!-- <div class="lk_m_list">
				<div class="lk_m_list_new lk_nw-title">	
					<el-form :rules="rules" :model="ruleForm" ref="ruleForm" label-width="100px" size='mini'>
						<table>
							<el-form-item label="手机" prop="tel">
								<el-input v-model="ruleForm.tel" placeholder="请输入手机号码"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="pass">
								<el-input v-model="ruleForm.pass" placeholder="请输入6到16个字符"></el-input>
							</el-form-item>
							<el-form-item label="验证码" prop="code">
								<el-input v-model="ruleForm.code" placeholder="请输入验证码" class="code-pad">
									<div slot="suffix" v-show="show" @click="getCode">获取验证码</div>
									<div slot="suffix" v-show="!show">倒计时:{{count}} s</div>
								</el-input>
							</el-form-item>
							<div class="lk_login-item lk-flexSpace lk_login-f">
								<a href="/user/reg">注册账号</a>
								<a href="/user/forget">忘记密码</a>
							</div>
							<el-form-item>
								<el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
							</el-form-item>
							
						</table>
					</el-form>
				</div>
				
			</div> -->
			<!-- <div class="lk_m_list__foot">
				<p>地址：福建市鼓楼区公益路3号（203.205-207）</p> 
				<p>联系电话:座机号：0591-83316788</p>
			</div> -->
		</div>
	</div>
</template>

<script>
	const Cookie = process.client ? require('js-cookie') : undefined
	import api from '../../../api/api.js'
	import top from '../../../components/top.vue'
	import { Toast,MessageBox,Indicator } from 'mint-ui';
	export default{
		middleware: ['weburl'],
		components: {
			top:top,
		},
		data(){
			return{
				show: true,//倒计时显示隐藏
				count: '',//倒计时秒数
				fullscreenLoading:false,//加载中
				timer: null,
				ruleForm: {
					pass: '',
					tel:'',
					code:'',
				},
				index:'',
				active:false,
				
			}
		},
		async asyncData (app) {
			var index = await api.postData('/Login/sys')
			if(index.status == 1){
				return{
					index:index.data
				}
			}
		},
		head(){
			return {
				title:this.index.site_name
			}
		},
		created() {
			var c = Cookie.get('userLogin')
			
			if(c != undefined){
				var cookie = JSON.parse(c)
				this.ruleForm.pass = cookie.password;
				this.ruleForm.tel = cookie.username;
			}
		},
		methods: {
			//返回上一页
			backto() {
				this.$router.go(-2);
			},
			//跳转注册页面
			zhuce(){
				this.$router.push('/user/reg')
			},
			//用户是否勾选
			checkActive(){
				if(this.active){
					this.active = false
				}else{
					this.active = true;
				}
			},
			//获取验证码
			getCode(){
				var that = this;
				var phone = that.ruleForm.tel;
				// var phoneReg = /^1[345678]\d{9}$/;
				if(phone == ''){
					Toast('手机号码不能为空')
					return false;
				}
				// if(phone.length != 13){
				// 	Toast('请输入13位手机号码,手机号前面加80')
				// 	return false;
				// }
				// if (!phoneReg.test(phone)){
				// 	Toast('手机号码错误')
				// 	return false;
				// }
				var phone = phone.length == 13?phone.slice(2):phone
				var datas = {
					tel:phone
				}
				Indicator.open();
				api.postData('/Sms/sms_code',datas).then((res)=>{
					Indicator.close();
					if(res.data.Code == 'isv.BUSINESS_LIMIT_CONTROL'){
						MessageBox('提示', '同一手机发送频率过高，请过段时间再发送');
						return false;
					}
					var TIME_COUNT = 60;
					if (!that.timer){
						that.count = TIME_COUNT;
						that.show = false;
						that.timer = setInterval(()=>{
							if (that.count > 0 && that.count <= TIME_COUNT){
								that.count--;
							}else {
								that.show = true;
								clearInterval(that.timer);
								that.timer = null;
							}
						},1000)
					}
				})
			},
			//登录
			submitForm(formName){
				var that = this;
				var fs = this.ruleForm;
				if(!fs.tel){
					Toast('请输入手机号码')
					return false;
				}
				if(!fs.pass){
					Toast('请输入密码')
					return false;
				}
				var datas = {
					'username':fs.tel.length==13?fs.tel.slice(2):fs.tel,
					'password':fs.pass,
					'code':fs.code
				}
				api.postData('/Login/login',datas).then((res)=>{
					if(res.status == -1){
						MessageBox.alert('你已登录，无需重复登录').then(action => {
							that.$router.push('/shop/member')
						});
					}else if(res.status == 1){
						if(that.active){
							Cookie.set('userLogin',{'username':fs.tel,'password':fs.pass})	//保存缓存
						}else{
							Cookie.remove('userLogin')
						}
						MessageBox.alert('登录成功').then(action => {
							that.$router.push('/shop/member')
						});
					}else if(res.status == 0){
						Toast('账号密码错误')
					}else if(res.status == -2){
						Toast('手机验证码错误')
					}else if(res.status == -3){
						MessageBox({
						  title: '提示',
						  message: res.msg,
						  showCancelButton: true,
						  confirmButtonText:'联系客服',
						  cancelButtonText:'取消'
						}).then(action => {
							if(action == 'confirm'){
								window.location.href = "tel:"+that.index.tel;
							}else{
								return false;
							}
						})
					}
				})
			},
		},
		mounted(){
			
		}
	}
</script>

<style>
</style>

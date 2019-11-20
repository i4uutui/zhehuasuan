<template>
	<div> 
		<mt-header :title="'注册'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
			<div slot="right">
				<mt-button @click="tologin" style="color: #FF0000;">登录</mt-button>
			</div>
		</mt-header>
		<div class="lk_m_index">
			<!-- <top/> -->
			<div class="lk-reg">
				<div class="lk-reg-bj">
					<img src="../../../static/images/reg-bj.jpg" />
				</div>
				<div class="lk-reg-from">
					<div class="lk-reg-from-input">
						<i><img src="../../../static/images/phone.jpg" /> </i>
						<input placeholder="请输入您的手机号码" v-model="ruleForm.tel" /> 
					</div>
					<div class="lk-reg-from-input">
						<i><img src="../../../static/images/pwd.jpg" /></i>
						<input placeholder="请输入6-16位密码" type="password" v-model="ruleForm.pass" /> 
					</div>
					<div class="lk-reg-from-input">
						<i><img src="../../../static/images/pwd.jpg" /></i>
						<input placeholder="重复输入6-16位密码" type="password" v-model="ruleForm.checkPass" />
					</div>
					<div class="lk-reg-from-input lk-reg-from-input-i">
						<i><img src="../../../static/images/testing.jpg" /></i>
						<input placeholder="请输入验证码" v-model="ruleForm.code" />
						<div class="lk-reg-from-input-testing" v-show="show" @click="getCode">获取验证码</div> 
						<div class="lk-reg-from-input-testing" v-show="!show">倒计时:{{count}} s</div> 
					</div>
					<div class="lk-reg-from-radio">
						<div class="lk_login-btn" @click="checkActive">
							<input type="checkbox" />
							<i :class="ruleForm.active?'active':''"></i>
							<span class="lk-reg-from-radio-span">我已阅读并接受《隐私政策》 </span> 
						</div>
					</div>
					<div class="lk-reg-from-btn"><input type="submit" @click="submitForm" value="注册" v-loading.fullscreen.lock="fullscreenLoading" /> </div> 
				</div>
			</div>
			<!-- <div class="lk_m_list">
				<div class="lk_m_list_new lk_nw-title">	
					<div class="lk_login-input">
						<el-form :rules="rules" :model="ruleForm" ref="ruleForm" label-width="100px" size='mini'>
							<table>
								<el-form-item label="手机" prop="tel">
									<el-input v-model="ruleForm.tel" placeholder="请输入手机号码"></el-input>
								</el-form-item>
								<el-form-item label="密码" prop="pass">
									<el-input v-model="ruleForm.pass" placeholder="请输入6到16个字符"></el-input>
								</el-form-item>
								<el-form-item label="确认密码" prop="checkPass">
									<el-input v-model="ruleForm.checkPass" placeholder="请再输入一次密码"></el-input>
								</el-form-item>
								<el-form-item label="验证码" prop="code">
									<el-input v-model="ruleForm.code" placeholder="请输入验证码" class="code-pad">
										<div slot="suffix" v-show="show" @click="getCode">获取验证码</div>
										<div slot="suffix" v-show="!show">倒计时:{{count}} s</div>
									</el-input>
								</el-form-item>
								 <el-form-item label="" label-width='30px' prop="check" class="lk_check-left">
									<el-checkbox-group v-model="ruleForm.check">
									  <el-checkbox label="" name="check" class="lk-fonds"></el-checkbox>
									</el-checkbox-group>我已阅读并完全同意<a href="/list_article/article?id=55" target="_blank" class="lk_check-span">《条款内容》</a>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">注册</el-button>
								</el-form-item>
								
							</table>
						</el-form>
					</div>
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
	import api from '../../../api/api.js'
	import top from '../../../components/top.vue'
	import { Toast,Indicator,MessageBox } from 'mint-ui';
	export default{
		middleware: ['weburl'],
		components: {
			top:top,
		},
		data(){
			return {
				show: true,//倒计时显示隐藏
				count: '',//倒计时秒数
				timer: null,
				fullscreenLoading:false,//加载中
				ruleForm: {
					pass: '',
					checkPass:'',
					tel:'',
					code:'',
					active:false,
				},
				setting:''
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
		methods: {
			//返回上一页
			backto() {
				this.$router.go(-1);
			},
			//去登录跳转
			tologin(){
				this.$router.push('/user/login');
			},
			//用户是否有勾选
			checkActive(){
				if(this.ruleForm.active){
					this.ruleForm.active = false
				}else{
					this.ruleForm.active = true;
				}
			},
			//选择身份
			ident(e) {
				console.log(e)
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
				// 	Toast('手机号不正确')
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
			//注册
			submitForm(formName){
				var that = this;
				var fs = this.ruleForm;
				if(fs.active != true){
					Toast('未勾选同意条款项')
					return false;
				}
				if(fs.pass.length < 6){
					Toast('密码长度不得少于6位')
					return false;
				}else if(fs.checkPass != fs.pass){
					Toast('两次密码输入不一致')
					return false;
				}
				var datas = {
					'data[username]':fs.tel.length==13?fs.tel.slice(2):fs.tel,
					'data[password]':fs.pass,
					'data[type]':1,
					'data[tel]':fs.tel,
					'data[code]':fs.code
				}
				that.fullscreenLoading = true;
				setTimeout(function(){
					api.postData('/Login/register',datas).then((res)=>{
						that.fullscreenLoading = false;
						if(res.status == -1){
							Toast('不能重复注册')
							return false;
						}else if(res.status == 0){
							Toast('该用户名已存在')
							return false;
						}else if(res.status == -2){
							Toast('手机验证码错误')
							return false;
						}else if(res.status == 1){
							MessageBox.alert('注册成功,系统自动登录').then(action => {
								that.$router.push('/shop/member')
							});
						}
					})
				},500)
			}
		},
	}
</script>

<style>
</style>

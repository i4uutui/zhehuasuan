<template>
	<div> 
		<mt-header :title="'忘记密码'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
			<div slot="right">
				<mt-button @click="tologin" style="color: #FF0000;">登录</mt-button>
			</div>
		</mt-header>
		<div class="lk_m_index">
			<!-- <top/> -->
			<div class="lk-retrieve">
				<div class="lk-retrieve-bj">
					<img src="../../../static/images/retrieve-bj.jpg" alt="">
				</div>
				<div class="lk-retrieve-from">
					<div class="lk-retrieve-from-input">
						<i><img src="../../../static/images/phone.jpg" /> </i>
						<input placeholder="请输入您的手机号码" v-model="fm.tel" /> 
					</div>
					<div class="lk-retrieve-from-input">
						<i><img src="../../../static/images/pwd.jpg" /></i>
						<input placeholder="请输入6-16位密码" type="password" v-model="fm.pass" /> 
					</div>
					<div class="lk-retrieve-from-input">
						<i><img src="../../../static/images/pwd.jpg" /></i>
						<input placeholder="重复输入6-16位密码" type="password" v-model="fm.checkPass" />
					</div>
					<div class="lk-retrieve-from-input lk-retrieve-from-input-i">
						<i><img src="../../../static/images/testing.jpg" /></i>
						<input placeholder="请输入验证码" v-model="fm.code" />
						<div class="lk-retrieve-from-input-testing" v-show="show" @click="getCode">获取验证码</div> 
						<div class="lk-retrieve-from-input-testing" v-show="!show">倒计时:{{count}} s</div> 
					</div>
					<div class="lk-retrieve-from-btn"><input type="submit" @click="fotgetSubmit" value="确定" /> </div> 
				</div>
			</div>
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
				fm:{
					tel:'',
					pass:'',
					checkPass:'',
					code:'',
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
			//点击找回密码
			fotgetSubmit(){
				var that = this;
				var fs = this.fm;
				if(fs.tel == '' || fs.code == '' || fs.pass == '' || fs.checkPass == ''){
					Toast('请完善表单信息')
					return false;
				}else{
					if(fs.checkPass != fs.pass){
						Toast('两次密码输入不一致')
						return false;
					}
					var datas = {
						'data[username]':fs.tel.length==13?fs.tel.slice(2):fs.tel,
						'data[password]':fs.pass,
						'data[tel]':fs.tel,
						'data[code]':fs.code
					}
					setTimeout(function(){
						api.postData('/Login/reset_password',datas).then((res)=>{
							if(res.status == 1){
								MessageBox.alert('密码修改成功，请重新登录').then(action => {
									that.$router.push('/user/login')
								});
							}else if(res.status == -2){
								Toast('手机验证码不正确，请重新输入','提示',{})
							}else if(res.status == -1){
								Toast('此账号不存在','提示',{})
							}
						})
					},100)
				}
			},
			//获取验证码
			getCode(){
				var that = this;
				var phone = that.fm.tel;
				
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
		},
		mounted(){
			
		}
	}
</script>

<style>
	.lk_login-lable {
		width: 80px;
		display: inline-block;
		text-align: right;
	}
</style>

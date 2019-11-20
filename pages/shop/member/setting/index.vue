<template>
	<div class="lk-setting-box">
		<mt-header :title="'设置'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
		</mt-header>
		<div class="lk-setFirst">
			<div class="lk_pd lk-flexBox lk-flexSpace">
				<div class="lk-flex lk-set-left">头像</div>
				<div class="lk-set-img">
					<input type="file" id="change" accept="image" @change="change">
					<img :src="pik.img?pik.img:'http://lieke.lieren0769.com/navlist1.png'" alt="">
				</div>
			</div>
		</div>
		<mt-field label="昵称" v-model="pik.name" placeholder="请输入你的昵称"></mt-field>
		<mt-field label="性别" v-model="pik.sex_text" placeholder="请输入你的性别" disabled  @click.native="appGender"></mt-field>
		<mt-field label="出生日期" v-model="pik.born" placeholder="请输入你的出生日期" disabled @click.native="open('picker2')"></mt-field>
		<mt-field label="手机" v-model="pik.tel" placeholder="请输入你的手机号码" :value="pik.tel" disabled></mt-field>
		<mt-field label="邮箱" placeholder="请输入你的邮箱" v-model="pik.email"></mt-field>
		<div class="lk-bg-fff lk-addAddress-button">
			<mt-button class="lk-button-red" @click="fromSave">保存</mt-button>
		</div>
		
		
		
		
		<!-- 日期弹出窗 -->
		<mt-datetime-picker ref="picker2" type="date" v-model="value2" :startDate="startDate" :endDate="endDate" @confirm="handleChange"></mt-datetime-picker>
		<!-- 性别弹出窗 -->
		<mt-popup v-model="popupVisible" position="bottom">
			<mt-picker :slots="genderSlot" @change="onYearChange" :visible-item-count="3" showToolbar>
				<div class="lk-flexBox lk-flexSpace lk-picker">
					<div  class="picker-cancel" @click="addressChooseCancel">关闭</div>
					<div  class="picker-sure" @click="confirmChoose">确认</div>
				</div>
			</mt-picker>
		</mt-popup>
	</div>
</template>

<script>
	import api from '../../../../api/api.js'
	import { Toast,Indicator } from 'mint-ui';
	export default{
		middleware: ['weburl','auth'],
		data(){
			return{
				url: "",
				pik:{
					img:'',
					tel:'',
					name:'',
					sex:'',//性别值
					sex_text:'',//性别
					email:'',//邮箱
					born:''//日期
				},
				imgTure:false,	//是否有上传图片
				pImg:'',
				popupVisible:false,
				genderSlot: [{
				  flex: 1,
				  values: ['男','女','保密'],
				  className: 'slot1',
				  defaultIndex:0
				}],
				startDate: '',//最小日期
				endDate:'',//最大日期
				value2: null,
				visible2: false,
				user:''
			}
		},
		
		async asyncData (params) {
			var index = await api.postData('Member/info');
			if(index.status == 1){
				return{
					user:index.data.admin_system,
					pik:index.data.member,
					pImg:index.data.member.img
				}
			}else{
				MessageBox.alert('服务出错，请联系管理员').then(action => {});
			}
		},
		head(){
			return {
				title:this.user.site_name
			}
		},
		created() {
			//计算弹出窗的最大最小日期
			var date = new Date();
			var date2 = new Date();//获取当前时间
			date.setDate(date.getDate()-18250);
			this.startDate = date;
			date2.setDate(date.getDate()+18250);
			this.endDate = date2;
		},
		mounted() {
			
		},
		methods:{
			//用户数据上传提交
			fromSave(){
				console.log(this.pik.img)
				// return false;
				var that = this;
				var emailVal = this.pik.email;
				var tel = this.pik.tel;
				var a = this.pik.img == this.pImg?0:1;
				var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(emailVal))){
					Toast('邮箱格式错误');
				}else if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(tel))){
					Toast('手机号码格式错误');
				}else{
					Indicator.open('保存中...');
					if(that.imgTure){		//用户是否有上传图片
						var pk = {'data[img]':this.pik.img,'data[name]':this.pik.name,'data[born]':this.pik.born,'data[sex]':this.pik.sex,'data[tel]':this.pik.tel,'data[email]':this.pik.email,edit:1,is_upload_img:a}
					}else{
						var pk = {
							'data[name]':this.pik.name,
							'data[born]':this.pik.born,
							'data[sex]':this.pik.sex,
							'data[tel]':this.pik.tel,
							'data[email]':this.pik.email,
							edit:1,
							is_upload_img:a,
						}
					}
					
					setTimeout(function(){
						api.postData('/Member/info',pk).then((res) => {
							Indicator.close();
							if(res.status == 1){
								Toast('修改成功');
								setTimeout(function(){
									that.$router.go(-1);
								},1000)
							}else{
								MessageBox.alert('服务出错，请联系管理员').then(action => {});
							}
						})
					},1000)
				}
			},
			// 文件上传并压缩成base64
			change(file){
				var that = this;
				let imgSrc = window.URL.createObjectURL(file.target.files[0]);
				let imgbox = new Image()
				imgbox.src = imgSrc
				imgbox.onload = function(){
					let canvasWidth = imgbox.width //图片原始长宽
					let canvasHeight = imgbox.height;
					let base = canvasWidth/canvasHeight;
					if(canvasWidth>500){//如果图片的宽度大于250的话，画布设置为250；图片小于250，不设置画布大小
						canvasWidth = 500;
						canvasHeight = Math.floor(canvasWidth/base);
					}
					let canvas = document.createElement('canvas');		//定义绘图
					let ctx = canvas.getContext('2d');
					canvas.width = canvasWidth;		//绘图的宽高
					canvas.height = canvasHeight;
					ctx.drawImage(imgbox, 0, 0, canvasWidth, canvasHeight);	//最终绘图
					var dataURL=canvas.toDataURL('image/jpeg');		//将默认格式png转化为jpeg格式并输出base64
					//输出到页面上
					that.pik.img = dataURL;
					that.imgTure = true;
				}
			},
			//返回上一页
			backto() {
				this.$router.go(-1);
			},
			// 日期选择
			open(picker) {
				this.$refs[picker].open();
			},
			//日期输入到输入框里面
			handleChange(value) {
				var d = new Date(value);
				console.log(d.getMonth())
				this.pik.born = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
			},
			//性别弹窗
			appGender(){
				if(this.popupVisible){
					this.popupVisible = false;
				}else{
					this.popupVisible = true;
				}
			},
			// 选择性别
			onYearChange(picker, values) {
				// console.log(values)
				this.genderPick = values[0];	//选择器所选择的值
			},
			//picker取消
			addressChooseCancel(){
				this.popupVisible = false
			},
			//picker确定
			confirmChoose(){
				var vals = this.genderSlot[0];
				var val = this.genderPick;			//选择器所选择的值
				if(val == '男'){
					this.pik.sex = 0;
				}else if(val == '女'){
					this.pik.sex = 1
				}else{
					this.pik.sex = 2
				}
				this.pik.sex_text = val;
				this.popupVisible = false
				for(var i = 0; i<vals.values.length; i++){	//将下标值给genderSlot的defaultIndex
					if(vals.values[i] == val){
						this.genderSlot[0].defaultIndex = i;
					}
				}
			}
		}
	}
</script>

<style>
	
	
</style>

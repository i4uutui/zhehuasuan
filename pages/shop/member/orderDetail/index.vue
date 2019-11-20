<template>
	<div>
		<mt-header :title="'订单详情'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
		</mt-header>
		<div class="lk_oDetail-title" v-if="base.status ==1">等待付款</div>
		<div class="lk_oDetail-title" v-if="base.status ==2">等待发货</div>
		<div class="lk_oDetail-title" v-if="base.status ==3">等待收货</div>
		<div class="lk_oDetail-title" v-if="base.status ==4">已完成</div>
		<div class="lk_oDetail-title" v-if="base.status ==5">退款中</div>
		<div class="lk_oDetail-title" v-if="base.status ==6">已退款</div>
		<div class="lk_oDetail-title" v-if="base.status ==7">已取消</div>
		<div style="height: 10px;background:#eee;" v-if="base.status ==1 || base.status ==2"> </div>
		<div class="lk_pay lk-flexBox" v-if="base.status ==1 || base.status ==2">
			<div class="lk_pay-leftImg center justify-center centImg">
				<div class="lk_pay-cell"><img src="@/static/images/pay3.png" alt=""></div>
			</div>
			<div class="lk_pay-t" v-if="base.status ==1">
				您在 {{base.site_name}} 商场提交了订单，等待付款<span class="user_orderphp">{{base.add_time_text}}</span>
			</div>
			<div class="lk_pay-t" v-if="base.status ==2">
				您已在 {{base.site_name}} 商城提交了付款订单<span class="user_orderphp">{{base.pay_time_text}}</span>
			</div>
		</div>
		<div style="height: 10px;background:#eee;"> </div>
		<div v-if="base.status == 1">
			<div class="lk_pay lk-flexBox" @click="toAddress" v-if="base.consignee_address">
				<div class="lk_pay-leftImg center justify-center centImg">
					<div class="lk_pay-cell"><img src="@/static/images/pay1.png" alt=""></div>
				</div>
				<div class="lk_pay-address">
					<span>&nbsp;{{base.consignee}}<em style="margin-left:20px;">{{base.consignee_tel}}</em></span>
					<p>{{base.consignee_address}}</p>
				</div>
			</div>
			<div class="lk_pay lk-flexBox" @click="toAddress" v-else-if="myaddress != ''">
				<div class="lk_pay-leftImg center justify-center centImg">
					<div class="lk_pay-cell"><img src="@/static/images/pay1.png" alt=""></div>
				</div>
				<div class="lk_pay-address">
					<span>&nbsp;{{myaddress[0].consignee}}<em style="margin-left:20px;">{{myaddress[0].consignee_tel}}</em></span>
					<p>{{myaddress[0].area}}{{myaddress[0].consignee_address}}</p>
				</div>
			</div>
			<div class="lk_pay lk-flexBox" @click="toAddress" v-else>
				<div class="lk_pay-leftImg center justify-center centImg">
					<div class="lk_pay-cell"><img src="@/static/images/pay1.png" alt=""></div>
				</div>
				<div class="lk_pay-address">
					<p>没有收货地址，去添加地址. . .</p>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="lk_pay lk-flexBox">
				<div class="lk_pay-leftImg center justify-center centImg">
					<div class="lk_pay-cell"><img src="@/static/images/pay1.png" alt=""></div>
				</div>
				<div class="lk_pay-address">
					<span>&nbsp;{{base.consignee}}<em style="margin-left:20px;">{{base.consignee_tel}}</em></span>
					<p>{{base.consignee_address}}</p>
				</div>
			</div>
		</div>
		
		<!-- <div style="height: 10px;background:#eee;"> </div>
		<div class="lk-flexBox lk_pd lk_order-coupon">
			<div class="lk_order-artit">优惠券：</div>
			<div class="lk_order-input" @click="popupconus">{{year}}</div>
		</div>
		
		<mt-popup v-model="popupVisible" position="bottom">
			<mt-picker :slots="yearSlot" @change="onYearChange" :visible-item-count="3" showToolbar>
				<div class="lk-flexSpace lk_order-tool">
					<div @click="slotClose">关闭</div>
					<div @click="slotConfirm">确认</div>
				</div>
			</mt-picker>
		</mt-popup> -->
		
		
		<div style="height: 10px;background:#eee;"> </div>
		<div class="lk_order-list1">
			<h2>
				<p><img src="@/static/images/pay2.png" alt=""></p>
				<span>{{base.site_name}} 商城</span>
			</h2>
			<div class="lk_order-list2 lk_order-box">
				<div class="lk_order-list">
					<div class="lk_order-p">
						<div class="lk_orderList1" v-for="(item,index) in base.product_list" :key="index">
							<div class="lk-flexBox">
								<div class="lk_order-img">
									<img :src="item.product_img" alt="">
									
									
								</div>
								<div class="lk_order-title">{{item.title}}</div>
								<div class="lk-flex lk_order-price">{{item.product_price}} <em>X{{item.product_num}}</em></div>
							</div>
							<div class="lk_oreder-list1Pic">
								<div class="lk_orderDetail-ng">{{item.status_text}}</div>
								<p><span>积分小计：</span><strong>{{item.small_amount}}</strong></p>
								<!-- <p><span>提货券小计：</span><strong>{{item.small_warehouse_price}}</strong></p> -->
							</div>
							<div class="lk_order-bing" v-if="item.status>2">
								<div class="lk_order-itm">快递公司：
									<span v-if="item.express_company">{{item.express_company}}</span>
									<span v-else>暂无快递信息</span>
								</div>
								<div class="lk_order-itm">快递单号：
									<span v-if="item.express_sn">{{item.express_sn}}</span>
									<span v-else>暂无快递信息</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="height: 10px;background:#eee;"> </div>
		<div class="lk-flexBox lk_pd lk_orderDetail-bz">
			<div class="lk_order-artit">备注：</div>
			<div class="lk_order-area"><textarea name="" id="" rows="2" v-model="area" placeholder="选填"></textarea></div>
		</div>
		<!-- <div style="height: 10px;background:#eee;" v-if="base.status!=1 && base.status!=2"> </div>
		<div class="lk_order-navContent" v-if="base.status!=1 && base.status!=2">
			<ul>
				<li>快递公司 : {{base.express_company}}</li>
				<li>快递单号 : {{base.express_sn}}</li>
			</ul>
		</div> -->
		<div style="height: 10px;background:#eee;"> </div>
		<div class="lk_order-navContent">
			<ul>
				<li>订单号 : {{base.sn}}</li>
				<li>运输方式 : {{pei.name}}</li>
				<!-- <li>支款方式 : <span @click='paybuottom'>{{payTxt}}</span></li> -->
				<!-- <li>支款方式 : <span v-if="TiId==1">积分</span><span v-if="TiId==2">提货券</span></li>   -->
			</ul>
			
		</div>
		<div style="height: 10px;background:#eee;"></div>
		<div class="lk_order-ti">
			<!-- <div class="lk-flexSpace">
				<div class="lk_order-tiTitle">可用提货券 : <span>{{user.member.warehouse}}</span></div>
				<div class="lk_order-false" :class="TiId?'trues':''" @click="orderTi(TiId)"></div>
			</div>
			<div class="lk-flexSpace" v-if="TiId">
				<div>输入抵扣提货券</div>
				<div class="lk_order-text"><input type="number" :disabled="!TiId" v-model="TiNumber" placeholder="0.00"></div>
			</div> -->
			<div class="lk-flexSpace" v-for="(item,i) in Ti" :key="i" @click="orderTi(item.id)" :data-id="item.id">
				<div>{{item.name}}</div>
				<div class="lk_order-false" :class="item.show?'trues':''"></div>
			</div>
			<!-- <div class="lk-flexSpace" v-if="TiId==2">
				<div>输入抵扣提货券</div>
				<div class="lk_order-text"><input type="number" v-model="TiNumber" placeholder="0.00"></div>
			</div> -->
		</div>
		<div style="height: 10px;background:#eee;"></div>
		<div class="lk_order-jiage">
			<ul>
				<li v-if="TiId == 2">总计提货券 : <span>{{product_warehouse_price}}</span></li>
				<li v-else>总计积分 : <span>{{base.amount}}</span></li>
			</ul>
		</div>
		
		<div style=" height:60px;background:#eee;"></div>
		<div class="lk_order-detail_dowm">
			<!-- <ul v-if="base.status ==2">
				<li style="width: 78px">
					<div class="lk_order-downButton">支付</div>
				</li>
			</ul> -->
			<ul v-if="base.status ==7">
				<li style="width: 78px">
					<div class="lk_order-downButton">已取消</div>
				</li>
			</ul>
			<ul v-if="base.status ==1">
				<div v-if="myaddress == ''" @click="toAddress" style="text-align: center;">请添加收货地址</div>
			 	<li style="width: 150px;height:25px;margin: 0 auto;display: block;" v-else>
					<!-- <paypal-checkout class="paypals" env="production" :amount="base.amount" currency="USD" locale="zh_CN" :client="paypal" v-on:payment-authorized="paymentAuthorized" v-on:payment-cancelled="paymentCancelled"></paypal-checkout> -->
			 		<div class="lk_order-downButton" @click="paymentAuthorized">立即兑换</div>
			 	</li>
			 	<!-- <li style="width: 78px">
			 		 <div class="lk_order-downButton" @click="Nstatus(base.id)">取消订单</div>        
			 	</li> -->
			</ul>
		</div>
	</div>
</template>

<script>
	import api from '../../../../api/api.js'
	import { MessageBox,Toast,Indicator,Picker,Popup } from 'mint-ui';
	export default{
		middleware: ['weburl','auth'],
		data(){
			return{
				err:'',
				user:'',
				area:'',
				selected:'1',
				base:'',
				pei:'',
				amount:'',
				popupVisible:false,		//优惠卷弹窗
				yearpop:'',
				year:'no',
				yearSlot: [],
				indexSot:'',
				indexTrue:'',
				// amout:'',
				payCookie:'',
				myaddress:'',
				
				//积分,提货券支付,任选一个
				Ti:[
					{
						id:1,
						name:'积分支付',
						show:true
					},
					{
						id:2,
						name:'提货券支付',
						show:false
					}
				],
				TiId:1,
				product_warehouse_price:"",		//总需要付的提货券
				
				//支付 + 提货券支付时,开启
				// times:'',
				// TiId:false,
				// TiNumber:'',	//手动填写提货券数量
				// product_warehouse_price:"",		//总需要付的提货券
				// parError:'',
			}
		},
		watch:{
			TiNumber(val){
				var that = this;
				clearTimeout(that.times)
				if(Number(val) > Number(this.user.warehouse)){
					var v = val.substr(0,val.length-1);
					MessageBox('提示', '积分不足');
					this.TiNumber = v;
					return false;
				}
				this.times = setTimeout(function(){
					if(val.length == 1){
						that.TiNumber = val.replace(/[^1-9]/g,'');
						that.getWare(val)
					}else if(val.length == 0){
						that.product_warehouse_price = that.amouts
					}else{
						that.getWare(val)
					}
				},700)
				
				// if(val.length >= 1){
				// 	setTimeout(function(){
				// 		that.getWare(val)
				// 	},200)
				// }else{
				// 	that.product_warehouse_price = that.amouts
				// }
			}
		},
		async created() {
			var that = this;
			var id = that.$route.query.id
			var user = await api.postData('/Member/info')
			//收货地址
			var address = await api.postData('/Order/consignee')
			
			var arrAddress = [];
			var d = address.data;
			for(var i = 0; i<d.length;i++){
				if(d[i].is_default == 1){
					arrAddress.push(d[i])
				}
			}
			//订单详情
			var datas = {
				order_id:id,
			}
			var ress = await api.postData('/Order/order_detail',datas)
			//如果没有此订单
			if(!ress.status){
				MessageBox({
					title: '提示',
					message: ress.msg,
					confirmButtonText:'返回订单列表'
				}).then(action=>{
					if(action == 'confirm'){
						that.$router.push('/shop/member/order/?id=1')
					}
				});
				return false;
			}
			
			var sq = ress.data;
			// console.log(sq.product_list.length)
			for(var i = 0; i<sq.product_list.length;i++){
				var s = Number(sq.product_list[i].product_price) * sq.product_list[i].product_num;
				var q = Number(sq.product_list[i].product_spec.warehouse_price) * sq.product_list[i].product_num
				sq.product_list[i].small_amount = s.toFixed(2);
				sq.product_list[i].small_warehouse_price = q.toFixed(2);
				
			}
			// ress.data.amount = Number(ress.data.amount).toFixed(2);
			// ress.data.amtZ = (Number(ress.data.amount) + Number(ress.data.product_list[0].discount_price)).toFixed(2);
			// console.log(ress.data)
			//优惠卷
			var coupon = await api.postData('/Coupon/coupon_list')
			var c = coupon.data;
			var arr = [
				{
					values: [],
				}
			]
			var arr2 = [];
			var year = '';
			
			if(c.length != 0){
				c.forEach(function(item){
					if(item.status == 1 && Number(ress.data.amount) >= Number(item.coupon_condition)){
						year = 'Do not use'
						arr[0].values.push(item.coupon_title)
						arr2.push(item)
					}
				})
				if(arr[0].values.length == 0){
					year = 'no'
					arr[0].values.push('no')
				}
				ress.data.couponList = arr2;
			}else{
				year = 'no'
				arr[0].values.push('no')
			}
			
			//发货方式
			var ps = await api.postData('/Order/express_type')
			
			this.user = user.data;
			this.base = ress.data;
			this.pei = ps.data[0];
			this.myaddress = arrAddress;
			this.amount = ress.data.amount;
			this.yearSlot = arr;
			this.year = year;
			this.amouts = ress.data.amount;
			this.product_warehouse_price = ress.data.product_warehouse_price;
			
		},
		
		// head(){
		// 	return{
		// 		titleTemplate: this.user.admin_system.site_name
		// 	}
		// },
		methods:{
			getWare(ware){
				var that = this;
				var datas = {
					warehouse:ware,
					order_id:that.base.id
				}
				api.postData('Payment/use_warehouse',datas).then(res=>{
					that.product_warehouse_price = res.data.points
					that.parError = res;
				})
			},
			// 是否选择提货券
			orderTi(index){
				//支付 + 提货券支付时,开启
				// if(this.TiId){
				// 	this.TiId = false;
				// 	this.TiNumber = '';
				// }else{
				// 	this.TiId = true;
				// }
				
				//积分,提货券支付,任选一个
				var ti = this.Ti;
				var that = this;
				if(this.TiId == 1){
					this.TiId = 2;
				}else{
					this.TiId = 1;
				}
				for(var i = 0; i<ti.length;i++){
					ti[i].show = false;
					if(index == ti[i].id){
						ti[i].show = true;
						that.TiId = ti[i].id;
					}
				}
				// if(this.TiId == 1){
				// 	this.TiNumber = '';
				// }
			},
			//返回上一页
			backto() {
				this.$router.go(-1);
			},
			//优惠卷打开
			popupconus(){
				if(this.base.couponList == undefined){
					Toast('没有优惠卷');
					return false;
				}
				// var couponId = 'coupon_list_id=2'
				// var coupon = this.$axios.post('/Coupon/coupon_use',couponId)
				// console.log(coupon)
				this.popupVisible = true;
			},
			slotConfirm(){
				this.year = this.yearpop;
				this.indexTrue = this.indexSot;			//拿到已保存的下标并保存
				// console.log(this.base.couponList)
				if(this.base.couponList.length != 0){			//如果有优惠卷的话，执行下面的代码
					this.base.amount = (Number(this.amouts) - Number(this.base.couponList[this.indexTrue].coupon_money)).toFixed(2);
					this.amount = (Number(this.amouts) - Number(this.base.amount)).toFixed(2);
				}
				this.popupVisible = false;
			},
			slotClose(){
				this.popupVisible = false;
			},
			onYearChange(picker, values) {
				this.yearpop = values[0];
				var y = this.yearSlot[0].values
				for(var i = 0; i<y.length;i++){			//遍历所有的优惠卷
					if(y[i] == values[0]){				//如果选择的优惠卷等于遍历的出来的数据一样
						this.indexSot = i;			//选择好优惠卷后，将下标保存一下
					}
				}
			},
			//发起订单
			tapPay(){
				// base.id		订单id
				// base.amount	总金额
				// pei[0].name	配送方式
				// myaddress[0].consignee	收货人名称
				// this.myaddress[0].area + this.myaddress[0].consignee_address	//收货人地址
				// this.myaddress[0].consignee_tel		//收货人电话
				// this.area			//买家备注
				var that = this;
				
				//积分 + 提货券支付时开启
				// if(!this.TiId){
				// 	var ware = 0;
				// 	var bPrice = this.base.amount;
				// 	var tiId = 1;
				// }else{
				// 	if(!this.TiNumber){
				// 		MessageBox('提示', '提货券不能为空');
				// 		return false;
				// 	}
				// 	if(Number(this.TiNumber) > Number(this.user.member.warehouse)){
				// 		MessageBox('提示', '提货券不足');
				// 		return false;
				// 	}
				// 	if(this.parError.status != 1){
				// 		MessageBox('提示', this.parError.msg);
				// 		return false;
				// 	}
				// 	var ware = this.TiNumber;
				// 	var bPrice = this.product_warehouse_price;
				// 	var tiId = 3;
				// }
				
				
				//积分,提货券支付,任选一个
				if(this.TiId == 1){
					var tiId = 1;
					var bPrice = this.base.amount;
					var ware = '';
				}else{
					var tiId = 2;
					var bPrice = '';
					var ware = this.product_warehouse_price;
				}
				
				var datas = {
					order_id:this.base.id,
					point_price:bPrice,
					warehouse_price:ware,
					pay_type:tiId,
				}
				Indicator.open('正在支付，请稍等...');
				setTimeout(function() {
					api.postData('/Payment/pay',datas).then((res)=>{
						Indicator.close();
						if(res.status == 1){
							Toast(res.msg);
							setTimeout(function() {
								that.$router.push('/shop/member')
							}, 500);
						}else if(res.status == -4){
							MessageBox('提示', '订单异常，请联系客服');
							return false;
						}else if(res.status == -6){
							Toast(res.msg);
							that.$router.push('/shop/member/order?id=1')
							return false;
						}else{
							MessageBox('提示', res.msg);
							return false;
						}
					})
				}, 1500);
			},
			
			//添加修改收货地址
			paymentAuthorized() {
				
				// if(Number(this.TiNumber) > Number(this.base.amount)){
				// 	Toast('提货券数量不能大于总金额');
				// 	return false;
				// }
				// if(this.Ti){
				// 	if(this.TiNumber == ''){
				// 		Toast('提货券数量不能为空');
				// 		return false;
				// 	}
				// }
				
				// if(this.TiId == 1){
				// 	var bPrice = this.base.amount
				// }else if(this.TiId == 2){
				// 	var bPrice = this.base.product_warehouse_price
				// }
				var that = this;
				if(this.myaddress == ''){
					Toast('请添加收货地址');
					return false
				}else{
					
					//提货卷禁止用户支付
					if(this.TiId == 2){
						MessageBox.alert('暂未开通提货券支付，敬请期待！').then(action => {});
						return false;
					}
					
					Indicator.open('加载中...');
					var a = this.myaddress
					var conDatas = {
						order_id:this.base.id,
						'data[pay_amount]':this.base.amount,
						'data[express_type]':this.pei.name,
						'data[consignee]':this.myaddress[0].consignee,
						'data[consignee_address]':this.myaddress[0].area + this.myaddress[0].consignee_address,
						'data[consignee_tel]':this.myaddress[0].consignee_tel,
						edit:1
					}
					setTimeout(function(){
						api.postData('/Order/order_detail',conDatas).then((res)=>{
							Indicator.close();
							if(res.status == -3){
								MessageBox({
									title: '提示',
									message: res.msg
								}).then(action=>{
									if(action == 'confirm'){
										that.$router.push('/shop/member/order/?id=1')
										return false;
									}
								});
								return false;
							}
							that.tapPay()
						})
					},500)
				}
			},
			//取消订单
			Nstatus(id){
				var that = this;
				MessageBox({
				  title: '提示',
				  message: '是否取消该订单！',
				  showCancelButton: true,
				}).then(red=>{
					if(red == 'confirm'){
						var datas = {
							order_id:id,
							status:7
						}
						api.postData('/Order/order_status',datas).then((res) => {
							if(res.status == 1){
								Toast('订单取消成功');
								setTimeout(function(){
									that.$router.push('/shop/member/order?id=1')
								},500)
							}else{
								Toast('该订单无法取消');
								setTimeout(function(){
									that.$router.push('/shop/member/order?id=1')
								},500)
							}
						})
					}
				});
			},
			//跳转添加地址
			toAddress(){
				// var id = this.base.id
				// Cookie.set('orderId', id)
				this.$router.push('/shop/member/addAddress')
			}
		}
	}
</script>

<style>
	#__layout{background: #fff;}
</style>

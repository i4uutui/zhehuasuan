<template>
	<div>
		<mt-header :title="'我的订单'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
		</mt-header>
		<mt-navbar v-model="selected" class="lk_order-nav" :data-id="selected">
			<mt-tab-item id="1">全部({{all1.length}})</mt-tab-item>
			<mt-tab-item id="2">未支付({{all2.length}})</mt-tab-item>
			<mt-tab-item id="3">待发货({{all3.length}})</mt-tab-item>
			<mt-tab-item id="4">确认收货({{all4.length}})</mt-tab-item>
			<mt-tab-item id="5">已完成({{all5.length}})</mt-tab-item>
		</mt-navbar>
		
		<mt-tab-container v-model="selected" class="lk_order-box">
			<!-- 全部 -->
			<mt-tab-container-item id="1">
				<div class="lk_order-list" v-for="(item,index) in all1" :key="index">
					<a @click="toPay(item)" class="lk-flexSpace">
						<div class="lk_order-sn">订单编号: <span>{{item.sn}}</span></div>
						<div class="lk_order-red">{{item.status_text}}</div>
					</a>
					
					<div class="lk_order-p">
						
						<div class="lk-flexBox" v-for="(items,index) in item.product_list" :key="index">
							<div class="lk_order-img"><img :src="items.product_img" alt=""></div>
							<div class="lk_order-title">{{items.title}} <!-- <span>品牌 : {{items.brand_name}}；规格 : {{items.product_spec.name}}</span> --></div>
							<div class="lk-flex lk_order-price">{{items.product_price}} 
								<em>X{{items.product_num}}</em>
								<span v-if="items.status">
									{{items.status_text}}
								</span>
								<span v-else>{{item.status_text}}</span>
								
							</div>
						</div>
						
					</div>
					<div class="lk_order-pic">{{item.product_list.length}} 件商品 &nbsp;&nbsp;总计：<strong>{{item.amount}}</strong></div>
					<div class="lk_order-anniu" style="width:95%;" v-if="item.status == 7">
						<div class="lk_order-button" style="background: #FFFFFF;color: #666;border: 1px solid #ccc">已取消</div>
					</div>
					<div class="lk_order-anniu" style="width:95%;" v-else-if="item.status == 3">
						<!-- <div class="lk_order-button">未发货</div> -->
						<div class="lk_order-button" @click="Refund(item)">申请退款</div>
					</div>
					<div class="lk_order-anniu" style="width:95%;" v-else-if="item.status == 1">
						<div class="lk_order-button" @click="toPay(item)">支付</div> 
						<div class="lk_order-button" @click="Nstatus(item.id)">取消</div>
					</div>
					<div class="lk_order-anniu" style="width:95%;" v-else-if="item.status == 9">
						<div class="lk_order-button" @click='Receipt(item.id)'>确认收货</div>
					</div>
					<div class="lk_order-anniu" style="width:95%;" v-else>
						<div class="lk_order-button">{{item.status_text}}</div>
					</div>
				</div>
				<div class="lk_loader-spinner">
					<div class="lk_jiazai lk-flexBox">
						<em></em>
						<span>已经到底啦！</span>
						<em></em>
					</div>
				</div>
			</mt-tab-container-item>
			<!-- 未付款 -->
			<mt-tab-container-item id="2">
				<div class="lk_order-list" v-for="(item,index) in all2" :key="index">
					<a @click="toPay(item)" class="lk-flexSpace">
						<div class="lk_order-sn">订单编号: <span>{{item.sn}}</span></div>
						<div class="lk_order-red">未支付</div>
					</a>
					<div class="lk_order-p">
						<div class="lk-flexBox" v-for="(items,index) in item.product_list" :key="index">
							<div class="lk_order-img"><img :src="items.product_img" alt=""></div>
							<div class="lk_order-title">{{items.title}} <!-- <span>品牌 : {{items.brand_name}}；规格 : {{items.product_spec.name}}</span> --></div>
							<div class="lk-flex lk_order-price">{{items.product_price}} 
								<em>X{{items.product_num}}</em>
								<span v-if="items.status">
									{{items.status_text}}
								</span>
								<span v-else>{{item.status_text}}</span>
							</div>
						</div>
						
					</div>
					<div class="lk_order-pic">{{item.product_list.length}} 件商品 &nbsp;&nbsp;总计：<strong>{{item.amount}}</strong></div>
					<div class="lk_order-anniu" style="width:95%;">
						<div class="lk_order-button" @click="toPay(item)">支付</div> 
						<div class="lk_order-button" @click="Nstatus(item.id)">取消</div>
					</div>
				</div>
				<div class="lk_loader-spinner">
					<div class="lk_jiazai lk-flexBox">
						<em></em>
						<span>已经到底啦！</span>
						<em></em>
					</div>
				</div>
			</mt-tab-container-item>
			<!-- 待发货 -->
			<mt-tab-container-item id="3">
				<div class="lk_order-list" v-for="(item,index) in all3" :key="index">
					<a @click="toPay(item)" class="lk-flexSpace">
						<div class="lk_order-sn">订单编号: <span>{{item.sn}}</span></div>
						<div class="lk_order-red">{{item.status_text}}</div>
					</a>
					<div class="lk_order-p">
						<div class="lk-flexBox" v-for="(items,index) in item.product_list" :key="index">
							<div class="lk_order-img"><img :src="items.product_img" alt=""></div>
							<div class="lk_order-title">{{items.title}} <!-- <span>品牌 : {{items.brand_name}}；规格 : {{items.product_spec.name}}</span> --></div>
							<div class="lk-flex lk_order-price">{{items.product_price}} 
								<em>X{{items.product_num}}</em>
								<span v-if="items.status">
									{{items.status_text}}
								</span>
								<span v-else>{{item.status_text}}</span>
							</div>
						</div>
						
					</div>
					<div class="lk_order-pic">{{item.product_list.length}} 件商品 &nbsp;&nbsp;总计：<strong>{{item.amount}}</strong></div>
					<div class="lk_order-anniu" style="width:95%;">
						<!-- <div class="lk_order-button">未发货</div> -->
						<div class="lk_order-button" @click="Refund(item)">申请退款</div>
					</div>
				</div>
				<div class="lk_loader-spinner">
					<div class="lk_jiazai lk-flexBox">
						<em></em>
						<span>已经到底啦！</span>
						<em></em>
					</div>
				</div>
			</mt-tab-container-item>
			<!-- 确认收货 -->
			<mt-tab-container-item id="4">
				<div class="lk_order-list" v-for="(item,index) in all4" :key="index">
					<a @click="toPay(item)" class="lk-flexSpace">
						<div class="lk_order-sn">订单编号: <span>{{item.sn}}</span></div>
						<div class="lk_order-red">确认收货</div>
					</a>
					<div class="lk_order-p">
						<div class="lk-flexBox" v-for="(items,index) in item.product_list" :key="index">
							<div class="lk_order-img"><img :src="items.product_img" alt=""></div>
							<div class="lk_order-title">{{items.title}} <!-- <span>品牌 : {{items.brand_name}}；规格 : {{items.product_spec.name}}</span> --></div>
							<div class="lk-flex lk_order-price">{{items.product_price}} 
								<em>X{{items.product_num}}</em>
								<span v-if="items.status">
									{{items.status_text}}
								</span>
								<span v-else>{{item.status_text}}</span>
							</div>
						</div>
						
					</div>
					<div class="lk_order-pic">{{item.product_list.length}} 件商品 &nbsp;&nbsp;总计：<strong>{{item.amount}}</strong></div>
					<div class="lk_order-anniu" style="width:95%;">
						<div class="lk_order-button" @click="Receipt(item.id)">确认收货</div>
						<div class="lk_order-button" @click="Refund(item)">申请退款</div>
					</div>
				</div>
				<div class="lk_loader-spinner">
					<div class="lk_jiazai lk-flexBox">
						<em></em>
						<span>已经到底啦！</span>
						<em></em>
					</div>
				</div>
			</mt-tab-container-item>
			<!-- 已完成 -->
			<mt-tab-container-item id="5">
				<div class="lk_order-list" v-for="(item,index) in all5" :key="index">
					<a @click="toPay(item)" class="lk-flexSpace">
						<div class="lk_order-sn">订单编号: <span>{{item.sn}}</span></div>
						<div class="lk_order-red">已完成</div>
					</a>
					<div class="lk_order-p">
						
						<div class="lk-flexBox" v-for="(items,index) in item.product_list" :key="index">
							<div class="lk_order-img"><img :src="items.product_img" alt=""></div>
							<div class="lk_order-title">{{items.title}} <!-- <span>品牌 : {{items.brand_name}}；规格 : {{items.product_spec.name}}</span> --></div>
							<div class="lk-flex lk_order-price">{{items.product_price}} 
								<em>X{{items.product_num}}</em>
								<span v-if="items.status">
									{{items.status_text}}
								</span>
								<span v-else>{{item.status_text}}</span>
							</div>
						</div>
						
					</div>
					<div class="lk_order-pic">{{item.product_list.length}} 件商品 &nbsp;&nbsp;总计：<strong>{{item.amount}}</strong></div>
					<div class="lk_order-anniu" style="width:95%;" v-if="item.status == 4">
						<div class="lk_order-button">已完成</div>
						<!-- <div class="lk_order-button" @click="evaluat(item.id)">未评价</div> -->
					</div>
					<div class="lk_order-anniu" style="width:95%;" v-else-if="item.status == 8">
						<div class="lk_order-button">已完成</div>
					</div>
				</div>
				<div class="lk_loader-spinner">
					<div class="lk_jiazai lk-flexBox">
						<em></em>
						<span>已经到底啦！</span>
						<em></em>
					</div>
				</div>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	import api from '../../../../api/api.js'
	import { Toast,Navbar, TabItem,MessageBox,Indicator } from 'mint-ui';
	export default{
		middleware: ['weburl','auth'],
		data(){
			return{
				user:'',
				id:'',
				selected:'1',
				all1:[],			//全部
				all2:[],			//待付款
				all3:[],
				all4:[],
				all5:[],
				undef:0	//是否异常判断
			}
		},
		asyncData (params) {
			if(params.query.id){
				var id = String(params.query.id)
			}else{
				var id = 1
			}
			// console.log(id)
			var sd = api.postData('Order/order_list?lk=1')
			// console.log(sd)
			return api.postData('/Order/order_list').then((res) => {
				if(res.status == 1){
					var z = res.data.order;
					var b = [],c=[],d=[],e=[],a=[]
					for(var i = 0; i<z.length;i++){
						if(z[i].product_list == undefined){
							continue;
						}
						a.push(z[i])
						// console.log(z[i].product_list)
						if(z[i].status == 1){
							b.push(z[i])
						}else if(z[i].status == 3){
							c.push(z[i])
						}else if(z[i].status == 9){
							d.push(z[i])
						}else if(z[i].status == 4 || z[i].status == 8){
							e.push(z[i])
						}
					}
					return{
						user:res.data,
						id:id,
						selected:id,
						all1:a,
						all2:b,
						all3:c,
						all4:d,
						all5:e,
					}
				}
			})
		},
		head(){
			return{
				titleTemplate: this.user.admin_system.site_name
			}
		},
		mounted() {
			if(this.undef == 1){
				MessageBox.alert('订单异常，请联系客服！').then(action => {
					if (action == 'confirm'){
						this.$router.go(-1)
					}
				});
				
			}
		},
		methods:{
			//返回上一页
			backto() {
				this.$router.go(-1);
			},
			//不能退款，有疑问联系客服
			// Call(){
			// 	MessageBox({
			// 	  title: '提示',
			// 	  message: '已发货，如有疑问请联系客服！',
			// 	  showCancelButton: true,
			// 	  confirmButtonText:'联系客服',
			// 	  confirmButtonClass:'lk_confirm-call'
			// 	}).then(action=>{
			// 		if(action == 'confirm'){
			// 			window.location.href = 'tel:'+this.user.admin_system.tel
			// 		}else{
			// 			return false;
			// 		}
			// 	});
			// },
			//申请退款
			Refund(item){
				var that = this;
				if(item.is_send){
					MessageBox({
					  title: '提示',
					  message: '已发货，如有疑问请联系客服！',
					  showCancelButton: true,
					  confirmButtonText: '联系客服',
					  cancelButtonText:'取消',
					  confirmButtonClass:'red'
					}).then(res=>{
						var tel = this.user.admin_system.tel;
						if(res == 'confirm'){
							window.location.href="tel:"+tel
						}
					})
				}else{
					MessageBox({
					  title: '提示',
					  message: '是否申请退款！',
					  showCancelButton: true,
					}).then(red=>{
						if(red == 'confirm'){
							Indicator.open('加载中...');
							var datas = {
								order_id:item.id,
								status:5
							}
							api.postData('/Order/order_status',datas).then((res) => {
								setTimeout(function() {
									Indicator.close();
									if(res.status == 1){
										Toast('申请退款成功');
										that.zj();
									}
								}, 1000);
							})
						}
					});
				}
				
			},
			// 去付款
			toPay(item){
				// for (var i = 0; i<item.product_list.length;i++) {
				// 	if(item.product_list[i].status == 0){
				// 		Toast('该订单已过期');
				// 		return false;
				// 	}
				// }
				
				this.$router.push({path:'/shop/member/orderDetail?id=' + item.id})
			},
			//未评价
			// evaluat(id){
			// 	this.$router.push({name:'buy-grade-id',query:{id:id}})
			// },
			//确认收货
			Receipt(id){
				MessageBox({
					title: '提示',
					message: '确认收货?',
					confirmButtonText:'确认',
					cancelButtonText:'取消',
					showCancelButton: true
				}).then(action=>{
					if(action == 'confirm'){
						Indicator.open('加载中...');
						var that = this;
						var datas = {
							status:4,
							order_id:id
						}
						api.postData('/Order/order_status',datas).then((res) => {
							if(res.status == 1){
								setTimeout(function() {
									Indicator.close();
									that.$router.push({path:'/shop/member'})
								}, 300);
								Toast('确认收货成功');
							}
						})
					}else{
						return false;
					}
				});
				
			},
			//取消订单
			Nstatus(id){
				var that = this;
				MessageBox({
				  title: '提示',
				  message: '确认取消该订单？',
				  showCancelButton: true,
				}).then(red=>{
					if(red == 'confirm'){
						Indicator.open('Loading...');
						var datas = {
							status:7,
							order_id:id
						}
						api.postData('/Order/order_status',datas).then((res) => {
							setTimeout(function(){
								Indicator.close();
								if(res.status == 1){
									Toast('订单已成功取消');
									that.zj();
								}else{
									Toast('该订单无法取消');
									that.zj();
								}
							},500)
						})
					}
				});
			},
			//为了刷新页面，二次调用接口
			zj(){
				var id = this.selected;
				api.postData('/Order/order_list').then((res) => {
					if(res.status == 1){
						var z = res.data.order;
						var b = [],c=[],d=[],e=[],a=[]
						for(var i = 0; i<z.length;i++){
							if(z[i].product_list == undefined){
								continue;
							}
							a.push(z[i])
							// console.log(z[i].product_list)
							if(z[i].status == 1){
								b.push(z[i])
							}else if(z[i].status == 3){
								c.push(z[i])
							}else if(z[i].status == 9){
								d.push(z[i])
							}else if(z[i].status == 4 || z[i].status == 8){
								e.push(z[i])
							}
						}
						this.selected=id
						this.all1=a
						this.all2=b
						this.all3=c
						this.all4=d
						this.all5=e
					}
				})
			}
		}
	}
</script>

<style>
	#__layout{background: #fff;}
	.red{color: #FF0000;}
</style>

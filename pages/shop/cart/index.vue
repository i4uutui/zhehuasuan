<template>
	<div>
		<mt-header :title="'购物车'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
		</mt-header>
		<!--购物车为空提示-->
		<div class="toastTxt" v-if="index.length==0">
			<div class="lk-shop-no"><img src="@/static/images/shoping.png" alt=""></div>
			<div class="lk-shop-noF">购物车为空</div>
			<div class="lk_pd lk-pd-20" style="width: 60%;margin: 0 auto;margin-top: 20px;">
				<mt-button class="lk-button-red" @click="goIndex">到商城去逛逛吧~</mt-button>
			</div>
			<div class="lk-flexBox lk-flexSpace lk-shoping-head">
				<div class="lk-shoping-left">猜你喜欢</div>
				<div class="lk-shoping-right" @click="fre">换一批<img src="@/static/images/Refresh.png" ></div>
			</div>
			<div class="lk-flexBox" style="margin-top: 20px;">
				<nuxt-link :to="'/shop/buy/detail?id='+it.id" class="lk-flex lk-shop-pd" v-for="(it,index) in random_list" :key="index" style="text-decoration: none;">
					<div class="lk-shop-p" style="font-size: 0;"><img :src="it.img" alt="" style="height: 160px;"></div>
					<div class="lk-shop-fdF">{{it.title}}</div>
					<div class="lk-flexBox lk-flexSpace">
						<div class="lk-shop-parice">积分：{{it.spec?it.spec.shop_price:'0.00'}}</div>
						<div class="lk-shop-addImg"><img src="@/static/images/shop-red.png" alt=""></div>
					</div>
				</nuxt-link>
			</div>
		</div>
		<div class="shop-cart" v-else>
			<!--购物车商品类表-->
			<div class="list-item">
				<ul class="product-list">
					<li class="item  shop-info" v-for="(item,i) in index" :key="i">
						<div class="body-media">
							<input type="checkbox" class="myChecked" :checked="item.check" @click="item.check=!item.check" />
							<img class="product-img" :src="item.product_spec.img">
							<div class="info">
								<div class="txt">
									<p class="name">{{item.product.title}}</p>
									<div class="price">
										积分： <span class="price1">{{item.product_price}}</span>
										<div class="lk-flexBox lk-shop-add">
											<em @click="jian(i)"></em>
											<span>{{item.product_num}}</span>
											<em @click="jia(i)"></em>
										</div>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<!--购物车底部按钮-->
			<div class="bottomBar">
				<p class="txt">
					<span>
						<input type="checkbox" class="myChecked" :checked="isSelectAll" @click="selectProduct(isSelectAll)" />
						全部
						<mt-button class="clearBtn" @click="delete_num">删除</mt-button>
						<span style="padding-left: 10px;">总价:<em>{{getTotal.totalPrice}}</em></span>
					</span>
				</p>
				<mt-button class="active" @click="goOrder">下单({{getTotal.totalNum}})</mt-button>
			</div>
		</div>
		
	</div>
</template>

<script>
	import api from '../../../api/api.js'
	import { MessageBox,Toast,Indicator } from 'mint-ui';
	export default{
		middleware: ['weburl','auth'],
		data(){
			return{
				index:'',
				random_list:'',
				total:'',
				title:''
			}
		},
		async asyncData(app) {
			var index = await api.postData('/Cart/cart_list');
			
			var datas = {
				num:2
			}
			var random = await api.postData('/Cart/random_product',datas);
			if (index.status == 1) {
				if(index.data.list != ''){
					var content = index.data.list;
					var arr = []		//创建空数组，保存后台有的商品
					for(var i = 0; i<content.length;i++){
						if(content[i].product != null){		//判断后台是否有此商品
							content[i].check = true;
							arr.push(content[i])		//保存到空数组里面
						}
					}
					//将后台已删除的商品进行自动删除后重新加入购物车
					if(arr.length != 0){
						var arr2 = [];
						for(var i = 0; i<arr.length;i++){
							var a = {product_id:arr[i].product.id,num:arr[i].product_num,price:arr[i].product_price,spec_id:arr[i].product_spec.id}
							arr2.push(a)
						}
						var datas = {
							product:JSON.stringify(arr2)
						}
					}else{
						var datas = {
							product:''
						};
					}
					var carts = await api.postData('/Cart/add_cart',datas)
					if(carts.status != 1){Toast('服务出错，请联系管理员');}
					//商品删除成功并加入购物车
				}else{
					var arr = '';
					var ran = '';
				}
			} else {
				return false;
			}
			if(random.data != undefined){
				var ran = random.data.random_product
			}
			
			return {
				index: arr,
				random_list:ran,
				title:index.data.base.admin_system.site_name
			}
		},
		computed:{
			//检测是否全选
            isSelectAll:function(){
                //如果index中每一条数据的check都为true，返回true，否则返回false;
				if(this.index != undefined){
					return this.index.every(function (val) {
						return val.check
					});
				}
                
            },
			//计算总价
			getTotal:function(){
				if(this.index != undefined){
					var prolist = this.index.filter(function (val) {
						return val.check
					})
					var totalPri = 0;
					for (var i = 0,len = prolist.length; i < len; i++) {
						totalPri += prolist[i].product_num * prolist[i].product_price;	//计算总价
					}
					return {
						totalNum:prolist.length,
						totalPrice:totalPri.toFixed(2)
					}
				}else{
					return 0
				}
			},
		},
		head(){
			return {
				title:this.title
			}
		},
		methods: {
			//返回上一页
			backto() {
				this.$router.go(-1);
			},
			//跳转到商城首页
			goIndex(){
				this.$router.push('/')
			},
			//点击刷新商品
			fre(){
				this.Refresh()
			},
			// 购物车无商品时显示推荐商品
			Refresh: function(){
				var datas = {
					num:2
				}
				api.postData('/Cart/random_product', datas).then((res) => {
					if(res.status == 1){
						var a = res.data.random_product;
						this.random_list = a;
					}
				})
			},
			// 下单结算
			goOrder(){
				Indicator.open('加载中...');
				var that = this;
				var cart = this.index;
				var total = this.getTotal.totalPrice;
				var arr = []
				for(var i = 0; i<cart.length;i++){
					if(cart[i].check == true){
						var a = {product_id:cart[i].product.id,num:cart[i].product_num,price:cart[i].product_price,spec_id:cart[i].product_spec.id,product_price:cart[i].product_price,product_warehouse_price:cart[i].product_spec.warehouse_price}
						arr.push(a)
					}
				}
				var datas = {
					amount:total,
					product:JSON.stringify(arr)
				}
				if(datas.product == ''){
					Indicator.close();
					MessageBox.alert('购物车没有商品，不能下单').then(action => {
						
					});
					return false;
				}
				api.postData('/Order/add_order',datas).then((res)=>{
					if(res.status == 1){
						setTimeout(function(){
							Indicator.close();
							that.$router.push({ path: '/shop/member/orderDetail?id='+res.data.order_id})
						},300)
					}
				})
			},
			//单个删除商品
			deleteNum(id){
				var that = this;
				MessageBox.confirm('是否确认删除选择的商品?').then(action => {
					var list = that.index;
					var arr = [];
					for(var i = 0; i<list.length; i++){
						if(list[i].product.id != id){
							arr.push(list[i])
						}
					}
					that.index = arr;
					that.ajax()
				});
			},
			//全选取反
			selectProduct(_isSelect){
                //遍历index，全部取反
				var that = this;
				if(this.isSelectAll){
					for (var i = 0, len = that.index.length; i < len; i++) {
						that.index[i].check = false;
					}
				}else{
					for (var i = 0, len = that.index.length; i < len; i++) {
						that.index[i].check = true;
					}
				}
            },
			//删除商品
			delete_num(){
				var list = this.index;
				var arr = [];
				if(list == ''){
					return false;
				}
				MessageBox.confirm('是否确认删除选择的商品?').then(action => {
					for(var i = 0; i<list.length; i++){
						if(!list[i].check){
							arr.push(list[i])
						}
					}
					this.index = arr;
					this.ajax()
				});
			},
			//加数量
			jia(index){
				var that = this;
				var list = this.index;
				list[index].product_num++
				that.ajax()
				this.index = list;
			},
			//减数量
			jian(index){
				var that = this;
				var list = this.index;
				if(list[index].product_num <= 1){
					return false;
				}else{
					list[index].product_num--
					that.ajax()
				}
				this.index = list;
			},
			//再一次请求加入购物车接口
			ajax(){
				var lkAir = this.index;
				
				if(lkAir.length != 0){
					var arr = [];
					for(var i = 0; i<lkAir.length;i++){
						var a = {product_id:lkAir[i].product.id,num:lkAir[i].product_num,price:lkAir[i].product_price,spec_id:lkAir[i].product_spec.id}
						arr.push(a)
					}
					var datas = {
						product:JSON.stringify(arr)
					}
				}else{
					var datas = {
						product:''
					};
				}
				
				api.postData('/Cart/add_cart',datas).then((res) => {
					var lkAirs = res;
					if(lkAirs.status != 1){
						Toast('服务出错，请联系管理员');
					}
				})
			}
		},
	}
</script>

<style>
</style>

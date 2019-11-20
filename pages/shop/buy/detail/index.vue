<template>
	<div style="height: 100%;background: #FFFFFF;overflow: auto;">
		<mt-header :title="'商品详情'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
		</mt-header>
		<div id="banner">
			<div v-swiper:mySwiper="swiperOption">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item,index) in index.img" :key="index">
						<img :src="item.img" style="width: 100%;" />
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
			<div class="lk_detail-title lk_pd">{{index.title}}</div>
			<div class="lk-detail-des lk_pd">{{index.short_title}}</div>
			<div class="lk_detail-price lk_pd" v-if="index.spec[0]">
				<span v-if="index.spec.length>1">积分：{{minPrice}} ~ {{maxPrice}}</span>
				<span v-else>积分：{{index.spec[0].shop_price}} </span>
			</div>
			<div class="lk_detail-price lk_pd" v-else><span>积分：0.00</span></div>
			
			<div class="lk-flexSpace lk_pd lk_detail-ground">
				<!-- <p>快递：包邮</p> -->
				<p>销量：{{index.sales}}</p>
			</div>
			<div style="height: 10px;width: 100%;background: #EEEEEE;"></div>
			<!-- 请选择规格数量 -->
			<div class="lk_detail-list lk_pd" @click="pV(3)" v-if="!getG">请选择规格数量</div>
			<div class="lk_detail-list lk_pd" @click="pV(3)" v-else>已选：规格：{{getG.name}} ，数量：x{{num}}</div>
			
			<div style="height: 10px;width: 100%;background: #EEEEEE;"></div>
			<div class="lk_detail-boxTitle">商品详情</div>
			<div class="lk_detail-content" v-html="index.content"></div>
		</div>
		<!-- 底部加入购物车 -->
		<div style="height: 60px;width: 100%;"></div>
		<div class="lk-details-nav">
			<ul>
				<li>
					<a :href="'tel:'+index.base.admin_system.tel" class="lk-detail-navList">
						<img src="@/static/images/details_kefu1.png" alt="">
						<span>客服</span>
					</a>
				</li>
				<li>
					<div class="lk-detail-navList" @click="addcoll(colection,index.id)">
						<img src="@/static/images/details_shou1.png" alt="" v-if="colection != 'del'">
						<img src="@/static/images/details_shou2.png" alt="" v-else>
						<span>收藏</span>
					</div>
				</li>
			</ul>
			 <!-- @click="popupVisible = true" -->
			<div class="lk-details-cart" @click='goCart' v-if="getG">
				<div class="lk-detail-dl">
					<span>加入购物车</span>
				</div>
			</div>
			<div class="lk-details-cart" @click="pV(1)" v-else>
				<div class="lk-detail-dl">
					<span>加入购物车</span>
				</div>
			</div>
			<div class="lk-details-buy a1" @click='goBuy' v-if="getG">
				<div class="lk-detail-dl">
					<span>立即兑换</span>
				</div>
			</div>
			<div class="lk-details-buy a2" @click="pV(2)" v-else>
				<div class="lk-detail-dl">
					<span>立即兑换</span>
				</div>
			</div>
		</div>
		<!-- 底部加入购物车end -->
		<!-- 弹窗的遮罩层 -->
		<!-- <transition name="el-fade-in">
			<div v-show="show" class="lk_zhe-box" @click="show = false"></div>
		</transition> -->
		<!-- 弹窗的遮罩层end -->
		<!-- 弹窗 -->
		
		<mt-popup v-model="popupVisible" position="bottom">
			<div class="lk-pop-close" @click="popupVisible = false"><img src="@/static/images/details_close.png" alt=""></div>
			<div class="lk-deta-pop-box">
				<div class="lk-flexBox lk_pd">
					<div class="lk-deta-popImg">
						<img :src="getG.img" alt="" v-if="getG">
						<img :src="index.img[0]?index.img[0].img:''" alt="" v-else>
					</div>
					<div class="lk-deta-popRight lk-flex">
						<div class="lk-deta-popTitle">{{index.title}}</div>
						<div v-if="index.spec[0]">
							<div v-if="getG">
								<div class="lk-deta-popParice">
									积分： {{getG.shop_price}}
								</div>
							</div>
							<div v-else>
								<div class="lk-deta-popParice" v-if="index.spec.length>1">
									积分： {{minPrice}} ~ {{maxPrice}}
								</div>
								<div class="lk-deta-popParice" v-else>
									积分： {{index.spec[0]?index.spec[0].shop_price:'0.00'}}
								</div>
							</div>
						</div>
						<div v-else>
							<div class="lk-deta-popParice">
								积分： 0.00
							</div>
						</div>
						<div class="lk_deta-ivio">库存：{{getG?getG.inventory:'请选择一个规格'}}</div>
					</div>
				</div>
				<div class="lk_detail-kb">
					<div class="lk_detail-gui">商品规格</div>
					<div class="lk-flexWrap lk_detail-GItem">
						<div v-for="(item,i) in index.spec" :key="i">
							<div :class="getG.id==item.id?'active':''" @click="getGg(item)" v-if="item.inventory != 0">{{item.name}}</div>
							<div class="blackActive" v-else>{{item.name}}</div>
						</div>
						
					</div>
				</div>
				<div class="lk-spf lk_pd lk-pop-spf">
					<div class="lk-flexBox">
						<div class="lk-spf-left">数量</div>
						<div class="lk-deta-num">
							<div class="lk-deta-numborder lk-flexBox">
								<em @click="jian"><i></i></em>
								<input type="text" v-model="num">
								<em @click="jia"><i></i><i></i></em>
							</div>
						</div>
					</div>
				</div>
				<div class="lk-pop-sub" @click="buyTrue">
					<div>确认</div>
				</div>
			</div>
		</mt-popup>
		<!-- 弹窗end -->
	</div>
</template>

<script>
	import api from '../../../../api/api.js'
	import { Toast,MessageBox,Indicator } from 'mint-ui';
	export default {
		middleware: ['weburl'],
		data() {
			return {
				swiperOption: {
					spaceBetween: 30,
					centeredSlides: true,
					loop: true,
					autoplay: {
						delay: 4000,
						disableOnInteraction: false,
					},
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
				},
				colection:'',	//初始化是否已收藏
				index: '',
				banners: '',
				num:1,		//商品数量
				popupVisible: false,
				getG:'',	//规格选择后的规格
				maxPrice:'',//价格最大值
				minPrice:'',//价格最小值
				pvIndex:''
			}
		},
		async asyncData(app) {
			var id = app.query.id;
			var datas = {
				product_id: id
			}
			var logs = {
				act:'add',
				product_id:id
			}
			var log = await api.postData('Member/log',logs)			//记录浏览记录
			var index = await api.postData('/Product/product_detail', datas);
			var colec = await api.postData('/Product/product_colection',datas);
			var us = await api.postData('/Member/info')
			var de = colec.status != 1?"add":"del";
			if (index.status == 1) {
				var content = index.data;
				var arrPice = [];	//先将价格保存在数组里面
				for (var i = 0; i<content.spec.length;i++) {
					content.spec[i].show = false;
					arrPice.push(Number(content.spec[i].shop_price))	//将规格里面的价格放到数组里面
				}
			} else {
				return false;
			}
			
			//当商品只有一个规格时，默认选中
			if(content.spec != ''){
				if(content.spec.length == 1){
					var getSpec = content.spec[0];
				}else{
				var getSpec = '';
			}
			}else{
				var getSpec = '';
			}
			return {
				index: content,
				colection:de,
				minPrice:Math.min.apply(null, arrPice),		//最小价格
				maxPrice:Math.max.apply(null, arrPice),		//最大价格
				getG:getSpec,
			}
		},
		watch:{
			num(val){
				if(this.getG){
					if(Number(val) > this.getG.inventory){
						this.num = val.substr(0,val.length-1);
					}
				}
				if(val == ''){
					return false;
				}else if(val < 1){
					this.num = 1;
				}else if(!(/^[1-9]\d*$/.test(val))){
					this.num = 1;
				}
			}
		},
		head(){
			return {
				title:this.index.base.admin_system.site_name
			}
		},
		methods: {
			//重新刷新数据
			async getIndex(){
				var id = this.$route.query.id;
				var datas = {
					product_id: id
				};
				var logs = {
					act:'add',
					product_id:id
				}
				var log = await api.postData('Member/log',logs)			//记录浏览记录
				var index = await api.postData('/Product/product_detail', datas);
				var colec = await api.postData('/Product/product_colection',datas);
				var us = await api.postData('/Member/info')
				var de = colec.status != 1?"add":"del";
				if (index.status == 1) {
					var content = index.data;
					var arrPice = [];	//先将价格保存在数组里面
					for (var i = 0; i<content.spec.length;i++) {
						content.spec[i].show = false;
						arrPice.push(Number(content.spec[i].shop_price))	//将规格里面的价格放到数组里面
					}
				} else {
					return false;
				}
				
				//当商品只有一个规格时，默认选中
				if(content.spec != ''){
					if(content.spec.length == 1){
						var getSpec = content.spec[0];
					}else{
					var getSpec = '';
				}
				}else{
					var getSpec = '';
				}
				//当商品只有一个规格时，默认选中
				if(content.spec != ''){
					if(content.spec.length == 1){
						var getSpec = content.spec[0];
					}else{
					var getSpec = '';
				}
				}else{
					var getSpec = '';
				}
				this.index = content;
				this.colection = de;
				this.minPrice = Math.min.apply(null, arrPice);		//最小价格
				this.maxPrice = Math.max.apply(null, arrPice);		//最大价格
				this.getG = getSpec;
			},
			//返回上一页
			backto() {
				this.$router.go(-1);
			},
			pV(index){
				if(!this.num){
					this.num = 1;
				}
				this.pvIndex = index;
				this.popupVisible = true;
			},
			//收藏
			addcoll(el,id){
				if(this.index.base.member == ''){
					this.$router.push('/user/login')
					return false;
				}
				var datas = {
					act:el,
					product_id:id
				}
				api.postData('Product/product_colection',datas).then((res)=>{
					if(el == 'add'){
						Toast('收藏成功')
						setTimeout(() => {
						  this.colection = 'del'
						}, 2000);
					}else{
						Toast('取消成功')
						setTimeout(() => {
						  this.colection = 'add'
						}, 2000);
					}
				})
			},
			//加数量
			jia(){
				var num = this.num;
				num ++;
				if(this.getG){
					if(Number(num) > Number(this.getG.inventory)){
						MessageBox('提示', '库存不足')
						return false;
					}
				}
				this.num = num;
				
			},
			//减数量
			jian(){
				var num = this.num;
				if(num <= 1){
					return false;
				}else{
					num --;
				}
				this.num = num;
			},
			//数量选择完成后
			buyTrue(){
				if(!this.num){
					this.getG = '';
				}
				if(this.getG){
					this.popupVisible = false;
					var index = this.pvIndex;
					if(index == 1){
						this.goCart();
					}else if(index == 2){
						this.goBuy();
					}else{
						return false;
					}
				}else{
					this.popupVisible = false;
				}
			},
			//选择规格
			getGg(item){
				var that = this;
				if(that.getG){
					if(item.id == that.getG.id){
						that.getG = '';
						
						return false;
					}
				}
				for(var i = 0; i<that.index.spec.length;i++){
					that.index.spec[i].show = false;
					if(that.num > Number(item.inventory)){
						that.num = item.inventory
					}
					if(that.index.spec[i].id == item.id){
						// console.log(that.index.spec[i])
						that.getG = that.index.spec[i];
						// console.log(that.getG)
					}
				}
				
			},
			//立即兑换
			goBuy(){
				if(Number(this.getG.inventory) < Number(this.num)){
					MessageBox('提示', '库存不足')
					return false;
				}
				if(this.getG == ''){
					MessageBox('提示', '请选择规格再下单')
					return false;
				}
				if(this.index.is_black_member == 1){
					MessageBox('提示', '账号异常，请联系客服')
					return false;
				}
				var that = this;
				var q = that.index;
				if(q.spec[0] == undefined){
					MessageBox('提示', '该商品未设置价格，无法下单')
					return false;
				}
				if(this.index.base.member == ''){
					this.$router.push('/user/login')
					return false;
				}
				Indicator.open('加载中...');
				
				//不经过购物车,直接跳到订单详情页
				var arr = [{
					product_id:q.id,
					num:that.num,
					price:that.getG.shop_price,
					spec_id:that.getG.id,
					product_price:that.getG.shop_price,
					product_warehouse_price:that.getG.warehouse_price,
				}]
				var total = that.num * that.getG.shop_price;
				var datas = {
					amount:total,
					product:JSON.stringify(arr)
				}
				api.postData('/Order/add_order',datas).then((res)=>{
					Indicator.close();
					if(res.status == 1){
						setTimeout(function(){
							that.$router.push({ path: '/shop/member/orderDetail?id='+res.data.order_id})
						},300)
					}else{
						Toast(res.msg)
						setTimeout(function(){
							that.$router.push('/')
						},1000)
					}
				})
				
				//经过购物车
				// var arr = new Array();		//数组保存
				// api.postData('/Cart/cart_list').then((cat)=>{
				// 	Indicator.close();
				// 	var list = cat.data;
				// 	if(list.list != ''){
				// 		for(var i = 0; i<list.list.length;i++){
				// 			var p = {product_id:list.list[i].product.id,num:list.list[i].product_num,price:list.list[i].product_price,spec_id:list.list[i].product_spec.id,product_warehouse_price:list.list[i].product_spec.warehouse_price}
				// 			arr.push(p)
				// 		}
				// 	}
				// 	Indicator.open('正在加载，请稍等...');
				// 	//从购物车拉取列表与下面的s变量拼接传给服务器
				// 	//判断是促销价还是原价
				// 	// var price = Number(q.spec[0].market_price) > 0?q.spec[0].market_price:q.spec[0].shop_price;
				// 	var s = {product_id:q.id,num:that.num,price:that.getG.shop_price,spec_id:that.getG.id,product_warehouse_price:that.getG.warehouse_price}
				// 	arr.push(s)
				// 	var datas = {
				// 		product:JSON.stringify(arr)
				// 	}
				// 	setTimeout(function(){
				// 		api.postData('/Cart/add_cart',datas).then((res) => {
				// 			Indicator.close();
				// 			that.$router.push('/shop/cart');
				// 		})
				// 	},300)
				// })
			},
			// 加入购物车
			goCart(){
				if(this.getG == ''){
					MessageBox('提示', '请选择规格再下单')
					return false;
				}
				if(this.index.is_black_member == 1){
					MessageBox('提示', '账号异常，请联系客服')
					return false;
				}
				var that = this;
				var q = that.index;
				if(this.index.base.member == ''){
					this.$router.push('/user/login')
					return false;
				}
				Indicator.open('加载中...');
				var arr = new Array();		//数组保存
				api.postData('/Cart/cart_list').then((cat)=>{
					Indicator.close();
					var list = cat.data;
					if(list.list != ''){
						for(var i = 0; i<list.list.length;i++){
							var p = {product_id:list.list[i].product.id,num:list.list[i].product_num,price:list.list[i].product_price,spec_id:list.list[i].product_spec.id,product_warehouse_price:list.list[i].product_spec.warehouse_price}
							arr.push(p)
						}
					}
					//从购物车拉取列表与下面的s变量拼接传给服务器
					//判断是促销价还是原价
					Indicator.open('正在加载，请稍等...');
					// var price = Number(q.spec[0].market_price) > 0?q.spec[0].market_price:q.spec[0].shop_price;
					var s = {product_id:q.id,num:that.num,price:that.getG.shop_price,spec_id:that.getG.id,product_warehouse_price:that.getG.warehouse_price}
					arr.push(s)
					var datas = {
						product:JSON.stringify(arr)
					}
					setTimeout(function(){
						api.postData('/Cart/add_cart',datas).then((res) => {
							Indicator.close();
							if(res.status == 1){
								Toast(res.msg)
								that.getIndex();
							}else if(res.status == -1){
								Toast(res.msg)
								setTimeout(function(){
									that.$router.push('/')
								},1000)
							}
						})
					},300)
				})
			}
		},
	}
</script>

<style>
</style>

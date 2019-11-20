<template>
	<div>
		<!-- <div id="head" class="lk_header" style="background: #FF1111;color: #FFFFFF;">
			<div class="lk_headBack"></div>
			<div class="lk_headTitle">积分商城</div>
			<div class="lk_headRight"></div>
		</div>
		<div class="lk_height"></div> -->
		<div class="lk_head-bg">
			<img src="@/static/images/bg.png" class="lk_head-bgImg">
			<div class="lk-flexSpace lk_head-top">
				<!-- <div class="lk_head-X"><img src="@/static/images/X.png" alt=""></div> -->
				<div class="lk_head-logo"><img src="@/static/images/logo.png" alt=""></div>
				<div class="lk_head-seach">
					<div class="lk_head-seach-box">
						<form action="javascript:return true" @submit.prevent="formSubmit">
							<img src="@/static/images/lk_head-seach.png" class="lk_head-seachImg">
							<input type="search" v-model="seachtxt" placeholder="搜索您最想要的商品" @keydown="search2($event)">
						</form>
					</div>
				</div>
				<!-- <div class="lk_head-right"><img src="@/static/images/dian.png" alt=""></div> -->
			</div>
			<div id="banner" class="lk_banner">
				<div v-swiper:mySwiper="swiperOption">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(item,i) in index.banner" :key="i"><a :href="item.url"><img :src="item.img" /></a></div>
					</div>
					<div class="swiper-pagination"></div>
				</div>
			</div>
		</div>
		
		
		
		<div class="lk-sy">
			<!-- <div class="lk-sy-ss">
				<div class="lk-flexBox">
					<input type="text" placeholder="请输入搜索关键词" v-model="seachtxt" />
					<div class="lk-sy-ss-btn" @click="toSeach">
						<input type="submit" value="" />
						<i><img src="@/static/images/ss.png" /> </i>
					</div>
				</div>
			</div> -->
			<div class="lk-sy-bj" v-if="sort">
				<div class="lk-sy-bot lk-flexWrap">
					<a :href="'/shop/list2?id='+item.id" v-for="(item,i) in sort.one" :key="i">
						<img :src="item.img" />
						<p>{{item.name}}</p>	
					</a>
					<a href="/shop/sort">
						<img src="@/static/images/someSort.png" />
						<p>全部分类</p>	
					</a>
				</div>
			</div>
			<div class="lk-sy-advert">
				<div class="lk-sy-advert-title">
					<a href="/shop/sort"><img src="@/static/images/sy03.png" /></a>
				</div>
			</div>
			<div class="lk_index-hh-box">
				<div class="lk_index-hh">
					<img src="../static/images/haohuo.png" alt="" class="lk_index-hhImg">
					<div class="lk_index-hhContent">
						<div class="lk-sy-advert-list01 lk-flexWrap">
							<a href="/shop/sort"><img src="@/static/images/sy04.png" /></a>
							<a href="/shop/buy/detail/?id=17"><img src="@/static/images/sy05.png" /></a>
						</div>
						<div class="lk-sy-advert-list02 lk-flexWrap">
							<a href="/shop/buy/detail/?id=236"><img src="@/static/images/sy06.png" /></a>
							<a href="/shop/buy/detail/?id=74"><img src="@/static/images/sy07.png" /></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		
		
		
		<div id="newPro">
			<div class="lk_newP-mar">
				<div class="lk_newPtitle" @click="tapList">
					<img src="@/static/images/pop.png">
				</div>
				<div class="lk-flexWrap">
					<a :href="'/shop/buy/detail?id='+item.id" class="lk-col-8 lk_newP-item" v-for="(item,i) in index.product_hot" :key='i'>
						<div class="lk_newP-img"><img :src="item.img"></div>
						<div class="lk_newP-title">{{item.title}}</div>
						<div class="lk-flexSpace">
							<div class="lk_price">积分：{{item.spec?item.spec.shop_price:'0.00'}}</div>
							<!-- <div class="lk_sales">月销 {{item.sales}} 件</div> -->
						</div>
					</a>
				</div>
			</div>
		</div>
		<div id="newPro" v-for="(item,i) in index.product_recommend" :key='i'>
			<div class="lk_newP-mar">
				<div class="lk_newCommon lk-flexBox" @click="tapTel(item.id)">
					<div class="lk_newCt">{{item.name}}</div>
					<div class="lk_newBb">优质好物抢先得 > </div>
				</div>
				<div class="lk-flexWrap">
					<a :href="'/shop/buy/detail?id='+im.id" class="lk-col-6 lk_newP-item" v-for="(im,i) in item.product_list" :key='i'>
						<div class="lk_newP-img"><img :src="im.img"></div>
						<div class="lk-flexSpace lk_newP-tap">
							<img src="@/static/images/telBg.png" alt="">
							<div class="lk_price">积分:{{im.spec?im.spec.shop_price:'0.00'}}</div>
						</div>
						<div class="lk_newP-title2">{{im.title}}</div>
					</a>
				</div>
			</div>
		</div>
		<!-- <div v-for="(item,i) in index.product_type_all" :key='i'>
			<div class="lk-bgd7_4"></div>
			<div class="lk-list-top">
				<div class="lk-list-title">{{item.type.name}}</div>
			</div>
			<div class="lk_pd">
				<a :href="'/shop/buy/detail?id='+items.id" class="lk-flexBox lk-pr-box lk-s_list-a" v-for="(items,i) in item.product" :key='i'>
					<div class="lk-pr_img"><img :src="items.img" alt=""></div>
					<div class="lk-flex lk_pr-list_right">
						<div class="lk-pr_title">{{items.title}}</div>
						<div class="lk-flexSpace lk_pr-list_b">
							<div class="lk-s_list-money">积分： {{items.spec?items.spec.shop_price:'0.00'}}</div>
							<div class="lk-pr_list-time">月销量 {{items.sales}} 件</div>
						</div>
					</div>
				</a>
			</div>
		</div> -->
		<!-- <div id="copyright">
			<div class="lk_copy">
				<p>地址：福建市鼓楼区公益路3号（203.205-207）</p>
				<p> 电话：0591-83316788</p>
				<p>版权所有 ：世界杨氏联谊总会</p>
			</div>
		</div> -->
		<div id="footer">
			<div class="lk_fHeight"></div>
			<div class="lk-foot lk-flexBox">
				<a href="/" class="el-col-6 lk_footer-item">
					<div class="lk_foot-img"><img src="../static/images/tabImg1.png" alt=""></div>
					<div class="lk_foot-title active">首页</div>
				</a>
				<a href="/shop/sort" class="el-col-6 lk_footer-item">
					<div class="lk_foot-img"><img src="../static/images/tabImg2.png" alt=""></div>
					<div class="lk_foot-title">分类</div>
				</a>
				<a href="/shop/cart" class="el-col-6 lk_footer-item">
					<div class="lk_foot-img"><img src="../static/images/tabImg3.png" alt=""></div>
					<div class="lk_foot-title">购物车</div>
				</a>
				<a href="/shop/member" class="el-col-6 lk_footer-item">
					<div class="lk_foot-img"><img src="../static/images/tabImg4.png" alt=""></div>
					<div class="lk_foot-title">个人中心</div>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '../api/api.js'
	import { Indicator,Toast } from 'mint-ui';
	export default{
		middleware: ['weburl'],
		data(){
			return {
				swiperOption: {
					spaceBetween: 0,
					centeredSlides: true,
					loop: true,
					autoplay: {
						delay: 2500,
						disableOnInteraction: false,
					},
					pagination: {
						el: '.swiper-pagination',
					},
				},
				index: '', //首页数据
				seachtxt:''
			}
		},
		async asyncData(app) {
			var datas = {
				rand_num:3
			}
			var index = await api.postData('/Index/index', datas);
			var sort = await api.postData('/Product/product_type');
			
			if (index.status == 1) {
				var content = index.data;
			} else {
				return false;
			}
			return {
				index: content,
				sort:sort.data
			}
		},
		head(){
			return {
				title:this.index.admin_system.site_name
			}
		},
		methods:{
			//推荐跳转
			tapList(){
				this.$router.push('/shop/list/?id=-1')
			},
			tapTel(id){
				this.$router.push('/shop/list/?id='+id)
			},
			//搜索跳转
			formSubmit () {
				return false
			},
			search2(ev){
				if(ev.keyCode == 13) {  //键盘回车的编码是13
					this.toSeach();
				}
			},
			toSeach(){
				// Indicator.open('Loading...');
				var txt = this.seachtxt;
				if(txt == ''){
					setTimeout(function(){
						// Indicator.close();
						Toast('请输入关键词');
					},300)
				}else{
					this.$router.push('/shop/search?key='+txt)
				}
			}
			//搜索跳转end
		}
	}
</script>

<style>
</style>

<template>
	<div>
		<mt-header :title="'会员中心'" class="lk-index-head" style="background: #FFFFFF;">
			<!-- <div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div> -->
		</mt-header>
		<div class="lk-mine-head">
			<div class="lk_pd">
				<div>
					<div class="lk-mine-useImg"><img :src="index.member.img?index.member.img:'http://lieke.lieren0769.com/grzx_tx.jpg'" alt=""></div>
					<div class="lk-flex">
						<div class="lk-useName">{{index.member.name?index.member.name:'用户：'+index.member.username}}</div>
						<div class="lk_useType">积分：{{index.member.points}}</div>
						<div class="lk_useType">提货券：{{index.member.warehouse}}</div>
						<a href="/shop/member/setting" class="lk-shezhi"><img src="@/static/images/mine_shezhi.png" alt=""></a>
					</div>
				</div>
			</div>
		</div>
		<div class="lk-mine-order">
			<div class="lk-mine-orderT">
				<div class="lk_pd">
					<a href="/shop/member/order?id=1" class="lk-flexSpace">
						<div class="lk-orderL">我的订单</div>
						<div class="lk-orderR">所有订单</div>
					</a>
				</div>
			</div>
			<div class="lk-flexBox lk-order-list">
				<a href="/shop/member/order?id=2" class="lk-flex">
					<div class="lk-orderL-img"><img src="@/static/images/order1.png" alt=""></div>
					<div class="lk-orderL-F">未支付</div>
				</a>
				<a href="/shop/member/order?id=3" class="lk-flex">
					<div class="lk-orderL-img"><img src="@/static/images/order2.png" alt=""></div>
					<div class="lk-orderL-F">待发货</div>
				</a>
				<a href="/shop/member/order?id=4" class="lk-flex">
					<div class="lk-orderL-img"><img src="@/static/images/order3.png" alt=""></div>
					<div class="lk-orderL-F">确认收货</div>
				</a>
				<a href="/shop/member/order?id=5" class="lk-flex">
					<div class="lk-orderL-img"><img src="@/static/images/order4.png" alt=""></div>
					<div class="lk-orderL-F">已完成</div>
				</a>
			</div>
			<!-- <div class="lk-flexBox lk-mine-cPd">
				
				<div class="lk-flex">
					<div class="lk-mine-cNum">{{index.member.balance}}</div>
					<div class="lk-mine-cTit">余额</div>
				</div>
				<div class="lk-flex">
					<div class="lk-mine-cNum">{{index.member.points}}</div>
					<div class="lk-mine-cTit">积分</div>
				</div>
			</div> -->
			<div class="lk-flexBox lk-flexWrap lk-uBox">
				<a href="/shop/member/address" class="lk-ulist">
					<div class="lk-uImg"><img src="@/static/images/mine-Laddress.png" alt=""></div>
					<div class="lk-uFont">收货地址</div>
				</a>
				<!-- <a class="lk-ulist">
					<div class="lk-uImg"><img src="@/static/images/mine-Lpingjia.png" alt=""></div>
					<div class="lk-uFont">我的评价</div>
				</a> -->
				<a href="/shop/member/ment" class="lk-ulist">
					<div class="lk-uImg"><img src="@/static/images/mine-Lgao.png" alt=""></div>
					<div class="lk-uFont">公告</div>
				</a>
				<a href="/shop/cart" class="lk-ulist">
					<div class="lk-uImg"><img src="@/static/images/mine-LCart.png" alt=""></div>
					<div class="lk-uFont">我的购物车</div>
				</a>
				<!-- <a class="lk-ulist">
					<div class="lk-uImg"><img src="@/static/images/mine-Lyouhui.png" alt=""></div>
					<div class="lk-uFont">优惠券中心</div>
				</a> -->
				<a href="/shop/member/setting" class="lk-ulist">
					<div class="lk-uImg"><img src="@/static/images/mine-Lquan.png" alt=""></div>
					<div class="lk-uFont">帐户安全</div>
				</a>
				<a href="/shop/member/collection" class="lk-ulist">
					<div class="lk-uImg"><img src="@/static/images/mine-Lcang.png" alt=""></div>
					<div class="lk-uFont">我的收藏</div>
				</a>
				<a href="/shop/member/browse" class="lk-ulist">
					<div class="lk-uImg"><img src="@/static/images/mine-Ljilu.png" alt=""></div>
					<div class="lk-uFont">浏览记录</div>
				</a>
				<a :href="'tel:'+index.admin_system.tel" class="lk-ulist">
					<div class="lk-uImg"><img src="@/static/images/mine-LConter.png" alt=""></div>
					<div class="lk-uFont">客户投诉</div>
				</a>
			</div>
			<div class="lk_pd lk-mt-20">
				<mt-button class="lk-button-red" @click="outto">退出登录</mt-button>
			</div>
		</div>
		<div id="footer">
			<div class="lk_fHeight"></div>
			<div class="lk-foot lk-flexBox">
				<a href="/" class="el-col-6 lk_footer-item">
					<div class="lk_foot-img"><img src="../../../static/images/tabImg1.png" alt=""></div>
					<div class="lk_foot-title">首页</div>
				</a>
				<a href="/shop/sort" class="el-col-6 lk_footer-item">
					<div class="lk_foot-img"><img src="../../../static/images/tabImg2.png" alt=""></div>
					<div class="lk_foot-title">分类</div>
				</a>
				<a href="/shop/cart" class="el-col-6 lk_footer-item">
					<div class="lk_foot-img"><img src="../../../static/images/tabImg3.png" alt=""></div>
					<div class="lk_foot-title">购物车</div>
				</a>
				<a href="/shop/member" class="el-col-6 lk_footer-item">
					<div class="lk_foot-img"><img src="../../../static/images/tabImg4.png" alt=""></div>
					<div class="lk_foot-title active">个人中心</div>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '../../../api/api.js'
	import { MessageBox,Indicator } from 'mint-ui';
	export default{
		middleware: ['weburl','auth'],
		data(){
			return{
				index:''
			}
		},
		async asyncData (params) {
			var index = await api.postData('/Member/info')
			if(index.status == 1){
				return{
					index:index.data
				}
			}
		},
		head(){
			return {
				title:this.index.admin_system.site_name
			}
		},
		methods: {
			//退出登录
			outto(){
				var that = this;
				MessageBox.confirm('你确定要退出登录吗？').then(action => {
					Indicator.open('请稍等...');
					api.postData('/Login/log_out').then((res)=>{
						Indicator.close();
						MessageBox.alert('退出成功').then(action => {
							that.$router.push('/user/login')
						});
					})
				});
			}
			
		},
	}
</script>

<style>
</style>

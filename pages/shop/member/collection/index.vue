<template>
	<div>
		<mt-header :title="'我的收藏'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
		</mt-header>
		<div v-if="air.status == 0" style="text-align: center;padding-top: 100px;">暂无收藏</div>
		<div class="lk_pd" v-else>
			<div class="lk-flexBox lk-pr-box lk-s_list-a" v-for="(item,index) in air.data" :key="index" style="height: 106px;">
				<nuxt-link :to="'/shop/buy/detail?id='+item.product.id" class="lk-pr_img"><img :src="item.img"></nuxt-link>
				<div class="lk-flex lk_pr-list_right" style="padding-top: 15px;">
					<nuxt-link :to="'/shop/buy/detail?id='+item.product.id" class="lk-pr_title">{{item.product.title}}</nuxt-link>
					<div class="lk-flexSpace lk_pr-list_b">
						<div class="lk-s_list-money">积分： {{item.spec.shop_price}}</div>
						<div class="lk-shouImg">
							<img src="@/static/images/details_shou2.png" alt="" @click="delColect(item.product.id)">
							<img src="@/static/images/shop-red.png" alt="" @click='goCart(item)'>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import api from '../../../../api/api.js'
	import { Toast } from 'mint-ui';
	export default{
		middleware: ['weburl','auth'],
		data(){
			return{
				air:'',
				index:''
			}
		},
		async asyncData (params) {
			var datas = {
				act:'list'
			}
			var index = await api.postData('/Member/info')
			var res = await api.postData('Product/product_colection',datas)
			// console.log(res)
			return{
				air:res,
				index:index.data
			}
			
		},
		head(){
			return {
				title:this.index.admin_system.site_name
			}
		},
		methods:{
			//返回上一页
			backto() {
				this.$router.go(-1);
			},
			//取消收藏
			delColect(id){
				var that = this;
				var datas = {
					act:'del',
					product_id:id
				}
				api.postData('Product/product_colection',datas).then((res) => {
					if(res.status == 1){
						let instance = Toast('取消成功');
						setTimeout(() => {
						  instance.close();
						  that.main()
						}, 2000);
					}
				})
			},
			//再一次调用接口
			main(){
				var datas = {
					act:'list'
				}
				api.postData('Product/product_colection',datas).then((res) => {
					this.air = res
				})
			},
			// 加入购物车
			goCart(item){
				var that = this;
				var arr = new Array();		//数组保存
				api.postData('/Cart/cart_list').then((cat)=>{
					var list = cat.data;
					if(list.list != ''){
						for(var i = 0; i<list.list.length;i++){
							var p = {product_id:list.list[i].product.id,num:list.list[i].product_num,price:list.list[i].product_price,spec_id:list.list[i].product_spec.id}
							arr.push(p)
						}
					}
					//从购物车拉取列表与下面的s变量拼接传给服务器
					console.log(item)
					var s = {
						product_id:item.product.id,
						num:1,
						price:item.spec.shop_price,
						spec_id:item.spec.id,
					}
					arr.push(s)
					var datas = {
						product:JSON.stringify(arr)
					}
					setTimeout(function(){
						api.postData('/Cart/add_cart',datas).then((res) => {
							Toast("加入购物车成功")
							setTimeout(function(){
								that.$router.push({path:'/shop/cart'})
							},1000)
						})
					},300)
				})
			}
		}
	}
</script>

<style>
</style>

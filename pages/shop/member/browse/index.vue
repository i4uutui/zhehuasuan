<template>
	<div>
		<mt-header :title="'浏览记录'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
		</mt-header>
		<div v-if="air == ''" style="text-align: center;padding-top: 100px;">暂无浏览记录</div>
		<div class="lk_pd" v-else>
			<nuxt-link :to="'/shop/buy/detail?id='+item.product_list.id" v-for="(item,i) in air" :key="i" class="lk-flexBox lk-pr-box lk-s_list-a">
				<div class="lk-pr_img"><img :src="item.product_img" alt=""></div>
				<div class="lk-flex lk_pr-list_right">
					<div class="lk-pr_title">{{item.product_list.title}}</div>
					<div class="lk-flexSpace lk_pr-list_b">
						<div class="lk-s_list-money">积分： {{item.product_spec!=''?item.product_spec[0].shop_price:'0.00'}}</div>
						<div class="lk-shouImg">
							<img src="@/static/images/shop-red.png" alt="">
						</div>
					</div>
				</div>
			</nuxt-link>
		</div>
	</div>
</template>

<script>
	import api from '../../../../api/api.js'
	export default{
		middleware: ['weburl','auth'],
		data(){
			return{
				air:'',
				index:''
			}
		},
		async asyncData (params) {
			var index = await api.postData('/Member/info')
			var air = await api.postData('Member/log')
			for(var i = 0; i<air.data.length;i++){
				console.log(air.data[i].product_list)
			}
			return{
				air:air.data,
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
		}
	}
</script>

<style>
</style>

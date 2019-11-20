<template>
	<div class="soller" style='height: 100%;background: #FFFFFF;overflow: auto;'>
		<mt-header :title="'产品列表'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
		</mt-header>
		<div>
			<div class="lk-flexBox lk-p-voc">
				<div class="lk-flex lk-p_vol">默认</div>
				<div class="lk-flex lk-p_vol" @click="saler">销量</div>
				<div class="lk-flex lk-p_vol" @click="price" :class="switchClass">价格</div>
				<div class="lk-flex lk-p_vol" @click="popularity">人气</div>
			</div>
			<div>
				<div class="lk_pd">
					<div class="lk_nocontent" v-if="air.list==''">暂无产品</div>
					<div v-else v-infinite-scroll="loadMore" infinite-scroll-distance="0">
						
						<a :href="'/shop/buy/detail?id='+item.id" class="lk-flexBox lk-pr-box lk-s_list-a" v-for='(item,i) in air.list' :key="i">
							<div class="lk-pr_img"><img :src="item.img" alt=""></div>
							<div class="lk-flex lk_pr-list_right">
								<div class="lk-pr_title">{{item.title}}</div>
								<div class="lk-flexSpace lk_pr-list_b">
									<div class="lk-s_list-money">积分： {{item.spec?item.spec.shop_price:'0.00'}}</div>
									<div class="lk-pr_list-time">月销量 {{item.sales}} 件</div>
								</div>
							</div>
						</a>
					</div>
					<div v-if="air.list != ''">
						<p v-if="loading" style="text-align: center;">
							<mt-spinner type="fading-circle"></mt-spinner>
							加载中...
						</p>
						<p v-else style="text-align: center;padding-top: 20px;padding-bottom: 20px;">没有了</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { InfiniteScroll } from 'mint-ui';
	import api from '../../../api/api.js'
	export default{
		middleware: ['weburl'],
		data(){
			return{
				switchClass:'',
				rqClass:'',
				salerClass:'',
				switchShow:0,
				switchId:'',
				air:'',
				id:'',
				
				loading:true,
				page:1,
			}
		},
		
		asyncData (params) {
			var id = params.query.id;
			var datas = {hot_num:5,product_type_one:id,num:15,page:1,}
			return api.postData('Product/product_list',datas).then((res) => {
				if(res.status == 1){
					var lkAir = res.data;
					return{
						air:lkAir,
						id:id
					}
				}
			})
		},
		head(){
			return {
				title:this.air.base.admin_system.site_name
			}
		},
		methods: {
			loadMore() {
				var id = this.id;
				var page = this.page + 1;
				if(this.rqClass != ''){
					var datas = {order_name:'is_hot',order_type:'desc',hot_num:5,product_type_one:id,num:15,page:page}
				}else if(this.salerClass != ''){
					var datas = {order_name:'sales',order_type:'desc',hot_num:5,product_type_one:id,num:15,page:page}
				}else if(this.switchClass != '' && this.switchClass == 'active1'){
					var datas = {order_price:'desc',hot_num:5,product_type_one:id,num:15,page:page}
				}else if(this.switchClass != '' && this.switchClass == 'active2'){
					var datas = {order_price:'asc',hot_num:5,product_type_one:id,num:15,page:page}
				}else{
					var datas = {hot_num:5,product_type_one:id,num:15,page:page}
				}
				clearTimeout(this.timeOut);
				this.timeOut = setTimeout(() => {
					api.postData('Product/product_list',datas).then((res) => {
						if(page <= res.data.all_page){
							for(var i = 0; i<res.data.list.length;i++){
								this.air.list.push(res.data.list[i]);
							}
						}else{
							this.loading = false;
						}
						this.page = page;
					})
				}, 2000);
			},
			//返回上一页
			backto() {
				this.$router.go(-1);
			},
			//人气排序
			popularity(){
				var id = this.id;
				var datas = {order_name:'is_hot',order_type:'desc',hot_num:5,product_type_one:id,num:15,page:1}
				this.rqClass = '1';
				this.salerClass = '';
				this.switchClass = '';
				this.page = 1;	//重置页面数
				this.proction(datas)
			},
			//销量排序
			saler(){
				var id = this.id;
				var datas = {order_name:'sales',order_type:'desc',hot_num:5,product_type_one:id,num:15,page:1}
				this.rqClass = '';
				this.salerClass = '1';
				this.switchClass = '';
				this.page = 1;	//重置页面数
				this.proction(datas)
			},
			//价格降序升序
			price(){
				var id = this.id;
				this.rqClass = '';
				this.salerClass = '';
				if(this.switchClass == 'active1'){
					this.switchClass = 'active2';
					var datas = {order_price:'asc',hot_num:5,product_type_one:id,num:15,page:1}
					this.proction(datas)
				}else{
					this.switchClass = 'active1'
					var datas = {order_price:'desc',hot_num:5,product_type_one:id,num:15,page:1}
					this.proction(datas)
				}
				this.page = 1;	//重置页面数
			},
			//再一次调用数据
			proction(datas){
				// console.log(datas)
				api.postData('Product/product_list',datas).then((res) => {
					if(res.status == 1){
						this.air = res.data;
					}else{
						this.message('服务出错，请联系管理员','error');
					}
					
				})
			},
			//打开筛选窗口
			filterShow(){
				this.switchShow = 1
			},
			//确认要筛选的id后重新调用接口
			filterTrue(){
				var id = this.switchId;
				this.switchShow = 0;
				// console.log(id)
			},
			//无选择id关闭筛选
			filterFalse(){
				this.switchShow = 0
			},
			//弹出消息提示
			message(mes,err){
				this.$message({
				  showClose: true,
				  message: mes,
				  showClose:false,
				  duration:2000,
				  type: err,
				  offset:100,
				  customClass:'lk_alter-message'
				});
			},
			//弹出通知
			Notification(title,mes,err,fun){
				this.$notify({
					title: title,
					message: mes,
					type: err,
					onClose:fun
				});
			}
		},
	}
</script>

<style>
	.mint-spinner-fading-circle{
		margin: 0 auto;
	}
</style>

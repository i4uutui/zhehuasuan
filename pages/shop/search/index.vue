<template>
	<div>
		<mt-header :title="'搜索结果'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
		</mt-header>
		<div class="lk-w100">
			<div id="seach" class="lk_seach-box lk_pageSeach-bd">
				<el-input v-model="searchText" placeholder="请输入搜索关键词" class="lk_shop-seach"></el-input>
				<img src="@/static/images/seach.png" @click="toSearch" class="lk_seach-smallImg">
				<i class="lk_seach-border"></i>
			</div>
		</div>
		<div class="lk_seach-keyWrod">你搜索的关键词为：<span>“ {{keyWord}} ”</span></div>
		<div style='height: 100%;background: #FFFFFF;overflow: auto;'>
			<div>
				<div>
					<div class="lk_pd">
						<div class="lk_nocontent" v-if="index.list==''">暂无产品</div>
						<div v-else>
							<a :href="'/shop/buy/detail?id='+item.id" class="lk-flexBox lk-pr-box lk-s_list-a" v-for='(item,i) in index.list' :key="i">
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
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '../../../api/api.js'
	export default{
		middleware: ['weburl'],
		data(){
			return{
				index:'',
				searchText:'',
				keyWord:''
			}
		},
		async asyncData (app) {
			var txt = app.query.key
			var datas = {
				title:txt
			}
			var index = await api.postData('/Product/product_list',datas)
			return{
				index:index.data,
				keyWord:txt
			}
		},
		head(){
			return {
				title:'12'
			}
		},
		methods:{
			//返回上一页
			backto() {
				this.$router.go(-1);
			},
			//搜索
			toSearch(){
				var that = this;
				var txt = this.searchText;
				if(txt == ''){
					that.message('请输入关键词')
					return false;
				}else{
					this.$router.push('/shop/search?key='+txt)
					var datas = {
						title:txt
					}
					api.postData('/Product/product_list',datas).then((res)=>{
						var content = res.data;
						that.index = content;
						this.keyWord = txt;
					})
				}
			},
		}
	}
</script>

<style>
</style>

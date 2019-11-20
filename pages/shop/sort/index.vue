<template>
	<div style="height: 100%; background: rgb(238, 238, 238); overflow: hidden;">
		<mt-header :title="'分类'" class="lk-index-head" style="background: #FFFFFF;"></mt-header>
		<div class="lk_nocontent" v-if="index.one==undefined">暂无产品分类</div>
		<div class="lk-flexBox lk-mt-10" v-else>
			<div class="lk-sort-left" v-bind:style="contentStyleObj">
				<div class="lk-sort-one" :class="tabstatus==1?'lk-active':''">
					<span @click="mend">推荐分类</span>
				</div>
				<div class="lk-sort-one" :class="item.check?'lk-active':''" v-for="(item,i) in index.one" :key="i">
					<span @click="classification(i)">{{item.name}}</span>
				</div>
			</div>
			<div class="lk-sort-right lk-flex" v-bind:style="contentStyleObj">
				<div class="lk-sort-two">
					<div class="lk-flexWrap" v-if="tabstatus==1">
						<a href="/shop/list" class="lk-sort-r-item">
							<div class="lk-sort-img"><img src="../../../static/images/some.png" alt=""></div>
							<div class="lk-sort-title">全部商品</div>
						</a>
						<a :href="'/shop/list?id='+item.id" class="lk-sort-r-item" v-for="(item,i) in recommend" :key="i">
							<div class="lk-sort-img"><img :src="item.img" alt=""></div>
							<div class="lk-sort-title">{{item.name}}</div>
						</a>
					</div>
					<div class="lk-flexWrap" v-else>
						<div class="lk_nocontent" v-if="indexBottom == ''">该分类下暂无子分类</div>
						<a :href="'/shop/list?id='+item.id" class="lk-sort-r-item" v-for="(item,i) in indexBottom" :key="i" v-else>
							<div class="lk-sort-img"><img :src="item.img" alt=""></div>
							<div class="lk-sort-title">{{item.name}}</div>
						</a>
					</div>
				</div>
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
					<div class="lk_foot-title active">分类</div>
				</a>
				<a href="/shop/cart" class="el-col-6 lk_footer-item">
					<div class="lk_foot-img"><img src="../../../static/images/tabImg3.png" alt=""></div>
					<div class="lk_foot-title">购物车</div>
				</a>
				<a href="/shop/member" class="el-col-6 lk_footer-item">
					<div class="lk_foot-img"><img src="../../../static/images/tabImg4.png" alt=""></div>
					<div class="lk_foot-title">个人中心</div>
				</a>
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
				indexBottom:'',
				tabstatus:1,
				recommend:'',
				contentStyleObj: {
					height: ''
				},
			}
		},
		async asyncData (app) {
			var sys = await api.postData('/Login/sys')
			var index = await api.postData('/Product/product_type');
			if(index.status == 1 && index.data.one != ''){
				var content = index.data;
				for(var i = 0; i<content.one.length;i++){
					content.one[i].check = false;
				}
				var two = content.one[0].two;
				var ran = content.recommend
			}else{
				return false;
			}
			return{
				index:content,
				indexBottom:two,
				recommend:ran,
				sys:sys.data
			}
		},
		head(){
			return {
				title:this.sys.site_name
			}
		},
		mounted: function(){
			
		},
		methods:{
			//推荐分类
			mend(){
				var list = this.index.one;
				this.tabstatus = 1
				for(var i = 0; i<list.length;i++){
					list[i].check = false;
				}
			},
			
			//点击切换数据
			classification(index){
				var list = this.index.one;
				for(var i = 0; i<list.length;i++){
					list[i].check = false;
				}
				list[index].check = true;
				this.uplist(index,'0')
			},
			//测出屏幕高度
			getHeight() {
				this.contentStyleObj.height = window.innerHeight - 95 + 'px';
			},
			uplist(index,tabId){
				var that = this;
				api.postData('/Product/product_type').then((res)=>{
					that.indexBottom = res.data.one[index].two;
					if(tabId){
						that.tabstatus = tabId
					}
				})
			}
		},
		created() {
			if(typeof window!=="undefined"){
				window.addEventListener('resize', this.getHeight);
				this.getHeight()
			}
			
		},
		
		destroyed() {
			window.removeEventListener('resize', this.getHeight);
		}
	}
</script>

<style>
	body, html {
		height: 100%;
		width: 100%;
	}
	#__layout, #__layout>div, #__nuxt {
		width: 100%;
		height: 100%;
	}
</style>

<template>
	<div style="height: 100%;overflow: auto;background: #EEEEEE;">
		<mt-header :title="'收货地址'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
			<div slot="right">
				<mt-button @click="newAdd">新增</mt-button>
			</div>
		</mt-header>
		<div>
			<ul class="lk-address-box">
				<div v-if="data1 == ''" style="text-align: center;padding-top: 150px;">暂无收货地址</div>
				<li class="lk-flexBox lk-address-list" v-for="(item,index) in data1" :key="index" v-else>
					<div class="lk-address-left">
						<div class="lk-flexBox lk_pd lk-address-top">
							<div class="lk-address-pname">{{item.consignee}}</div>
							<div class="lk-address-phone">{{item.consignee_tel}}</div>
						</div>
						<div class="lk_pd lk-addressd">{{item.area}} {{item.consignee_address}} </div>
						<div class="lk-address-check" @click="addressCheck(index)">
							<input type="checkbox" class="myChecked" :checked='item.is_default' />设为默认地址
						</div>
					</div>
					<div class="lk-address-right">
						<div class="lk-flexBox lk-address-rb">
							<nuxt-link :to="'/shop/member/eitAddress?id='+item.id" class="lk-flex lk-address-add"><img src="~/static/images/address-add.png" alt=""></nuxt-link>
							<div class="lk-flex lk-address-del" @click="addressDel(item.id)"><img src="~/static/images/address_del.png" alt=""></div>
						</div>
					</div>
				</li>
				
			</ul>
			<div class="lk_aheight"></div>
			<div class="lk_address-button" v-if="data1 != ''">
				<mt-button class="lk-button-red" @click='beSave'>确定</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	// const Cookie = process.client ? require('js-cookie') : undefined
	import api from '../../../../api/api.js'
	import { Toast,MessageBox } from 'mint-ui';
	export default {
		middleware: ['weburl','auth'],
		data() {
			return {
				items: true,
				data1:'',
				id:'',
				index:''
			}
		},
		async asyncData (params) {
			var index = await api.postData('/Member/info')
			var consignee = await api.postData('/Order/consignee')
			// console.log(consignee)
			for(var i = 0; i<consignee.data.length;i++){
				consignee.data[i].is_default = Number(consignee.data[i].is_default)
			}
			if(consignee.status == 1){
				return{
					data1:consignee.data,
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
			//返回上一页
			backto() {
				this.$router.go(-1);
			},
			//单选地址
			addressCheck(index){
				var b = this.data1;
				var arr = []
				for(var i = 0; i<b.length;i++){
					b[i].is_default = 0;
				}
				this.id = b[index].id;
				b[index].is_default = 1;
			},
			//选择好默认地址跳回订单详情页
			beSave(){
				var id = this.id;
				var datas = {
					act:'is_default',
					consignee_id:id
				}
				api.postData('/Order/consignee',datas).then((res) => {
					if(res.status == 1){
						this.$router.go(-1);
					}
				})
			},
			//删除地址
			addressDel(id){
				var that = this;
				var datas = {
					act:'del',
					consignee_id:id
				}
				MessageBox.confirm('确定删除该地址?').then(action => {
					api.postData('/Order/consignee',datas).then((res) => {
						if(res.status == 1){
							Toast('删除成功');
							setTimeout(function(){
								that.addA()
							},1000)
						}
					})
				});
				
			},
			//新增地址跳转
			newAdd(){
				this.$router.push('/shop/member/addAddress')
			},
			//再次调用地址
			addA(){
				api.postData('/Order/consignee').then((res) => {
					for(var i = 0; i<res.data.length;i++){
						res.data[i].is_default = Number(res.data[i].is_default)
					}
					if(res.status == 1){
						
						this.data1=res.data
						
					}
				})
			}
		},
	}
</script>

<style>
</style>

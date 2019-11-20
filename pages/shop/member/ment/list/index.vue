<template>
	<div>
		<mt-header :title="'详情'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
		</mt-header>
		<div class="lk-content">
			<div class="lk-content-list" v-for="(item,i) in index" :key="i">
				<div class="lk-content-list-title">{{item.title}}</div>
				<div class="lk-content-list-cont" >
					<div :class="item.check?'':'lk-content-list-cont-k'">
						{{item.content}}
					</div>
				</div>
				<i :class="item.check?'':'lk-content-list-ix'" @click="bing(i)"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '../../../../../api/api.js'
	export default{
		middleware: ['auth'],
		data(){
			return{
				user:'',
				index:'',
				ative:'lk-content-list-cont-k',
				icons:'lk-content-list-ix',
			}
		},
		
		async asyncData (params) {
			var id = params.query.id
			var datas = {
				type:id
			}
			var user = await api.postData('/Member/info')
			var index = await api.postData('/Message/message_list',datas)
			for(var i = 0; i<index.data.length;i++){
				index.data[i].check = false;
			}
			if(index.status == 1){
				return{
					index:index.data,
					user:user.data
				}
			}
		},
		head(){
			return {
				title:this.user.admin_system.site_name
			}
		},
		methods:{
			//返回上一页
			backto() {
				this.$router.go(-1);
			},
			bing(id){
				if(this.index[id].check){
					this.index[id].check = false
				}else{
					this.index[id].check = true
				}
			}
		}
	}
</script>

<style>
</style>

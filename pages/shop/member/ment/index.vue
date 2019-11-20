<template>
	<div>
		<mt-header :title="'公告'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
		</mt-header>
		<div class="lk-advise">
			<a :href="'/shop/member/ment/list?id='+item.id" class="lk-advise-list lk-flexBox" v-for="(item,i) in index" :key="i">
				<div>
					<div>
						<img src="../../../../static/images/advise-01.jpg" /><i></i>
					</div>
				</div>
				<div>{{item.name}}</div>
			</a>
		</div>
	</div>
	
</template>

<script>
	import api from '../../../../api/api.js'
	export default{
		middleware: ['weburl'],
		data(){
			return{
				user:'',
				index:''
			}
		},
		
		async asyncData (params) {
			var user = await api.postData('/Member/info')
			var index = await api.postData('/Message/message_type')
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
		}
	}
</script>

<style>
</style>

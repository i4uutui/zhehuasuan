<template>
	<div style="height: 100%;overflow: auto;background: #EEEEEE;">
		<mt-header :title="'修改地址'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
		</mt-header>
		<div>
			<mt-field label="收货人" placeholder="收货人" v-model="pik.consignee"></mt-field>
			<mt-field label="城市" placeholder="城市" @click.native="popupVisible=true" disabled :value="pik.consignee_address"></mt-field>
			<mt-field label="地址" placeholder="地址" v-model="pik.area"></mt-field>
			<mt-field label="手机" placeholder="手机" v-model="pik.consignee_tel"></mt-field>
			<div class="lk_pd lk-pd-20 lk-bg-fff lk-addAddress-button">
				<mt-button class="lk-button-red" @click="saves(pik.id)">保存</mt-button>
			</div>
		</div>
		<mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
			<mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" showToolbar>
				<div class="lk-flexBox lk-flexSpace lk-picker">
					<div  class="picker-cancel" @click="addressChooseCancel">close</div>
					<div  class="picker-sure" @click="confirmChoose">open</div>
				</div>
			</mt-picker>
		</mt-popup>
		
	</div>
</template>

<script>
	import api from '../../../../api/api.js'
	import address from '../../../../api/city.json'
	import { Toast,Picker } from 'mint-ui';
	export default {
		middleware: ['weburl','auth'],
		data() {
			return {
				index:'',
				popupVisible: false,	//开启/关闭弹窗
				addressSlots: [
				  {
					flex: 1,
					values: Object.keys(address),
					className: 'slot1',
					textAlign: 'center'
				  }, {
					divider: true,
					content: '-',
					className: 'slot2'
				  }, {
					flex: 1,
					values: ["东城区","西城区","朝阳区","丰台区","石景山区","海淀区","门头沟区","房山区","通州区","顺义区","昌平区","大兴区","怀柔区","平谷区","密云区","延庆区"],
					className: 'slot3',
					textAlign: 'center'
				  }
				],
				addressProvince: '北京',
				addressCity: '北京',
				pik:{
					consignee:'',
					area:'',				//将选择器的值放入输入框中
					consignee_address:'',
					consignee_tel:'',
				}
				
			}
		},
		async asyncData (params) {
			var id = params.query.id;
			var datas = {
				act:'edit',
				consignee_id:id
			}
			var index = await api.postData('/Member/info')
			var res = await api.postData('/Order/consignee',datas);
			return{
				pik:res.data,
				index:index.data
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
			saves(id){
				var that = this;
				var datas = {
					act:'edit',
					'data[consignee]':this.pik.consignee,
					'data[consignee_address]':this.pik.consignee_address,
					'data[area]':this.pik.area,
					'data[consignee_tel]':this.pik.consignee_tel,
					edit:1,
					consignee_id:id
				}
				
				api.postData('/Order/consignee',datas).then((res) => {
					if(res.status == 1){
						Toast('添加成功');
						setTimeout(function(){
							that.$router.go(-1);
						},1000)
					}
				})
				
			},
			//城市选择器
			onAddressChange(picker, values) {
				picker.setSlotValues(1, address[values[0]]);
				this.addressProvince = values[0];
				this.addressCity = values[1];
			},
			//picker选择器
			// onYearChange(picker, values) {
			// 	this.year = values[0];		//选择器所选择的值
			// },
			//picker取消
			addressChooseCancel(){
				this.popupVisible = false
			},
			//picker确定
			confirmChoose(){
				var vals = this.yearSlot[0];
				var val = this.year;			//选择器所选择的值
				this.pik.area = val;
				this.popupVisible = false
				for(var i = 0; i<vals.values.length; i++){ //将下标值给yearSlot的defaultIndex
					if(vals.values[i] == val){
						this.yearSlot[0].defaultIndex = i;
					}
				}
			}
		},
	}
</script>

<style>
	.mint-cell-wrapper {
		background-image: inherit;
	}
</style>

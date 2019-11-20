<template>
	<div style="height: 100%;overflow: auto;background: #EEEEEE;">
		<mt-header :title="'新增地址'" class="lk-index-head" style="background: #FFFFFF;">
			<div slot="left">
				<mt-button icon="back" @click="backto"></mt-button>
			</div>
		</mt-header>
		<div>
			<mt-field label="收货人" placeholder="收货人" v-model="Receiver"></mt-field>
			<mt-field label="城市" placeholder="城市" @click.native="popupVisible=true" disabled :value="region"></mt-field>
			<mt-field label="地址" placeholder="地址" v-model="address"></mt-field>
			<mt-field label="手机" placeholder="手机" v-model="phone"></mt-field>
			<div class="lk_pd lk-pd-20 lk-bg-fff lk-addAddress-button">
				<mt-button class="lk-button-red" @click="saves">保存</mt-button>
			</div>
		</div>
		
		<!-- 城市选择 -->
		<mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
			<mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" showToolbar>
				<div class="lk-flexBox lk-flexSpace lk-picker">
					<div class="picker-cancel" @click="addressChooseCancel">关闭</div>
					<div class="picker-sure" @click="confirmChoose">确认</div>
				</div>
			</mt-picker>
		</mt-popup>
		
		
	</div>
</template>

<script>
	import api from '../../../../api/api.js'
	import address from '../../../../api/city.json'
	import {Toast,Picker} from 'mint-ui';
	export default {
		middleware: ['weburl','auth'],
		data() {
			return {
				index:'',
				Receiver: '',
				region: '', //将选择器的值放入输入框中
				address: '',
				phone: '',
				popupVisible: false, //开启/关闭弹窗
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
				addressCity: '北京'
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
			//返回上一页
			backto() {
				this.$router.go(-1);
			},
			//城市选择器
			onAddressChange(picker, values) {
				picker.setSlotValues(1, address[values[0]]);
				this.addressProvince = values[0];
				this.addressCity = values[1];
			},
			//添加成功
			saves() {
				var that = this;
				var datas = {
					act:'add',
					'data[consignee]':this.Receiver,
					'data[consignee_address]':this.address,
					'data[area]':this.region,
					'data[consignee_tel]':this.phone,
					'data[is_default]':1
				}

				api.postData('/Order/consignee', datas).then((res) => {
					if (res.status == 1) {
						Toast('添加成功');
						setTimeout(function() {
							that.$router.go(-1);
						}, 1000)
					}
				})

			},
			//picker选择器
			// onYearChange(picker, values) {
			// 	this.year = values[0]; //选择器所选择的值
			// },
			// picker取消
			addressChooseCancel() {
				this.popupVisible = false
			},
			// picker确定
			confirmChoose() {
				this.region = this.addressProvince + this.addressCity;
				this.popupVisible = false
			}
		},
	}
</script>

<style>
	.mint-cell-wrapper {
		background-image: inherit;
	}
</style>

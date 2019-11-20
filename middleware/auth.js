import axios from 'axios'
import api from '../api/api.js'
import { MessageBox } from 'mint-ui';

export default function ({ $axios,redirect }) {
	// console.log(api)
  return api.postData('/Member/info').then((res)=>{
	  // console.log(res.status )
	  if(res.status == 1){
		  if(res.data.member.status == 0){
				MessageBox({
				  title: '提示',
				  message: '账号异常，请联系客服',
				  showCancelButton: true,
				  confirmButtonText:'联系客服',
				  cancelButtonText:'取消'
				}).then(action => {
					api.postData('/Login/log_out').then((ed)=>{})
					if(action == 'confirm'){
						window.location.href = "tel:"+res.data.admin_system.tel;
						return redirect('/user/login')
					}else{
						return redirect('/user/login')
					}
				})
		  }
		  return false;
	  }else{
		  return redirect('/user/login')
	  }
  })
}
export default function({redirect}){
	let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
	if(flag){
		// console.log('手机端')
		return false;
	}else{
		// console.log('PC端')
		// return redirect('/web')
	}
	return false;
}
<template>
    <div class="error">
      <div class="lk_404">4 0 4</div>
			<div class="lk_nopage">您所访问的页面不存在，请重新加载！</div>
			<div class="lk_flexbox lk_bt404">
				<a href="/" class="lk_blackIndex"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAtCAYAAABbAsDYAAAC6klEQVRYha3Yy27bRhTG8f93RrK9SJBVHaexcjH6AEEXjdU+RlddFonTXLrowzS9xG6fom/QWG43fYAARW7OzUCBkIJNjmBruqDoRBQlSibPRosjzk+HM3M4lK599jk+jZHE2SOMPoW5dufYHz1KDv+7Idf6V+ibVo2RCyFkrpMevt8dpFHHXBtCWEPh94YQIXPrgyTqDdL+urkPw4bA9fqIhGTrgyTq+bS/bs4B+ihtf1hdwOQuD5Jozyf9jtk4APwE/HB2JAM+9RkwUcEIeABwNmQMiDuzgDMhkjBzl3wS9XwaX6kCFkYkIZ0CV0vm4OcisBByCqTxrk/ia9IE8Atwv+zaOZewkNyaT+LHPo2uS67YIX4F7k27eo5KhJlb80m865NoowTYBu7OGqECEebcRZ/Gj30abZhNADvAnaqfOeN2CXNu1SdxzyfRhsnBJLBVBcDUSoSZW/VJvFcXgNJKhJn7xKcjYHKZ/rYIABOVZLdokMZ/TQF2gNuLADBWyekc7A2mAwtVkEdWSdYqLuaAGgRGyGgfpFHPH5UC23UAAHOuddUnUc8fxRslzW6bOfZBVbilpdaOT95/VQCOyZrd1FYxb4QwxI6P/Y0wPKFQwQvg+7oABJZXzmPOLR1kHXUsrgA/1iZCYGnlPBbC8Fu51n4h3yJ7LjyqCw2HJxjwBMKXwMuS72w1AeU7/iUwC9puAgHYnwHdrgMVu/A+0G0aKmv1r0ZQcTHk0E4TSA5tToFusWBFsx6/OfSqJLfQras6SDQCzXPuyhfDNKhyH817uMv30euS3BbZwa42AlnT7AJvSnLfkXXt2gjAC8m6ksqgu2SH7doIEJ6DdSW9LUneAx42gOSQNiW9K0neL0J1Xueeg25KOqiC6r0zZtAXsyDJ5n11qIRuSvwdQlgtQsOTQb9uJXk8G83RWEWScdg/+LopBOApaBN4F0L2N0gIQ5ZXLjxpEgF4aua6rr38D/DWXPvP9vK5O/8Dr+UZ+Pwws18AAAAASUVORK5CYII=" alt="">返回首页</a>
			</div>
    </div>
</template>

<script>
export default {
  name: 'NuxtError',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: '404错误',
      meta: [
        {
          name: 'viewport'
        }
      ]
    }
  },
}
</script>

<style>
	div{
		color: #333333;
	}
	.error{
		width: 100%;
		position: absolute;
		left: 50%;
		margin-top: 200px;
		transform: translateX(-50%);
	}
	.lk_404{
		font-size: 125px;
		font-weight: bold;
		text-align: center;
	}
	.lk_nopage{
		text-align: center;
		font-size: 36px;
		font-weight: bold;
		padding-top: 30px;
	}
	.lk_404 img{
		vertical-align: sub;
		margin-right: 15px;
	}
	.lk_flexbox{
		display: flex;
	}
	.lk_bt404{
		width: 220px;
		margin: 0 auto;
		margin-top: 40px;
	}
	.lk_bt404 a{
		font-weight: bold;
		font-size: 36px;
		display: block;
	}
	.lk_bt404 a:hover{
		color: #333333 !important;
	}
	.lk_shaxin{
		margin-right: 110px;
	}
	.lk_shaxin img{
		width: 46px;
		height: 46px;
	}
	.lk_blackIndex img{
		width: 25px;
		height: 45px;
	}
</style>
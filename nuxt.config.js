
module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script: [
    	{ src: 'http://libs.baidu.com/jquery/1.11.1/jquery.min.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
	'element-ui/lib/theme-chalk/index.css',
	'mint-ui/lib/style.css',
    '~assets/reset.css',
    '~assets/common.css',
    'swiper/dist/css/swiper.css',
    '~assets/style.css',
    '~assets/Zstyle.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
	  '@/plugins/element-ui',
    { src: '~plugins/mint-ui', ssr: true },
		{ src: '~/plugins/vue-awesome-swiper.js', ssr: false },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [],
  /*
  ** Build configuration
  */
  build: {
    transpile: [
		'/^mint-ui/',
		'/^element-ui/'
	],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}

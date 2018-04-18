import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from './../views/GoodsList'
import Cart from './../views/Cart'
import Address from './../views/Address'
import OrderConfirm from './../views/OrderConfirm'
import OrderSuccess from './../views/OrderSuccess'
import Admin from './../views/adminViews/Admin'
import AdminLogin from './../views/adminViews/AdminLogin'
import GoodsDetail from './../views/GoodsDetail'
import PersonalCenter from './../views/PersonalCenter'


Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
	    {
	      path: '/',
	      name: 'goodsList',
	      component: GoodsList
	    },
	    {
	      path: '/cart',
	      name: 'cart',
	      component: Cart
	    },
	    {
	      path: '/address',
	      name: 'Address',
	      component: Address
	    },
	    {
	      path: '/orderConfirm',
	      name: 'OrderConfirm',
	      component: OrderConfirm
	    },
	    {
	      path: '/orderSuccess',
	      name: 'OrderSuccess',
	      component: OrderSuccess
	    },
	    {
	      path: '/admin',
	      name: 'Admin',
	      component: Admin
	    },
	    {
	      path: '/adminLogin',
	      name: 'AdminLogin',
	      component: AdminLogin
	    },
	    {
	      path: '/goodsDetail',
	      name: 'GoodsDetail',
	      component: GoodsDetail
	    },
	    {
	      path: '/personalCenter',
	      name: 'PersonalCenter',
	      component: PersonalCenter
	    }
	    
	]
})

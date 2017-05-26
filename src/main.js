// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

Vue.use(VueRouter);//注册组件
Vue.use(VueResource);

Vue.config.productionTip = false;

var routes = [
  //{ path: '/', alias:'/good',component: goods },
  { path: '/', redirect:'/goods'}, //重定向到默认页，同上
  { path: '/goods', alias:'/good',component: goods },
  { path: '/ratings', alias:'/rating',component: ratings },
  { path: '/seller',alias:'/selle', component: seller }
];
var router = new VueRouter({
  routes,
  linkActiveClass:'active' //设置点击类名
});
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('.app');
//router.go('/ratings');

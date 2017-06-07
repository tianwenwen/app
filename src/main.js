// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'Vuex';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

Vue.use(VueRouter);//注册组件
Vue.use(VueResource);
Vue.use(Vuex);

var store = new Vuex.Store({
  state:{
    totalPrice:0
  },
  getters:{
    getTotal:function(state){
       return state.totalPrice
    }
  },
  mutations:{//同步
    increment:function(state,price){
      state.totalPrice +=price;
    },
    decrement:function(state,price){
      state.totalPrice -=price;
    }
  },
  actions:{//Action 提交的是 mutation，而不是直接变更状态,可进行异步，可发送http请求
    increase:function(context,price){
      context.commit('increment',price);
    },
    decre:function(context,price){
      context.commit('decrement',price);
    }

  }
});

Vue.config.productionTip = false;

var routes = [
  //{ path: '/', alias:'/good',component: goods },
  { path: '/', redirect:'/goods'}, //重定向到默认页，同上
  ///goods/:color :color传递的参数，特定参数，没有参数找不到
  { path: '/goods/:color/detail/:type', alias:'/good',components: {
    viewA:goods
  },name:'goods',

  },
  {
    path: '/ratings',
    alias:'/rating',
    components: {
      viewA:ratings,
      viewB:seller
    },
    children:[ //子组件
      {
        path:'red',
        component:seller
      }
    ]
   },
  { path: '/seller',alias:'/selle', components: {
    viewA:seller
  },name:'seller' }
];
var router = new VueRouter({
  routes,
  mode:'history',
  linkActiveClass:'active' //设置点击类名
});
var root = new Vue({
  el: '#app',
  router,
  store:store,
  template: '<App/>',
  components: { App }
});
//router.beforeEach();
//root.$data;
//root.$on('emit',function(){})

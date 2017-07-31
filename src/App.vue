<template>
  <div class="app">
    <v-header></v-header>
    <div class="tab">

      <span>{{totalPrice}}</span>
      <div class="tab-item">
        <!--<router-link to="/goods" tag="li">商品</router-link>-->
        <router-link :to="{name:'goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/ratings', query:{plan:'test'}}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'seller', params:{color: 123 }}">商家</router-link>
      </div>
    </div>
    <transition mode="out-in" name="fade">
      <keep-alive>
        <router-view name="viewA"></router-view>
        <router-view name="viewB"></router-view>
      </keep-alive>
    </transition>

  </div>
</template>

<script> //type="text/ecmascript-6"
  import Header from './components/header/header.vue'
  var ERR_OK = 0;
  export default {
//  name: 'app',
    components: {
      vHeader: Header
    },
    data:function(){
      return{
        seller:{

        }
      }
    },//定义成函数，因为定义成对象的话，组件是会复用的，其中一个修改会影响其他组件
    created:function(){//实例已经创建完成之后被调用
      this.$http.get('/api/seller').then(function(response){
        //成功回调
        response = response.body;
        if(response.errno == ERR_OK){
           this.seller = response.data; //this  vue实例
        }
      },function(){
        //失败回调

      });
    },
    computed:{
      totalPrice:function(){
//        return this.$store.state.totalPrice
        return this.$store.getters.getTotal
      }
    }
  }
</script>

<style lang="less">
  .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

    .tab {
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
        .tab-item {
          flex: auto;
          text-align: center;
          a{
            display: block;
            font-size:14px;
            color:rgb(77,85,93);
            &.active{
              color:rgb(240,20,20);
             }
            }
        }
    }

  }
  .fade-enter-active,.fade-leave-active{
    transition:all .5s;
  }
  .fade-enter,.fade-leave-active{ //默认为1
  opacity:0;
  }

</style>

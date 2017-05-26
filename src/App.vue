<template>
  <div class="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script> //type="text/ecmascript-6"
  import Header from './components/header/header.vue'

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
    },//定义成函数，因为定义成对象的话，组件是会附中的，其中一个修改会影响其他组件
    created:function(){
      this.$http.get('/api/seller').then(function(response){
        //成功后
        response = response.json();
        if(response.errno == 0){

        }
      },function(){
        //失败后

      });
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
          &>a{
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


</style>

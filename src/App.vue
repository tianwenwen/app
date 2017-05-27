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

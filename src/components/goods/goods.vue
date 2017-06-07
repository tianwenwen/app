<template>
    <div>
       I am goods
      {{$route.params.color}}
       <button @click="getParam">getParam</button>
       <button @click="add">add</button>
       <button @click="minus">subtract</button>
    </div>
</template>
<script>
    export default {
      data:function(){
        return{
          price:5
        }
      },
      methods:{
        getParam:function(){
          console.log(this.$route.params) //获取路由参数
        },
        add:function(){
//          this.$store.commit('increment',this.price);
          this.$store.dispatch('increase',this.price);
        },
        minus:function(){
          this.$store.dispatch('decre',this.price);
        }
      }
    }

</script>
<style>
</style>

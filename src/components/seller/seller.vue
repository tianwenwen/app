<template>
    <div>
      I am seller
      <p>{{$route.params}}</p>
      <button @click="add">add</button>
      <button @click="minus">subtract</button>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
              price:20
            }
        },
        components: {},
        methods:{
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

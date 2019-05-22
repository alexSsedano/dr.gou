<template>
  <div id="login " style="height:10%">
    
        <login class="h-100"></login>
        <notifications group="foo" />
        <router-view></router-view>
        
  </div>
</template>
<script>


import login from '../components/login.vue';



export default {
  name: 'loginview',
  components: {
   login,
   
  
  }
}
</script>
<style>

</style>

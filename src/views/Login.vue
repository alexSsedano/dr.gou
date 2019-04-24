<template>
  <div id="login">
        <login></login>
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
<template>
  <div id="app">
        <login></login>
        <notifications group="foo" />
  </div>
  
</template>

<script>


import login from './components/login.vue';



export default {
  components: {
   login,
  
  }
}
</script>
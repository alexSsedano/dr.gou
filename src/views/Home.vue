<template>
  <div class="home" >
    <Header></Header>
    <HomeBody></HomeBody>
    <notifications group="foo" />
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/header.vue'
import HomeBody from '../components/homeBody.vue'

export default {
  name: 'home',
  components: {
    Header,
    HomeBody
  }
}
</script>
<style>
 body::before{
   background-color: white !important;
   }
</style>


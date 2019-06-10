<template>
  <div class="home" >
    <Header></Header>
    <HomeBody></HomeBody>
    <Footer></Footer>
    <notifications group="foo" />
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/header.vue'
import HomeBody from '../components/homeBody.vue'
import Footer from '../components/footer.vue'

export default {
  name: 'home',
  components: {
    Header,
    HomeBody,
    Footer
  }
}
</script>
<style>
  homeBody{
    background-color: white !important;
  }
</style>


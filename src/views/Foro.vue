<template>
  <div class="foro" >
    <Header></Header>
    <ForoBody></ForoBody>
    <Footer></Footer>
    <notifications group="foo" />
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/header.vue'
import ForoBody from '../components/foroBody.vue'
import Footer from '../components/footer.vue'

export default {
  name: 'foro',
  components: {
    Header,
    ForoBody,
    Footer
  }
}
</script>
<style>
  ForoBody{
    background-color: white !important;
  }
</style>
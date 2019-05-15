<template>
  <div class="admin"  >
    <div >
    <Header></Header>
    <AdminBody></AdminBody>
    <Footer ></Footer>
    <notifications group="foo" />
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/header.vue'
import AdminBody from '../components/adminBody.vue'
import Footer from '../components/footer.vue'

export default {
  name: 'admin',
  components: {
    Header,
    AdminBody,
    Footer
  }
}
</script>
<style>
  
 
</style>


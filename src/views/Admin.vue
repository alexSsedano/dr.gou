<template>
  <div class="admin" style="height: 100%" >
    <div >
    <Head></Head>
    <AdminBody class="h"></AdminBody>
    <Footer ></Footer>
    <notifications group="foo" />
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Head from '../components/header.vue'
import AdminBody from '../components/adminBody.vue'
import Footer from '../components/footer.vue'

export default {
  name: 'admin',
  components: {
    Head,
    AdminBody,
    Footer
  }
}
</script>
<style>
  .h{
    height: 100% !important;
  }
 
</style>


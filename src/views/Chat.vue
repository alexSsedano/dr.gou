<template>
  <div class="chat"  >
    <div >
    <Header></Header>
    <ChatBody ></ChatBody>
    <Footer ></Footer>
    <notifications group="foo" />
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/header.vue'
import ChatBody from '../components/chatBody.vue'
import Footer from '../components/footer.vue'

export default {
  name: 'chat',
  components: {
    Header,
    ChatBody,
    Footer
  }
}
</script>
<style>
  homeBody{
    background-color: white !important;
  }

 
</style>


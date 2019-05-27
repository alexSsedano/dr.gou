<template>
  <div class="chat" style="height: 100%" >
    
    <Header></Header>
    <ChatBody class="h"></ChatBody>
  <div class="hidden-sm hidden-xs">
    <Footer  ></Footer>
  </div>
    <notifications group="foo" />
    <router-view></router-view>
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
 
  .h{
    height: 100% !important;
  }
  body {
    background-color: white !important;
  }

 
</style>


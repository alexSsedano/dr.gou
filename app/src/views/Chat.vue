<template>
  <div class="chat" style="height: 100%" >
    
    <Header></Header>
    <ChatBody class="h"></ChatBody>
  <div class="d-none d-lg-block">
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
  #myFooter {
    background-color: #3a3f46;
    color: white;
}

#myFooter .row {
    margin-bottom: 60px;
}

#myFooter .info{
    text-align: justify; 
    color: #afb0b1;
}

#myFooter ul {
    list-style-type: none;
    padding-left: 0;
    line-height: 1.7;
}

#myFooter h5 {
    font-size: 18px;
    color: white;
    font-weight: bold;
    margin-top: 30px;
}

#myFooter .logo{
    margin-top: 10px;
}

#myFooter .second-bar .logo a{
    color:white;
    font-size: 28px;
    float: left;
    font-weight: bold;
    line-height: 68px;
    margin: 0;
    padding: 0;
}
.bcol{
    background-color: #33373e !important;
}

#myFooter a {
    color: #d2d1d1;
    text-decoration: none;
}

#myFooter a:hover,
#myFooter a:focus {
    text-decoration: none;
    color: white;
}

#myFooter .second-bar {
    text-align: center;
    background-color: #33373e;
    text-align: center;
}

#myFooter .second-bar a {
    font-size: 22px;
    color: #9fa3a9;
    padding: 10px;
    transition: 0.2s;
    line-height: 68px;
}

#myFooter .second-bar a:hover {
    text-decoration: none;
}

#myFooter .social-icons {
    float:right;
}


#myFooter .facebook:hover {
    color: #0077e2;
}

#myFooter .google:hover {
    color: #ef1a1a;
}

#myFooter .twitter:hover {
    color: #00aced;
}

@media screen and (max-width: 767px) {
    #myFooter {
        text-align: center;
    }

    #myFooter .info{
        text-align: center;
    }
}

 
</style>


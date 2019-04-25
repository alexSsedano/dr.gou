<template>
  <div class="home" >
    <Header style="background-color:white;"></Header>
    <notifications group="foo" />
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/header.vue'

export default {
  name: 'home',
  components: {
    Header
  }
}
</script>

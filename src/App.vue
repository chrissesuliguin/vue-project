<template>
  <div id="app">
    <MainHeader/>
    <MainContent/>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader'
import MainContent from './components/MainContent'

export default {
  name: 'app',
  components: {
    MainHeader,
    MainContent
  }
}
</script>

<style lang="scss">
  body{
    background-color: #eaedf1;
  }
  #app {
    font-family: 'Lato', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>

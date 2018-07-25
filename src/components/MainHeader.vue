<template>
  <transition name="slide-fade">
    <header v-if="show == 'header'">
      <a href="/" class="logo">Space Savvy</a>
      <h1>Discover Space Missions</h1>
      <a @click="collapse" class="icon"><chevron/></a>
    </header>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import chevron from '../assets/img/down-chevron.svg';
export default {
  name: 'MainHeader',
  components: {
    chevron,
  },

  created(){
    this.$store.commit('display', 'header')
  },

  data () {
    return {
    }
  },

  computed: mapGetters({
    show: 'getDisplay',
  }),

  methods:{
    collapse(){
      this.$store.commit('display', 'content')
    }
  }
}
</script>

<style scoped lang="scss">

header{
  background: url(../assets/img/bg.jpeg) no-repeat center center fixed;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;

  a.logo{
    text-transform: uppercase;
    text-decoration: none;
    color:#ffffff;
    position: absolute;
    top: 50px;
    left: 50px;
  }

  h1{
    color:#ffffff;
    font-weight: normal;
    font-size: 4em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    margin: 0;
    margin-top: -38px;
  }

  a.icon{
    position: absolute;
    bottom: 50px;
    cursor: pointer;

    svg{
      fill: #ffffff;
      width: 40px;
      height: 40px;
    }
  }
}

.slide-fade-leave-active {
  transition: all .3s;
}
.slide-fade-leave-to {
  transform: translateY(-100%);
}
</style>

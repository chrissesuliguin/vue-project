<template>
  <div class="container" v-if="show == 'content'">
    <section class="main">
      <Filters />
      <List />
    </section>
    <footer>
      <p>Copyright &copy; 2018 Space Savvy</p>
      <button class="btn btn-link" @click="backTop">Back to top</button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Filters from './Filters'
import List from './List'

export default {
  name: 'MainContent',
  components: {
    Filters,
    List
  },
  data () {
    return {
    }
  },
  created(){
    this.$store.dispatch('getLaunches');
  },

  computed: mapGetters({
    show: 'getDisplay',
  }),

  methods:{
    backTop(){
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}
</script>

<style scoped lang="scss">
.main{
  background: #ffffff;
  box-shadow: 1px 3px 5px 0px #d7d7d7;
  border-radius: 3px;
  margin: 30px 0;
}

footer{
  display: inline;
  p{
    text-align: left;
    float: left;
  }

  button{
    float: right;
    color: #aaaaaa;
    border: none;
  }
}
</style>

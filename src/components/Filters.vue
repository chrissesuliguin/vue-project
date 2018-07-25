<template>
  <div class="filter">
    <div class="row">
      <div class="col-md-3 input">
        <label>Keywords</label>
        <input type="text" v-model="data.keyword" />
      </div>
      <div class="col-md-3 input">
        <label>Launch Pad</label>
        <select v-model="data.pad_id">
          <option :value="any" :selected="true">Any</option>
          <option :value="pad.id" v-for="(pad, i) in launchpads" :key="i">
            {{pad.full_name}}
          </option>
        </select>
      </div>
      <div class="col-md-2 input">
        <label>Min Year</label>
        <select v-model="data.min">
          <option :value="any" :selected="true">Any</option>
          <option v-for="i in (current - start)" :key="i">
            {{start+i}}
          </option>
        </select>
      </div>
      <div class="col-md-2 input">
        <label>Max Year</label>
        <select v-model="data.max">
          <option :value="any" :selected="true">Any</option>
          <option v-for="i in  (current - data.min)" :key="i" v-if="data.min">
            {{parseInt(data.min)+i}}
          </option>
        </select>
      </div>
      <div class="col-md-1 input">
        <button class="btn btn-primary" @click="apply">Apply</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Filters',
  data () {
    return {
      data: {
        keyword: '',
        pad_id: '',
        min: '',
        max: ''
      },
      current: new Date().getFullYear(),
      start: 1980,
      any: ''
    }
  },
  created(){
  },

  computed: mapGetters({
    launchpads: 'getLaunchPads',
  }),

  methods:{
    validation(){
      this.errors.range = this.data.max > this.data.min;
      return this.errors;
    },
    apply(){
      if(this.validation){
        this.$store.commit('applyFilter', this.data);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.filter{
  height: 100px;
  padding: 20px;

  .input{
    label{
      text-align: left;
    }

    .btn-primary{
    }
  }
}

</style>

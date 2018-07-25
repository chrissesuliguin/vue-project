import Vue from 'vue'
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    show: '',
    missions: [],
    launchPads: [],
    filteredMissions: [],
    filters: null
  },
  mutations: {
    display(state, value){
      state.show = value
    },
    storeMissions(state, data){
      state.missions = data
    },
    storeLaunchPads(state, data){
      state.launchPads = data
    },
    applyFilter(state, data){
      state.filters = data;

      const {keyword, pad_id, min, max} = data;

      state.filteredMissions = state.missions.filter(item => {
        const rocket_name = item.rocket.rocket_name;
        const payload_id = item.payloads[0].payload_id; // Multiple payloads, searched to first entry in array for now
        const flight_num = item.flight_number.toString();
        const launch_year = new Date(item.launch_date_local).getFullYear()

        const key_filter = keyword == '' ? true : (!!rocket_name.match(keyword)) || (!!payload_id.match(keyword)) || (!!flight_num.match(keyword));
        const id_filter = pad_id == '' ? true : item.launch_site.site_id == pad_id
        const year_filter = (min == '' && max =='') ? true : launch_year > min && launch_year < max;
        console.log(launch_year)
        console.log(key_filter +', '+ id_filter +', '+ year_filter);
        return key_filter && id_filter && year_filter;
      })
    }

  },
  actions: {
    async getLaunchPads ({ commit }) {
      axios.get('http://localhost:8001/launchpads').then(({ data }) => {
        commit('storeLaunchPads', data)
      }).catch(function (error) {
        console.log(error);
      })
    },
    async getLaunches ({ commit, dispatch }) {
      await dispatch('getLaunchPads')
      axios.get('http://localhost:8001/launches').then(({ data }) => {
        commit('storeMissions', data)
      }).catch(function (error) {
        console.log(error);
      })
    }
  },
  getters: {
    getDisplay: state => state.show,
    getMissions: state => state.missions,
    getFilteredMissions: state => state.filteredMissions,
    getFilters: state => state.filters,
    getLaunchPads: state => state.launchPads,
  }
});
